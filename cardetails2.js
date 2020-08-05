const axios = require("axios");
const fs = require("fs");
const path = require("path");
const filterItems = (arr, query) => {
  return arr.filter(
    (el) => el.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );
};
const url =
  "https://private-anon-e0d6dd8bf5-carsapi1.apiary-mock.com/manufacturers";

function carDetails(request, response) {
  let body = "";
  // callback runs every time the stream has the next bit of data
  axios
    .get(url)
    .then(function (response) {
      //   console.log(response);
      console.log(request.url.split("="));
      const urlArray = request.url.split("=");
      const carName = urlArray[1];
      const carInfo = filter(carName, body);
      console.log(carInfo);
    })
    .catch(function (error) {
      console.log(error);
      missingHandler(request, response);
    })
    .finally(function () {
      response.end(JSON.stringify(result));
    });
}

module.exports = carDetails;