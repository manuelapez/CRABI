"""Aggregate a dated INE ECP age/sex/territory extract into CRABI bands."""
from __future__ import annotations

import argparse
import csv
from collections import defaultdict
from pathlib import Path

HERE = Path(__file__).resolve().parent
SOURCE = HERE / "ine_ecp_2026_mujeres_40_79_edad.csv"
PERIODS = {
    "2026-01": "1 de enero de 2026",
    "2026-07": "1 de julio de 2026",
    "2026-10": "1 de octubre de 2026",
}
DISPLAY_NAMES = {
    "01": "Andalucía", "02": "Aragón", "03": "Asturias",
    "04": "Illes Balears", "05": "Canarias", "06": "Cantabria",
    "07": "Castilla y León", "08": "Castilla-La Mancha",
    "09": "Cataluña", "10": "Comunitat Valenciana",
    "11": "Extremadura", "12": "Galicia", "13": "Comunidad de Madrid",
    "14": "Región de Murcia", "15": "Navarra", "16": "País Vasco",
    "17": "La Rioja", "18": "Ceuta", "19": "Melilla",
}
BANDS = {"45_49": range(45, 50), "50_69": range(50, 70), "70_74": range(70, 75)}


def build(period_key: str = "2026-10", output: Path | None = None) -> list[dict[str, str | int]]:
    if period_key not in PERIODS:
        raise ValueError(f"Unsupported reference period: {period_key}")
    period = PERIODS[period_key]
    output = output or HERE / f"population_{period_key}.csv"
    values: dict[str, dict[int, int]] = defaultdict(dict)
    with SOURCE.open(encoding="utf-8-sig", newline="") as source:
        for row in csv.DictReader(source):
            if row["periodo"] != period:
                continue
            age = int(row["edad"])
            if age not in range(45, 75):
                continue
            territory = row["territorio"]
            if age in values[territory]:
                raise ValueError(f"Duplicated source value: {territory}, age {age}")
            values[territory][age] = int(row["mujeres_residentes"])

    found_codes = {code for code in DISPLAY_NAMES if any(name.startswith(f"{code} ") for name in values)}
    if found_codes != set(DISPLAY_NAMES):
        raise ValueError(f"Expected 19 CCAA/cities, found codes: {sorted(found_codes)}")
    if set(values.get("Total Nacional", {})) != set(range(45, 75)):
        raise ValueError("INE national total must include every age from 45 to 74")

    rows: list[dict[str, str | int]] = []
    for code, display in DISPLAY_NAMES.items():
        source_name = next(name for name in values if name.startswith(f"{code} "))
        ages = values[source_name]
        if set(ages) != set(range(45, 75)):
            raise ValueError(f"Incomplete age coverage for {source_name}")
        row: dict[str, str | int] = {
            "code": code, "territory": display, "reference_date": f"{period_key}-01",
            "status": "provisional",
        }
        for band, ages_in_band in BANDS.items():
            row[band] = sum(ages[age] for age in ages_in_band)
        rows.append(row)

    national_ages = values["Total Nacional"]
    for band, ages_in_band in BANDS.items():
        national_value = sum(national_ages[age] for age in ages_in_band)
        territorial_sum = sum(int(row[band]) for row in rows)
        if territorial_sum != national_value:
            raise ValueError(f"{band}: territorial sum {territorial_sum} != INE national {national_value}")
    national = {
        "code": "00", "territory": "Total Nacional", "reference_date": f"{period_key}-01",
        "status": "provisional",
    }
    for band, ages_in_band in BANDS.items():
        national[band] = sum(national_ages[age] for age in ages_in_band)
    rows.append(national)

    with output.open("w", encoding="utf-8", newline="") as target:
        writer = csv.DictWriter(target, fieldnames=["code", "territory", "reference_date", "status", *BANDS])
        writer.writeheader()
        writer.writerows(rows)
    return rows


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--period", choices=PERIODS, default="2026-10")
    parser.add_argument("--output", type=Path)
    args = parser.parse_args()
    result = build(args.period, args.output)
    print(f"Wrote {len(result)} rows to {args.output or (HERE / f'population_{args.period}.csv')}; CCAA/cities=19; sums match INE national.")
