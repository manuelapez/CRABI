# Estado y próximos pasos de CRABI

**Actualización:** 22 de noviembre de 2026 · **Rama de trabajo:** `audit/integral-crabi-2026-11`.

## Estado comprobable

- La demo demográfica v0.2 incluye el rediseño visual aprobado, el motor en un archivo separado y una instantánea de población INE por edad/CCAA al 1 de octubre de 2026.
- Los 19 totales territoriales agregados coinciden con el total nacional para 45–49, 50–69 y 70–74. Son cifras provisionales de residentes, no elegibilidad.
- La tabla derivada de participación Red 2023 se retiró hasta verificar permiso de redistribución; la demo conserva solo el supuesto manual editable del 60%.
- La opción completa 45–74 se documenta como escenario que ignora la implementación gradual aprobada; no se afirma que represente el calendario efectivo de cada comunidad.
- El umbral de capacidad cambió de “anual” a “por periodo”, que es la unidad con la que se calcula. Continúa siendo un supuesto sin capacidad observada.
- El contrafactual COVID distingue la diferencia agregada de invitaciones de un atraso de mujeres real; mantiene la recuperación del calendario reportada por ASPB en 2021.
- Se creó `AUDITORIA_INTEGRAL_CRABI.md` y `RESOLUCION_RIESGOS_Y_DEPENDENCIAS.md`, junto con plantilla territorial y paquete para revisión experta.

## Pendiente

- Revisión visual real en navegadores/tecnologías de asistencia y dictámenes externos de profesionales de cribado, epidemiología y planificación sanitaria.
- Obtener reglas territoriales identificadas de edad, periodicidad, exclusiones y denominadores elegibles/invitados; el informe nacional no asigna sus resultados a cada CCAA.
- Confirmar por escrito las condiciones de redistribución de la tabla Red 2023 V2 antes de volver a incluir tasas derivadas.
- Identificar elegibilidad, rondas, cohortes, invitaciones, capacidad/cupos y calendarios efectivos por territorio para escenarios operativos.
- No se estiman resultados clínicos, colas, tiempos de espera, costes ni efectos causales.

## Pruebas ejecutadas

`node --test tests/demo-model.test.cjs tests/contrafactual-ui.test.cjs` cubre planes, sensibilidad, rangos inválidos, conservación, datos embebidos, labels/IDs y contraste de color; `python -m unittest discover -s tests -v` cubre agregación y reproducción de fuentes. La cobertura técnica no es validación estadística ni científica externa.
