# CRABI — Una herramienta para explorar la planificación del cribado de cáncer de mama

**CRABI** es un proyecto de investigación y desarrollo en estadística aplicada, simulación e inteligencia artificial, orientado a la exploración de escenarios relacionados con la planificación de programas poblacionales de cribado de cáncer de mama.

Su objetivo es transformar datos demográficos, reglas documentadas y supuestos explícitos en **escenarios comprensibles, comparables, reproducibles e interpretables**.

CRABI permite modificar hipótesis —como el rango de edad, la fracción de población incluida, la participación, la distribución temporal de actividad o las restricciones hipotéticas de capacidad— y observar cómo cambian los resultados.

El proyecto combina cuatro líneas de trabajo:

1. **Modelización demográfica:** estimación aritmética de magnitudes hipotéticas a partir de población residente.
2. **Análisis territorial:** contextualización de las diferencias documentadas entre programas de cribado.
3. **Simulación contrafactual:** exploración de trayectorias alternativas ante perturbaciones y estrategias de recuperación.
4. **Inteligencia artificial aplicada:** investigación de modelos de aprendizaje automático para identificar relaciones, interacciones y escenarios relevantes dentro del espacio de simulación.

La finalidad no es sustituir las decisiones de los responsables sanitarios, sino proporcionar un entorno de investigación que facilite la formulación de preguntas, el análisis de supuestos y la comparación transparente de escenarios.

CRABI no determina elegibilidad individual, no emite recomendaciones clínicas y no predice resultados sanitarios reales con los datos actualmente disponibles.

---

## 1. Modelo demográfico y escenarios de cribado

El primer componente de CRABI utiliza población femenina residente por edad simple y territorio, procedente de agregados del Instituto Nacional de Estadística (INE).

El simulador permite construir escenarios mediante la selección de:

- Territorio de referencia.
- Rango de edad.
- Fracción hipotética de población incluida.
- Participación supuesta.
- Distribución temporal ilustrativa.
- Parámetros de sensibilidad.

Entre los escenarios principales se encuentran las comparaciones de los rangos de **50–69 y 45–74 años**.

El modelo permite cuantificar cómo cambia la población residente comprendida al ampliar un intervalo de edad y cómo se modifican las magnitudes hipotéticas al aplicar diferentes supuestos.

### Interpretación de los resultados

Es fundamental distinguir tres conceptos:

**Población residente:** número de mujeres residentes dentro del intervalo de edad seleccionado.

**Actividad hipotética:** magnitud aritmética obtenida mediante la aplicación de supuestos al denominador demográfico.

**Actividad observada:** actividad efectivamente registrada por un programa sanitario, que requiere fuentes específicas y definiciones operativas compatibles.

CRABI trabaja principalmente con los dos primeros conceptos.

La población comprendida en un intervalo no equivale necesariamente a población elegible, invitada o participante.

Los parámetros de sensibilidad permiten estudiar cómo cambia una simulación al modificar sus hipótesis. No constituyen intervalos de confianza ni predicciones de actividad real.

El corte demográfico utilizado en la versión desarrollada en noviembre de 2026 procede de información provisional del INE, por lo que puede estar sujeto a revisiones.

---

## 2. Análisis territorial de los programas de cribado

CRABI incorpora una investigación documental sobre las características de los programas de cribado de cáncer de mama en los diferentes territorios españoles.

El objetivo es conectar las reglas publicadas de los programas con la estructura demográfica de cada territorio.

La investigación contempla **19 territorios** y estudia aspectos como:

- Rangos de edad documentados.
- Vigencia de la información.
- Ampliaciones anunciadas.
- Implantación progresiva por cohortes.
- Diferencias entre anuncios y aplicación efectiva.
- Disponibilidad y calidad de las fuentes.
- Limitaciones de comparabilidad.

### Reglas documentadas y población

