import React, { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Add() {
  const cookies = new Cookies();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [group, setGroup] = useState("");
  const [groupData, setGroupData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const user = cookies.get("user");
  const data = cookies.get("user");
  const userId = data?._id;

  // ✅ Base URL from .env
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    if (!user) window.location.href = "/";
    else getGroup();
  }, []);

  // ✅ Add contact
  async function handelContact(e) {
    e.preventDefault();
    setLoading(true);

    try {
      let result = await fetch(`${BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          mobile,
          address,
          group,
          user_id: userId,
        }),
      });

      if (result.status === 201) {
        await result.json();
        toast.success("Contact added successfully!", {
          autoClose: 2500,
        });
        setTimeout(() => navigate("/show"), 2000);
      } else if (result.status === 400) {
        const errorData = await result.json();
        toast.error(errorData.msg || "Invalid data!", {
        });
      } else {
        toast.error("Something went wrong!", { position: "top-center" });
      }
    } catch (err) {
      toast.error("Network error. Try again!", { position: "top-center" });
    }
    setLoading(false);
  }

  // ✅ Fetch group data
  async function getGroup() {
    try {
      let result = await fetch(`${BASE_URL}/group/get/${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (result.status === 200) {
        const data = await result.json();
        setGroupData(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light ">
      <ToastContainer />
      <div
        className="card shadow-lg p-4 w-100 border-0"
        style={{ maxWidth: "700px", borderRadius: "15px" }}
      >
        <h3 className="text-center mb-4 fw-bold " style={{ color: "#1e3c72" }}>
          Add New Contact
        </h3>

        {error && (
          <div className="alert alert-danger text-center py-2">{error}</div>
        )}

        <form onSubmit={handelContact}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Full Name</label>
              <input
                type="text"
                className="form-control shadow-sm"
                placeholder="Enter full name"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                className="form-control shadow-sm"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Mobile Number</label>
              <input
                type="text"
                className="form-control shadow-sm"
                placeholder="Enter mobile number"
                onChange={(e) => setMobile(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Group</label>
              <select
                className="form-select shadow-sm"
                onChange={(e) => setGroup(e.target.value)}
                required
              >
                <option value="">Select Contact Category 😜</option>
                {groupData.map((group, index) => (
                  <option key={index}>{group.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Address</label>
            <input
              type="text"
              className="form-control shadow-sm"
              placeholder="Enter address"
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn w-100 text-white fw-semibold py-2 mt-3 d-flex align-items-center justify-content-center"
            style={{
              background: "linear-gradient(90deg, #1e3c72 0%, #2a5298 100%)",
              borderRadius: "10px",
              boxShadow: "0 4px 15px rgba(30,60,114,0.3)",
            }}
            disabled={loading}
          >
            {loading ? (
              <>
                <div
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                ></div>
                Saving...
              </>
            ) : (
              "Save Contact"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Add;



