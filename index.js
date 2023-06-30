import { menuArray } from "./data.js";
const cartSection = document.getElementById("cart-section");
const paymentSection = document.getElementById("payment-section");
const paymentForm = document.getElementById("payment-form");
const cartArray = [];

document.addEventListener("click", function (e) {
  if (e.target.dataset.addItem) {
    addToCart(e.target.dataset.addItem);
  } else if (e.target.dataset.removeItem) {
    removeFromCart(e.target.dataset.removeItem);
  } else if (e.target.id === "purchase-btn") {
    renderModal();
  } else if (
    !(e.target === paymentSection) &&
    !(e.target == document.querySelector(".payment-modal")) &&
    !isDescendant(paymentSection, e.target)
  ) {
    closeModal();
  }
});

paymentForm.addEventListener("submit", function (e) {
  e.preventDefault();
  closeModal();
  cartSection.classList.add("hidden");
  renderStatus();
});

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
            <h3 class="item-price">$ ${item.price}</h3>
        </div>
    </div>
    <button class="add-btn" data-add-item="${item.id}">+</button>
  </div>`;
  });

  document.getElementById("menu").innerHTML = menuHtml;
}

renderMenuHtml();

function addToCart(itemId) {
  // Check if the item already exists in the cartArray
  const existingItem = cartArray.find((item) => item.id == itemId);
  if (existingItem) {
    // Item already exists, update its quantity
    existingItem.quantity++;
  } else {
    // Item doesn't exist, add it to the cartArray
    const newItem = menuArray.find((item) => item.id == itemId);
    if (newItem) {
      cartArray.push({
        name: newItem.name,
        ingredients: newItem.ingredients,
        id: newItem.id,
        price: newItem.price,
        emoji: newItem.emoji,
        quantity: 1,
      });
    }
  }
  renderCartHtml(cartArray);
  cartSection.classList.remove("hidden");
  document.querySelector(".cart-price").innerHTML = `$ ${getTotalPrice(
    cartArray
  )}`;
}

function renderCartHtml(cart) {
  let cartHtml = ``;
  cart.forEach(function (item) {
    cartHtml += `
<div class="cart-item-wrapper">
  <div class="cart-item-detail">
     <h2 class="cart-item-name">${item.name}</h2>
     <p>X ${item.quantity}</p>
      <p class="cart-remove-btn" data-remove-item="${item.id}">
      remove
     </p>
   </div>
   <h3>$ ${item.price * item.quantity}</h3>
  </div>
</div>`;
  });
  let drink = cart.find((item) => item.id == 2);
  if (drink && cart.length > 1) {
    cartHtml += `<p class="meal-deal">Meal Deal Applied!</p>`;
  }

  document.querySelector(".cart").innerHTML = cartHtml;
}

function removeFromCart(itemId) {
  const existingItemIndex = cartArray.findIndex(function (item) {
    return itemId == item.id;
  });

  if (existingItemIndex !== -1) {
    const existingItem = cartArray[existingItemIndex];
    existingItem.quantity--;

    if (existingItem.quantity === 0) {
      cartArray.splice(existingItemIndex, 1);
    }
  }
  renderCartHtml(cartArray);
  if (cartArray.length < 1) {
    cartSection.classList.add("hidden");
  }
  document.querySelector(".cart-price").innerHTML = `$ ${getTotalPrice(
    cartArray
  )}`;
}

function getTotalPrice(cart) {
  let totalPrice = 0;
  let drink = cart.find((item) => item.id == 2);

  cart.forEach(function (item) {
    totalPrice += item.price * item.quantity;
  });

  if (drink && cart.length > 1) {
    return Math.floor(totalPrice * 0.9);
  } else {
    return totalPrice;
  }
}

function renderModal() {
  paymentSection.style.display = "flex";
}

function isDescendant(parent, child) {
  let node = child.parentNode;
  while (node != null) {
    if (node === parent) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}

function closeModal() {
  paymentSection.style.display = "none";
}

function renderStatus() {
  const orderCompleteSection = document.getElementById(
    "order-complete-section"
  );
  const paymentFormData = new FormData(paymentForm);
  const customerName = paymentFormData.get("fullName");

  cartArray.length = 0;
  orderCompleteSection.innerHTML = `          
  <div class="order-status">
    <p class="order-text">Thanks, ${customerName}! Your order is on its way!</p>
  </div>`;
}
