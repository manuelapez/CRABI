"use strict";
const CRABI_INTERPRET = (() => {
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
  function methodology(result) {
    return `Por periodo: alternativa = referencia − pérdida del periodo + recuperación efectiva. La pérdida es floor(referencia × intensidad) solo dentro del intervalo perturbado. Cada pérdida se reparte entre periodos futuros; lo no atendido por el límite se arrastra. Remanente = pérdidas generadas − recuperaciones efectivas. Comprobación de conservación: referencia total ${number(result.totals.reference)} = alternativa total ${number(result.totals.alternative)} + remanente ${number(result.remainder)} (${result.conservation ? "se cumple" : "no se cumple"}).`;
  }
  return { counterfactual, methodology };
})();
if (typeof module !== "undefined" && module.exports) module.exports = CRABI_INTERPRET;
