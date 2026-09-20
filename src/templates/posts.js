const { layout, escapeHtml } = require('./layout');

function renderPosts({ site, nav, data, posts }) {
  const root = '../';
  const items = posts.map((post) => `<article>
                <h2>
                    <a href="${root}posts/${escapeHtml(post.slug)}/">
                        ${escapeHtml(post.title)}
                    </a>
                </h2>
                ${post.summaryHtml || ''}
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
    socials: data.socials,
    bodyClass: 'archive',
    root,
    content,
  });
}

module.exports = { renderPosts };
