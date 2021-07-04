// declare all the element variables the are needed for the DOM
var map;

var fruitTreeLocations = [];
var comments = [];
var likes = [];
var fruitTreeTypes = [];
var userCoords = { lat: 0, lng: 0 };
var markers = [];
var infoObj = [];
var loggedIn = false;
var userId = 0;
var userName = '';

var treeIconMap = [
  {
    cherry:
      'https://icons.iconarchive.com/icons/artbees/paradise-fruits/48/Cherry-icon.png',
    apple:
      'https://icons.iconarchive.com/icons/bingxueling/fruit-vegetables/48/apple-red-icon.png',
    pear: 'https://icons.iconarchive.com/icons/google/noto-emoji-food-drink/48/32351-pear-icon.png',
  },
];

const mapDiv = document.querySelector('#map');
const fruitTreeSelectMap = document.querySelector('.fruit-tree-select-map');

const findMeBtn = document.querySelector('#find-me-btn');

// Get location form
const locationForm = document.querySelector('#location-form');

const locationInput = document.querySelector('#location-input');

//Location form outputs
const formattedAddressDiv = document.querySelector('#formatted-address');
const addressComponentsDiv = document.querySelector('#address-components');
const geometryDiv = document.querySelector('#geometry');

//GeoFindMe
const statusP = document.querySelector('#status');
const userCoordsP = document.querySelector('#user-coords');

const fruitTreeListDiv = document.querySelector('.fruit-tree-list-container');
const fruitList = document.querySelector('.fruit-tree-list');

const createFruitTreeContainer = document.querySelector(
  '.create-fruit-tree-container'
);
const fruitTreeListUl = document.querySelector('ul.fruit-tree-list');
const addFruitForm = document.querySelector('.add-fruit-form');
const fruitTreeSelect = document.querySelector('.fruit-tree-select');
const fruitDetails = document.querySelector('#fruit-details');
const fruitTreeSubmit = document.querySelector('.fruit-tree-submit');
const userLat = document.querySelector('.user-lat');
const userLng = document.querySelector('.user-lng');

const createUserForm = document.querySelector('.signup-form');

const loginForm = document.querySelector('.login-form');

const userThumbnailAccount = document.querySelector('.user-thumbnail-account');

const userThumbnailInnerHtmlSVG = `<svg
xmlns="http://www.w3.org/2000/svg"
width="1em"
height="1em"
fill="currentColor"
class="bi bi-person"
viewBox="0 0 16 16"
>
<path
  d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"
/>
</svg>`;

function initMap() {
  let mapOptions = {
    center: { lat: -37.8136, lng: 144.9631 },
    zoom: 10,
  };

  map = new google.maps.Map(mapDiv, mapOptions);
}
