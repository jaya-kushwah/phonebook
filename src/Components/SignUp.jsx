import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();
    setLoading(true);

    try {
      // let result = await fetch("http://127.0.0.1:5000/user/signup", {
      let result = await fetch(`${process.env.REACT_APP_BASE_URL}/user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, confirmPassword }),
      });

      let data = await result.json();

      if (result.status === 201) {
        toast.success("Signup successful Redirecting...");
        setTimeout(() => navigate("/login"), 2000);
      } else if (result.status === 400) {
        toast.error(data.msg || "Invalid input!");
      } else {
        toast.error("Something went wrong. Try again!");
      }
    } catch (error) {
      toast.error("Server error, please try later!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card shadow-lg p-4 border-0 mt-5"
        style={{ width: "100%", maxWidth: "400px", borderRadius: "15px" }}
      >
        <h3 className="font text-center mb-3 fw-bold">Sign Up</h3>

        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              className="form-control shadow-sm"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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

          {/* Password */}
          <div className="mb-3 position-relative">
            <label className="form-label fw-semibold">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control shadow-sm pe-5"
              placeholder="Create a password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <i
              className={`bi ${
                showPassword ? "bi-eye-slash" : "bi-eye"
              } position-absolute`}
              onClick={() => setShowPassword(!showPassword)}
              style={{
                right: "15px",
                top: "38px",
                cursor: "pointer",
                color: "#6c757d",
              }}
            ></i>
          </div>

          {/* Confirm Password */}
          <div className="mb-3 position-relative">
            <label className="form-label fw-semibold">Confirm Password</label>
            <input
              type={showConfirm ? "text" : "password"}
              className="form-control shadow-sm pe-5"
              placeholder="Confirm your password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <i
              className={`bi ${
                showConfirm ? "bi-eye-slash" : "bi-eye"
              } position-absolute`}
              onClick={() => setShowConfirm(!showConfirm)}
              style={{
                right: "15px",
                top: "38px",
                cursor: "pointer",
                color: "#6c757d",
              }}
            ></i>
          </div>

          <button
            type="submit"
            className="bg-color w-100 py-2 fw-semibold border-0 rounded-3"
            disabled={loading}
          >
            {loading ? (
              <div
                className="spinner-border spinner-border-sm text-light"
                role="status"
              ></div>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <hr />

        <div className="text-center">
          <span className="text-secondary small">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font fw-semibold text-decoration-none"
            >
              Login
            </Link>
          </span>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer autoClose={2500} />
    </div>
  );
}

export default SignUp;
