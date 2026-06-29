import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../services/api.js';
import ProductCard from '../components/ProductCard.jsx';

export default function Home({ cart, onAddToCart, onRemoveFromCart }) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts()
      .then((response) => setProducts(response.data))
      .catch(() => setError('Unable to load products.'));
  }, []);

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div>
      <div className="card">
        <h2>Products</h2>
        {error && <div className="notification">{error}</div>}
        <div className="grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAdd={onAddToCart} />
          ))}
        </div>
      </div>

      <div className="cart-box">
        <h2>Shopping Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul>
              {cart.map((item) => (
                <li key={item.productId} style={{ marginBottom: 10 }}>
                  {item.productName} × {item.quantity} — ${ (item.price * item.quantity).toFixed(2) }
                  <button className="button secondary" style={{ marginLeft: 12 }} onClick={() => onRemoveFromCart(item.productId)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <p>Total: <strong>${cartTotal.toFixed(2)}</strong></p>
            <Link className="button" to="/checkout">Proceed to payment</Link>
          </>
        )}
      </div>
    </div>
  );
}
