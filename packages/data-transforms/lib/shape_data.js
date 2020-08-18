"use strict";

const fs = require("fs");
const glob = require("glob");
const downloadZip = require("./download_zip");
const { applyTransforms } = require("./transform_data");

/**
 * Extracts files from a provided zip file URL
 * into the provided output directory
 * @param {*} url
 * @param {*} outputDir
 * @param {*} match
 * @returns an array of filenames extracted from the zip that match the glob pattern
 */
var extractCsvFiles = (url, outputDir = "./tmp", match = "*.csv") => {
  return downloadZip(url, outputDir).then((fileName) => {
    console.debug("downloaded and extracted: " + fileName);
    return new Promise((resolve, reject) => {
      glob(outputDir + "/" + match, function (er, files) {
        if (!files || files.length === 0 || er)
          return reject(er || new Error("no matching file in zip file"));
        return resolve(files);
      });
    });
  });
};

function shapeData(sourceUrl, transforms, { match, clean = true, ...options }) {
  const PROCESSING_DIR = "./tmp";
  return extractCsvFiles(sourceUrl, PROCESSING_DIR, match)
    .then((files) => applyTransforms(files[0], transforms, options))
    .then((result) =>
      clean
        ? fs.promises
            .rmdir(PROCESSING_DIR, { recursive: true })
            .catch((err) =>
              console.warn("could not clean up directory: " + PROCESSING_DIR)
            )
            .then(() => result)
        : result
    );
}

module.exports = shapeData;
