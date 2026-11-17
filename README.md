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
- Una evaluación de las variables que más cambian las conclusiones.
- Una línea de aprendizaje automático para estudiar la participación agregada, condicionada a la calidad y disponibilidad de datos y a su validación.

El objetivo es apoyar a quienes planifican los programas, con resultados trazables e incertidumbre explícita. El proyecto no diagnostica ni predice tiempos de espera o beneficios clínicos.

## Datos y metodología

Utilizamos o estamos investigando fuentes abiertas del INE, la Comunidad de Madrid, el Ministerio de Sanidad y la Red de Programas de Cribado. El detalle, sus usos y limitaciones se recoge en [Fuentes y metodología](FUENTES_Y_METODOLOGIA.md).

## Estado actual

Ya existe una primera demo local del motor de escenarios. Compara dos ritmos de invitación para 19 territorios, utilizando población provisional del INE y, cuando está disponible, participación histórica como supuesto. Los resultados son **exploratorios**, no predicciones operativas.

Se ha realizado una primera prueba exploratoria de aprendizaje automático sobre una muestra pequeña. No ha superado la referencia sencilla en esa prueba y **no está integrada en la demo**. Para evaluar un modelo útil hacen falta más datos comparables y validación temporal.

Consulta el [estado del proyecto](ESTADO_Y_PROXIMOS_PASOS.md) para conocer lo realizado y lo pendiente. El código y la demo se incorporarán al repositorio después de revisar los materiales y las condiciones de reutilización de las fuentes.

## Sobre la autora

Soy Manuela Ibáñez Valenzuela, estudiante de Estadística Aplicada e impulsora de proyectos que combinan estadística, ciencia de datos y salud.

Junto a Clara Ibáñez Valenzuela desarrollo **NDStats Analytics y N-OncoBC**, una línea de trabajo que explora el análisis estadístico de datos clínicos y nutricionales en cáncer de mama. N-OncoBC plantea una aproximación individualizada y longitudinal para apoyar la interpretación de la trayectoria de cada paciente.

CRABI continúa mi interés por aplicar los datos al cáncer de mama desde otra escala: estudia cómo los datos poblacionales pueden apoyar la planificación futura del cribado.

Más información: [NDStats Analytics](https://ndstatsanalytics.com).
