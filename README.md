# CRABI — una herramienta para explorar la planificación del cribado

CRABI es un proyecto en desarrollo que busca convertir datos, reglas y supuestos de planificación en escenarios claros, comparables y reproducibles para los programas de cribado de cáncer de mama. La idea es que una persona pueda cambiar una hipótesis, por ejemplo, el rango de edad o el ritmo de invitación, y observar cómo se modifica el volumen estimado, qué depende de cada supuesto y qué información sería necesaria para afinar el análisis.

El objetivo es construir progresivamente un espacio de trabajo que conecte población de referencia, características de los programas, escenarios de invitación y participación, distribución temporal y evidencia disponible. CRABI aspira a ayudar a formular preguntas, comparar alternativas y conversar sobre necesidades de planificación con supuestos a la vista. Conforme se incorporen fuentes y validaciones, podrá ofrecer análisis más contextualizados por territorio y facilitar la exploración de escenarios; cada ampliación dependerá de la calidad, comparabilidad y autorización de los datos disponibles.

CRABI está pensado como apoyo a la exploración y al análisis, no como sustituto de los equipos responsables de los programas. Los escenarios permiten estudiar relaciones aritméticas y sensibilidad a los supuestos; para representar la operación real de un programa harían falta datos y validaciones específicos de elegibilidad, cohortes, exclusiones, capacidad y calendario. La herramienta no emite recomendaciones clínicas ni determina decisiones individuales.

## Modelo contrafactual retrospectivo

Una línea especialmente interesante de CRABI es el **modelo contrafactual retrospectivo**: tomar una interrupción observada en el pasado, construir una referencia explícita a partir de los datos publicados y explorar qué perfiles de recuperación habrían producido distintos ritmos de actividad. La pregunta del módulo de Barcelona es concreta: si se toma como volumen de escenario la diferencia agregada entre las invitaciones reportadas en 2018 y 2020, ¿cómo cambiarían el pico de actividad y el número de periodos al distribuir ese volumen de forma gradual o concentrada?

El cálculo usa `G = 97.299 − 47.659 = 49.640` como **diferencia entre dos totales anuales publicados**. Sobre ese mismo volumen compara dos diseños: un reparto uniforme en cuatro periodos y otro en dos. Después permite aplicar una participación elegida dentro de una banda basada en observaciones publicadas para explorar las mamografías aritméticas asociadas. El acumulado se mantiene igual por construcción; lo que cambia es el ritmo: el reparto en menos periodos presenta un pico mayor. Así, el modelo hace visible una compensación de planificación —concentrar la actividad acorta el reparto hipotético y aumenta el pico— y ayuda a formular preguntas sobre capacidad, calendario y datos que sería útil obtener.

Su valor está en convertir una pregunta histórica compleja en un escenario comprensible y ajustable: muestra qué parte procede de los datos observados, qué parte depende de decisiones de diseño y cómo varían los resultados al cambiar los supuestos. También ofrece una base para futuras extensiones con información autorizada por cohorte, calendario y capacidad, si esos datos llegan a estar disponibles. Es un **contrafactual de escenarios retrospectivos**, no una reconstrucción de lo que les ocurrió a personas concretas ni una estimación causal del efecto de la pandemia. Los agregados comparados no enlazan las mismas personas, cohortes o áreas, y el informe de ASPB señala que el calendario se recuperó al cierre de 2021; por ello, `G` no se interpreta como personas pendientes ni como un atraso vigente.

El módulo y sus datos asociados se conservan fuera de esta carpeta candidata mientras se revisan los permisos de uso y redistribución. Su diseño y documentación histórica forman parte de la evolución de CRABI, aunque no se distribuyan aquí.

## Modelo demográfico y escenarios actuales

La otra línea del proyecto parte de un denominador poblacional, aplica supuestos editables y distribuye los resultados en periodos de análisis. La interfaz permite distinguir qué parte procede de los datos y cuál de la hipótesis seleccionada. Los rangos de sensibilidad sirven para explorar cómo cambia el escenario al modificar un parámetro; no son intervalos de confianza.

## Qué incluye esta candidata

La [demo demográfica](demo/index.html) que acompaña esta selección compara los rangos de **50–69** y **45–74 años**, permite variar la fracción de población incluida y la participación supuesta, y contrasta dos repartos ilustrativos de actividad en tres periodos. Utiliza población femenina residente por edad simple y territorio procedente de agregados del INE. El corte de octubre de 2026 es provisional; el escenario 45–74 aplica el rango desde el inicio y no reproduce la implantación gradual de cada programa.

