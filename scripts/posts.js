const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');

function loadPosts(postsDir) {
  const posts = new Map();
  if (!fs.existsSync(postsDir)) return posts;

  for (const entry of fs.readdirSync(postsDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;

    const slug = entry.name;
    const pageFile = path.join(postsDir, slug, 'index.md');
    if (!fs.existsSync(pageFile)) continue;

    const raw = fs.readFileSync(pageFile, 'utf8');
    const { data: frontmatter, content } = matter(raw);

    posts.set(slug, {
      slug,
      title: frontmatter.title || slug,
      date: frontmatter.date || null,
      summaryHtml: frontmatter.summary ? marked.parse(frontmatter.summary) : '',
      contentHtml: marked.parse(content),
    });
  }

  return posts;
}

module.exports = { loadPosts };
