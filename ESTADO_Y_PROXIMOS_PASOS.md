# Estado y próximos pasos

**Actualización: 21 de noviembre de 2026.**

## Realizado

- Definición del problema y diseño de la investigación.
- Procesamiento preliminar de población por edad y territorio.
- Primera demo v0.1 reemplazada en la carpeta local del repositorio por la demo v0.2; el README principal ya describe la versión actual.
- La v0.2 compara rangos 50–69 y 45–74, supuestos de participación y un límite anual hipotético. Es exploratoria y no está validada para decisiones sanitarias.
- Comprobaciones del motor y de parte de la transcripción de indicadores de 2023.
- Experimento exploratorio de regresión sobre diez territorios con datos de 2021 y 2023, separado de la demo y sin validación temporal futura.
- Contrafactual retrospectivo COVID convertido en un simulador separado: proxy de diferencia agregada Barcelona 2018/2020 (49.640 invitaciones), ritmos hipotéticos de 2 y 4 periodos y banda de sensibilidad derivada de participación observada 2020/2021.
- Documentación metodológica corregida para reflejar que ASPB declaró recuperado el cronograma a finales de 2021; no se denomina la brecha “backlog”. El microdato PSMAR localizado requiere solicitud de acceso y no se utiliza.
- Barra de progreso verificable del prototipo: 90% del alcance de investigación/prototipo documentado en [`DESARROLLO_90_PORCIENTO.md`](DESARROLLO_90_PORCIENTO.md). El 10% de ese alcance queda para revisión del nuevo módulo; validación operativa es una dependencia externa fuera del alcance porcentual.

## Pendiente

- Descargar y contrastar las proyecciones de población del INE.
- Ampliar y revisar el histórico de participación y su comparabilidad territorial.
- Contrastar reglas, cohortes, rondas y fecha efectiva de invitación.
- Evaluar el modelo de IA frente a referencias simples con cortes temporales y datos suficientes.
- Revisar los cambios en GitHub Desktop y, cuando estén aprobados, hacer commit y push para actualizar el repositorio remoto.
- Obtener revisión experta de la utilidad y las limitaciones del prototipo.
- Revisión visual del nuevo [`simulador contrafactual`](contrafactual/index.html); la demo demográfica v0.2 se conserva separada.
- No interpretar la diferencia 2018/2020 como población pendiente. Para modelar pendientes reales se necesitan registros administrativos por cohorte/fecha y reglas de elegibilidad.

## Lo que no se ha demostrado

Todavía no se han estimado tiempos de espera, costes reales, casos de cáncer evitados ni capacidad hospitalaria disponible. Las cifras de escenarios no deben interpretarse como predicciones o recomendaciones clínicas.
