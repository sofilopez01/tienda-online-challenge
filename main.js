const listOfProducts = [
  {
    id: 1,
    name: "Nombre del producto",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque in nibh feugiat amet, vel donec lectus sagittis…",
    financing: "6 cuotas sin interés",
    price: 172500,
    discount: 15,
    isNew: true,
    image: "./assets/Example Product.svg"
  },
  {
    id: 2,
    name: "Nombre del producto",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque in nibh feugiat amet, vel donec lectus sagittis…",
    financing: "6 cuotas sin interés",
    price: 150000,
    discount: 0,
    isNew: true,
    image: "./assets/Example Product.svg"
  },
  {
    id: 3,
    name: "Nombre del producto",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque in nibh feugiat amet, vel donec lectus sagittis…",
    financing: "6 cuotas sin interés",
    price: 150000,
    discount: 0,
    isNew: true,
    image: "./assets/Example Product.svg"
  },
  {
    id: 4,
    name: "Nombre del producto",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque in nibh feugiat amet, vel donec lectus sagittis…",
    financing: "6 cuotas sin interés",
    price: 150000,
    discount: 0,
    isNew: true,
    image: "./assets/Example Product.svg"
  },
  {
    id: 5,
    name: "Nombre del producto",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque in nibh feugiat amet, vel donec lectus sagittis…",
    financing: "6 cuotas sin interés",
    price: 150000,
    discount: 0,
    isNew: true,
    image: "./assets/Example Product.svg"
  },
  {
    id: 6,
    name: "Nombre del producto",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque in nibh feugiat amet, vel donec lectus sagittis…",
    financing: "6 cuotas sin interés",
    price: 150000,
    discount: 0,
    isNew: false,
    image: "./assets/Example Product.svg"
  },
  {
    id: 7,
    name: "Nombre del producto",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque in nibh feugiat amet, vel donec lectus sagittis…",
    financing: "6 cuotas sin interés",
    price: 150000,
    discount: 0,
    isNew: false,
    image: "./assets/Example Product.svg"
  },
  {
    id: 8,
    name: "Nombre del producto",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque in nibh feugiat amet, vel donec lectus sagittis…",
    financing: "6 cuotas sin interés",
    price: 150000,
    discount: 0,
    isNew: false,
    image: "./assets/Example Product.svg"
  }
];

const listOfCart = [];

function onRenderProducts() {
  const productsContainer = document.getElementById("products_container");

  const listOfProductsHTML = `
  ${listOfProducts
    .map((product) => {
      const finalPrice = helperCalculateFinalPrice(product);

      return `
        <div class="card" id="${product.id}">
         ${product.isNew ? '<span class="card_badge">New</span>' : ""}
          <div class="top_container">
           
            <div class="image_container">
              <img src="${product.image}" alt="${product.name}"  />
            </div>
            <h3 class="headline">${product.name}</h3>
          </div>

          <div class="middle_container">
            
            <p class="description_container">${product.description}</p>
            <p class="product_price_variant_container">${product.financing ?? ""}</p>
          </div>

          <div class="bottom_container">
           <div class="price_row">
              <span class="card_price">$ ${finalPrice.toLocaleString("de-DE")}</span>
              ${
                Number(product.discount) > 0
                  ? `<span class="card_price_old"><s>$ ${product.price}</s></span>`
                  : ""
              }
            </div>
            <div class="product_action_container">
              <button data-product='${
                product.id
              }' class="btn_green add_cart_action" type="button">Añadir al carrito</button>
            </div>
           
      <div class="buy_row" data-product='${product.id}'>
        <div class="qty_group">
          <button data-product='${
            product.id
          }' class="qty_btn minus_action" type="button" data-action="minus" ><img src="./assets/minus-s.svg" alt="Restar" /></button>
          <span class="qty_value" data-product='${product.id}'>1</span>
          <button data-product='${
            product.id
          }' class="qty_btn plus_action" type="button" data-action="plus" ><img src="./assets/plus-s.svg" alt="Sumar" /></button>
        </div>
        <div data-product='${product.id}' class="delete_icon delete_action">
          <img src="./assets/delete.svg" alt="Eliminar" />
        </div>
      </div>
          </div>
        </div>
      `;
    })
    .join("")}
`;

  productsContainer.innerHTML = listOfProductsHTML;

  productsContainer.querySelectorAll(".add_cart_action").forEach((button) => {
    button.addEventListener("click", () => handleAddCartAction(button));
  });

  productsContainer.querySelectorAll(".plus_action").forEach((button) => {
    button.addEventListener("click", () => handlePlusCartAction(button));
  });

  productsContainer.querySelectorAll(".minus_action").forEach((button) => {
    button.addEventListener("click", () => handleMinusCartAction(button));
  });

  productsContainer.querySelectorAll(".delete_action").forEach((button) => {
    button.addEventListener("click", () => handleDeleteCartAction(button));
  });
}

