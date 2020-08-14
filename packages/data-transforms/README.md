# `@ucla-law/data-transforms`

Contains data transforming functions for generating static data files for visualizations.

## Usage

### `shapeData(sourceUrl, transforms, options)`

Takes a source zip file, extracts a data file, and applies the provided transforms.

- `sourceUrl`: url to fetch zip file from
- `transforms`: an array of transform functions that accept data and return a transformed data set.
- `options`:
  - `match`: glob to match data file from the zip file extraction (default: `*.csv`)
  - `clean`: removes the temporary folder created when extracting zip file (default: `true`)
  - `outputFile`: when set, the transformed data will be written to this file (default: `undefined`)
  - `parser`: a function for parsing data rows in the CSV (default: `d3.autoType`)

**Example**: shape a CSV dataset to contain only the first 10 rows and the "id" and "name columns.

```js
var dataTransforms = require("@ucla-law/data-transforms");

// zip file containing data.csv file
var SOURCE_DATA = "https://website.example/data.zip";

// transform function that returns the first 10 entries
var filterFirstTen = (data) => data.slice(0, 10);

// transform function that returns only "id" and "name" values
var selectIdName = (data) =>
  data.map((d) => ({ id: d["id"], name: d["name"] }));

// fetch the file and apply transforms
shapeData(SOURCE_DATA, [selectFirstTen, selectIdName]).then(
  (data) => {
    // work with transformed data
    console.log(data);
  }
);
```

### `shapeMapData(sourceUrl, options)`

Shortcut function for shaping the data file for the map visualization

- `sourceUrl`: url to fetch zip file from
- `options`:
  - `match`: glob to match data file from the zip file extraction (default: `*.csv`)
  - `clean`: removes the temporary folder created when extracting zip file (default: `true`)
  - `outputFile`: when set, the transformed data will be written to this file (default: `undefined`)
  - `parser`: a function for parsing data rows in the CSV (default: `d3.autoType`)
