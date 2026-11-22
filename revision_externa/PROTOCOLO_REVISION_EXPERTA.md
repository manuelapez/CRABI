# Protocolo de revisión experta de CRABI

**Versión del material:** rama `audit/integral-crabi-2026-11`, corte 22/11/2026. **Propósito:** revisar métodos y límites del prototipo antes de cualquier uso de planificación. No equivale a aprobación clínica ni institucional.

## Perfiles y alcance

Solicitar revisión independiente a: (1) persona responsable de un programa poblacional de cribado de mama; (2) epidemióloga/o o bioestadística/o con experiencia en cribado; (3) profesional de planificación/capacidad sanitaria. Si se evalúa accesibilidad, añadir especialista de accesibilidad digital y usuarias con lector de pantalla. Registrar afiliación y conflictos de interés; el equipo de proyecto no completa el dictamen externo.

## Material reproducible

Entregar la carpeta completa de esta rama, `RESOLUCION_RIESGOS_Y_DEPENDENCIAS.md`, `FUENTES_Y_METODOLOGIA.md`, `demo/README.md`, `demo/data/README.md`, `contrafactual/README.md`, los scripts y CSV de población reducidos y la ficha individual. Informar que no se incluyen tasas de Red porque el permiso de redistribución no está verificado. Reproducir desde raíz:

```text
python demo/data/build_population_snapshot.py --period 2026-10
python demo/data/build_demo_data.py
node --check demo/model.js
node --test tests/demo-model.test.cjs tests/contrafactual-ui.test.cjs tests/interface-static-audit.test.cjs
python -m unittest discover -s tests -v
```

## Preguntas y criterio de dictamen

1. ¿La definición y el denominador de cada resultado están descritos sin equiparar residentes con elegibles/invitadas?
2. ¿La extracción ECP, agregación por edad y conciliación con el total nacional son reproducibles y adecuadas para el objetivo exploratorio?
3. ¿Los supuestos comunes del escenario 45–74 y la invitación del 100% son suficientemente visibles y no inducen a leerlos como implementación territorial?
4. ¿La representación de reglas, periodicidad, exclusiones, actividad y capacidad evita afirmar comparabilidad no respaldada?
5. ¿La formulación del módulo COVID distingue diferencia anual, personas pendientes, escenarios y causalidad?
6. ¿Qué dato adicional cambiaría una decisión concreta y con qué definición/periodicidad?
7. ¿Qué errores u omisiones impedirían publicar incluso como prototipo exploratorio?

Dictaminar por pregunta: **aceptable**, **cambio requerido** o **no evaluable por falta de evidencia**, con evidencia/página/código y recomendación concreta. Un “aceptable” debe incluir alcance y limitaciones, no aprobación general del proyecto.

## Procedimiento y cierre

Cada especialista revisa versión congelada identificada por commit/hash; registra fecha, rol y conflictos; completa una ficha sin nombres de pacientes ni información personal. Se consolidan respuestas sin borrar discrepancias. Toda recomendación se registra como issue interno y se responde con decisión, cambio y referencia. No presentar resultados como validados hasta tener revisión firmada y resolver los cambios críticos. Esta preparación no incluye contacto ni envío de archivos.
