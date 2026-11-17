# CRABI — primera demo (v0.1)

Esta es la **primera demo preliminar** de CRABI. Es una herramienta exploratoria y todavía no está validada para la toma de decisiones sanitarias.

## Cómo abrirla

Descarga `index.html` y ábrelo con Chrome, Edge o Firefox. Funciona directamente en el navegador, sin instalar nada ni conectarse a un servidor. La visualización del código de GitHub no ejecuta el HTML; para verlo como página hay que abrir el archivo descargado o configurar un alojamiento web.

## Qué permite hacer

Seleccionar una de las 17 comunidades o dos ciudades autónomas, modificar supuestos de invitación, participación y valoraciones adicionales, y comparar dos distribuciones hipotéticas de la actividad durante tres periodos.

## Datos y advertencias

- Población: [INE, Estadística Continua de Población, tabla 59238](https://ine.es/jaxiT3/Tabla.htm?L=0&t=59238); mujeres residentes de 50–69 años al 1 de enero de 2026, datos provisionales, transformados y agregados por territorio.
- Participación: [Red de Programas de Cribado de Cáncer, resultados 2023](https://cribadocancer.es/indicadores-cancer-de-mama/), tabla 2.3; tasas de 13 territorios utilizadas como supuestos, no como predicciones. Fuente: Red de Programas de Cribado de Cáncer, *Programas de Cribado de Cáncer de Mama. Informe de evaluación 2023* (datos: mayo de 2025). Los demás territorios usan un valor manual ilustrativo.
- Contexto de Madrid: [Comunidad de Madrid, población censada por edad, nacionalidad y sexo](https://datos.comunidad.madrid/dataset/poblacion_censada_por_edad_nacionalidad_y_sexo), censo anual municipal 2025. El conjunto indica licencia [Creative Commons Attribution](https://creativecommons.org/licenses/by/4.0/). El valor mostrado es una suma propia de 179 municipios; no se mezcla con la población del INE de 2026.

Los porcentajes de invitación y de valoración posterior son hipótesis modificables. La demo no utiliza proyecciones futuras ni mide elegibilidad, capacidad, esperas, costes o resultados clínicos. Los ritmos comparados son ilustrativos y no son calendarios ni recomendaciones oficiales.

**Inteligencia artificial:** en esta primera demo no se utiliza un modelo de IA. La línea de aprendizaje automático se encuentra en investigación y requiere más datos y validación.

## Versión y pruebas

Primera demo v0.1, preparada el 17 de noviembre de 2026. El motor y los controles han superado pruebas automatizadas de cálculo; sigue pendiente la revisión visual independiente y la validación con profesionales. El HTML contiene el motor y los datos agregados necesarios para su funcionamiento.
