# Fuentes y metodología de la selección demográfica

## Datos incluidos

| Fuente | Uso | Derechos y límites |
|---|---|---|
| [INE ECP, tabla 59238](https://www.ine.es/jaxiT3/Tabla.htm?L=0&t=59238) | Mujeres residentes por edad simple y territorio; referencia 1/10/2026 provisional, con cortes de enero/julio | Aviso legal INE: CC BY 4.0 general salvo indicación distinta. Atribuir fuente y fecha; residentes no equivale a elegibles. |
| [Comunidad de Madrid, censo anual municipal](https://datos.comunidad.madrid/dataset/poblacion_censada_por_edad_nacionalidad_y_sexo) | Contexto regional agregado 2025 desde 179 municipios | Ficha del dataset indica Creative Commons Atribución 4.0; no se combina con INE 2026. |
| [Ministerio de Sanidad, anuncio de ampliación 45–74](https://www.sanidad.gob.es/gabinete/notasPrensa.do?id=6990) | Contexto de implementación gradual | No se copia el informe; el prototipo presenta 45–74 como escenario hipotético, no como calendario territorial real. |

## Cálculos

Para cada territorio, rango etario y periodo de referencia, la extracción INE se agrega sumando edades simples. La demo calcula `invitadas = residentes × fracción invitada`, `pruebas esperadas = invitadas × participación supuesta`, `seguimiento supuesto = pruebas esperadas × fracción de seguimiento`, y `carga por periodo = pruebas esperadas × peso temporal`. Planes A/B conservan el total por construcción.

Las rejillas varían fracción invitada, participación, peso temporal y umbral definido por la persona usuaria. No son intervalos probabilísticos, tasas observadas ni estimaciones de elegibilidad/capacidad.

## Fuentes deliberadamente no usadas

- **Red de Programas de Cribado, resultados 2023 V2:** la existencia/versión de la fuente se puede consultar en [la ficha oficial](https://cribadocancer.es/download/programas-de-cribado-de-cancer-de-mama-de-espana-resultados-2023/), pero no se dispone de autorización verificada para redistribuir la tabla derivada. No se incluyen sus tasas.
- **ASPB:** la selección no incluye sus informes, transcripciones ni transformaciones; se excluyeron el módulo COVID y los resultados asociados hasta una revisión específica de derechos.
- **Dataverse PSMAR:** no se incluyen microdatos ni materiales restringidos.

El proyecto no estima resultados clínicos, capacidad efectiva, listas de espera o causalidad.

## Reglas territoriales de cribado

La auditoría por territorio y el inventario de fuentes oficiales están en [`../VALIDACION_TERRITORIAL_CRABI.md`](../VALIDACION_TERRITORIAL_CRABI.md), [`../INVESTIGACION_TERRITORIAL_CRIBADO_ESPANA.md`](../INVESTIGACION_TERRITORIAL_CRIBADO_ESPANA.md) y [`../datos_territoriales/reglas_cribado_2026-11.csv`](../datos_territoriales/reglas_cribado_2026-11.csv). La lectura nacional se limita al marco general y a resultados agregados; no se usa para imputar edades o porcentajes a territorios individuales. Cada regla distingue fecha de fuente, vigencia, cohortes, anuncio y rango realmente utilizado.

La tarjeta demográfica suma edades simples del INE de mujeres residentes dentro del rango habilitado en `edad_min_escenario`–`edad_max_escenario`. No consume el rango general de referencia ni las ampliaciones anunciadas. El conteo no es población elegible ni efectivamente invitada. Las exclusiones, invitaciones por cohorte, datos históricos y capacidad no están disponibles de modo comparable; si la vigencia no se confirmó, el panel muestra “Pendiente”. Las tasas de invitación y participación continúan siendo supuestos manuales. Illes Balears se marca con incertidumbre explícita por el desacuerdo entre una nota de octubre de 2026 y la ficha general anterior.

No se redistribuyen documentos oficiales de terceros; se presentan hechos resumidos, atribución y enlaces para consulta. Las reglas deben revisarse con cada servicio de salud antes de usarlas fuera del prototipo. La inclusión de enlaces o de resúmenes no implica licencia open source de CRABI ni autorización para redistribuir otros materiales.
