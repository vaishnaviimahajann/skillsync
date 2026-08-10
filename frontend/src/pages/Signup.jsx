import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", college: "", branch: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/api/auth/signup", form);
      login(res.data.token, res.data.user);
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Create your account</h1>
        <p className="auth-sub">Takes about a minute.</p>

        {error && <div className="auth-error">{error}</div>}

        <label>Full name</label>
        <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Your name" />

        <label>Email</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@college.edu" />

        <label>Password</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} required placeholder="At least 6 characters" minLength={6} />

        <label>College</label>
        <input type="text" name="college" value={form.college} onChange={handleChange} placeholder="e.g. PCCOER" />

        <label>Branch</label>
        <input type="text" name="branch" value={form.branch} onChange={handleChange} placeholder="e.g. Computer Engineering" />

        <button className="btn-primary" type="submit" disabled={loading}>
          {loading ? "Creating account…" : "Create account"}
        </button>

        <p className="auth-switch">Already have an account? <Link to="/login">Log in</Link></p>
      </form>
    </div>
  );
}
