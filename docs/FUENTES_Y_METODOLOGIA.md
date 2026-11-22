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