La demo incorpora además una vista territorial que enlaza reglas documentadas con población residente por edad. La revisión contempla 19 territorios; en cuatro la información disponible no permite activar un rango para el cálculo demográfico en este corte: Andalucía, Aragón, Navarra y Ceuta. Las reglas habilitadas se presentan como referencias demográficas y no como recuentos de personas elegibles. Puedes consultar el detalle en [la validación territorial](VALIDACION_TERRITORIAL_CRABI.md), [la investigación de fuentes](INVESTIGACION_TERRITORIAL_CRIBADO_ESPANA.md) y [la evolución del modelo territorial](EVOLUCION_MODELO_TERRITORIAL_CRABI.md).

La población censal de Madrid de 2025 aparece como contexto independiente, sin mezclarse con el denominador INE. La demo no descarga datos durante su uso: los datos y transformaciones se incluyen para facilitar la revisión y la reproducción local.

## Mapa de la carpeta

- **`demo/`**: interfaz interactiva, motor de cálculo demográfico, vista territorial, datos empaquetados y guías de construcción.
- **`demo/data/`**: extractos agregados del INE, snapshots por fecha, contexto censal de Madrid y scripts que preparan los datos de la demo.
- **`datos_territoriales/`**: tabla de reglas, plantilla y documentación de las fuentes y transformaciones.
- **`analisis/`** y **`resultados/robustez/`**: análisis demográficos, tablas de sensibilidad y gráficos reproducibles.
- **`docs/`**: propósito, fuentes y metodología, resultados reproducibles y revisión de robustez.
- **`tests/`**: comprobaciones automáticas de cálculos, datos, snapshots y reglas territoriales.
- **Documentos de raíz**: validaciones, evolución territorial, manifiesto de esta selección, guía de contribución y metadatos de citación.

La vista de indicadores observados y el módulo contrafactual no forman parte de esta selección; tampoco se incluyen las tasas derivadas del informe Red 2023. Los datos observados no alimentan automáticamente el simulador. La metodología y el inventario de archivos pueden consultarse en [fuentes y metodología](docs/FUENTES_Y_METODOLOGIA.md), [resultados reproducibles](docs/RESULTADOS_REPRODUCIBLES_DEMOGRAFIA.md), [validación de robustez](docs/VALIDACION_ROBUSTEZ_DEMOGRAFICA.md) y el [manifiesto](MANIFIESTO_FINAL_AB_V03_PROPUESTO.md).

## Reproducir y explorar

Se requiere Python 3 y Node.js. Desde esta carpeta, en PowerShell, las comprobaciones incluidas se ejecutan así:

```powershell
python -m unittest discover -s tests -v
node --test tests/demo-model.test.cjs tests/v03-model.test.cjs
```

Para abrir la demo, inicia un servidor local con `python -m http.server 8000` y visita `http://localhost:8000/demo/`, o abre `demo/index.html` en un navegador moderno. Los datos de entrada y los pasos para reconstruirlos están descritos en [`demo/data/README.md`](demo/data/README.md).

Los cálculos actuales permiten comparar escenarios aritméticos. La interpretación y cualquier aplicación a un programa concreto requieren revisar las definiciones de las fuentes, la vigencia territorial y los datos que cada pregunta necesite. La evaluación con profesionales y la revisión científica forman parte del trabajo de desarrollo previsto.

## Sobre la autora

CRABI fue impulsado por **Manuela Ibáñez Valenzuela** y presentado como prototipo de investigación en DATAMAD 2026. Su trabajo explora cómo aplicar estadística y ciencia de datos a preguntas de salud pública, con atención a la trazabilidad de las fuentes y a la comunicación comprensible de los supuestos.

Manuela también desarrolla **NDStats Analytics** junto con Clara Ibáñez Valenzuela. NDStats trabaja en una plataforma de análisis estadístico de biomarcadores clínicos orientada al estudio de déficits nutricionales y a aplicaciones de nutrición de precisión, incluidas las relacionadas con cáncer de mama. Es una iniciativa independiente de CRABI.

- [NDStats Analytics](https://ndstatsanalytics.com/)
- [Perfil de Manuela Ibáñez](https://www.linkedin.com/in/manuela-ib%C3%A1%C3%B1ez-78a58a285/)
- [Citación de CRABI](CITATION.cff)

## Estado de desarrollo

Esta carpeta corresponde a una selección local de trabajo, con corte documental del **22 de noviembre de 2026**. En esta versión se reúnen el simulador demográfico, la vista territorial, sus datos, análisis y documentación; el proyecto continúa evolucionando hacia la herramienta de exploración y planificación descrita arriba. La revisión de fuentes, permisos y licencia, junto con la evaluación científica y operativa, acompañará las siguientes etapas.
