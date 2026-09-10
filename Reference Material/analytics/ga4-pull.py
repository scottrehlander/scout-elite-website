#!/usr/bin/env python3
"""Pull GA4 data for the Scout Elite site, focused on what drives trial clicks.

Setup (one time):
  1. GCP project scout-elite-471901 -> enable BOTH:
       - Google Analytics Data API   (analyticsdata.googleapis.com)
       - Google Analytics Admin API  (analyticsadmin.googleapis.com)   [for auto-discovery]
  2. GA4 -> Admin -> Property access management -> add
       gsc-reader@scout-elite-471901.iam.gserviceaccount.com  as Viewer
  3. Reuses the same key at ~/.config/gsc/sa.json

Run:
  ~/.venvs/gsc/bin/python "Reference Material/analytics/ga4-pull.py" --days 90
  ~/.venvs/gsc/bin/python "Reference Material/analytics/ga4-pull.py" --days 90 --property 123456789

The site fires `try_click` (params: placement, page_path) from every xpress CTA, and
`arcade_play` / `arcade_complete` (param: game) from the arcade. Custom PARAMETERS are
only queryable once registered as custom dimensions in GA4 admin
(Admin -> Custom definitions), so every custom-dimension report here degrades to a
warning instead of failing the run.
"""
import argparse, csv, datetime as dt, os, pathlib, sys

KEY = os.path.expanduser("~/.config/gsc/sa.json")
SCOPES = ["https://www.googleapis.com/auth/analytics.readonly"]
OUT = pathlib.Path(__file__).resolve().parent / "out"


def creds():
    if not os.path.exists(KEY):
        sys.exit(f"No service-account key at {KEY}.")
    from google.oauth2 import service_account
    return service_account.Credentials.from_service_account_file(KEY, scopes=SCOPES)


def discover(c):
    from google.analytics.admin import AnalyticsAdminServiceClient
    props = []
    try:
        summaries = list(AnalyticsAdminServiceClient(credentials=c).list_account_summaries())
    except Exception as e:
        m = str(e)
        if "SERVICE_DISABLED" in m or "has not been used in project" in m:
            sys.exit("Google Analytics Admin API is not enabled.\n"
                     "  Enable: https://console.cloud.google.com/apis/library/"
                     "analyticsadmin.googleapis.com?project=scout-elite-471901\n"
                     "  (or skip discovery entirely and pass --property <numeric id>)")
        if "PermissionDenied" in type(e).__name__ or "403" in m:
            sys.exit("Service account cannot read GA4. Add "
                     "gsc-reader@scout-elite-471901.iam.gserviceaccount.com as Viewer under "
                     "GA4 Admin -> Property access management.")
        raise
    for s in summaries:
        for p in s.property_summaries:
            props.append((p.display_name, p.property.split("/")[-1]))
    if not props:
        sys.exit("Service account sees no GA4 properties. Add it as Viewer under "
                 "GA4 Admin -> Property access management.")
    if len(props) > 1:
        print(f"note: {len(props)} properties visible, using {props[0][0]} "
              f"(pass --property to override)")
    print(f"property: {props[0][0]} ({props[0][1]})")
    return props[0][1]


def run(client, prop, dims, mets, start, end, dim_filter=None, order_by_metric=None, limit=200):
    from google.analytics.data_v1beta.types import (
        RunReportRequest, DateRange, Dimension, Metric, Filter, FilterExpression,
        OrderBy)
    req = RunReportRequest(
        property=f"properties/{prop}",
        date_ranges=[DateRange(start_date=start, end_date=end)],
        dimensions=[Dimension(name=d) for d in dims],
        metrics=[Metric(name=m) for m in mets],
        limit=limit,
    )
    if dim_filter:
        name, value = dim_filter
        req.dimension_filter = FilterExpression(
            filter=Filter(field_name=name,
                          string_filter=Filter.StringFilter(value=value)))
    if order_by_metric:
        req.order_bys = [OrderBy(metric=OrderBy.MetricOrderBy(metric_name=order_by_metric),
                                 desc=True)]
    return client.run_report(req)


