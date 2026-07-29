const { layout, escapeHtml, kbd } = require('./layout');

function renderHome({ site, nav, data }) {
  const root = '';
  const { avatar, intro, tags } = data.home;
  const content = `<main class="page">
    <div class="container">
        <h1>${escapeHtml(site.title)}</h1>
        <div class="container">
            <div class="row">
                <div class="col-sm-6">
                    <section>
                        <h2>About</h2>
                         <p>
                            ${kbd(tags)}
                        </p>
                    </section>
                    <section>
                        
                    </section>
                </div>
                 <div class="col-sm-6 avatar-wrapper">
                    ${avatar ? `<img class="avatar" src="${escapeHtml(root + avatar)}" alt="${escapeHtml(site.title)}">` : ''}
                </div>
            </div>
        </div>  
    </div>
</main>`;

  return layout({
    site,
    nav,
    title: site.title,
    socials: data.socials,
    bodyClass: 'home',
    root,
    content,
  });
}

module.exports = { renderHome };