La vista territorial permite calcular magnitudes demográficas correspondientes a los rangos documentados cuando existe evidencia suficiente.

En el corte documental de noviembre de 2026 se mantienen cuatro territorios sin rango habilitado para este cálculo por falta de confirmación suficiente:

- Andalucía.
- Aragón.
- Navarra.
- Ceuta.

Esta restricción no implica que dichos territorios carezcan de programas de cribado, sino que la información reunida no permite representar con suficiente seguridad una regla vigente para el cálculo planteado.

Los rangos habilitados constituyen referencias demográficas y no recuentos efectivos de personas elegibles.

### Límites de comparación

Las diferencias territoriales pueden deberse a:

- Tamaño poblacional.
- Estructura de edades.
- Rangos documentados.
- Fechas de referencia.
- Grado de implantación.
- Disponibilidad de información.

Por ello, CRABI no interpreta automáticamente una diferencia demográfica como una diferencia de calidad, eficiencia o resultados sanitarios.

La documentación se encuentra en:

- [Validación territorial](VALIDACION_TERRITORIAL_CRABI.md)
- [Investigación de fuentes territoriales](INVESTIGACION_TERRITORIAL_CRIBADO_ESPANA.md)
- [Evolución del modelo territorial](EVOLUCION_MODELO_TERRITORIAL_CRABI.md)

---

## 3. Modelo contrafactual: simulación de escenarios alternativos

Una de las principales líneas de desarrollo de CRABI es su **modelo contrafactual exploratorio**.

Este módulo permite estudiar cómo cambiarían las trayectorias matemáticas de actividad bajo diferentes supuestos de perturbación y recuperación.

Su objetivo es representar escenarios alternativos de planificación de forma transparente, sin interpretarlos como reconstrucciones causales de lo sucedido en la realidad.

### ¿Qué es un contrafactual en CRABI?

Un escenario contrafactual compara una situación de referencia con otra situación definida mediante hipótesis alternativas.

Por ejemplo:

- ¿Qué ocurre si una actividad hipotética se reduce durante varios periodos?
- ¿Cómo cambia el resultado si la recuperación es gradual o acelerada?
- ¿Qué sucede cuando existe una limitación matemática de capacidad?
- ¿Cuánta actividad permanece pendiente al finalizar el horizonte de simulación?
- ¿Qué parámetros condicionan los picos y remanentes del escenario?

La aplicación permite observar las diferencias entre trayectorias y examinar sus condiciones.

### Funcionamiento del motor

El simulador parte de una trayectoria hipotética de referencia.

Sobre ella pueden aplicarse perturbaciones que reducen una parte de la actividad durante determinados periodos.

La diferencia generada constituye una cantidad matemática pendiente, que puede redistribuirse posteriormente siguiendo distintas estrategias.

Entre las estrategias implementadas en el contrafactual inicial se encuentran:

- **Recuperación uniforme:** distribución del esfuerzo de recuperación según una regla temporal uniforme.
- **Recuperación gradual:** asignación progresiva del esfuerzo a lo largo del horizonte.
- **Recuperación acelerada:** concentración relativa del esfuerzo en periodos anteriores de la ventana de recuperación.
- **Recuperación restringida por capacidad:** aplicación de un límite matemático que condiciona cuánto puede recuperarse en cada periodo.

El modelo incorpora una condición temporal fundamental:

**La actividad pendiente no puede recuperarse antes de haberse generado.**

Una reducción produce pendiente al cierre del periodo afectado. Su recuperación puede comenzar, como pronto, en el periodo siguiente.

Las cantidades no recuperadas se trasladan a periodos posteriores cuando el modelo lo permite o quedan reflejadas como remanente final.

### Resultados principales

El contrafactual permite analizar:

**Trayectoria de referencia:** actividad hipotética que se utiliza como escenario inicial de comparación.

**Trayectoria alternativa:** actividad resultante de aplicar perturbaciones y estrategias de recuperación.

