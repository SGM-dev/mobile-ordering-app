import { menuArray } from "./data.js";

document.addEventListener("click", function (e) {
  if (e.target.dataset.addItem) {
    addToCart(e.target.dataset.addItem);
  }
});

const cartArray = [];

function renderMenuHtml() {
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

  document.getElementById("menu").innerHTML = menuHtml;
}

renderMenuHtml();

function addToCart(itemId) {
  menuArray.forEach(function (item) {
    if (item.id == itemId) {
      cartArray.push({
        name: item.name,
        ingredients: item.ingredients,
        id: item.id,
        price: item.price,
        emoji: item.emoji,
        quantity: 1,
      });
    }
  });
  console.log(cartArray);
}
