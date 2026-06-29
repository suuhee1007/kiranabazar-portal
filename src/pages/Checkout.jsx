import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { placeOrder } from '../services/api.js';

export default function Checkout({ cart, onClearCart }) {
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Online Payment');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const submit = async (event) => {
    event.preventDefault();
    try {
      await placeOrder({ shippingAddress, paymentMethod, items: cart });
      setMessage('Payment successful. Order confirmed.');
      setError('');
      onClearCart();
      setTimeout(() => navigate('/'), 1400);
    } catch (err) {
      setError('Payment failed. Please try again later.');
    }
  };

  return (
    <div className="card">
      <h2>Checkout</h2>
      {message && <div className="notification">{message}</div>}
      {error && <div className="notification" style={{ background: '#fee2e2', borderColor: '#fecaca' }}>{error}</div>}

      <div className="input-group">
        <label>Shipping Address</label>
        <textarea value={shippingAddress} onChange={(e) => setShippingAddress(e.target.value)} rows="4" required />
      </div>

      <div className="input-group">
        <label>Payment Method</label>
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option>Online Payment</option>
          <option>Cash on Delivery</option>
        </select>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <h3>Order Summary</h3>
        <p>Items: {cart.length}</p>
        <p>Total amount: <strong>${total.toFixed(2)}</strong></p>
      </div>

      <button className="button" onClick={submit} disabled={cart.length === 0 || !shippingAddress}>
        Pay ${total.toFixed(2)}
      </button>
    </div>
  );
}
