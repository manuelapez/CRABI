# Datos demográficos de la demo

`population_2026-10.csv` contiene el recuento de mujeres residentes por CCAA/ciudad y bandas de edad 45–49, 50–69 y 70–74, al 1 de octubre de 2026. Son datos provisionales de población residente, no registros de elegibilidad ni invitaciones.

## Procedencia y construcción

- Fuente: INE, Estadística Continua de Población (ECP), tabla 59238, *Población residente por fecha, sexo y edad*.
- Cortes incluidos: 1 de enero, 1 de julio y 1 de octubre de 2026. El INE revisa las cifras provisionales. El corte de octubre se obtuvo de la descarga completa de la tabla 59238, seleccionando mujeres, edad simple y los 19 territorios más el total nacional. La descarga usada el 22/11/2026 fue `https://www.ine.es/jaxiT3/files/t/csv_bd/59238.csv` (separador tabulador; SHA-256 `584ca7ac1af5620e04d39452022a7d62350ad1147f536e7d8fb589208ec98bf6`). El archivo reducido conserva edades 40–79 de enero, julio y octubre de 2026.
- `ine_ecp_2026_mujeres_40_79_edad.csv` conserva el extracto oficial reducido de edades 40–79 para enero, julio y octubre de 2026. La tabla original completa no se redistribuye.
- `build_population_snapshot.py` permite reconstruir los tres cortes con `--period 2026-01`, `2026-07` o `2026-10`; agrega 30 edades en las tres bandas. Comprueba unicidad, cobertura y que las sumas territoriales coincidan con el total nacional.
- Valores nacionales de octubre: 1.995.218 residentes de 45–49, 7.289.348 de 50–69 y 1.295.065 de 70–74. El total 45–74 es 10.579.631. Estos agregados no son denominadores de elegibilidad. La actualización respecto del corte revisado de julio es +35.826 en 50–69; la revisión también modificó retrospectivamente julio frente a la instantánea anterior. Para comparaciones exactas consúltese `RESOLUCION_RIESGOS_Y_DEPENDENCIAS.md`.

Fuentes institucionales: [INE ECP, 1 de octubre de 2026](https://www.ine.es/dyngs/Prensa/ECP3T26.htm), [tabla 59238](https://www.ine.es/jaxiT3/Tabla.htm?L=0&t=59238) y [aviso legal del INE](https://www.ine.es/aviso_legal/). La licencia general de los datos estadísticos del INE es CC BY 4.0 salvo indicación en contrario; la extracción atribuye fuente y elaboración. El 1 de octubre de 2026 la población total residente fue 49.935.642 (dato provisional); esa cifra total no sustituye la agregación por edad y sexo.

La [página oficial del informe Red 2023 V2](https://cribadocancer.es/download/programas-de-cribado-de-cancer-de-mama-de-espana-resultados-2023/) identifica la versión de noviembre de 2025, actualizada el 20/11/2025. No consta licencia/autorización explícita de reutilización de la tabla; se retiró el CSV derivado y no se empaquetan tasas. La demo utiliza un supuesto manual editable. `madrid_context_2025_ccaa.csv` conserva el agregado CCAA del censo municipal 2025 para el contexto de Madrid. Consulta [`demo/README.md`](../README.md) para el alcance de los supuestos.

## Reproducción

Desde la raíz del repositorio, ejecuta en orden `python demo/data/build_population_snapshot.py --period 2026-10` y `python demo/data/build_demo_data.py`. El primero escribe `population_2026-10.csv` y falla si no se conservan los totales publicados; el segundo genera `demo/data.js` desde los tres CSV versionados.
