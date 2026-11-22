# Propuesta de licencia para CRABI

**Estado: propuesta para decisión de las titulares; no es una licencia concedida.** No crear `LICENSE`, no añadir un campo `license` a `CITATION.cff` ni afirmar que CRABI ya es software open source hasta que se elija la licencia y se confirme el derecho a licenciar todos los archivos afectados.

## Opciones consideradas

| Licencia | Efecto práctico general | Consideraciones para CRABI |
|---|---|---|
| MIT (`MIT`) | Permisiva y breve. Permite usar, modificar y redistribuir software, incluidas versiones comerciales, manteniendo aviso de copyright y licencia. No incluye una concesión de patentes expresa comparable a Apache-2.0. | Sencilla para reutilizar el código de simulación; distingue poco entre aportes y materiales científicos si se aplica indiscriminadamente a todo el repositorio. |
| Apache License 2.0 (`Apache-2.0`) | Permisiva, incluye concesión expresa de patentes y exige conservar avisos aplicables; puede requerir conservar un archivo `NOTICE` si se distribuye. | **Recomendación preliminar para el código original** si la prioridad es reutilización amplia con términos explícitos sobre patentes y atribución. Añade algo más de gestión de avisos. |
| GNU GPL v3 (`GPL-3.0-only` o `GPL-3.0-or-later`) | Copyleft: al distribuir trabajos derivados cubiertos, exige ofrecerlos bajo los términos GPL y proporcionar el código fuente correspondiente según sus condiciones. | Adecuada si la autora prioriza que las redistribuciones derivadas mantengan la misma libertad; menos adecuada si se prefiere permitir incorporación en productos bajo otras licencias. |

La recomendación provisional es **Apache-2.0 para el software original**, condicionada a que la autora y cualquier otra titular estén de acuerdo. MIT es una alternativa válida si se prioriza brevedad y menor fricción. GPLv3 conviene si se desea reciprocidad fuerte. Las tres opciones se reconocen como licencias open source; sus textos y condiciones oficiales se enlazan en [SPDX](https://spdx.org/licenses/) y el estatus de aprobación se puede consultar en [OSI](https://opensource.org/licenses).

## La licencia de código no cubre automáticamente todo

- **Código original:** solo las personas titulares pueden conceder derechos sobre sus contribuciones. Antes de elegir, documentar autoría y revisar contribuciones previas.
- **Datos INE:** la tabla se atribuye según las condiciones publicadas por INE; conservar atribución, corte, transformación y referencia de descarga. Una licencia de software no cambia términos de fuente.
- **Datos ASPB:** los informes consultados declaran CC BY-NC-ND. La redistribución de tablas transcritas o transformaciones usadas por el módulo COVID requiere una revisión específica antes de publicar el paquete. Una licencia de CRABI no puede relicenciar material de terceros.
- **Red 2023:** el CSV derivado y sus tasas permanecen excluidos hasta obtener permiso verificable.
- **Documentación, resultados, capturas y diseño:** sus derechos pueden diferir de los del código y de los datos. No se asigna aquí una licencia documental.
- **Contribuciones futuras:** el proceso de contribución debe aclarar quién conserva derechos y qué permiso se necesita para integrar cambios; esta propuesta no constituye un acuerdo de contribución.

## Pasos para cerrar la decisión

1. Confirmar titulares y alcance: código, textos, gráficos y archivos derivados.
2. Resolver las fuentes de terceros y retirar o reemplazar cualquier contenido que no pueda redistribuirse.
3. Elegir una licencia de software; decidir por separado la licencia de documentación y de cualquier dato propio.
4. Obtener aprobación explícita de las titulares.
5. Añadir el texto íntegro de licencia, encabezados/avisos pertinentes, actualizar `CITATION.cff` si corresponde y revisar el inventario de distribución.

Este documento resume diferencias prácticas para ayudar a deliberar y no es asesoramiento jurídico.

## Referencias oficiales

- [Texto SPDX MIT](https://spdx.org/licenses/MIT.html)
- [Texto SPDX Apache-2.0](https://spdx.org/licenses/Apache-2.0.html)
- [SPDX GPL-3.0-only](https://spdx.org/licenses/GPL-3.0-only.html)
- [Licencias aprobadas por OSI](https://opensource.org/licenses)
- [Open Source Definition de OSI](https://opensource.org/osd)
