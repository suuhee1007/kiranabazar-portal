import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, Link, useNavigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Home from './pages/Home.jsx';
import Checkout from './pages/Checkout.jsx';

function AppLayout({ children, onLogout, username }) {
  return (
    <div className="container">
      <header className="header">
        <div>
          <h1>Kiranabazaar</h1>
          <p>Shop online and pay securely.</p>
        </div>
        <div>
          <Link to="/">Home</Link>
          {username ? (
            <button className="button secondary" style={{ marginLeft: 16 }} onClick={onLogout}>
              Logout
            </button>
          ) : (
            <Link style={{ marginLeft: 16 }} to="/login">Login</Link>
          )}
        </div>
      </header>
      {children}
    </div>
  );
}

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('kiranabazar_token');
  return token ? children : <Navigate to="/login" replace />;
}

function App() {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('kiranabazar_cart') || '[]'));
  const [username, setUsername] = useState(localStorage.getItem('kiranabazar_username') || '');
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('kiranabazar_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((current) => {
      const existing = current.find((item) => item.productId === product.id);
      if (existing) {
        return current.map((item) => item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...current, { productId: product.id, productName: product.name, price: product.price, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((current) => current.filter((item) => item.productId !== productId));
  };

  const clearCart = () => setCart([]);

  const onLogout = () => {
    localStorage.removeItem('kiranabazar_token');
    localStorage.removeItem('kiranabazar_username');
    setUsername('');
    navigate('/login');
  };

  const handleLoginSuccess = (name) => {
    setUsername(name);
    localStorage.setItem('kiranabazar_username', name);
    navigate('/');
  };

  return (
    <AppLayout onLogout={onLogout} username={username}>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home cart={cart} onAddToCart={addToCart} onRemoveFromCart={removeFromCart} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout cart={cart} onClearCart={clearCart} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AppLayout>
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