def write(resp, path):
    path.parent.mkdir(parents=True, exist_ok=True)
    heads = [d.name for d in resp.dimension_headers] + [m.name for m in resp.metric_headers]
    with open(path, "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f); w.writerow(heads)
        for r in resp.rows:
            w.writerow([v.value for v in r.dimension_values] + [v.value for v in r.metric_values])
    return len(resp.rows)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--days", type=int, default=90)
    ap.add_argument("--property", default=os.environ.get("GA4_PROPERTY"))
    ap.add_argument("--bots", action="store_true",
                    help="run traffic-quality triage instead of the standard reports")
    args = ap.parse_args()

    c = creds()
    from google.analytics.data_v1beta import BetaAnalyticsDataClient
    prop = args.property or discover(c)
    client = BetaAnalyticsDataClient(credentials=c)

    end = dt.date.today(); start = end - dt.timedelta(days=args.days - 1)
    stamp = OUT / end.isoformat()
    print(f"window={start}..{end} ({args.days}d)\n")

    if args.bots:
        return bot_triage(client, prop, start.isoformat(), end.isoformat(), stamp)

    reports = [
        ("ga4-pages",
         dict(dims=["pagePath"], mets=["screenPageViews", "activeUsers",
                                       "userEngagementDuration"], order_by_metric="screenPageViews")),
        ("ga4-landing-pages",
         dict(dims=["landingPage"], mets=["sessions", "activeUsers", "bounceRate"],
              order_by_metric="sessions")),
        ("ga4-try-click-by-page",
         dict(dims=["pagePath"], mets=["eventCount"],
              dim_filter=("eventName", "try_click"), order_by_metric="eventCount")),
        ("ga4-events",
         dict(dims=["eventName"], mets=["eventCount", "activeUsers"],
              order_by_metric="eventCount")),
        # These need custom dimensions registered in GA4 admin; they fail soft.
        ("ga4-try-click-by-placement",
         dict(dims=["customEvent:placement"], mets=["eventCount"],
              dim_filter=("eventName", "try_click"), order_by_metric="eventCount")),
        ("ga4-arcade-by-game",
         dict(dims=["eventName", "customEvent:game"], mets=["eventCount"],
              order_by_metric="eventCount")),
    ]

    for name, kw in reports:
        try:
            resp = run(client, prop, start=start.isoformat(), end=end.isoformat(), **kw)
            n = write(resp, stamp / f"{name}.csv")
            total = sum(int(r.metric_values[0].value) for r in resp.rows)
            print(f"  {name:28s} {n:4d} rows   {kw['mets'][0]}={total}")
        except Exception as e:
            msg = str(e).split("\n")[0][:150]
            if "customEvent" in str(kw.get("dims")):
                print(f"  {name:28s} SKIPPED - custom dimension not registered in GA4 admin")
                print(f"    -> GA4 Admin > Custom definitions > Create custom dimension, "
                      f"event-scoped, matching the event parameter")
            else:
                print(f"  {name:28s} FAILED - {msg}")

    print(f"\nwrote {stamp}")


# Hostnames that are legitimately ours. Anything else reporting into the property is
# almost always "ghost spam": hits fabricated against the measurement ID that never
# touched the site. GA4's automatic filtering catches known crawlers (the IAB list),
# not this.
REAL_HOSTS = ("scout-elite.com", "www.scout-elite.com", "xpress.scout-elite.com",
              "app.scout-elite.com", "localhost")


def bot_triage(client, prop, start, end, stamp):
    def rep(dims, mets, limit=300):
        return run(client, prop, dims, mets, start, end,
                   order_by_metric=mets[0], limit=limit)

    ENG = ["sessions", "engagedSessions", "averageSessionDuration"]
    flags = []

    print("=== 1. HOSTNAME (ghost-spam check) ===")
    r = rep(["hostName"], ["sessions"])
    write(r, stamp / "bots-hostname.csv")
    tot = sum(int(x.metric_values[0].value) for x in r.rows) or 1
    for row in r.rows:
        h = row.dimension_values[0].value or "(not set)"
        n = int(row.metric_values[0].value)
        ok = any(h == d or h.endswith("." + d) for d in REAL_HOSTS)
        mark = "  ok " if ok else "SPAM"
        if not ok:
            flags.append(f"hostname '{h}' is not yours: {n} sessions ({100*n/tot:.1f}%)")
        print(f"  {mark}  {h[:44]:44s} {n:6d}  {100*n/tot:5.1f}%")

    print("\n=== 2. SOURCE / MEDIUM, by engagement ===")
    r = rep(["sessionSourceMedium"], ENG)
    write(r, stamp / "bots-source.csv")
    print(f"  {'source / medium':40s} {'sess':>6s} {'eng%':>6s} {'avg s':>7s}")
    for row in r.rows[:20]:
        sm = row.dimension_values[0].value
        se, es, avg = (float(v.value) for v in row.metric_values)
        er = 100 * es / se if se else 0
        sus = se >= 20 and er < 5 and avg < 2
        if sus:
            flags.append(f"source '{sm}': {int(se)} sessions, {er:.0f}% engaged, {avg:.1f}s avg")
        print(f"  {'!!' if sus else '  '} {sm[:38]:38s} {int(se):6d} {er:5.1f}% {avg:6.1f}s")

    print("\n=== 3. COUNTRY, by engagement ===")
    r = rep(["country"], ENG)
    write(r, stamp / "bots-country.csv")
    for row in r.rows[:14]:
        c = row.dimension_values[0].value
        se, es, avg = (float(v.value) for v in row.metric_values)
        er = 100 * es / se if se else 0
        sus = se >= 20 and er < 5 and avg < 2
        if sus:
            flags.append(f"country '{c}': {int(se)} sessions, {er:.0f}% engaged, {avg:.1f}s avg")
        print(f"  {'!!' if sus else '  '} {c[:38]:38s} {int(se):6d} {er:5.1f}% {avg:6.1f}s")

    print("\n=== 4. BROWSER ===")
    r = rep(["browser"], ENG)
    write(r, stamp / "bots-browser.csv")
    for row in r.rows[:12]:
        b = row.dimension_values[0].value
        se, es, avg = (float(v.value) for v in row.metric_values)
        print(f"     {b[:38]:38s} {int(se):6d} {100*es/se if se else 0:5.1f}% {avg:6.1f}s")

    print("\n=== 5. DAILY SESSIONS (spike check) ===")
    r = run(client, prop, ["date"], ["sessions", "engagedSessions"], start, end, limit=400)
    write(r, stamp / "bots-daily.csv")
    days = sorted(((x.dimension_values[0].value, int(x.metric_values[0].value),
                    int(x.metric_values[1].value)) for x in r.rows), key=lambda t: t[0])
    vals = sorted(d[1] for d in days)
    med = vals[len(vals) // 2] if vals else 0
    for d, se, es in days:
        if med and se > 5 * med:
            flags.append(f"spike on {d}: {se} sessions vs median {med}")
            print(f"  !! {d}  {se:5d} sessions ({se/med:.1f}x median), {es} engaged")
    print(f"     median {med} sessions/day over {len(days)} days")

    # 6. The sharpest signal available: Search Console clicks come from Google's own
    # serving layer and are already crawler-filtered, so they are a trustworthy floor.
    # GA4 google/organic sessions should land in the same ballpark. Wildly more means
    # something is manufacturing sessions that Google never sent.
    print("\n=== 6. GA4 google/organic vs Search Console clicks ===")
    gsc_dir = stamp.parent
    gsc_csv = None
    for d in sorted(gsc_dir.iterdir(), reverse=True):
        cand = d / "page.csv" if d.is_dir() else None
        if cand and cand.exists():
            gsc_csv = cand
            break
    if not gsc_csv:
        print("     no GSC pull found alongside; run gsc-pull.py first")
    else:
        gsc_clicks = sum(int(r["clicks"]) for r in csv.DictReader(open(gsc_csv, encoding="utf-8")))
        r = run(client, prop, ["sessionSourceMedium"], ["sessions"], start, end, limit=200)
        org = sum(int(x.metric_values[0].value) for x in r.rows
                  if x.dimension_values[0].value.lower() in ("google / organic",))
        print(f"     Search Console clicks : {gsc_clicks}")
        print(f"     GA4 google/organic    : {org}")
        if gsc_clicks and org > 3 * gsc_clicks:
            flags.append(f"GA4 google/organic ({org}) is {org/gsc_clicks:.1f}x Search Console "
                         f"clicks ({gsc_clicks}); search cannot have sent that many")
        elif gsc_clicks:
            print(f"     ratio {org/gsc_clicks:.2f}x  (roughly 0.7-1.3x is normal)")

    print("\n" + "=" * 62)
    if flags:
        print("SUSPECT SIGNALS:")
        for f in flags:
            print("  - " + f)
    else:
        print("No ghost-spam hostnames, no zero-engagement segments, no spikes.")
        print("Traffic looks organic.")
    print(f"\nwrote {stamp}")


if __name__ == "__main__":
    main()
