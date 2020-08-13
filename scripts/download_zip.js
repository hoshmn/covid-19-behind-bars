"use strict";

const request = require("superagent");
const admZip = require("adm-zip");
const fs = require("fs");

const downloadZip = (url, outputDir, callback) => {
  const pieces = url.split("/");
  const fileName = outputDir + "/" + pieces[pieces.length - 1];
  return request
    .get(url)
    .on("error", function (error) {
      console.log(error);
    })
    .pipe(fs.createWriteStream(fileName))
    .on("finish", function () {
      var zip = new admZip(fileName);
      zip.extractAllTo(outputDir, true);
      fs.unlinkSync(fileName);
    });
};

module.exports = downloadZip;
