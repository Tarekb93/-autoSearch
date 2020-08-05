// const btn = document.querySelector("");

const input = document.querySelector("input");
// const log = document.getElementById("log");
const form = document.querySelector("form");
const subBtn = document.querySelector("#submit");
const resultsSection = document.querySelector(
  ".miniContainerForResultResponse"
);
const price = document.querySelector(".carPrice");
const HP = document.querySelector(".avr-horse-power");
const Name = document.querySelector(".car-Name");
const numModels = document.querySelector(".numModels");
const carImage = document.querySelector(".carImage");

form.addEventListener("submit", (event) => {
  event.preventDefault();
});

input.addEventListener("keyup", function (event) {
  fetch(`/`, {
    method: "post",
    body: event.target.value,
  })
    .then((res) => res.json())
    .then((data) => {
      var parent = document.getElementById("myDatalist");

      parent.innerHTML = "";

      data.forEach((itemText) => {
        var node = document.createTextNode(itemText);
        var ele = document.createElement("option");
        ele.append(node);
        parent.appendChild(ele);
      });
      console.log(data);
    });
});

///// NEED MORE WORK ////
form.addEventListener("submit", () => {
  let carData;
  if (input.value === "") {
    alert("YOU MUST WRITE SOMETHING!");
    return;
  } else {
    console.log(carData);
  }

  fetch(`/carSearch`, {
    method: "POST",
    body: input.value,
  })
    .then((response) => response.json())
    .then((response) => {
      console.log("we got data from THE SERVERRRRRRR : ", response);
      carTemplate(response);
    })
    .catch();
});

function carTemplate(carData) {
  HP.textContent = "Avg HP: " + `${carData.avg_horsepower}`;
  price.textContent = "Avg price: " + `${carData.avg_price}` + "$";
  Name.textContent = "Maker: " + `${carData.name}`;
  numModels.textContent = "Num Of Models: " + `${carData.num_models}`;
  //NOT WORKING
  // carImage.img_url = `${carData.img_url}`;
  carImage.innerHTML = `<img src=${carData.img_url}/>`;
}
