# Demo demográfica CRABI v0.2

Abre `index.html` en un navegador moderno. Mantén juntos `index.html`, `model.js` y `data.js`.

El motor multiplica población residente por una fracción hipotética invitada, participación supuesta y seguimiento supuesto. Distribuye los mismos totales entre tres periodos ilustrativos (A 25/35/40%; B 50/35/15%). Los periodos no son fechas ni rondas oficiales. El umbral por periodo lo elige quien usa la demo y no representa capacidad.

La base de edad compara mujeres residentes 50–69 con el escenario hipotético 45–74. La tarjeta territorial usa únicamente `edad_min_escenario` y `edad_max_escenario`; las edades anunciadas no se convierten en reglas vigentes. Cuatro territorios quedan bloqueados por falta de confirmación temporal suficiente. Illes Balears se calcula con el 45–74 declarado como actual en octubre de 2026, pero se presenta la incertidumbre sobre cohortes y periodicidad. No simula elegibilidad real, exclusiones, invitaciones individuales ni calendarios. Consulta [`../VALIDACION_TERRITORIAL_CRABI.md`](../VALIDACION_TERRITORIAL_CRABI.md), [`../INVESTIGACION_TERRITORIAL_CRIBADO_ESPANA.md`](../INVESTIGACION_TERRITORIAL_CRIBADO_ESPANA.md) y [`../datos_territoriales/`](../datos_territoriales/); fuentes demográficas, en [`data/README.md`](data/README.md).

La demo no contiene tasas Red 2023. No se incluyen el módulo COVID ni datos ASPB en esta distribución segura. El prototipo no estima demanda efectiva, esperas, resultados clínicos, costes ni causalidad.
