/* Copyright (c) 2026 Manuela Ibáñez. MIT applies to original CRABI software; see LICENSE_SCOPE.md. */
"use strict";
const CRABI_CF_INTERPRET = (() => {
  const number = (value) => new Intl.NumberFormat("es-ES", { maximumFractionDigits: 1 }).format(value);
  const strategies = { uniform: "uniforme", gradual: "gradual", accelerated: "acelerada" };
  function counterfactual(result, { strategy, capacity, start, duration }) {
    const lostPeriods = result.losses.map((value, i) => value > 0 ? i + 1 : null).filter(Boolean);
    const recovered = result.recovered.reduce((a, b) => a + b, 0);
    const delta = result.totals.alternative - result.totals.reference;
    const difference = result.totals.reference === 0 ? "La referencia total es cero, así que no se calcula una diferencia porcentual." : `La diferencia total es ${number(delta)} unidades (${number(delta / result.totals.reference * 100)} % respecto a la referencia).`;
    const losses = lostPeriods.length ? `La perturbación genera ${number(result.pending)} unidades pendientes en los periodos ${lostPeriods.join(", ")}.` : "Con estos parámetros no se genera actividad pendiente por perturbación.";
    const cap = capacity === Infinity ? "No se aplica un límite de capacidad matemática." : `Se aplica un límite hipotético de ${number(capacity)} invitaciones equivalentes por periodo; solo restringe la recuperación sobre la actividad alternativa de cada periodo.`;
    const timing = duration === 0 ? "La duración elegida es cero, por lo que no hay periodos perturbados." : `La perturbación se aplica desde el periodo ${start + 1} durante ${duration} periodo(s); las pérdidas se registran al cierre y no se recuperan antes del periodo siguiente.`;
    return `${timing} ${losses} La estrategia ${strategies[strategy]} recupera ${number(recovered)} unidades dentro del horizonte; quedan ${number(result.remainder)} sin recuperar. ${cap} ${difference} Son unidades hipotéticas, no retrasos individuales, actividad observada ni efectos causales.`;
  }
  function methodology(result, { strategy = "uniform" } = {}) {
    const definitions = {
      uniform: "Uniforme: con m periodos futuros, cada uno recibe peso 1/m.",
      gradual: "Gradual: con m periodos futuros, el periodo futuro k recibe peso 2k/[m(m+1)].",
      accelerated: "Acelerada: con m periodos futuros, el periodo futuro k recibe peso 2(m−k+1)/[m(m+1)].",
    };
    const distribution = definitions[strategy] || "La estrategia seleccionada no está reconocida.";
    return `Por periodo: alternativa = referencia − pérdida del periodo + recuperación efectiva. La pérdida es floor(referencia × intensidad) solo dentro del intervalo perturbado y se registra al cierre. ${distribution} Los repartos fraccionarios se convierten a unidades enteras mediante el método de mayores restos. Las recuperaciones empiezan en el periodo siguiente; si el límite impide atenderlas, pasan a periodos posteriores. Remanente = pérdidas generadas − recuperaciones efectivas. La capacidad se compara con la actividad alternativa y no representa capacidad sanitaria. Comprobación de conservación: referencia total ${number(result.totals.reference)} = alternativa total ${number(result.totals.alternative)} + remanente ${number(result.remainder)} (${result.conservation ? "se cumple" : "no se cumple"}).`;
  }
  return { counterfactual, methodology };
})();
if (typeof module !== "undefined" && module.exports) module.exports = CRABI_CF_INTERPRET;
