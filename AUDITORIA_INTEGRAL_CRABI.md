# Auditoría integral de CRABI

**Fecha:** 22 de noviembre de 2026  
**Rama:** `audit/integral-crabi-2026-11`  
**Alcance:** revisión de fuentes y supuestos, reproducción de datos, lógica de escenarios, accesibilidad básica, pruebas y documentación del prototipo local.

## Resumen ejecutivo

Se corrigieron problemas verificables en la demo demográfica y en el módulo contrafactual COVID; se separó el motor de simulación de la interfaz y se añadieron datos y generadores reproducibles. Las comprobaciones automatizadas pasan. CRABI sigue siendo un prototipo exploratorio: no es un modelo validado de elegibilidad, demanda efectiva, capacidad sanitaria, espera, resultados clínicos ni impacto causal.

No se asigna un porcentaje global de “desarrollo completado”. El archivo histórico [`DESARROLLO_90_PORCIENTO.md`](DESARROLLO_90_PORCIENTO.md) ahora explica por qué su anterior puntuación ponderada no medía una definición verificable de completitud y deja el estado por componentes.

## Hallazgos y resolución

| Prioridad | Hallazgo | Acción y estado |
|---|---|---|
| Alta | Una puntuación anterior de 90% sumaba pesos subjetivos y podía leerse como validación global. | Se retiró esa afirmación y se documentó el estado y lo pendiente por componente. |
| Alta | La demo comparaba un límite descrito como anual con salidas calculadas por periodo. | Etiqueta y documentación ahora dicen “por periodo”; sigue siendo un supuesto configurable, no capacidad observada. |
| Alta | Residentes INE se podían interpretar como mujeres elegibles/invitables. | UI y metodología delimitan el denominador: residentes por sexo/edad, no registros de elegibilidad ni cohortes del programa. |
| Alta | El contrafactual podía ocultar rangos invertidos, truncar una diferencia negativa sin explicarla y perder unidades al repartir volúmenes no divisibles. | Validación visible de campos/rangos, explicación de brecha no positiva y reparto entero cuyo total se conserva exactamente. |
| Media | La base de población de enero de 2026 estaba desactualizada frente al corte edad×sexo×CCAA localmente comprobable. | Sustituida por 1 de octubre de 2026, derivada de tabla 59238 edad×sexo×CCAA; se conservan cortes comparables de enero y julio. |
| Media | Los datos y el motor estaban embebidos en la página, dificultando su auditoría. | Motor separado en `demo/model.js`, datos generados en `demo/data.js`, CSV de entrada y scripts de construcción incluidos. |
| Media | Algunos textos secundarios tenían contraste insuficiente y los estados del formulario no quedaban anunciados claramente. | Contraste de combinaciones textuales principales reforzado, foco visible y mensajes de estado accesibles; comprobación automatizada, pendiente revisión asistiva/visual. |
| Media | Las observaciones de invitaciones tenían un nombre de campo incorrecto. | Cabecera normalizada a `invitadas_n`; los límites de comparabilidad constan en CSV y README del contrafactual. |

## Revisión de datos y ciencia

### Demografía

La demo agrega mujeres residentes de 45–49, 50–69 y 70–74 por 19 CCAA/ciudades y coteja cada suma con el total nacional. Valores provisionales al 1 de octubre de 2026: 1.995.218, 7.289.348 y 1.295.065. El extracto reducido, script agregador y CSV quedan en `demo/data/`; véase el historial de revisión provisional en `RESOLUCION_RIESGOS_Y_DEPENDENCIAS.md`.

