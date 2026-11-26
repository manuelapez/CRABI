# Storyboard de scroll y animaciones educativas

## Principios

- Desplazamiento vertical normal, sin scroll-jacking, snapping ni desplazamiento automático.
- Se revela una vez cada bloque al entrar en pantalla; no se oculta al salir.
- Las cifras finales están en el texto accesible desde el primer render. La animación cambia solo la presentación visual.
- Los gráficos se generan con los valores exactos del escenario activo. Ningún punto o valor intermedio se presenta como dato observado.
- Selector nativo A/B/C; el cambio se puede revertir y actualiza todas las secciones dependientes.
- `prefers-reduced-motion: reduce`: contadores muestran el valor final, barras aparecen completas, no hay observadores de entrada ni transiciones necesarias para leer resultados.

## Recorrido

| Capítulo | Lo que aprende la persona | Aparición visual / interacción |
|---|---|---|
| Portada | Asume un papel ficticio y conoce la pregunta. | Título, introducción, aviso y enlace aparecen escalonados; el enlace solo baja al capítulo 1. |
| 1. Equipo | Entiende el marco institucional sin atribuir relación a CRABI. | Se revelan tres fichas con cifras, periodo y definición; pregunta central al final. |
| 2. Población | Distingue residentes del resto de conceptos. | La cifra INE cuenta visualmente hasta 1.038.983; una barra representa el conjunto, no personas. |
| 3. Inclusión | Ve que se toma la mitad solo para el experimento. | Flujo 1.038.983 → 50 % → 519.492; la franja de proporción se rellena al llegar al capítulo. |
| 4. Territorio | Conoce el contexto oficial de DEPRECAM. | La ficha de rango, frecuencia y fecha de consulta aparece en tres pasos. |
| 5. Hipótesis | Sigue seis etapas, una reducción en P2/P3 y un límite supuesto. | Parámetros se revelan uno a uno; P2/P3 quedan resaltados en tono sobrio. |
| 6. Pendiente | Comprende que primero se genera la falta y después se recupera. | Barras de actividad y saldos se dibujan por etapa; la tabla exacta está disponible junto al gráfico. |
| 7. Balance | Comprueba cuánto se generó, recuperó y quedó. | La igualdad se presenta de izquierda a derecha; resultados y límite cambian con A/B/C. |
| 8. Alternativas | Compara tres casos ya calculados. | La selección nativa actualiza resumen, parámetros, trayectoria, gráficos, balance y RF; no desplaza la página. |
| 9. IA | Distingue estimación, cálculo exacto y error. | Para cada salida se revela la predicción, el valor exacto y la diferencia; cada medida tiene una escala propia. |
| 10. Cierre | Recapitula y acota las conclusiones. | Cinco hitos se leen en secuencia; sin confeti ni lenguaje de celebración comercial. |

## Reglas de actualización

1. El escenario activo inicial es A.
2. El cambio a B o C ocurre en una sola tarea síncrona de actualización; el estado accesible anuncia la selección al final.
3. Los gráficos de seis etapas se vuelven a representar con seis filas de datos congelados del escenario seleccionado.
4. La comparación RF se reconstruye con predicciones ya almacenadas; no hay llamada de red ni inferencia de modelo.
5. Las transiciones son reversibles porque los elementos pueden actualizarse en ambos sentidos. El scroll no controla ni bloquea el selector.

## Límites de revisión

La lógica y las reglas CSS se revisaron automáticamente y con un DOM simulado. Edge headless permitió inspeccionar capturas en escritorio y a un viewport CSS medido de 738 px; esto no confirma todos los tamaños, el viewport móvil de 390 px ni la lectura por tecnologías de asistencia. La continuidad visual debe revisarse en navegador con la guía manual antes de integrar el prototipo.
