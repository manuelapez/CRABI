# Diseño del contrafactual de recuperación COVID — CRABI

**Versión de diseño:** 1.0 · **Fecha:** 21/11/2026  
**Tipo:** análisis descriptivo y simulación de planificación; no evaluación causal.

## 1. Pregunta y alcance

**Pregunta:** para un volumen hipotético de invitaciones equivalente a la brecha agregada observada en Barcelona en 2020 frente a la referencia pre-COVID del mismo conjunto de áreas básicas de salud (ABS), ¿cómo cambian el pico de invitaciones, las mamografías esperadas y el número de periodos de recuperación si se reparte de forma gradual o concentrada?

Este diseño separa tres piezas que no deben confundirse:

1. **Observación:** ASPB informó 97.299 invitaciones en 2018 y 47.659 en 2020, con participación de 54,2% y 52,6%, respectivamente. La memoria de 2020 compara los mismos ABS en un programa bienal y explica que se invitó aproximadamente a la mitad de las mujeres previstas.
2. **Hecho posterior observado:** en 2021 se hicieron 139.222 invitaciones y participaron 67.418 mujeres (48,4%); la actividad cubrió 51 ABS frente a 35 previstas en el cronograma ordinario. ASPB informa que se recuperó el cronograma a finales de 2021.
3. **Contrafactual condicionado:** usar la diferencia `97.299 − 47.659 = 49.640` como **proxy de actividad no realizada respecto a la referencia**, y preguntar cómo podría distribuirse ese mismo volumen hipotético. No se denomina lista real de mujeres pendientes ni backlog confirmado. El calendario ya se había recuperado en 2021 según ASPB.

La investigación publicada sobre datos del programa de Parc de Salut Mar ya evaluó cambios en indicadores durante COVID mediante un estudio antes-después con 144.779 invitaciones y cuatro rondas pre-COVID. CRABI no reclamará como novedad volver a estimar el efecto de la pandemia; su aportación es un comparador de ritmos de recuperación con datos agregados públicamente trazables, exposición explícita de supuestos y lectura de compensaciones de planificación.

## 2. Fuentes y acceso

