

let h1 = document.querySelector("h1");

document.querySelector(".button").addEventListener("click", (param) => {
    console.log(param);
    alert("Alert!???");
});

let from = document.querySelector(".input");
let to = document.querySelector(".typed");
from.addEventListener("keyup", () => {
    to.textContent = from.value;
});
