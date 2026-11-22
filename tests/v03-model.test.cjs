"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const model = require("../demo/model.js");
const data = require("../demo/data.js");

test("demographic 50–69 and 45–74 match national sums and remain deterministic", () => {
  const standard = data.national["50_69"];
  const expanded = standard + data.national["45_49"] + data.national["70_74"];
  assert.equal(standard, 7289348);
  assert.equal(expanded, 10579631);
  assert.equal(data.territories.reduce((n,r)=>n+r.bands["50_69"],0),standard);
  assert.equal(data.territories.reduce((n,r)=>n+Object.values(r.bands).reduce((a,b)=>a+b,0),0),expanded);
  for (const pop of [standard,expanded]) {
    const a = model.calculate(pop,.5,.6,.05,300000);
    const b = model.calculate(pop,.5,.6,.05,300000);
    assert.deepEqual(a,b);
    assert.equal(a.A.total,a.B.total);
    assert.ok(Math.abs(a.A.total-pop*.5*.6)<1e-8);
    assert.ok(Math.abs(a.A.periods.reduce((s,p)=>s+p.tests,0)-a.A.total)<1e-8);
    assert.equal(a.A.above,a.A.periods.filter(p=>p.tests>300000).length);
  }
});

test("territorial arbitrary inclusive ages reject gaps, invalid data and disabled rules", () => {
  const rule = {uso_escenario:"si",edad_min_escenario:"45",edad_max_escenario:"47"};
  assert.equal(model.territorialPopulation({45:1,46:2,47:3},rule),6);
  assert.throws(()=>model.territorialPopulation({45:1,47:3},rule),RangeError);
  assert.throws(()=>model.territorialPopulation({45:1,46:-2,47:3},rule),RangeError);
  assert.throws(()=>model.territorialPopulation({45:1,46:"2",47:3},rule),RangeError);
  assert.throws(()=>model.territorialPopulation({}, {...rule,edad_min_escenario:"49",edad_max_escenario:"45"}),RangeError);
  assert.equal(model.territorialPopulation({}, {uso_escenario:"no",edad_min_escenario:"45",edad_max_escenario:"47"}),null);
  assert.equal(model.territorialPopulation({},null),null);
});

test("19 distinct rules keep four blocked and do not use future announcements as ranges", () => {
  const codes = data.territories.map(r=>r.code);
  assert.equal(new Set(codes).size,19);
  const blocked = data.territories.filter(r=>r.screeningRule.uso_escenario==="no");
  assert.deepEqual(blocked.map(r=>r.code).sort(),["01","02","15","18"]);
  for (const r of blocked) assert.equal(model.territorialPopulation(r.ageCounts,r.screeningRule),null);
  for (const r of data.territories.filter(r=>r.screeningRule.uso_escenario==="si")) {
    const rule = r.screeningRule;
    const min=Number(rule.edad_min_escenario),max=Number(rule.edad_max_escenario);
    assert.ok(min>=40 && max<=79 && min<=max);
    assert.equal(model.territorialPopulation(r.ageCounts,rule),
      Array.from({length:max-min+1},(_,i)=>r.ageCounts[min+i]).reduce((a,b)=>a+b,0));
  }
  const asturias=data.territories.find(r=>r.code==="03").screeningRule;
  assert.match(asturias.ampliacion_anunciada,/2027/);
  assert.equal(asturias.edad_max_escenario,"72");
});

test("invalid hypothetical parameters fail without coercion", () => {
  for (const args of [[-1,1,.6,.05,0],[1.5,1,.6,.05,0],[1,1.1,.6,.05,0],[1,1,NaN,.05,0],
    [1,1,.6,-.01,0],[1,1,.6,.05,-1]]) assert.throws(()=>model.calculate(...args),RangeError);
  assert.throws(()=>model.sensitivity(100,1,.9,.6,0,0),RangeError);
});

