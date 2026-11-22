import csv
import subprocess
import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "demo" / "data"


class PopulationSnapshotTests(unittest.TestCase):
    def read_snapshot(self, period):
        output = DATA / f"population_{period}.csv"
        with output.open(encoding="utf-8", newline="") as source:
            return list(csv.DictReader(source))

    def build_period(self, period):
        result = subprocess.run(
            [sys.executable, str(DATA / "build_population_snapshot.py"), "--period", period],
            check=True, capture_output=True, text=True,
        )
        self.assertIn("CCAA/cities=19", result.stdout)

    def test_latest_october_snapshot_reproduces_official_national_totals(self):
        self.build_period("2026-10")
        rows = self.read_snapshot("2026-10")
        self.assertEqual(len(rows), 20)
        regions, national = rows[:-1], rows[-1]
        self.assertEqual(national["territory"], "Total Nacional")
        self.assertEqual(national["reference_date"], "2026-10-01")
        self.assertEqual(len({row["code"] for row in regions}), 19)
        expected = {"45_49": 1_995_218, "50_69": 7_289_348, "70_74": 1_295_065}
        for band, value in expected.items():
            self.assertEqual(sum(int(row[band]) for row in regions), value)
            self.assertEqual(int(national[band]), value)

    def test_october_values_are_from_exact_october_reference_not_july(self):
        self.build_period("2026-07")
        july = self.read_snapshot("2026-07")[-1]
        self.build_period("2026-10")
        october = self.read_snapshot("2026-10")[-1]
        self.assertNotEqual(july["reference_date"], october["reference_date"])
        self.assertEqual(int(october["50_69"]) - int(july["50_69"]), 35_826)


if __name__ == "__main__":
    unittest.main()
