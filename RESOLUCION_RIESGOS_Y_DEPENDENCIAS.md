# Resolución de riesgos y dependencias de CRABI

**Corte de revisión:** 22 de noviembre de 2026  
**Rama:** `audit/integral-crabi-2026-11`  
**Alcance:** los siete riesgos de datos, operación, revisión, interfaz y causalidad del encargo. Estado local; no se ha publicado ni subido la rama.

## Resumen de decisiones

| N.º | Riesgo/dependencia | Estado | Resolución concreta |
|---:|---|---|---|
| 1 | Fuente Red 2023 V2 y permisos | **BLOQUEADO POR DATOS/PERMISOS** | Identificada la versión exacta; retirado el CSV derivado y las tasas de la interfaz. No hay evidencia pública suficiente de permiso para redistribuir tabla extraída. |
| 2 | Denominador ECP más reciente | **PARCIALMENTE RESUELTO** | Descargada tabla INE 59238 y agregadas mujeres de 45–49, 50–69 y 70–74 por 19 territorios al 1/10/2026; las residentes no sustituyen la lista elegible. |
| 3 | Reglas reales territoriales | **BLOQUEADO POR DATOS/PERMISOS** | El informe estatal publica resultados agregados sin asignar cada regla a una comunidad. Se añadió una plantilla sin valores inventados. |
| 4 | Capacidad frente a actividad | **PARCIALMENTE RESUELTO** | Incorporada evidencia nacional de infraestructura y actividad; no existe máximo de agenda comparable por territorio, así que no se convierte throughput en capacidad disponible. |
| 5 | Revisión experta | **PENDIENTE DE VALIDACIÓN EXTERNA** | Preparado protocolo, ficha reproducible y matriz; no se contactó a especialistas ni se atribuyen aprobaciones. |
| 6 | Interfaz y accesibilidad | **PARCIALMENTE RESUELTO** | Añadidas pruebas automatizadas estáticas/DOM, revisión de etiquetas, avisos, foco y responsive CSS. La ejecución de navegador headless falló en este entorno; faltan pruebas reales visuales/AT. |
| 7 | Viabilidad causal | **PARCIALMENTE RESUELTO** | Evaluación documentada: el material actual solo sostiene descripción y escenarios. La inferencia causal queda bloqueada hasta obtener cohortes, exposición y resultados con permisos y un comparador defendible. |

## 1. Red 2023 V2: versión y derechos

La página oficial identifica *Programas de Cribado de Cáncer de Mama de España. Resultados 2023 actualización noviembre 2025 V2*, actualizado el 20/11/2025. Esto confirma la versión bibliográfica que debe consultarse, pero no confirma que el extracto CSV local coincidiera con V2 ni que la Red autorice redistribuir esa extracción.

Se eliminó `demo/data/participation_red_2023_50-69.csv`; `demo/data/build_demo_data.py` y `demo/data.js` ya no leen ni contienen las tasas; la demo ofrece 60% solo como supuesto manual editable y declara el motivo. No conservar el CSV en un paquete de entrega. El árbol de trabajo y la historia entregable están limpios de ese archivo: la rama se compactó sobre `origin/main` en el commit actual, sin el commit previo que lo había añadido.

