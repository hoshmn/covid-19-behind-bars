"use strict";

const fs = require("fs");
const d3 = require("d3");

/**
 * Takes input file and pulls data for most recent date
 * @param {*} inputFile 
 * @param {*} outputFile 
 */
const transformSync = (inputFile, outputFile) => {
  const filePieces = outputFile.split("/");
  const outputFileName = filePieces.pop();
  const outputFileDir = filePieces.join("/");
  const formatDate = d3.timeFormat("%B %e, %Y")
  let file = fs.readFileSync(inputFile, { encoding: "utf8" });
  let parsed = d3.csvParse(file, d3.autoType)
  // get max date from dataset
  const maxDate = d3.max(parsed, (d) => +d["Date"])
  // filter out rows that are not max date
  const dataSubset = parsed.filter((d) => +d["Date"] === maxDate)
  // make dir if needed
  fs.promises.mkdir(outputFileDir, { recursive: true })
    .catch(error => { console.error('caught exception : ', error.message); });
  // write file
  fs.writeFile(outputFile, d3.csvFormat(dataSubset), function (err) {
      if (err) throw err;
      console.info("output data for " + formatDate(new Date(maxDate)) + " to " + outputFile);
  });
}

module.exports = transformSync;