// Sumar un producto al carrito
function handleAddCartAction(button) {
  const id = Number(button.getAttribute("data-product"));

  const bottom = button.closest(".bottom_container");
  if (!bottom) return;
  const buyRow = bottom.querySelector(".buy_row");
  const qtyValue = bottom.querySelector(".qty_value");
  if (!buyRow || !qtyValue) return;

  button.classList.add("is-hidden");
  buyRow.classList.add("active");

  helperAddOneToCart(id);
  onRenderCartTotal();
  onRenderCartBadge();
}

// Sumar un producto del mismo tipo al carrito
function handlePlusCartAction(button) {
  const id = Number(button.getAttribute("data-product"));
  const qtyEl = document.querySelector(`.qty_value[data-product='${String(id)}']`);

  let qty = Number(qtyEl.textContent) || 1;
  qty++;
  qtyEl.textContent = String(qty);

  helperAddOneToCart(id);
  onRenderCartTotal();
  onRenderCartBadge();
}

// Restar un producto del mismo tipo al carrito
function handleMinusCartAction(button) {
  const id = Number(button.getAttribute("data-product"));
  const qtyEl = document.querySelector(`.qty_value[data-product='${String(id)}']`);

  let qty = Number(qtyEl.textContent) || 1;

  if (qty > 1) {
    qty--;
    qtyEl.textContent = String(qty);
  } else {
    const buyRow = document.querySelector(`.buy_row[data-product='${String(id)}']`);
    buyRow.classList.remove("active");

    const addBtn = document.querySelector(`.add_cart_action[data-product='${String(id)}']`);
    addBtn.classList.remove("is-hidden");

    qtyEl.textContent = "1";
  }

  helperRemoveOneFromCart(id);
  onRenderCartTotal();
  onRenderCartBadge();
}

// Eliminar el producto del carrito
function handleDeleteCartAction(button) {
  const id = Number(button.getAttribute("data-product"));
  helperRemoveAllFromCart(id);

  const buyRow = document.querySelector(`.buy_row[data-product='${String(id)}']`);
  buyRow.classList.remove("active");

  const addBtn = document.querySelector(`.add_cart_action[data-product='${String(id)}']`);
  addBtn.classList.remove("is-hidden");

  const qtyEl = document.querySelector(`.qty_value[data-product='${String(id)}']`);
  qtyEl.textContent = "1";

  onRenderCartTotal();
  onRenderCartBadge();
}

// Modificar el total del carrito
function onRenderCartTotal() {
  const cartContainer = document.getElementById("cart_container");
  let cartTotal = 0;

  listOfCart.forEach((item) => {
    cartTotal += helperCalculateFinalPrice(item);
  });

  cartContainer.innerHTML = `
    <span>Total: </span>
    <span id="cartTotal">$${cartTotal.toLocaleString("de-DE")}</span>
  `;
}

// Actualizar la burbuja de cantidad del carrito
function onRenderCartBadge() {
  const cartBadge = document.getElementById("cart_badge");

  if (listOfCart.length === 0) {
    cartBadge.innerHTML = "";
    return;
  }

  cartBadge.innerHTML = `
    <div class="cart_badge">
      <span class="cart_number">${listOfCart.length}</span>
    </div>
  `;
}

// Funciones auxiliares
function helperCalculateFinalPrice(product) {
  if (Number(product.discount) > 0) {
    const discount = product.price * (product.discount / 100);
    return Math.round(product.price - discount);
  }
  return product.price;
}

function helperAddOneToCart(productId) {
  const prod = listOfProducts.find((p) => p.id === productId);
  if (prod) listOfCart.push(prod);
}

function helperRemoveOneFromCart(productId) {
  const id = listOfCart.findIndex((p) => p.id === productId);
  if (id !== -1) listOfCart.splice(id, 1);
}

function helperRemoveAllFromCart(productId) {
  for (let i = listOfCart.length - 1; i >= 0; i--) {
    if (listOfCart[i].id === productId) listOfCart.splice(i, 1);
  }
}

// Inicio
onRenderProducts();
