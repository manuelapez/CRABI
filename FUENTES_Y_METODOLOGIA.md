# Fuentes y metodología

## Fuentes de trabajo

| Fuente | Uso en CRABI | Estado y precauciones |
|---|---|---|
| [INE: Estadística Continua de Población, tabla 59238](https://ine.es/jaxiT3/Tabla.htm?L=0&t=59238) | Población por edad, sexo y territorio | La demo local usa el corte provisional del 1 de enero de 2026. Población residente no equivale a población elegible. |
| [INE: proyecciones de población, tabla 36680](https://www.ine.es/jaxiT3/Tabla.htm?L=0&t=36680) | Análisis futuro por comunidad y edad | Fuente identificada; descarga y validación pendientes. Todavía no se usa en el modelo. |
| [Comunidad de Madrid: población censada](https://datos.comunidad.madrid/dataset/poblacion_censada_por_edad_nacionalidad_y_sexo) | Contexto madrileño y contraste territorial | Se ha procesado un corte de 2025 para 179 municipios. No debe confundirse con una proyección futura. |
| [Red de Programas de Cribado de Cáncer](https://cribadocancer.es/indicadores-cancer-de-mama/) | Indicadores históricos de invitación y participación | La tabla de 2023 utilizada cubre 50–69 años y contiene datos de 13 territorios. Su uso para otro periodo es un supuesto, no una predicción validada. |
| [Ministerio de Sanidad: situación de los programas de cribado de mama](https://www.sanidad.gob.es/areas/promocionPrevencion/cribado/cribadoCancer/cancerMama/docs/informeDeSituacionCribadoCancerMama_2025.pdf) | Contexto sobre reglas y organización territorial | La información refleja el momento de cumplimentación del informe y debe contrastarse con cambios posteriores. |

Antes de redistribuir archivos o conjuntos de datos se revisarán las condiciones de reutilización de cada fuente. Que falte un dato en un informe no implica que no exista en otro organismo.

## Cómo funciona el primer motor

Parte de una población de referencia y aplica supuestos explícitos sobre proporción invitada, participación y valoraciones adicionales. Compara dos distribuciones de invitaciones en tres periodos, manteniendo el mismo total acumulado por construcción.

El motor actual no incorpora elegibilidad individual, rondas posteriores, cambios de población futuros ni capacidad efectiva. Sus salidas son escenarios aritméticos: **no son estimaciones validadas de demanda futura, esperas ni necesidades presupuestarias**.

## Calidad y validación

- Los datos deben conservar su fuente, periodo, definición y estado.
- Las comprobaciones del motor incluyen conservación de flujos y valores límite.
- Las tasas históricas de 2023 se han contrastado con el texto extraído del informe para las columnas de invitadas y participación total; queda pendiente una revisión visual independiente.
- El modelo de aprendizaje automático solo se incorporará para uso predictivo si hay series suficientes y supera una evaluación adecuada frente a referencias sencillas.
