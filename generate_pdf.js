const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

function getBase64Image(filePath) {
  const fileData = fs.readFileSync(filePath);
  return `data:image/png;base64,${fileData.toString('base64')}`;
}

async function buildPdf() {
  console.log('Reading screenshots...');
  const imgHome = getBase64Image(path.resolve('screenshots/1_home_page.png'));
  const imgSearch = getBase64Image(path.resolve('screenshots/2_product_search.png'));
  const imgCart = getBase64Image(path.resolve('screenshots/3_shopping_cart.png'));
  const imgOrder = getBase64Image(path.resolve('screenshots/4_order_confirmation.png'));

  console.log('Screenshots loaded.');

  const pages = [
    // PAGE 1
    `
      <div class="header-title">22UIT501 - WEB PROGRAMMING ASSIGNMENT – II</div>
      <div class="problem-statement">
        <strong>1. Design and develop a full-stack e-commerce web application named NEXUS GEAR using HTML5, CSS3, JavaScript, React.js, Java Spring Boot, and PostgreSQL. The system should include official product listings, real-time product search, user account management, wish list management, an interactive shopping cart, a secure checkout and order processing system, and a modern, responsive user interface for desktop and mobile devices.</strong>
      </div>
      <div class="section-title">CODE:</div>
      <div class="file-title">APP.JSX:</div>
      <pre class="code-block">import React, { useState, useEffect, useMemo } from 'react';
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
  const [categories, setCategories] = useState([]);
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
    fetch('/api/products/categories')
      .then(res => res.json())
      .then(setCategories)
      .catch(() => setCategories(['All', 'Audio', 'Keyboards', 'Wearables']));
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, searchTerm, sortBy]);

  const handleToggleWishlist = (product) => {
    setWishlist(prev =></pre>
    `,

    // PAGE 2
    `
      <pre class="code-block">      prev.some(item => item.id === product.id)
        ? prev.filter(item => item.id !== product.id)
        : [...prev, product]
    );
  };

  return (
    &lt;div className="store-container"&gt;
      &lt;Navbar
        cartCount={cartItems.reduce((acc, i) =&gt; acc + i.quantity, 0)}
        wishlistCount={wishlist.length}
        currentUser={currentUser}
        onOpenCart={() =&gt; setIsCartOpen(true)}
        onOpenAuth={() =&gt; setIsAuthOpen(true)}
        onLogout={() =&gt; setCurrentUser(null)}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      /&gt;
      &lt;HeroSection /&gt;
      &lt;CategoryBar
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      /&gt;
      &lt;main className="catalog-section"&gt;
        &lt;div className="catalog-header"&gt;
          &lt;h2&gt;All Gear &amp; Gadgets ({products.length})&lt;/h2&gt;
          &lt;select value={sortBy} onChange={e =&gt; setSortBy(e.target.value)}
            className="sort-select"&gt;
            &lt;option value="popular"&gt;Popular&lt;/option&gt;
            &lt;option value="priceLow"&gt;Price: Low to High&lt;/option&gt;
            &lt;option value="priceHigh"&gt;Price: High to Low&lt;/option&gt;
          &lt;/select&gt;
        &lt;/div&gt;
        &lt;div className="product-grid"&gt;
          {products.map(product =&gt; (
            &lt;ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              isWishlisted={wishlist.some(w =&gt; w.id === product.id)}
              onToggleWishlist={handleToggleWishlist}</pre>
    `,

    // PAGE 3
    `
      <pre class="code-block">            /&gt;
          ))}
        &lt;/div&gt;
      &lt;/main&gt;
      &lt;CartDrawer
        isOpen={isCartOpen}
        onClose={() =&gt; setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onProceedCheckout={() =&gt; { setIsCartOpen(false); setIsCheckoutOpen(true); }}
        promoCode={promoCode}
        setPromoCode={setPromoCode}
        discountAmount={discountAmount}
      /&gt;
      &lt;CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() =&gt; setIsCheckoutOpen(false)}
        cartItems={cartItems}
        subtotal={subtotal}
        discountAmount={discountAmount}
        onOrderSuccess={() =&gt; { setCartItems([]); setPromoCode(''); }}
      /&gt;
      &lt;AuthModal
        isOpen={isAuthOpen}
        onClose={() =&gt; setIsAuthOpen(false)}
        onAuthSuccess={setCurrentUser}
      /&gt;
      &lt;Footer /&gt;
    &lt;/div&gt;
  );
}
export default App;

APP.CSS:
:root {
  --primary: #3b82f6;
  --bg-dark: #0b0f19;
  --bg-card: #172033;
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --border-color: #232f48;
  --font-family: 'Plus Jakarta Sans', Arial, sans-serif;</pre>
    `,

    // PAGE 4
    `
      <pre class="code-block">}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: var(--font-family);
  background-color: var(--bg-dark);
  color: var(--text-main);
}
.catalog-section {
  max-width: 1300px;
  margin: 0 auto;
  padding: 30px 20px;
}
.catalog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
}
.badge-tag {
  position: absolute;
  top: 10px;
  left: 10px;
  background: var(--primary);
  color: #fff;
  font-size: 0.75rem;
  padding: 4px 8px;
  border-radius: 4px;
}
.card-wishlist-btn {
  position: absolute;
  top: 10px;</pre>
    `,

    // PAGE 5
    `
      <pre class="code-block">  right: 10px;
  background: rgba(0, 0, 0, 0.6);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  cursor: pointer;
}
.product-body {
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.original-price {
  font-size: 0.9rem;
  color: var(--text-muted);
  text-decoration: line-through;
}
.add-btn {
  width: 100%;
  background: var(--primary);
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}
.cart-drawer {
  position: fixed;
  right: 0;
  top: 0;
  width: 420px;

AUTH.JSX:
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { loginUser, registerUser } from '../api';
export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {</pre>
    `,

    // PAGE 6
    `
      <pre class="code-block">  const [mode, setMode] = useState('login');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  if (!isOpen) return null;
  const handleSubmit = async (e) =&gt; {
    e.preventDefault();
    setError('');
    try {
      if (mode === 'login') {
        const data = await loginUser(formData.email, formData.password);
        onAuthSuccess(data);
        onClose();
      } else {
        const data = await registerUser(formData.name, formData.email,
          formData.password, 'CUSTOMER');
        onAuthSuccess(data);
        onClose();
      }
    } catch (err) {
      setError(err.message || 'Authentication failed');
    }
  };
  return (
    &lt;div className="modal-overlay" onClick={onClose}&gt;
      &lt;div className="modal-content" onClick={e =&gt; e.stopPropagation()}&gt;
        &lt;div className="modal-header"&gt;
          &lt;button onClick={onClose}&gt;&lt;X size={20} /&gt;&lt;/button&gt;
        &lt;/div&gt;
        &lt;form onSubmit={handleSubmit} className="auth-form"&gt;
          {error &amp;&amp; &lt;p className="error-text"&gt;{error}&lt;/p&gt;}
          {mode === 'register' &amp;&amp; (
            &lt;input type="text" placeholder="Full Name" value={formData.name} onChange={e
=&gt; setFormData({ ...formData, name: e.target.value })} required /&gt;
          )}
          &lt;input type="email" placeholder="Email Address" value={formData.email}
onChange={e =&gt; setFormData({ ...formData, email: e.target.value })} required /&gt;
          &lt;input type="password" placeholder="Password" value={formData.password}
onChange={e =&gt; setFormData({ ...formData, password: e.target.value })} required /&gt;
          &lt;button type="submit" className="submit-btn"&gt;{mode === 'login' ? 'Sign In' :
'Create Account'}&lt;/button&gt;</pre>
    `,

    // PAGE 7
    `
      <pre class="code-block">        &lt;/form&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  );
}

PRODUCT.JSX:
import React, { useState } from 'react';
import { Star, ShoppingBag, Heart } from 'lucide-react';
export default function ProductCard({ product, onAddToCart, isWishlisted,
onToggleWishlist }) {
  const specs = product.availableColors ? product.availableColors.split(',') :
['Default'];
  const [selectedSpec, setSelectedSpec] = useState(specs[0]);
  return (
    &lt;div className="product-card"&gt;
      &lt;div className="product-thumb-container"&gt;
        {product.badge &amp;&amp; &lt;span className="badge-tag"&gt;{product.badge}&lt;/span&gt;}
        &lt;button
          type="button"
          className="card-wishlist-btn"
          onClick={() =&gt; onToggleWishlist(product)}
        &gt;
          &lt;Heart size={16} color={isWishlisted ? '#ff4d4d' : '#fff'} fill={isWishlisted
? '#ff4d4d' : 'none'} /&gt;
        &lt;/button&gt;
        &lt;img src={product.imageUrl} alt={product.name} className="product-thumb" /&gt;
      &lt;/div&gt;
      &lt;div className="product-body"&gt;
        &lt;h3 className="product-title"&gt;{product.name}&lt;/h3&gt;
        &lt;div className="product-rating"&gt;
          &lt;Star size={14} fill="#f59e0b" color="#f59e0b" /&gt;
          &lt;span&gt;{product.rating}&lt;/span&gt;
        &lt;/div&gt;
        &lt;div className="price-row"&gt;
          &lt;span className="current-price"&gt;\${product.price.toFixed(2)}&lt;/span&gt;
          {product.originalPrice &amp;&amp; &lt;span className="original-price"&gt;\${product.originalPrice.toFixed(2)}&lt;/span&gt;}
        &lt;/div&gt;
        &lt;div className="size-selector"&gt;</pre>
    `,

    // PAGE 8
    `
      <pre class="code-block">          {specs.map(s =&gt; (
            &lt;button key={s} className={selectedSpec === s ? 'active' : ''} onClick={()
=&gt; setSelectedSpec(s)}&gt;{s}&lt;/button&gt;
          ))}
        &lt;/div&gt;
        &lt;button className="add-btn" onClick={() =&gt; onAddToCart({ ...product,
selectedSpec, quantity: 1 })}&gt;
          &lt;ShoppingBag size={16} /&gt; Add to Cart
        &lt;/button&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  );
}

CART.JSX:
import React, { useState } from 'react';
import { X, Trash2, ArrowRight } from 'lucide-react';
export default function CartDrawer({
  isOpen, onClose, cartItems, onUpdateQuantity, onProceedCheckout,
  promoCode, setPromoCode, discountAmount
}) {
  const [promoInput, setPromoInput] = useState(promoCode || '');
  if (!isOpen) return null;
  const subtotal = cartItems.reduce((sum, item) =&gt; sum + (item.price * item.quantity),
0);
  const shipping = subtotal &gt;= 50.0 || subtotal === 0 ? 0.0 : 9.99;
  const finalTotal = Math.max(0, subtotal - discountAmount + shipping);
  const applyPromo = (e) =&gt; {
    e.preventDefault();
    if (promoInput.toUpperCase() === 'NEXUS20' || promoInput.toUpperCase() ===
'TECH20') {
      setPromoCode(promoInput.toUpperCase());
    }
  };
  return (
    &lt;div className="overlay" onClick={onClose}&gt;
      &lt;div className="cart-drawer" onClick={e =&gt; e.stopPropagation()}&gt;
        &lt;div className="drawer-header"&gt;
          &lt;h3&gt;Shopping Cart ({cartItems.reduce((a, b) =&gt; a + b.quantity, 0)})&lt;/h3&gt;
          &lt;button onClick={onClose}&gt;&lt;X size={20} /&gt;&lt;/button&gt;</pre>
    `,

    // PAGE 9
    `
      <pre class="code-block">        &lt;/div&gt;
        &lt;div className="cart-items-list"&gt;
          {cartItems.map((item, idx) =&gt; (
            &lt;div className="cart-item" key={idx}&gt;
              &lt;img src={item.imageUrl} alt={item.name} width="50" /&gt;
              &lt;div&gt;
                &lt;h4&gt;{item.name}&lt;/h4&gt;
                &lt;p&gt;\${item.price.toFixed(2)} x {item.quantity}&lt;/p&gt;
                &lt;div className="qty-control"&gt;
                  &lt;button onClick={() =&gt; onUpdateQuantity(item.id,
item.quantity - 1)}&gt;-&lt;/button&gt;
                  &lt;span&gt;{item.quantity}&lt;/span&gt;
                  &lt;button onClick={() =&gt; onUpdateQuantity(item.id,
item.quantity + 1)}&gt;+&lt;/button&gt;
                &lt;/div&gt;
              &lt;/div&gt;
            &lt;/div&gt;
          ))}
        &lt;/div&gt;
        &lt;form onSubmit={applyPromo} className="promo-form"&gt;
          &lt;input type="text" placeholder="Promo code" value={promoInput} onChange={e =&gt;
setPromoInput(e.target.value)} /&gt;
          &lt;button type="submit"&gt;Apply&lt;/button&gt;
        &lt;/form&gt;
        &lt;div className="summary"&gt;
          &lt;p&gt;Subtotal: \${subtotal.toFixed(2)}&lt;/p&gt;
          {discountAmount &gt; 0 &amp;&amp; &lt;p&gt;Discount: -\${discountAmount.toFixed(2)}&lt;/p&gt;}
          &lt;p&gt;Shipping: {shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2)}&lt;/p&gt;
          &lt;h4&gt;Total: \${finalTotal.toFixed(2)}&lt;/h4&gt;
        &lt;/div&gt;
        &lt;button className="checkout-btn" onClick={onProceedCheckout}&gt;Proceed to Checkout
&lt;ArrowRight size={16} /&gt;&lt;/button&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  );
}

PRODUCTCONTROLLER.JAVA:
package com.nexusgear.controller;
import com.nexusgear.model.Product;</pre>
    `,

    // PAGE 10
    `
      <pre class="code-block">import com.nexusgear.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {
  private final ProductService productService;
  public ProductController(ProductService productService) {
    this.productService = productService;
  }
  @GetMapping
  public ResponseEntity&lt;List&lt;Product&gt;&gt; getProducts(
    @RequestParam(required = false) String category,
    @RequestParam(required = false) String brand,
    @RequestParam(required = false) String search,
    @RequestParam(required = false) Double minPrice,
    @RequestParam(required = false) Double maxPrice,
    @RequestParam(required = false, defaultValue = "popular") String sortBy
  ) {
    return ResponseEntity.ok(productService.getProducts(category, brand, search,
minPrice, maxPrice, sortBy));
  }
  @GetMapping("/{id}")
  public ResponseEntity&lt;Product&gt; getProductById(@PathVariable Long id) {
    return
productService.getProductById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound
().build());
  }
  @GetMapping("/categories")
  public ResponseEntity&lt;List&lt;String&gt;&gt; getCategories() {
    return ResponseEntity.ok(productService.getAllCategories());
  }
  @PostMapping
  public ResponseEntity&lt;Product&gt; createProduct(@RequestBody Product product) {
    return
ResponseEntity.status(org.springframework.http.HttpStatus.CREATED).body(productService.c
reateProduct(product));
  }</pre>
    `,

    // PAGE 11
    `
      <pre class="code-block">  @PutMapping("/{id}")
  public ResponseEntity&lt;Product&gt; updateProduct(@PathVariable Long id, @RequestBody
Product product) {
    return ResponseEntity.ok(productService.updateProduct(id, product));
  }
  @DeleteMapping("/{id}")
  public ResponseEntity&lt;?&gt; deleteProduct(@PathVariable Long id) {
    productService.deleteProduct(id);
    return ResponseEntity.ok(java.util.Map.of("message", "Product deleted"));
  }
}

AUTHCONTROLLER.JAVA:
package com.nexusgear.controller;
import com.nexusgear.dto.AuthRequest;
import com.nexusgear.dto.AuthResponse;
import com.nexusgear.dto.RegisterRequest;
import com.nexusgear.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
  private final AuthService authService;
  public AuthController(AuthService authService) {
    this.authService = authService;
  }
  @PostMapping("/register")
  public ResponseEntity&lt;AuthResponse&gt; register(@Valid @RequestBody RegisterRequest
request) {
    return
ResponseEntity.status(HttpStatus.CREATED).body(authService.register(request));
  }
  @PostMapping("/login")
  public ResponseEntity&lt;AuthResponse&gt; login(@Valid @RequestBody AuthRequest request) {
    return ResponseEntity.ok(authService.login(request));
  }</pre>
    `,

    // PAGE 12
    `
      <pre class="code-block">  @GetMapping("/me")
  public ResponseEntity&lt;?&gt; getCurrentUser(@RequestParam String email) {
    return authService.getUserByEmail(email)
      .map(u -&gt; ResponseEntity.ok(java.util.Map.of("name", u.getName(),
"email", u.getEmail(), "role", u.getRole())))
      .orElse(ResponseEntity.notFound().build());
  }
}

ORDERCONTROLLER.JAVA:
package com.nexusgear.controller;
import com.nexusgear.dto.CheckoutRequest;
import com.nexusgear.dto.OrderResponse;
import com.nexusgear.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {
  private final OrderService orderService;
  public OrderController(OrderService orderService) {
    this.orderService = orderService;
  }
  @PostMapping
  public ResponseEntity&lt;OrderResponse&gt; checkout(@Valid @RequestBody CheckoutRequest
request) {
    return
ResponseEntity.status(HttpStatus.CREATED).body(orderService.createOrder(request));
  }
  @GetMapping("/{orderNumber}")
  public ResponseEntity&lt;OrderResponse&gt; getOrder(@PathVariable String orderNumber) {
    return
orderService.getOrderByNumber(orderNumber).map(ResponseEntity::ok).orElse(ResponseEntity
.notFound().build());
  }
  @GetMapping("/user/{email}")</pre>
    `,

    // PAGE 13
    `
      <pre class="code-block">  public ResponseEntity&lt;List&lt;OrderResponse&gt;&gt; getUserOrders(@PathVariable String email)
{
    return ResponseEntity.ok(orderService.getOrdersByCustomerEmail(email));
  }
}

PRODUCT.JAVA:
package com.nexusgear.model;
import jakarta.persistence.*;
@Entity
@Table(name = "products")
public class Product {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Column(nullable = false)
  private String name;
  @Column(nullable = false)
  private String brand;
  @Column(nullable = false)
  private String category;
  @Column(nullable = false)
  private Double price;
  private Double originalPrice;
  private String imageUrl;
  private Integer stockQuantity;
  private Double rating;
  private String badge;
  private String availableColors;
  public Product() {}
  public Long getId() { return id; }
  public void setRating(Double rating) { this.rating = rating; }
  public String getBadge() { return badge; }
  public void setBadge(String badge) { this.badge = badge; }
  public String getAvailableColors() { return availableColors; }
}

USER.JAVA:
package com.nexusgear.model;
import jakarta.persistence.*;</pre>
    `,

    // PAGE 14
    `
      <pre class="code-block">import java.time.LocalDateTime;
@Entity
@Table(name = "users")
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Column(nullable = false)
  private String name;
  @Column(nullable = false, unique = true)
  private String email;
  @Column(nullable = false)
  private String password;
  private String role = "CUSTOMER";
  private LocalDateTime createdAt = LocalDateTime.now();
  public User() {}
  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }
  public String getName() { return name; }
}

ORDER.JAVA:
package com.nexusgear.model;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
@Entity
@Table(name = "orders")
public class Order {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Column(nullable = false, unique = true)
  private String orderNumber;
  @Column(nullable = false)
  private String customerName;
  @Column(nullable = false)
  private String customerEmail;</pre>
    `,

    // PAGE 15
    `
      <pre class="code-block">  @Column(nullable = false)
  private String shippingAddress;
  @Column(nullable = false)
  private Double totalAmount;
  @JsonManagedReference
  private List&lt;OrderItem&gt; items = new ArrayList&lt;&gt;();
  public Order() {}
  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }
  public String getOrderNumber() { return orderNumber; }
  public void setOrderNumber(String orderNumber) { this.orderNumber = orderNumber; }
  public String getCustomerEmail() { return customerEmail; }
  public Double getTotalAmount() { return totalAmount; }
  public void setTotalAmount(Double totalAmount) { this.totalAmount = totalAmount; }
  public String getStatus() { return status; }
  public void setStatus(String status) { this.status = status; }
  public List&lt;OrderItem&gt; getItems() { return items; }
  public void setItems(List&lt;OrderItem&gt; items) { this.items = items; }
}

WEBSITE IMAGES :

1. Home Page:</pre>
      <div class="image-wrapper-single">
        <img src="${imgHome}" class="site-image" />
      </div>
    `,

    // PAGE 16
    `
      <div class="image-label">2. Product Search:</div>
      <div class="image-wrapper-dual">
        <img src="${imgSearch}" class="site-image" />
      </div>
      <div class="image-label" style="margin-top: 14px;">3. Shopping Cart:</div>
      <div class="image-wrapper-dual">
        <img src="${imgCart}" class="site-image" />
      </div>
    `,

    // PAGE 17
    `
      <div class="image-label">4. Order Confirmation:</div>
      <div class="image-wrapper-single" style="margin-top: 20px;">
        <img src="${imgOrder}" class="site-image" />
      </div>
    `
  ];

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Assignment Report</title>
      <style>
        @page {
          size: A4 portrait;
          margin: 0;
        }
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        body {
          margin: 0;
          padding: 0;
          background: #ffffff;
          color: #000000;
          font-family: "Times New Roman", Times, Georgia, serif;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .page {
          width: 210mm;
          height: 296.8mm;
          padding: 12mm 12mm;
          page-break-after: always;
          display: flex;
          flex-direction: column;
        }
        .page:last-child {
          page-break-after: auto;
        }
        .page-border {
          width: 100%;
          height: 100%;
          border: 1.2px solid #000000;
          padding: 22px 26px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .header-title {
          text-align: center;
          font-weight: bold;
          font-size: 13pt;
          letter-spacing: 0.5px;
          margin-bottom: 16px;
        }
        .problem-statement {
          font-size: 10pt;
          line-height: 1.45;
          text-align: justify;
          margin-bottom: 12px;
        }
        .section-title {
          font-weight: bold;
          font-size: 11pt;
          margin-top: 8px;
          margin-bottom: 6px;
          font-family: "Times New Roman", Times, serif;
        }
        .file-title {
          font-weight: bold;
          font-size: 10.5pt;
          margin-top: 6px;
          margin-bottom: 6px;
          font-family: "Times New Roman", Times, serif;
        }
        .code-block {
          font-family: "Consolas", "Courier New", Courier, monospace;
          font-size: 8.4pt;
          line-height: 1.34;
          white-space: pre-wrap;
          word-break: break-word;
          color: #111111;
        }
        .image-label {
          font-weight: bold;
          font-size: 11pt;
          margin-bottom: 8px;
          font-family: "Times New Roman", Times, serif;
        }
        .image-wrapper-single {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
        }
        .image-wrapper-dual {
          height: 38%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
        }
        .site-image {
          max-width: 98%;
          max-height: 100%;
          object-fit: contain;
          border: 1px solid #d1d5db;
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
        }
      </style>
    </head>
    <body>
      ${pages.map(content => `
        <div class="page">
          <div class="page-border">
            ${content}
          </div>
        </div>
      `).join('')}
    </body>
    </html>
  `;

  fs.writeFileSync('temp_report.html', html);
  console.log('Generated temp_report.html');

  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const fileUrl = 'file:///' + path.resolve('temp_report.html').replace(/\\/g, '/');
  console.log('Loading page in Chrome:', fileUrl);
  await page.goto(fileUrl, { waitUntil: 'networkidle0' });

  const pdfPath = 'NEXUS_GEAR_Web_Programming_Assignment_II.pdf';
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true
  });

  await browser.close();
  console.log('PDF successfully generated:', pdfPath);
}

buildPdf().catch(console.error);
