


var map 

// Add marker function 
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
    google.maps.Map(document.querySelector('#map'), options);

    // Array of markers 
    markerProps.forEach(marker => {
        addMarker(marker)
    })
}

// Get location form 
var locationForm = document.querySelector('#location-form');

//listen for submit

locationForm.addEventListener('submit', geoCode);

function geoCode(e) {
  e.preventDefault();

  let location = document.querySelector('#location-input').value;

  axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
    params:{
      address: location,
<<<<<<< HEAD
      key: apiKey
=======
      key: "INSERT API KEY"
>>>>>>> 9df1764 (remove api key 2nd time)
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