const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const model = require('../demo/model.js');
const data = require('../demo/data.js');
const approx = (actual, expected, tolerance = 1e-8) => assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} differs from ${expected}`);

test('plan weights each sum to one and plans preserve invitation totals', () => {
  for (const weights of Object.values(model.plans)) {
    assert.equal(weights.reduce((sum, value) => sum + value, 0), 1);
  }
  for (const input of [
    [0, 0, 0, 0, 0], [1, 1, 1, 0, 1], [7253031, 0.4, 0.725, 0.05, 250000],
  ]) {
    const result = model.calculate(...input);
    assert.equal(result.A.invited, result.B.invited);
    assert.equal(result.A.total, result.B.total);
    approx(result.A.periods.reduce((s, p) => s + p.invitations, 0), result.A.invited);
    approx(result.B.periods.reduce((s, p) => s + p.invitations, 0), result.B.invited);
    approx(result.A.periods.reduce((s, p) => s + p.tests, 0), result.A.total);
    approx(result.B.periods.reduce((s, p) => s + p.tests, 0), result.B.total);
  }
});

test('scenario peak matches specified weights and the threshold is per period', () => {
  const result = model.calculate(1000, 1, 0.5, 0.05, 200);
  assert.equal(result.A.peak, 200);
  assert.equal(result.B.peak, 250);
  assert.equal(result.A.above, 0, 'strictly equal to the threshold is not above it');
  assert.equal(result.B.above, 1);
  assert.equal(result.A.followup, 25);
});

test('sensitivity is monotone and rejects reversed or invalid inputs', () => {
  const result = model.sensitivity(1000, 1, 0.4, 0.8, 0.05, 300);
  assert.ok(result.low.A.total <= result.high.A.total);
  assert.ok(result.low.B.peak <= result.high.B.peak);
  assert.throws(() => model.sensitivity(1000, 1, 0.8, 0.4, 0.05, 300), RangeError);
  for (const input of [[-1, 1, 1, 0, 0], [1.5, 1, 1, 0, 0], [1, 1.1, 1, 0, 0], [1, 1, -0.1, 0, 0], [1, 1, 1, 1.1, 0], [1, 1, 1, 0, -1], [1, 1, 1, 0, 0.5]]) {
    assert.throws(() => model.calculate(...input), RangeError);
  }
});

test('embedded UI data matches the current official INE extract and allowed sources', () => {
  const readCsv = (file) => fs.readFileSync(file, 'utf8').trim().split(/\r?\n/).slice(1).map(line => line.split(','));
  const populationRows = readCsv(path.join(__dirname, '../demo/data/population_2026-10.csv'));
  const byCode = new Map(populationRows.map(([code, , , , a, b, c]) => [code, [Number(a), Number(b), Number(c)]]));
  assert.equal(data.referenceDate, '1 de octubre de 2026');
  assert.equal(data.referenceDateISO, '2026-10-01');
  assert.equal(data.territories.length, 19);
  for (const territory of data.territories) {
    assert.deepEqual([territory.bands['45_49'], territory.bands['50_69'], territory.bands['70_74']], byCode.get(territory.code));
    assert.equal(Object.hasOwn(territory, 'rate'), false, 'unverified Red rates must not be in application data');
  }
  const national = byCode.get('00');
  assert.deepEqual([data.national['45_49'], data.national['50_69'], data.national['70_74']], national);
  assert.equal(fs.existsSync(path.join(__dirname, '../demo/data/participation_red_2023_50-69.csv')), false);
  const madridSource=fs.readFileSync(path.join(__dirname,'../demo/data/madrid_context_2025_ccaa.csv'),'utf8').trim().split(/\r?\n/).map(line=>line.split(';'));
  const madridHeader=madridSource[0], madridRow=madridSource.find(row=>row[0]==='Comunidad de Madrid');
  for (const band of ['45_49','50_69','70_74']) assert.equal(data.madrid2025[band],Number(madridRow[madridHeader.indexOf(`mujeres_${band}`)]));
  const html = fs.readFileSync(path.join(__dirname, '../demo/index.html'), 'utf8');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, 'HTML ids must be unique');
  for (const match of html.matchAll(/<label[^>]*for="([^"]+)"/g)) assert.ok(ids.includes(match[1]), `missing label target ${match[1]}`);
  assert.match(html, /\$\{DATA\.referenceDate\}/);
  assert.match(html, /No se incluye el CSV de Red porque no hay autorización de redistribución verificada/);
  assert.doesNotMatch(html, /useHistorical|rateSource|referencia histórica 2023/);
  assert.match(html, /Límite de mamografías por periodo/);
  assert.match(html, /id="limitResult"[^>]*aria-live="polite"/);
  assert.match(html, /focus-visible/);
});

test('core style palette meets WCAG AA text contrast for key combinations', () => {
  const luminance = (hex) => {
    const rgb = hex.match(/[\da-f]{2}/gi).map(x => parseInt(x, 16) / 255).map(x => x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4);
    return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  };
  const ratio = (a, b) => {
    const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
    return (hi + 0.05) / (lo + 0.05);
  };
  const html=fs.readFileSync(path.join(__dirname, '../demo/index.html'), 'utf8');
  const inStylesheet=(color)=>{
    const hex=color.slice(1);
    const short=hex.length===6 && [...hex].every((v,i)=>i%2===0 ? v===hex[i+1] : v===hex[i-1])
      ? `#${hex[0]}${hex[2]}${hex[4]}` : '';
    return html.toLowerCase().includes(color) || (short && html.toLowerCase().includes(short));
  };
  const pairs=[
    ['#171816','#f3efe6'], ['#ffffff','#087c61'], ['#f5f1e8','#111111'],
    ['#111111','#f3d43b'], ['#111111','#f27bab'], ['#111111','#59afe8'],
    ...['#faf7ef','#f4c5d8','#d8e9f6','#f7df66','#d1e4d7'].flatMap(bg=>[['#4f514a',bg],['#075c48',bg],['#a32739',bg]]),
  ];
  for (const [foreground, background] of pairs) {
    assert.ok(inStylesheet(foreground), `foreground ${foreground} must be in the stylesheet`);
    assert.ok(inStylesheet(background), `background ${background} must be in the stylesheet`);
    assert.ok(ratio(foreground, background) >= 4.5, `${foreground} on ${background} is below 4.5:1`);
  }
});
