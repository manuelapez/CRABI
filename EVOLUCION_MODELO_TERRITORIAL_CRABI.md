# Evolución del modelo territorial CRABI

**Corte de evidencia: 22/11/2026.** Esta nota describe una ampliación exploratoria de la demo; no valida recomendaciones sanitarias.

## Qué cambia

Se conserva el simulador demográfico anterior (50–69 como referencia y 45–74 como escenario amplio) y se añade una tarjeta independiente **Escenario territorial basado en reglas publicadas**. Al cambiar el selector de territorio, la tarjeta:

1. Lee de `datos_territoriales/reglas_cribado_2026-11.csv` el rango de escenario separado del rango general localizado, periodicidad, fecha, estado, cohortes confirmadas y observaciones.
2. Suma los conteos INE de edad simple, mujeres residentes de 40–79, para las edades inclusivas del rango referenciado. La observación es población residente por edad; no elegibilidad real.
3. Aplica dos supuestos transparentes: fracción invitada y participación. `invitaciones hipotéticas = residentes en rango × fracción invitada`; `mamografías hipotéticas = invitaciones hipotéticas × participación`.
4. Presenta la fuente oficial, el nivel de evidencia, las fechas de publicación/vigencia, cohortes y salvedades junto al resultado. Bloquea reglas marcadas sin uso de escenario (Andalucía, Aragón, Navarra y Ceuta). Illes Balears usa 45–74 según la nota oficial de octubre de 2026, con incertidumbre documental visible porque la página general anterior aún muestra 50–69 y no hay desglose de cohortes.

La frecuencia no se transforma en una tasa anual ni en número de rondas: no se conoce el calendario cohortal completo y no se quiere convertir un intervalo clínico publicado en un calendario sintético. La periodicidad queda visible como evidencia documentada.

## Qué no cambia / qué no representa

Los escenarios A/B, pesos temporales, tasa de seguimiento adicional y umbral hipotético siguen siendo ilustrativos; no se vinculan automáticamente a las reglas oficiales. Los nuevos límites territoriales se usan solamente para estimar cuántas residentes caen en ese rango de edad. No se simulan fechas de invitación, rondas escalonadas, composición por edad de la asistencia, duplicidades, exclusiones, factores de riesgo ni transición individual.

Por esto, la expresión “rango de referencia publicado” es deliberada. Incluso cuando la fuente diga que un programa invita a todas las personas dentro de un tramo, el cómputo INE no tiene las exclusiones y registros necesarios para equivaler a elegibles o invitadas.

## Construcción reproducible

Desde la raíz:

```powershell
python demo/data/build_population_snapshot.py --period 2026-10
python demo/data/build_demo_data.py
node --test tests/demo-model.test.cjs
python -m unittest discover -s tests -v
```

`build_demo_data.py` lee el snapshot agregado, el extracto INE por edad simple de 1/10/2026 y la tabla territorial. Verifica que existen exactamente 19 códigos y 40 edades (40–79) por territorio, que las bandas demográficas concuerdan con la suma por edad y que solo las reglas habilitadas contienen rangos. Empaqueta los rangos disponibles en `demo/data.js`. La demo no descarga datos durante la ejecución.

## Limitaciones y trabajo posterior

- Ocho territorios tienen evidencia con transición, cohortes no verificadas o páginas de antigüedad diversa; se muestran indicadores de estado, no certeza artificial.
- En Illes Balears, la nota de 19/10/2026 declara como actual el rango 45–74, pero una ficha general anterior conserva 50–69 y la fuente reciente no describe cohortes ni periodicidad; el valor se ofrece solo como denominador de referencia con esas salvedades. En Ceuta la edad vigente queda sin confirmar y el panel no produce denominador.
- El tramo de riesgo familiar de Extremadura y Navarra se documenta, pero no se suma al modo general: exige variables individuales no presentes en el INE.
- En Ceuta y Melilla las funciones de INGESA y la administración local requieren separar norma programática, financiación y prestación.
- No se han obtenido datos equivalentes y fechados de elegibilidad, invitaciones, participación, exclusiones o capacidad para los 19 territorios.
- La fuente de algunas páginas oficiales puede cambiar. El corte temporal y la fecha de fuente deben actualizarse en una nueva revisión, con registro de versiones y revisión humana.
- No se considera el proyecto clínicamente validado, operativo, predictivo ni open source; la aprobación de una licencia sigue pendiente.

## Riesgos de interpretación mitigados

La interfaz muestra la fecha del INE, el nombre del territorio, el intervalo de referencia, el estado de evidencia, una URL oficial y un aviso visible de que el resultado no es elegibilidad/demanda/capacidad. Valores ausentes quedan en “Pendiente”. Las fuentes Red 2023 y ASPB/COVID continúan excluidas de esta selección.
