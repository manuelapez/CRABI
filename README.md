# CRABI — candidato local de consolidación

**Corte documental: 22/11/2026.** Esta carpeta es una copia independiente para revisar conjuntamente tres módulos de investigación. Su selección de archivos no equivale a una distribución pública aprobada. CRABI no tiene una licencia open source aprobada.

CRABI es un prototipo exploratorio para hacer explícitos los supuestos y las fuentes de una planificación del cribado de cáncer de mama en España. Expone cómo varían los resultados aritméticos al cambiar la población de referencia, los supuestos de invitación/participación y el reparto temporal. No estima elegibilidad individual, capacidad asistencial, resultados clínicos ni efectos causales. La [presentación del proyecto](docs/PROYECTO_CRABI.md) detalla la pregunta científica.

## Módulos

- [Demo demográfica y escenario territorial](demo/index.html): compara 50–69 y 45–74 con población residente INE provisional de 1/10/2026. Incluye supuestos editables, sensibilidad y una tarjeta territorial que aplica solo los rangos documentados habilitados. Quedan bloqueados Andalucía, Aragón, Navarra y Ceuta según el corte de fuentes. [Reglas y validación](VALIDACION_TERRITORIAL_CRABI.md).
- [Indicadores observados](indicadores/index.html): tabla descriptiva filtrable con 30 de 42 observaciones auditadas. Conserva la fuente, periodo, definición, unidad y restricciones. No alimenta automáticamente el simulador. [Auditoría individual](VALIDACION_INDICADORES_OPERATIVOS.md).

Los datos agregados del INE y de Madrid, las reglas y los indicadores conservan atribución y procedencia. La base de indicadores es una investigación local; la reutilización pública de cada fuente y la licencia del código siguen pendientes de revisión. Materiales Red 2023 y ASPB/COVID no forman parte de esta carpeta. El [manifiesto anterior](MANIFIESTO_PUBLICACION_CRABI.md) describe una selección demográfica previa y no autoriza publicar la copia consolidada.

## Abrir el simulador

En Windows, extrae el ZIP completo si lo descargaste en ese formato. Abre la carpeta `demo` y haz doble clic en `index.html`. Los resultados se actualizan al cambiar un control. Para usar el simulador basta con un navegador. Consulta las [instrucciones de apertura](demo/README.md).

## Reproducir

Desde la raíz en Windows PowerShell, con Python 3 y Node.js disponibles:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\validar_crabi_completo.ps1
```

El script reconstruye snapshots y bundles desde insumos locales, valida indicadores, ejecuta robustez y pruebas, comprueba enlaces y escribe `VALIDACION_EJECUCION.log`. No descarga datos. Las interfaces pueden abrirse desde `demo/index.html` e `indicadores/index.html`; un navegador moderno carga sus datos locales.

## Estado y siguientes decisiones

Consulta [estado consolidado](ESTADO_CONSOLIDADO_CRABI.md), [auditoría de procedencia](AUDITORIA_ESTRUCTURA_LOCAL_CRABI.md), [validación integral](VALIDACION_INTEGRAL_CRABI.md) y [plan de publicación](PLAN_PUBLICACION_SIGUIENTE_VERSION.md). La revisión científica humana, la conciliación de fuentes discrepantes y los derechos de publicación siguen pendientes.
