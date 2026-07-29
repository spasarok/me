function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[c]));
}

function kbd(tags) {
  return (tags || []).map((tag) => `<kbd>${escapeHtml(tag)}</kbd>`).join(' ');
}

function socialLink(item, root) {
  return `<a href="${item.url}" class="social-link">
        <img class="icon" src="${escapeHtml(root + item.iconLight)}" alt="${escapeHtml(item.label)}">
      </a>
    </article>`;
}

function renderNav(nav, root) {
  const items = nav.map((item) => {
    const href = (root + item.url) || './';
    return `<li><a href="${escapeHtml(href)}">${escapeHtml(item.label)}</a></li>`;
  }).join('\n            ');
  return `<input type="checkbox" id="nav-toggle" class="nav-toggle">
        <label for="nav-toggle" class="nav-toggle-label" aria-label="Toggle navigation">
            <span></span>
            <span></span>
            <span></span>
        </label>
        <ul>\n            ${items}\n        </ul>`;
}

function layout({ site, nav, title, socials, bodyClass, root, content }) {
  const cssPath = (p) => `${root}${p}`;
  return `<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(title)}</title>
    <link rel="stylesheet" href="${cssPath('lib/bootstrap-3.3.6/css/bootstrap.min.css')}">
    <link rel="stylesheet" href="${cssPath('style.css')}">
</head>

<body${bodyClass ? ` class="${escapeHtml(bodyClass)}"` : ''}>

<header>
    
    <div class="container">
    <div class="socials">
        ${socials.map((social) => socialLink(social, root))}
    </div>
        <h1><a href="${escapeHtml(root)}">${escapeHtml(site.title)}</a></h1>
    </div>
    <nav class="container">
        ${renderNav(nav, root)}
    </nav>
</header>

${content}

<footer>
    <div class="container">
                <div class="socials">
                    ${socials.map((social) => socialLink(social, root))}
                </div>
    </div>
</footer>

</body>
</html>
`;
}

module.exports = { layout, escapeHtml, kbd };
