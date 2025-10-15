// pages/Login.js
import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [busy, setBusy] = useState(false);

const submit = (e) => {
  e.preventDefault();
  setBusy(true);

  // Call login
  login(form.email, form.password)
    .then(() => {
      // ✅ Navigate after login completes and user state is set
      navigate("/dashboard");
    })
    .catch(() => {
      // login errors handled in AuthContext (toast)
    })
    .finally(() => setBusy(false));
};


  const fillDemo = (which) => {
    if (which === "admin") setForm({ email: "admin@demo.com", password: "password" });
    if (which === "manager") setForm({ email: "manager@demo.com", password: "password" });
    if (which === "user") setForm({ email: "user@demo.com", password: "password" });
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card bg-dark text-light p-4 shadow" style={{ width: 420 }}>
        <h3 className="mb-3">Login</h3>
        <form onSubmit={submit}>
          <input className="form-control mb-2" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          <input className="form-control mb-3" placeholder="Password" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
          <button className="btn btn-primary w-100" disabled={busy}>{busy ? "Logging..." : "Login"}</button>
        </form>

        <div className="mt-3 text-center">
          <small>Demo</small>
          <div className="mt-2">
            <button className="btn btn-sm btn-secondary me-1" onClick={() => fillDemo("admin")}>Admin</button>
            <button className="btn btn-sm btn-secondary me-1" onClick={() => fillDemo("manager")}>Manager</button>
            <button className="btn btn-sm btn-secondary" onClick={() => fillDemo("user")}>User</button>
          </div>
        </div>
      </div>
    </div>
  );
}
