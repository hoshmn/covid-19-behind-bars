const dataTransforms = require("../../data-transforms");

var myArgs = process.argv.slice(2);

const DEBUG = !!myArgs.find((a) => a === "--debug");

const FILE_URL =
  "https://github.com/Hyperobjekt/covid-19-behind-bars/raw/development/source_data/CovidBehindBars-07-24-2020.zip";
const OUTPUT_FILE = "./src/assets/map.csv";

dataTransforms
  .shapeMapData(FILE_URL, {
    outputFile: OUTPUT_FILE,
    debug: DEBUG,
  })
  .then((data) => {
    console.log("shaping map data complete");
  });
