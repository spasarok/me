function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[c]));
}

function renderNav(nav, root) {
  const items = nav.map((item) => {
    const href = (root + item.url) || './';
    return `<li><a href="${escapeHtml(href)}">${escapeHtml(item.label)}</a></li>`;
  }).join('\n            ');
  return `<ul>\n            ${items}\n        </ul>`;
}

function layout({ site, nav, title, bodyClass, root, content }) {
  const cssPath = (p) => `${root}${p}`;
  return `<!DOCTYPE html>
<html>
<head>
    <title>${escapeHtml(title)}</title>
    <link rel="stylesheet" href="${cssPath('lib/bootstrap-3.3.6/css/bootstrap.min.css')}">
    <link rel="stylesheet" href="${cssPath('style.css')}">
</head>

<body${bodyClass ? ` class="${escapeHtml(bodyClass)}"` : ''}>

<header>
    <div class="container">
        <h1>${escapeHtml(site.title)}</h1>
    </div>
    <nav class="container">
        ${renderNav(nav, root)}
    </nav>
</header>

${content}

<footer>
    <div class="container">
<!--        <p>This site and its intellectual contents copyright ${escapeHtml(site.copyrightName)} ${new Date().getFullYear()}</p>-->
    </div>
</footer>

</body>
</html>
`;
}

module.exports = { layout, escapeHtml };
