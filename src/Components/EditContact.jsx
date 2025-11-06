import React, { useEffect, useState, useRef } from "react";
import { Cookies } from "react-cookie";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditContact() {
  const cookies = new Cookies();
  const user = cookies.get("user");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [group, setGroup] = useState("");
  const [groupData, setGroupData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");

  const navigate = useNavigate();
  const { id: paramId } = useParams();

   const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    getContact();
    fetchGroups();
  }, []);

  // 🟩 Fetch existing contact details
  const getContact = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/getById/${paramId}`);
      if (res.status === 200) {
        const data = await res.json();
        setName(data.data.name);
        setEmail(data.data.email);
        setMobile(data.data.mobile);
        setAddress(data.data.address);
        setGroup(data.data.group);
        setId(data.data._id);
      }
    } catch (error) {
      toast.error("Failed to fetch contact details ");
    }
  };

  // 🟨 Fetch group data for dropdown
  const fetchGroups = async () => {
    if (!user) return;
    try {
      const res = await fetch(`${BASE_URL}/group/get/${user._id}`);
      if (res.status === 200) {
        const data = await res.json();
        setGroupData(data.data);
      }
    } catch (error) {
      toast.error("Failed to load groups ");
    }
  };

  // 🟦 Update contact
  const EditContact = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.patch(
       `${BASE_URL}/api/getById/${id}`,
        {
          name,
          email,
          mobile,
          address,
          group,
        }
      );

      if (result.status === 200) {
        toast.success("Contact updated successfully");
        setTimeout(() => navigate("/show"), 1500);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Update failed ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100 p-3"
      style={{
        background: "linear-gradient(120deg, #f0f4ff, #e0e9ff)",
      }}
    >
      <ToastContainer autoClose={2000} theme="colored" />

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="card shadow-lg border-0 w-100"
        style={{
          borderRadius: "20px",
          maxWidth: "600px",
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="card-body p-4 p-md-5">
          <h3 className="text-center mb-4 fw-bold" style={{ color: "#264a8bff" }}>
            Update Contact
          </h3>

          <form onSubmit={EditContact}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control shadow-sm"
                placeholder="Enter name"
                required
                disabled={loading}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control shadow-sm"
                placeholder="Enter email"
                required
                disabled={loading}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Mobile</label>
              <input
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="form-control shadow-sm"
                placeholder="Enter mobile number"
                required
                disabled={loading}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="form-control shadow-sm"
                placeholder="Enter address"
                required
                disabled={loading}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Select Group</label>
              <select
                className="form-select shadow-sm"
                value={group}
                onChange={(e) => setGroup(e.target.value)}
                required
                disabled={loading}
              >
                <option value="">Select Contact Category</option>
                {groupData.map((g, index) => (
                  <option key={index} value={g.name}>
                    {g.name}
                  </option>
                ))}
              </select>
            </div>

            <motion.button
              whileHover={{ scale: !loading ? 1.05 : 1 }}
              whileTap={{ scale: !loading ? 0.95 : 1 }}
              type="submit"
              className="btn w-100 text-white fw-semibold py-2 mt-3"
              disabled={loading}
              style={{
                background: "linear-gradient(90deg, #1e3c72 0%, #2a5298 100%)",
                borderRadius: "10px",
                boxShadow: "0 4px 15px rgba(30,60,114,0.3)",
              }}
            >
              {loading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="d-flex justify-content-center align-items-center"
                >
                  <div
                    className="spinner-border spinner-border-sm text-light me-2"
                    role="status"
                  ></div>
                  Updating...
                </motion.div>
              ) : (
                "Update Contact"
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default EditContact;
