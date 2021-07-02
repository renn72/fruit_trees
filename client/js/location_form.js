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
