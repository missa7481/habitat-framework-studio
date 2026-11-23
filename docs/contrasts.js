window.FRAMEWORK_CONTRASTS = {
  "sourceHash": "5a92733077efb202a69de9bec7487dc8546a41b169596b0eecf616d3a44136cc",
  "rows": [
    {
      "title": "Earth inputs in logistic regression",
      "candidate": "Logistic fused",
      "reference": "Logistic physical",
      "meaning": "The learner stays fixed while the fused predictor set adds Earth observation information.",
      "outcomes": [
        {
          "origin": 0,
          "mean": -0.1224235962369774,
          "median": -0.11683909193667759,
          "wins": 5,
          "ties": 0,
          "n": 6
        },
        {
          "origin": 24,
          "mean": -0.13078239405363914,
          "median": -0.09088888790422278,
          "wins": 6,
          "ties": 0,
          "n": 6
        }
      ]
    },
    {
      "title": "Earth inputs in random forest",
      "candidate": "Forest fused",
      "reference": "Forest physical",
      "meaning": "The same change of predictor set is evaluated with a nonlinear tree ensemble.",
      "outcomes": [
        {
          "origin": 0,
          "mean": -0.04116391763145679,
          "median": -0.03835150096053831,
          "wins": 4,
          "ties": 0,
          "n": 6
        },
        {
          "origin": 24,
          "mean": -0.03288140767801174,
          "median": -0.012792194143366103,
          "wins": 4,
          "ties": 0,
          "n": 6
        }
      ]
    },
    {
      "title": "Variation in report counts",
      "candidate": "Beta-binomial fused multiscale",
      "reference": "Binomial fused multiscale",
      "meaning": "Both arms use the same multiscale features. The beta-binomial formulation allows extra variability in the tile counts.",
      "outcomes": [
        {
          "origin": 0,
          "mean": -0.03487179834745918,
          "median": -0.022255817706324996,
          "wins": 4,
          "ties": 0,
          "n": 6
        },
        {
          "origin": 24,
          "mean": -0.03610694377252175,
          "median": -0.04308868525160491,
          "wins": 5,
          "ties": 0,
          "n": 6
        }
      ]
    },
    {
      "title": "Integrated spatial fusion",
      "candidate": "Complementary spatial fusion",
      "reference": "Logistic fused",
      "meaning": "Both arms have access to the same input families. The candidate changes several modeling choices together, so this contrast cannot identify a single component effect.",
      "outcomes": [
        {
          "origin": 0,
          "mean": -0.028360228593365042,
          "median": -0.032304275217768644,
          "wins": 4,
          "ties": 0,
          "n": 6
        },
        {
          "origin": 24,
          "mean": -0.034133672641162925,
          "median": -0.0412100399825093,
          "wins": 5,
          "ties": 0,
          "n": 6
        }
      ]
    },
    {
      "title": "Nested model selection",
      "candidate": "All-family RSI cycle 2",
      "reference": "Logistic fused",
      "meaning": "The selection procedure chooses a learner within the training partition. This retrospective paired check uses the fixed fused logistic control.",
      "outcomes": [
        {
          "origin": 0,
          "mean": -0.01316646617425502,
          "median": -0.0034300091465079494,
          "wins": 3,
          "ties": 1,
          "n": 6
        },
        {
          "origin": 24,
          "mean": -0.034133672641162925,
          "median": -0.0412100399825093,
          "wins": 5,
          "ties": 0,
          "n": 6
        }
      ]
    }
  ]
};