**Pendiente generado:** diferencia matemática acumulada debido a la perturbación.

**Actividad recuperada:** parte del pendiente que se redistribuye en periodos posteriores.

**Remanente:** actividad hipotética que permanece sin recuperar al finalizar el horizonte.

**Pico de actividad:** mayor magnitud registrada en un periodo de la trayectoria simulada.

**Capacidad ilustrativa:** restricción matemática utilizada para evaluar la redistribución temporal.

Estas magnitudes describen el funcionamiento del escenario, no cifras sanitarias observadas.

### Interpretación científica

El contrafactual permite identificar compensaciones entre distintas distribuciones temporales.

Por ejemplo, una estrategia más concentrada puede reducir el tiempo de recuperación bajo determinados supuestos, pero generar picos de actividad superiores.

Una estrategia más distribuida puede modificar dichos picos y el remanente según las restricciones del escenario.

Estas relaciones dependen de las ecuaciones, parámetros y horizontes utilizados.

**CRABI no estima con este módulo cuántas mujeres reales quedaron pendientes de cribado, ni calcula el efecto causal de una interrupción sobre resultados clínicos.**

---

## 4. Origen de la investigación contrafactual retrospectiva

El desarrollo contrafactual de CRABI tiene su origen en una investigación sobre interrupciones históricas de programas de cribado.

Uno de los primeros ejercicios exploró la diferencia agregada entre dos cifras anuales de invitaciones publicadas para Barcelona:

`G = 97.299 − 47.659 = 49.640`

Esta cantidad representaba la diferencia entre dos totales publicados, no una cohorte individual identificada de mujeres pendientes.

El experimento histórico utilizaba esa diferencia como volumen hipotético de escenario y comparaba distintos repartos temporales.

Su objetivo era mostrar que distribuir una misma cantidad en menos periodos puede incrementar el pico de actividad, mientras que repartirla en más periodos cambia la trayectoria temporal.

No permitía reconstruir lo sucedido a personas concretas ni identificar el efecto causal de la pandemia.

Además, los agregados utilizados no seguían necesariamente las mismas personas, cohortes o áreas.

### Evolución del modelo

La investigación histórica sirvió como punto de partida para desarrollar un motor contrafactual más general.

El modelo actual separa:

- Datos demográficos.
- Supuestos de invitación y participación.
- Trayectorias temporales.
- Perturbaciones hipotéticas.
- Estrategias de recuperación.
- Restricciones matemáticas.
- Resultados de simulación.

Esto permite experimentar sin depender de los datos históricos utilizados en las primeras pruebas.

Los materiales históricos vinculados a ASPB y las tasas derivadas de Red 2023 se mantienen fuera de la distribución pública mientras se revisan sus condiciones de uso y redistribución.

---

## 5. CRABI-AI: inteligencia artificial aplicada a la exploración de escenarios

CRABI incorpora una línea de investigación en aprendizaje automático denominada **CRABI-AI**.

Su finalidad es estudiar cómo utilizar inteligencia artificial para ampliar las capacidades de análisis del simulador.

El principio fundamental es que **la IA debe complementar el motor matemático de CRABI, no sustituirlo**.

Los resultados numéricos de referencia continúan calculándose mediante las ecuaciones explícitas y reproducibles del simulador.

La IA se investiga como una herramienta adicional para identificar patrones, relaciones entre parámetros y escenarios que merezca la pena analizar con mayor profundidad.

### 5.1. Primera investigación: aprendizaje por refuerzo

La primera versión experimental, CRABI-AI v0.1, estudió el uso de Q-learning para aprender políticas de recuperación de actividad hipotética.

El agente se entrenó durante **300.000 episodios** y se evaluó frente a seis políticas de referencia sobre escenarios sintéticos reservados.

La evaluación incluyó:

