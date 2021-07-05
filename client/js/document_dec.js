// declare all the element variables the are needed for the DOM
var map;

var fruitTreeLocations = [];
var comments = [];
var likes = [];
var fruitTreeTypes = [];
var userCoords = { lat: 0, lng: 0 };
var markers = [];
var infoObj = [];
if (typeof (loggedIn !== 'undefined')) {
  var loggedIn = false;
}
var userId;
var userName;

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

const userTreeInfo = document.querySelector('.user-tree-info')

function initMap() {
  let mapOptions = {
    center: { lat: -37.8136, lng: 144.9631 },
    zoom: 10,
  };
  geocoder = new google.maps.Geocoder();
  map = new google.maps.Map(mapDiv, mapOptions);
}
