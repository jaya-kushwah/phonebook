import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import phone from "../images/jk.jpg";
import girl from "../images/image.png";

function Home() {
  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif",
        backgroundColor: "#f8faff",
        overflowX: "hidden",
      }}
    >
      {/* 🌌 Hero Section */}
      <section className="position-relative text-center text-white">
        <img
          src={phone}
          alt="Background"
          className="img-fluid w-100"
          style={{
            height: "100vh",
            objectFit: "cover",
            filter: "brightness(55%)",
          }}
        />
        <div
          className="position-absolute top-50 start-50 translate-middle"
          style={{ animation: "fadeDown 1s ease-in-out" }}
        >
          <h1
            className="fw-bold display-4 mb-3"
            style={{
              textShadow: "2px 2px 10px rgba(0,0,0,0.7)",
            }}
          >
            Digital Phone Directory
          </h1>
          <p
            className="lead mb-4"
            style={{
              fontSize: "1.3rem",
              fontWeight: "400",
              animation: "fadeUp 1s ease-in-out",
            }}
          >
            Simplify your contacts. Organize smartly. Stay connected.
          </p>
          <button
            className="btn btn-lg text-black rounded-pill px-4 fw-semibold"
            style={{
              // background: "linear-gradient(90deg, #1e3c72, #2d56a3)",
              background: "white",
              border: "none",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow =
                "0 0 20px rgba(30, 60, 114, 0.6)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
            onClick={() =>
              document
                .getElementById("about")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Get Started
          </button>
        </div>
      </section>

      {/* 💡 About Section */}
      <section
        id="about"
        className="py-5"
        style={{
          background: "linear-gradient(135deg, #f9fbff, #eef3ff)",
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            {/* Image */}
            <div className="col-md-6 text-center mb-4 mb-md-0">
              <div
                className="shadow-lg rounded-4 overflow-hidden mx-auto"
                style={{
                  border: "6px solid #fff",
                  maxWidth: "90%",
                  transition: "transform 0.5s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <img
                  src={girl}
                  alt="AI Assistance"
                  className="img-fluid"
                  style={{ maxHeight: "420px", width: "100%" }}
                />
              </div>
            </div>

            {/* Text */}
            <div className="col-md-6">
              <h2
                className="fw-bold mb-3"
                style={{
                  color: "#1e3c72",
                  fontSize: "2.1rem",
                  animation: "slideLeft 1s ease",
                }}
              >
                Smarter, Faster & Modern Way to Connect
              </h2>
              <p className="text-muted fs-5 mb-4">
                Say goodbye to old phonebooks. With{" "}
                <b>Digital Phone Directory</b>, you get a sleek, AI-powered way
                to store, search, and manage your contacts.
              </p>

              {[
                {
                  icon: "bi-cloud-lock",
                  title: "Secure Cloud Backup",
                  color: "#1e3c72",
                },
                {
                  icon: "bi-lightning-charge",
                  title: "Instant Access",
                  color: "#2d56a3",
                },
                {
                  icon: "bi-magic",
                  title: "Smart Suggestions",
                  color: "#4e7ce3",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="d-flex align-items-center mb-3"
                  style={{
                    transition: "all 0.4s ease",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "translateX(10px)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "translateX(0)")
                  }
                >
                  <div
                    className="rounded-circle text-white d-flex align-items-center justify-content-center me-3"
                    style={{
                      width: "45px",
                      height: "45px",
                      background: item.color,
                      boxShadow: `0 0 12px ${item.color}`,
                    }}
                  >
                    <i className={`bi ${item.icon}`}></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1" style={{ color: item.color }}>
                      {item.title}
                    </h6>
                    <p className="text-muted mb-0">
                      AI-driven convenience & speed.
                    </p>
                  </div>
                </div>
              ))}

              <button
                className="btn text-white rounded-pill px-4 mt-4"
                style={{
                  background: "linear-gradient(90deg, #1e3c72, #2d56a3)",
                  border: "none",
                }}
              >
                Discover More →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 🚀 Features Section */}
      <section
        className="py-5 text-center"
        style={{
          background: "linear-gradient(180deg, #f8f9fa, #eef2ff)",
        }}
      >
        <div className="container">
          <h2
            className="fw-bold mb-5"
            style={{
              background:
                "linear-gradient(90deg, #1e3c72, #2d56a3, #4e7ce3, #1e3c72)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundSize: "200%",
              animation: "shine 5s linear infinite",
            }}
          >
            🌟 Why Choose Digital Directory?
          </h2>

          <div className="row g-4">
            {[
              {
                title: "🔍 Advanced Search",
                desc: "Find contacts instantly by name or number.",
              },
              {
                title: "⚙️ Smart Filters",
                desc: "Sort and organize your directory easily.",
              },
              {
                title: "📍 Map Integration",
                desc: "Locate businesses and contacts visually.",
              },
            ].map((feature, index) => (
              <div className="col-md-4" key={index}>
                <div
                  className="p-4 bg-white rounded-4 shadow-sm h-100"
                  style={{
                    transition: "all 0.4s ease",
                    cursor: "pointer",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-10px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 20px rgba(0, 0, 0, 0.15)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 2px 8px rgba(0,0,0,0.1)";
                  }}
                >
                  <h5 className="fw-bold mb-2" style={{ color: "#1e3c72" }}>
                    {feature.title}
                  </h5>
                  <p className="text-muted">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 📞 Contact Section */}
      <section
        className="text-center text-white py-5"
        style={{
          background: "linear-gradient(135deg, #1e3c72, #2d56a3, #4e7ce3)",
        }}
      >
        <h2 className="fw-bold mb-3">Ready to Simplify Your Contacts?</h2>
        <p className="fs-5 mb-4">Join our digital revolution today.</p>
        <button className="btn btn-light rounded-pill px-4 py-2 fw-bold">
          Start Now  
        </button>
      </section>

      {/* 🧭 Footer */}
      <footer
        className="text-white text-center py-4"
        style={{
          background: "#1a1a1a",
          width: "100%",
        }}
      >
        <div className="mb-3 d-flex justify-content-center gap-3">
          <a
            href="#"
            style={{
              color: "white",
              fontSize: "1.5rem",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = "#4e7ce3")}
            onMouseOut={(e) => (e.currentTarget.style.color = "white")}
          >
            <FaLinkedin />
          </a>
          <a
            href="#"
            style={{
              color: "white",
              fontSize: "1.5rem",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = "#4e7ce3")}
            onMouseOut={(e) => (e.currentTarget.style.color = "white")}
          >
            <FaGithub />
          </a>
        </div>
        <p className="mb-0">
          © 2025 <b>Digital Phone Directory</b> | Designed with ❤️ by{" "}
          <b>Jaya Kushwah</b>
        </p>
      </footer>

      {/* ✨ Inline Keyframes */}
      <style>
        {`
          @keyframes fadeUp { from { opacity: 0; transform: translateY(30px);} to {opacity: 1; transform: translateY(0);} }
          @keyframes fadeDown { from { opacity: 0; transform: translateY(-30px);} to {opacity: 1; transform: translateY(0);} }
          @keyframes slideLeft { from { opacity: 0; transform: translateX(40px);} to {opacity: 1; transform: translateX(0);} }
          @keyframes shine { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
        `}
      </style>
    </div>
  );
}

export default Home;
