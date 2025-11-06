import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgot = async (e) => {
    e.preventDefault();
    if (!email) return toast.warning("Please enter your email");

    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:5000/user/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await res.json();

      if (res.status === 200) {
        toast.success(result.msg || "Password reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(result.msg || "Email not found!");
      }
    } catch (error) {
      toast.error("Server error! Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <ToastContainer />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="card shadow-lg p-4 border-0 mb-5"
        style={{
          width: "100%",
          maxWidth: "400px",
          borderRadius: "15px",
          background: "white",
        }}
      >
        <h3 className="text-center text-primary mb-3 fw-bold">
          Forgot Password
        </h3>
        <p className="text-center text-muted small mb-4">
          Enter your registered email, and we’ll send you a reset link.
        </p>

        <form onSubmit={handleForgot}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control shadow-sm"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 py-2 fw-semibold d-flex justify-content-center align-items-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <div
                  className="spinner-border spinner-border-sm text-light me-2"
                  role="status"
                ></div>
                Sending...
              </>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>

        <div className="text-center mt-4">
          <Link to="/login" className="text-decoration-none text-secondary">
            ← Back to Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default ForgotPassword;
