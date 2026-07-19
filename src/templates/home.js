const { layout, escapeHtml } = require('./layout');

function renderHome({ site, nav, data }) {
  const root = '';
  const { avatar, intro } = data.home;
  const content = `<main class="page">
    <div class="container">
        <h1>${escapeHtml(site.title)}</h1>
        ${avatar ? `<img class="avatar" src="${escapeHtml(root + avatar)}" alt="${escapeHtml(site.title)}">` : ''}
        ${intro}
    </div>
</main>`;

  return layout({
    site,
    nav,
    title: site.title,
    bodyClass: 'home',
    root,
    content,
  });
}

module.exports = { renderHome };