Fuentes: [ficha oficial de resultados 2023](https://cribadocancer.es/download/programas-de-cribado-de-cancer-de-mama-de-espana-resultados-2023/) y [indicadores de cribado de mama](https://cribadocancer.es/indicadores-cancer-de-mama/). Para cerrar el permiso hace falta una licencia expresa o respuesta institucional; no se infiere permiso por disponibilidad para descarga.

## 2. Población INE y revisiones

Se tomó la descarga tabular completa de [INE ECP, tabla 59238](https://www.ine.es/jaxiT3/files/t/csv_bd/59238.csv), con selección de mujeres, edad simple y territorio, descargada el 22/11/2026. El extracto retenido contiene edades 40–79 para enero, julio y octubre de 2026. SHA-256 de la descarga completa: `584ca7ac1af5620e04d39452022a7d62350ad1147f536e7d8fb589208ec98bf6`. El generador comprueba 30 edades por territorio, códigos esperados, unicidad y conciliación de las 19 comunidades/ciudades con el total nacional.

| Corte provisional | 45–49 | 50–69 | 70–74 | Total 45–74 |
|---|---:|---:|---:|---:|
| 1 enero 2026 | 2.019.841 | 7.183.993 | 1.268.900 | 10.472.734 |
| 1 julio 2026, valor revisado en descarga actual | 2.003.057 | 7.253.522 | 1.286.059 | 10.542.638 |
| 1 octubre 2026 | 1.995.218 | 7.289.348 | 1.295.065 | 10.579.631 |

De julio a octubre, 50–69 aumenta 35.826 (+0,494%) y el total 45–74 aumenta 36.993 (+0,351%). La anterior instantánea de julio versionada en el repositorio era 2.002.737 / 7.253.031 / 1.286.112; comparada con la descarga actualmente revisada, las diferencias son −7.519 / +491 / −53 respectivamente. Por ello se conserva enero y julio actualizados para que la revisión provisional no se confunda con cambio demográfico entre fechas. El corte de octubre es el denominador residente por defecto del demo.

Artefactos: `demo/data/ine_ecp_2026_mujeres_40_79_edad.csv`, `population_2026-01.csv`, `population_2026-07.csv`, `population_2026-10.csv`, `build_population_snapshot.py`, `build_demo_data.py` y `demo/data.js`. La extracción es por edad simple residente, no elegibilidad, invitaciones, rondas ni personas únicas aptas.

## 3. Reglas y elegibilidad territoriales

El [informe estatal de situación 2025](https://www.sanidad.gob.es/areas/promocionPrevencion/cribado/cribadoCancer/cancerMama/docs/informeDeSituacionCribadoCancerMama_2025.pdf) confirma heterogeneidad. La mayoría responde edades alrededor de 50–69; otras declaran ampliaciones o fases diferentes. La periodicidad más frecuente es bienal (17/19 respuestas), con excepciones declaradas. Entre 18 sistemas con información de exclusiones, las categorías y frecuencias publicadas incluyen mastectomía bilateral (11/18), diagnóstico previo de cáncer de mama (15/18), alto riesgo (5/18), mamografía reciente adecuada (5/18) y situación temporal/limitación de movilidad (7/18); el informe no permite asignar esas categorías a cada comunidad en su tabla estatal.

El informe indica que 16 CCAA identifican población diana mediante TSI. No publica una serie territorial homologada de mujeres elegibles, invitaciones emitidas, aceptaciones, exclusiones y cohortes. El [proyecto estatal de ampliación a 45–74](https://www.sanidad.gob.es/gabinete/notasPrensa.do?id=6990) se anunció con despliegue gradual, por lo que el selector 45–74 del prototipo continúa siendo un escenario de cobertura plena hipotética.

Se creó `demo/data/reglas_territoriales_plantilla.csv` con campos para reglas, exclusiones, denominadores, actividad y vigencia, sin rellenar valores que la publicación no atribuye. La siguiente fuente necesaria son fichas técnicas/documentación anual oficial de cada programa o extracción agregada armonizada autorizada. No se calculan elegibles aplicando porcentajes a residentes.

## 4. Capacidad y actividad observada

El informe estatal 2025 recoge 296 centros y 309 mamógrafos operativos entre 18 respuestas; la actividad anual media ponderada fue 6.901,13 mamografías por mamógrafo entre 13 respuestas. Sobre suficiencia de infraestructura, 10/18 declararon que cubría completamente la necesidad, 7/18 parcialmente y 1/18 insuficientemente. Son respuestas con denominadores distintos y autodeclaradas. La actividad realizada mide producción histórica, no capacidad máxima, disponibilidad de agenda, personal, turnos, derivaciones, capacidad diagnóstica o cupo marginal.

Se conserva el límite editable de la demo únicamente como umbral hipotético por periodo. No se introduce un valor límite basado en la actividad anual. Para estimar capacidad harían falta agendas/cupos ofertados y usados por centro y periodo, disponibilidad de equipos y personal, mantenimiento, tasa de repetición/diagnóstico, referencias, esperas y una definición explícita de capacidad sostenible. Fuente: [informe estatal 2025](https://www.sanidad.gob.es/areas/promocionPrevencion/cribado/cribadoCancer/cancerMama/docs/informeDeSituacionCribadoCancerMama_2025.pdf).

## 5. Paquete para revisión experta

Se prepararon tres artefactos en `revision_externa/`: `PROTOCOLO_REVISION_EXPERTA.md` (alcance, criterios y procedimiento), `FICHA_REVISION.md` (dictamen reproducible por pregunta) y `MATRIZ_RIESGOS_METODOLOGICOS.csv` (riesgo, evidencia, impacto, control y decisión). Están en blanco para dictamen; no se solicitó ni se simula una revisión externa. La validación requerida incluye programa de cribado, epidemiología/estadística y planificación sanitaria.

## 6. Interfaz, accesibilidad y navegador

Se añadieron `tests/interface-static-audit.test.cjs` con verificaciones automatizadas de idioma, viewport, etiquetas, identificadores, foco visible, mensajes de estado, tablas, responsive rules y campos requeridos. Se añadió foco de teclado explícito al módulo contrafactual. Se ejecutaron suites Node y Python; los resultados finales se registran tras el último pase.

La prueba headless de Chrome no produjo DOM ni salida y el proceso terminó con estado Windows `0x80000003 (STATUS_BREAKPOINT)`, incluso con perfil temporal. Esto indica que el navegador no arrancó en este runner; no demuestra un defecto de la página. Por autonomía/no interferencia no se abrió ventana gráfica. Siguen pendientes verificación de render en Chromium/Firefox/Safari y tecnologías de asistencia (NVDA/VoiceOver), teclado completo, zoom/reflow y contraste medido.

## 7. Viabilidad causal

El contrafactual COVID conserva una diferencia de volúmenes anuales de invitaciones 2018–2020 y escenarios de reparto. No identifica mujeres únicas pendientes ni exposición individual, y ASPB informa recuperación del cronograma al cierre de 2021. La comparación no controla elegibilidad/cohortes, cambios de población, migración, calendario, composición, estacionalidad ni tendencias concurrentes. La microdata PSMAR localizada en Harvard Dataverse requiere solicitud de acceso, y un estudio de cohorte ya publicado analiza efectos del periodo COVID.

Dictamen: **no viable inferencia causal con los artefactos y permisos actuales**; mantener el módulo como análisis descriptivo y sensibilidad hipotética. No ejecutar regresión causal con dos totales anuales. Un futuro protocolo causal requeriría estimando y población elegible definidos antes del análisis, exposición mensual/cohorte, invitaciones, completitud de seguimiento y desenlaces, comparación no expuesta o despliegue escalonado documentado, covariables preespecificadas, pretrends/estacionalidad, controles negativos y evaluación de supuestos. Acceso y aprobación ética/privacidad se resolverían por los custodios de datos antes de recibir datos individuales.

## Trazabilidad y siguiente revisión

Las pruebas de código pueden verificar estructura y aritmética; no validan clínica, política pública ni accesibilidad real. El estado `PENDIENTE DE VALIDACIÓN EXTERNA` permanece hasta que revisores independientes completen las fichas con nombre/rol, conflictos de interés, fecha y justificación. Cualquier cambio en fuentes, denominadores o definición de elegibilidad obliga a regenerar datos y revisar este documento.
