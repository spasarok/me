const http = require('http');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const MIME = require('./mime');

const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const PORT = process.env.PORT || 8080;
const WATCH_TARGETS = ['data', 'src', 'style.css'];

const RELOAD_SNIPPET = `
<script>
(function () {
  var source = new EventSource('/__reload');
  source.onmessage = function (event) {
    if (event.data === 'reload') location.reload();
  };
})();
</script>
</body>`;

let sseClients = [];

function build() {
  try {
    execFileSync('node', [path.join(ROOT, 'scripts', 'build.js')], { stdio: 'inherit' });
    return true;
  } catch (err) {
    console.error('Build failed:', err.message);
    return false;
  }
}

function notifyReload() {
  for (const res of sseClients) res.write('data: reload\n\n');
}

let pending = false;
function scheduleRebuild() {
  if (pending) return;
  pending = true;
  setTimeout(() => {
    pending = false;
    if (build()) notifyReload();
  }, 100);
}

function serveFile(req, res) {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  if (urlPath.endsWith('/')) urlPath += 'index.html';

  const filePath = path.join(DIST, urlPath);
  if (!filePath.startsWith(DIST)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
      return;
    }
    const ext = path.extname(filePath);
    if (ext === '.html') {
      const html = data.toString().replace('</body>', RELOAD_SNIPPET);
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
      return;
    }
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  if (req.url === '/__reload') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    });
    res.write('\n');
    sseClients.push(res);
    req.on('close', () => {
      sseClients = sseClients.filter((client) => client !== res);
    });
    return;
  }
  serveFile(req, res);
});

build();
server.listen(PORT, () => {
  console.log(`Dev server with hot reload at http://localhost:${PORT}`);
});

for (const target of WATCH_TARGETS) {
  fs.watch(path.join(ROOT, target), { recursive: true }, (eventType, filename) => {
    console.log(`Changed: ${path.join(target, filename || '')}`);
    scheduleRebuild();
  });
}