- 500 escenarios independientes de distribución comparable al entrenamiento (IID).
- 500 escenarios de estrés fuera de distribución (OOD).
- Comprobaciones de restricciones.
- Pruebas de conservación de cantidades.
- Comparación de costes entre políticas.

El agente entrenado no demostró superioridad frente a la estrategia convencional de máxima recuperación factible.

En la evaluación reportada, sus costes medios fueron:

| Evaluación | Q-learning | Máxima factible |
|---|---:|---:|
| IID | 29,461 | 25,116 |
| OOD | 139,953 | 117,198 |

En ambos casos, un coste menor representa un mejor resultado para la función objetivo definida.

Estos resultados pertenecen exclusivamente al entorno sintético evaluado y no representan rendimiento sanitario real.

El experimento permitió estudiar las limitaciones de aplicar aprendizaje por refuerzo a problemas cuya estructura matemática puede favorecer políticas convencionales sencillas.

A partir de estos resultados, CRABI-AI orienta su desarrollo hacia un enfoque complementario.

### 5.2. Nueva línea: Random Forest y exploración inteligente

La siguiente línea de investigación de CRABI-AI estudia el uso de modelos de aprendizaje supervisado, especialmente **Random Forest**, para analizar los resultados generados por el propio simulador.

A diferencia del aprendizaje por refuerzo orientado a seleccionar estrategias de recuperación, el objetivo del nuevo enfoque es **identificar qué regiones del espacio de escenarios contienen relaciones, interacciones o comportamientos relevantes**.

La idea consiste en entrenar un modelo con conjuntos de simulaciones reproducibles de CRABI.

Cada ejemplo de entrenamiento relacionará:

**Parámetros de entrada**

- Territorio y rango etario.
- Fracción hipotética de invitación.
- Participación supuesta.
- Intensidad y duración de la perturbación.
- Horizonte temporal.
- Estrategia de recuperación.
- Restricciones de capacidad.

**Resultados calculados por CRABI**

- Pendiente generado.
- Actividad recuperada.
- Remanente final.
- Pico temporal.
- Diferencias respecto a la referencia.
- Saturación matemática del escenario.

Random Forest podrá utilizarse como modelo aproximador o *surrogate model* de determinadas salidas del simulador.

Su objetivo no es reemplazar el cálculo exacto, sino aprender una representación de las relaciones entre parámetros y resultados que facilite la exploración de escenarios.

### 5.3. Interpretabilidad mediante importancia de variables y SHAP

El proyecto contempla estudiar técnicas de interpretación de modelos, incluidas:

- Importancia de variables.
- Importancia por permutación.
- Dependencia parcial.
- Análisis de interacciones.
- SHAP, cuando sea apropiado para el modelo entrenado.

Estas técnicas pueden ayudar a investigar preguntas como:

- ¿Qué parámetros tienen mayor influencia sobre una predicción del modelo de IA?
- ¿Qué combinaciones de parámetros producen cambios importantes?
- ¿Dónde aparecen transiciones entre recuperación completa y remanente positivo?
- ¿Qué escenarios resultan especialmente sensibles a la capacidad?
- ¿Qué regiones requieren mayor exploración?

Las explicaciones de Random Forest o SHAP describen el comportamiento del modelo aprendido; **no constituyen por sí mismas pruebas de causalidad ni sustituyen la comprobación mediante el simulador original**.

### 5.4. Aprendizaje activo para seleccionar escenarios

Otra capacidad prevista es el **aprendizaje activo** (*active learning*).

En lugar de explorar de forma indiscriminada miles de combinaciones de parámetros, la IA puede ayudar a seleccionar escenarios adicionales que resulten informativos.

El procedimiento experimental previsto consiste en:

1. Generar un conjunto inicial de escenarios con CRABI.
2. Entrenar un modelo de aprendizaje automático.
3. Identificar regiones de interés o incertidumbre predictiva.
4. Proponer nuevas combinaciones de parámetros.
5. Ejecutarlas mediante el motor matemático original.
6. Incorporar sus resultados al análisis.
7. Reevaluar el modelo y comparar la eficiencia de exploración.

