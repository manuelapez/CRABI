# Reproducir la selección demográfica

## Entorno probado

Windows, Python 3.13.15 y Node.js 24.22.3. El motor de interfaz solo usa archivos locales. No hay descargas automáticas ni librerías externas requeridas para construir los snapshots/análisis.

## Comandos

Desde la raíz del paquete:

```powershell
python demo/data/build_population_snapshot.py --period 2026-01
python demo/data/build_population_snapshot.py --period 2026-07
python demo/data/build_population_snapshot.py --period 2026-10
python demo/data/build_demo_data.py
python analisis/robustez_demografica.py
node --test tests/demo-model.test.cjs
python -m unittest discover -s tests -v
```

El agregador toma el extracto INE reducido versionado; no usa la descarga completa durante el proceso. El script de robustez independiente agrega la fuente desde edades simples, recrea rejillas, contrasta el motor demográfico JavaScript y escribe únicamente salidas demográficas.

## Entradas y atribución

Consulte [`demo/data/README.md`](../demo/data/README.md). SHA-256: extracto INE actual `dd82bf372ab762abf4b816218f0af79875d014cbef7a5b4e15db8a3d207ada96`; extracto previo de julio `b274d3b306ccc3d8e08cecb8ae63021cf157b7a35c7f6f33e3ee745538c309d4`; snapshot julio previo `163a284da00e72de1b41990a10ce04cc76b4e1ab2c89d9b7cdf1450995a5ec03`.

Los resultados no deben interpretarse como elegibilidad, demanda clínica o capacidad.
