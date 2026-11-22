# Validación demográfica de la selección pública

**Corte de datos:** 22/11/2026. No es validación clínica, epidemiológica externa ni operativa.

## Comprobaciones independientes

Se sumaron edades simples de los extractos INE y se compararon con los snapshots por fecha, banda y territorio. Se verificó que los 19 totales territoriales concilian con el total nacional. Se conservó aparte el snapshot anterior de julio para distinguir una revisión provisional de cambio entre fechas.

En el cruce independiente Python/JavaScript filtrado a demografía pasaron **952 de 952** comprobaciones. La tolerancia de los cálculos decimales fue absoluta 1e-08 más relativa 1e-12×máximo; edad agregada e integridad de snapshots requieren coincidencia exacta.

## Resultados

- Base nacional INE 50–69, 1/10/2026: 7.289.348 residentes.
- Escenario nacional 45–74: 10.579.631 residentes; +3.290.283 (+45,138%) respecto de 50–69.
- A 100% de invitación y 60% de participación supuesta, 50–69 produce 4.373.608,8 pruebas aritméticamente esperadas.
- El total esperado escala multiplicativamente con la fracción invitada y la tasa de participación supuesta.
- Los pesos temporales cambian el pico por periodo, pero no el acumulado bajo el mismo total.
- El umbral de carga es elegido por quien usa la demo y no describe capacidad instalada.
- La revisión de julio compara dos versiones de una misma fecha; no es un cambio demográfico julio-octubre.

Las rejillas son escenarios deterministas y no probabilidades ni intervalos de incertidumbre. No corrigen por elegibilidad, exclusiones, composición, cohortes o calendario local.

## Archivos de resultados incluidos

CSV de rangos, rejilla demográfica, pesos temporales, umbrales, revisión poblacional y 952 comprobaciones filtradas; dos gráficos SVG. La sensibilidad COVID y los artefactos de comprobación mezclados no se incluyen.
