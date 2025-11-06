import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";

function AddGroup() {
  const [name, setName] = useState("");
  const [group, setGroup] = useState([]);
  const [index, setIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(null);

  const cookies = new Cookies();

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    handleShow();
  }, []);

  // ✅ Fetch all groups
  async function handleShow() {
    const user = cookies.get("user");
    if (user) {
      setLoading(true);
      try {
        let result = await fetch(`${BASE_URL}/group/get/${user._id}`);
        if (result.status === 200) {
          result = await result.json();
          setGroup(result.data);
        }
      } catch (error) {
        toast.error("Failed to fetch groups!");
      }
      setLoading(false);
    }
  }

  // ✅ Add or Update group
  async function handleAddOrUpdate() {
    const user = cookies.get("user");
    if (!name.trim()) {
      toast.warning("Please enter group name!", { position: "top-center" });
      return;
    }

    setLoading(true);
    try {
      if (index >= 0) {
        // Update existing group
        const response = await axios.patch(
          `${BASE_URL}/group/update/${group[index]._id}`,
          { name: name }
        );
        if (response.status === 200) {
          toast.success("Group updated successfully!");
          setIndex(-1);
          setName("");
          handleShow();
        }
      } else {
        // Add new group
        let result = await fetch(`${BASE_URL}/group/add`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: name, user_id: user._id }),
        });
        if (result.status === 201) {
          toast.success("Group added successfully!");
          setName("");
          handleShow();
        } else {
          toast.error("Failed to add group!");
        }
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
    setLoading(false);
  }

  // ✅ Edit inline (set selected group to input)
  const handleEdit = (item, i) => {
    setIndex(i);
    setName(item.name);
  };

  // ✅ Delete confirmation
  const openDeleteModal = (id) => setDeleteModal(id);

  const confirmDelete = async () => {
    if (!deleteModal) return;
    setLoading(true);
    try {
      let result = await fetch(
        `${BASE_URL}/group/delete/${deleteModal}`,
        { method: "DELETE" }
      );
      if (result.status === 200) {
        toast.success("Group deleted successfully!");
        handleShow();
      } else {
        toast.error("Delete failed!");
      }
    } catch (error) {
      toast.error("Network error!");
    }
    setLoading(false);
    setDeleteModal(null);
  };

  return (
    <div className="container py-5">
      <ToastContainer />

      <div
        className="bg-white shadow-lg rounded-4 p-4 mx-auto"
        style={{ maxWidth: "750px", border: "1px solid #f1f1f1" }}
      >
        <h3 className="text-center mb-4 fw-bold" style={{ color: "#1e3c72" }}>
          <i className="bi bi-people-fill me-2"></i>Manage Your Groups
        </h3>

        {/* Add / Update Group Form */}
        <div className="d-flex mb-4">
          <input
            type="text"
            value={name}
            placeholder="Enter group name"
            className="form-control rounded-start-pill border-primary-subtle shadow-sm"
            onChange={(e) => setName(e.target.value)}
            required
            disabled={loading}
          />
          <button
            className="btn rounded-end-pill px-4 fw-semibold d-flex align-items-center text-white"
            style={{ backgroundColor: "#1e3c72" }}
            onClick={handleAddOrUpdate}
            disabled={loading}
          >
            {loading ? (
              <div
                className="spinner-border spinner-border-sm me-2"
                role="status"
              ></div>
            ) : (
              <i
                className={`bi me-2 ${
                  index >= 0 ? "bi-check-circle" : "bi-plus-circle"
                }`}
              ></i>
            )}
            {index >= 0 ? "Update" : "Add"}
          </button>
        </div>

        {/* Loader */}
        {loading && (
          <div className="text-center mb-3">
            <div className="spinner-border text-primary" role="status"></div>
          </div>
        )}

        {/* Table */}
        <div className="table-responsive">
          <table className="table align-middle text-center table-hover">
            <thead className="table-light border">
              <tr>
                <th>#</th>
                <th>Group Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {group.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-muted py-3">
                    No Groups Found
                  </td>
                </tr>
              ) : (
                group.map((item, i) => (
                  <tr key={item._id}>
                    <td>{i + 1}</td>
                    <td className="fw-semibold text-secondary">{item.name}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => handleEdit(item, i)}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => openDeleteModal(item._id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🗑 Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteModal && (
          <motion.div
            className="modal fade show d-block"
            style={{
              backdropFilter: "blur(6px)",
              backgroundColor: "rgba(0,0,0,0.35)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal-dialog modal-dialog-centered"
              initial={{ scale: 0.6, y: 80, opacity: 0 }}
              animate={{
                scale: 1,
                y: 0,
                opacity: 1,
                transition: { type: "spring", stiffness: 120, damping: 12 },
              }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <motion.div
                className="modal-content rounded-5 shadow-lg border-0 p-4"
                style={{
                  background: "white",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
                }}
              >
                <div className="modal-body text-center">
                  <motion.i
                    className="bi bi-exclamation-triangle-fill text-danger fs-1 mb-3"
                    initial={{ rotate: -180, scale: 0 }}
                    animate={{
                      rotate: 0,
                      scale: 1,
                      transition: {
                        type: "spring",
                        stiffness: 200,
                        damping: 10,
                      },
                    }}
                  ></motion.i>

                  <motion.h5
                    className="fw-bold mb-2 text-black"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    Delete this group?
                  </motion.h5>

                  <motion.p
                    className="opacity-75 mb-4 text-black"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    This action cannot be undone.
                  </motion.p>

                  <div className="d-flex justify-content-center gap-3">
                    <motion.button
                      className="btn btn-light px-4 fw-semibold"
                      style={{ boxShadow: "0 8px 25px rgba(0,0,0,0.25)" }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setDeleteModal(null)}
                    >
                      Cancel
                    </motion.button>

                    <motion.button
                      className="btn px-4 fw-semibold text-white"
                      style={{
                        background:
                          "linear-gradient(135deg, #ff4e50 0%, #f9d423 100%)",
                      }}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 0 15px rgba(255,78,80,0.6)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={confirmDelete}
                    >
                      Delete
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AddGroup;
