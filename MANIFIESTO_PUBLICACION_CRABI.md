# Manifiesto de la selección demográfica CRABI

**Corte:** 22/11/2026. Esta selección contiene 36 archivos para documentar y reproducir la demo demográfica CRABI v0.2. Las rutas siguientes son relativas a la raíz del repositorio.

## Archivos incluidos

- `CITATION.cff`
- `CONTRIBUTING.md`
- `MANIFIESTO_PUBLICACION_CRABI.md`
- `PROPUESTA_LICENCIA.md`
- `README.md`
- `analisis/robustez_demografica.py`
- `demo/README.md`
- `demo/data.js`
- `demo/data/README.md`
- `demo/data/build_demo_data.py`
- `demo/data/build_population_snapshot.py`
- `demo/data/ine_ecp_2026_mujeres_40_79_edad.csv`
- `demo/data/ine_ecp_2026_mujeres_40_79_edad_previous.csv`
- `demo/data/madrid_context_2025_ccaa.csv`
- `demo/data/population_2026-01.csv`
- `demo/data/population_2026-07.csv`
- `demo/data/population_2026-07_snapshot_pre_revision.csv`
- `demo/data/population_2026-10.csv`
- `demo/data/reglas_territoriales_plantilla.csv`
- `demo/index.html`
- `demo/model.js`
- `docs/AVANCES_CRABI_2026-11-22.md`
- `docs/FUENTES_Y_METODOLOGIA.md`
- `docs/RESULTADOS_REPRODUCIBLES_DEMOGRAFIA.md`
- `docs/VALIDACION_ROBUSTEZ_DEMOGRAFICA.md`
- `resultados/robustez/age_range_comparison.svg`
- `resultados/robustez/age_range_sensitivity.csv`
- `resultados/robustez/demographic_sensitivity_grid.csv`
- `resultados/robustez/independent_demographic_engine_checks.csv`
- `resultados/robustez/provisional_population_comparison.csv`
- `resultados/robustez/temporal_peak_sensitivity.svg`
- `resultados/robustez/temporal_weight_sensitivity.csv`
- `resultados/robustez/threshold_sensitivity.csv`
- `tests/demo-model.test.cjs`
- `tests/test_demo_data_build.py`
- `tests/test_population_snapshot.py`

## Alcance y derechos

La selección incluye código original de la demo, documentación y datos agregados atribuidos al INE y al portal de datos abiertos de la Comunidad de Madrid. Las atribuciones, fechas, transformaciones y límites están en `docs/FUENTES_Y_METODOLOGIA.md` y `demo/data/README.md`.

No contiene tasas de la Red de Programas de Cribado 2023 ni informes, transcripciones o transformaciones ASPB. La ficha de Red V2 no aporta una autorización de redistribución verificable. Los informes ASPB consultados indican CC BY-NC-ND; su módulo y resultados derivados quedan fuera de esta selección. No se incluyen microdatos personales o clínicos.

Esta selección no concede una licencia al código. No se declara CRABI como software open source; la licencia sigue pendiente de aprobación y el archivo `PROPUESTA_LICENCIA.md` es solo deliberativo. Siete archivos preexistentes de documentación y del módulo COVID fueron retirados de la rama preparada y preservados en un archivo local fuera del repositorio; no se redistribuyen en esta selección. Los demás archivos preexistentes que no aparecen en la lista tampoco quedan cubiertos por esta selección ni por su revisión.

## Límites de interpretación

La demo es exploratoria. Residentes no equivale a elegibles, invitadas o participantes. Los escenarios no son predicciones, intervalos de confianza, capacidad operativa, resultados clínicos ni estimaciones causales. La comprobación incluida compara implementaciones aritméticas Python y JavaScript y no constituye validación clínica, científica externa ni operativa.
