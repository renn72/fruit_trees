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
  console.log(props)
  let marker = new google.maps.Marker({
    position: props.coords,
    map: map,
    icon: treeIconMap[0][props.name],
    title: props.address
  });
  if (props.iconImage) {
    marker.setIcon(props.iconImage);
  }

  if (props.content) {
    let contentString =
      `<p id="firstHeading" class="firstHeading">${props.name}</p>` +
      `<p><span class="like-info-window">Likes:</span> ${props.likes}</p>` +
      `<p><span class="details-info-window">Details:</span> ${props.details}</p>`;

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

const buildPage = async () => {
  fruitTreeLocations = await getFruitTrees();
  comments = await getComments();
  likes = await getLikes();
  fruitTreeTypes = await getTypes();
  loggedIn = await areYouLoggedIn();

  buildMapMakers();
  createFruitDropDownMap();
  addFruitTreeDiv();
};

buildPage();
