#!/usr/bin/env python3
"""Pull Search Console performance data for scout-elite.com.

Setup (one time):
  1. GCP project -> enable "Google Search Console API"
  2. Create a service account, download a JSON key
  3. Search Console -> Settings -> Users and permissions -> Add user
     -> the service account email, permission "Restricted"
  4. Save the key to ~/.config/gsc/sa.json  (chmod 600)

Run with the venv python:
  ~/.venvs/gsc/bin/python "Reference Material/analytics/gsc-pull.py" --days 90
  ~/.venvs/gsc/bin/python "Reference Material/analytics/gsc-pull.py" --days 90 --dims query page
  ~/.venvs/gsc/bin/python "Reference Material/analytics/gsc-pull.py" --days 28 --compare

Writes CSVs to Reference Material/analytics/out/<END-DATE>/ and prints a summary.
"""
import argparse, csv, datetime as dt, os, pathlib, sys

KEY = os.path.expanduser("~/.config/gsc/sa.json")
# Leave GSC_SITE unset to auto-detect. The property may be a domain property
# ("sc-domain:scout-elite.com") or a URL-prefix one ("https://scout-elite.com/");
# hardcoding the wrong shape returns a 403 that looks like a permissions problem.
SITE = os.environ.get("GSC_SITE")
SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]
OUT = pathlib.Path(__file__).resolve().parent / "out"


def service():
    if not os.path.exists(KEY):
        sys.exit(f"No service-account key at {KEY}. See the setup steps in this file's docstring.")
    from google.oauth2 import service_account
    from googleapiclient.discovery import build
    creds = service_account.Credentials.from_service_account_file(KEY, scopes=SCOPES)
    return build("searchconsole", "v1", credentials=creds, cache_discovery=False)


def resolve_site(svc):
    """Pick the property to query. Prefer $GSC_SITE, else the only one we can see."""
    if SITE:
        return SITE
    sites = svc.sites().list().execute().get("siteEntry", [])
    usable = [s["siteUrl"] for s in sites if s["permissionLevel"] != "siteUnverifiedUser"]
    if not usable:
        sys.exit("Service account can't see any Search Console property. Add its email as a "
                 "user under Settings -> Users and permissions.")
    if len(usable) > 1:
        prefer = [u for u in usable if u.startswith("sc-domain:")] or usable
        print(f"note: {len(usable)} properties visible, using {prefer[0]} (set GSC_SITE to override)")
        return prefer[0]
    return usable[0]


def query(svc, site, start, end, dims, limit=25000, exclude_country=()):
    """Page through the Search Analytics API. GSC caps a single response at 25k rows."""
    rows, start_row = [], 0
    while True:
        body = {
            "startDate": start, "endDate": end,
            "dimensions": dims,
            "rowLimit": min(limit, 25000),
            "startRow": start_row,
            "dataState": "final",
        }
        if exclude_country:
            body["dimensionFilterGroups"] = [{
                "groupType": "and",
                "filters": [{"dimension": "country", "operator": "notEquals",
                             "expression": c} for c in exclude_country]}]
        resp = svc.searchanalytics().query(siteUrl=site, body=body).execute()
        batch = resp.get("rows", [])
        rows += batch
        if len(batch) < body["rowLimit"] or len(rows) >= limit:
            return rows
        start_row += len(batch)


def write(rows, dims, path):
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(dims + ["clicks", "impressions", "ctr", "position"])
        for r in rows:
            w.writerow(list(r["keys"]) + [r["clicks"], r["impressions"],
                                          round(r["ctr"] * 100, 3), round(r["position"], 2)])
    return path


def totals(rows):
    c = sum(r["clicks"] for r in rows)
    i = sum(r["impressions"] for r in rows)
    return c, i, (100 * c / i if i else 0)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--days", type=int, default=90)
    ap.add_argument("--dims", nargs="+", default=None,
                    help="e.g. query | page | 'query page' | date device country")
    ap.add_argument("--exclude-country", nargs="*", default=[],
                    help="3-letter codes to filter out, e.g. bra prt. "
                         "scoutelite.com.br brand-confusion traffic lives in bra/prt.")
    ap.add_argument("--compare", action="store_true",
                    help="also pull the preceding equal-length window")
    args = ap.parse_args()

    svc = service()
    site = resolve_site(svc)
    # GSC finalises data on a ~2-3 day lag; back off the end date so runs are comparable.
    end = dt.date.today() - dt.timedelta(days=3)
    start = end - dt.timedelta(days=args.days - 1)
    sets = args.dims and [args.dims] or [["query"], ["page"], ["query", "page"], ["date"]]

    stamp = OUT / end.isoformat()
    excl = f"  excluding {','.join(args.exclude_country)}" if args.exclude_country else ""
    print(f"site={site}  window={start}..{end} ({args.days}d){excl}\n")
    for dims in sets:
        rows = query(svc, site, start.isoformat(), end.isoformat(), dims,
                         exclude_country=args.exclude_country)
        p = write(rows, dims, stamp / ("-".join(dims) + ".csv"))
        c, i, ctr = totals(rows)
        print(f"  {'+'.join(dims):16s} {len(rows):6d} rows  {c:6d} clicks  {i:7d} impr  {ctr:5.2f}% CTR  -> {p.relative_to(pathlib.Path.cwd()) if str(p).startswith(str(pathlib.Path.cwd())) else p}")

        if args.compare:
            pend = start - dt.timedelta(days=1)
            pstart = pend - dt.timedelta(days=args.days - 1)
            prev = query(svc, site, pstart.isoformat(), pend.isoformat(), dims,
                                 exclude_country=args.exclude_country)
            write(prev, dims, stamp / ("-".join(dims) + "-prev.csv"))
            pc, pi, pctr = totals(prev)
            d = lambda now, was: f"{now-was:+d} ({100*(now-was)/was:+.0f}%)" if was else "n/a"
            print(f"  {'':16s} vs {pstart}..{pend}: clicks {d(c,pc)}, impressions {d(i,pi)}, CTR {ctr-pctr:+.2f}pt")
    print(f"\nwrote {stamp}")


if __name__ == "__main__":
    main()
