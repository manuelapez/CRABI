import csv
import json
import subprocess
import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RULES = ROOT / "datos_territoriales" / "reglas_cribado_2026-11.csv"
AGE_DATA = ROOT / "demo" / "data" / "ine_ecp_2026_mujeres_40_79_edad.csv"


class TerritorialRuleTests(unittest.TestCase):
    def test_exactly_19_unique_territories_with_explicit_missing_rules(self):
        with RULES.open(encoding="utf-8", newline="") as source:
            rows = list(csv.DictReader(source))
        self.assertEqual(len(rows), 19)
        codes = {row["codigo_territorio"] for row in rows}
        self.assertEqual(codes, {f"{n:02d}" for n in range(1, 20)})
        self.assertEqual(len({row["territorio"] for row in rows}), 19)
        missing_published = {row["codigo_territorio"] for row in rows if not row["edad_min_general"]}
        self.assertEqual(missing_published, {"18"})
        disabled = {row["codigo_territorio"] for row in rows if row["uso_escenario"] == "no"}
        self.assertEqual(disabled, {"01", "02", "15", "18"})
        for row in rows:
            self.assertTrue(row["fuente_oficial"].startswith("https://"))
            self.assertIn("fuente_periodicidad", row)
            self.assertEqual(row["fecha_consulta"], "2026-11-22")
            if row["fuente_periodicidad"]:
                self.assertTrue(row["fuente_periodicidad"].startswith("https://"))
            if row["edad_min_general"]:
                self.assertGreaterEqual(int(row["edad_min_general"]), 40)
                self.assertLessEqual(int(row["edad_max_general"]), 79)
            if row["uso_escenario"] == "si":
                self.assertTrue(row["edad_min_escenario"])
                self.assertTrue(row["estado_vigencia"])
            else:
                self.assertEqual(row["edad_min_escenario"], "")
        balear = next(row for row in rows if row["codigo_territorio"] == "04")
        self.assertEqual((balear["edad_min_escenario"], balear["edad_max_escenario"]), ("45", "74"))
        valencian = next(row for row in rows if row["codigo_territorio"] == "10")
        self.assertEqual((valencian["edad_min_escenario"], valencian["edad_max_escenario"]), ("45", "69"))
        self.assertIn("circular", next(row for row in rows if row["codigo_territorio"] == "03")["ampliacion_anunciada"].lower())

    def test_age_counts_and_territorial_rules_are_packed_for_browser(self):
        subprocess.run([sys.executable, str(ROOT / "demo/data/build_demo_data.py")], check=True)
        result = subprocess.run(
            ["node", "-e", "process.stdout.write(JSON.stringify(require('./demo/data.js')))"],
            cwd=ROOT, check=True, capture_output=True, text=True,
        )
        data = json.loads(result.stdout)
        self.assertEqual(len(data["territories"]), 19)
        self.assertEqual(data["territorialRulesCutoff"], "2026-11-22")
        for territory in data["territories"]:
            self.assertEqual(len(territory["ageCounts"]), 40)
            self.assertTrue(territory["screeningRule"]["fuente_oficial"].startswith("https://"))
        ceuta = next(row for row in data["territories"] if row["code"] == "18")
        self.assertEqual(ceuta["screeningRule"]["edad_min_general"], "")
        asturias = next(row for row in data["territories"] if row["code"] == "03")["screeningRule"]
        self.assertEqual((asturias["edad_min_escenario"], asturias["edad_max_escenario"]), ("50", "72"))
        self.assertIn("2027", asturias["ampliacion_anunciada"])
        basque = next(row for row in data["territories"] if row["code"] == "16")["screeningRule"]
        self.assertEqual((basque["edad_min_escenario"], basque["edad_max_escenario"]), ("48", "69"))

    def test_regional_population_sum_uses_inclusive_single_year_ages(self):
        with AGE_DATA.open(encoding="utf-8-sig", newline="") as source:
            rows = list(csv.DictReader(source))
        with (ROOT / "demo/data/population_2026-10.csv").open(encoding="utf-8", newline="") as source:
            snapshot = {row["code"]: row for row in csv.DictReader(source)}
        for territory in range(1, 20):
            code = f"{territory:02d}"
            source_ages = {
                int(row["edad"]): int(row["mujeres_residentes"])
                for row in rows
                if row["periodo"] == "1 de octubre de 2026"
                and row["territorio"].startswith(code + " ")
            }
            self.assertEqual(len(source_ages), 40)
            self.assertEqual(sum(source_ages[n] for n in range(50, 70)), int(snapshot[code]["50_69"]))
            self.assertEqual(
                sum(source_ages[n] for n in range(45, 75)),
                int(snapshot[code]["45_49"]) + int(snapshot[code]["50_69"]) + int(snapshot[code]["70_74"]),
            )


if __name__ == "__main__":
    unittest.main()
