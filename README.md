# CRABI — selección demográfica para revisión pública

**Corte de datos y documentación: 22 de noviembre de 2026. Demo demográfica v0.2.** Este repositorio publica una selección controlada centrada en la demo demográfica; no incorpora tasas Red 2023 ni materiales ASPB en esta selección.

## Estado de derechos y validación

CRABI **no se declara open source**: aún no se ha aprobado una licencia para el código original. La publicación de esta copia no debe interpretarse como permiso de reutilización. Véase la [propuesta deliberativa de licencia](PROPUESTA_LICENCIA.md).

La selección usa datos agregados del INE y del portal de datos abiertos de la Comunidad de Madrid, ambos publicados con CC BY 4.0; la [documentación de fuentes](docs/FUENTES_Y_METODOLOGIA.md) contiene la atribución, fecha y condiciones consultadas. No se incluyen tasas Red 2023 ni datos, transcripciones o transformaciones ASPB. El listado exacto y los motivos están en el [manifiesto de publicación](MANIFIESTO_PUBLICACION_CRABI.md).

La demo es exploratoria: residentes no equivale a elegibles o invitadas; no estima capacidad, resultados clínicos ni efectos causales. La revisión externa humana y la validación clínica/operativa están pendientes.

Para conocer la pregunta que aborda el proyecto, su planteamiento y sus límites, consulta la [presentación de CRABI](docs/PROYECTO_CRABI.md).

## Qué incluye

- Simulador demográfico para escenarios 50–69 y 45–74.
- Supuestos editables de fracción invitada, participación, seguimiento y pesos temporales.
- Extractos y agregados INE por fecha, edad y territorio; contexto regional de Madrid 2025.
- Sensibilidades demográficas reproducibles y comprobación independiente Python/JavaScript.
- Pruebas de datos y motor demográfico.

En la rama preparada se retiraron siete archivos preexistentes de documentación y del módulo COVID. Sus copias se preservaron en un archivo local fuera del repositorio; no forman parte de esta publicación. La retirada no cambia los términos de derechos de terceros ni implica una licencia para esos materiales.

## Abrir y reproducir

Abre `demo/index.html` en un navegador moderno. Para reconstruir los agregados desde los extractos incluidos, ejecuta desde la raíz de esta selección:

```powershell
python demo/data/build_population_snapshot.py --period 2026-01
python demo/data/build_population_snapshot.py --period 2026-07
python demo/data/build_population_snapshot.py --period 2026-10
python demo/data/build_demo_data.py
python analisis/robustez_demografica.py
```

El análisis usa Python estándar y Node.js. La [guía reproducible](docs/RESULTADOS_REPRODUCIBLES_DEMOGRAFIA.md) explica fórmulas, archivos y entorno. No hay descarga automática.

## Resultados principales

INE ECP al 1/10/2026 (provisional): 7.289.348 mujeres residentes de 50–69; 10.579.631 de 45–74. La ampliación añade 3.290.283 residentes (+45,138% frente a 50–69). Al 100% invitado y 60% de participación hipotética, 50–69 produce 4.373.608,8 pruebas aritméticamente esperadas. Ninguna cifra mide elegibilidad real.

En el extracto de comprobación demográfica Python/JavaScript, las **952 comparaciones demográficas** pasaron. No son validación estadística externa. Las rejillas son escenarios deterministas, no intervalos de incertidumbre.

## Contribuir

Consulta [CONTRIBUTING.md](CONTRIBUTING.md). No incluyas datos personales o sanitarios, credenciales ni fuentes de terceros sin condiciones de uso verificadas.