Así, la IA actuaría como una herramienta de investigación que orienta dónde conviene ejecutar nuevas simulaciones.

Su utilidad deberá demostrarse comparándola con diseños factoriales, muestreo aleatorio y otras estrategias convencionales bajo presupuestos equivalentes.

### 5.5. Integración prevista: «Analizar con IA»

La funcionalidad propuesta para CRABI consiste en añadir una opción denominada:

**Analizar con IA**

A partir de un escenario seleccionado, esta herramienta podría ofrecer:

- Factores relevantes para el resultado.
- Interacciones identificadas por el modelo.
- Escenarios cercanos que merecen exploración.
- Zonas donde los resultados cambian considerablemente.
- Comparaciones adicionales verificadas con CRABI.
- Advertencias sobre incertidumbre y límites del modelo aprendido.

La arquitectura distinguirá dos fuentes de información:

**Motor CRABI:** resultados exactos de la simulación definida.

**CRABI-AI:** predicciones aproximadas, indicadores de sensibilidad y propuestas de exploración basadas en aprendizaje automático.

Los escenarios propuestos por la IA deberán comprobarse nuevamente mediante el motor exacto.

### Estado de la investigación

La línea Q-learning v0.1 dispone de un experimento de entrenamiento y evaluación documentado.

La línea Random Forest, interpretabilidad y aprendizaje activo corresponde a la siguiente etapa de desarrollo. Su precisión, utilidad y posible integración en la demo principal dependen de los resultados de entrenamiento y validación.

CRABI no afirma actualmente que la IA mejore las decisiones sanitarias ni que los modelos aprendidos hayan sido validados con datos clínicos reales.

---

## 6. Interpretación de resultados y transparencia metodológica

Uno de los objetivos de CRABI es que una persona pueda comprender los resultados sin necesidad de conocer previamente todas las ecuaciones.

La interfaz evoluciona hacia una presentación basada en cinco preguntas:

1. **¿Qué estoy viendo?**
2. **¿Cómo se ha calculado?**
3. **¿Qué significa este resultado?**
4. **¿Qué cambia respecto al escenario de referencia?**
5. **¿Qué conclusiones no pueden extraerse?**

Las explicaciones deben utilizar los valores realmente calculados y distinguir entre datos, parámetros y resultados.

La aplicación incorpora o desarrolla, según el módulo, elementos como:

- Definiciones contextuales.
- Descripciones de indicadores.
- Comparaciones absolutas y relativas.
- Explicaciones de gráficos.
- Interpretaciones dinámicas.
- Fórmulas y metodología.
- Advertencias sobre límites científicos.

El propósito es facilitar tanto la exploración por personas no especialistas como la revisión técnica del modelo.

---

## 7. Datos y fuentes

CRABI utiliza principalmente agregados demográficos públicos, reglas documentadas de programas de cribado y parámetros hipotéticos.

Entre sus fuentes y materiales de referencia se encuentran:

- Estadísticas demográficas del INE.
- Documentación oficial de programas territoriales.
- Información sobre vigencias y rangos etarios.
- Estudios y publicaciones metodológicas.
- Experimentos sintéticos generados por los motores de CRABI.

La población censal de Madrid de 2025 se conserva como contexto independiente y no se mezcla automáticamente con los denominadores del INE.

Los datos observados de actividad sanitaria requieren comprobaciones adicionales de definiciones, comparabilidad y derechos antes de utilizarse conjuntamente.

La existencia de información publicada no implica por sí sola autorización para cualquier modalidad de redistribución.

Los escenarios simulados no deben confundirse con observaciones empíricas.

La información metodológica adicional se encuentra en:

