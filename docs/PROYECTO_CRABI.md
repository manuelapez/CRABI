# CRABI: propósito y alcance del proyecto

## Qué es CRABI

CRABI es un prototipo de investigación y una demo exploratoria sobre planificación de programas de cribado de cáncer de mama en España. Su propósito es hacer visibles, de forma sencilla y reproducible, los supuestos que cambian los volúmenes aritméticos de actividad cuando varían la población considerada, la fracción hipotéticamente invitada, la participación supuesta y el reparto temporal.

El nombre CRABI se utiliza como nombre del proyecto; este documento no propone una expansión del acrónimo.

## El problema que aborda

Planificar un programa requiere pensar en cuántas personas podrían formar parte de una población objetivo y cómo se repartiría la actividad a lo largo del tiempo. Esas cantidades dependen de definiciones y datos que no siempre coinciden: población residente y elegibilidad son conceptos distintos; la participación puede variar; y un calendario hipotético no equivale a la capacidad operativa de un territorio.

CRABI plantea una pregunta acotada: **¿cómo cambian los volúmenes calculados al variar el rango de edad, la proporción de población incluida, la participación supuesta y la distribución temporal?** La herramienta ayuda a explorar esa pregunta y a identificar qué información faltaría para una planificación real.

## En qué consiste el prototipo actual

La demo demográfica v0.2:

- compara los rangos de edad 50–69 y 45–74 como escenarios;
- parte de agregados de población femenina por edad y territorio publicados por el INE, con referencia provisional de octubre de 2026;
- muestra por separado el contexto agregado de población de la Comunidad de Madrid de 2025;
- permite cambiar la fracción hipotéticamente invitada, la participación y el seguimiento adicional supuesto;
- compara dos repartos ilustrativos en tres periodos y permite introducir un umbral matemático elegido por la persona usuaria;
- acompaña los resultados con análisis de sensibilidad, fuentes, atribuciones y pasos de reproducción.

Las fórmulas son aritméticas y los supuestos se exponen para que puedan cambiarse. La [metodología y las fuentes](FUENTES_Y_METODOLOGIA.md) explican el origen, las transformaciones y las limitaciones de los datos; la [guía de reproducción](RESULTADOS_REPRODUCIBLES_DEMOGRAFIA.md) detalla los cálculos.

## Qué no concluye

CRABI no determina quién es elegible o ha sido invitada, no calcula demanda real, listas de espera ni capacidad de los servicios, y no estima efectos causales, beneficios clínicos, diagnósticos o costes. Los resultados son escenarios condicionados a supuestos, no predicciones ni recomendaciones sanitarias. La demo no integra inteligencia artificial ni ofrece una herramienta validada para decisiones clínicas u operativas.

## Alcance del candidato local consolidado

Esta copia de revisión reúne el simulador demográfico, el escenario territorial y la vista descriptiva de indicadores observados. No incluye informes ni transformaciones ASPB/COVID ni los resultados Red 2023 excluidos por derechos pendientes. La licencia del código aún no está aprobada y esta carpeta no es una distribución pública autorizada.

## Origen

El proyecto fue impulsado por Manuela Ibáñez Valenzuela y presentado como prototipo de investigación en DATAMAD 2026. La revisión científica humana y la validación con profesionales y datos operativos siguen siendo pasos pendientes.
