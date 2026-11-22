const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function loadSimulator() {
  const html = fs.readFileSync('contrafactual/index.html', 'utf8');
  const elements = new Map();
  for (const match of html.matchAll(/\bid="([^"]+)"/g)) elements.set(match[1], {id:match[1], value:'', textContent:'', innerHTML:'', hidden:false, listeners:{}, addEventListener(type,fn){this.listeners[type]=fn;}});
  for (const match of html.matchAll(/<input\b[^>]*\bid="([^"]+)"[^>]*>/g)) {
    const value = match[0].match(/\bvalue="([^"]*)"/);
    elements.get(match[1]).value = value?.[1] ?? '';
  }
  const script = html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
  assert.ok(script, 'simulator script exists');
  vm.runInNewContext(script, {document:{getElementById:id=>elements.get(id)}});
  return elements;
}

test('default counterfactual preserves total and computes equal-split peaks', () => {
  const e=loadSimulator();
  assert.equal(e.get('gap').textContent,'49.640 invitaciones');
  assert.equal(e.get('peakA').textContent,'12.410');
  assert.equal(e.get('peakB').textContent,'24.820');
  assert.match(e.get('mammosA').textContent,/6006–6528/);
  assert.match(e.get('mammosB').textContent,/12\.013–13\.055/);
  const sum=(id)=>[...e.get(id).innerHTML.matchAll(/<b>([\d.]+)<\/b>/g)].reduce((s,m)=>s+Number(m[1].replaceAll('.','')),0);
  assert.equal(sum('periodsA'),49640);
  assert.equal(sum('periodsB'),49640);
});

test('reversed participation limits raise an accessible error instead of silently swapping', () => {
  const e=loadSimulator();
  e.get('low').value='70'; e.get('high').value='60'; e.get('low').listeners.input();
  assert.equal(e.get('inputError').hidden,false);
  assert.match(e.get('inputError').textContent,/mínimo no puede superar/);
  assert.equal(e.get('gap').textContent,'Revisa los datos');
});

test('negative differences are explicitly shown as zero positive proxy', () => {
  const e=loadSimulator();
  e.get('reference').value='100'; e.get('observed').value='120'; e.get('reference').listeners.input();
  assert.equal(e.get('gap').textContent,'0 invitaciones');
  assert.match(e.get('gapNote').textContent,/supera a la referencia/);
  assert.match(e.get('tradeoff').textContent,/no se comparan tiempos/);
});
