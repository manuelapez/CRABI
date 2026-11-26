# Explicaciones científicas

Este documento reúne las definiciones y operaciones que respaldan las explicaciones sencillas del recorrido. Las cifras mostradas en la interfaz proceden del JSON congelado; las fórmulas describen las reglas documentadas, no estimaciones de actividad real.

## Población de referencia

- **Fuente:** Estadística Continua de Población (ECP) del INE, tabla 59238.
- **Fecha:** 1 de octubre de 2026, provisional.
- **Unidad:** personas residentes.
- **Operación:** suma de edades simples 50–69, inclusive, para mujeres de la Comunidad de Madrid.
- **Resultado:** 1.038.983 residentes.
- **Límite:** el agregado no identifica elegibilidad individual, invitaciones ni asistencia.

## Inclusión hipotética y unidad de actividad

Sea (N=1.038.983) la población residente y (q=0,50) la fracción hipotética incluida. La cantidad de referencia es:

\[
I=\operatorname{round}(Nq)=\operatorname{round}(519.491,5)=519.492.
\]

`I` se interpreta como unidades equivalentes hipotéticas de invitación, no como invitaciones emitidas ni personas identificadas. La participación contextual es 0,60, pero no se introduce en este cálculo, en H-01 ni en RF v0.2. No se deriva un número de pacientes, pruebas o mamografías realizadas.

## Trayectoria de referencia y perturbación

El horizonte contiene (H=6) etapas abstractas. El total de referencia se distribuye uniformemente:

\[
R=I/H=519.492/6=86.582\quad\text{unidades equivalentes por etapa}.
\]

En (P_2) y (P_3) se aplica (d=0,30). La pérdida entera en cada etapa afectada es:

\[
L_t=\lfloor R d\rfloor=\lfloor 86.582\times0,30\rfloor=25.974.
\]

## Balance temporal H-01

Convención: la pérdida entra en el saldo al cierre del periodo afectado. Esa pérdida no puede recuperarse en el mismo periodo; puede recuperarse desde el siguiente. Si (B_{t-1}) es el saldo al inicio, (L_t) la nueva pérdida y (Q_t) la recuperación efectiva:

\[
B_t=B_{t-1}+L_t-Q_t,\qquad B_0=0.
\]

La actividad alternativa es:

\[
A_t=R-L_t+Q_t.
\]

La restricción (A_t\le C) representa el límite matemático supuesto por etapa. El valor de `capacityCarryIn` en la tabla de origen solo registra recuperación planificada que no cupo por el límite; no es el saldo global (B_t). El JSON aporta `pendingAtEnd`, que se utiliza directamente.

## Conservación global

Para las salidas del horizonte:

\[
\sum_{t=1}^{H}L_t=\sum_{t=1}^{H}Q_t+B_H.
\]

Unidades: unidades equivalentes hipotéticas. Para A: 51.948 generadas = 51.948 recuperadas + 0 pendientes. Para B: 51.948 = 45.458 + 6.490. Para C: 51.948 = 50.217 + 1.731.

## Capacidad de referencia

El límite por escenario ya está almacenado en cada objeto de escenario. A y C usan 108.228; B usa 99.570 unidades equivalentes por etapa. Los cocientes nominales son 1,25× y 1,15×. Son límites del experimento, no capacidad sanitaria medida.

## Random Forest v0.2

El Random Forest es un regresor compuesto por 160 árboles que aprende patrones en ejemplos sintéticos etiquetados por H-01. No aprende de pacientes. Las salidas precomputadas son medias para remanente final, pico de actividad equivalente y etapas limitadas.

\[
E_{abs}=|\hat y-y|,\qquad E_{rel}=\frac{|\hat y-y|}{|y|}\quad (y\ne0).
\]

Si el valor exacto (y=0), (E_{rel}) no está definido; la interfaz lo dice en lugar de mostrar una división por cero. La predicción fraccionaria de etapas es una media de regresión, no una probabilidad ni un conteo exacto. Una comparación de tres casos no prueba precisión general.

## Fuentes territoriales e institucionales

- [INE ECP 2026, nota oficial](https://www.ine.es/dyngs/Prensa/ECP3T26.htm) y [tabla 59238](https://www.ine.es/jaxiT3/Tabla.htm?L=0&t=59238).
- [Comunidad de Madrid, DEPRECAM](https://www.comunidad.madrid/salud/deteccion-precoz-cancer-mama), consultada 25/11/2026; la fecha de publicación no era visible.
- [ISCIII, Institutos de Investigación Sanitaria](https://www.isciii.es/institutos-investigacion-sanitaria-presentacion), consultado 25/11/2026.
- [Memoria ISCIII 2024](https://transparencia.isciii.es/documents/40806/4639de59-5691-1bdf-f5e2-a5ed0b6efcdb).
- [Cuentas CIBER 2025 e informe de auditoría](https://www.ciberisciii.es/media/3398218/ccaa-ciber-2025-aprobadas-e-informe-de-auditoria.pdf).
