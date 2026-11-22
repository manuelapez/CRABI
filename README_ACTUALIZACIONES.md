# Actualización de funcionamiento de la demo · CRABI v0.3

Este documento registra la actualización de la demo preparada para integrar en la rama `main`. El README principal sigue siendo la presentación permanente del proyecto CRABI.

## Cambios

- `demo/index.html` presenta instrucciones si faltan archivos, habilita los controles tras el cálculo inicial y valida el umbral entero. Un umbral no válido deja visibles sus mensajes de ayuda y no interrumpe los demás resultados.
- `demo/territorial.js` inicia el escenario tras comprobar el selector y oculta el aviso cuando ya muestra resultados.
- `demo/README.md` incorpora instrucciones para descargar y abrir la demo en Windows.
- `tests/demo-local.test.cjs` añade pruebas de arranque, controles, escenarios demográficos y territoriales, valor inválido y dependencias ausentes.

El cambio conserva las fórmulas y los datos de CRABI v0.3 A+B. No requiere dependencias nuevas. La batería de regresión específica pasó sus 12 pruebas.

## Integración con el Explorador de Windows

Copia `README.md`, `README_ACTUALIZACIONES.md` y las carpetas `demo` y `tests` a la raíz del clon de CRABI. Acepta reemplazar `README.md`, `demo/README.md`, `demo/index.html` y `demo/territorial.js`. Se añade `README_ACTUALIZACIONES.md` y la prueba `tests/demo-local.test.cjs`.

El registro de cambios quedará junto al README permanente para documentar esta corrección sin convertir la portada del proyecto en una nota temporal de versión.
