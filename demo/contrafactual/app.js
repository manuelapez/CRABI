"use strict";
(() => {
  const $ = (id) => document.getElementById(id);
  const data = typeof CRABI_DATA === "undefined" ? null : CRABI_DATA;
  const selector = $("territory");
  const controls = ["territory", "min", "max", "invite", "participation", "drop", "start", "duration", "strategy", "capacity"];
  const clear = () => { $("rows").replaceChildren(); $("plot").replaceChildren(); };
  function showError(message) { $("summary").textContent = message; if ($("interpretation")) $("interpretation").textContent = "No hay resultados válidos que interpretar."; clear(); }
  function calc() {
    try {
      const territory = data.territories.find((item) => item.code === selector.value);
      if (!territory) throw new Error("Selecciona un territorio con datos demográficos disponibles.");
      const count = 6;
      const rate = Number($("participation").value) / 100;
      const dem = CRABI_CF.fromDemography(data, selector.value, Number($("min").value), Number($("max").value), Number($("invite").value) / 100, count);
      const result = CRABI_CF.run({ trajectory: dem.trajectory, drop: Number($("drop").value) / 100, start: Number($("start").value), duration: Number($("duration").value), strategy: $("strategy").value, capacity: Number($("capacity").value) });
      const participations = result.alternative.map((value) => value * rate);
      const rule = territory.screeningRule;
      const ruleNote = rule?.uso_escenario === "si"
        ? `El territorio tiene rango de cribado habilitado en el corte documental (${rule.edad_min_escenario}–${rule.edad_max_escenario}); este simulador usa el rango etario que has seleccionado, independientemente de esa regla.`
        : "Hay datos demográficos para este territorio, pero su regla de cribado permanece pendiente/bloqueada; seleccionarlo no confirma una edad diana.";
      $("summary").textContent = `${territory.name} · residentes en rango: ${dem.residents.toLocaleString("es-ES")}. Invitaciones equivalentes hipotéticas de referencia: ${result.totals.reference.toLocaleString("es-ES")}. Pendiente: ${result.pending.toLocaleString("es-ES")}; remanente: ${result.remainder.toLocaleString("es-ES")}. Actividad alternativa: ${result.totals.alternative.toLocaleString("es-ES")}; participación equivalente supuesta: ${participations.reduce((a, b) => a + b, 0).toLocaleString("es-ES")}. ${ruleNote}`;
      $("interpretation").textContent = CRABI_INTERPRET.counterfactual(result, { strategy: $("strategy").value, capacity: Number($("capacity").value), start: Number($("start").value), duration: Number($("duration").value) });
      $("methodologyText").textContent = CRABI_INTERPRET.methodology(result);
      $("rows").innerHTML = result.periods.map((period, index) => `<tr><td>${index + 1}</td><td>${period.reference}</td><td>${period.alternative}</td><td>${participations[index].toFixed(1)}</td></tr>`).join("");
      const maximum = Math.max(...result.trajectory, ...result.alternative, 1);
      const points = (values) => values.map((value, index) => `${index * 100},${170 - value / maximum * 150}`).join(" ");
      $("plot").innerHTML = `<polyline points="${points(result.trajectory)}" fill="none" stroke="#087e67" stroke-width="3"/><polyline points="${points(result.alternative)}" fill="none" stroke="#ef7d32" stroke-width="3"/>`;
    } catch (error) {
      showError(`No se pudo calcular el escenario: ${error.message}`);
    }
  }
  try {
    if (!data || !Array.isArray(data.territories) || !selector) throw new Error("No se han podido cargar los datos demográficos locales.");
    for (const territory of data.territories) {
      const option = document.createElement("option");
      option.value = territory.code;
      option.textContent = territory.name;
      selector.append(option);
    }
    if (!selector.options.length) throw new Error("El bundle no contiene territorios.");
    for (const id of controls) $(id).addEventListener(id === "territory" || id === "min" || id === "max" || id === "strategy" ? "change" : "input", calc);
    $("run").addEventListener("click", calc);
    calc();
  } catch (error) {
    selector.disabled = true;
    showError(`No se pudo inicializar el simulador: ${error.message}`);
  }
})();
