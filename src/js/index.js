import "../scss/main.scss";

// Enabling PWA:
import { registerSW } from "./pwa.js";
registerSW();

const counter = document.querySelector(".app__counter--js");
const addGlass = document.querySelector(".add-button-js");
const removeGlass = document.querySelector(".remove-button-js");

const key = new Date().toISOString().slice(0, 10);
let glassCounter = 0;
counter.innerHTML = localStorage.getItem(key);

if (!localStorage.getItem(key)) {
  localStorage.setItem(key, 0);
}

const modifyCounter = (operation) => {
  if (operation === "add") {
    glassCounter++;
  } else {
    glassCounter--;
  }

  if (glassCounter < 0) {
    glassCounter = 0;
  }
  counter.innerHTML = glassCounter;
  localStorage.setItem(key, glassCounter);
};

addGlass.addEventListener("click", () => modifyCounter("add"));
removeGlass.addEventListener("click", () => modifyCounter("remove"));
