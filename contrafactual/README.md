# Contrafactual COVID — documentación del módulo

**Estado:** prototipo funcional para revisión · **Actualizado:** 22/11/2026

## Pregunta

Si se distribuyera en Barcelona el volumen equivalente a la brecha agregada de invitaciones entre 2018 y 2020, ¿cómo cambiarían el pico aritmético de mamografías y el número de periodos con dos calendarios hipotéticos?

## Datos y estimando

ASPB informa 97.299 invitaciones en 2018 y 47.659 en 2020, para el conjunto de ABS comparables descrito en su informe de 2020. Se define `G = 97.299 − 47.659 = 49.640`. G solo mide una diferencia entre dos volúmenes anuales. No cuenta mujeres únicas pendientes, y no debe trasladarse a la actualidad: ASPB informa que recuperó el calendario al cierre de 2021.

Los planes mantienen el mismo total: A reparte G en cuatro periodos iguales (25% por periodo); B lo reparte en dos (50% por periodo). La banda de participación de 48,4%–52,6% toma los valores observados por ASPB en 2021 y 2020, respectivamente. Para cada periodo, mamografías esperadas = invitaciones × participación elegida. No es un intervalo de confianza ni una estimación de respuesta de mujeres no invitadas.

Con los valores publicados, A asigna 12.410 invitaciones por periodo y B 24.820 por periodo; B tiene un pico hipotético mayor en 12.410 invitaciones y termina dos periodos antes. El volumen de pruebas acumulado bajo una misma tasa es igual por construcción. No se elige un plan ganador.

## Fuentes primarias

- [ASPB, evaluación 2020](https://www.aspb.cat/wp-content/uploads/2022/04/ASPB-programa-deteccio-cancer-mama-barcelona-2020.pdf): valores 2018/2020, ABS comparables e interrupción.
- [ASPB, evaluación 2021](https://www.aspb.cat/wp-content/uploads/2023/05/ASPB-programa-deteccio-cancer-mama-barcelona_2021_230504.pdf): 139.222 invitaciones, participación 48,4%, 51 ABS realizados frente a 35 previstos y recuperación del calendario a final del año.
- [ASPB, evaluaciones anuales](https://www.aspb.cat/documents/programa-deteccio-cancer-mama-barcelona/): contexto. La tabla de 2022 localizada corresponde a cuatro distritos, no se mezcla con una serie ciudad completa.
- [Harvard Dataverse, estudio de invitaciones PSMAR 2012–2021](https://doi.org/10.7910/DVN/VVQNWM): el archivo de invitaciones aparece restringido / requiere solicitud de acceso. No se descargó ni se emplea.
- [Estudio de cohorte PSMAR publicado en eLife](https://elifesciences.org/articles/77434): ya evalúa cambios asociados al periodo COVID. CRABI no reclamará volver a identificar ese efecto como novedad.

Los valores transcritos, alcance por año y notas de comparabilidad están en [`observaciones_barcelona_contrafactual_2018_2024.csv`](observaciones_barcelona_contrafactual_2018_2024.csv). El diseño estadístico ampliado está en [`DISEÑO_CONTRAFACTUAL_COVID_CRABI.md`](DISEÑO_CONTRAFACTUAL_COVID_CRABI.md).

## Supuestos y exclusiones

- La comparación 2018/2020 no ajusta población, elegibilidad, migración, exclusiones, calendario por cohorte ni otros cambios concurrentes.
- Los periodos y pesos son decisiones ilustrativas. No modelan calendario oficial ni límites reales de capacidad.
- La interfaz valida campos vacíos/inválidos y no intercambia silenciosamente una banda de participación invertida. Si los valores producen una diferencia negativa, indica que la brecha positiva se fija en cero. Las invitaciones repartidas usan enteros con resto asignado al inicio, de modo que el total visible se conserva exactamente.
- No estima colas, tiempo de espera, pérdidas de seguimiento, pruebas diagnósticas, cánceres, costes, mortalidad o causalidad.
- Barcelona no calibra directamente la demo de Madrid ni el conjunto de España.

## Abrir

Abre `index.html` en un navegador moderno. Los campos permiten sensibilidad exploratoria; los valores por defecto reproducen el cálculo publicado. No necesita servidor ni librerías externas.


