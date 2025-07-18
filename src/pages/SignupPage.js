// pages/SignupPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'seeker' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const exists = users.find(u => u.email === form.email);
    if (exists) return alert("User already exists!");

    users.push(form);
    localStorage.setItem('users', JSON.stringify(users));
    alert("Signup successful!");
    navigate('/login');
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Create Account</h2>
      <input name="name" placeholder="Full Name" className="input" onChange={handleChange} />
      <input name="email" placeholder="Email" className="input" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" className="input" onChange={handleChange} />
      <select name="role" className="input" onChange={handleChange}>
        <option value="seeker">Job Seeker</option>
        <option value="employer">Employer</option>
      </select>
      <button onClick={handleSignup} className="btn">Sign Up</button>
    </div>
  );
};

export default SignupPage;
