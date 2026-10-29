import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CategoryBar from './components/CategoryBar';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import AuthModal from './components/AuthModal';
import CheckoutModal from './components/CheckoutModal';
import Footer from './components/Footer';

export default function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['All', 'Audio', 'Keyboards', 'Wearables', 'Accessories']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const u = localStorage.getItem('nexus_user');
      return u ? JSON.parse(u) : null;
    } catch { return null; }
  });

  const [wishlist, setWishlist] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [promoCode, setPromoCode] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, searchTerm, sortBy]);

  const fetchProducts = async () => {
    try {
      const params = new URLSearchParams();
      if (selectedCategory !== 'All') params.append('category', selectedCategory);
      if (searchTerm) params.append('search', searchTerm);
      params.append('sortBy', sortBy);

      const res = await fetch(`/api/products?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (err) {
      console.error('Failed to load products', err);
    }
  };

  const handleToggleWishlist = (product) => {
    setWishlist(prev =>
      prev.some(item => item.id === product.id)
        ? prev.filter(item => item.id !== product.id)
        : [...prev, product]
    );
  };

  const handleAddToCart = (item) => {
    setCartItems(prev => {
      const existing = prev.find(p => p.id === item.id);
      if (existing) {
        return prev.map(p => p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      setCartItems(prev => prev.filter(item => item.id !== productId));
    } else {
      setCartItems(prev =>
        prev.map(item => item.id === productId ? { ...item, quantity: newQuantity } : item)
      );
    }
  };

  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }, [cartItems]);

  const discountAmount = useMemo(() => {
    if (promoCode === 'NEXUS20' || promoCode === 'TECH20') {
      return subtotal * 0.20;
    }
    return 0;
  }, [subtotal, promoCode]);

  return (
    <div className="store-container">
      <Navbar
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        wishlistCount={wishlist.length}
        currentUser={currentUser}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={() => {
          localStorage.removeItem('nexus_user');
          setCurrentUser(null);
        }}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <HeroSection />

      <CategoryBar
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <main className="catalog-section">
        <div className="catalog-header">
          <h2>All Gear &amp; Gadgets ({products.length})</h2>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="sort-select">
            <option value="popular">Popularity</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
          </select>
        </div>

        <div className="product-grid">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              isWishlisted={wishlist.some(w => w.id === product.id)}
              onToggleWishlist={handleToggleWishlist}
            />
          ))}
        </div>
      </main>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onProceedCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        promoCode={promoCode}
        setPromoCode={setPromoCode}
        discountAmount={discountAmount}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        subtotal={subtotal}
        discountAmount={discountAmount}
        onOrderSuccess={() => {
          setCartItems([]);
          setPromoCode('');
        }}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={(user) => {
          localStorage.setItem('nexus_user', JSON.stringify(user));
          setCurrentUser(user);
        }}
      />

      <Footer />
    </div>
  );
}