- [Fuentes y metodología](docs/FUENTES_Y_METODOLOGIA.md)
- [Resultados reproducibles de demografía](docs/RESULTADOS_REPRODUCIBLES_DEMOGRAFIA.md)
- [Validación de robustez demográfica](docs/VALIDACION_ROBUSTEZ_DEMOGRAFICA.md)

---

## 8. Demo interactiva

La aplicación se encuentra en:

**[Abrir demo de CRABI](demo/index.html)**

La versión de desarrollo v0.4 integra la exploración demográfica, la vista territorial y el contrafactual experimental mediante navegación entre secciones.

### Funcionalidades principales

**Demografía**

Permite seleccionar territorios, modificar rangos de edad y explorar escenarios de invitación, participación y distribución temporal.

**Territorios**

Relaciona los rangos documentados con las poblaciones residentes correspondientes, respetando los estados de evidencia.

**Contrafactual experimental**

Permite modificar perturbaciones y estrategias de recuperación, visualizar trayectorias alternativas y analizar remanentes hipotéticos.

**Interpretación**

Facilita la comprensión de los parámetros, cálculos, resultados y restricciones metodológicas.

### Inteligencia artificial

Los desarrollos de CRABI-AI se mantienen como módulos experimentales independientes hasta que sus resultados, dependencias y funcionalidades puedan validarse para su integración.

La demo principal no necesita un modelo de inteligencia artificial para ejecutar sus simulaciones matemáticas.

---

## 9. Estructura del proyecto

La organización principal del repositorio incluye:

- **`demo/`**: interfaz interactiva, motores de simulación, datos empaquetados y navegación.
- **`demo/contrafactual/`**: módulo experimental de simulación contrafactual y sus componentes de interfaz.
- **`demo/data/`**: extractos demográficos, snapshots y scripts de preparación.
- **`datos_territoriales/`**: reglas documentadas, fuentes y transformaciones.
- **`analisis/`**: análisis estadísticos reproducibles.
- **`resultados/robustez/`**: resultados y tablas de sensibilidad.
- **`docs/`**: documentación metodológica y científica.
- **`tests/`**: pruebas automatizadas de cálculos, datos, reglas e integración.
- **Documentos de raíz**: evolución del proyecto, validaciones, contribución, citación y documentación de publicación.

En el entorno de desarrollo local existen también líneas experimentales adicionales, como `CRABI_AI/` y las investigaciones contrafactuales avanzadas.

No todos los materiales de investigación interna forman parte necesariamente de la distribución pública.

El contenido exacto de cada versión debe comprobarse mediante sus archivos y documentación de publicación.

---

## 10. Reproducir y explorar CRABI

La demo principal está diseñada para funcionar localmente en un navegador moderno.

### Abrir la aplicación

1. Descarga el repositorio completo.
2. Si se descarga como ZIP, extrae todos los archivos.
3. Entra en la carpeta `demo/`.
4. Abre `index.html` en el navegador.

Es importante mantener los archivos JavaScript y los directorios asociados en sus rutas originales.

Abrir únicamente una copia aislada de `index.html` puede impedir que se carguen los datos y los motores necesarios.

También puede utilizarse un servidor local:

```powershell
python -m http.server 8000
```

Después, abre:

`http://localhost:8000/demo/`

### Pruebas automatizadas

Para las comprobaciones principales de las versiones demográfica y territorial se utilizan Python y Node.js.

Desde la raíz del proyecto:

```powershell
python -m unittest discover -s tests -v
node --test tests/demo-model.test.cjs tests/v03-model.test.cjs
```

Las pruebas adicionales del contrafactual y de los experimentos de inteligencia artificial deben ejecutarse conforme a las instrucciones de sus respectivos módulos.

La aprobación de pruebas automatizadas no sustituye una validación funcional en navegador, una revisión metodológica independiente ni una evaluación científica externa.

### Reconstrucción de datos

Los pasos de preparación y reconstrucción de los datos demográficos se describen en:

[demo/data/README.md](demo/data/README.md)

