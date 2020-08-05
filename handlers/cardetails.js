const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { default: Axios } = require("axios");

const url =
  "https://private-anon-e0d6dd8bf5-carsapi1.apiary-mock.com/manufacturers";

function carDetails(request, response) {
  let carName = "";
  request.on("data", (chunck) => {
    carName += chunck;
  });
  request.on("end", () => {
    if (carName) {
      console.log("we are inside ther SERVERRRR", carName);
      axios
        .get(url)
        .then((res) => {
          // console.log("testing the data we got", response.data);
          let resultsArray = res.data.filter((element) => {
            if (element.name.toLowerCase() === carName.toLowerCase()) {
              return element;
            }
          });
          // console.log("this is the results array", resultsArray[0]);
          const dataElement = resultsArray[0];
          response.end(JSON.stringify(dataElement));
        })
        .catch((err) =>
          console.log("we ran into an issue reteriving from the api:", err)
        );
    } else {
      console.log("something went wrong, data is empty");
    }
  });
  // callback runs every time the stream has the next bit of data
  //   axios
  //     .get(url)
  //     .then(function (response) {
  //       //   console.log(response);
  //       console.log(request.url.split("="));
  //       const urlArray = request.url.split("=");
  //       const carName = urlArray[1];
  //       const carInfo = filter(carName, body);
  //       console.log(carInfo);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //       missingHandler(request, response);
  //     })
  //     .finally(function () {
  //       response.end(JSON.stringify(result));
  //     });
}

module.exports = carDetails;
