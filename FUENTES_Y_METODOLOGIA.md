# Fuentes y metodología

## Fuentes de trabajo

| Fuente | Uso en CRABI | Estado y precauciones |
|---|---|---|
| [INE: Estadística Continua de Población, tabla 59238](https://ine.es/jaxiT3/Tabla.htm?L=0&t=59238) | Población residente por edad, sexo y territorio | La demo usa el corte provisional del 1 de octubre de 2026 y conserva cortes comparables de enero y julio. La descarga CSV oficial se filtra por edad simple, mujeres y CCAA; sumas territoriales concilian con nacional. Residencia no equivale a elegibilidad. Reutilización general CC BY 4.0 con atribución al INE. |
| [INE: proyecciones de población, tabla 36680](https://www.ine.es/jaxiT3/Tabla.htm?L=0&t=36680) | Análisis futuro por comunidad y edad | Fuente identificada; descarga y validación pendientes. Todavía no se usa en el modelo. |
| [Comunidad de Madrid: población censada](https://datos.comunidad.madrid/dataset/poblacion_censada_por_edad_nacionalidad_y_sexo) | Contexto madrileño y contraste territorial | Se ha procesado un corte de 2025 para 179 municipios. No debe confundirse con una proyección futura. |
| [Red de Programas de Cribado de Cáncer](https://cribadocancer.es/indicadores-cancer-de-mama/) | Indicadores históricos de invitación y participación | La ficha oficial identifica la versión V2 de noviembre 2025, actualizada el 20/11/2025. Se retiró el CSV derivado y no se usan esas tasas, porque no se ha verificado autorización de redistribución. |
| [Ministerio de Sanidad: situación de los programas de cribado de mama](https://www.sanidad.gob.es/areas/promocionPrevencion/cribado/cribadoCancer/cancerMama/docs/informeDeSituacionCribadoCancerMama_2025.pdf) | Contexto sobre reglas y organización territorial | La información refleja el momento de cumplimentación del informe y debe contrastarse con cambios posteriores. |
| [Ministerio de Sanidad: proyecto de ampliación comunicado el 23/10/2026](https://www.sanidad.gob.es/gabinete/notasPrensa.do?id=6990) | Contexto del escenario de edad 45–74 | Aprobación del proyecto y despliegue gradual no significan que cada CCAA ya cubra uniformemente todo el rango. La demo modela 45–74 como cobertura completa hipotética, no el calendario administrativo de cada territorio. |
| [ASPB: evaluaciones del programa de Barcelona](https://www.aspb.cat/documents/programa-deteccio-cancer-mama-barcelona/) | Contrafactual exploratorio 2018–2021 | Informes anuales agregados. ASPB informa recuperación del cronograma al cierre de 2021; la diferencia 2018/2020 no se presenta como backlog actual. |
| [Harvard Dataverse: estudio de invitaciones PSMAR 2012–2021](https://doi.org/10.7910/DVN/VVQNWM) | Auditoría de disponibilidad | El archivo de invitaciones figura restringido y requiere solicitar acceso; no se descargó ni se usa en el prototipo. Metadatos de licencia no equivalen a acceso efectivo al archivo. |

Antes de redistribuir archivos o conjuntos de datos se revisarán las condiciones de reutilización de cada fuente. Que falte un dato en un informe no implica que no exista en otro organismo.

## Cómo funciona el primer motor

Parte de una población de referencia y aplica supuestos explícitos sobre proporción invitada, participación y valoraciones adicionales. Compara dos distribuciones de invitaciones en tres periodos, manteniendo el mismo total acumulado por construcción.

El motor actual no incorpora elegibilidad individual, rondas posteriores, cambios de población futuros ni capacidad efectiva. Sus salidas son escenarios aritméticos: **no son estimaciones validadas de demanda futura, esperas ni necesidades presupuestarias**. La proporción de invitación es un supuesto aplicado a residentes, no una proporción oficial de población elegible. El umbral opcional se contrasta con mamografías por periodo de simulación, sin fechas ni capacidad observada.

## Contrafactual COVID de Barcelona

El módulo separado [`contrafactual/`](contrafactual/README.md) compara dos calendarios ilustrativos que distribuyen en dos o cuatro periodos el proxy `97.299 invitaciones (2018) − 47.659 (2020) = 49.640`. La banda 48,4%–52,6% usa participaciones observadas en 2021 y 2020; no es un intervalo de confianza ni se ha validado para una población no invitada. El informe ASPB de 2021 dice que el calendario se recuperó a fin de año. No se afirma backlog actual, efecto causal, ni capacidad, esperas o consecuencias clínicas.

## Calidad y validación

- Los datos deben conservar su fuente, periodo, definición y estado.
- Las comprobaciones del motor incluyen conservación de flujos y valores límite. La verificación estática de interfaz no sustituye pruebas con navegador y tecnologías de asistencia.
- La demo ya no contiene tasas históricas de Red 2023 hasta cerrar autorización de reutilización; el 60% es un supuesto manual.
- El extracto de población INE tiene agregador reproducible y comprueba que las sumas por territorio coinciden con la fila nacional para cada banda.
- La paleta del rediseño se contrasta en pruebas automatizadas de contraste para las combinaciones textuales principales; queda pendiente la comprobación visual final en tamaños y navegadores adicionales.
- El modelo de aprendizaje automático solo se incorporará para uso predictivo si hay series suficientes y supera una evaluación adecuada frente a referencias sencillas.
