//Call Geocode
var map;

//this tells us where it's gonna mark it but not a marker of google, used this to create google marker which is will be in mapMarkers



const filterLocationsByFruit = () => {
  let fruitTreeValue = fruitTreeSelectMap.value;
  deleteMarkers();
  let selectedFruits = markerProps.filter(fruit => fruit.content === fruitTreeValue)
    selectedFruits.forEach(marker => {
      addMarker(marker)
  })
  createFruitList(selectedFruits)
}


    marker.addListener('click', function () {
      infoWindow.open(map, marker);
    });
  }
  markers.push(marker);
}

function setMapOnAll(map) {
  markers.forEach((marker) => {
    marker.setMap(map);
  });
}

function clearMarkers() {
  setMapOnAll(null);
}

function deleteMarkers() {
  clearMarkers();
  markers = [];
}

function initMap() {
  // map options
  var options = {
    center: { lat: -37.8136, lng: 144.9631 },
    zoom: 8,
  };
  // New map
  map = new google.maps.Map(mapDiv, options);

  // Array of markers
  markerProps.forEach((marker) => {
    addMarker(marker);
  });
}

// Get location form

//listen for submit

locationForm.addEventListener('submit', geoCode);

function geoCode(e) {
  e.preventDefault();

  axios
    .get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: locationInput.value,
        key: 'AIzaSyAPQMpyMTTyRwoHrUbbsMfdy0YvjtGpzhc',
      },
    })
    .then(function (res) {
      //Log full response
      console.log(res);

      // Formatted address
      let formattedAddress = res.data.results[0].formatted_address;
      let formattedAddressOutput = `
      <ul class="list-group">
        <li class="list-group-item">${formattedAddress}</li>
      </ul>
    `;

      // Add geometry
      let lat = res.data.results[0].geometry.location.lat;
      let lng = res.data.results[0].geometry.location.lng;

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
      addressComponentsOutput += '</ul>';

      // Output to app
      formattedAddressDiv.innerHTML = formattedAddressOutput;

      addressComponentsDiv.innerHTML = addressComponentsOutput;

      geometryDiv.innerHTML = geometryOutput;

      addMarker({ coords: { lat: lat, lng: lng } });
    })
    .catch(function (error) {
      console.log(error);
    });
}

function geoFindMe() {
  userCoordsP.textContent = '';

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    statusP.textContent = '';
    userCoordsP.textContent = `Latitude: ${latitude}, Longitude: ${longitude}`;
    addMarker({ coords: { lat: latitude, lng: longitude } });
    initialLocation = new google.maps.LatLng(
      position.coords.latitude,
      position.coords.longitude
    );
    map.setCenter(initialLocation);
  }

  function error() {
    statusP.textContent = 'Unable to retrieve your location';
  }

  if (!navigator.geolocation) {
    statusP.textContent = 'Geolocation is not supported by your browser';
  } else {
    statusP.textContent = 'Locating...';
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

document.querySelector('#find-me').addEventListener('click', geoFindMe);

fruitTreeSelectMap.addEventListener('change', filterLocationsByFruit)
