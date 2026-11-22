const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const pages = ['demo/index.html', 'contrafactual/index.html'];

for (const relative of pages) {
  test(`${relative} has baseline responsive and accessible form semantics`, () => {
    const html = fs.readFileSync(path.join(root, relative), 'utf8');
    assert.match(html, /<html\s+lang="es"/i, 'document language must be declared');
    assert.match(html, /name="viewport"[^>]*width=device-width/i, 'viewport must use device width');
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
    assert.equal(new Set(ids).size, ids.length, 'IDs must be unique');
    const labels = new Set([...html.matchAll(/<label[^>]*for="([^"]+)"/g)].map(match => match[1]));
    for (const control of html.matchAll(/<(input|select|textarea)\b[^>]*>/gi)) {
      const id = control[0].match(/\bid="([^"]+)"/i)?.[1];
      assert.ok(id, `${control[1]} controls must have an ID`);
      assert.ok(labels.has(id), `${control[1]} ${id} must have an explicit label`);
    }
    for (const match of html.matchAll(/<label[^>]*for="([^"]+)"/g)) {
      assert.ok(ids.includes(match[1]), `label target ${match[1]} must exist`);
    }
    assert.match(html, /@media\s*\(max-width:/, 'mobile layout breakpoint must exist');
    assert.match(html, /aria-live="polite"|role="status"/i, 'calculated status must have announcement semantics');
    assert.match(html, /role="alert"/i, 'input errors must be announced assertively');
  });
}

test('demo tables and focus treatment remain usable on small screens', () => {
  const html = fs.readFileSync(path.join(root, 'demo/index.html'), 'utf8');
  assert.match(html, /<caption[^>]*class="sr-only"/i);
  assert.match(html, /\.graph\s*\{[^}]*overflow-x:auto/s);
  assert.match(html, /:focus-visible\s*\{[^}]*outline/s);
  assert.match(html, /@media\s*\(max-width:\s*810px\)/);
  assert.match(html, /font-size:clamp\(/, 'headline scales with viewport size');
});

test('counterfactual inputs have required bounds and keyboard focus visibility', () => {
  const html = fs.readFileSync(path.join(root, 'contrafactual/index.html'), 'utf8');
  for (const id of ['reference', 'observed', 'low', 'high']) {
    assert.match(html, new RegExp(`<input[^>]*id="${id}"[^>]*required`));
  }
  assert.match(html, /:focus-visible\s*\{[^}]*outline/s);
  assert.match(html, /@media\s*\(max-width:\s*700px\)/);
  assert.match(html, /@media\s*\(max-width:\s*390px\)/);
});
