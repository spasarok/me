const fs = require('fs');
const path = require('path');

const {renderHome} = require('../src/templates/home');
const {renderResume} = require('../src/templates/resume');
const {renderPosts} = require('../src/templates/posts');
const {renderPage} = require('../src/templates/page');

const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

function loadData() {
    const raw = fs.readFileSync(path.join(ROOT, 'data', 'site.json'), 'utf8');
    return JSON.parse(raw);
}

function writeFile(relPath, contents) {
    const fullPath = path.join(DIST, relPath);
    fs.mkdirSync(path.dirname(fullPath), {recursive: true});
    fs.writeFileSync(fullPath, contents);
}

function copyDir(src, dest) {
    if (!fs.existsSync(src)) return;
    fs.mkdirSync(dest, {recursive: true});
    for (const entry of fs.readdirSync(src, {withFileTypes: true})) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

function build() {
    fs.rmSync(DIST, {recursive: true, force: true});

    const data = loadData();
    const {site, nav, socials} = data;

    writeFile('index.html', renderHome({site, nav, data}));
    writeFile('resume/index.html', renderResume({site, nav, data}));
    writeFile('posts/index.html', renderPosts({site, nav, data}));

    for (const post of data.posts || []) {
        if (!post.content) continue;
        writeFile(
            `posts/${post.slug}/index.html`,
            renderPage({
                site,
                nav,
                title: post.title,
                socials,
                contentHtml: post.content,
                root: '../../',
            })
        );
    }

    for (const page of data.pages || []) {
        writeFile(
            `${page.slug}/index.html`,
            renderPage({
                site,
                nav,
                title: page.title,
                socials,
                contentHtml: page.content,
                root: '../',
            })
        );
    }

    copyDir(path.join(ROOT, 'assets'), path.join(DIST, 'assets'));
    copyDir(path.join(ROOT, 'lib'), path.join(DIST, 'lib'));
    fs.copyFileSync(path.join(ROOT, 'style.css'), path.join(DIST, 'style.css'));

    console.log(`Built site into ${path.relative(ROOT, DIST)}/`);
}

build();
