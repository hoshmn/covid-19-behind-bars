const glob = require("glob");
const downloadZip = require("./scripts/download_zip");
const transformMapData = require("./scripts/transform_map_data");

const FILE_URL =
  "https://github.com/Hyperobjekt/covid-19-behind-bars/raw/development/source_data/CovidBehindBars-07-24-2020.zip";
const PROCESSING_DIR = "./tmp"
const OUTPUT_FILE = "./data/map.csv"

downloadZip(FILE_URL, PROCESSING_DIR).on("finish", () => {
  console.info("downloaded and extracted zip file");
  glob(PROCESSING_DIR + "/*.csv", function (er, files) {
    if (!files || files.length === 0)
      throw new Error("no CSV data found in zip file output");
    transformMapData(files[0], OUTPUT_FILE);
  });
});
