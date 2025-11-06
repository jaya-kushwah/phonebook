import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { IoSearch } from "react-icons/io5";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import "bootstrap/dist/css/bootstrap.min.css";

function Show() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const cookies = new Cookies();
  const user = cookies.get("user");
  const navigate = useNavigate();

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    handleShow();
  }, []);

  async function handleShow() {
    if (!user?._id) return;
    let result = await fetch(`${BASE_URL}/api/get/${user._id}`);
    if (result.status === 200) {
      result = await result.json();
      setData(result.data);
    }
  }

  const handleClick = () => navigate("/add");

  async function deleteContact(id) {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      let result = await fetch(`${BASE_URL}/api/get/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (result.status === 200) handleShow();
    }
  }

  useEffect(() => {
    const filtered = data.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase()) ||
        item.mobile.toString().includes(search) ||
        item.address.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filtered);
  }, [search, data]);

  return (
    <div
      className="container-fluid py-5"
      style={{
        background: "linear-gradient(120deg, #eef2ff 0%, #f9f9ff 100%)",
      }}
    >
      {/* Header */}
      <div
        className="card shadow-lg border-0 mb-4 mx-auto"
        style={{
          borderRadius: "18px",
          maxWidth: "1150px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          boxShadow: "0 8px 25px rgba(0,0,0,0.12)",
        }}
      >
        <div className="card-body d-flex flex-column flex-md-row justify-content-between align-items-center">
          <h4 className="fw-bold mb-3 mb-md-0">
             Hello,{" "}
            <span
              style={{
                color: "#ffda79",
                textTransform: "capitalize",
              }}
            >
              {user?.name || "User"}
            </span>
          </h4>

          <div
            className="d-flex align-items-center bg-white rounded-pill px-3 py-1 shadow-sm"
            style={{ maxWidth: "400px", width: "100%" }}
          >
            <IoSearch size={22} className="text-secondary me-2" />
            <input
              type="text"
              className="form-control border-0 bg-transparent"
              placeholder="Search contacts..."
              style={{ boxShadow: "none", fontWeight: "500" }}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button
            className="btn btn-light fw-semibold ms-md-3 mt-3 mt-md-0"
            style={{
              borderRadius: "30px",
              padding: "10px 25px",
              transition: "0.3s",
              color: "#5a3fdd",
              fontWeight: "600",
            }}
            onClick={handleClick}
          >
            ➕ Add Contact
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div
        className="card shadow-lg border-0 mx-auto"
        style={{
          maxWidth: "1150px",
          borderRadius: "18px",
          backgroundColor: "white",
        }}
      >
        <div
          className="card-header fw-bold text-white text-center"
          style={{
            background: "linear-gradient(90deg, #667eea, #764ba2)",
            borderTopLeftRadius: "18px",
            borderTopRightRadius: "18px",
            fontSize: "1.1rem",
            letterSpacing: "0.3px",
          }}
        >
          Contact Directory
        </div>

        <div className="card-body p-0">
          <div className="table-responsive">
            {filteredData.length === 0 ? (
              <div className="text-center py-5">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4076/4076500.png"
                  alt="No Contacts"
                  width="180"
                  className="mb-3 opacity-75"
                />
                <h5 className="text-muted fw-semibold mb-2">
                  No Contacts Found 🙁
                </h5>
                <p className="text-secondary">
                  Add your first contact to get started!
                </p>
                <button
                  className="btn btn-primary rounded-pill px-4 mt-2"
                  style={{
                    background: "linear-gradient(90deg, #667eea, #764ba2)",
                    border: "none",
                  }}
                  onClick={handleClick}
                >
                  ➕ Add New Contact
                </button>
              </div>
            ) : (
              <table className="table table-hover align-middle text-center mb-0">
                <thead
                  style={{
                    backgroundColor: "#f6f7fb",
                    fontWeight: "600",
                    fontSize: "0.95rem",
                    color: "#555",
                  }}
                >
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Address</th>
                    <th>Group</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td className="fw-semibold text-capitalize">
                        {item.name}
                      </td>
                      <td>{item.email}</td>
                      <td>
                        <span className="badgetext-dark border-0 px-3 py-2">
                          {item.mobile}
                        </span>
                      </td>
                      <td>{item.address}</td>
                      <td>{item.group}</td>
                      <td>
                        <Link
                          to={`/edit/${item._id}`}
                          className="btn btn-sm btn-outline-primary me-2"
                          style={{
                            borderRadius: "8px",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          <BiEdit size={16} />
                        </Link>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          style={{
                            borderRadius: "8px",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "5px",
                          }}
                          onClick={() => deleteContact(item._id)}
                        >
                          <RiDeleteBin6Line size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Show;

