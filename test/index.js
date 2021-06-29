let map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });

  google.maps.event.addListener(map, 'click', function (event) {
    new google.maps.Marker({
      position: event.latLng,
      map: map,
    });
  });
}
