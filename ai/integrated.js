/* Copyright (c) 2026 Manuela Ibáñez. MIT applies to original CRABI software; see LICENSE_SCOPE.md. */
"use strict";
(() => {
  const $ = (id) => document.getElementById(id);
  const format = (value) => new Intl.NumberFormat("es-ES", { maximumFractionDigits: 1 }).format(value);
  const strategyNames = { uniform: "Uniforme", gradual: "Gradual", accelerated: "Acelerada" };
  const strategyValues = ["uniform", "gradual", "accelerated"];
  const cfIds = ["cfTerritory", "cfMin", "cfMax", "cfInvite", "cfParticipation", "cfDrop", "cfStart", "cfDuration", "cfStrategy", "cfCapacity"];
  const targetNames = ["Remanente (invitaciones equivalentes)", "Pico (unidades por periodo)", "Periodos con recuperación limitada"];
  let lastRun = null;

  function setStatus(id, text, error = false) {
    const element = $(id);
    element.textContent = text;
    element.classList.toggle("error", error);
  }

  function verifyModel() {
    const model = globalThis.CRABI_AI_MODEL;
    if (!model || model.format !== "crabi-exploration-rf-v1" || !Array.isArray(model.trees) || !model.trees.length) {
      throw new Error("No se cargó el artefacto portable Random Forest CRABI.");
    }
    if (JSON.stringify(model.targets) !== JSON.stringify(["remainder", "peak_activity", "saturated_periods"])) {
      throw new Error("Los objetivos del artefacto no coinciden con la interfaz.");
    }
    const expectedCats = ["territory_code", "age_band", "strategy"];
    const expectedNums = ["residents", "inclusion_rate", "reference_total", "drop", "start", "duration", "horizon", "capacity_ratio", "capacity"];
    if (JSON.stringify(model.categorical_features) !== JSON.stringify(expectedCats) || JSON.stringify(model.numeric_features) !== JSON.stringify(expectedNums)) {
      throw new Error("El esquema de variables del modelo cambió; la transferencia se ha bloqueado.");
    }
    return model;
  }

  function readContext() {
    const model = verifyModel();
    const territoryCode = $("cfTerritory").value;
    const territory = CRABI_DATA.territories.find((item) => item.code === territoryCode);
    if (!territory) throw new Error("No hay un territorio demográfico seleccionado.");
    const minAge = Number($("cfMin").value), maxAge = Number($("cfMax").value);
    const inclusionRate = Number($("cfInvite").value) / 100;
    const participationRate = Number($("cfParticipation").value) / 100;
    const drop = Number($("cfDrop").value) / 100;
    const start = Number($("cfStart").value) - 1;
    const duration = Number($("cfDuration").value);
    const strategy = $("cfStrategy").value;
    const capacity = Number($("cfCapacity").value);
    const horizon = 6;
    const demographic = CRABI_CF.fromDemography(CRABI_DATA, territoryCode, minAge, maxAge, inclusionRate, horizon);
    const peakReference = Math.max(...demographic.trajectory);
    const capacityRatio = capacity / Math.max(peakReference, 1);
    const feature = {
      territory_code: territoryCode,
      age_band: `${minAge}_${maxAge}`,
      residents: demographic.residents,
      inclusion_rate: inclusionRate,
      reference_total: demographic.invitations,
      drop,
      start,
      duration,
      horizon,
      strategy,
      capacity_ratio: capacityRatio,
      capacity,
    };
    const unsupported = [];
    if (!model.categories.territory_code.includes(territoryCode)) unsupported.push("territorio no categorizado");
    if (!model.categories.age_band.includes(feature.age_band)) unsupported.push("rango etario no categorizado");
    if (!(inclusionRate >= 0.15 && inclusionRate <= 0.95)) unsupported.push("fracción incluida fuera del entrenamiento (15–95 %)");
    if (drop > 0.8) unsupported.push("reducción fuera del entrenamiento IID (máximo 80 %)");
    if (duration > 3) unsupported.push("duración fuera del entrenamiento IID (máximo 3 periodos)");
    if (!(capacityRatio >= 1 && capacityRatio <= 2)) unsupported.push("capacidad relativa fuera del entrenamiento IID (1–2)");
    if (horizon < 4 || horizon > 8) unsupported.push("horizonte fuera del entrenamiento IID (4–8)");
    if (!strategyValues.includes(strategy)) unsupported.push("estrategia no reconocida");
    const result = CRABI_CF.run({ trajectory: demographic.trajectory, drop, start, duration, strategy, capacity });
    const exact = [
      result.remainder,
      Math.max(...result.alternative),
      result.periods.filter((period) => period.plannedRecovery + period.carriedIn > period.recovered).length,
    ];
    return { model, territory, demographic, feature, result, exact, peakReference, participationRate, unsupported };
  }

  function makeCandidates(context) {
    const { feature, demographic } = context;
    const unique = (values) => [...new Set(values.map((x) => Number(x.toFixed(5))))];
    const drops = unique([0, .2, .4, .6, .8, feature.drop].filter((x) => x >= 0 && x <= .8));
    const ratios = unique([1, 1.05, 1.15, 1.3, 1.6, 2, feature.capacity_ratio].filter((x) => x >= 1 && x <= 2));
    const durations = unique([0, 1, 2, 3, feature.duration].filter((x) => x >= 0 && x <= 3 && Number.isInteger(x)));
    const maxReference = Math.max(...demographic.trajectory);
    const candidates = [];
    for (const duration of durations) {
      const start = Math.min(feature.start, feature.horizon - duration);
      for (const strategy of strategyValues) {
        for (const drop of drops) {
          for (const capacity_ratio of ratios) {
            const capacity = Math.ceil(maxReference * capacity_ratio);
            const row = { ...feature, drop, duration, start, strategy, capacity_ratio, capacity };
            const key = [drop, duration, start, strategy, capacity_ratio].join("|");
            candidates.push({ key, row });
          }
        }
      }
    }
    return candidates;
  }

  function quantileScale(predictions, target) {
    const values = predictions.map((x) => x.mean[target]).sort((a, b) => a - b);
    const at = (p) => values[Math.floor((values.length - 1) * p)];
    return Math.max(at(.75) - at(.25), 1);
  }

  function minMax(values) {
    const lo = Math.min(...values), hi = Math.max(...values);
    return values.map((x) => hi === lo ? 0 : (x - lo) / (hi - lo));
  }

  function selectProposals(candidates, predictions) {
    const scales = [0, 1, 2].map((target) => quantileScale(predictions, target));
    const groups = new Map();
    candidates.forEach((candidate, index) => {
      const key = `${candidate.row.strategy}|${candidate.row.duration}|${candidate.row.start}`;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(index);
    });
    const sensitivity = Array(candidates.length).fill(0), interaction = Array(candidates.length).fill(0);
    for (const indices of groups.values()) {
      const drops = [...new Set(indices.map((i) => candidates[i].row.drop))].sort((a, b) => a - b);
      const ratios = [...new Set(indices.map((i) => candidates[i].row.capacity_ratio))].sort((a, b) => a - b);
      const byCell = new Map(indices.map((i) => [`${candidates[i].row.drop}|${candidates[i].row.capacity_ratio}`, i]));
      const matrix = drops.map((d) => ratios.map((r) => predictions[byCell.get(`${d}|${r}`)].mean[0]));
      const rowMeans = matrix.map((row) => row.reduce((a, b) => a + b, 0) / row.length);
      const colMeans = ratios.map((_, j) => matrix.reduce((sum, row) => sum + row[j], 0) / matrix.length);
      const grand = rowMeans.reduce((a, b) => a + b, 0) / rowMeans.length;
      drops.forEach((d, i) => ratios.forEach((r, j) => {
        const idx = byCell.get(`${d}|${r}`);
        interaction[idx] = Math.abs(matrix[i][j] - (rowMeans[i] + colMeans[j] - grand)) / scales[0];
        const diffs = [];
        if (i > 0) diffs.push(Math.abs(matrix[i][j] - matrix[i - 1][j]) / scales[0]);
        if (i + 1 < drops.length) diffs.push(Math.abs(matrix[i + 1][j] - matrix[i][j]) / scales[0]);
        if (j > 0) diffs.push(Math.abs(matrix[i][j] - matrix[i][j - 1]) / scales[0]);
        if (j + 1 < ratios.length) diffs.push(Math.abs(matrix[i][j + 1] - matrix[i][j]) / scales[0]);
        sensitivity[idx] = Math.max(...diffs, 0);
      }));
    }
    const uncertainty = predictions.map((p) => p.sd.reduce((sum, sd, j) => sum + sd / scales[j], 0));
    const threshold = predictions.map((p) => {
      const positive = p.treeValues.filter((values) => values[0] > 0).length / p.treeValues.length;
      return { score: 4 * positive * (1 - positive), positive };
    });
    const components = {
      uncertainty: minMax(uncertainty),
      nearThreshold: threshold.map((x) => x.score),
      sensitivity: minMax(sensitivity),
      interaction: minMax(interaction),
    };
    const selected = [], remaining = candidates.map((_, i) => i);
    while (selected.length < 5 && remaining.length) {
      let bestIndex = 0, bestScore = -Infinity, bestDiversity = 0;
      for (let ri = 0; ri < remaining.length; ri++) {
        const i = remaining[ri], row = candidates[i].row;
        const distance = selected.length ? Math.min(...selected.map((chosen) => {
          const other = candidates[chosen.index].row;
          return Math.sqrt((row.drop-other.drop)**2 + (row.capacity_ratio-other.capacity_ratio)**2 +
            ((row.duration-other.duration)/4)**2 + (row.strategy===other.strategy?0:1));
        })) : 1;
        const diversity = Math.min(1, distance / .35);
        const score = .30*components.uncertainty[i] + .15*components.nearThreshold[i] +
          .20*components.sensitivity[i] + .20*components.interaction[i] + .15*diversity;
        if (score > bestScore) { bestIndex = ri; bestScore = score; bestDiversity = diversity; }
      }
      const i = remaining.splice(bestIndex, 1)[0];
      const vals = [
        ["dispersión entre árboles", components.uncertainty[i]],
        ["proximidad al umbral de remanente positivo", components.nearThreshold[i]],
        ["sensibilidad local a reducción/capacidad", components.sensitivity[i]],
        ["interacción reducción×capacidad", components.interaction[i]],
        ["diversidad respecto a propuestas previas", bestDiversity],
      ].sort((a, b) => b[1] - a[1]);
      selected.push({ index: i, score: bestScore, diversity: bestDiversity, positiveFraction: threshold[i].positive, reasons: vals.slice(0, 2).map((x) => x[0]) });
    }
    return selected;
  }

  function exactFor(row, trajectory) {
    const result = CRABI_CF.run({ trajectory, drop: row.drop, start: row.start, duration: row.duration, strategy: row.strategy, capacity: row.capacity });
    const saturated = result.periods.filter((p) => p.plannedRecovery + p.carriedIn > p.recovered).length;
    return { values: [result.remainder, Math.max(...result.alternative), saturated], result };
  }

  function renderFactors() {
    const source = globalThis.CRABI_AI_IMPORTANCE;
    if (!source || !Array.isArray(source.features)) throw new Error("No se cargaron las importancias globales evaluadas.");
    $("aiFactors").innerHTML = `<div class="table-wrap ai-importance-wrap"><table><thead><tr><th>Variable</th><th>Aumento medio del error normalizado</th></tr></thead><tbody>${source.features.map((x) => `<tr><td>${x.feature}</td><td>${format(x.permutation_mean_increase)}</td></tr>`).join("")}</tbody></table></div>`;
    $("aiModelStatus").textContent = `Random Forest real, ${CRABI_AI_MODEL.trees.length} árboles, scikit-learn ${CRABI_AI_MODEL.metadata?.dependency_versions?.scikit_learn || "versión registrada"}. Importancias globales por permutación, estimadas en validación sintética; no causales.`;
  }

  function renderResults(context, basePrediction, selected, candidates, predictions) {
    const exactValues = context.exact;
    const targets = context.model.targets;
    const currentRows = targets.map((target, j) => `<tr><th>${targetNames[j]}</th><td>${format(basePrediction.mean[j])}</td><td>${format(exactValues[j])}</td><td>${format(basePrediction.mean[j] - exactValues[j])}</td></tr>`).join("");
    $("aiCurrentResults").innerHTML = `<table><caption>Predicción aproximada y ejecución exacta del escenario recibido</caption><thead><tr><th>Resultado</th><th>IA (aproximación)</th><th>CRABI exacto</th><th>Diferencia IA − exacto</th></tr></thead><tbody>${currentRows}</tbody></table>`;
    const rows = selected.map((selection, i) => {
      const { row } = candidates[selection.index];
      const prediction = predictions[selection.index].mean;
      const checked = exactFor(row, context.demographic.trajectory);
      if (!checked.result.conservation) throw new Error("CRABI exacto no conservó el total en una propuesta; se cancela la presentación de esta tanda.");
      return `<tr><th scope="row">${i+1}</th><td>${format(row.drop*100)} %</td><td>${row.start + 1}</td><td>${row.duration}</td><td>${strategyNames[row.strategy]}</td><td>${format(row.capacity)} invitaciones eq./periodo (${format(row.capacity_ratio)}×)</td><td>${format(prediction[0])}</td><td>${format(checked.values[0])}</td><td>${format(prediction[0]-checked.values[0])}</td><td>${format(prediction[1])} / ${format(checked.values[1])}</td><td>${format(prediction[2])} / ${format(checked.values[2])}</td><td>${selection.reasons.join("; ")}</td></tr>`;
    }).join("");
    $("aiSuggestions").innerHTML = rows;
    globalThis.CRABI_AI_LAST_PROPOSALS = selected.map((selection) => {
      const row = candidates[selection.index].row;
      const prediction = predictions[selection.index].mean;
      const exact = exactFor(row, context.demographic.trajectory);
      return { row: { ...row }, prediction: prediction.slice(), exact: exact.values.slice(), reasons: selection.reasons.slice() };
    });
  }

  function analyze() {
    try {
      const context = readContext();
      const { model, territory, demographic, feature, result, exact, unsupported } = context;
      const basePrediction = CRABI_RF.predict(model, [feature])[0];
      const candidates = makeCandidates(context);
      const predictions = CRABI_RF.predict(model, candidates.map((x) => x.row));
      const selected = selectProposals(candidates, predictions);
      if (selected.length !== 5) throw new Error("No se pudieron construir cinco propuestas diversas.");
      renderFactors();
      const age = `${feature.age_band.replace("_", "–")} años`;
      const ruleNote = territory.screeningRule?.uso_escenario === "si"
        ? ` Regla territorial documentada ${territory.screeningRule.edad_min_escenario}–${territory.screeningRule.edad_max_escenario}; no confirma elegibilidad individual.`
        : " Regla territorial pendiente/bloqueada; el volumen demográfico no confirma una edad diana.";
      $("aiContext").textContent = `${territory.name}, ${age}, residentes ${format(demographic.residents)}, fracción incluida ${format(feature.inclusion_rate*100)} %, participación supuesta ${format(context.participationRate*100)} %, perturbación ${format(feature.drop*100)} %, inicio índice ${feature.start}, duración ${feature.duration}, recuperación ${strategyNames[feature.strategy]}, horizonte ${feature.horizon}, capacidad ${format(feature.capacity)} (${format(feature.capacity_ratio)}×). La participación se conserva como contexto, pero no se pasa al bosque: no está en su esquema de entrenamiento.${ruleNote}`;
      const warnings = [];
      if (unsupported.length) warnings.push(`Fuera del dominio de entrenamiento IID: ${unsupported.join("; ")}. Las predicciones son extrapolaciones y requieren especial cautela.`);
      if (feature.inclusion_rate < .15 || feature.inclusion_rate > .95) warnings.push("La fracción incluida está fuera del intervalo usado para entrenar.");
      const alert = warnings.join(" ");
      $("aiDomainWarning").hidden = !alert;
      $("aiDomainWarning").textContent = alert;
      $("aiCurrentSummary").textContent = `El motor exacto informa remanente ${format(exact[0])}, pico ${format(exact[1])} y ${format(exact[2])} periodos limitados. El Random Forest aproxima esos tres resultados; no sustituye al cálculo exacto.`;
      const error = basePrediction.mean.map((value, i) => value - exact[i]);
      $("aiCurrentInterpretation").textContent = `Con ${territory.name} y el rango ${feature.age_band.replace("_", "–")}, el escenario contiene ${format(demographic.residents)} residentes y genera una referencia de ${format(demographic.invitations)} invitaciones equivalentes hipotéticas en seis periodos. La reducción elegida produce ${format(result.pending)} unidades pendientes; el motor recupera ${format(result.recovered.reduce((a, b) => a + b, 0))} y deja ${format(result.remainder)} de remanente. El predictor estima el remanente con una diferencia de ${format(error[0])} unidades frente al motor exacto; la estimación no es evidencia observada. La capacidad usada es un límite aritmético supuesto, y participación (${format(context.participationRate*100)} %) se muestra solo como contexto: no es una entrada del modelo ni equivale a pruebas realizadas.`;
      renderResults(context, basePrediction, selected, candidates, predictions);
      setStatus("aiTransferStatus", `Contexto transferido desde Contrafactual; ${candidates.length} candidatos puntuados y ${selected.length} propuestas verificadas con conservación exacta.`, false);
      lastRun = { feature, exact, proposals: selected.length };
      globalThis.CRABI_AI_LAST_TRANSFER = { ...feature, participationRate: context.participationRate };
      return true;
    } catch (error) {
      lastRun = null;
      $("aiCurrentResults").replaceChildren();
      $("aiSuggestions").replaceChildren();
      $("aiCurrentSummary").textContent = "No hay una inferencia y verificación recientes.";
      $("aiCurrentInterpretation").textContent = "No hay resultados válidos que interpretar.";
      $("aiDomainWarning").hidden = true;
      setStatus("aiTransferStatus", `No se pudo transferir/analizar el escenario: ${error.message}`, true);
      return false;
    }
  }

  function invalidate() {
    if (!lastRun) return;
    lastRun = null;
    $("aiCurrentResults").replaceChildren();
    $("aiSuggestions").replaceChildren();
    $("aiCurrentSummary").textContent = "Los controles del contrafactual cambiaron. Vuelve a analizar para actualizar predicciones y verificaciones.";
    $("aiCurrentInterpretation").textContent = "La interpretación anterior está invalidada porque el escenario cambió.";
    setStatus("aiTransferStatus", "El contexto anterior está obsoleto; la interfaz exige volver a transferir el escenario actual.", true);
  }

  try {
    verifyModel();
    renderFactors();
    setStatus("aiTransferStatus", "Modelo portable cargado; espera la transferencia de un escenario contrafactual.", false);
    $("cfAnalyzeAI").addEventListener("click", () => {
      const ok = analyze();
      if (ok && typeof globalThis.CRABI_NAVIGATE === "function") globalThis.CRABI_NAVIGATE("tabAI");
    });
    $("aiAnalyze").addEventListener("click", analyze);
    for (const id of cfIds) {
      const element = $(id);
      if (!element) continue;
      element.addEventListener(element.tagName === "SELECT" ? "change" : "input", invalidate);
    }
    globalThis.CRABI_AI_INTEGRATION = { analyze, readContext };
  } catch (error) {
    $("aiAnalyze").disabled = true;
    $("cfAnalyzeAI").disabled = true;
    setStatus("aiTransferStatus", `No está disponible la inferencia local: ${error.message}`, true);
  }
})();
