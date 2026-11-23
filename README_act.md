# Actualización CRABI v0.4: interpretación científica

Incluye la navegación a la interfaz contrafactual experimental y una capa breve de interpretación dinámica para resultados demográficos, territoriales y contrafactuales. La capa usa los resultados calculados por cada módulo.

Depende de `demo/data.js`, `demo/model.js` y `demo/territorial.js` que ya existen en el repositorio destino. No duplica el bundle demográfico.

Pruebas al aplicar sobre el árbol completo: `node --test demo/contrafactual/model.test.cjs tests/contrafactual-selector.test.cjs tests/interpretation.test.cjs`. La capa explica supuestos; no produce inferencia estadística, causal, clínica ni institucional. Licencia y publicación siguen pendientes.
