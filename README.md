# CRABI v0.4 — candidata de distribución

**Laboratorio de simulación epidemiológica**  
**Autora y titular declarada de los componentes originales:** Manuela Ibáñez  
**Estado:** candidata local para revisión; no publicada ni autorizada todavía para distribución pública.

CRABI es un prototipo de investigación para explorar magnitudes demográficas, reglas territoriales documentadas, escenarios contrafactuales e inferencias de un modelo estadístico entrenado con simulaciones sintéticas. No es una herramienta clínica ni una validación externa de programas sanitarios.

## Abrir la aplicación

Abre el archivo index.html en una versión actual de Edge, Chrome o Firefox. La aplicación usa HTML, CSS, JavaScript y datos locales incluidos en esta carpeta. No necesita un servidor, API, biblioteca externa ni conexión para ejecutar los cuatro módulos. Los enlaces a fuentes institucionales necesitan Internet si se siguen.

Consulta [RUNNING.md](RUNNING.md) para instrucciones de ejecución y comprobación.

## Módulos

1. Modelización poblacional.
2. Análisis territorial.
3. Simulación contrafactual.
4. Laboratorio de inteligencia artificial.

La guía divulgativa independiente se abre desde el botón de la cabecera. Es una pieza de lectura con resultados estáticos aprobados para el caso; no constituye una quinta pestaña ni vuelve a calcular escenarios.

## Datos, límites y atribución

- La base demográfica principal corresponde a mujeres residentes por edad simple y territorio en la ECP del INE, con referencia 1 de octubre de 2026 y carácter provisional.
- El dato censal municipal de la Comunidad de Madrid, referencia 1 de enero de 2025, aparece solo como contexto independiente. No se mezcla en los cálculos con la ECP.
- Los rangos territoriales son resúmenes con enlaces y fecha de corte; no determinan elegibilidad individual.
- Las invitaciones, participación, actividad, capacidad y recuperaciones contrafactuales son supuestos explícitos, no observaciones ni pronósticos.
- El Random Forest v0.2 aproxima resultados de escenarios sintéticos. Cada propuesta debe verificarse con el motor exacto. No predice demanda, beneficio, diagnóstico ni resultados clínicos.
- Véanse [atribuciones y transformaciones](ATTRIBUTIONS.md), [avisos de terceros](THIRD_PARTY_NOTICES.md) y [límites de la licencia](LICENSE_SCOPE.md).

## Licencia y alcance

El archivo [LICENSE](LICENSE) ofrece MIT únicamente para los componentes originales incluidos en [LICENSE_SCOPE.md](LICENSE_SCOPE.md). Los datos, las imágenes artísticas de cabecera, la guía narrativa y otros contenidos de terceros conservan sus condiciones respectivas.

**No se autoriza con este paquete la publicación en GitHub, el alojamiento público ni una entrega a DATAMAD.** La aprobación de la licencia para componentes originales no equivale a aprobación del acto o destino de publicación. Revise el dictamen interno y obtenga autorización expresa antes de distribuir.

## Composición visual

## Imágenes artísticas de cabecera

La autora, Manuela Ibáñez, declara disponer de permiso para utilizar las cuatro imágenes de cabecera y que proceden de recursos abiertos. No se asigna a estas imágenes una licencia MIT ni se inventa una licencia concreta. En la documentación revisada aún faltan la fuente individual de cada recurso, su licencia o términos aplicables, los requisitos de atribución y las condiciones explícitas de redistribución. Véase [ATTRIBUTIONS.md](ATTRIBUTIONS.md).

## Cita

Véase [CITATION.cff](CITATION.cff). El INE y la Comunidad de Madrid no avalan, certifican ni supervisan CRABI.


