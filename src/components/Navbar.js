import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link to="/dashboard" className="navbar-brand d-flex align-items-center">
        <img src="/logo123.jpg" alt="logo" style={{ width: 36, height: 36, borderRadius: 8 }} />
        <span className="ms-2">GANDEEVAN TECHNOLOGIES</span>
      </Link>

      <div className="ms-auto d-flex align-items-center">
        {user ? (
          <>
            <Link className="btn btn-sm btn-outline-light me-2" to="/boxes">Boxes</Link>
            <Link className="btn btn-sm btn-outline-light me-2" to="/history">History</Link>
            {user.role === "SuperAdmin" && <Link className="btn btn-sm btn-outline-light me-2" to="/users">Users</Link>}
            <span className="badge bg-info me-3">{user.role}</span>
            <button className="btn btn-sm btn-outline-danger" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link className="btn btn-sm btn-outline-light me-2" to="/">Login</Link>
            <Link className="btn btn-sm btn-primary" to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
