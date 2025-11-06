import React, { useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";

function Contact() {
  const form = useRef();
  const [status, setStatus] = useState({ loading: false, success: "", error: "" });

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: "", error: "" });

    emailjs
      .sendForm(
        "service_whbn7f6", // your service ID
        "template_b0mw2gn", // your template ID
        form.current,
        "axdHFmq-R3lA4ZYrl" // your public key
      )
      .then(
        () => {
          setStatus({
            loading: false,
            success: "Message sent successfully! We'll get back to you soon 💌",
            error: "",
          });
          form.current.reset();
          setTimeout(() => setStatus({ loading: false, success: "", error: "" }), 4000);
        },
        () => {
          setStatus({
            loading: false,
            success: "",
            error: "Failed to send message. Please try again later.",
          });
          setTimeout(() => setStatus({ loading: false, success: "", error: "" }), 4000);
        }
      );
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100 p-3"
      style={{ background: "linear-gradient(120deg, #f0f4ff, #e0e9ff)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="card shadow-lg border-0 w-100"
        style={{
          borderRadius: "20px",
          maxWidth: "950px",
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="row g-0 flex-column flex-md-row">
          {/* Left Section - Hidden on small screens */}
          <div
            className="col-md-5 d-none d-md-flex flex-column justify-content-center text-white p-4"
            style={{
              background:
                "linear-gradient(135deg, rgba(30,60,114,1) 0%, rgba(42,82,152,1) 100%)",
              borderTopLeftRadius: "20px",
              borderBottomLeftRadius: "20px",
            }}
          >
            <motion.h3
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="fw-bold mb-3"
            >
               Get in Touch
            </motion.h3>
            <p className="mb-4 opacity-75">
              We'd love to hear from you! Fill out the form and our team will get back to you soon.
            </p>
            <div className="d-flex align-items-center mb-3">
              <FaPhoneAlt className="me-3 fs-5 text-warning" />
              <span>+91 98765 43210</span>
            </div>
            <div className="d-flex align-items-center mb-3">
              <FaEnvelope className="me-3 fs-5 text-warning" />
              <span>support@phonebookapp.com</span>
            </div>
            <div className="d-flex align-items-center">
              <FaMapMarkerAlt className="me-3 fs-5 text-warning" />
              <span>Bhopal, Madhya Pradesh, India</span>
            </div>
          </div>

          {/* Right Section - Contact Form */}
          <div className="col-md-7 p-4 p-md-5 position-relative">
            <h4 className="font fw-bold text-center mb-4">Contact Us</h4>

            {status.success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="alert alert-success text-center py-2 rounded-3 shadow-sm"
              >
                {status.success}
              </motion.div>
            )}
            {status.error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="alert alert-danger text-center py-2 rounded-3 shadow-sm"
              >
                {status.error}
              </motion.div>
            )}

            <form ref={form} onSubmit={sendEmail}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Full Name</label>
                <input
                  type="text"
                  name="user_name"
                  className="form-control shadow-sm"
                  placeholder="Enter your name"
                  required
                  disabled={status.loading}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Email</label>
                <input
                  type="email"
                  name="user_email"
                  className="form-control shadow-sm"
                  placeholder="Enter your email"
                  required
                  disabled={status.loading}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Message</label>
                <textarea
                  name="message"
                  rows="4"
                  className="form-control shadow-sm"
                  placeholder="Write your message..."
                  required
                  disabled={status.loading}
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: !status.loading ? 1.05 : 1 }}
                whileTap={{ scale: !status.loading ? 0.95 : 1 }}
                type="submit"
                className="btn w-100 text-white fw-semibold py-2"
                disabled={status.loading}
                style={{
                  background: "linear-gradient(90deg, #1e3c72 0%, #2a5298 100%)",
                  borderRadius: "10px",
                  boxShadow: "0 4px 15px rgba(30,60,114,0.3)",
                  transition: "all 0.3s ease",
                }}
              >
                {status.loading ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <div
                      className="spinner-border spinner-border-sm text-light me-2"
                      role="status"
                    ></div>
                    Sending...
                  </motion.div>
                ) : (
                  "Send Message"
                )}
              </motion.button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Contact;
