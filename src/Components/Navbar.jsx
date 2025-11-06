// import React, { useState, useEffect } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import Cookies from "universal-cookie";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";

// function Navbar() {
//   const [isLogin, setIsLogin] = useState(false);
//   const [visible, setVisible] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);
//   const cookies = new Cookies();
//   const user = cookies.get("user");
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     setIsLogin(user !== undefined);
//   }, [user]);

//   // Navbar hide/show on scroll
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > lastScrollY && window.scrollY > 60) {
//         setVisible(false);
//       } else {
//         setVisible(true);
//       }
//       setLastScrollY(window.scrollY);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [lastScrollY]);

//   const handleLogout = () => {
//     cookies.remove("user");
//     navigate("/");
//   };

//   return (
//     <>
//       <nav
//         className={`navbar navbar-expand-lg bg-white shadow-sm fixed-top px-4 transition-all ${
//           visible ? "nav-visible" : "nav-hidden"
//         }`}
//         style={{
//           transition: "transform 0.4s ease, box-shadow 0.3s ease",
//           borderBottom: "1px solid #f0f0f0",
//         }}
//       >
//         <div className="container-fluid">
//           {/* Attractive Logo */}
//           <Link
//             className="navbar-brand fw-bold gradient-logo"
//             to="/"
//             style={{ fontSize: "22px" }}
//           >
//             <span>PhoneBook Directory</span>
//           </Link>

//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarNav"
//             aria-controls="navbarNav"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>

//           <div className="collapse navbar-collapse" id="navbarNav">
//             <ul className="navbar-nav ms-auto align-items-center">
//               {isLogin ? (
//                 <>
//                   <li className="nav-item">
//                     <Link
//                       className={`nav-link fw-medium ${
//                         location.pathname === "/add" ? "active-link" : ""
//                       }`}
//                       to="/add"
//                     >
//                       Add Contact
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link
//                       className={`nav-link fw-medium ${
//                         location.pathname === "/show" ? "active-link" : ""
//                       }`}
//                       to="/show"
//                     >
//                       Show Contacts
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link
//                       className={`nav-link fw-medium ${
//                         location.pathname === "/group" ? "active-link" : ""
//                       }`}
//                       to="/group"
//                     >
//                       Add Group
//                     </Link>
//                   </li>

//                   <li className="nav-item">
//                     <button
//                       onClick={handleLogout}
//                       className="btn border-0 text-white fw-semibold ms-2 rounded-pill px-4 py-2 logout-btn"
//                     >
//                       <i className="bi bi-box-arrow-right me-2"></i> Logout
//                     </button>
//                   </li>
//                 </>
//               ) : (
//                 <>
//                   {["/", "/signup", "/login", "/about", "/contact"].map(
//                     (path, i) => {
//                       const labels = [
//                         "Home",
//                         "Signup",
//                         "Login",
//                         "About Us",
//                         "Contact Us",
//                       ];
//                       return (
//                         <li className="nav-item" key={path}>
//                           <Link
//                             className={`nav-link fw-medium ${
//                               location.pathname === path ? "active-link" : ""
//                             }`}
//                             to={path}
//                           >
//                             {labels[i]}
//                           </Link>
//                         </li>
//                       );
//                     }
//                   )}
//                 </>
//               )}
//             </ul>
//           </div>
//         </div>
//       </nav>

//       {/* Spacer */}
//       <div style={{ marginTop: "55px" }}></div>

//       {/* CSS Animations */}
//       <style>{`
//         .nav-hidden {
//           transform: translateY(-100%);
//         }
//         .nav-visible {
//           transform: translateY(0);
//         }

//         /* Attractive gradient logo */
//         .gradient-logo span {
//           background: linear-gradient(90deg, #1e3c72, #2a5298, #00c6ff);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           animation: shimmer 3s infinite linear;
//           background-size: 200% auto;
//         }
//         @keyframes shimmer {
//           0% { background-position: 0% center; }
//           100% { background-position: 200% center; }
//         }

//         /* Navbar Links */
//         .nav-link {
//           position: relative;
//           color: #333 !important;
//           margin: 0 8px;
//           transition: color 0.3s ease;
//         }

//         // /* Shine hover effect */
//         // .nav-link::after {
//         //   content: "";
//         //   position: absolute;
//         //   left: 0;
//         //   bottom: 0;
//         //   width: 0%;
//         //   height: 2px;
//         //   background: linear-gradient(90deg, #1e3c72, #2a5298, #00c6ff);
//         //   transition: width 0.4s ease;
//         // }
//         .nav-link:hover::after {
//           width: 100%;
//         }
//         .nav-link:hover {
//           color: #2a5298 !important;
//         }

//         /* Active link highlight */
//         .active-link {
//           color: #2a5298 !important;
//         }
//         .active-link::after {
//           width: 100%;
//         }

//         /* Logout button with animation */
//         .logout-btn {
//           background: linear-gradient(90deg, #1e3c72, #2a5298);
//           transition: all 0.3s ease;
//           box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
//           font-size: 15px;
//         }
//         .logout-btn:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 6px 20px rgba(42, 82, 152, 0.35);
//         }
//       `}</style>
//     </>
//   );
// }

// export default Navbar;




import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Navbar() {
  const [isLogin, setIsLogin] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const cookies = new Cookies();
  const user = cookies.get("user");
  const navigate = useNavigate();
  const location = useLocation();
  const navRef = useRef(null);

  useEffect(() => {
    setIsLogin(user !== undefined);
  }, [user]);

  // Hide/Show on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 60) setVisible(false);
      else setVisible(true);
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close navbar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target) &&
        isCollapsed
      ) {
        setIsCollapsed(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isCollapsed]);

  // Close navbar on link click
  const handleNavLinkClick = () => {
    if (isCollapsed) setIsCollapsed(false);
  };

  const handleLogout = () => {
    cookies.remove("user");
    navigate("/");
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`navbar navbar-expand-lg bg-white shadow-sm fixed-top px-4 transition-all ${
          visible ? "nav-visible" : "nav-hidden"
        }`}
        style={{
          transition: "transform 0.4s ease, box-shadow 0.3s ease",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <div className="container-fluid">
          <Link
            className="navbar-brand fw-bold gradient-logo"
            to="/"
            style={{ fontSize: "22px" }}
          >
            <span>PhoneBook Directory</span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className={`collapse navbar-collapse ${isCollapsed ? "show" : ""}`}
            id="navbarNav"
          >
            <ul className="navbar-nav ms-auto align-items-center">
              {isLogin ? (
                <>
                  <li className="nav-item">
                    <Link
                      className={`nav-link fw-medium ${
                        location.pathname === "/add" ? "active-link" : ""
                      }`}
                      to="/add"
                      onClick={handleNavLinkClick}
                    >
                      Add Contact
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link fw-medium ${
                        location.pathname === "/show" ? "active-link" : ""
                      }`}
                      to="/show"
                      onClick={handleNavLinkClick}
                    >
                      Show Contacts
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link fw-medium ${
                        location.pathname === "/group" ? "active-link" : ""
                      }`}
                      to="/group"
                      onClick={handleNavLinkClick}
                    >
                      Add Group
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button
                      onClick={() => {
                        handleLogout();
                        handleNavLinkClick();
                      }}
                      className="btn border-0 text-white fw-semibold ms-2 rounded-pill px-4 py-2 logout-btn"
                    >
                      <i className="bi bi-box-arrow-right me-2"></i> Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  {["/", "/signup", "/login", "/about", "/contact"].map(
                    (path, i) => {
                      const labels = [
                        "Home",
                        "Signup",
                        "Login",
                        "About Us",
                        "Contact Us",
                      ];
                      return (
                        <li className="nav-item" key={path}>
                          <Link
                            className={`nav-link fw-medium ${
                              location.pathname === path ? "active-link" : ""
                            }`}
                            to={path}
                            onClick={handleNavLinkClick}
                          >
                            {labels[i]}
                          </Link>
                        </li>
                      );
                    }
                  )}
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <div style={{ marginTop: "55px" }}></div>

      <style>{`
        .nav-hidden { transform: translateY(-100%); }
        .nav-visible { transform: translateY(0); }

        .gradient-logo span {
          background: linear-gradient(90deg, #1e3c72, #2a5298, #00c6ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s infinite linear;
          background-size: 200% auto;
        }
        @keyframes shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        .nav-link {
          position: relative;
          color: #333 !important;
          margin: 0 8px;
          transition: color 0.3s ease;
        }

        .nav-link:hover {
          color: #2a5298 !important;
        }

        .active-link {
          color: #2a5298 !important;
        }

        .logout-btn {
          background: linear-gradient(90deg, #1e3c72, #2a5298);
          transition: all 0.3s ease;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
          font-size: 15px;
        }
        .logout-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(42, 82, 152, 0.35);
        }
      `}</style>
    </>
  );
}

export default Navbar;
