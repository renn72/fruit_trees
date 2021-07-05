// build the page that the user sees once the page has loaded.

function createFruitDropDownMap() {
  fruitTreeTypes.forEach((item) => {
    let fruitOption = document.createElement('option');
    fruitOption.textContent = item;
    fruitTreeSelectMap.appendChild(fruitOption);
  });
}

function createFruitList(fruits) {
  while (fruitList.firstChild) {
    fruitList.firstChild.remove();
  }
  fruitTreeListUl.style.border = 'solid 1px green';

  fruits.forEach((fruit) => {
    let fruitItemName = document.createElement('li');
    fruitItemName.textContent = `Fruit: ${fruit.content}`;
    fruitList.appendChild(fruitItemName);
    let fruitItem = document.createElement('li');
    fruitItem.textContent = `--> ${fruit.details}`;
    fruitList.appendChild(fruitItem);
  });

  fruitTreeListDiv.appendChild(fruitList);
}


function addFruitTreeDiv() {
  fruitTreeTypes.forEach((item) => {
    let fruitOption = document.createElement('option');
    fruitOption.textContent = item;
    fruitTreeSelect.appendChild(fruitOption);
  });
}

function buildMapMakers() {
  fruitTreeLocations.forEach((marker) => {
    addMarker(marker);
  });
}

function addMarker(props) {
  let marker = new google.maps.Marker({
    position: props.coords,
    map: map,
    icon: treeIconMap[0][props.name],
    title: props.address,
  });
  if (props.iconImage) {
    marker.setIcon(props.iconImage);
  }

  if (props.content) {
    let commentStr = '';

    props.comments.forEach((comment) => {
      commentStr += `<p> - ${comment}</p> `;
    });

    let contentString =
      `<p id="firstHeading" class="firstHeading">${props.name}</p>` +
      `<p><span class="like-info-window">Likes:</span> ${props.likes}</p>` +
      `<p><span class="details-info-window">Details:</span> ${props.details}</p>` +
      `<p><span class="details-info-window">Comments:</span> ${commentStr}</p>` +
      `<p><span class="details-info-window">Distance:</span> ${distance(
        props.coords.lat,
        props.coords.lng,
        userCoords.lat,
        userCoords.lng,
        'K'
      )}km</p>`;

    let infoWindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 700,
    });

    marker.addListener('click', function () {
      closeOtherInfoWindows();
      infoWindow.open(map, marker);
      infoObj[0] = infoWindow;
    });
  }
  markers.push(marker);
}

function closeOtherInfoWindows() {
  if (infoObj.length > 0) {
    infoObj[0].set('marker', null);
    infoObj[0].close();
    infoObj[0].length = 0;
  }
}

// hoping to use to calculate distance between user and each fruit.
function distance(lat1, lon1, lat2, lon2, unit) {
  if (lat1 == lat2 && lon1 == lon2) {
    return 0;
  } else {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == 'K') {
      dist = dist * 1.609344;
    }
    if (unit == 'N') {
      dist = dist * 0.8684;
    }
    return Math.floor(dist);
  }
}

const buildPage = async () => {
  fruitTreeLocations = await getFruitTrees();
  comments = await getComments();
  likes = await getLikes();
  fruitTreeTypes = await getTypes();
  loggedIn = await areYouLoggedIn();

  navigator.geolocation.getCurrentPosition((res) => {
    userCoords.lat = res.coords.latitude;
    userCoords.lng = res.coords.longitude;
    buildMapMakers();
  });

  createFruitDropDownMap();
  addFruitTreeDiv();
  renderUserThumb();
};

buildPage();