La demo utiliza datos empaquetados y no necesita descargar información durante su funcionamiento habitual.

---

## 11. Alcance y limitaciones científicas

CRABI es una plataforma de investigación exploratoria en desarrollo.

Sus resultados deben interpretarse en relación con los datos, fórmulas y parámetros específicos de cada experimento.

### Lo que CRABI permite estudiar

- Diferencias demográficas entre rangos de edad.
- Sensibilidad de escenarios a parámetros hipotéticos.
- Variabilidad territorial en las referencias documentadas.
- Distribuciones temporales ilustrativas.
- Perturbaciones y estrategias contrafactuales.
- Remanentes y picos matemáticos.
- Relaciones entre parámetros y resultados.
- Posibles aplicaciones complementarias de aprendizaje automático.

### Lo que CRABI no permite concluir actualmente

- Número real de mujeres individualmente elegibles.
- Número real de invitaciones o mamografías necesarias.
- Capacidad operativa efectiva de los programas.
- Efectos causales de decisiones sanitarias.
- Resultados clínicos individuales.
- Beneficios sobre supervivencia o mortalidad.
- Superioridad sanitaria de una estrategia simulada.
- Capacidad predictiva clínica de los modelos de IA.

Para avanzar hacia aplicaciones operativas serían necesarios datos específicos, revisión institucional, evaluación con profesionales, validación científica y comprobaciones de calidad y derechos de uso.

La IA no elimina estas limitaciones.

---

## 12. Sobre la autora

CRABI fue impulsado por **Manuela Ibáñez Valenzuela** y presentado como prototipo de investigación en DATAMAD 2026.

Su trabajo explora la aplicación de la estadística, la ciencia de datos, la simulación y la inteligencia artificial a preguntas de salud pública, con especial atención a la interpretabilidad, la reproducibilidad y la trazabilidad de las fuentes.

Manuela también desarrolla **NDStats Analytics** junto con Clara Ibáñez Valenzuela.

NDStats trabaja en una plataforma de análisis estadístico de biomarcadores clínicos orientada al estudio de déficits nutricionales y a aplicaciones de nutrición de precisión, incluidas las relacionadas con cáncer de mama.

Se trata de una iniciativa independiente de CRABI.

- [NDStats Analytics](https://ndstatsanalytics.com/)
- [Perfil de Manuela Ibáñez](https://www.linkedin.com/in/manuela-ib%C3%A1%C3%B1ez-78a58a285/)
- [Citación de CRABI](CITATION.cff)

---

## 13. Estado de desarrollo

**CRABI v0.4 — Desarrollo experimental**

*Actualización documental: 23 de noviembre de 2026.*

El proyecto ha evolucionado desde un simulador demográfico inicial hacia una arquitectura de investigación compuesta por:

- Motor demográfico reproducible.
- Investigación y representación territorial.
- Simulación contrafactual experimental.
- Pruebas automatizadas y comprobaciones de conservación.
- Capas de interpretación de resultados.
- Investigación en aprendizaje automático mediante CRABI-AI.

Entre las siguientes prioridades se encuentran:

1. Completar la validación funcional e integración de los módulos.
2. Ampliar y auditar los escenarios contrafactuales.
3. Entrenar y evaluar la línea Random Forest de CRABI-AI.
4. Estudiar interpretabilidad y aprendizaje activo.
5. Comprobar la utilidad real de la IA frente a métodos convencionales de exploración.
6. Revisar los permisos de reutilización, la licencia y la documentación de fuentes.
7. Realizar validaciones científicas y evaluaciones con profesionales.

CRABI mantiene como principio central la separación entre **datos observados, hipótesis, resultados matemáticos y modelos aprendidos**.

Su desarrollo persigue una herramienta cada vez más completa, interpretable y reproducible para investigar escenarios de planificación del cribado poblacional, sin atribuir a las simulaciones capacidades clínicas o causales que todavía no han sido demostradas.
