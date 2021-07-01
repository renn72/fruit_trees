//Call Geocode
var map 

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
//this tells us where it's gonna mark it but not a marker of google, used this to create google marker which is will be in mapMarkers


fruitTreeTypes.forEach(item => {
  let fruitOption = document.createElement('option');
  fruitOption.textContent = item;
  fruitTreeSelect.appendChild(fruitOption);
})


const filterLocationsByFruit = () => {
  let fruitTreeValue = fruitTreeSelect.value;
  deleteMarkers();
  markerProps.filter(fruit => fruit.content === fruitTreeValue)
    .forEach(marker => {
      addMarker(marker)
  })
}

fruitTreeSelect.addEventListener('change', filterLocationsByFruit)



// Add marker fucntion 
function addMarker(props){
    var marker = new google.maps.Marker({
        position: props.coords, 
        map: map,
        // icon: props.iconImage
    });
    //check for customicon
    if(props.iconImage){
        // Set icon image
        marker.setIcon(props.iconImage);
    }

    if(props.content){
        var infoWindow = new google.maps.InfoWindow({
            content: props.content,
        });
    
        marker.addListener("click", function(){
            infoWindow.open(map, marker);
        });
    }
    markers.push(marker)
}


function setMapOnAll(map) {
  markers.forEach(marker => {
    marker.setMap(map)
  })
}

function clearMarkers() {
  setMapOnAll(null)
}

function deleteMarkers() {
  clearMarkers();
  markers = [];
}


function initMap() {
    // map options    
    var options = {
            center: { lat: -37.8136, lng: 144.9631},
            zoom: 8
        }
    // New map
    map = new 
    google.maps.Map(mapDiv, options);

    // Array of markers 
    markerProps.forEach(marker => {
        addMarker(marker)
    })
}

// Get location form 

//listen for submit

locationForm.addEventListener('submit', geoCode);

function geoCode(e) {
  e.preventDefault();

  axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
    params:{
      address: locationInput.value,
      key: "AIzaSyAPQMpyMTTyRwoHrUbbsMfdy0YvjtGpzhc"
    }
  })
  .then(function(res){
    //Log full response 
    console.log(res)

    // Formatted address
    let formattedAddress = (res.data.results[0].formatted_address)
    let formattedAddressOutput = `
      <ul class="list-group">
        <li class="list-group-item">${formattedAddress}</li>
      </ul>
    `;

    // Add geometry
    let lat = (res.data.results[0].geometry.location.lat)
    let lng = (res.data.results[0].geometry.location.lng)

    let geometryOutput = `
      <ul class="list-group">
        <li class="list-group-item">Latitude: ${lat}</li>
        <li class="list-group-item">Longtitude: ${lng}</li>
      </ul>
    `;

    // Address components 
    let addressComponents = res.data.results[0].address_components;
    let addressComponentsOutput = '<ul class="list-group">';
    addressComponents.forEach((component, i) => {
      addressComponentsOutput += `
        <li class="list-group-item">${addressComponents[i].types[0]}: 
        ${addressComponents[i].long_name}</li> 
      `;
    });
    addressComponentsOutput += '</ul>'

    // Output to app
    document.querySelector('#formatted-address').innerHTML = 
    formattedAddressOutput;

    document.querySelector('#address-components').innerHTML = 
    addressComponentsOutput;

    document.querySelector('#geometry').innerHTML = 
    geometryOutput;

    addMarker({coords: {lat: lat,lng: lng}});

  }).catch(function(error){

    console.log(error);

  })
}




function geoFindMe() {

  const status = document.querySelector('#status');
  const userCoords = document.querySelector('#user-coords');

  userCoords.textContent = '';

  function success(position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;

    status.textContent = '';
    userCoords.textContent = `Latitude: ${latitude}, Longitude: ${longitude}`;
    addMarker({coords: {lat: latitude, lng: longitude}});
    initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    map.setCenter(initialLocation);
  }

  function error() {
    status.textContent = 'Unable to retrieve your location';
  }

  if(!navigator.geolocation) {
    status.textContent = 'Geolocation is not supported by your browser';
  } else {
    status.textContent = 'Locating...';
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

document.querySelector('#find-me').addEventListener('click', geoFindMe);