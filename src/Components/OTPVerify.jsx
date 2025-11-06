import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function OTPVerify() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus automatically
      if (value && index < 3) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 4) {
      toast.error("Please enter a valid 4-digit OTP");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://127.0.0.1:5000/user/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp: enteredOtp }),
      });

      if (res.status === 200) {
        toast.success("OTP Verified Successfully!");
        setTimeout(() => navigate("/reset-password"), 1500);
      } else {
        const data = await res.json();
        toast.error(data.msg || "Invalid OTP ");
      }
    } catch (err) {
      toast.error("Server error! Try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 bg-light"
      style={{
        // background: "linear-gradient(120deg, #1e3c72 0%, #2a5298 100%)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card shadow-lg p-4 border-0 text-center mb-5"
        style={{
          maxWidth: "400px",
          width: "100%",
          borderRadius: "15px",
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(15px)",
        }}
      >
        <h4 className="fw-bold text-primary mb-3">Verify OTP</h4>
        <p className="text-muted small mb-4">
          Please enter the 4-digit code sent to your registered email.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="d-flex justify-content-center gap-2 mb-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                className="form-control text-center shadow-sm"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                style={{
                  width: "50px",
                  height: "50px",
                  fontSize: "22px",
                  fontWeight: "bold",
                  borderRadius: "10px",
                  border: "1px solid #ccc",
                }}
              />
            ))}
          </div>

          <button
            type="submit"
            className="btn w-100 text-white fw-semibold py-2"
            style={{
              background: "linear-gradient(90deg, #1e3c72 0%, #2a5298 100%)",
              borderRadius: "10px",
              boxShadow: "0 4px 15px rgba(30,60,114,0.3)",
            }}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <ToastContainer position="top-center" autoClose={2000} />
      </motion.div>
    </div>
  );
}

export default OTPVerify;
