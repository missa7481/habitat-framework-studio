# Geographic context in the atlas

The optional relief backdrop uses **Natural Earth II with Shaded Relief and Water**, version 3.2.0 at 1:50 million scale. Natural Earth credits Tom Patterson, Nathaniel Vaughn Kelso and other contributors and places its raster and vector data in the public domain. [Product description](https://www.naturalearthdata.com/downloads/50m-raster-data/50m-natural-earth-2/) · [Terms of use](https://www.naturalearthdata.com/about/terms-of-use/)

The source raster has 10,800 × 5,400 pixels on a north-up plate carrée grid. Its world file gives a spacing of 1/30 degree and centers the upper-left pixel at approximately 179.983333° W, 89.983333° N. Its outer edges are 180° W to 180° E and 90° N to 90° S. [Source archive](https://naturalearth.s3.amazonaws.com/50m_raster/NE2_50M_SR_W.zip)

For the Studio, the raster was downsampled to 2,160 × 1,080 pixels, then cropped by 30 rows at each pole. The packaged image has 2,160 × 1,020 pixels with identical geographic edges to the archived 7,200 × 3,400 coverage mask, spanning 180° W to 180° E and 85° N to 85° S. Each context pixel is centered half a pixel inside that extent. Colors were desaturated, warm land and blue-gray water tones were blended in, and fine relief contrast was enhanced for legibility. [Offline backdrop](../docs/assets/world-relief.webp)

This layer provides geographic orientation. The adjacent environmental-input coverage and held-out benchmark scores retain their own sources and units. The source ZIP's SHA-256 digest is `7e0e07089b699a3cccad98dd1b2446390d8e3f8c5006359d477a329cebcafaa9`.
