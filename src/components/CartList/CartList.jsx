import React, { useState, useEffect } from "react";
import CartItem from "../CartItem/CartItem";
import "./CartList.css";

const CartList = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const loadCart = () => {
      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
      const cartWithQuantity = savedCart.map((item) => ({
        ...item,
        quantity: item.quantity || 1,
        price: Number(item.price),
      }));
      setCartItems(cartWithQuantity);
    };

    loadCart();

    const handleAddToCart = (e) => {
      const newItem = { ...e.detail, quantity: 1, price: Number(e.detail.price) };
      setCartItems((prev) => {
        const exist = prev.find((i) => i.id === newItem.id);
        const updatedCart = exist
          ? prev.map((i) =>
              i.id === newItem.id ? { ...i, quantity: i.quantity + 1 } : i
            )
          : [...prev, newItem];
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
      });
    };

    window.addEventListener("add-to-cart", handleAddToCart);
    return () => window.removeEventListener("add-to-cart", handleAddToCart);
  }, []);

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="cart-list">
      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
          />
        ))
      )}
      {cartItems.length > 0 && (
        <div className="cart-summary">
          <p>Total items: {totalItems}</p>
          <p>Total price: ${totalPrice}</p>
        </div>
      )}
    </div>
  );
};

export default CartList;