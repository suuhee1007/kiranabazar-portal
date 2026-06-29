import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/api.js';

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    try {
      const response = await loginUser({ username, password });
      localStorage.setItem('kiranabazar_token', response.data.token);
      onLoginSuccess(response.data.username);
      setError('');
      navigate('/');
    } catch (err) {
      setError('Login failed. Check your credentials.');
    }
  };

  return (
    <div className="card">
      <h2>Login</h2>
      {error && <div className="notification">{error}</div>}
      <form onSubmit={submit}>
        <div className="input-group">
          <label>Username</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="button">Login</button>
      </form>
      <p style={{ marginTop: 16 }}>
        New customer? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}
