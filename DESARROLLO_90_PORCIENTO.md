# Alcance y estado del prototipo CRABI

**Revisión actualizada:** 22 de noviembre de 2026.

## Corrección del porcentaje previo

La versión anterior asignaba pesos subjetivos a cinco entregables para declarar “90%”. No era un estándar externo ni una medida validada de progreso del proyecto completo; además mezclaba prototipo con revisión y validación. Se retira esa cifra como indicador científico. El nombre histórico de este archivo se conserva para no romper enlaces internos.

## Estado verificable por componente

| Componente | Estado | Evidencia / límite |
|---|---|---|
| Demo demográfica v0.2 | Implementada; revisión metodológica y visual del último corte pendiente | Simulación aritmética editable. Residentes INE 01/07/2026; no identifica elegibles ni calendario local. |
| Motor numérico | Implementado y separado para pruebas | Planes A/B conservan el mismo total; coeficientes de tres periodos son ilustrativos. |
| Datos INE por edad y territorio | Extracción y agregación reproducibles en el repositorio | 19 CCAA/ciudades, sumas por banda contrastadas con los totales nacionales del corte. Datos provisionales. |
| Tasas Red 2023 | 13 tasas observadas importadas, 6 ausencias explícitas | La tasa es de 50–69 y no valida 2026 ni edades 45–49/70–74. |
| Contexto de expansión 45–74 | Documentado con política estatal aprobada como proyecto de implementación gradual | La demo simula rango completo; no la implantación escalonada autonómica. |
| Contrafactual COVID Barcelona | Simulador descriptivo terminado como ejercicio | G=49.640 es una diferencia agregada de invitaciones, no personas pendientes ni un efecto causal. ASPB informa recuperación del calendario en 2021. |
| Revisión externa/operativa | Pendiente | Faltan revisión por especialistas, datos de elegibilidad/capacidad y contraste de calendarios territoriales. |

No se asigna un porcentaje único a estados tan distintos. Un prototipo funcional no implica validez estadística, científica, externa u operativa. Consulta [`AUDITORIA_INTEGRAL_CRABI.md`](AUDITORIA_INTEGRAL_CRABI.md) para hallazgos, correcciones y pruebas.
