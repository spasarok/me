const { layout, escapeHtml } = require('./layout');

function renderPage({ site, nav, title, contentHtml, root }) {
  const content = `<main class="page">
    <div class="container">
        <h1>${escapeHtml(title)}</h1>
        ${contentHtml}
    </div>
</main>`;

  return layout({
    site,
    nav,
    title: `${title} | ${site.title}`,
    bodyClass: 'page',
    root,
    content,
  });
}

module.exports = { renderPage };
