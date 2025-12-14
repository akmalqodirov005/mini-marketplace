const productsContainer = document.querySelector(".products");

fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((products) => displayProducts(products))
  .catch((err) => console.error(err));

function displayProducts(products) {
  products.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>$${product.price}</p>
      <button>Add to cart</button>
    `;

    const btn = card.querySelector("button");
    btn.addEventListener("click", () => {
      const event = new CustomEvent("add-to-cart", { detail: product });
      window.dispatchEvent(event);

      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
      savedCart.push(product);
      localStorage.setItem("cart", JSON.stringify(savedCart));
      alert(product.title + ' ' + 'added to cart')
    });

    productsContainer.appendChild(card);
  });
}
