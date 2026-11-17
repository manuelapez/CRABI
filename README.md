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

## Estudio contrafactual retrospectivo: qué habría pasado con otra planificación

Esta será una línea central de CRABI: reconstruir la interrupción del cribado durante la pandemia y simular alternativas de recuperación. El caso permite estudiar una perturbación histórica concreta y traducirla a una pregunta de planificación: **cómo cambia la carga de mamografías cuando la actividad pendiente se recupera a ritmos distintos**.

### Hipótesis de trabajo

Manteniendo constante el volumen total de invitaciones pendientes, el calendario de recuperación modifica los picos de actividad y el tiempo necesario para volver al ritmo de referencia. Una recuperación más concentrada podría exigir mayor capacidad en menos periodos; una distribución más gradual podría reducir los picos, a costa de prolongar la recuperación. El análisis cuantificará esta compensación con escenarios, sin asumir de antemano cuál es preferible.

### Diseño estadístico

Se estimará una referencia de actividad a partir de las rondas previas a la pandemia y se comparará con la actividad observada. Después se simularán calendarios alternativos de recuperación y se variarán los supuestos de participación. El estimando principal será la diferencia entre actividad observada y esperada bajo cada escenario, expresada en invitaciones y mamografías por ronda o periodo; como resultados de planificación se describirán también los picos de demanda y la capacidad hipotética requerida para cumplir cada calendario.

Como fuentes se consideran los indicadores agregados españoles de 2019–2020 y los datos abiertos de invitaciones del programa de Barcelona (2012–2021), sujetos a comprobar su disponibilidad, estructura, comparabilidad y condiciones de reutilización. La referencia y los parámetros se documentarán para que los resultados puedan reproducirse.

La diferencia estimada será un **contrafactual condicionado al modelo**, no un efecto causal identificado experimentalmente. La pandemia coincidió con cambios en organización, composición de las invitadas y participación. Se explicitarán los supuestos de continuidad y se evaluará cuánto dependen las conclusiones de ellos. El alcance se limitará a actividad y carga temporal: no se inferirán capacidad o esperas reales, diagnósticos evitados ni mortalidad sin datos y validación adecuados.

## Datos y metodología

Utilizamos o estamos investigando fuentes abiertas del INE, la Comunidad de Madrid, el Ministerio de Sanidad y la Red de Programas de Cribado. El detalle, sus usos y limitaciones se recoge en [Fuentes y metodología](FUENTES_Y_METODOLOGIA.md).

## Estado actual

La **demo v0.2** ya está disponible en [`demo/`](demo/). Compara los rangos de edad 50–69 y 45–74, permite explorar supuestos de participación y muestra un límite anual hipotético. Usa población provisional del INE para 2026 y datos de población municipal de Madrid de 2025 como contexto. Sus resultados son escenarios exploratorios, no predicciones operativas ni recomendaciones.

La primera prueba exploratoria de aprendizaje automático no superó la referencia sencilla y **la IA no está integrada en la demo**. Se necesitarían más datos comparables y una validación temporal para evaluar otro modelo.

Consulta [la demo y sus límites](demo/README.md), [fuentes y metodología](FUENTES_Y_METODOLOGIA.md) y el [estado del proyecto](ESTADO_Y_PROXIMOS_PASOS.md).

## Sobre la autora

Soy Manuela Ibáñez Valenzuela, estudiante de Estadística Aplicada e impulsora de proyectos que combinan estadística, ciencia de datos y salud.

Junto a Clara Ibáñez Valenzuela desarrollo **NDStats Analytics y N-OncoBC**, una línea de trabajo que explora el análisis estadístico de datos clínicos y nutricionales en cáncer de mama. N-OncoBC plantea una aproximación individualizada y longitudinal para apoyar la interpretación de la trayectoria de cada paciente.

CRABI continúa mi interés por aplicar los datos al cáncer de mama desde otra escala: estudia cómo los datos poblacionales pueden apoyar la planificación futura del cribado.

Más información: [NDStats Analytics](https://ndstatsanalytics.com).
