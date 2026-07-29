const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const WATCH_TARGETS = ['data', 'src', 'style.css'];

let pending = false;

function build() {
  try {
    execFileSync('node', [path.join(ROOT, 'scripts', 'build.js')], { stdio: 'inherit' });
  } catch (err) {
    console.error('Build failed:', err.message);
  }
}

function scheduleBuild() {
  if (pending) return;
  pending = true;
  setTimeout(() => {
    pending = false;
    build();
  }, 100);
}

build();

for (const target of WATCH_TARGETS) {
  const fullPath = path.join(ROOT, target);
  fs.watch(fullPath, { recursive: true }, (eventType, filename) => {
    console.log(`Changed: ${path.join(target, filename || '')}`);
    scheduleBuild();
  });
}

console.log(`Watching ${WATCH_TARGETS.join(', ')} for changes...`);
