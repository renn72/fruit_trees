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

  fruits.forEach((fruit) => {
    let fruitItem = document.createElement('li');
    fruitItem.textContent = `Fruit: ${fruit.content}`;
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
  });
  if (props.iconImage) {
    marker.setIcon(props.iconImage);
  }

  if (props.content) {
    let infoWindow = new google.maps.InfoWindow({
      content: props.content,
    });

    marker.addListener('click', function () {
      infoWindow.open(map, marker);
    });
  }
  markers.push(marker);
}

const buildPage = async () => {
  fruitTreeLocations = await getFruitTrees();
  comments = await getComments();
  likes = await getLikes();
  fruitTreeTypes = await getTypes();

  buildMapMakers();
  createFruitDropDownMap();
  addFruitTreeDiv();
};

buildPage();
