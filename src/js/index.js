import "../scss/main.scss";

// Enabling PWA:
import { registerSW } from "./pwa.js";
registerSW();

const counter = document.querySelector(".app__counter--js");
const addGlass = document.querySelector(".add-button-js");
const removeGlass = document.querySelector(".remove-button-js");
const water = document.querySelector(".water");

const key = new Date().toISOString().slice(0, 10);
let glassCounter = 0;
counter.innerHTML = localStorage.getItem(key);

if (!localStorage.getItem(key)) {
  localStorage.setItem(key, 0);
}

if (glassCounter === 0) {
  console.log(localStorage.getItem(key));
  water.style.opacity = 0;
}

const modifyCounter = (operation) => {
  if (operation === "add") {
    glassCounter++;
    counter.classList.remove("app__counter--animated");
    water.classList.remove("water--animated-fill");
    void counter.offsetWidth;
    void water.offsetWidth;
    counter.classList.add("app__counter--animated");
    water.classList.add("water--animated-fill");
  } else if (operation === "add" && glassCounter > 0) {
    glassCounter--;
    counter.classList.remove("app__counter--animated");
    water.classList.remove("water--animated-drain");
    void counter.offsetWidth;
    void water.offsetWidth;
    counter.classList.add("app__counter--animated");
    water.classList.add("water--animated-drain");
  }

  counter.innerHTML = glassCounter;
  localStorage.setItem(key, glassCounter);
};

addGlass.addEventListener("click", () => modifyCounter("add"));
removeGlass.addEventListener("click", () => modifyCounter("remove"));
