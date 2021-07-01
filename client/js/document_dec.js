
// declare all the element variables the are needed for the DOM 
const mapDiv = document.querySelector('#map');
const fruitTreeSelectMap = document.querySelector('.fruit-tree-select-map');

// Get location form 
const locationForm = document.querySelector('#location-form');

const locationInput = document.querySelector('#location-input');


//Location form outputs
const formattedAddressDiv = document.querySelector('#formatted-address');
const addressComponentsDiv =document.querySelector('#address-components');
const geometryDiv = document.querySelector('#geometry');

//GeoFindMe
const statusP = document.querySelector('#status');
const userCoordsP = document.querySelector('#user-coords');

const fruitTreeTypes = ["apple","orange","lemon", "mango", "grapes", "lime", "pomegranate"];
var markers = [];
let markerProps = [
  {
      coords: {lat: -37.8066381,lng: 144.98555159999998}, 
      iconImage:"https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
      content:"apple"
  },
  {
      coords:{lat: -38.3333,lng: 144.3167},
      content: "mango"
  },
  {
      coords:{lat: -38.4899,lng: 145.2038},
      content: "apple"
  }
]
