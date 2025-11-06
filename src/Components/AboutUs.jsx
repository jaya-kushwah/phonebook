import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import { FaUsers, FaAddressBook, FaSearch, FaLock } from "react-icons/fa";

function AboutUs() {
  const featureCards = [
    {
      icon: <FaAddressBook size={40} className="text-primary me-2" />,
      title: "Add & Manage Contacts",
      text: "Create, view, and organize contacts with simple forms and easy updates.",
    },
    {
      icon: <FaSearch size={40} className="text-success me-2" />,
      title: "Smart Search",
      text: "Quickly find contacts by name, email, or phone number with instant results.",
    },
    {
      icon: <FaUsers size={40} className="text-warning me-2" />,
      title: "Group Contacts",
      text: "Categorize contacts into groups for better organization.",
    },
    {
      icon: <FaLock size={40} className="text-danger me-2" />,
      title: "Secure Data",
      text: "All your data is protected using modern authentication and encryption.",
    },
  ];

  return (
    <div
      className="container-fluid py-5"
      style={{
        background: "linear-gradient(135deg, #eef2ff, #cfd8ff)",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      {/* 🌟 Hero Section */}
      <motion.div
        className="text-center mb-5"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1
          className="font fw-bold"
          style={{
            letterSpacing: "0.5px",
            textShadow: "0px 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          About Our Contact Manager
        </h1>
        <p
          className="text-muted fs-5 mt-3 mx-auto"
          style={{ maxWidth: "600px" }}
        >
          Manage your personal and professional contacts efficiently & securely.
        </p>
      </motion.div>

      {/* 💡 About Description */}
      <motion.div
        className="card shadow border-0 mx-auto mb-5"
        style={{
          maxWidth: "900px",
          borderRadius: "18px",
          background: "white",
        }}
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        whileHover={{
          y: -8,
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
          transition: { duration: 0.3 },
        }}
      >
        <motion.div
          className="card-body p-4 p-md-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <motion.h4
            className="font fw-semibold mb-3"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Our Purpose
          </motion.h4>

          <motion.p
            className="text-secondary"
            style={{ lineHeight: "1.8" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            This Contact Management System helps users to easily add, edit,
            search, and organize their contacts in one place. Built using{" "}
            <b>React, Node.js, and MongoDB</b>, it ensures fast performance, a
            clean interface, and secure data handling.
          </motion.p>

          <motion.p
            className="text-secondary mb-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            Whether for personal use or business, our app simplifies
            communication management and gives you complete control over your
            contact list — anytime, anywhere.
          </motion.p>
        </motion.div>
      </motion.div>

      {/* ⚙️ Features Section */}
      <div className="container mb-5">
        <motion.h3
          className="font text-center fw-bold mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Key Features
        </motion.h3>

        <div className="row g-4 justify-content-center px-3 px-md-0">
          {featureCards.map((card, index) => (
            <motion.div
              key={index}
              className="col-10 col-sm-6 col-md-4 col-lg-5"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{
                scale: 1.05,
                y: -5,
                // boxShadow: "0 8px 25px rgba(0,0,0,0.12)",
              }}
            >
              <div
                className="card text-center p-4 border-0 h-100 shadow-sm d-flex align-items-center justify-content-center"
                style={{
                  borderRadius: "20px",
                  background: "linear-gradient(145deg, #ffffff, #f8faff)",
                  transition: "all 0.3s ease",
                }}
              >
                <div className="d-flex align-items-center justify-content-center flex-column">
                  <motion.div
                    className="d-flex align-items-center justify-content-center mb-3"
                    initial={{ rotate: -15, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    {card.icon}
                    <h5 className="fw-semibold text-dark ms-2 mb-0">
                      {card.title}
                    </h5>
                  </motion.div>
                  <p className="text-muted small px-3">{card.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 💙 Footer (Not Fixed) */}
  <motion.footer
        className="text-center w-100 position-fixed bottom-0 start-0"
        style={{
          background: "linear-gradient(90deg, #1e3c72 0%, #2a5298 100%)",
          color: "white",
          padding: "15px 0",
          zIndex: 1000,
          boxShadow: "0 -2px 10px rgba(0,0,0,0.2)",
        }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <p className="mb-1 fw-semibold fs-6">
            Developed with <span style={{ color: "#ff6b6b" }}>❤️</span> by{" "}
            <b
              style={{
                color: "#ffd700",
                letterSpacing: "0.5px",
                textShadow: "0px 0px 6px rgba(255, 215, 0, 0.5)",
              }}
            >
              Jaya Kushwah
            </b>
          </p>
          <small style={{ opacity: 0.9, fontSize: "13px" }}>
            © {new Date().getFullYear()} All Rights Reserved
          </small>
        </motion.div>
      </motion.footer>

    </div>
  );
}

export default AboutUs;
