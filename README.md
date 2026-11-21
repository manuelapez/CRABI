# CRABI

## El futuro no espera: ¿está España preparada para el próximo cribado?

**Simulación con datos abiertos e inteligencia artificial para planificar el cribado de cáncer de mama en España.**

> Proyecto presentado a DATAMAD 2026. Investigación y prototipo en desarrollo.

## La pregunta

¿Cómo podrían cambiar las necesidades de pruebas de cribado de cáncer de mama en cada territorio si cambian la población, las edades incluidas y la participación?

CRABI explora esa pregunta desde la planificación sanitaria. La propuesta combina datos abiertos y escenarios para mostrar qué volúmenes de actividad podrían resultar de distintos supuestos y qué información adicional podría ayudar a tomar decisiones.

## Qué estamos desarrollando

- Una base documentada de población y reglas territoriales.
- Un motor de simulación que compara ritmos hipotéticos de invitación.
- Un estudio contrafactual retrospectivo sobre la interrupción y recuperación del cribado durante la pandemia.
- Una evaluación de las variables que más cambian las conclusiones.
- Una línea de aprendizaje automático para estudiar la participación agregada, condicionada a la calidad y disponibilidad de datos y a su validación.

El objetivo es apoyar a quienes planifican los programas, con resultados trazables e incertidumbre explícita. El proyecto no diagnostica ni predice tiempos de espera o beneficios clínicos.

## Módulo contrafactual COVID: ritmos hipotéticos de recuperación

El módulo explora una pregunta de planificación: **cómo cambia el pico de actividad al repartir un volumen hipotético en cuatro periodos graduales o dos concentrados**. Usa como proxy la diferencia de invitaciones de 2018 y 2020 en Barcelona (97.299 frente a 47.659; G = 49.640), según los informes ASPB. La brecha entre volúmenes no identifica mujeres únicas pendientes. ASPB informó que el cronograma se recuperó a finales de 2021; por tanto, CRABI no presenta un backlog actual ni reconstruye una deuda administrativa.

La sensibilidad de mamografías aritméticamente esperadas utiliza participación observada de 48,4% (2021) y 52,6% (2020). No es un intervalo estadístico ni una respuesta validada de una cohorte no invitada. La comparación es descriptiva y condicionada a supuestos; no estima causalidad, capacidad disponible, esperas ni desenlaces clínicos.

Abre el [simulador contrafactual](contrafactual/index.html) y consulta su [diseño, fórmulas, fuentes y limitaciones](contrafactual/README.md). El archivo de microdatos de invitaciones PSMAR 2012–2021 localizado en Harvard Dataverse figura como restringido y no se usa. La evidencia publicada ya estudia el impacto COVID en PSMAR; CRABI enfoca su aportación en la comparación transparente de ritmos hipotéticos con agregados públicos.

## Datos y metodología

Utilizamos o estamos investigando fuentes abiertas del INE, la Comunidad de Madrid, el Ministerio de Sanidad y la Red de Programas de Cribado. El detalle, sus usos y limitaciones se recoge en [Fuentes y metodología](FUENTES_Y_METODOLOGIA.md).

## Estado actual

La **demo v0.2** está disponible en [`demo/`](demo/). Compara los rangos de edad 50–69 y 45–74, permite explorar supuestos de participación y muestra un límite anual hipotético. Usa población provisional del INE para 2026 y datos de población municipal de Madrid de 2025 como contexto. Sus resultados son escenarios exploratorios, no predicciones operativas ni recomendaciones. El módulo COVID es una herramienta separada.

La primera prueba exploratoria de aprendizaje automático no superó la referencia sencilla y **la IA no está integrada en la demo**. Se necesitarían más datos comparables y una validación temporal para evaluar otro modelo.

Consulta [la demo y sus límites](demo/README.md), [fuentes y metodología](FUENTES_Y_METODOLOGIA.md) y el [estado del proyecto](ESTADO_Y_PROXIMOS_PASOS.md).

## Sobre la autora

Soy Manuela Ibáñez Valenzuela, estudiante de Estadística Aplicada e impulsora de proyectos que combinan estadística, ciencia de datos y salud.

Junto a Clara Ibáñez Valenzuela desarrollo **NDStats Analytics y N-OncoBC**, una línea de trabajo que explora el análisis estadístico de datos clínicos y nutricionales en cáncer de mama. N-OncoBC plantea una aproximación individualizada y longitudinal para apoyar la interpretación de la trayectoria de cada paciente.

CRABI continúa mi interés por aplicar los datos al cáncer de mama desde otra escala: estudia cómo los datos poblacionales pueden apoyar la planificación futura del cribado.

Más información: [NDStats Analytics](https://ndstatsanalytics.com).
