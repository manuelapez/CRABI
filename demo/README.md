# CRABI — demo demográfica v0.2

**Corte de auditoría:** 22 de noviembre de 2026 · **Estado:** prototipo exploratorio, sin validación clínica u operativa.

## Abrir y ejecutar

Abre `index.html` en un navegador moderno. No necesita servidor ni conexión. Para conservar datos y comportamiento, mantén juntos `index.html`, `model.js` y `data.js`. El conjunto de datos fuente, agregados, generadores y atribución están en [`data/`](data/README.md).

## Qué calcula

Para una población residente congelada `P`, fracción supuesta de invitación `f`, tasa supuesta de participación `s` y proporción supuesta de valoraciones posteriores `d`:

- Invitaciones hipotéticas = `P × f`.
- Mamografías aritméticas esperadas = `P × f × s`.
- Valoraciones posteriores hipotéticas = `P × f × s × d`.

Los planes distribuyen un total idéntico en tres periodos: A = 25/35/40% y B = 50/35/15%. Los periodos no tienen fechas y no representan rondas bienales oficiales. El umbral opcional se aplica a mamografías por periodo, no a un año observado, y no representa capacidad sanitaria.

## Población y edad

La base por defecto compara 50–69 con un escenario que suma edades 45–49, 50–69 y 70–74. Los conteos se agregaron desde mujeres residentes de la tabla oficial INE 59238 al **1 de octubre de 2026** y son provisionales. El mismo corte por edad, sexo y CCAA se agrega para todas las bandas; no se combinan periodos distintos. La instantánea de enero y julio también se conserva para medir la revisión de los datos provisionales.

El Ministerio comunicó el 23 de octubre de 2026 la aprobación del proyecto de orden que amplía la cartera común a 45–74, con despliegue progresivo, calendario y fases territoriales. Esta demo modela el rango completo desde el principio; no representa la norma ya implantada de forma uniforme ni la planificación real de ninguna comunidad. [Comunicado del Ministerio](https://www.sanidad.gob.es/gabinete/notasPrensa.do?id=6990).

La población residente no es un registro de población elegible. El modelo no contiene exclusiones clínicas, antecedentes, invitaciones ya enviadas, cohortes que entren/salgan, ni acceso individual.

## Participación y supuestos

La Red publica el informe *Programas de Cribado de Cáncer de Mama de España. Resultados 2023, actualización noviembre 2025 V2* (última actualización indicada: 20/11/2025). Las condiciones para redistribuir la tabla derivada no se han verificado; por ello, se retiró del repositorio el CSV y la demo no usa esas tasas. Ofrece 60% como supuesto manual, no como dato imputado. En el rango 45–74 se aplica una tasa común solo como hipótesis no validada. El valor de Madrid 2025 es contexto regional de censo municipal y no se combina con INE 2026.

Los resultados son valores esperados aritméticos, por eso se redondean al mostrar. Los rangos de sensibilidad son escenarios condicionados a tasas seleccionadas, no intervalos probabilísticos ni de confianza.

## Fuentes y límites

- [INE ECP, tabla 59238](https://www.ine.es/jaxiT3/Tabla.htm?L=0&t=59238) y [ECP 1/10/2026](https://www.ine.es/dyngs/Prensa/ECP3T26.htm): población residente provisional por edad, sexo y territorio.
- [Red de Programas de Cribado, resultados 2023 V2](https://cribadocancer.es/download/programas-de-cribado-de-cancer-de-mama-de-espana-resultados-2023/): fuente identificada, pero la autorización para redistribuir la tabla derivada no está verificada; las tasas no se incluyen en el producto.
- [Comunidad de Madrid, población censada](https://datos.comunidad.madrid/dataset/poblacion_censada_por_edad_nacionalidad_y_sexo): contexto 2025 agregado desde 179 municipios.
- [Ministerio de Sanidad, proyecto 45–74](https://www.sanidad.gob.es/gabinete/notasPrensa.do?id=6990): proyecto con implantación progresiva, sin modelar fechas locales.

No se estiman capacidad, colas, esperas, costes, cánceres detectados/evitados, mortalidad ni efectos causales. La línea de IA no está integrada; el experimento previo no superó la referencia sencilla y no fue validación temporal.

## Pruebas

Desde la raíz del repositorio: `node --test tests/demo-model.test.cjs` y `python -m unittest discover -s tests -v`. Las comprobaciones técnicas no sustituyen revisión científica profesional, revisión con usuarias ni evaluación operativa.
