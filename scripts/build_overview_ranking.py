"""Rebuild the GitHub Pages leaderboard from the bundled aggregate split metrics."""

import csv
import hashlib
import json
import math
from collections import Counter, defaultdict
from pathlib import Path
from statistics import fmean

SITE = Path(__file__).resolve().parents[1]
PLAIN = "RF"
MATCHED = "RF+pool4-control"
RELEASED = "HF2-shrink2+pool4"
DESIGNS = {"block10": ("Spatial blocks", 5), "env": ("Environmental clusters", 5),
           "loro": ("Entire regions held out", 6), "zone": ("Climate zones", 4)}
NAMES = {
    PLAIN: "Random forest · 105 local features",
    MATCHED: "Random forest · 105 local + 12 historical features",
    RELEASED: "HiCo-Fuse 2 · dual shrinkage + expanded historical pool",
    "HF2-shrink+pool4": "HiCo-Fuse 2 · environmental shrinkage + expanded historical pool",
    "HF2+pool4": "HiCo-Fuse 2 · expanded historical pool",
    "HF2-shrinkP+pool4": "HiCo-Fuse 2 · historical shrinkage + expanded historical pool",
    "HF2-cal": "HiCo-Fuse 2 · regional calibration only",
    "HF2": "HiCo-Fuse 2 · Aedes historical pool",
    "HF2-shrink": "HiCo-Fuse 2 · environmental shrinkage + Aedes pool",
    "HF2-shrink2": "HiCo-Fuse 2 · dual shrinkage + Aedes pool",
    "HF2-shrinkP": "HiCo-Fuse 2 · historical shrinkage + Aedes pool",
    "RF+Recon": "Random forest · regional reconciliation",
    "Baseline: MLP+Coords": "Multilayer perceptron with coordinates",
    "Invariance: V-REx l=10": "Variance risk extrapolation · penalty 10",
    "Pool control: RF +pool": "Random forest · earlier historical pool control",
}


def read_aggregates():
    folder = SITE / "research/overview"
    folds = folder / "fold-aggregates.csv"
    receipt = json.loads((folder / "receipt.json").read_text(encoding="utf-8"))
    digest = hashlib.sha256(folds.read_bytes().replace(b"\r\n", b"\n")).hexdigest()
    if digest != receipt["sha256"]:
        raise ValueError("The aggregate snapshot checksum differs from the receipt.")

    records, sources = defaultdict(dict), {}
    with folds.open(encoding="utf-8", newline="") as stream:
        for row in csv.DictReader(stream):
            arm = row["configuration"]
            key = row["design"], row["split"]
            if key in records[arm]:
                raise ValueError(f"Duplicate aggregate for {arm} on {key}")
            metrics = {m: float(row[m]) for m in ("nll", "auc", "ece")}
            if not all(math.isfinite(x) for x in metrics.values()):
                raise ValueError(f"Nonfinite metric for {arm} on {key}")
            records[arm][key] = metrics
            sources[arm] = row["evidence"]
    expected = set(records[PLAIN])
    if Counter(d for d, _ in expected) != {d: n for d, (_, n) in DESIGNS.items()}:
        raise ValueError("The reference forest does not cover the registered splits.")
    if set(records[MATCHED]) != expected or set(records[RELEASED]) != expected:
        raise ValueError("Missing registered splits for a reference or release.")
    if any(not set(scores) <= expected for scores in records.values()):
        raise ValueError("The snapshot contains an unregistered split.")
    return records, sources, receipt["registry"], receipt["audit"]


def ranking(records, sources, design):
    keys = sorted(k for k in records[PLAIN] if design == "all" or k[0] == design)
    eligible = [a for a, v in records.items() if all(k in v for k in keys)]
    rows = []
    for arm in eligible:
        scores = records[arm]
        means = {m: fmean(scores[k][m] for k in keys) for m in ("nll", "auc", "ece")}
        rows.append({"arm": arm, "label": NAMES.get(arm, arm.replace("HF2", "HiCo-Fuse 2")), **means, "source": sources[arm],
                     **{name: sum(scores[k]["nll"] < records[ref][k]["nll"] - 1e-9 for k in keys)
                        for name, ref in (("winsPlain", PLAIN), ("winsMatched", MATCHED))}})
    rows.sort(key=lambda r: (r["nll"], r["arm"]))
    result = {"id": design, "label": "All 20 held-out splits" if design == "all" else DESIGNS[design][0],
              "folds": len(keys), "rows": rows}
    if design == "all":
        means = {arm: fmean(fmean(records[arm][k]["nll"] for k in keys if k[0] == d)
                            for d in DESIGNS) for arm in eligible}
        best = min(means, key=means.get)
        result["designBalanced"] = {"arm": best, "label": NAMES.get(best, best.replace("HF2", "HiCo-Fuse 2")), "nll": means[best],
                                    "gainVsMatched": 100 * (1 - means[best] / means[MATCHED])}
        pooled_winner = rows[0]["arm"]
        omission = []
        for design_id, (label, _) in DESIGNS.items():
            kept = [k for k in keys if k[0] != design_id]
            paired_ratio = (sum(records[pooled_winner][k]["nll"] for k in kept)
                            / sum(records[MATCHED][k]["nll"] for k in kept))
            omission.append({"omitted": label, "relativeGain": 100 * (1-paired_ratio)})
        result["omitOneDesign"] = omission
    return result


def publish():
    records, sources, registry, metadata = read_aggregates()
    scopes = [ranking(records, sources, d) for d in ("all", *DESIGNS)]
    out = {"plain": PLAIN, "matched": MATCHED, "released": RELEASED, "scopes": scopes, "registry": registry, "audit": metadata}
    dist = SITE / "docs"
    text = json.dumps(out, ensure_ascii=False, allow_nan=False, separators=(",", ":"))
    (dist / "overview-results.js").write_text("window.OVERVIEW_RESULTS = " + text + ";\n", encoding="utf-8")
    with (dist / "aggregate-ranking.csv").open("w", encoding="utf-8", newline="") as stream:
        writer = csv.writer(stream)
        writer.writerow(["scope","held_out_splits","configuration","label","loss","area_under_roc_curve","calibration_error",
                         "loss_reduction_pct_vs_105_forest","loss_reduction_pct_vs_117_forest","fold_wins_vs_117_forest","evidence"])
        for scope in scopes:
            index = {r["arm"]: r for r in scope["rows"]}
            for r in scope["rows"]:
                writer.writerow([scope["id"],scope["folds"],r["arm"],r["label"],r["nll"],r["auc"],r["ece"],
                                 *(100*(1-r["nll"]/index[ref]["nll"]) for ref in (PLAIN,MATCHED)),r["winsMatched"],r["source"]])
    for s in scopes:
        r = s["rows"][0]
        print(s["id"], len(s["rows"]), r["arm"], f'{r["nll"]:.8f}')


if __name__ == "__main__":
    publish()