- ASPB, evaluación de 2020: incluye recuentos 2018/2020 para áreas coincidentes, interrupción, participación y cobertura mínima. [PDF](https://www.aspb.cat/wp-content/uploads/2022/04/ASPB-programa-deteccio-cancer-mama-barcelona-2020.pdf)
- ASPB, evaluación de 2019: recuentos ciudad agregados. [PDF](https://www.aspb.cat/wp-content/uploads/2021/09/ASPB-avaluacio-PDPCM-2019.pdf)
- ASPB, evaluación de 2021: cronograma de recuperación, 51 ABS en vez de 35 y volumen de invitaciones/participación. [PDF](https://www.aspb.cat/wp-content/uploads/2023/05/ASPB-programa-deteccio-cancer-mama-barcelona_2021_230504.pdf)
- ASPB, evaluación de 2022: la tabla localizada cubre cuatro distritos que cierran ronda, no toda la ciudad; se registra, pero se excluye de la tendencia ciudad completa. [PDF](https://www.aspb.cat/wp-content/uploads/2024/02/ASPB-programa-deteccio-cancer-mama-barcelona_2022-240216.pdf)
- ASPB, evaluación de 2023: informa participación global de 50,4%; recuentos no añadidos a la serie sin una tabla de alcance compatible. [PDF](https://www.aspb.cat/wp-content/uploads/2025/02/ASPB-programa-deteccio-cancer-mama-barcelona_2023.pdf)
- ASPB, evaluación de 2024: recuentos ciudad agregados y cobertura mínima. [PDF](https://www.aspb.cat/wp-content/uploads/2026/03/ASPB-programa-deteccio-cancer-mama-barcelona_2024.pdf)
- Dataset de invitaciones PSMAR 2012–2021 en Harvard Dataverse: metadatos CC0, pero el archivo de invitaciones figura como acceso restringido/solicitud de acceso. No se descargó ni se usa. [Ficha del dataset](https://doi.org/10.7910/DVN/VVQNWM)
- Estudio de cohorte publicado sobre pandemia en PSMAR: [eLife](https://elifesciences.org/articles/77434).

Los valores agregados transcritos y el alcance de cada observación están en `observaciones_barcelona_contrafactual_2018_2024.csv`. Los documentos son informes públicos; atribuir ASPB y no redistribuir sus PDF dentro del repositorio.

## 3. Estimando y fórmulas

### Brecha de referencia

`G = I_2018 − I_2020 = 97.299 − 47.659 = 49.640 invitaciones`

`G` es una brecha entre dos volúmenes reportados. No identifica a 49.640 mujeres únicas, elegibles o todavía pendientes en 2021. La evidencia dice que el calendario volvió a su cronograma en 2021.

### Planes a comparar

Para mantener igual el volumen total y hacer visible el coste temporal:

- **A · recuperación gradual:** 4 periodos con pesos `[25%, 25%, 25%, 25%]`.
- **B · recuperación concentrada:** 2 periodos con pesos `[50%, 50%]` y cero invitaciones adicionales en los periodos 3–4.

Para cada plan `j` y periodo `t`:

`Invitaciones(j,t) = G × peso(j,t)`

`Mamografías esperadas(j,t,p) = Invitaciones(j,t) × p`

La sensibilidad de participación usa `p=48,4%` a `52,6%`, extremos observados en los informes ASPB 2021 y 2020. Es una **banda de escenarios basada en dos observaciones**, no intervalo de confianza ni pronóstico de respuesta de mujeres pendientes.

### Resultados principales

Se informan:

1. invitaciones y mamografías esperadas por periodo;
2. pico por periodo;
3. periodos hasta asignar el volumen total;
4. diferencia de picos entre planes bajo el mismo `G` y la misma participación.

La brecha completa produciría aproximadamente 24.026–26.111 mamografías aritméticas si toda invitación se resolviera con participación de 48,4–52,6%. Esto no quiere decir que esas mamografías faltaran, que fueran a realizarse posteriormente o que deban sumarse al programa actual.

Con `G=49.640`, el plan A reparte 12.410 invitaciones por periodo y termina en cuatro periodos. El plan B reparte 24.820 por periodo y termina en dos. El pico adicional de B frente a A es 12.410 invitaciones o aproximadamente 6.006–6.528 mamografías hipotéticas por periodo. El acumulado es igual en ambos planes; el modelo no designa un ganador.

## 4. Supuestos, exclusiones y lectura

- La referencia 2018/2020 está pareada por ABS según el informe ASPB, pero no ajusta crecimiento poblacional, exclusiones, cambio socioeconómico, migración, composición de cohortes ni cambios de captación.
- La participación observada entre invitadas fue similar en 2018 y 2020; en 2021 cayó a 48,4%. Aplicar ese intervalo a la brecha es una sensibilidad mecánica, no una transferencia validada a las mujeres no invitadas en 2020.
- Los cuatro periodos y los pesos de los planes son decisiones hipotéticas de diseño. No son calendario oficial. No se introduce un techo de capacidad observado.
- No se estiman cupos disponibles, colas, esperas, pérdidas de seguimiento, pruebas posteriores, cánceres detectados/evitados, costes, mortalidad ni causalidad.
- Actividad anual y ronda bianual no son intercambiables. 2022 solo aporta cuatro distritos que cerraron ronda; no se incorpora a la tendencia de ciudad completa. 2024 reporta cobertura mínima que incluye mamografía fuera del programa; no se equipara a cobertura de invitación.
- Los resultados son de Barcelona y no calibran Madrid ni el resto de España.

## 5. Interpretación del resultado

El resultado válido es una **compensación matemática de planificación**: si una persona responsable decide atender un volumen hipotético `G` en dos periodos en lugar de cuatro, el pico de mamografías esperadas crece de manera proporcional a la tasa de participación elegida y el tiempo de calendario se acorta. No es estimación del efecto de una política pasada o futura.

La decisión “gradual o concentrado” requiere una restricción real verificable (capacidad, objetivo de cobertura o fechas de ronda) y prioridades explícitas. Si esa información no existe, presentar ambos perfiles y dejar la preferencia indeterminada.

## 6. Puertas para una versión posterior

- Mantener este simulador como módulo metodológico separado de la demo demográfica v0.2 hasta una revisión visual de la usuaria.
- Si se obtiene acceso autorizado al archivo de invitaciones PSMAR 2012–2021, verificar variables, licencia/uso, unidad de persona e invitación, y replicar agregados publicados antes de cualquier análisis de microdatos.
- No estimar ni mostrar “backlog real” sin un listado administrativo/registro agregado de población pendiente por cohorte y fecha.
- Una evaluación causal exigiría grupo de comparación o serie larga y supuestos de identificación defendibles. No se declara parte del MVP.

