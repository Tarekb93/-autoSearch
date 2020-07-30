// const btn = document.querySelector("");

const input = document.querySelector("input");
// const log = document.getElementById("log");

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
