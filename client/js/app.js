//Call Geocode

//this tells us where it's gonna mark it but not a marker of google, used this to create google marker which is will be in mapMarkers

const filterLocationsByFruit = () => {
  let fruitTreeValue = fruitTreeSelectMap.value;
  deleteMarkers();
  if (fruitTreeValue === 'Select all fruit') {
    fruitTreeLocations.forEach((marker) => {
      addMarker(marker);
    });
    createFruitList(fruitTreeLocations);
  } else {
    let selectedFruits = fruitTreeLocations.filter(
      (fruit) => fruit.name === fruitTreeValue
    );
    selectedFruits.forEach((marker) => {
      addMarker(marker);
    });
    createFruitList(selectedFruits);
  }
};

function setMapOnAll(map) {
  markers.forEach((marker) => {
    marker.setMap(map);
  });
}

function deleteMarkers() {
  setMapOnAll(null);
  markers = [];
}

function geoFindMe() {
  userCoordsP.textContent = '';

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    userCoords.lat = latitude;
    userCoords.lng = longitude;
    console.log(latitude);
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

function userLocationOnMap() {
  statusP.textContent = '';
  userCoordsP.textContent = `Latitude: ${latitude}, Longitude: ${longitude}`;
  addMarker({ coords: { lat: latitude, lng: longitude } });
  initialLocation = new google.maps.LatLng(
    position.coords.latitude,
    position.coords.longitude
  );
  map.setCenter(initialLocation);
}

function handleAddFruitSubmit(e) {
  e.preventDefault();

  if (loggedIn) {
    navigator.geolocation.getCurrentPosition((res) => {
      const data = Object.fromEntries(new FormData(addFruitForm));
      data['loc_lat'] = res.coords.latitude;
      data['loc_long'] = res.coords.longitude;
      data['user_id'] = userId;
      data['coords'] = {
        lat: data.loc_lat,
        lng: data.loc_long,
      };
      createFruitTree(
        data.user_id,
        data.name,
        data.details,
        data.loc_lat,
        data.loc_long
      );
      addMarker(data);
      buildMapMakers();
    });
  }
}

// findMeBtn.addEventListener('click', geoFindMe);
fruitTreeSelectMap.addEventListener('change', filterLocationsByFruit);
addFruitForm.addEventListener('submit', handleAddFruitSubmit);
