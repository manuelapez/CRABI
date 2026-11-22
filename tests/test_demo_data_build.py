import csv
import subprocess
import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "demo" / "data"


class DemoDataBuildTests(unittest.TestCase):
    def test_demo_data_builder_uses_latest_snapshot_and_no_unlicensed_red_values(self):
        subprocess.run([sys.executable, str(DATA / "build_demo_data.py")], check=True, capture_output=True)
        result = subprocess.run(
            ["node", "-e", "const d=require('./demo/data.js'); if(d.referenceDateISO!=='2026-10-01'||d.territories.length!==19||d.territories.some(x=>'rate' in x)) process.exit(1);"],
            cwd=ROOT, check=False,
        )
        self.assertEqual(result.returncode, 0)

    def test_official_source_extract_covers_october_and_revisable_july(self):
        source = DATA / "ine_ecp_2026_mujeres_40_79_edad.csv"
        with source.open(encoding="utf-8", newline="") as f:
            rows = list(csv.DictReader(f))
        self.assertEqual(len(rows), 2400)
        self.assertEqual({row["periodo"] for row in rows}, {
            "1 de enero de 2026", "1 de julio de 2026", "1 de octubre de 2026",
        })
        self.assertEqual(len({(r["periodo"], r["territorio"], r["edad"]) for r in rows}), 2400)


if __name__ == "__main__":
    unittest.main()