La descarga oficial de tabla 59238 permite derivar el mismo corte de octubre por edad, sexo y CCAA. Los tres cortes comparables están disponibles para reproducir el cambio real y las revisiones provisionales. Referencias: [INE ECP 1/10/2026](https://www.ine.es/dyngs/Prensa/ECP3T26.htm), [tabla 59238](https://www.ine.es/jaxiT3/Tabla.htm?L=0&t=59238).

El rango 45–74 se presenta como escenario de cobertura plena, no como calendario vigente uniforme. El [Ministerio de Sanidad comunicó el 23/10/2026](https://www.sanidad.gob.es/gabinete/notasPrensa.do?id=6990) la aprobación de un proyecto de orden con despliegue territorial gradual. La demo no representa el calendario de implementación por CCAA.

### Participación histórica de Red

La ficha oficial identifica el informe V2 de noviembre de 2025 actualizado el 20/11/2025, pero no ofrece evidencia suficiente de autorización de redistribución del extracto. Se retiró `participation_red_2023_50-69.csv` y todas las tasas del producto; el valor manual inicial es un supuesto. No se incorpora hasta obtener autorización expresa.

### Contrafactual de Barcelona

Se conserva el cálculo descriptivo `97.299 invitaciones (2018) − 47.659 (2020) = 49.640` para el ámbito comparable del informe ASPB. Es una brecha entre volúmenes anuales, no una cuenta de personas pendientes ni un efecto causal. El módulo compara repartir aritméticamente ese volumen en cuatro o dos periodos; no declara un plan ganador. La participación ASPB de 2020/2021 se usa como sensibilidad descriptiva, no como intervalo estadístico ni respuesta de personas no invitadas. ASPB informó recuperación del calendario a final de 2021, por lo que no se describe como atraso actual. Referencias: [ASPB 2020](https://www.aspb.cat/wp-content/uploads/2022/04/ASPB-programa-deteccio-cancer-mama-barcelona-2020.pdf), [ASPB 2021](https://www.aspb.cat/wp-content/uploads/2023/05/ASPB-programa-deteccio-cancer-mama-barcelona_2021_230504.pdf).

Un [estudio de cohorte PSMAR publicado en eLife](https://elifesciences.org/articles/77434) ya analiza cambios asociados al periodo COVID. CRABI no reclama novedad causal. La comparación 2018/2020 no ajusta cambios de población, elegibilidad, migración, calendario por cohorte u otros factores concurrentes.

## Implementación y pruebas

- `demo/data/build_population_snapshot.py` agrega el extracto fuente y comprueba edades, unicidad, territorios y conciliación con nacional.
- `demo/data/build_demo_data.py` genera los objetos de `demo/data.js` desde los CSV versionados.
- `demo/model.js` contiene cálculos desacoplados de la interfaz; la asignación discreta conserva cantidades y las validaciones rechazan supuestos inválidos.
- El módulo COVID comunica rangos inválidos y brechas no positivas, y reparte enteros preservando el total visible.
- Se verificaron etiquetas/IDs, avisos, contraste de paleta y comportamientos límite mediante pruebas de unidad y DOM simulado.

Comandos ejecutados desde la raíz:

```text
node --check demo/model.js
node --check demo/data.js
node --test tests/demo-model.test.cjs tests/contrafactual-ui.test.cjs
python -m unittest discover -s tests -v
git diff --check
```

Resultado: 12 pruebas Node y 5 pruebas Python pasan; sintaxis y `git diff --check` pasan. Git informa avisos de normalización LF/CRLF, no errores de whitespace. Se intentó una inspección con Chrome headless mediante `--dump-dom`, pero el proceso no produjo salida en este entorno, así que **no se considera una validación real de navegador**. No se abrió ninguna ventana ni se tomó control de pantalla.

## Riesgos y dependencias restantes

1. Obtener autorización explícita o licencia para la tabla derivada Red 2023 V2 antes de considerar su reinclusión.
2. Adquirir por territorio reglas de elegibilidad, periodicidad, exclusiones y conteos operativos comparables.
3. Sustituir residentes por denominadores operativos oficiales: población elegible, rondas, cohortes, exclusiones, invitaciones y calendarios territoriales.
4. Conseguir datos observados de capacidad/cupos por periodo si se quieren interpretar umbrales de capacidad.
5. Validación externa con profesionales de cribado, epidemiología y planificación sanitaria antes de cualquier uso decisional.
6. Revisión visual en varios navegadores/tamaños y tecnologías de asistencia. La prueba headless no se completó.
7. Si se pretende inferencia causal COVID, definir estimando, cohorte y contrafactual defendible y acceder a microdatos longitudinales con permisos; el prototipo actual solo sostiene descripción y escenarios.
8. Consultar `RESOLUCION_RIESGOS_Y_DEPENDENCIAS.md` y completar la revisión independiente con el paquete `revision_externa/`.

## Entrega de esta auditoría

Los cambios se preparan en la rama independiente `audit/integral-crabi-2026-11`; `main` no se modifica ni se publica nada automáticamente. La auditoría registra correcciones implementadas y dependencias abiertas para revisión y posterior integración por el responsable del repositorio.
