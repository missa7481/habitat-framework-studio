# Habitat Framework Studio

[Open the interactive website](https://missa7481.github.io/habitat-framework-studio/) · [Download the benchmark table](https://missa7481.github.io/habitat-framework-studio/aggregate-ranking.csv)

Explore how environmental data, Earth observation embeddings and spatial models affect held-out performance in global mosquito habitat research. The Overview compares 44 model configurations evaluated on the same 20 splits. In the retrospective five-category report-composition study, the environmental-shrinkage variant of HiCo-Fuse 2 had the lowest mean log loss. Its advantage was 1.36% over the 105-variable random forest and 0.35% over the forest with the same 117 source variables. Scientific interpretation depends on the outcome, metric and region held out.

Use the table to switch the evaluation design, metric or reference forest. The model designer, experiment registry, input-coverage map and broad-sector performance map are available from the navigation bar. The map panels describe input availability and held-out sector-level results.

## Open the website

Open [docs/index.html](docs/index.html) in a browser from a local checkout. To preview with a local HTTP server, run the following from this repository, then open `http://127.0.0.1:8000/`.

```sh
python -m http.server 8000 --bind 127.0.0.1 --directory docs
```

GitHub Pages serves the `/docs` directory on the `main` branch. Relative asset paths support the project URL and the offline copy.

## Reproduce the Overview

Run the following from the repository root with Python 3.9 or later. The script uses the standard library.

```sh
python scripts/build_overview_ranking.py
```

The script verifies the SHA-256 digest in the [replay receipt](research/overview/receipt.json), reads the [held-out aggregate split metrics](research/overview/fold-aggregates.csv) and regenerates both the interactive score data and the [downloadable table](docs/aggregate-ranking.csv). Each row in the snapshot gives the loss, ranking area and calibration error for one configuration and one evaluation split. Pooled results give the same weight to each split. A model enters a scope only when it has a score in every split in that scope.

The underlying scientific archive documents data sources, experimental protocols and other validation outcomes. [Research archive](https://github.com/missa7481/NASA_Global_Habitat_Mapping/tree/638702bbe096a77ceedc56fc88d6f90396022dfe/experiments)
