import React from 'react';
import './CartItem.css';

const CartItem = ({ item, updateQuantity, removeFromCart }) => {
  return (
    <div className="cart-item">
      <img src={item.image} alt={item.title} />
      <div>
        <h4>{item.title}</h4>
        <p>${(item.price * item.quantity)}</p>
        <div className="quantity-controls">
          <button className='minus-btn' onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
          <span>{item.quantity}</span>
          <button className='plus-btn' onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
        </div>
      </div>
      <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
    </div>
  );
};

export default CartItem;