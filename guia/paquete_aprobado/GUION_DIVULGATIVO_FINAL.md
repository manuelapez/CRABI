# Guion divulgativo final — Caso práctico CRABI

**Versión:** 2.0 independiente · **Corte de fuentes y datos:** 25 de noviembre de 2026  
**Voz:** segunda persona. **Audiencia:** jurado DATAMAD sin formación previa en estadística, epidemiología ni programación.

## Apertura

### ¡Es tu turno! Ponte en la piel de un investigador

**Descubre cómo funciona CRABI realizando tu propio estudio guiado.**

No necesitas saber estadística, medicina ni programación. Durante este recorrido formarás parte, de manera ficticia, de un equipo de investigación en salud pública.

Tu equipo quiere responder una pregunta sencilla: **¿qué podría ocurrir si un programa de detección temprana del cáncer de mama redujera su actividad durante un tiempo y después intentáramos recuperar lo pendiente?**

Usarás un dato oficial, elegirás una condición para el experimento y observarás cómo cambian los resultados. Al final verás qué puede aproximar la inteligencia artificial y por qué comprobamos sus respuestas.

> Es un ejercicio hipotético de simulación. No predice la actividad sanitaria real.

## 1. Hoy vas a formar parte de un equipo de investigación

### En pocas palabras

Imagina que te incorporas por un rato a un equipo que estudia preguntas de salud. No vas a decidir qué debe hacer un programa real. Vas a explorar una pregunta más concreta: si una actividad bajara durante dos etapas, ¿cómo se repartiría después lo que quedó pendiente?

En España trabajan muchos equipos e instituciones de investigación. Las cifras que ves ayudan a situar ese entorno; no significan que CRABI pertenezca a esas redes ni que ellas utilicen este prototipo.

### La explicación científica

CRABI se presenta como un laboratorio de simulación de escenarios sintéticos. La pregunta se formula sobre salidas de un motor determinista y no sobre resultados clínicos observados.

Las referencias institucionales usan unidades y periodos diferentes: 36 institutos acreditados y más de 31.000 personas investigadoras adscritas en 380 centros (ISCIII, página consultada el 25/11/2026); ocho institutos en Madrid (Memoria ISCIII 2024); y 506 grupos CIBER de pleno derecho en 104 instituciones (cuentas CIBER del ejercicio 2025). No se suman entre sí ni se atribuyen a CRABI. Las definiciones y enlaces constan en la matriz de fuentes.

## 2. Lo primero es saber de cuántas personas estamos hablando

### En pocas palabras

Para hacer una cuenta necesitas decidir a quién estás mirando. En este ejemplo eliges mujeres residentes en la Comunidad de Madrid que tienen entre 50 y 69 años.

Según el dato del Instituto Nacional de Estadística que usamos, en ese grupo hay **1.038.983 residentes**. Es un recuento de residentes, no una lista de pacientes ni de personas que hayan recibido una prueba.

### La explicación científica

La fuente es la Estadística Continua de Población (ECP), tabla 59238, con referencia provisional al 1 de octubre de 2026. La cifra es la suma de las edades simples de 50 a 69 años, inclusive, para mujeres residentes en la Comunidad de Madrid. La unidad es personas residentes. La operación no determina quién cumple criterios individuales.

