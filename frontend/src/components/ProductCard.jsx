import React, { useState } from 'react';
import { Star, ShoppingBag, Heart } from 'lucide-react';

export default function ProductCard({ product, onAddToCart, isWishlisted, onToggleWishlist }) {
  const specs = product.availableColors ? product.availableColors.split(',') : ['Default'];
  const [selectedSpec, setSelectedSpec] = useState(specs[0]);

  return (
    <div className="product-card">
      <div className="product-thumb-container">
        {product.badge && <span className="badge-tag">{product.badge}</span>}
        <button
          type="button"
          className="card-wishlist-btn"
          onClick={() => onToggleWishlist(product)}
        >
          <Heart size={16} color={isWishlisted ? '#ff4d4d' : '#fff'} fill={isWishlisted ? '#ff4d4d' : 'none'} />
        </button>
        <img src={product.imageUrl} alt={product.name} className="product-thumb" />
      </div>
      <div className="product-body">
        <h3 className="product-title">{product.name}</h3>
        <div className="product-rating">
          <Star size={14} fill="#f59e0b" color="#f59e0b" />
          <span>{product.rating}</span>
        </div>
        <div className="price-row">
          <span className="current-price">${product.price.toFixed(2)}</span>
          {product.originalPrice && <span className="original-price">${product.originalPrice.toFixed(2)}</span>}
        </div>
        <div className="size-selector">
          {specs.map(s => (
            <button
              key={s}
              className={selectedSpec === s ? 'active' : ''}
              onClick={() => setSelectedSpec(s)}
            >
              {s}
            </button>
          ))}
        </div>
        <button className="add-btn" onClick={() => onAddToCart({ ...product, selectedSpec, quantity: 1 })}>
          <ShoppingBag size={16} /> Add to Cart
        </button>
      </div>
    </div>
  );
}
