const { layout, escapeHtml } = require('./layout');

function lessonLink(lesson, root) {
  if (lesson.content) return `${root}lessons/${lesson.slug}/`;
  if (lesson.url) return lesson.url;
  return '#';
}

function renderLessons({ site, nav, data }) {
  const root = '../';
  const items = (data.lessons || []).map((lesson) => `<article>
                <h2>
                    ${escapeHtml(lesson.title)}
                    <a href="${escapeHtml(lessonLink(lesson, root))}">
                        <button type="button" class="btn btn-primary btn-xs">Here!</button>
                    </a>
                </h2>
                ${lesson.summary || ''}
            </article>`).join('\n            ');

  const content = `<main class="archive">
    <div class="container">
        <h1>Lessons</h1>

        ${items}
    </div>
</main>`;

  return layout({
    site,
    nav,
    title: `Lessons | ${site.title}`,
    bodyClass: 'archive',
    root,
    content,
  });
}

module.exports = { renderLessons };