Fuentes primarias: [INE, tabla 59238](https://www.ine.es/jaxiT3/Tabla.htm?L=0&t=59238) y [nota de población a 1/10/2026](https://www.ine.es/dyngs/Prensa/ECP3T26.htm). No se mezcla con el Censo municipal regional de 2025.

## 3. Tener esa edad no significa que todas participen

### En pocas palabras

Conocer cuántas residentes hay no te permite saber quién cumple todos los requisitos, quién recibiría una invitación o quién acudiría. No tenemos esa información persona por persona.

Para practicar con el simulador, decides trabajar con la mitad como condición inventada para este ejemplo. El cálculo da **519.492**: una cantidad equivalente para hacer las cuentas, no cartas enviadas ni personas identificadas.

El **60 %** aparece solo como contexto. No lo utilizas para calcular asistencia, pacientes ni pruebas.

### La explicación científica

Se aplica una fracción hipotética de inclusión del 0,50 a 1.038.983 residentes. El producto es 519.491,5 y el flujo de datos lo redondea a 519.492 unidades equivalentes hipotéticas de invitación. La participación contextual es 0,60 y el JSON declara `participationAppliedToModel: false`; no se aplica al motor ni a RF v0.2.

La barra representa una proporción de la cantidad, no personas individuales ni elegibilidad observada.

## 4. Cada territorio puede explicar su programa de forma diferente

### En pocas palabras

Antes de elegir edades, miras qué dice la fuente oficial de Madrid. Su programa de detección temprana, llamado DEPRECAM, describe mamografías para mujeres residentes de 50 a 69 años, sin síntomas y que cumplen los criterios de inclusión. La mamografía se plantea cada dos años.

Eso ayuda a entender por qué delimitas el ejemplo con esas edades. No significa que todas las residentes cumplan los requisitos ni que sepamos quién recibe una citación.

### La explicación científica

La página institucional consultada el 25/11/2026 describe rango 50–69, residencia, ausencia de síntomas, criterios de inclusión y periodicidad bienal. No se identificó una fecha de publicación visible. La regla se usa como contexto documental, no como clasificación aplicada a personas ni como sustituto del dato demográfico.

Fuente primaria: [Comunidad de Madrid, DEPRECAM](https://www.comunidad.madrid/salud/deteccion-precoz-cancer-mama).

## 5. Imagina que durante dos etapas la actividad se reduce

### En pocas palabras

Repartes la cantidad del ejercicio en seis etapas. Para tener una comparación sencilla, cada etapa empieza con la misma referencia: **86.582 unidades equivalentes**.

Ahora imaginas que en las etapas 2 y 3 se completa un 30 % menos que esa referencia. La parte que falta no desaparece: queda pendiente para intentar recuperarla más adelante.

También eliges un límite hipotético de actividad para cada etapa. Cambia según el caso A, B o C que selecciones después.

### La explicación científica

Los periodos son seis posiciones abstractas, sin equivalencia con meses, años o rondas. La referencia por periodo se toma de las filas exactas del JSON: 86.582; coincide con 519.492 / 6. La pérdida de cada periodo perturbado es ⌊86.582 × 0,30⌋ = 25.974. En A y C, el límite es 108.228; en B, 99.570. Los límites no son mediciones de capacidad sanitaria.

En esta entrega, el metadato `assumptions.referencePerPeriod` está corregido a 86.582, coherente con las filas exactas y con `519.492 / 6`. La capacidad de 108.228 para A y C se mantiene como un parámetro distinto. Este ajuste no cambia ninguna salida aprobada.

## 6. Ahora sigues el recorrido de lo que falta y de lo que se recupera

### En pocas palabras

La parte que falta se suma al terminar la etapa en que ocurre la reducción. Solo puedes empezar a recuperarla en la etapa siguiente. Si vuelve a reducirse la actividad, se añade otra parte pendiente.

En la etapa 3, por ejemplo, ya puedes recuperar algo de lo acumulado en la etapa 2. Al mismo tiempo se genera una nueva cantidad pendiente. La tabla y los gráficos muestran las cifras exactas del caso que elijas.

### La explicación científica

Convención H-01: la pérdida se incorpora al saldo al cierre del periodo afectado; su recuperación puede empezar en el periodo siguiente, incluso si ese periodo tiene una nueva reducción. Para cada periodo: saldo al cierre = saldo anterior + pérdida generada − recuperación efectiva; actividad alternativa = referencia − pérdida generada + recuperación efectiva. La recuperación efectiva respeta el límite elegido.

El campo `carried_in` de los CSV indica arrastre por capacidad, no el saldo global de pendientes. La interfaz usa `pendingAtEnd` del JSON congelado.

## 7. Comprueba cuánto se recuperó y cuánto quedó

### En pocas palabras

Al cerrar el ejercicio, comparas tres cantidades: lo que quedó pendiente por la reducción, lo que lograste recuperar y lo que aún falta.

Con el caso A seleccionado, el simulador recupera todo lo acumulado. Si eliges otro caso, el resultado puede cambiar. La igualdad siempre corresponde al escenario activo.

### La explicación científica

En A, el motor H-01 genera 51.948 unidades equivalentes pendientes, recupera 51.948 y deja 0. Por tanto: **51.948 = 51.948 + 0**. El pico es 101.734 unidades por etapa y hay 0 etapas limitadas. La identidad general es pendientes generadas = recuperación acumulada + pendiente final.

## 8. Prueba otra situación y descubre qué cambia

### En pocas palabras

Ya viste un caso. Ahora escoges entre tres resultados que el motor calculó antes. La población, la reducción y las seis etapas se mantienen; cambia el límite o la forma de recuperar.

- **A:** el límite es 1,25× y recuperas de forma uniforme.
- **B:** el límite baja a 1,15× y el reparto sigue siendo uniforme.
- **C:** el límite es 1,25× y la recuperación es gradual.

Elige A, B o C. Los gráficos, las cuentas y la comparación con la IA cambian juntos. No se crea un cuarto caso.

### La explicación científica

Los tres identificadores y sus seis filas por periodo están congelados en el JSON. Se mantiene fija la población, inclusión, participación contextual, horizonte, reducción, inicio y duración. Cambiar la selección solo representa resultados ya calculados; no ejecuta H-01 ni vuelve a entrenar el modelo.

## 9. ¿Puede la inteligencia artificial acercarse al resultado?

### En pocas palabras

El motor matemático calcula cada caso siguiendo unas reglas. Después, otro programa aprendió a aproximar esas respuestas viendo muchos ejemplos sintéticos que el motor ya había resuelto.

Primero ves lo que estima la IA; luego, el valor exacto del motor; por último, la diferencia. Así compruebas en qué se acerca y dónde se equivoca. La IA no aprendió de pacientes ni de historias clínicas.

### La explicación científica

RF v0.2 es un Random Forest de regresión con 160 árboles, entrenado con escenarios sintéticos etiquetados por el motor exacto. Sus predicciones se copian del JSON congelado; no se ajusta ni reentrena en esta versión. Se comparan remanente, pico de actividad equivalente y etapas limitadas.

El error absoluto es |predicción − exacto|. El error relativo es |predicción − exacto| / |exacto| y no se define cuando el exacto es cero. Un promedio de 0,16 etapas es una salida continua de regresión, no una probabilidad ni un conteo.

## 10. Acabas de recorrer una investigación con CRABI

### En pocas palabras

Elegiste un grupo a partir de un dato oficial, separaste ese dato de las condiciones que inventaste para el ejercicio, simulaste una reducción, seguiste lo pendiente y comparaste tres casos.

También viste que una IA puede aproximar el cálculo, pero que su respuesta debe compararse con un resultado exacto. La pregunta importante no es solo «¿qué número salió?», sino «¿de dónde salió y qué significa?».

CRABI puede servir para explorar preguntas de investigación y hacer visibles las consecuencias de distintos supuestos. El siguiente paso sería revisar cada pregunta con datos adecuados y equipos especialistas.

> Investigar no consiste solo en obtener un número: también consiste en saber de dónde viene, qué significa y hasta dónde puedes confiar en él.

### La explicación científica

El recorrido combina una fuente demográfica provisional, una regla territorial documentada como contexto, supuestos declarados, salidas deterministas H-01 y predicciones precomputadas RF v0.2. Los resultados son condicionales a esos elementos; no validan causalidad ni permiten generalizar a actividad sanitaria real.

## Nota de edición

En el prototipo HTML, los valores que cambian entre A/B/C se obtienen del JSON. Los ejemplos fijos de este guion ilustran el escenario central A y se identifican explícitamente como tales.
