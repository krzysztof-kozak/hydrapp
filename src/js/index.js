import '../scss/main.scss';

// Enabling PWA:
import { registerSW } from './pwa.js';
registerSW();

const counter = document.querySelector('.app__counter--js');
const addGlass = document.querySelector('.add-button-js');
const removeGlass = document.querySelector('.remove-button-js');
const water = document.querySelector('.water--js');
const menu = document.querySelector('.menu__button--js');
const navigation = document.querySelector('.navigation--js');
const navigationList = document.querySelectorAll('.navigation__item--js');
const appScreen = document.querySelector('.content-wrapper--js');
const info = document.querySelector('.info--js');

menu.addEventListener('click', () => navigation.classList.toggle('navigation-open'));

navigationList.forEach((element) => {
  element.addEventListener('click', () => {
    navigation.classList.toggle('navigation-open');
    if (element.getAttribute('data-link') === 'learn-more' && info.classList.contains('hidden')) {
      appScreen.classList.toggle('hidden');
      info.classList.toggle('hidden');
    } else if (element.getAttribute('data-link') === 'home' && appScreen.classList.contains('hidden')) {
      appScreen.classList.toggle('hidden');
      info.classList.add('hidden');
    }
  });
});

const key = new Date().toISOString().slice(0, 10);
counter.innerHTML = localStorage.getItem(key);

const data = Object.entries(localStorage);
const userHistory = data.filter((entry) => entry[0].includes('2020-'));
const statsMarkup = document.querySelector('.list--js');

userHistory.map((entry) => {
  const listItem = document.createElement('li');
  listItem.classList.add('list__item');
  listItem.innerHTML = `On <span class="accent">${entry[0]}</span> you drank <span class="accent">${entry[1]}</span>glasses of water.`;
  statsMarkup.appendChild(listItem);
});

if (!localStorage.getItem(key)) {
  localStorage.setItem(key, 0);
}

let glassCounter = parseInt(localStorage.getItem(key));

if (glassCounter === 0) {
  water.style.opacity = 0;
}

const modifyCounter = (operation) => {
  if (operation === 'add') {
    glassCounter++;
    water.classList.remove('water--animated-drain-full');
    counter.classList.remove('app__counter--animated');
    water.classList.remove('water--animated-fill');
    water.classList.remove('water--animated-drain');
    void counter.offsetWidth;
    void water.offsetWidth;
    counter.classList.add('app__counter--animated');
    water.classList.add('water--animated-fill');
  } else if (operation === 'remove' && glassCounter === 1) {
    glassCounter--;
    counter.classList.add('app__counter--animated');
    water.classList.add('water--animated-drain-full');
  } else if (operation === 'remove' && glassCounter > 0) {
    glassCounter--;
    water.classList.remove('water--animated-drain-full');
    counter.classList.remove('app__counter--animated');
    water.classList.remove('water--animated-drain');
    void counter.offsetWidth;
    void water.offsetWidth;
    counter.classList.add('app__counter--animated');
    water.classList.add('water--animated-drain');
  }

  counter.innerHTML = glassCounter;
  localStorage.setItem(key, glassCounter);
};

addGlass.addEventListener('click', () => modifyCounter('add'));
removeGlass.addEventListener('click', () => modifyCounter('remove'));
