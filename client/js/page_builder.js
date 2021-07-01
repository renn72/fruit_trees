
// build the page that the user sees once the page has loaded. 
 
const fruitTreeListDiv = document.querySelector(".fruit-tree-list-container")
const fruitList = document.querySelector(".fruit-tree-list")

const createFruitTreeContainer = document.querySelector('.create-fruit-tree-container')
const fruitTreeSelect = document.querySelector('.fruit-tree-select')
const fruitDetails = document.querySelector('#fruit-details')
const fruitTreeSubmit = document.querySelector('.fruit-tree-submit')


function createFruitDropDownMap() {
    fruitTreeTypes.forEach(item => {
        let fruitOption = document.createElement('option');
        fruitOption.textContent = item;
        fruitTreeSelectMap.appendChild(fruitOption);
    })
}


function createFruitList(fruits) {

    while (fruitList.firstChild) {
        fruitList.firstChild.remove();
    }

    fruits.forEach(fruit => {
        let fruitItem = document.createElement("li")
        fruitItem.textContent = `Fruit: ${fruit.content}`
        fruitList.appendChild(fruitItem)
    });

    fruitTreeListDiv.appendChild(fruitList)
}


function addFruitTreeDiv() {
    fruitTreeTypes.forEach(item => {
        let fruitOption = document.createElement('option');
        fruitOption.textContent = item;
        fruitTreeSelect.appendChild(fruitOption);
      })
}

createFruitDropDownMap()

addFruitTreeDiv()