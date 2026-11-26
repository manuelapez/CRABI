/* Copyright (c) 2026 Manuela Ibáñez. MIT applies to original CRABI software; see LICENSE_SCOPE.md. */
"use strict";
const CRABI_RF = (() => {
  function encode(model, row) {
    const values = [];
    for (const feature of model.categorical_features) {
      const chosen = String(row[feature]);
      for (const level of model.categories[feature]) values.push(chosen === level ? 1 : 0);
    }
    for (const feature of model.numeric_features) {
      const value = Number(row[feature]);
      if (!Number.isFinite(value)) throw new TypeError(`Entrada numérica no válida: ${feature}`);
      values.push(value);
    }
    return values;
  }

  function predictTree(tree, vector) {
    let node = 0;
    while (tree.left[node] !== -1) {
      const feature = tree.feature[node];
      node = vector[feature] <= tree.threshold[node] ? tree.left[node] : tree.right[node];
    }
    return tree.value[node];
  }

  function predict(model, rows) {
    if (model?.format !== "crabi-exploration-rf-v1" || !Array.isArray(model.trees) || !model.trees.length) {
      throw new TypeError("Artifact Random Forest CRABI no válido");
    }
    const perTree = model.trees.map((tree) => rows.map((row) => predictTree(tree, encode(model, row))));
    return rows.map((_, i) => {
      const values = perTree.map((tree) => tree[i]);
      const mean = model.targets.map((_, j) => values.reduce((sum, v) => sum + v[j], 0) / values.length);
      const sd = model.targets.map((_, j) => Math.sqrt(values.reduce((sum, v) => sum + (v[j] - mean[j]) ** 2, 0) / values.length));
      return { mean, sd, treeValues: values };
    });
  }

  return { encode, predict };
})();
if (typeof module !== "undefined" && module.exports) module.exports = CRABI_RF;
if (typeof globalThis !== "undefined") globalThis.CRABI_RF = CRABI_RF;
