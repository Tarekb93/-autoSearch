const axios = require("axios");
const fs = require("fs");
const path = require("path");

const url =
  "https://private-anon-e0d6dd8bf5-carsapi1.apiary-mock.com/manufacturers";

function carDetails(request, response) {
  let carName = "";
  request.on("data", (chunck) => {
    carName += chunck;
  });
  request.on("end", () => {
    if (carName) {
      console.log(carName);
      axios
        .get(url)
        .then((res) => {
          let resultsArray = res.data.filter((element) => {
            if (element.name.toLowerCase() === carName.toLowerCase()) {
              return element;
            }
          });
          const dataElement = resultsArray[0];
          response.end(JSON.stringify(dataElement));
        })
        .catch(
          (err) => response.writeHead(500, { "content-type": "text/html" }),
          response.end(`<h1>Error in Received Data"</h1>`)
        );
    } else {
      response.writeHead(500, { "content-type": "text/html" }),
        response.end(`<h1>Server error, No Data is givin"</h1>`);
    }
  });
}

module.exports = carDetails;
