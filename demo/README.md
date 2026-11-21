# CRABI — segunda demo (v0.2)

## Actualización visual

La interfaz adopta una dirección editorial basada en la referencia aprobada: fondo crema, tipografía sans serif de alto contraste y acentos en verde, amarillo, rosa y azul. Se conserva el motor, los datos, los controles y los límites metodológicos de v0.2. Esta actualización visual aún requiere una revisión final de la demo en navegador.


Esta es la segunda demo exploratoria de CRABI, preparada el 17 de noviembre de 2026. No está validada para tomar decisiones sanitarias.

## Cómo probarla

Descarga `index.html` y ábrelo en Chrome, Edge o Firefox. No necesita conexión ni servidor. GitHub muestra el código HTML; para ejecutarlo hay que abrir el archivo descargado o publicarlo en un servicio web.

## Novedades

- Comparación de edades 50–69 y 45–74 con población provisional por territorio al 1 de enero de 2026.
- Rango de sensibilidad de la participación y límite anual hipotético introducido por la persona usuaria.
- Avisos sobre tasa histórica ausente, supuestos por edades y datos que faltan.
- Contexto de población municipal de la Comunidad de Madrid en 2025, con ambos rangos de edad.

## Fuentes y definiciones

- [INE, Estadística Continua de Población, tabla 59238](https://ine.es/jaxiT3/Tabla.htm?L=0&t=59238): mujeres residentes por edad simple y comunidad, 1/1/2026, dato provisional. Se agrupan 45–49, 50–69 y 70–74. La población residente no es población elegible.
- [Red de Programas de Cribado de Cáncer, informe de evaluación 2023](https://cribadocancer.es/indicadores-cancer-de-mama/): tasa de participación de mujeres invitadas de 50–69 años para 13 territorios. Red de Programas de Cribado de Cáncer, *Programas de Cribado de Cáncer de Mama. Informe de evaluación 2023* (datos: mayo de 2025). En los seis territorios sin tasa en el archivo del proyecto se introduce un supuesto manual ilustrativo. Si se seleccionan 45–74 años, aplicar la tasa 50–69 a las demás edades es únicamente un supuesto, no un dato observado.
- [Comunidad de Madrid, población censada por edad, nacionalidad y sexo](https://datos.comunidad.madrid/dataset/poblacion_censada_por_edad_nacionalidad_y_sexo): censo municipal de 2025; el valor que se muestra es una suma propia de 179 municipios. La ficha señala [Creative Commons Attribution](https://creativecommons.org/licenses/by/4.0/). Las diferencias con el INE 2026 pueden depender de fecha, cobertura o definición; no se atribuyen a una causa.

## Funcionamiento y límites

Se calcula población × fracción hipotética de invitación × tasa supuesta de participación. La cascada añade valoraciones posteriores como fracción hipotética de las mamografías. Dos repartos fijos distribuyen el mismo total en tres periodos: A 25/35/40 % y B 50/35/15 %. No equivalen a calendarios oficiales. A tendrá un pico menor por construcción, mientras B concentra más invitaciones en el primer periodo: estas salidas no establecen cuál es clínicamente mejor.

El límite anual es introducido por la persona usuaria y no es capacidad real ni estima esperas. Los rangos de sensibilidad no son probabilidades ni intervalos de confianza. El modelo no incorpora nuevas cohortes, rondas, exclusiones, movilidad, muertes ni reglas territoriales efectivas y no contiene proyecciones futuras.

La IA no está integrada en esta versión. Se investigará si una serie histórica suficiente permite entrenar y evaluar un modelo; el primer experimento no superó la referencia sencilla y no constituye validación temporal.

## Pruebas y estado

El motor se comprobó en 162 combinaciones de extremos y la interfaz mediante pruebas automatizadas de los controles. No se ha completado la revisión visual independiente en navegador ni la validación con profesionales. La demo no es apta para decisiones clínicas o presupuestarias.
