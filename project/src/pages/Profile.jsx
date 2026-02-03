import React, { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Edit2,
  Save,
  X,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  // Load current user from localStorage
  const [userData, setUserData] = useState(() => {
    const storedUser = localStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const navigate = useNavigate();
  if (!userData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-gray-600">Please login first</p>
      </div>
    );
  }

  const [isEditing, setIsEditing] = useState(false);

  const [editData, setEditData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleEditClick = () => {
    setEditData({
      fullname: userData.fullname,
      email: userData.email,
      password: userData.password,
    });
    setIsEditing(true);
    setError("");
    setSuccess("");
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData({
      fullname: "",
      email: "",
      password: "",
    });
    setError("");
    setSuccess("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!editData.fullname.trim()) {
      setError("Full name is required");
      return false;
    }

    if (!editData.email.trim()) {
      setError("Email is required");
      return false;
    }

    if (!editData.password) {
      setError("Password is required");
      return false;
    }

    if (editData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return false;
    }

    return true;
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) return;

    setLoading(true);

    setTimeout(() => {
      try {
        const users = JSON.parse(localStorage.getItem("users")) || [];

        const updatedUsers = users.map((user) =>
          user.email === userData.email
            ? {
                ...user,
                fullname: editData.fullname,
                password: editData.password,
              }
            : user,
        );

        localStorage.setItem("users", JSON.stringify(updatedUsers));

        const updatedUser = {
          ...userData,
          fullname: editData.fullname,
          password: editData.password,
        };

        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
        setUserData(updatedUser);

        setIsEditing(false);
        setSuccess("Profile updated successfully!");
      } catch (err) {
        setError("Something went wrong while updating profile");
      } finally {
        setLoading(false);
        setTimeout(() => setSuccess(""), 3000);
      }
    }, 1200);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("currentUser");
      navigate("/login");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
            <p className="mt-1 text-sm text-gray-500">
              View and manage your account details
            </p>
          </div>

          {!isEditing ? (
            <button
              onClick={handleEditClick}
              className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              <Edit2 size={16} />
              Edit Profile
            </button>
          ) : (
            <button
              onClick={handleCancelEdit}
              className="flex items-center gap-2 rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-300"
            >
              <X size={16} />
              Cancel
            </button>
          )}
        </div>

        {success && (
          <div className="mb-6 rounded-lg bg-green-50 px-4 py-3 border border-green-200">
            <p className="text-sm text-green-600 text-center font-medium">
              {success}
            </p>
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 border border-red-200">
            <p className="text-sm text-red-600 text-center">{error}</p>
          </div>
        )}

        {!isEditing ? (
          <div className="space-y-6">
            <div className="flex flex-col gap-2 rounded-lg bg-gray-50 p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                <User size={16} className="text-gray-400" />
                <span>Full Name</span>
              </div>
              <p className="text-lg font-semibold text-gray-800 pl-6">
                {userData.fullname}
              </p>
            </div>

            <div className="flex flex-col gap-2 rounded-lg bg-gray-50 p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                <Mail size={16} className="text-gray-400" />
                <span>Email Address</span>
              </div>
              <p className="text-lg font-semibold text-gray-800 pl-6">
                {userData.email}
              </p>
            </div>

            <div className="flex flex-col gap-2 rounded-lg bg-gray-50 p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                <Lock size={16} className="text-gray-400" />
                <span>Password</span>
              </div>
              <p className="text-lg font-semibold text-gray-800 pl-6">
                ********
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700 active:scale-[0.98]"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        ) : (
          <form onSubmit={handleSaveChanges} className="space-y-4">
            <div className="flex flex-col">
              <label
                htmlFor="fullname"
                className="mb-2 text-sm font-medium text-gray-700"
              >
                Full Name
              </label>

              <div className="relative w-full">
                <User
                  size={18}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  value={editData.fullname}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="mb-2 text-sm font-medium text-gray-700"
              >
                Email Address
              </label>

              <div className="relative w-full">
                <Mail
                  size={18}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  id="email"
                  name="email"
                  value={editData.email}
                  disabled
                  placeholder="Enter your email"
                  className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-600"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="mb-2 text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <div className="relative w-full">
                <Lock
                  size={18}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={editData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-10 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 py-3 text-sm font-semibold text-white transition hover:bg-green-700 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save size={16} />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
