/* Copyright (c) 2026 Manuela Ibáñez. MIT applies to original CRABI software; see LICENSE_SCOPE.md. */
"use strict";
(() => {
  const integratedIds = {
    territory: "cfTerritory", min: "cfMin", max: "cfMax", invite: "cfInvite",
    participation: "cfParticipation", drop: "cfDrop", start: "cfStart", duration: "cfDuration",
    strategy: "cfStrategy", capacity: "cfCapacity", summary: "cfSummary",
    interpretation: "cfInterpretation", methodologyText: "cfMethodologyText",
    rows: "cfRows", plot: "cfPlot", run: "cfRun",
  };
  const $ = (id) => document.getElementById(integratedIds[id]) || document.getElementById(id);
  const data = typeof CRABI_DATA === "undefined" ? null : CRABI_DATA;
  const selector = $("territory");
  const fmt = (value) => new Intl.NumberFormat("es-ES", { maximumFractionDigits: 1 }).format(value);
  const clear = () => { $("rows").replaceChildren(); $("plot").replaceChildren(); };

  function showError(message) {
    $("summary").textContent = message;
    $("interpretation").textContent = "No hay resultados válidos que interpretar.";
    clear();
  }

  function renderPlot(result) {
    const values = [...result.trajectory, ...result.alternative];
    const maximum = Math.max(...values, 1);
    const x = (i) => 48 + i * (504 / Math.max(result.trajectory.length - 1, 1));
    const y = (value) => 150 - value / maximum * 116;
    const points = (series) => series.map((value, i) => `${x(i)},${y(value)}`).join(" ");
    const markers = result.periods.map((period, i) => {
      const px = x(i), py = y(period.alternative);
      const perturbation = period.loss > 0
        ? `<circle cx="${px}" cy="${py}" r="5" fill="#fff" stroke="#713f4b" stroke-width="2"><title>Periodo ${period.period}: perturbación, ${fmt(period.loss)} unidades</title></circle>` : "";
      const recovery = period.recovered > 0
        ? `<rect x="${px - 4}" y="${py - 4}" width="8" height="8" fill="#7a96a4" stroke="#202124" stroke-width="1"><title>Periodo ${period.period}: recuperación efectiva, ${fmt(period.recovered)} unidades</title></rect>` : "";
      return perturbation + recovery;
    }).join("");
    $("plot").innerHTML = `<title id="cfPlotTitle">Trayectoria hipotética de referencia y alternativa</title><desc id="cfPlotDesc">Eje horizontal: periodos hipotéticos. Eje vertical: invitaciones equivalentes por periodo. Línea gris verdosa: referencia; línea burdeos: alternativa. Círculo vacío: perturbación; cuadrado azul grisáceo: recuperación efectiva.</desc><line x1="42" y1="24" x2="42" y2="151" stroke="#333"/><line x1="42" y1="151" x2="560" y2="151" stroke="#333"/><polyline points="${points(result.trajectory)}" fill="none" stroke="#78938d" stroke-width="2.5"/><polyline points="${points(result.alternative)}" fill="none" stroke="#713f4b" stroke-width="2.5"/>${markers}<text x="260" y="174" font-size="12">Periodo hipotético</text><text x="13" y="105" font-size="11" transform="rotate(-90 13 105)">Unidades equivalentes / periodo</text>`;
  }

  function calc() {
    try {
      const territory = data.territories.find((item) => item.code === selector.value);
      if (!territory) throw new Error("Selecciona un territorio con datos demográficos disponibles.");
      const count = 6;
      const participationRate = Number($("participation").value) / 100;
      const demographic = CRABI_CF.fromDemography(
        data, selector.value, Number($("min").value), Number($("max").value),
        Number($("invite").value) / 100, count,
      );
      const result = CRABI_CF.run({
        trajectory: demographic.trajectory,
        drop: Number($("drop").value) / 100,
        start: Number($("start").value) - (document.getElementById("cfStart") ? 1 : 0),
        duration: Number($("duration").value),
        strategy: $("strategy").value,
        capacity: Number($("capacity").value),
      });
      const participations = result.alternative.map((value) => value * participationRate);
      globalThis.CRABI_CF_LAST_RESULT = { territory, demographic, result, participations };
      const rule = territory.screeningRule;
      const ruleNote = rule?.uso_escenario === "si"
        ? `El territorio tiene un rango de cribado documentado (${rule.edad_min_escenario}–${rule.edad_max_escenario}); este simulador usa el rango etario seleccionado, que no determina elegibilidad.`
        : "Hay datos demográficos para este territorio, pero su regla de cribado está pendiente/bloqueada; seleccionarlo no confirma una edad diana.";

      $("summary").textContent = `${territory.name}, ${fmt(demographic.residents)} residentes en el rango seleccionado. La referencia suma ${fmt(result.totals.reference)} invitaciones equivalentes hipotéticas. La perturbación genera ${fmt(result.pending)} unidades pendientes; se recuperan ${fmt(result.recovered.reduce((a, b) => a + b, 0))} y quedan ${fmt(result.remainder)} al final del horizonte. La actividad alternativa suma ${fmt(result.totals.alternative)} unidades; participación equivalente supuesta: ${fmt(participations.reduce((a, b) => a + b, 0))}. ${ruleNote}`;
      $("interpretation").textContent = CRABI_CF_INTERPRET.counterfactual(result, {
        strategy: $("strategy").value,
        capacity: Number($("capacity").value),
        start: Number($("start").value),
        duration: Number($("duration").value),
      });
      $("methodologyText").textContent = CRABI_CF_INTERPRET.methodology(result, { strategy: $("strategy").value });
      $("rows").innerHTML = result.periods.map((period, index) =>
        `<tr><td>${period.period}</td><td>${fmt(period.reference)}</td><td>${fmt(period.alternative)}</td><td>${fmt(period.loss)}</td><td>${fmt(period.recovered)}</td><td>${fmt(period.pendingAtEnd)}</td><td>${fmt(participations[index])}</td></tr>`,
      ).join("");
      renderPlot(result);
    } catch (error) {
      showError(`No se pudo calcular el escenario: ${error.message}`);
    }
  }

  try {
    if (!data || !Array.isArray(data.territories) || !selector) throw new Error("No se han podido cargar los datos demográficos locales.");
      if (typeof CRABI_CF === "undefined" || typeof CRABI_CF_INTERPRET === "undefined") throw new Error("No se han cargado el motor contrafactual y su capa de interpretación.");
    for (const territory of data.territories) {
      const option = document.createElement("option");
      option.value = territory.code;
      option.textContent = territory.name;
      selector.append(option);
    }
    if (!selector.options.length) throw new Error("El bundle no contiene territorios.");
    for (const id of ["territory", "min", "max", "strategy"]) $(id).addEventListener("change", calc);
    for (const id of ["invite", "participation", "drop", "start", "duration", "capacity"]) $(id).addEventListener("input", calc);
    $("run").addEventListener("click", calc);
    calc();
    globalThis.CRABI_CF_APP = { calc };
  } catch (error) {
    if (selector) selector.disabled = true;
    showError(`No se pudo inicializar el simulador: ${error.message}`);
  }
})();
