import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });
      if (response.data.token) {
        // Handle successful login (e.g., store token, redirect)
        localStorage.setItem("token", response.data.token);
        navigate("/");
      }
    } catch (err) {
      setError("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="relative w-fit mx-auto p-8 bg-white shadow-lg rounded-lg">
      <div className="relative mb-8">
        <img src="/Header-bg.svg" alt="header-bg" className="w-full rounded-lg" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <img src="/logo-icon.svg" alt="logo-icon" className="h-12 w-12" />
          <span className="mt-2 text-white text-2xl font-bold px-4 py-2 rounded-md bg-opacity-7">
            Online Project Management
          </span>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-6">Login to get started</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-600"
            >
              {passwordVisible ? "Hide" : "Show"}
            </button>
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Login
            </button>
          </div>
          <div>
            <Link to="/signup">
              <button
                type="button"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                Signup Here
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
