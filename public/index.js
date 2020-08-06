const input = document.querySelector("input");
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
      console.log(response);
      carTemplate(response);
    })
    .catch();
});

function carTemplate(carData) {
  HP.textContent = "Avg HP: " + `${carData.avg_horsepower.toFixed(2)}`;
  price.textContent = "Avg price: " + `${carData.avg_price.toFixed(2)}` + "$";
  Name.textContent = "Maker: " + `${carData.name}`;
  numModels.textContent = "Num Of Models: " + `${carData.num_models}`;
  carImage.src = carData.img_url;
}
