# CRABI — avances demográficos a 22/11/2026

**Selección local para revisión; no publicada y sin licencia de software aprobada.**

## Implementado

- Demo demográfica editable v0.2 para escenarios de invitación, participación y distribución temporal.
- Agregación reproducible de INE ECP por mujeres, edad simple y 19 territorios/total nacional en cortes provisionales 2026.
- Contexto municipal de Madrid 2025 con licencia CC BY 4.0, presentado aparte del denominador INE.
- Sensibilidad determinista de rango, invitación, participación, pesos y umbral hipotético.
- Comparación independiente Python/JavaScript de 952 métricas demográficas, todas pasaron en el corte técnico documentado.
- Revisión de fuentes oficiales del cribado en 19 territorios, con fecha, enlace, vigencia, estado y cautelas de transición; no se imputan valores territoriales desde agregados nacionales.
- Escenario demográfico territorial que agrega edades simples del INE dentro de rangos con respaldo temporal suficiente. A la fecha de corte, 15 rangos se habilitan solo como referencia demográfica y cuatro permanecen bloqueados por incertidumbre actual (Andalucía, Aragón, Navarra y Ceuta). Illes Balears usa 45–74 declarado como actual por una nota oficial de octubre de 2026; la implantación por cohortes y la periodicidad tras la ampliación siguen sin documentar.

La auditoría por territorio está en [`../VALIDACION_TERRITORIAL_CRABI.md`](../VALIDACION_TERRITORIAL_CRABI.md). No se trata de elegibilidad individual, calendario de invitación ni validación sanitaria.

## Datos y lectura

INE 1/10/2026: 7.289.348 residentes 50–69 y 10.579.631 residentes 45–74. La diferencia es población residente adicional, no población elegible. El escenario 45–74 no reproduce los calendarios de implementación territorial.

Las pruebas y cálculos son técnicos; no equivalen a revisión epidemiológica externa, clínica u operativa. Faltan denominadores de elegibilidad, exclusiones y datos de capacidad comparables, además de revisión humana y accesibilidad asistiva. Las edades publicadas pueden corresponder a programas en transición, y los conteos residentes por edad no representan elegibilidad.

## Alcance de esta selección

El módulo COVID se conserva en el repositorio local completo, pero no forma parte de esta selección pública mientras se revisan derechos de ASPB. No se incluyen tasas Red 2023 ni su CSV derivado. La revisión multidisciplinar IA permanece identificada como simulada en la documentación original y no se presenta aquí como validación humana.
