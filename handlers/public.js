const fs = require("fs");
const path = require("path");
const missingHandler = require("./missing");

const types = {
  html: "text/html",
  css: "text/css",
  js: "application/javascript",
  ico: "image/png",
  jpg: "image/jpeg",
};

function publicHandler(request, response) {
  const urlArray = request.url.split(".");
  const extension = urlArray[1];
  const type = types[extension];
  const url = request.url;
  const filePath = path.join(__dirname, "..", url);
  fs.readFile(filePath, (error, file) => {
    if (error) {
      console.log(error);
      missingHandler(request, response);
    } else {
      response.writeHead(200, { "content-type": type });
      response.end(file);
    }
  });
}

module.exports = publicHandler;
