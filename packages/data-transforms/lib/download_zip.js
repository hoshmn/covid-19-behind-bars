"use strict";

const request = require("superagent");
const admZip = require("adm-zip");
const fs = require("fs");

const downloadZip = (url, outputDir, callback) => {
  const pieces = url.split("/");
  const fileName = outputDir + "/" + pieces[pieces.length - 1];
  return fs.promises
    .mkdir(outputDir, { recursive: true })
    .then(() => {
      return new Promise((resolve, reject) => {
        request
          .get(url)
          .on("error", function (error) {
            reject(error);
          })
          .pipe(fs.createWriteStream(fileName))
          .on("finish", function () {
            var zip = new admZip(fileName);
            zip.extractAllTo(outputDir, true);
            fs.unlinkSync(fileName);
            resolve(pieces[pieces.length - 1]);
          });
      });
    });
};

module.exports = downloadZip;
