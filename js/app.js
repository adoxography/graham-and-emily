/* global L */

/*
|==============================================================================
| Circle animation
|==============================================================================
|
|
*/

const circles = document.querySelectorAll('circle');
const circleWrappers = document.querySelectorAll('.circle-container');
const hamburgerContainer = document.querySelector('.hamburger-container');
const navigationContainer = document.querySelector('.navigation-container');
const navigation = document.querySelector('.navigation');
const rsvpForm = document.querySelector('#rsvp-form');

for (const circle of circles) {
  const cx = circle.getAttribute('cx');
  const cy = circle.getAttribute('cy');
  circle.setAttribute('transform-origin', `${cx}px ${cy}px`);

  circle.style.setProperty('--breathe-size', 1 + Math.random() * 0.1);
  circle.style.setProperty('--breathe-time', (6 + Math.random() * 4) + 's');
}

for (const wrapper of circleWrappers) {
  wrapper.style.setProperty('--appear-time', (1 + Math.random() * 2) + 's');
  wrapper.style.setProperty('--orbit-time', (6 + Math.random() * 4) + 's');
  wrapper.style.setProperty('--orbit-direction', Math.random() > 0.5 ? 1 : -1);
}

const openNav = () => {
  navigationContainer.classList.add('navigation-container--open');
  hamburgerContainer.removeEventListener('mouseenter', openNav);
  setTimeout(() => {
    document.addEventListener('mousemove', closeNav);
  }, 250);
};

const closeNav = e => {
  const rect = navigation.getBoundingClientRect();
  if (e.x < rect.left || e.y > rect.bottom) {
    navigationContainer.classList.remove('navigation-container--open');
    document.removeEventListener('mousemove', closeNav);
    hamburgerContainer.addEventListener('mouseenter', openNav);
  }
};

hamburgerContainer.addEventListener('mouseenter', openNav);

rsvpForm.addEventListener('submit', e => {
  e.preventDefault();

  console.log('Done');
});


/*
|==============================================================================
| Map
|==============================================================================
|
|
*/

const mymap = L.map('map').setView([49.88806, -97.12862], 17);
const receptionMarker = L.marker([49.88786, -97.12983]);
const ceremonyMarker = L.marker([49.88918, -97.12704]);

const createPopup = (title, link) => `<div class="map-popup">
  <p class="map-popup__title">
    ${title}
  <p>
  <a class="map-popup__link" href="${link}" target="_blank" rel="noopener noreferrer">
    Directions
  </a>
</div>`;

receptionMarker.bindPopup(
  createPopup(
    'Reception @ the Inn at the Forks',
    'https://www.google.ca/maps/dir//Inn+at+the+Forks,+Forks+Market+Road,+Winnipeg,+MB/@49.8880022,-97.1330088,16.22z/data=!4m9!4m8!1m0!1m5!1m1!1s0x52ea714e9bd5d781:0x9c8b7ed979d7824f!2m2!1d-97.129557!2d49.887877!3e0'
  )
);

ceremonyMarker.bindPopup(
  createPopup(
    'Ceremony @ the Lookout',
    'https://www.google.ca/maps/dir//The+Forks+National+Historic+Amphitheatre/@49.8889644,-97.128683,17.11z/data=!4m9!4m8!1m0!1m5!1m1!1s0x52ea714930047009:0xc36d9e37d8c3a8d4!2m2!1d-97.1271229!2d49.8891602!3e0'
  )
);

receptionMarker.addTo(mymap);
ceremonyMarker.addTo(mymap);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Tiles &copy; Esri &mdash; Source: Esri',
  maxZoom: 18,
  tileSize: 512,
  zoomOffset: -1
}).addTo(mymap);
