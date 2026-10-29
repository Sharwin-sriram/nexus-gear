import React, { useState } from 'react';
import { X, Trash2, ArrowRight } from 'lucide-react';

export default function CartDrawer({
  isOpen, onClose, cartItems, onUpdateQuantity, onProceedCheckout,
  promoCode, setPromoCode, discountAmount
}) {
  const [promoInput, setPromoInput] = useState(promoCode || '');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal >= 50.0 || subtotal === 0 ? 0.0 : 9.99;
  const finalTotal = Math.max(0, subtotal - discountAmount + shipping);

  const applyPromo = (e) => {
    e.preventDefault();
    if (promoInput.toUpperCase() === 'NEXUS20' || promoInput.toUpperCase() === 'TECH20') {
      setPromoCode(promoInput.toUpperCase());
    }
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="cart-drawer" onClick={e => e.stopPropagation()}>
        <div className="drawer-header">
          <h3>Shopping Cart ({cartItems.reduce((a, b) => a + b.quantity, 0)})</h3>
          <button onClick={onClose}><X size={20} /></button>
        </div>
        <div className="cart-items-list">
          {cartItems.map((item, idx) => (
            <div className="cart-item" key={idx}>
              <img src={item.imageUrl} alt={item.name} width="50" />
              <div>
                <h4>{item.name}</h4>
                <p>${item.price.toFixed(2)} x {item.quantity}</p>
                <div className="qty-control">
                  <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={applyPromo} className="promo-form">
          <input
            type="text"
            placeholder="Promo code"
            value={promoInput}
            onChange={e => setPromoInput(e.target.value)}
          />
          <button type="submit">Apply</button>
        </form>
        <div className="summary">
          <p>Subtotal: ${subtotal.toFixed(2)}</p>
          {discountAmount > 0 && <p>Discount: -${discountAmount.toFixed(2)}</p>}
          <p>Shipping: {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</p>
          <h4>Total: ${finalTotal.toFixed(2)}</h4>
        </div>
        <button className="checkout-btn" onClick={onProceedCheckout}>
          Proceed to Checkout <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
