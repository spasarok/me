const { layout, escapeHtml } = require('./layout');

function kbd(tags) {
  return (tags || []).map((tag) => `<kbd>${escapeHtml(tag)}</kbd>`).join(' ');
}

function yearOf(dateStr) {
  const match = /\b(\d{4})\b/.exec(dateStr || '');
  return match ? match[1] : '';
}

function resumeItem(item, isFirst, root) {
  return `<article class="resume-item">
                    <img class="icon" src="${escapeHtml(root + item.icon)}" alt="${escapeHtml(item.title)}">
                    ${isFirst ? `<time class="year">${escapeHtml(yearOf(item.start))}</time>` : ''}
                    <div class="bullet"><div class="bullet-inner"></div></div>
                    <div class="details">
                        <div class="position">${escapeHtml(item.title)}</div>
                        <div class="employer">${escapeHtml(item.employer)}</div>
                        <time>
                            ${escapeHtml(item.start)}${item.present ? ' - Present' : (item.end ? ` - ${escapeHtml(item.end)}` : '')}
                        </time>
                        <div class="tags">${kbd(item.tags)}</div>
                    </div>
                </article>`;
}

function timeline(items, root) {
  return items.map((item, i) => resumeItem(item, i === 0, root)).join('\n                ');
}

function renderResume({ site, nav, data }) {
  const root = '../';
  const { skills, languages, technologies, experience, outreach } = data.resume;

  const content = `<main class="resume">
    <div class="container">
        <h1>Resume</h1>
        
        <section class="skills">
            <h2>Skills</h2>
            <section class="concepts">
                ${kbd(skills.tags)}
            </section>
            
            <section class="languages">
                ${kbd(languages.tags)}
            </section>
            
            <section class="technologies">
                ${kbd(technologies.tags)}
            </section>
        </section>

        <section class="experience">
            <h2>Experience</h2>
            <div class="timeline">
                ${timeline(experience, root)}
            </div>
        </section>

        <section class="outreach">
            <h2>Outreach</h2>
            <div class="timeline">
                ${timeline(outreach, root)}
            </div>
        </section>
    </div>
</main>`;

  return layout({
    site,
    nav,
    title: `Resume | ${site.title}`,
    bodyClass: 'resume',
    root,
    content,
  });
}

module.exports = { renderResume };
