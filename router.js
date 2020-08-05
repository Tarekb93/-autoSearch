const homeHandler = require("./handlers/home");
const publicHandler = require("./handlers/public");
const missingHandler = require("./handlers/missing");
const autoComplete = require("./handlers/autocomplete");

const carDetails = require("./handlers/cardetails");

function router(request, response) {
  const url = request.url;
  console.log(url);
  const method = request.method;
  if (url === "/" && method === "GET") {
    homeHandler(request, response);
  } else if (url === "/" && method === "POST") {
    autoComplete(request, response);
  } else if (url.includes("carSearch")) {
    carDetails(request, response);
  } else if (url.includes("public")) {
    publicHandler(request, response);
  } else {
    missingHandler(request, response);
  }
}

module.exports = router;
