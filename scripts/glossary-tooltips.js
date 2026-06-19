/* Site-wide hockey glossary tooltips.
   Loaded on blog posts (layout: post). Scans the article body for the first
   occurrence of each distinctive glossary term (tip: true in _data/hockey_glossary.json),
   wraps it in a dotted-underline span, and shows a definition popover on
   hover / focus / tap. The full glossary lives at /hockey-glossary/.

   Depends on window.HOCKEY_GLOSSARY (injected inline from _data by the layout). */
(function () {
  if (!window.HOCKEY_GLOSSARY) return;

  function init() {
    var root = document.querySelector('.blog-post-content');
    if (!root) return;

    injectStyles();

    // Distinctive terms only, longest first so "rush defense" beats "rush".
    var terms = window.HOCKEY_GLOSSARY
      .filter(function (x) { return x.tip; })
      .slice()
      .sort(function (a, b) { return b.t.length - a.t.length; });

    terms.forEach(function (term) { wrapFirst(root, term); });

    setupPopover();
  }

  // --- Wrapping -------------------------------------------------------------

  var SKIP_TAGS = /^(A|BUTTON|CODE|PRE|H1|H2|H3|H4|H5|H6|SCRIPT|STYLE|TEXTAREA|INPUT)$/;

  function inSkip(node, root) {
    var el = node.parentElement;
    while (el && el !== root.parentElement) {
      if (el.classList && (el.classList.contains('gloss-term') || el.id === 'glossary-tool')) return true;
      if (el.tagName && SKIP_TAGS.test(el.tagName)) return true;
      el = el.parentElement;
    }
    return false;
  }

  function collectTextNodes(root) {
    var nodes = [];
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
    var n;
    while ((n = walker.nextNode())) {
      if (!n.nodeValue || !n.nodeValue.trim()) continue;
      if (inSkip(n, root)) continue;
      nodes.push(n);
    }
    return nodes;
  }

  function wrapFirst(root, term) {
    var esc = term.t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Boundary that treats letters, digits and hyphens as "word" chars, so
    // "rush" won't match inside "rushing" and "odd-man" stays intact.
    var re = new RegExp('(^|[^A-Za-z0-9-])(' + esc + ')(?![A-Za-z0-9-])', 'i');

    var nodes = collectTextNodes(root);
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      var m = re.exec(node.nodeValue);
      if (!m) continue;

      var start = m.index + m[1].length;
      var matched = node.nodeValue.substr(start, m[2].length);

      var after = node.splitText(start);
      after.nodeValue = after.nodeValue.substr(m[2].length);

      var span = document.createElement('span');
      span.className = 'gloss-term';
      span.textContent = matched;
      span.tabIndex = 0;
      span.setAttribute('role', 'button');
      span.setAttribute('aria-label', term.t + ': definition');
      span.setAttribute('data-def', term.d);
      span.setAttribute('data-cat', term.c);
      span.setAttribute('data-term', term.t);

      after.parentNode.insertBefore(span, after);
      return; // first occurrence only
    }
  }

  // --- Popover --------------------------------------------------------------

  function setupPopover() {
    var pop = document.createElement('div');
    pop.className = 'gloss-popover';
    pop.hidden = true;
    document.body.appendChild(pop);

    var hideTimer = null;
    var pinned = false;
    var current = null;

    function slug(t) {
      return t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    }

    function show(span) {
      clearTimeout(hideTimer);
      current = span;
      var href = '/hockey-glossary/#term-' + slug(span.getAttribute('data-term'));
      pop.innerHTML =
        '<span class="gloss-pop-cat">' + span.getAttribute('data-cat') + '</span>' +
        span.getAttribute('data-def') +
        '<a class="gloss-pop-link" href="' + href + '">Open the full glossary &rarr;</a>';
      pop.hidden = false;
      position(span);
    }

    function position(span) {
      var r = span.getBoundingClientRect();
      var pr = pop.getBoundingClientRect();
      var margin = 8;
      var left = r.left;
      if (left + pr.width > window.innerWidth - margin) {
        left = window.innerWidth - margin - pr.width;
      }
      if (left < margin) left = margin;

      var top = r.bottom + 6;
      if (top + pr.height > window.innerHeight - margin) {
        top = r.top - pr.height - 6; // flip above if no room below
      }
      pop.style.left = Math.round(left) + 'px';
      pop.style.top = Math.round(Math.max(margin, top)) + 'px';
    }

    function hide() {
      pop.hidden = true;
      pinned = false;
      current = null;
    }

    function scheduleHide() {
      if (pinned) return;
      hideTimer = setTimeout(hide, 180);
    }

    document.addEventListener('mouseover', function (e) {
      var span = e.target.closest && e.target.closest('.gloss-term');
      if (span) { show(span); }
    });
    document.addEventListener('mouseout', function (e) {
      var span = e.target.closest && e.target.closest('.gloss-term');
      if (span) scheduleHide();
    });

    pop.addEventListener('mouseenter', function () { clearTimeout(hideTimer); });
    pop.addEventListener('mouseleave', scheduleHide);

    document.addEventListener('focusin', function (e) {
      var span = e.target.closest && e.target.closest('.gloss-term');
      if (span) show(span);
    });
    document.addEventListener('focusout', function (e) {
      var span = e.target.closest && e.target.closest('.gloss-term');
      if (span) scheduleHide();
    });

    // Tap / click pins it open (mobile + lets you reach the link).
    document.addEventListener('click', function (e) {
      var span = e.target.closest && e.target.closest('.gloss-term');
      if (span) {
        e.preventDefault();
        if (pinned && current === span) { hide(); }
        else { show(span); pinned = true; }
        return;
      }
      if (!e.target.closest('.gloss-popover')) hide();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') hide();
    });
    window.addEventListener('scroll', function () { if (!pinned) hide(); }, true);
  }

  // --- Styles ---------------------------------------------------------------

  function injectStyles() {
    if (document.getElementById('gloss-tip-styles')) return;
    var css =
      '.gloss-term{border-bottom:1px dotted var(--accent-primary);cursor:help;}' +
      '.gloss-term:hover,.gloss-term:focus{background:rgba(51,207,255,0.08);outline:none;border-radius:2px;}' +
      '.gloss-popover{position:fixed;z-index:9999;max-width:320px;background:var(--card-bg);' +
      'color:var(--text-secondary);border:1px solid var(--border-color);border-radius:var(--radius-md);' +
      'padding:0.85em 1em;font-size:0.9em;line-height:1.55;box-shadow:0 8px 28px rgba(0,0,0,0.4);}' +
      '.gloss-popover[hidden]{display:none;}' +
      '.gloss-popover em{color:var(--text-primary);font-style:italic;}' +
      '.gloss-pop-cat{display:block;font-size:0.68em;font-weight:700;letter-spacing:0.05em;' +
      'text-transform:uppercase;color:var(--accent-primary);margin-bottom:0.4em;}' +
      '.gloss-pop-link{display:block;margin-top:0.65em;font-size:0.85em;color:var(--accent-primary);' +
      'text-decoration:none;font-weight:600;}' +
      '.gloss-pop-link:hover{text-decoration:underline;}';
    var style = document.createElement('style');
    style.id = 'gloss-tip-styles';
    style.textContent = css;
    document.head.appendChild(style);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
