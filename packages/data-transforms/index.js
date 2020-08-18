"use strict";

const { transforms } = require("./lib/transform_data");
const shapeData = require("./lib/shape_data");

var myArgs = process.argv.slice(2);

const DEBUG = !!myArgs.find((a) => a === "--debug");

const FILE_URL =
  "https://github.com/Hyperobjekt/covid-19-behind-bars/raw/bfc184ebf2daf90d2baddbc07508708895bf728f/source_data/CovidBehindBars-07-24-2020.zip";
const OUTPUT_FILE = "../national-map/src/assets/data/map.csv";

/**
 * Extracts dataset from source zip and shapes for map visualization
 * @param {*} sourceUrl
 * @param {*} options
 */
function shapeMapData(sourceUrl, options) {
  const selectMaxDate = transforms.selectRowsWithMaxValue((d) => +d["Date"]);
  return shapeData(sourceUrl, [selectMaxDate], options);
}

shapeMapData(FILE_URL, {
  outputFile: OUTPUT_FILE,
  debug: DEBUG,
}).then((data) => {
  console.log("shaping map data complete");
});
