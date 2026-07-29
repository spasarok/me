const { layout, escapeHtml } = require('./layout');

function postLink(post, root) {
  if (post.content) return `${root}posts/${post.slug}/`;
  if (post.url) return post.url;
  return '#';
}

function renderPosts({ site, nav, data }) {
  const root = '../';
  const items = (data.posts || []).map((post) => `<article>
                <h2>
                    ${escapeHtml(post.title)}
                    <a href="${escapeHtml(postLink(post, root))}">
                        <button type="button" class="btn btn-primary btn-xs">Here!</button>
                    </a>
                </h2>
                ${post.summary || ''}
            </article>`).join('\n            ');

  const content = `<main class="archive">
    <div class="container">
        <h1>Posts</h1>
        ${items}
    </div>
</main>`;

  return layout({
    site,
    nav,
    title: `Posts | ${site.title}`,
    bodyClass: 'archive',
    root,
    content,
  });
}

module.exports = { renderPosts };
