# Fuentes de datos incluidas

## INE ECP

Los CSV `ine_ecp_2026_mujeres_40_79_edad.csv` y `population_2026-*.csv` contienen conteos agregados de mujeres residentes de la tabla 59238 por edad simple, fecha y territorio. La fecha de referencia principal es 1/10/2026 (provisional); se incluyen enero/julio y snapshots de julio anterior para trazabilidad de revisiones. `build_demo_data.py` añade edades simples 40–79 por territorio al archivo de datos del navegador para poder sumar rangos publicados sin aproximar bandas parciales.

**Atribución:** Elaboración propia con datos extraídos del sitio web del INE, Estadística Continua de Población, tabla 59238; descarga consultada el 22/11/2026. La licencia general de la información estadística del INE es CC BY 4.0 salvo indicación distinta. Fuente: [tabla 59238](https://www.ine.es/jaxiT3/Tabla.htm?L=0&t=59238), [ECP 1/10/2026](https://www.ine.es/dyngs/Prensa/ECP3T26.htm), [aviso legal y condiciones de reutilización](https://www.ine.es/aviso_legal/).

SHA-256 extracto actual: `dd82bf372ab762abf4b816218f0af79875d014cbef7a5b4e15db8a3d207ada96`. La reducción conserva solo edades 40–79 para mujeres y los tres cortes documentados; la fuente completa no se redistribuye.

## Comunidad de Madrid

`madrid_context_2025_ccaa.csv` es una agregación regional desde el conjunto del portal de datos abiertos [Población censada por edad, nacionalidad y sexo. Censo anual. Municipios](https://datos.comunidad.madrid/dataset/poblacion_censada_por_edad_nacionalidad_y_sexo). La ficha indica fecha de referencia 1 de enero, fuente Censo de Población Anual del INE y licencia Creative Commons Atribución 4.0. La fila regional agrega 179 municipios y se usa solo como contexto, separada del denominador ECP 2026.

## Límites y materiales excluidos

Residentes no significa elegibles, invitadas o participantes. No se incluye el archivo derivado Red 2023: su autorización de redistribución no está verificada. El módulo COVID y toda cifra/salida derivada ASPB están excluidos de esta selección hasta aclarar los derechos. No hay microdatos personales ni clínicos en los CSV incluidos.

## Reconstrucción

Desde la raíz de la selección:

```powershell
python demo/data/build_population_snapshot.py --period 2026-10
python demo/data/build_demo_data.py
```
