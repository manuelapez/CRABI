/* Copyright (c) 2026 Manuela Ibáñez. MIT applies to original CRABI software; see LICENSE_SCOPE.md. */
(() => {
  "use strict";

  const DATA = window.CRABI_CASE_DATA;
  const root = document.documentElement;
  const whole = new Intl.NumberFormat("es-ES", { maximumFractionDigits: 0, useGrouping: "always" });
  const precise = new Intl.NumberFormat("es-ES", { maximumFractionDigits: 5, useGrouping: "always" });
  const percent = new Intl.NumberFormat("es-ES", { style: "percent", maximumFractionDigits: 2 });
  const byId = (id) => document.getElementById(id);
  const numberText = (n) => whole.format(n);
  const preciseText = (n) => precise.format(n);
  const safeText = (node, value) => { if (node) node.textContent = value; };
  let reducedMotion = false;
  let activitySeen = false;
  let pendingSeen = false;
  let rfSeen = false;
  let chapterObserver = null;
  let valueObserver = null;

  function failSafe(message, error) {
    root.classList.remove("motion-ready");
    document.querySelectorAll("[data-enter]").forEach((el) => el.classList.add("is-entered"));
    document.querySelectorAll(".period-chart,.pending-chart").forEach((el) => el.classList.add("is-ready"));
    document.querySelectorAll(".number-visual[data-target]").forEach((el) => { el.textContent = el.dataset.final; });
    safeText(byId("scenario-status"), message);
    if (error) console.error("CRABI Caso práctico divulgativo:", error);
  }

  function validateData() {
    if (!DATA || !Array.isArray(DATA.scenarios) || DATA.scenarios.length !== 3) throw new Error("No están disponibles los tres escenarios congelados.");
    const ids = DATA.scenarios.map((scenario) => scenario.id).join("");
    if (ids !== "ABC") throw new Error("Los escenarios no conservan el orden A/B/C.");
    const reference = DATA.scenarios[0].exact.periods[0].reference;
    if (DATA.assumptions.referenceActivityTotal / DATA.assumptions.horizonPeriods !== reference) throw new Error("La referencia por periodo no coincide con el total dividido por el horizonte.");
    for (const scenario of DATA.scenarios) {
      if (scenario.exact.periods.length !== DATA.assumptions.horizonPeriods) throw new Error(`El escenario ${scenario.id} no tiene seis etapas.`);
      if (scenario.exact.periods.some((p) => p.reference !== reference)) throw new Error(`Las referencias por etapa no coinciden en ${scenario.id}.`);
    }
    if (DATA.assumptions.referencePerPeriod !== reference) throw new Error("La referencia por periodo del JSON no coincide con las filas exactas.");
    return reference;
  }

  function formatDynamicNumber(host, value, decimalPlaces = 0) {
    if (!host) return;
    const format = decimalPlaces ? preciseText : numberText;
    const visual = document.createElement("span");
    visual.className = "number-visual";
    visual.setAttribute("aria-hidden", "true");
    visual.dataset.target = String(value);
    visual.dataset.final = format(value);
    visual.textContent = reducedMotion ? format(value) : numberText(0);
    const accessible = document.createElement("span");
    accessible.className = "sr-only";
    accessible.textContent = format(value);
    host.replaceChildren(visual, accessible);
    host.dataset.exactValue = String(value);
    host.setAttribute("aria-label", format(value));
    if (reducedMotion) return;
    if (valueObserver) valueObserver.observe(visual);
    else visual.textContent = format(value);
  }

  function runCounter(el) {
    if (!el || el.dataset.counted === "true") return;
    el.dataset.counted = "true";
    const target = Number(el.dataset.target);
    const finalText = el.dataset.final;
    if (!Number.isFinite(target) || reducedMotion || typeof window.requestAnimationFrame !== "function") {
      el.textContent = finalText;
      return;
    }
    const duration = 620;
    const start = performance.now();
    const draw = (now) => {
      const t = Math.min(1, Math.max(0, (now - start) / duration));
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = numberText(Math.round(target * eased));
      if (t < 1) window.requestAnimationFrame(draw);
      else el.textContent = finalText;
    };
    window.requestAnimationFrame(draw);
  }

  function renderInstitutionalContext() {
    const host = byId("institutional-stats");
    host.replaceChildren();
    DATA.institutionalContext.forEach((stat, index) => {
      const item = document.createElement("div");
      item.className = "institutional-item";
      item.dataset.enter = "";
      const value = document.createElement("span");
      value.className = "institutional-value";
      value.textContent = index === 0 ? `${numberText(stat.value)}` : numberText(stat.value);
      const label = document.createElement("span");
      label.className = "institutional-label";
      label.textContent = stat.label;
      const period = document.createElement("span");
      period.className = "institutional-period";
      period.textContent = stat.referencePeriod === "2024" ? "Comunidad de Madrid · 2024" : stat.referencePeriod === "2025" ? "Cuentas CIBER · ejercicio 2025" : "ISCIII · consulta 25/11/2026";
      const detail = document.createElement("span");
      detail.className = "institutional-detail";
      detail.textContent = stat.detail;
      item.append(value, label, period, detail);
      host.append(item);
    });
  }

  function renderPopulation(referencePerPeriod) {
    const population = DATA.population;
    const total = DATA.assumptions.referenceActivityTotal;
    const included = DATA.assumptions.inclusionFraction;
    const formatAge = `${population.ageMin}–${population.ageMax}`;
    formatDynamicNumber(byId("population-number"), population.residents);
    formatDynamicNumber(byId("population-visual"), population.residents);
    byId("population-visual").setAttribute("aria-label", `${numberText(population.residents)} residentes, ${population.territory}, mujeres de ${formatAge} años, ${population.referenceDate}, dato ${population.status}`);
    safeText(byId("population-date"), `INE · ${population.referenceDate} · ${population.status}`);
    const source = byId("population-source");
    source.href = population.source;
    const release = byId("population-release");
    release.href = population.releaseSource;
    formatDynamicNumber(byId("conversion-residents"), population.residents);
    formatDynamicNumber(byId("conversion-fraction"), included * 100);
    safeText(byId("conversion-fraction"), `${numberText(included * 100)} %`);
    formatDynamicNumber(byId("conversion-result"), total);
    formatDynamicNumber(byId("invitation-equivalents"), total);
    safeText(byId("conversion-caption"), `La cantidad se divide entre ${DATA.assumptions.horizonPeriods} etapas: ${numberText(referencePerPeriod)} unidades equivalentes de referencia en cada una.`);
    safeText(byId("participation-context"), `${percent.format(DATA.assumptions.participationContextOnly)} de participación`);
    byId("population-bar-fill").style.transform = "scaleX(1)";
    const shareTrack = document.querySelector(".share-track");
    if (shareTrack && reducedMotion) shareTrack.classList.add("is-active");
  }

  function renderTerritory() {
    safeText(byId("territory-name"), `${DATA.population.territory} · ${DATA.territorialRule.name}`);
    safeText(byId("territory-ages"), `${DATA.territorialRule.ageRange} años`);
    safeText(byId("territory-interval"), DATA.territorialRule.interval);
    byId("territory-source").href = DATA.territorialRule.source;
  }

  function setPlainText(id, value) { safeText(byId(id), value); }
  function renderAssumptions(scenario, referencePerPeriod) {
    const assumptions = DATA.assumptions;
    const loss = Math.floor(referencePerPeriod * assumptions.dropFraction);
    setPlainText("reference-per-period", numberText(referencePerPeriod));
    setPlainText("horizon-value", `${numberText(assumptions.horizonPeriods)} etapas`);
    setPlainText("drop-value", `${percent.format(assumptions.dropFraction)} · ${numberText(loss)} unidades por etapa`);
    setPlainText("capacity-value", `${numberText(scenario.capacityPerPeriod)} unidades · ${preciseText(scenario.capacityRatio)}×`);
    setPlainText("strategy-value", scenario.strategy === "uniform" ? "reparto uniforme" : "reparto gradual");
  }

  function buildScenarioOptions() {
    const host = byId("scenario-options");
    host.replaceChildren();
    DATA.scenarios.forEach((scenario, index) => {
      const wrap = document.createElement("div");
      wrap.className = "scenario-option";
      const input = document.createElement("input");
      input.type = "radio";
      input.name = "case-scenario";
      input.id = `scenario-${scenario.id.toLowerCase()}`;
      input.value = scenario.id;
      input.checked = index === 0;
      const label = document.createElement("label");
      label.htmlFor = input.id;
      const letter = document.createElement("span");
      letter.className = "scenario-letter";
      letter.textContent = scenario.id;
      const title = document.createElement("span");
      title.className = "scenario-option-title";
      title.textContent = scenario.id === "A" ? "Recuperas todo" : scenario.id === "B" ? "Un límite más bajo" : "Recuperación gradual";
      const meta = document.createElement("span");
      meta.className = "scenario-option-meta";
      meta.textContent = `Límite ${preciseText(scenario.capacityRatio)}× · ${scenario.strategy === "uniform" ? "reparto uniforme" : "reparto gradual"}`;
      const result = document.createElement("span");
      result.className = "scenario-option-result";
      result.textContent = `${numberText(scenario.exact.recoveredTotal)} recuperadas · ${numberText(scenario.exact.finalRemainder)} pendientes al final`;
      label.append(letter, title, meta, result);
      input.addEventListener("change", () => {
        if (input.checked) renderScenario(scenario.id);
      });
      wrap.append(input, label);
      host.append(wrap);
    });
  }

  function createActivityChart(scenario) {
    const host = byId("activity-chart");
    host.replaceChildren();
    const rows = scenario.exact.periods;
    const capacity = scenario.capacityPerPeriod;
    const reference = rows[0].reference;
    const max = Math.max(capacity, ...rows.map((p) => p.alternativeActivity), reference) * 1.04;
    host.setAttribute("aria-label", `Escenario ${scenario.id}: seis etapas. La referencia es ${numberText(reference)} unidades equivalentes. Las barras muestran la actividad alternativa y el límite matemático de ${numberText(capacity)} por etapa. En P2 y P3 se genera una reducción.`);
    rows.forEach((period) => {
      const column = document.createElement("div");
      column.className = `period-column${period.lossGenerated > 0 ? " is-perturbed" : ""}`;
      const title = document.createElement("span");
      title.className = "period-title";
      title.textContent = `Etapa ${period.period}`;
      const perturbation = document.createElement("span");
      perturbation.className = "period-perturbation";
      perturbation.textContent = period.lossGenerated > 0 ? `−${percent.format(DATA.assumptions.dropFraction)}` : " ";
      const bars = document.createElement("div");
      bars.className = "period-bars";
      const referenceBar = document.createElement("span");
      referenceBar.className = "period-bar reference";
      referenceBar.style.setProperty("--bar-height", `${(period.reference / max) * 100}%`);
      referenceBar.setAttribute("aria-hidden", "true");
      const activityBar = document.createElement("span");
      activityBar.className = "period-bar alternative";
      activityBar.style.setProperty("--bar-height", `${(period.alternativeActivity / max) * 100}%`);
      activityBar.setAttribute("aria-hidden", "true");
      const capacityMarker = document.createElement("span");
      capacityMarker.className = "period-capacity";
      capacityMarker.style.bottom = `${(capacity / max) * 100}%`;
      capacityMarker.setAttribute("aria-hidden", "true");
      bars.append(referenceBar, activityBar, capacityMarker);
      const values = document.createElement("span");
      values.className = "period-values";
      const referenceText = document.createElement("span");
      referenceText.textContent = `Plan ${numberText(period.reference)}`;
      const activityText = document.createElement("span");
      activityText.textContent = `Ej. ${numberText(period.alternativeActivity)}`;
      values.append(referenceText, activityText);
      column.append(title, perturbation, bars, values);
      host.append(column);
    });
    host.classList.toggle("is-ready", activitySeen || reducedMotion);
    if (activitySeen) host.classList.add("is-ready");
    void host.offsetWidth;
    if (activitySeen || reducedMotion) host.classList.add("is-ready");
  }

  function createPendingChart(scenario) {
    const host = byId("pending-chart");
    host.replaceChildren();
    const max = Math.max(1, ...scenario.exact.periods.map((p) => p.pendingAtEnd));
    host.setAttribute("aria-label", `Escenario ${scenario.id}: pendiente al cierre de cada una de las seis etapas. El saldo final es ${numberText(scenario.exact.finalRemainder)} unidades equivalentes.`);
    scenario.exact.periods.forEach((period) => {
      const row = document.createElement("div");
      row.className = "pending-row";
      const label = document.createElement("span");
      label.className = "pending-label";
      label.textContent = `Etapa ${period.period}`;
      const track = document.createElement("div");
      track.className = "pending-track";
      track.setAttribute("aria-hidden", "true");
      const fill = document.createElement("div");
      fill.className = "pending-fill";
      fill.style.setProperty("--pending-width", `${(period.pendingAtEnd / max) * 100}%`);
      track.append(fill);
      const value = document.createElement("span");
      value.className = "pending-value";
      value.textContent = `${numberText(period.pendingAtEnd)} pendientes`;
      row.append(label, track, value);
      host.append(row);
    });
    host.classList.toggle("is-ready", pendingSeen || reducedMotion);
    if (pendingSeen || reducedMotion) host.classList.add("is-ready");
  }

  function renderTrajectoryTable(scenario) {
    const body = byId("trajectory-rows");
    body.replaceChildren();
    scenario.exact.periods.forEach((period) => {
      const tr = document.createElement("tr");
      [
        `Etapa ${period.period}`,
        numberText(period.reference),
        numberText(period.lossGenerated),
        numberText(period.recoveryEffective),
        numberText(period.alternativeActivity),
        numberText(period.pendingAtEnd),
      ].forEach((value, index) => {
        const td = document.createElement("td");
        td.textContent = value;
        if (index === 0) td.setAttribute("data-period", String(period.period));
        tr.append(td);
      });
      body.append(tr);
    });
  }

  function renderBalance(scenario) {
    const exact = scenario.exact;
    formatDynamicNumber(byId("balance-generated"), exact.generatedPending);
    formatDynamicNumber(byId("balance-recovered"), exact.recoveredTotal);
    formatDynamicNumber(byId("balance-remainder"), exact.finalRemainder);
    setPlainText("balance-explanation", `En el caso ${scenario.id}: ${numberText(exact.generatedPending)} = ${numberText(exact.recoveredTotal)} + ${numberText(exact.finalRemainder)}. Las cuentas cierran bajo las condiciones elegidas.`);
    const host = byId("central-results");
    host.replaceChildren();
    const cells = [
      ["Pico de actividad", `${numberText(exact.peakActivity)} por etapa`],
      ["Etapas en que el límite afectó la recuperación", numberText(exact.capacityLimitedPeriods)],
      ["Límite supuesto", `${numberText(scenario.capacityPerPeriod)} por etapa`],
      ["Estrategia", scenario.strategy === "uniform" ? "Uniforme" : "Gradual"],
    ];
    cells.forEach(([labelText, valueText]) => {
      const item = document.createElement("div");
      item.className = "result-cell";
      const label = document.createElement("span");
      label.textContent = labelText;
      const value = document.createElement("strong");
      value.textContent = valueText;
      item.append(label, value);
      host.append(item);
    });
    setPlainText("capacity-interpretation", exact.peakActivity < scenario.capacityPerPeriod
      ? `El mayor valor de actividad queda por debajo del límite matemático de ${numberText(scenario.capacityPerPeriod)}. El límite no describe una capacidad sanitaria real.`
      : `La actividad alcanza el límite matemático de ${numberText(scenario.capacityPerPeriod)} en este caso. No es una medición de saturación sanitaria real.`);
  }

  function renderScenarioSummary(scenario) {
    const exact = scenario.exact;
    const host = byId("scenario-summary");
    host.replaceChildren();
    const p = document.createElement("p");
    p.textContent = scenario.id === "A"
      ? `A mantiene el límite de ${preciseText(scenario.capacityRatio)}× y reparte la recuperación de forma uniforme. En este caso se recupera todo dentro de las seis etapas.`
      : scenario.id === "B"
        ? `B conserva el reparto uniforme, pero baja el límite a ${preciseText(scenario.capacityRatio)}×. Al finalizar quedan ${numberText(exact.finalRemainder)} unidades equivalentes pendientes.`
        : `C conserva el límite de ${preciseText(scenario.capacityRatio)}× y reparte la recuperación de forma gradual. Al finalizar quedan ${numberText(exact.finalRemainder)} unidades equivalentes pendientes.`;
    const outcome = document.createElement("strong");
    outcome.textContent = ` Resultado exacto: ${numberText(exact.recoveredTotal)} recuperadas, ${numberText(exact.finalRemainder)} pendientes, pico de ${numberText(exact.peakActivity)} y ${numberText(exact.capacityLimitedPeriods)} etapas limitadas.`;
    host.append(p, outcome);
  }

  function metricList(scenario) {
    return [
      { key: "remainder", label: "Lo que queda pendiente al final", exact: scenario.exact.finalRemainder, prediction: scenario.rfV02.remainderMean, abs: scenario.rfV02.remainderAbsoluteError, rel: scenario.rfV02.remainderRelativeError, unit: "unidades equivalentes" },
      { key: "peak", label: "El mayor valor en una etapa", exact: scenario.exact.peakActivity, prediction: scenario.rfV02.peakMean, abs: scenario.rfV02.peakAbsoluteError, rel: scenario.rfV02.peakRelativeError, unit: "unidades equivalentes por etapa" },
      { key: "limited", label: "Etapas limitadas", exact: scenario.exact.capacityLimitedPeriods, prediction: scenario.rfV02.limitedPeriodsMean, abs: scenario.rfV02.limitedPeriodsAbsoluteError, rel: scenario.rfV02.limitedPeriodsRelativeError, unit: "etapas" },
    ];
  }

  function renderRF(scenario) {
    const host = byId("rf-comparisons");
    host.replaceChildren();
    const metrics = metricList(scenario);
    metrics.forEach((metric, index) => {
      const item = document.createElement("article");
      item.className = "rf-item";
      item.dataset.enter = "";
      const heading = document.createElement("h3");
      heading.textContent = metric.label;
      const intro = document.createElement("p");
      intro.className = "rf-item-intro";
      intro.textContent = `Caso ${scenario.id} · ${metric.unit}`;
      const values = document.createElement("p");
      values.className = "rf-measure-heading";
      const predictionLabel = document.createElement("span");
      predictionLabel.textContent = "Estimación de la IA";
      const predictionValue = document.createElement("strong");
      predictionValue.textContent = preciseText(metric.prediction);
      values.append(predictionLabel, predictionValue);
      const track = document.createElement("div");
      track.className = "rf-track";
      track.setAttribute("aria-hidden", "true");
      const max = Math.max(metric.exact, metric.prediction, 1);
      const bars = [
        ["Exacto", metric.exact, "exact"],
        ["IA", metric.prediction, "prediction"],
      ];
      bars.forEach(([labelText, value, kind]) => {
        const row = document.createElement("div");
        row.className = "rf-bar-row";
        const label = document.createElement("span");
        label.textContent = labelText;
        const barTrack = document.createElement("div");
        barTrack.className = "rf-bar-track";
        const fill = document.createElement("div");
        fill.className = `rf-bar-fill ${kind === "prediction" ? "prediction" : ""}`;
        fill.style.setProperty("--rf-width", `${(value / max) * 100}%`);
        if (value === 0) fill.classList.add("is-zero");
        barTrack.append(fill);
        row.append(label, barTrack);
        track.append(row);
      });
      const detail = document.createElement("p");
      detail.className = "rf-error";
      const relative = metric.rel === null ? "No definido: el resultado exacto es cero." : `Diferencia relativa: ${percent.format(metric.rel)}.`;
      detail.textContent = `Resultado exacto: ${preciseText(metric.exact)} · diferencia absoluta: ${preciseText(metric.abs)}. ${relative}`;
      const explain = document.createElement("p");
      explain.className = "rf-exactness";
      explain.textContent = index === 0 && metric.exact === 0
        ? "La IA estima una cantidad pendiente aunque el cálculo exacto termina en cero; por eso la diferencia relativa no se puede calcular."
        : index === 2
          ? "La cifra decimal de la IA es una media de regresión, no una probabilidad ni un conteo de etapas."
          : "Compara la distancia entre la aproximación y el resultado calculado con las reglas exactas.";
      item.append(heading, intro, values, track, detail, explain);
      if (rfSeen || reducedMotion) item.classList.add("is-entered");
      else if (chapterObserver) chapterObserver.observe(item);
      host.append(item);
    });
    const summary = `En el caso ${scenario.id}, la IA aproxima tres salidas del motor. Las diferencias dependen de cada medida; una sola selección no permite afirmar precisión general.`;
    setPlainText("rf-summary", summary);
    host.classList.toggle("is-ready", rfSeen || reducedMotion);
    if (rfSeen || reducedMotion) host.classList.add("is-ready");
  }

  function renderScenario(id, initial = false) {
    const scenario = DATA.scenarios.find((item) => item.id === id);
    if (!scenario) return;
    root.classList.toggle("is-updating", !initial);
    const reference = DATA.scenarios[0].exact.periods[0].reference;
    renderAssumptions(scenario, reference);
    createActivityChart(scenario);
    createPendingChart(scenario);
    renderTrajectoryTable(scenario);
    renderBalance(scenario);
    renderScenarioSummary(scenario);
    renderRF(scenario);
    safeText(byId("scenario-status"), `Has elegido el caso ${scenario.id}. Se han actualizado las seis etapas, el balance y la comparación con la inteligencia artificial.`);
    safeText(byId("ai-scenario-name"), `caso ${scenario.id} · ${scenario.strategy === "uniform" ? "reparto uniforme" : "reparto gradual"}`);
    if (typeof window.setTimeout === "function") window.setTimeout(() => root.classList.remove("is-updating"), reducedMotion ? 0 : 820);
    else root.classList.remove("is-updating");
  }

  function setupMotion() {
    const media = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : { matches: false };
    reducedMotion = media.matches;
    if (reducedMotion || !("IntersectionObserver" in window)) {
      document.querySelectorAll("[data-enter]").forEach((el) => el.classList.add("is-entered"));
      activitySeen = pendingSeen = rfSeen = true;
      document.querySelectorAll(".period-chart,.pending-chart,.rf-comparisons").forEach((el) => el.classList.add("is-ready"));
      document.querySelectorAll(".number-visual[data-target]").forEach((el) => { el.textContent = el.dataset.final; el.dataset.counted = "true"; });
      return;
    }
    root.classList.add("motion-ready");
    chapterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const target = entry.target;
        if (target.matches("[data-enter]")) target.classList.add("is-entered");
        if (target.id === "activity-chart") { activitySeen = true; target.classList.add("is-ready"); }
        if (target.id === "pending-chart") { pendingSeen = true; target.classList.add("is-ready"); }
        if (target.id === "rf-comparisons") { rfSeen = true; target.classList.add("is-ready"); }
        if (target.classList.contains("share-track")) target.classList.add("is-active");
        chapterObserver.unobserve(target);
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -4% 0px" });
    document.querySelectorAll("[data-enter],#activity-chart,#pending-chart,#rf-comparisons,.share-track").forEach((el) => chapterObserver.observe(el));
    valueObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        runCounter(entry.target);
        valueObserver.unobserve(entry.target);
      });
    }, { threshold: 0.5 });
    document.querySelectorAll(".number-visual[data-target]").forEach((el) => valueObserver.observe(el));
  }

  function init() {
    const reference = validateData();
    renderInstitutionalContext();
    renderPopulation(reference);
    renderTerritory();
    buildScenarioOptions();
    renderScenario("A", true);
    setupMotion();
    if (reducedMotion) document.querySelectorAll(".share-track").forEach((track) => track.classList.add("is-active"));
  }

  try {
    init();
  } catch (error) {
    failSafe("No se pudo completar la carga. Los datos científicos siguen en el JSON congelado; vuelve a cargar esta página.", error);
  }
})();
