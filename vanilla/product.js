document.addEventListener("DOMContentLoaded", () => {
  const productsContainer = document.querySelector(".products");

  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((products) => displayProducts(products))
    .catch((err) => console.error("Error loading products:", err));

  function displayProducts(products) {
    products.forEach((product) => {
      const card = document.createElement("div");
      card.classList.add("product-card");
      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>$${product.price}</p>
        <button type="button">Add to cart</button>
      `;

      const btn = card.querySelector("button");
      btn.addEventListener("click", () => {
        addToCart(product);
      });

      productsContainer.appendChild(card);
    });
  }

  function addToCart(product) {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    
    const existingItem = savedCart.find(item => item.id === product.id);
    
    let updatedCart;
    if (existingItem) {
      updatedCart = savedCart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );
    } else {
      updatedCart = [...savedCart, { ...product, quantity: 1 }];
    }
    
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    window.dispatchEvent(new CustomEvent("cartUpdated", { 
      detail: updatedCart 
    }));

    alert(product.title + " added to cart!");
  }
});