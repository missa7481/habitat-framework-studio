window.FRAMEWORK_EVIDENCE = {
  "version": 1,
  "commit": "638702bbe096a77ceedc56fc88d6f90396022dfe",
  "studies": [
    {
      "id": "macro-primary",
      "title": "Broad-area reporting · primary partition",
      "endpoint": "Asian tiger mosquito share among recorded mosquito reports",
      "protocol": "Six held-out sectors using a 0° origin. Each sector contributes equally after weighting its loss by report count.",
      "metric": "Negative log likelihood",
      "direction": "lower",
      "units": "nats per report",
      "source": "https://github.com/missa7481/NASA_Global_Habitat_Mapping/blob/638702bbe096a77ceedc56fc88d6f90396022dfe/experiments/transfer/rsi_macro/summary.csv",
      "baselineId": "logistic-fused",
      "rows": [
        {
          "id": "additive-spline",
          "label": "Additive spline",
          "data": "Climate + terrain",
          "representation": "Splines of climate and terrain components",
          "spatial": "No explicit spatial term",
          "learner": "Logistic regression",
          "value": 0.6041287521839686
        },
        {
          "id": "all-family-rsi-cycle-1",
          "label": "All-family recursive selection cycle 1",
          "data": "Varies by inner-fold selection",
          "representation": "Varies by inner-fold selection",
          "spatial": "Varies by inner-fold selection",
          "learner": "Nested model selection",
          "value": 0.45224101816091533
        },
        {
          "id": "all-family-rsi-cycle-2",
          "label": "All-family recursive selection cycle 2",
          "data": "Varies by inner-fold selection",
          "representation": "Varies by inner-fold selection",
          "spatial": "Varies by inner-fold selection",
          "learner": "Nested model selection",
          "value": 0.4224611146695309
        },
        {
          "id": "all-family-conventional-selector",
          "label": "All-family conventional selector",
          "data": "Varies by inner-fold selection",
          "representation": "Varies by inner-fold selection",
          "spatial": "Varies by inner-fold selection",
          "learner": "Nested model selection",
          "value": 0.46225195684205184
        },
        {
          "id": "beta-binomial-earth-pcs",
          "label": "Beta-binomial Earth components",
          "data": "AlphaEarth",
          "representation": "Embedding mean and spread components",
          "spatial": "No explicit spatial term",
          "learner": "Beta-binomial regression",
          "value": 0.4497275279121264
        },
        {
          "id": "beta-binomial-fused-means",
          "label": "Beta-binomial fused means",
          "data": "Climate + terrain + AlphaEarth",
          "representation": "Concatenated mean components",
          "spatial": "No explicit spatial term",
          "learner": "Beta-binomial regression",
          "value": 0.43722629971898536
        },
        {
          "id": "beta-binomial-fused-multiscale",
          "label": "Beta-binomial fused multiscale",
          "data": "Climate + terrain + AlphaEarth",
          "representation": "Multiscale components",
          "spatial": "No explicit spatial term",
          "learner": "Beta-binomial regression",
          "value": 0.42590389002200396
        },
        {
          "id": "beta-binomial-physical-pcs",
          "label": "Beta-binomial physical components",
          "data": "Climate + terrain",
          "representation": "Principal components",
          "spatial": "No explicit spatial term",
          "learner": "Beta-binomial regression",
          "value": 0.5310977739411348
        },
        {
          "id": "binomial-fused-multiscale",
          "label": "Binomial fused multiscale",
          "data": "Climate + terrain + AlphaEarth",
          "representation": "Multiscale components",
          "spatial": "No explicit spatial term",
          "learner": "Binomial regression",
          "value": 0.46077568836946314
        },
        {
          "id": "binomial-physical-pcs",
          "label": "Binomial physical components",
          "data": "Climate + terrain",
          "representation": "Principal components",
          "spatial": "No explicit spatial term",
          "learner": "Binomial regression",
          "value": 0.5449503934507316
        },
        {
          "id": "boosted-fused",
          "label": "Boosted trees · fused inputs",
          "data": "Climate + terrain + AlphaEarth",
          "representation": "Concatenated means and spread",
          "spatial": "No explicit spatial term",
          "learner": "Boosted trees",
          "value": 0.4929435803046818
        },
        {
          "id": "boosted-physical",
          "label": "Boosted trees · physical inputs",
          "data": "Climate + terrain",
          "representation": "Explicit variables",
          "spatial": "No explicit spatial term",
          "learner": "Boosted trees",
          "value": 0.5226798326450354
        },
        {
          "id": "complementary-spatial-fusion",
          "label": "Complementary spatial fusion",
          "data": "Climate + terrain + AlphaEarth",
          "representation": "Conditional embedding fusion",
          "spatial": "Spherical basis",
          "learner": "Beta-binomial regression",
          "value": 0.4072673522504209
        },
        {
          "id": "fda-r",
          "label": "Flexible discriminant analysis · R",
          "data": "Climate + terrain",
          "representation": "Explicit variables",
          "spatial": "No explicit spatial term",
          "learner": "Flexible discriminant analysis",
          "value": 0.5827802376929534
        },
        {
          "id": "forest-fused",
          "label": "Random forest · fused inputs",
          "data": "Climate + terrain + AlphaEarth",
          "representation": "Concatenated means and spread",
          "spatial": "No explicit spatial term",
          "learner": "Random forest",
          "value": 0.47319125888869246
        },
        {
          "id": "forest-physical",
          "label": "Random forest · physical inputs",
          "data": "Climate + terrain",
          "representation": "Explicit variables",
          "spatial": "No explicit spatial term",
          "learner": "Random forest",
          "value": 0.5143551765201493
        },
        {
          "id": "gam-mgcv",
          "label": "Generalized additive model · R",
          "data": "Climate + terrain",
          "representation": "Explicit variables",
          "spatial": "No explicit spatial term",
          "learner": "Generalized additive model",
          "value": 0.5946909666506679
        },
        {
          "id": "glm-r",
          "label": "Generalized linear model · R",
          "data": "Climate + terrain",
          "representation": "Explicit variables",
          "spatial": "No explicit spatial term",
          "learner": "Generalized linear model",
          "value": 0.6287522060209012
        },
        {
          "id": "inner-selected-conventional",
          "label": "Inner-selected conventional",
          "data": "Varies by inner-fold selection",
          "representation": "Varies by inner-fold selection",
          "spatial": "Varies by inner-fold selection",
          "learner": "Nested model selection",
          "value": 0.43562758084378594
        },
        {
          "id": "late-fusion-25-earth",
          "label": "Late fusion 25% Earth",
          "data": "Climate + terrain + AlphaEarth",
          "representation": "Late fusion 25% embedding",
          "spatial": "No explicit spatial term",
          "learner": "Mixture of beta-binomial predictions",
          "value": 0.49061002797803943
        },
        {
          "id": "late-fusion-50-earth",
          "label": "Late fusion 50% Earth",
          "data": "Climate + terrain + AlphaEarth",
          "representation": "Late fusion 50% embedding",
          "spatial": "No explicit spatial term",
          "learner": "Mixture of beta-binomial predictions",
          "value": 0.4674097999009586
        },
        {
          "id": "late-fusion-75-earth",
          "label": "Late fusion 75% Earth",
          "data": "Climate + terrain + AlphaEarth",
          "representation": "Late fusion 75% embedding",
          "spatial": "No explicit spatial term",
          "learner": "Mixture of beta-binomial predictions",
          "value": 0.45377552346062
        },
        {
          "id": "logistic-fused",
          "label": "Logistic regression · fused inputs",
          "data": "Climate + terrain + AlphaEarth",
          "representation": "Concatenated means and spread",
          "spatial": "No explicit spatial term",
          "learner": "Logistic regression",
          "value": 0.43562758084378594
        },
        {
          "id": "logistic-physical",
          "label": "Logistic regression · physical inputs",
          "data": "Climate + terrain",
          "representation": "Explicit variables",
          "spatial": "No explicit spatial term",
          "learner": "Logistic regression",
          "value": 0.5580511770807633
        },
        {
          "id": "mars-r",
          "label": "Adaptive regression splines · R",
          "data": "Climate + terrain",
          "representation": "Explicit variables",
          "spatial": "No explicit spatial term",
          "learner": "Adaptive regression splines",
          "value": 0.6482082999115552
        },
        {
          "id": "maxent-ipp-lq",
          "label": "Maximum entropy · Python",
          "data": "Climate + terrain",
          "representation": "Linear and quadratic terms",
          "spatial": "No explicit spatial term",
          "learner": "Maximum entropy",
          "value": 0.5443392977471847
        },
        {
          "id": "maxent-java-lq",
          "label": "Maximum entropy · Java",
          "data": "Climate + terrain",
          "representation": "Linear and quadratic terms",
          "spatial": "No explicit spatial term",
          "learner": "Maximum entropy",
          "value": 0.5237434590972946
        },
        {
          "id": "maxnet-r-lq",
          "label": "Maximum entropy · R MaxNet",
          "data": "Climate + terrain",
          "representation": "Linear and quadratic terms",
          "spatial": "No explicit spatial term",
          "learner": "MaxNet",
          "value": 0.5380549445940266
        },
        {
          "id": "prior",
          "label": "Pooled reference",
          "data": "Report totals",
          "representation": "Intercept",
          "spatial": "No explicit spatial term",
          "learner": "Constant share",
          "value": 0.5196581724307047
        },
        {
          "id": "rf-r",
          "label": "Random forest · R",
          "data": "Climate + terrain",
          "representation": "Explicit variables",
          "spatial": "No explicit spatial term",
          "learner": "Random forest",
          "value": 0.5715138527700906
        },
        {
          "id": "rsi-cycle-1",
          "label": "Recursive selection cycle 1",
          "data": "Varies by inner-fold selection",
          "representation": "Varies by inner-fold selection",
          "spatial": "Varies by inner-fold selection",
          "learner": "Nested model selection",
          "value": 0.42561664216264944
        },
        {
          "id": "rsi-cycle-2",
          "label": "Recursive selection cycle 2",
          "data": "Varies by inner-fold selection",
          "representation": "Varies by inner-fold selection",
          "spatial": "Varies by inner-fold selection",
          "learner": "Nested model selection",
          "value": 0.4224611146695309
        },
        {
          "id": "spatial-beta-binomial",
          "label": "Spatial beta-binomial",
          "data": "Climate + terrain + AlphaEarth",
          "representation": "Multiscale components",
          "spatial": "Spherical basis",
          "learner": "Beta-binomial regression",
          "value": 0.4103403484684864
        },
        {
          "id": "xgboost-r",
          "label": "Gradient-boosted trees · R",
          "data": "Climate + terrain",
          "representation": "Explicit variables",
          "spatial": "No explicit spatial term",
          "learner": "Gradient-boosted trees",
          "value": 0.5478873573819876
        }
      ],
      "note": "The fixed fusion candidate was nominated after comparing outer results. The prespecified selector won three of six primary sectors and tied once. The rule required four strict wins. The two partitions reuse the same reporting tiles.",
      "cohort": "17,159 reports in 113 broad tiles, 2022–2025",
      "promoted": false,
      "additionalSource": "https://github.com/missa7481/NASA_Global_Habitat_Mapping/blob/638702bbe096a77ceedc56fc88d6f90396022dfe/experiments/transfer/rsi_macro/evaluation.json"
    },
    {
      "id": "macro-rotated",
      "title": "Broad-area reporting · shifted partition",
      "endpoint": "Asian tiger mosquito share among recorded mosquito reports",
      "protocol": "Six held-out sectors using a 24° origin. Each sector contributes equally after weighting its loss by report count.",
      "metric": "Negative log likelihood",
      "direction": "lower",
      "units": "nats per report",
      "source": "https://github.com/missa7481/NASA_Global_Habitat_Mapping/blob/638702bbe096a77ceedc56fc88d6f90396022dfe/experiments/transfer/rsi_macro/summary.csv",
      "baselineId": "logistic-fused",
      "rows": [
        {
          "id": "additive-spline",
          "label": "Additive spline",
          "data": "Climate + terrain",
          "representation": "Splines of climate and terrain components",
          "spatial": "No explicit spatial term",
          "learner": "Logistic regression",
          "value": 0.5490759067278689
        },
        {
          "id": "all-family-rsi-cycle-1",
          "label": "All-family recursive selection cycle 1",
          "data": "Varies by inner-fold selection",
          "representation": "Varies by inner-fold selection",
          "spatial": "Varies by inner-fold selection",
          "learner": "Nested model selection",
          "value": 0.39251405210593066
        },
        {
          "id": "all-family-rsi-cycle-2",
          "label": "All-family recursive selection cycle 2",
          "data": "Varies by inner-fold selection",
          "representation": "Varies by inner-fold selection",
          "spatial": "Varies by inner-fold selection",
          "learner": "Nested model selection",
          "value": 0.35563688740032245
        },
        {
          "id": "all-family-conventional-selector",
          "label": "All-family conventional selector",
          "data": "Varies by inner-fold selection",
          "representation": "Varies by inner-fold selection",
          "spatial": "Varies by inner-fold selection",
          "learner": "Nested model selection",
          "value": 0.3998126253737457
        },
        {
          "id": "beta-binomial-earth-pcs",
          "label": "Beta-binomial Earth components",
          "data": "AlphaEarth",
          "representation": "Embedding mean and spread components",
          "spatial": "No explicit spatial term",
          "learner": "Beta-binomial regression",
          "value": 0.4038609551609984
        },
        {
          "id": "beta-binomial-fused-means",
          "label": "Beta-binomial fused means",
          "data": "Climate + terrain + AlphaEarth",
          "representation": "Concatenated mean components",
          "spatial": "No explicit spatial term",
          "learner": "Beta-binomial regression",
          "value": 0.3971283613745695
        },
        {
          "id": "beta-binomial-fused-multiscale",
          "label": "Beta-binomial fused multiscale",
          "data": "Climate + terrain + AlphaEarth",
          "representation": "Multiscale components",
          "spatial": "No explicit spatial term",
          "learner": "Beta-binomial regression",
          "value": 0.3926753333281472
        },
        {
          "id": "beta-binomial-physical-pcs",
          "label": "Beta-binomial physical components",
          "data": "Climate + terrain",
          "representation": "Principal components",
          "spatial": "No explicit spatial term",
          "learner": "Beta-binomial regression",
          "value": 0.537399191917262
        },
        {
          "id": "binomial-fused-multiscale",
          "label": "Binomial fused multiscale",
          "data": "Climate + terrain + AlphaEarth",
          "representation": "Multiscale components",
          "spatial": "No explicit spatial term",
          "learner": "Binomial regression",
          "value": 0.4287822771006689
        },
        {
          "id": "binomial-physical-pcs",
          "label": "Binomial physical components",
          "data": "Climate + terrain",
          "representation": "Principal components",
          "spatial": "No explicit spatial term",
          "learner": "Binomial regression",
          "value": 0.514817172042238
        },
        {
          "id": "boosted-fused",
          "label": "Boosted trees · fused inputs",
          "data": "Climate + terrain + AlphaEarth",
          "representation": "Concatenated means and spread",
          "spatial": "No explicit spatial term",
          "learner": "Boosted trees",
          "value": 0.49663366204011566
        },
        {
          "id": "boosted-physical",
          "label": "Boosted trees · physical inputs",
          "data": "Climate + terrain",
          "representation": "Explicit variables",
          "spatial": "No explicit spatial term",
          "learner": "Boosted trees",
          "value": 0.5793233377579956
        },
        {
          "id": "complementary-spatial-fusion",
          "label": "Complementary spatial fusion",
          "data": "Climate + terrain + AlphaEarth",
          "representation": "Conditional embedding fusion",
          "spatial": "Spherical basis",
          "learner": "Beta-binomial regression",
          "value": 0.35563688740032245
        },
        {
          "id": "fda-r",
          "label": "Flexible discriminant analysis · R",
          "data": "Climate + terrain",
          "representation": "Explicit variables",
          "spatial": "No explicit spatial term",
          "learner": "Flexible discriminant analysis",
          "value": 0.5456910756700885
        },
        {
          "id": "forest-fused",
          "label": "Random forest · fused inputs",
          "data": "Climate + terrain + AlphaEarth",
          "representation": "Concatenated means and spread",
          "spatial": "No explicit spatial term",
          "learner": "Random forest",
          "value": 0.43330481751110733
        },
        {
          "id": "forest-physical",
          "label": "Random forest · physical inputs",
          "data": "Climate + terrain",
          "representation": "Explicit variables",
          "spatial": "No explicit spatial term",
          "learner": "Random forest",
          "value": 0.46618622518911906
        },
        {
          "id": "gam-mgcv",
          "label": "Generalized additive model · R",
          "data": "Climate + terrain",
          "representation": "Explicit variables",
          "spatial": "No explicit spatial term",
          "learner": "Generalized additive model",
          "value": 0.5045232192169037
        },
        {
          "id": "glm-r",
          "label": "Generalized linear model · R",
          "data": "Climate + terrain",
          "representation": "Explicit variables",
          "spatial": "No explicit spatial term",
          "learner": "Generalized linear model",
          "value": 0.5824134561102711
        },
        {
          "id": "inner-selected-conventional",
          "label": "Inner-selected conventional",
          "data": "Varies by inner-fold selection",
          "representation": "Varies by inner-fold selection",
          "spatial": "Varies by inner-fold selection",
          "learner": "Nested model selection",
          "value": 0.3998126253737457
        },
        {
          "id": "late-fusion-25-earth",
          "label": "Late fusion 25% Earth",
          "data": "Climate + terrain + AlphaEarth",
          "representation": "Late fusion 25% embedding",
          "spatial": "No explicit spatial term",
          "learner": "Mixture of beta-binomial predictions",
          "value": 0.4803826634349077
        },
        {
          "id": "late-fusion-50-earth",
          "label": "Late fusion 50% Earth",
          "data": "Climate + terrain + AlphaEarth",
          "representation": "Late fusion 50% embedding",
          "spatial": "No explicit spatial term",
          "learner": "Mixture of beta-binomial predictions",
          "value": 0.44494674062748313
        },
        {
          "id": "late-fusion-75-earth",
          "label": "Late fusion 75% Earth",
          "data": "Climate + terrain + AlphaEarth",
          "representation": "Late fusion 75% embedding",
          "spatial": "No explicit spatial term",
          "learner": "Mixture of beta-binomial predictions",
          "value": 0.42042601060870927
        },
        {
          "id": "logistic-fused",
          "label": "Logistic regression · fused inputs",
          "data": "Climate + terrain + AlphaEarth",
          "representation": "Concatenated means and spread",
          "spatial": "No explicit spatial term",
          "learner": "Logistic regression",
          "value": 0.3897705600414854
        },
        {
          "id": "logistic-physical",
          "label": "Logistic regression · physical inputs",
          "data": "Climate + terrain",
          "representation": "Explicit variables",
          "spatial": "No explicit spatial term",
          "learner": "Logistic regression",
          "value": 0.5205529540951246
        },
        {
          "id": "mars-r",
          "label": "Adaptive regression splines · R",
          "data": "Climate + terrain",
          "representation": "Explicit variables",
          "spatial": "No explicit spatial term",
          "learner": "Adaptive regression splines",
          "value": 0.5130487646393349
        },
        {
          "id": "maxent-ipp-lq",
          "label": "Maximum entropy · Python",
          "data": "Climate + terrain",
          "representation": "Linear and quadratic terms",
          "spatial": "No explicit spatial term",
          "learner": "Maximum entropy",
          "value": 0.5006981462964464
        },
        {
          "id": "maxent-java-lq",
          "label": "Maximum entropy · Java",
          "data": "Climate + terrain",
          "representation": "Linear and quadratic terms",
          "spatial": "No explicit spatial term",
          "learner": "Maximum entropy",
          "value": 0.4861070091592157
        },
        {
          "id": "maxnet-r-lq",
          "label": "Maximum entropy · R MaxNet",
          "data": "Climate + terrain",
          "representation": "Linear and quadratic terms",
          "spatial": "No explicit spatial term",
          "learner": "MaxNet",
          "value": 0.5470178354337062
        },
        {
          "id": "prior",
          "label": "Pooled reference",
          "data": "Report totals",
          "representation": "Intercept",
          "spatial": "No explicit spatial term",
          "learner": "Constant share",
          "value": 0.49994471858444717
        },
        {
          "id": "rf-r",
          "label": "Random forest · R",
          "data": "Climate + terrain",
          "representation": "Explicit variables",
          "spatial": "No explicit spatial term",
          "learner": "Random forest",
          "value": 0.5451620641163184
        },
        {
          "id": "rsi-cycle-1",
          "label": "Recursive selection cycle 1",
          "data": "Varies by inner-fold selection",
          "representation": "Varies by inner-fold selection",
          "spatial": "Varies by inner-fold selection",
          "learner": "Nested model selection",
          "value": 0.39251405210593066
        },
        {
          "id": "rsi-cycle-2",
          "label": "Recursive selection cycle 2",
          "data": "Varies by inner-fold selection",
          "representation": "Varies by inner-fold selection",
          "spatial": "Varies by inner-fold selection",
          "learner": "Nested model selection",
          "value": 0.35563688740032245
        },
        {
          "id": "spatial-beta-binomial",
          "label": "Spatial beta-binomial",
          "data": "Climate + terrain + AlphaEarth",
          "representation": "Multiscale components",
          "spatial": "Spherical basis",
          "learner": "Beta-binomial regression",
          "value": 0.3639700959533059
        },
        {
          "id": "xgboost-r",
          "label": "Gradient-boosted trees · R",
          "data": "Climate + terrain",
          "representation": "Explicit variables",
          "spatial": "No explicit spatial term",
          "learner": "Gradient-boosted trees",
          "value": 0.5632830766618356
        }
      ],
      "note": "The fixed fusion candidate was nominated after comparing outer results. The prespecified selector won three of six primary sectors and tied once. The rule required four strict wins. The two partitions reuse the same reporting tiles.",
      "cohort": "17,159 reports in 113 broad tiles, 2022–2025",
      "promoted": false,
      "additionalSource": "https://github.com/missa7481/NASA_Global_Habitat_Mapping/blob/638702bbe096a77ceedc56fc88d6f90396022dfe/experiments/transfer/rsi_macro/evaluation.json"
    },
    {
      "id": "frozen-2024",
      "title": "2024 spatial benchmark",
      "endpoint": "Reported focal species versus other mosquito reports",
      "protocol": "Average across six frozen spatial folds in the 2024 development cohort.",
      "metric": "Average precision",
      "direction": "higher",
      "units": "0–1",
      "source": "https://github.com/missa7481/NASA_Global_Habitat_Mapping/blob/638702bbe096a77ceedc56fc88d6f90396022dfe/experiments/legacy/benchmarks/global_mapping_2024/models/summary.csv",
      "baselineId": "environment41-rf",
      "rows": [
        {
          "id": "alphaearth64-glm",
          "label": "64 embedding dimensions · Logistic regression",
          "data": "AlphaEarth",
          "representation": "64 embedding dimensions",
          "spatial": "No explicit spatial term",
          "learner": "Logistic regression",
          "value": 0.8111459187413178
        },
        {
          "id": "alphaearth64-rf",
          "label": "64 embedding dimensions · Random forest",
          "data": "AlphaEarth",
          "representation": "64 embedding dimensions",
          "spatial": "No explicit spatial term",
          "learner": "Random forest",
          "value": 0.8006960637392669
        },
        {
          "id": "bioclim19-brt",
          "label": "19 bioclimatic variables · Boosted regression trees",
          "data": "Climate normals",
          "representation": "19 bioclimatic variables",
          "spatial": "No explicit spatial term",
          "learner": "Boosted regression trees",
          "value": 0.7130142504983711
        },
        {
          "id": "bioclim19-glm",
          "label": "19 bioclimatic variables · Logistic regression",
          "data": "Climate normals",
          "representation": "19 bioclimatic variables",
          "spatial": "No explicit spatial term",
          "learner": "Logistic regression",
          "value": 0.5934830427759022
        },
        {
          "id": "bioclim19-maxnet",
          "label": "19 bioclimatic variables · MaxNet",
          "data": "Climate normals",
          "representation": "19 bioclimatic variables",
          "spatial": "No explicit spatial term",
          "learner": "MaxNet",
          "value": 0.676956584543619
        },
        {
          "id": "bioclim19-rf",
          "label": "19 bioclimatic variables · Random forest",
          "data": "Climate normals",
          "representation": "19 bioclimatic variables",
          "spatial": "No explicit spatial term",
          "learner": "Random forest",
          "value": 0.7188661619179552
        },
        {
          "id": "environment41-brt",
          "label": "41 engineered variables · Boosted regression trees",
          "data": "Climate + environment + human activity",
          "representation": "41 engineered variables",
          "spatial": "No explicit spatial term",
          "learner": "Boosted regression trees",
          "value": 0.7938333934126033
        },
        {
          "id": "environment41-glm",
          "label": "41 engineered variables · Logistic regression",
          "data": "Climate + environment + human activity",
          "representation": "41 engineered variables",
          "spatial": "No explicit spatial term",
          "learner": "Logistic regression",
          "value": 0.6971010564730517
        },
        {
          "id": "environment41-maxnet",
          "label": "41 engineered variables · MaxNet",
          "data": "Climate + environment + human activity",
          "representation": "41 engineered variables",
          "spatial": "No explicit spatial term",
          "learner": "MaxNet",
          "value": 0.7728947997327955
        },
        {
          "id": "environment41-rf",
          "label": "41 engineered variables · Random forest",
          "data": "Climate + environment + human activity",
          "representation": "41 engineered variables",
          "spatial": "No explicit spatial term",
          "learner": "Random forest",
          "value": 0.7919860450352297
        },
        {
          "id": "environment-alphaearth105-glm",
          "label": "105 concatenated features · Logistic regression",
          "data": "Environment + AlphaEarth",
          "representation": "105 concatenated features",
          "spatial": "No explicit spatial term",
          "learner": "Logistic regression",
          "value": 0.8103341954306634
        },
        {
          "id": "environment-alphaearth105-rf",
          "label": "105 concatenated features · Random forest",
          "data": "Environment + AlphaEarth",
          "representation": "105 concatenated features",
          "spatial": "No explicit spatial term",
          "learner": "Random forest",
          "value": 0.8098199844019374
        }
      ],
      "cohort": "1,601 locations across 67 countries",
      "note": "Other mosquito records supply the comparison group. Average precision depends on the share of focal-species records."
    },
    {
      "id": "survey-2025",
      "title": "2025 US trap survey",
      "endpoint": "Any focal-species detection at a trap site",
      "protocol": "The archived 2024 products evaluated at 389 National Ecological Observatory Network sites.",
      "metric": "Average precision",
      "direction": "higher",
      "units": "0–1",
      "source": "https://github.com/missa7481/NASA_Global_Habitat_Mapping/blob/638702bbe096a77ceedc56fc88d6f90396022dfe/experiments/legacy/benchmarks/global_mapping_2024/audit/external_metrics.csv",
      "baselineId": "environment41-rf",
      "rows": [
        {
          "id": "alphaearth64-glm",
          "label": "64 embedding dimensions · Logistic regression",
          "data": "AlphaEarth",
          "representation": "64 embedding dimensions",
          "spatial": "No explicit spatial term",
          "learner": "Logistic regression",
          "value": 0.3445051991988931,
          "interval95": [
            0.19177465975899077,
            0.5915296142100148
          ]
        },
        {
          "id": "alphaearth64-rf",
          "label": "64 embedding dimensions · Random forest",
          "data": "AlphaEarth",
          "representation": "64 embedding dimensions",
          "spatial": "No explicit spatial term",
          "learner": "Random forest",
          "value": 0.3077061208743539,
          "interval95": [
            0.12389110157714346,
            0.537053813710861
          ]
        },
        {
          "id": "bioclim19-brt",
          "label": "19 bioclimatic variables · Boosted regression trees",
          "data": "Climate normals",
          "representation": "19 bioclimatic variables",
          "spatial": "No explicit spatial term",
          "learner": "Boosted regression trees",
          "value": 0.44178029100596916,
          "interval95": [
            0.24737881204535714,
            0.6855874290225134
          ]
        },
        {
          "id": "bioclim19-glm",
          "label": "19 bioclimatic variables · Logistic regression",
          "data": "Climate normals",
          "representation": "19 bioclimatic variables",
          "spatial": "No explicit spatial term",
          "learner": "Logistic regression",
          "value": 0.35905295085538985,
          "interval95": [
            0.200780687883141,
            0.561022710221851
          ]
        },
        {
          "id": "bioclim19-maxnet",
          "label": "19 bioclimatic variables · MaxNet",
          "data": "Climate normals",
          "representation": "19 bioclimatic variables",
          "spatial": "No explicit spatial term",
          "learner": "MaxNet",
          "value": 0.48101599303818465,
          "interval95": [
            0.2569005288545879,
            0.6436337440125927
          ]
        },
        {
          "id": "bioclim19-rf",
          "label": "19 bioclimatic variables · Random forest",
          "data": "Climate normals",
          "representation": "19 bioclimatic variables",
          "spatial": "No explicit spatial term",
          "learner": "Random forest",
          "value": 0.42979106645964416,
          "interval95": [
            0.23656631019295893,
            0.7233785454040411
          ]
        },
        {
          "id": "environment41-brt",
          "label": "41 engineered variables · Boosted regression trees",
          "data": "Climate + environment + human activity",
          "representation": "41 engineered variables",
          "spatial": "No explicit spatial term",
          "learner": "Boosted regression trees",
          "value": 0.47078358106131024,
          "interval95": [
            0.2736587265130946,
            0.6089258121434737
          ]
        },
        {
          "id": "environment41-glm",
          "label": "41 engineered variables · Logistic regression",
          "data": "Climate + environment + human activity",
          "representation": "41 engineered variables",
          "spatial": "No explicit spatial term",
          "learner": "Logistic regression",
          "value": 0.21596242540766342,
          "interval95": [
            0.1090965986142147,
            0.4005652020538084
          ]
        },
        {
          "id": "environment41-maxnet",
          "label": "41 engineered variables · MaxNet",
          "data": "Climate + environment + human activity",
          "representation": "41 engineered variables",
          "spatial": "No explicit spatial term",
          "learner": "MaxNet",
          "value": 0.3715838675537576,
          "interval95": [
            0.2256048242065665,
            0.5579921224664134
          ]
        },
        {
          "id": "environment41-rf",
          "label": "41 engineered variables · Random forest",
          "data": "Climate + environment + human activity",
          "representation": "41 engineered variables",
          "spatial": "No explicit spatial term",
          "learner": "Random forest",
          "value": 0.34730665793664883,
          "interval95": [
            0.18698616635886156,
            0.5153583517350349
          ]
        },
        {
          "id": "environment-alphaearth105-glm",
          "label": "105 concatenated features · Logistic regression",
          "data": "Environment + AlphaEarth",
          "representation": "105 concatenated features",
          "spatial": "No explicit spatial term",
          "learner": "Logistic regression",
          "value": 0.41155140916080934,
          "interval95": [
            0.21434628422462618,
            0.6437966136199121
          ]
        },
        {
          "id": "environment-alphaearth105-rf",
          "label": "105 concatenated features · Random forest",
          "data": "Environment + AlphaEarth",
          "representation": "105 concatenated features",
          "spatial": "No explicit spatial term",
          "learner": "Random forest",
          "value": 0.31684007337017267,
          "interval95": [
            0.13340043099481752,
            0.5870660697415327
          ]
        }
      ],
      "cohort": "43 detections in 389 sites, 45 site clusters",
      "note": "The survey has been used during development. Compare scores within the survey. The intervals use cluster resampling."
    },
    {
      "id": "representation-probes",
      "title": "Supervised representation comparisons",
      "endpoint": "Reported focal species versus other mosquito reports",
      "protocol": "Fixed common cohort and three inspected development folds. Identical head families for all representations.",
      "metric": "Average precision",
      "direction": "higher",
      "units": "0–1",
      "source": "https://github.com/missa7481/NASA_Global_Habitat_Mapping/blob/638702bbe096a77ceedc56fc88d6f90396022dfe/experiments/representation_lab/metrics/cs_representations_v1/combined_summary.csv",
      "baselineId": "environment41-rf",
      "rows": [
        {
          "id": "alphaearth64-maxnet-lq",
          "label": "64 embedding dimensions · MaxNet (linear and quadratic)",
          "data": "AlphaEarth",
          "representation": "64 embedding dimensions",
          "spatial": "No explicit spatial term",
          "learner": "MaxNet (linear and quadratic)",
          "value": 0.7979567022184182
        },
        {
          "id": "alphaearth64-rf",
          "label": "64 embedding dimensions · Random forest",
          "data": "AlphaEarth",
          "representation": "64 embedding dimensions",
          "spatial": "No explicit spatial term",
          "learner": "Random forest",
          "value": 0.8260814346985162
        },
        {
          "id": "ecology-augmented-maxnet-lq",
          "label": "Ecology-informed features · MaxNet (linear and quadratic)",
          "data": "Climate + environment + human activity",
          "representation": "Ecology-informed features",
          "spatial": "No explicit spatial term",
          "learner": "MaxNet (linear and quadratic)",
          "value": 0.788462157066585
        },
        {
          "id": "ecology-augmented-rf",
          "label": "Ecology-informed features · Random forest",
          "data": "Climate + environment + human activity",
          "representation": "Ecology-informed features",
          "spatial": "No explicit spatial term",
          "learner": "Random forest",
          "value": 0.8382447837387114
        },
        {
          "id": "environment41-maxnet-lq",
          "label": "41 engineered variables · MaxNet (linear and quadratic)",
          "data": "Climate + environment + human activity",
          "representation": "41 engineered variables",
          "spatial": "No explicit spatial term",
          "learner": "MaxNet (linear and quadratic)",
          "value": 0.7748885867542654
        },
        {
          "id": "environment41-rf",
          "label": "41 engineered variables · Random forest",
          "data": "Climate + environment + human activity",
          "representation": "41 engineered variables",
          "spatial": "No explicit spatial term",
          "learner": "Random forest",
          "value": 0.8362989929874164
        },
        {
          "id": "linear-all-foundations16-maxnet-lq",
          "label": "Environment + five Earth encoders components · MaxNet (linear and quadratic)",
          "data": "Environment + five Earth encoders",
          "representation": "Linear multiview components",
          "spatial": "No explicit spatial term",
          "learner": "MaxNet (linear and quadratic)",
          "value": 0.7636063854475649
        },
        {
          "id": "linear-all-foundations16-rf",
          "label": "Environment + five Earth encoders components · Random forest",
          "data": "Environment + five Earth encoders",
          "representation": "Linear multiview components",
          "spatial": "No explicit spatial term",
          "learner": "Random forest",
          "value": 0.7979995855717387
        },
        {
          "id": "linear-environment-alphaearth16-maxnet-lq",
          "label": "Environment + AlphaEarth components · MaxNet (linear and quadratic)",
          "data": "Environment + AlphaEarth",
          "representation": "Linear multiview components",
          "spatial": "No explicit spatial term",
          "learner": "MaxNet (linear and quadratic)",
          "value": 0.7932418175485813
        },
        {
          "id": "linear-environment-alphaearth16-rf",
          "label": "Environment + AlphaEarth components · Random forest",
          "data": "Environment + AlphaEarth",
          "representation": "Linear multiview components",
          "spatial": "No explicit spatial term",
          "learner": "Random forest",
          "value": 0.8207495061471518
        },
        {
          "id": "linear-spectral-control16-maxnet-lq",
          "label": "Environment + satellite reflectance components · MaxNet (linear and quadratic)",
          "data": "Environment + satellite reflectance",
          "representation": "Linear multiview components",
          "spatial": "No explicit spatial term",
          "learner": "MaxNet (linear and quadratic)",
          "value": 0.7980875235204455
        },
        {
          "id": "linear-spectral-control16-rf",
          "label": "Environment + satellite reflectance components · Random forest",
          "data": "Environment + satellite reflectance",
          "representation": "Linear multiview components",
          "spatial": "No explicit spatial term",
          "learner": "Random forest",
          "value": 0.8151411264392342
        },
        {
          "id": "nonlinear-all-foundations16-maxnet-lq",
          "label": "Multiview autoencoder · MaxNet (linear and quadratic)",
          "data": "Environment + five Earth encoders",
          "representation": "Multiview autoencoder",
          "spatial": "No explicit spatial term",
          "learner": "MaxNet (linear and quadratic)",
          "value": 0.7601141231854044
        },
        {
          "id": "nonlinear-all-foundations16-rf",
          "label": "Multiview autoencoder · Random forest",
          "data": "Environment + five Earth encoders",
          "representation": "Multiview autoencoder",
          "spatial": "No explicit spatial term",
          "learner": "Random forest",
          "value": 0.788858375728763
        },
        {
          "id": "raw-environment-alphaearth-maxnet-lq",
          "label": "105 concatenated features · MaxNet (linear and quadratic)",
          "data": "Environment + AlphaEarth",
          "representation": "105 concatenated features",
          "spatial": "No explicit spatial term",
          "learner": "MaxNet (linear and quadratic)",
          "value": 0.8062214143207299
        },
        {
          "id": "raw-environment-alphaearth-rf",
          "label": "105 concatenated features · Random forest",
          "data": "Environment + AlphaEarth",
          "representation": "105 concatenated features",
          "spatial": "No explicit spatial term",
          "learner": "Random forest",
          "value": 0.8316448763244771
        },
        {
          "id": "mlp-supervised16-maxnet-lq",
          "label": "Supervised neural features · MaxNet (linear and quadratic)",
          "data": "Environment + five Earth encoders",
          "representation": "Supervised neural features",
          "spatial": "No explicit spatial term",
          "learner": "MaxNet (linear and quadratic)",
          "value": 0.7378403279304274
        },
        {
          "id": "mlp-supervised16-rf",
          "label": "Supervised neural features · Random forest",
          "data": "Environment + five Earth encoders",
          "representation": "Supervised neural features",
          "spatial": "No explicit spatial term",
          "learner": "Random forest",
          "value": 0.7377805828889477
        },
        {
          "id": "tabm-supervised16-maxnet-lq",
          "label": "Supervised TabM features · MaxNet (linear and quadratic)",
          "data": "Environment + five Earth encoders",
          "representation": "Supervised TabM features",
          "spatial": "No explicit spatial term",
          "learner": "MaxNet (linear and quadratic)",
          "value": 0.725586295507886
        },
        {
          "id": "tabm-supervised16-rf",
          "label": "Supervised TabM features · Random forest",
          "data": "Environment + five Earth encoders",
          "representation": "Supervised TabM features",
          "spatial": "No explicit spatial term",
          "learner": "Random forest",
          "value": 0.7406742939375638
        },
        {
          "id": "cs-autoencoder16-maxnet-lq",
          "label": "Autoencoder · MaxNet (linear and quadratic)",
          "data": "Environment + five Earth encoders",
          "representation": "Autoencoder",
          "spatial": "No explicit spatial term",
          "learner": "MaxNet (linear and quadratic)",
          "value": 0.7682847924685542
        },
        {
          "id": "cs-autoencoder16-rf",
          "label": "Autoencoder · Random forest",
          "data": "Environment + five Earth encoders",
          "representation": "Autoencoder",
          "spatial": "No explicit spatial term",
          "learner": "Random forest",
          "value": 0.7935922009331252
        },
        {
          "id": "cs-branch48-maxnet-lq",
          "label": "Branchwise principal components · MaxNet (linear and quadratic)",
          "data": "Environment + five Earth encoders",
          "representation": "Branchwise principal components",
          "spatial": "No explicit spatial term",
          "learner": "MaxNet (linear and quadratic)",
          "value": 0.7982791587734738
        },
        {
          "id": "cs-branch48-rf",
          "label": "Branchwise principal components · Random forest",
          "data": "Environment + five Earth encoders",
          "representation": "Branchwise principal components",
          "spatial": "No explicit spatial term",
          "learner": "Random forest",
          "value": 0.8239974074685943
        },
        {
          "id": "cs-linear16-maxnet-lq",
          "label": "Linear compression · MaxNet (linear and quadratic)",
          "data": "Environment + five Earth encoders",
          "representation": "Linear compression",
          "spatial": "No explicit spatial term",
          "learner": "MaxNet (linear and quadratic)",
          "value": 0.7636150562037979
        },
        {
          "id": "cs-linear16-rf",
          "label": "Linear compression · Random forest",
          "data": "Environment + five Earth encoders",
          "representation": "Linear compression",
          "spatial": "No explicit spatial term",
          "learner": "Random forest",
          "value": 0.7983278673676937
        },
        {
          "id": "cs-masked-jepa16-maxnet-lq",
          "label": "Masked joint-embedding adaptation · MaxNet (linear and quadratic)",
          "data": "Environment + five Earth encoders",
          "representation": "Masked joint-embedding adaptation",
          "spatial": "No explicit spatial term",
          "learner": "MaxNet (linear and quadratic)",
          "value": 0.7694516793616978
        },
        {
          "id": "cs-masked-jepa16-rf",
          "label": "Masked joint-embedding adaptation · Random forest",
          "data": "Environment + five Earth encoders",
          "representation": "Masked joint-embedding adaptation",
          "spatial": "No explicit spatial term",
          "learner": "Random forest",
          "value": 0.7913475456695273
        },
        {
          "id": "cs-scarf16-maxnet-lq",
          "label": "Contrastive corruption · MaxNet (linear and quadratic)",
          "data": "Environment + five Earth encoders",
          "representation": "Contrastive corruption",
          "spatial": "No explicit spatial term",
          "learner": "MaxNet (linear and quadratic)",
          "value": 0.7920035404072404
        },
        {
          "id": "cs-scarf16-rf",
          "label": "Contrastive corruption · Random forest",
          "data": "Environment + five Earth encoders",
          "representation": "Contrastive corruption",
          "spatial": "No explicit spatial term",
          "learner": "Random forest",
          "value": 0.7791084394950228
        },
        {
          "id": "cs-vicreg16-maxnet-lq",
          "label": "VICReg adaptation · MaxNet (linear and quadratic)",
          "data": "Environment + five Earth encoders",
          "representation": "VICReg adaptation",
          "spatial": "No explicit spatial term",
          "learner": "MaxNet (linear and quadratic)",
          "value": 0.7862414140707398
        },
        {
          "id": "cs-vicreg16-rf",
          "label": "VICReg adaptation · Random forest",
          "data": "Environment + five Earth encoders",
          "representation": "VICReg adaptation",
          "spatial": "No explicit spatial term",
          "learner": "Random forest",
          "value": 0.7850769509764683
        },
        {
          "id": "cs-vime16-maxnet-lq",
          "label": "Mask and feature recovery · MaxNet (linear and quadratic)",
          "data": "Environment + five Earth encoders",
          "representation": "Mask and feature recovery",
          "spatial": "No explicit spatial term",
          "learner": "MaxNet (linear and quadratic)",
          "value": 0.7778109295517656
        },
        {
          "id": "cs-vime16-rf",
          "label": "Mask and feature recovery · Random forest",
          "data": "Environment + five Earth encoders",
          "representation": "Mask and feature recovery",
          "spatial": "No explicit spatial term",
          "learner": "Random forest",
          "value": 0.7947711693805258
        },
        {
          "id": "cs-visreg16-maxnet-lq",
          "label": "VISReg adaptation · MaxNet (linear and quadratic)",
          "data": "Environment + five Earth encoders",
          "representation": "VISReg adaptation",
          "spatial": "No explicit spatial term",
          "learner": "MaxNet (linear and quadratic)",
          "value": 0.7638584391022331
        },
        {
          "id": "cs-visreg16-rf",
          "label": "VISReg adaptation · Random forest",
          "data": "Environment + five Earth encoders",
          "representation": "VISReg adaptation",
          "spatial": "No explicit spatial term",
          "learner": "Random forest",
          "value": 0.7766669448081064
        },
        {
          "id": "environment41-plus-mlp-supervised16-maxnet-lq",
          "label": "Supervised neural features + explicit environment · MaxNet (linear and quadratic)",
          "data": "Environment + five Earth encoders",
          "representation": "Supervised neural features + explicit environment",
          "spatial": "No explicit spatial term",
          "learner": "MaxNet (linear and quadratic)",
          "value": 0.7319769586556509
        },
        {
          "id": "environment41-plus-mlp-supervised16-rf",
          "label": "Supervised neural features + explicit environment · Random forest",
          "data": "Environment + five Earth encoders",
          "representation": "Supervised neural features + explicit environment",
          "spatial": "No explicit spatial term",
          "learner": "Random forest",
          "value": 0.760463621410167
        },
        {
          "id": "environment41-plus-tabm-supervised16-maxnet-lq",
          "label": "Supervised TabM features + explicit environment · MaxNet (linear and quadratic)",
          "data": "Environment + five Earth encoders",
          "representation": "Supervised TabM features + explicit environment",
          "spatial": "No explicit spatial term",
          "learner": "MaxNet (linear and quadratic)",
          "value": 0.7369198946681763
        },
        {
          "id": "environment41-plus-tabm-supervised16-rf",
          "label": "Supervised TabM features + explicit environment · Random forest",
          "data": "Environment + five Earth encoders",
          "representation": "Supervised TabM features + explicit environment",
          "spatial": "No explicit spatial term",
          "learner": "Random forest",
          "value": 0.8099088429479934
        },
        {
          "id": "environment41-plus-cs-autoencoder16-maxnet-lq",
          "label": "Autoencoder + explicit environment · MaxNet (linear and quadratic)",
          "data": "Environment + five Earth encoders",
          "representation": "Autoencoder + explicit environment",
          "spatial": "No explicit spatial term",
          "learner": "MaxNet (linear and quadratic)",
          "value": 0.7751652860525362
        },
        {
          "id": "environment41-plus-cs-autoencoder16-rf",
          "label": "Autoencoder + explicit environment · Random forest",
          "data": "Environment + five Earth encoders",
          "representation": "Autoencoder + explicit environment",
          "spatial": "No explicit spatial term",
          "learner": "Random forest",
          "value": 0.8355492167834034
        },
        {
          "id": "environment41-plus-cs-linear16-maxnet-lq",
          "label": "Linear compression + explicit environment · MaxNet (linear and quadratic)",
          "data": "Environment + five Earth encoders",
          "representation": "Linear compression + explicit environment",
          "spatial": "No explicit spatial term",
          "learner": "MaxNet (linear and quadratic)",
          "value": 0.7865782110270274
        },
        {
          "id": "environment41-plus-cs-linear16-rf",
          "label": "Linear compression + explicit environment · Random forest",
          "data": "Environment + five Earth encoders",
          "representation": "Linear compression + explicit environment",
          "spatial": "No explicit spatial term",
          "learner": "Random forest",
          "value": 0.8333153198162245
        },
        {
          "id": "environment41-plus-cs-masked-jepa16-maxnet-lq",
          "label": "Masked joint-embedding adaptation + explicit environment · MaxNet (linear and quadratic)",
          "data": "Environment + five Earth encoders",
          "representation": "Masked joint-embedding adaptation + explicit environment",
          "spatial": "No explicit spatial term",
          "learner": "MaxNet (linear and quadratic)",
          "value": 0.784360255251973
        },
        {
          "id": "environment41-plus-cs-masked-jepa16-rf",
          "label": "Masked joint-embedding adaptation + explicit environment · Random forest",
          "data": "Environment + five Earth encoders",
          "representation": "Masked joint-embedding adaptation + explicit environment",
          "spatial": "No explicit spatial term",
          "learner": "Random forest",
          "value": 0.8269327563451204
        },
        {
          "id": "environment41-plus-cs-scarf16-maxnet-lq",
          "label": "Contrastive corruption + explicit environment · MaxNet (linear and quadratic)",
          "data": "Environment + five Earth encoders",
          "representation": "Contrastive corruption + explicit environment",
          "spatial": "No explicit spatial term",
          "learner": "MaxNet (linear and quadratic)",
          "value": 0.7979563186259747
        },
        {
          "id": "environment41-plus-cs-scarf16-rf",
          "label": "Contrastive corruption + explicit environment · Random forest",
          "data": "Environment + five Earth encoders",
          "representation": "Contrastive corruption + explicit environment",
          "spatial": "No explicit spatial term",
          "learner": "Random forest",
          "value": 0.8288824103117497
        },
        {
          "id": "environment41-plus-cs-vicreg16-maxnet-lq",
          "label": "VICReg adaptation + explicit environment · MaxNet (linear and quadratic)",
          "data": "Environment + five Earth encoders",
          "representation": "VICReg adaptation + explicit environment",
          "spatial": "No explicit spatial term",
          "learner": "MaxNet (linear and quadratic)",
          "value": 0.7779734670239257
        },
        {
          "id": "environment41-plus-cs-vicreg16-rf",
          "label": "VICReg adaptation + explicit environment · Random forest",
          "data": "Environment + five Earth encoders",
          "representation": "VICReg adaptation + explicit environment",
          "spatial": "No explicit spatial term",
          "learner": "Random forest",
          "value": 0.833041016320801
        },
        {
          "id": "environment41-plus-cs-vime16-maxnet-lq",
          "label": "Mask and feature recovery + explicit environment · MaxNet (linear and quadratic)",
          "data": "Environment + five Earth encoders",
          "representation": "Mask and feature recovery + explicit environment",
          "spatial": "No explicit spatial term",
          "learner": "MaxNet (linear and quadratic)",
          "value": 0.7892904154838464
        },
        {
          "id": "environment41-plus-cs-vime16-rf",
          "label": "Mask and feature recovery + explicit environment · Random forest",
          "data": "Environment + five Earth encoders",
          "representation": "Mask and feature recovery + explicit environment",
          "spatial": "No explicit spatial term",
          "learner": "Random forest",
          "value": 0.8354426305343576
        },
        {
          "id": "environment41-plus-cs-visreg16-maxnet-lq",
          "label": "VISReg adaptation + explicit environment · MaxNet (linear and quadratic)",
          "data": "Environment + five Earth encoders",
          "representation": "VISReg adaptation + explicit environment",
          "spatial": "No explicit spatial term",
          "learner": "MaxNet (linear and quadratic)",
          "value": 0.7713088367694739
        },
        {
          "id": "environment41-plus-cs-visreg16-rf",
          "label": "VISReg adaptation + explicit environment · Random forest",
          "data": "Environment + five Earth encoders",
          "representation": "VISReg adaptation + explicit environment",
          "spatial": "No explicit spatial term",
          "learner": "Random forest",
          "value": 0.8366679431872042
        }
      ],
      "note": "The five encoders are AlphaEarth, Prithvi, SatMAE, CROMA and Clay. This table includes the original eight representations and the nineteen additional recipes. All comparisons are retrospective."
    },
    {
      "id": "masked-reconstruction",
      "title": "Multimodal feature reconstruction",
      "endpoint": "Recovering a withheld input view",
      "protocol": "Six fusion strategies evaluated over the same 54 view-by-fold tests, across three folds.",
      "metric": "Mean masked-view error",
      "direction": "lower",
      "units": "feature-space error",
      "source": "https://github.com/missa7481/NASA_Global_Habitat_Mapping/blob/638702bbe096a77ceedc56fc88d6f90396022dfe/experiments/representation_lab/metrics/representation_atlas_v1/summary.csv",
      "baselineId": "balanced-concat",
      "rows": [
        {
          "id": "balanced-concat",
          "label": "Balanced concatenation",
          "data": "Environmental, Earth and vision-language features",
          "representation": "Balanced concatenation",
          "spatial": "No explicit spatial term",
          "learner": "Feature reconstruction",
          "value": 0.28881845878506146
        },
        {
          "id": "flat-pca64",
          "label": "Flat principal components",
          "data": "Environmental, Earth and vision-language features",
          "representation": "Flat principal components",
          "spatial": "No explicit spatial term",
          "learner": "Feature reconstruction",
          "value": 0.31207319569808467
        },
        {
          "id": "hierarchical-pca64",
          "label": "Hierarchical principal components",
          "data": "Environmental, Earth and vision-language features",
          "representation": "Hierarchical principal components",
          "spatial": "No explicit spatial term",
          "learner": "Feature reconstruction",
          "value": 0.3152632354586213
        },
        {
          "id": "masked-ae64",
          "label": "Masked autoencoder",
          "data": "Environmental, Earth and vision-language features",
          "representation": "Masked autoencoder",
          "spatial": "No explicit spatial term",
          "learner": "Feature reconstruction",
          "value": 0.35008967143517955
        },
        {
          "id": "modality-attention64",
          "label": "Modality attention",
          "data": "Environmental, Earth and vision-language features",
          "representation": "Modality attention",
          "spatial": "No explicit spatial term",
          "learner": "Feature reconstruction",
          "value": 0.38769350780381096
        },
        {
          "id": "quality-gated-shared-private64",
          "label": "Gated shared and private features",
          "data": "Environmental, Earth and vision-language features",
          "representation": "Gated shared and private features",
          "spatial": "No explicit spatial term",
          "learner": "Feature reconstruction",
          "value": 0.48808056033319897
        }
      ],
      "note": "The feature inventory includes climate, surface, annual weather, five Earth encoders, RemoteCLIP and DINOv2. The endpoint uses only features. Habitat discrimination needs a separate evaluation.",
      "additionalSource": "https://github.com/missa7481/NASA_Global_Habitat_Mapping/blob/638702bbe096a77ceedc56fc88d6f90396022dfe/experiments/representation_lab/metrics/representation_atlas_v1/block_coverage.csv"
    },
    {
      "id": "hico-block10",
      "title": "HiCo-Fuse 2 · Spatial blocks",
      "endpoint": "Five-category species composition among community reports",
      "protocol": "5 retrospective splits grouped by spatial blocks.",
      "metric": "Negative log likelihood",
      "direction": "lower",
      "units": "mean log loss",
      "source": "https://github.com/missa7481/NASA_Global_Habitat_Mapping/blob/638702bbe096a77ceedc56fc88d6f90396022dfe/experiments/hico_fuse2_review/design_comparison.csv",
      "baselineId": "forest",
      "rows": [
        {
          "id": "forest",
          "label": "Random forest",
          "data": "Environment + AlphaEarth",
          "representation": "105 concatenated features",
          "spatial": "No explicit spatial term",
          "learner": "Random forest",
          "value": 0.9304241507655998
        },
        {
          "id": "hico-fuse-2",
          "label": "HiCo-Fuse 2",
          "data": "Environment + AlphaEarth + historical species pool",
          "representation": "Forest scores with regional adjustment",
          "spatial": "Parent and child relative-odds consistency",
          "learner": "Hierarchical composition model",
          "value": 0.9060391511992496
        }
      ],
      "cohort": "17,232 reports in 7,004 cells, 2022–2025",
      "note": "The reference forest and hierarchy share the split. HiCo-Fuse 2 also uses historical species information. An equal-input forest is needed to isolate the hierarchy's contribution."
    },
    {
      "id": "hico-env",
      "title": "HiCo-Fuse 2 · Environmental clusters",
      "endpoint": "Five-category species composition among community reports",
      "protocol": "5 retrospective splits grouped by environmental clusters.",
      "metric": "Negative log likelihood",
      "direction": "lower",
      "units": "mean log loss",
      "source": "https://github.com/missa7481/NASA_Global_Habitat_Mapping/blob/638702bbe096a77ceedc56fc88d6f90396022dfe/experiments/hico_fuse2_review/design_comparison.csv",
      "baselineId": "forest",
      "rows": [
        {
          "id": "forest",
          "label": "Random forest",
          "data": "Environment + AlphaEarth",
          "representation": "105 concatenated features",
          "spatial": "No explicit spatial term",
          "learner": "Random forest",
          "value": 1.0400379739325563
        },
        {
          "id": "hico-fuse-2",
          "label": "HiCo-Fuse 2",
          "data": "Environment + AlphaEarth + historical species pool",
          "representation": "Forest scores with regional adjustment",
          "spatial": "Parent and child relative-odds consistency",
          "learner": "Hierarchical composition model",
          "value": 1.0070841017164927
        }
      ],
      "cohort": "17,232 reports in 7,004 cells, 2022–2025",
      "note": "The reference forest and hierarchy share the split. HiCo-Fuse 2 also uses historical species information. An equal-input forest is needed to isolate the hierarchy's contribution."
    },
    {
      "id": "hico-loro",
      "title": "HiCo-Fuse 2 · Entire regions",
      "endpoint": "Five-category species composition among community reports",
      "protocol": "6 retrospective splits grouped by entire regions.",
      "metric": "Negative log likelihood",
      "direction": "lower",
      "units": "mean log loss",
      "source": "https://github.com/missa7481/NASA_Global_Habitat_Mapping/blob/638702bbe096a77ceedc56fc88d6f90396022dfe/experiments/hico_fuse2_review/design_comparison.csv",
      "baselineId": "forest",
      "rows": [
        {
          "id": "forest",
          "label": "Random forest",
          "data": "Environment + AlphaEarth",
          "representation": "105 concatenated features",
          "spatial": "No explicit spatial term",
          "learner": "Random forest",
          "value": 1.2893080411312206
        },
        {
          "id": "hico-fuse-2",
          "label": "HiCo-Fuse 2",
          "data": "Environment + AlphaEarth + historical species pool",
          "representation": "Forest scores with regional adjustment",
          "spatial": "Parent and child relative-odds consistency",
          "learner": "Hierarchical composition model",
          "value": 1.3236334583669842
        }
      ],
      "cohort": "17,232 reports in 7,004 cells, 2022–2025",
      "note": "The reference forest and hierarchy share the split. HiCo-Fuse 2 also uses historical species information. An equal-input forest is needed to isolate the hierarchy's contribution."
    },
    {
      "id": "hico-zone",
      "title": "HiCo-Fuse 2 · Climate zones",
      "endpoint": "Five-category species composition among community reports",
      "protocol": "4 retrospective splits grouped by climate zones.",
      "metric": "Negative log likelihood",
      "direction": "lower",
      "units": "mean log loss",
      "source": "https://github.com/missa7481/NASA_Global_Habitat_Mapping/blob/638702bbe096a77ceedc56fc88d6f90396022dfe/experiments/hico_fuse2_review/design_comparison.csv",
      "baselineId": "forest",
      "rows": [
        {
          "id": "forest",
          "label": "Random forest",
          "data": "Environment + AlphaEarth",
          "representation": "105 concatenated features",
          "spatial": "No explicit spatial term",
          "learner": "Random forest",
          "value": 1.1131600334956617
        },
        {
          "id": "hico-fuse-2",
          "label": "HiCo-Fuse 2",
          "data": "Environment + AlphaEarth + historical species pool",
          "representation": "Forest scores with regional adjustment",
          "spatial": "Parent and child relative-odds consistency",
          "learner": "Hierarchical composition model",
          "value": 1.07301031583456
        }
      ],
      "cohort": "17,232 reports in 7,004 cells, 2022–2025",
      "note": "The reference forest and hierarchy share the split. HiCo-Fuse 2 also uses historical species information. An equal-input forest is needed to isolate the hierarchy's contribution."
    },
    {
      "id": "survey-history-austria2024",
      "title": "Austrian 2024 repeated-visit histories",
      "endpoint": "Probability of the observed sequence of trap detections",
      "protocol": "Three reused survey folds. One contribution per held-out site-year, within one observation program.",
      "metric": "History negative log likelihood",
      "direction": "lower",
      "units": "nats per site-year",
      "source": "https://github.com/missa7481/NASA_Global_Habitat_Mapping/blob/638702bbe096a77ceedc56fc88d6f90396022dfe/experiments/transfer/survey_process/results.json",
      "baselineId": "survey-effort-only",
      "rows": [
        {
          "id": "survey-effort-only",
          "label": "Effort-only control",
          "data": "Provider + trapping effort",
          "representation": "Recorded exposure",
          "spatial": "No explicit spatial term",
          "learner": "Effort-only detection model",
          "value": 4.412486804870544
        },
        {
          "id": "bayes-one-rate",
          "label": "One-rate Bayesian model",
          "data": "Provider + trapping effort",
          "representation": "Provider-specific capture rate",
          "spatial": "No explicit spatial term",
          "learner": "Bayesian rate model",
          "value": 5.199445362417478
        },
        {
          "id": "bayes-two-rate",
          "label": "Two-rate Bayesian model",
          "data": "Provider + trapping effort",
          "representation": "Two latent rate groups",
          "spatial": "No explicit spatial term",
          "learner": "Bayesian mixture",
          "value": 4.280316579689946
        },
        {
          "id": "survey-rf19",
          "label": "Climate forest with effort model",
          "data": "Climate normals + trapping effort",
          "representation": "Climate forest score + exposure",
          "spatial": "No explicit spatial term",
          "learner": "Random forest and detection model",
          "value": 4.429660321055506
        }
      ],
      "cohort": "313 site-years, 114 with a detection",
      "note": "The Bayesian arms capture provider-specific variation in detection under recorded effort. They contain no geographic effect. A joint Bayesian spatial habitat model requires a separate trial."
    },
    {
      "id": "survey-history-neon2025",
      "title": "US 2025 repeated-visit histories",
      "endpoint": "Probability of the observed sequence of trap detections",
      "protocol": "Three reused survey folds. One contribution per held-out site-year, within one observation program.",
      "metric": "History negative log likelihood",
      "direction": "lower",
      "units": "nats per site-year",
      "source": "https://github.com/missa7481/NASA_Global_Habitat_Mapping/blob/638702bbe096a77ceedc56fc88d6f90396022dfe/experiments/transfer/survey_process/results.json",
      "baselineId": "survey-effort-only",
      "rows": [
        {
          "id": "survey-effort-only",
          "label": "Effort-only control",
          "data": "Provider + trapping effort",
          "representation": "Recorded exposure",
          "spatial": "No explicit spatial term",
          "learner": "Effort-only detection model",
          "value": 1.3366127103151342
        },
        {
          "id": "bayes-one-rate",
          "label": "One-rate Bayesian model",
          "data": "Provider + trapping effort",
          "representation": "Provider-specific capture rate",
          "spatial": "No explicit spatial term",
          "learner": "Bayesian rate model",
          "value": 1.5098091291718632
        },
        {
          "id": "bayes-two-rate",
          "label": "Two-rate Bayesian model",
          "data": "Provider + trapping effort",
          "representation": "Two latent rate groups",
          "spatial": "No explicit spatial term",
          "learner": "Bayesian mixture",
          "value": 1.3080081499181195
        },
        {
          "id": "survey-rf19",
          "label": "Climate forest with effort model",
          "data": "Climate normals + trapping effort",
          "representation": "Climate forest score + exposure",
          "spatial": "No explicit spatial term",
          "learner": "Random forest and detection model",
          "value": 1.2538539217584934
        }
      ],
      "cohort": "420 site-years, 49 with a detection",
      "note": "The Bayesian arms capture provider-specific variation in detection under recorded effort. They contain no geographic effect. A joint Bayesian spatial habitat model requires a separate trial."
    }
  ]
};
