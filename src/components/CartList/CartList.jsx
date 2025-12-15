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
  }, []);

  useEffect(() => {
    const handleCartUpdate = (event) => {
      const updatedCart = event.detail;
      const cartWithQuantity = updatedCart.map((item) => ({
        ...item,
        quantity: item.quantity || 1,
        price: Number(item.price),
      }));
      setCartItems(cartWithQuantity);
    };

    window.addEventListener("cartUpdated", handleCartUpdate);
    
    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

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
        <>
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
            />
          ))}
          <div className="cart-summary">
            <p>Total items: {totalItems}</p>
            <p>Total price: ${totalPrice}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default CartList;