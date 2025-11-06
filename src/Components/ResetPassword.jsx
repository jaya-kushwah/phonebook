import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams(); // get reset token from URL

  const handleReset = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword)
      return toast.warning("Please fill in both fields");

    if (password !== confirmPassword)
      return toast.error("Passwords do not match");

    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:5000/user/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const result = await res.json();

      if (res.status === 200) {
        toast.success(result.msg || "Password reset successful!");
        setTimeout(() => navigate("/login"), 2500);
      } else {
        toast.error(result.msg || "Reset link invalid or expired");
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
          Reset Password
        </h3>
        <p className="text-center text-muted small mb-4">
          Enter and confirm your new password below.
        </p>

        <form onSubmit={handleReset}>
          <div className="mb-3">
            <label className="form-label fw-semibold">New Password</label>
            <input
              type="password"
              className="form-control shadow-sm"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Confirm Password</label>
            <input
              type="password"
              className="form-control shadow-sm"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
                Resetting...
              </>
            ) : (
              "Reset Password"
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

export default ResetPassword;
