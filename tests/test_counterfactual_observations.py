import csv
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


class CounterfactualObservationTests(unittest.TestCase):
    def test_reference_gap_and_participation_transcriptions(self):
        with (ROOT / "contrafactual" / "observaciones_barcelona_contrafactual_2018_2024.csv").open(encoding="utf-8", newline="") as source:
            rows = {int(row["anio"]): row for row in csv.DictReader(source)}
        self.assertEqual(rows[2018]["invitadas_n"], "97299")
        self.assertEqual(rows[2020]["invitadas_n"], "47659")
        self.assertEqual(int(rows[2018]["invitadas_n"]) - int(rows[2020]["invitadas_n"]), 49_640)
        for year in (2018, 2019, 2020, 2021, 2022, 2024):
            row = rows[year]
            actual = 100 * int(row["participaron_n"]) / int(row["invitadas_n"])
            self.assertAlmostEqual(actual, float(row["participacion_pct"]), delta=0.06)
        self.assertEqual(rows[2023]["invitadas_n"], "")
        self.assertEqual(rows[2023]["participacion_pct"], "50.4")
        self.assertIn("no comparable", rows[2022]["uso_en_modelo"])


if __name__ == "__main__":
    unittest.main()
