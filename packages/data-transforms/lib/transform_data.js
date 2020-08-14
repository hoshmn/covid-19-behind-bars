"use strict";

const fs = require("fs");
const d3 = require("d3");

function strSize(str) {
  // Matches only the 10.. bytes that are non-initial characters in a multi-byte sequence.
  var m = encodeURIComponent(str).match(/%[89ABab]/g);
  const bytes = str.length + (m ? m.length : 0);
  if (bytes < 1000) return bytes + " bytes";
  if (bytes < 1000000) return Math.round(bytes / 1000) + "KB";
  return Math.round(bytes / 1000000) + "MB";
}

const logDatasetDetails = (name, dataset) => {
  const str = d3.csvFormat(dataset);
  console.debug(
    name + ": ",
    dataset.length + " rows,",
    Object.keys(dataset[0]).length + " columns",
    "(" + strSize(str) + ")"
  );
};

/**
 * Creates a transform function that will pull
 * the rows containing a maximum value in the dataset
 * (e.g. rows with the latest date)
 * @param {*} selector a selector function for pulling the value from the desired row
 */
const selectRowsWithMaxValue = (selector) => (data) => {
  // get max date from dataset
  const maxValue = d3.max(data, selector);
  // filter out rows that are not max date
  return data.filter((d) => selector(d) === maxValue);
};

/**
 * Writes data to a file, makes required directories if needed.
 * @param {*} data
 * @param {*} outputFile
 */
const writeDataFile = (data, outputFile) => {
  const filePieces = outputFile.split("/");
  const outputFileName = filePieces.pop();
  const outputFileDir = filePieces.join("/");
  // make dir if needed
  return fs.promises
    .mkdir(outputFileDir, { recursive: true })
    .then(() => {
      // write file
      return new Promise((resolve, reject) => {
        fs.writeFile(outputFile, data, (err) => {
          if (err) return reject(err);
          console.info(
            "wrote transformed data to: " + outputFile
          );
          return resolve(outputFile);
        });
      });
    })
    .catch((error) => {
      console.error("caught exception : ", error.message);
      return error;
    });
};

/**
 * Takes input file and pulls data for most recent date
 * @param {*} inputFile
 * @param {*} outputFile
 */
const applyTransforms = (
  inputFile,
  transforms = [],
  { outputFile, parser = d3.autoType, debug = false }
) => {
  console.info("reading file: ", inputFile);
  let file = fs.readFileSync(inputFile, {
    encoding: "utf8",
  });
  console.info("parsing data...");
  let parsedData = d3.csvParse(file, parser);
  debug && logDatasetDetails("full data", parsedData);
  const transformedData = transforms.reduce(
    (dataSubset, transform) => transform(dataSubset),
    parsedData
  );
  debug &&
    logDatasetDetails("transformed data", transformedData);
  if (!outputFile) return Promise.resolve(transformedData);
  return writeDataFile(
    d3.csvFormat(transformedData),
    outputFile
  ).then(() => transformedData);
};

module.exports = {
  applyTransforms,
  transforms: {
    selectRowsWithMaxValue,
  },
};
