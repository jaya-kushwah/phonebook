import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { ToastContainer, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const cookies = new Cookies();
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);

    try {
      // const response = await fetch("http://127.0.0.1:5000/user/login", {
      const response = await fetch("https://phonebook-backend-burq.onrender.com/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.status === 200) {
        cookies.set("user", JSON.stringify(result.data), { path: "/" });
        toast.success(" Login Successful!");
        setTimeout(() => (window.location.href = "/show"), 1500);
      } else if (response.status === 400) {
        toast.error(result.msg || "Invalid credentials", {

        });
      } else {
        toast.error("Login failed. Please try again.", {

        });
      }
    } catch (error) {
      toast.error("Server error. Please check your connection.", {
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <ToastContainer />

      <div
        className="card shadow-lg p-4 border-0 mb-5"
        style={{
          width: "100%",
          maxWidth: "400px",
          borderRadius: "15px",
          background: "white",
        }}
      >
        <h3 className="text-center font mb-3 fw-bold">Login</h3>

        <form onSubmit={handleLogin}>
          {/* Email Field */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control shadow-sm"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-3 position-relative">
            <label className="form-label fw-semibold">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control shadow-sm pe-5"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <i
              className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} position-absolute`}
              onClick={() => setShowPassword(!showPassword)}
              style={{
                right: "15px",
                top: "38px",
                cursor: "pointer",
                color: "#6c757d",
              }}
            ></i>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-color border-0 rounded-3 w-100 py-2 fw-semibold d-flex justify-content-center align-items-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <div
                  className="spinner-border spinner-border-sm text-light me-2"
                  role="status"
                ></div>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Forgot Password */}
        <div className="text-center mt-3">
          <Link
            to="/forgot_password"
            className="text-decoration-none small text-secondary"
          >
            Forgot Password?
          </Link>
        </div>

        <hr />

        {/* Sign Up Link */}
        <div className="text-center">
          <span className="text-secondary small">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="fw-semibold font text-decoration-none"
            >
              Sign up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
