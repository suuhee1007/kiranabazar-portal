import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api.js';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    address: '',
    phoneNumber: '',
    email: '',
    city: '',
    state: '',
    username: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const submit = async (event) => {
    event.preventDefault();
    try {
      await registerUser(form);
      setMessage('Registration successful. Please login.');
      setError('');
      setTimeout(() => navigate('/login'), 1200);
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="card">
      <h2>Register</h2>
      {message && <div className="notification">{message}</div>}
      {error && <div className="notification" style={{ background: '#fee2e2', borderColor: '#fecaca' }}>{error}</div>}
      <form onSubmit={submit}>
        {['name', 'address', 'phoneNumber', 'email', 'city', 'state', 'username', 'password'].map((field) => (
          <div className="input-group" key={field}>
            <label>{field === 'phoneNumber' ? 'Phone Number' : field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
              name={field}
              value={form[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit" className="button">Register</button>
      </form>
    </div>
  );
}
