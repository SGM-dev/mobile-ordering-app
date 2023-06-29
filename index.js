import { menuArray } from "./data.js";

function getMenuHtml() {
  let menuHtml = ``;
  menuArray.forEach(function (item) {
    menuHtml += `
    <div class="item">
        <div class="item-details">
            <div class="item-graphic">${item.emoji}</div>
        <div>
            <h2 class="item-title">${item.name}</h2>
            <p class="item-desc">${item.ingredients}</p>
            <h3 class="item-price">${item.price}</h3>
        </div>
    </div>
    <button class="add-btn" data-add-item="${item.id}">+</button>
  </div>`;
  });

  return menuHtml;
}

function render() {
  document.getElementById("menu").innerHTML = getMenuHtml();
}

render()
