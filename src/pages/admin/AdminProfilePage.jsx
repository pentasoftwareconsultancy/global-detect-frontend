import React, { useState, useEffect } from "react";
import { FiUser, FiMail, FiSave, FiLoader } from "react-icons/fi";
import { useProfile } from "../../hooks/useProfile";

const AdminProfilePage = () => {
  const { profile, loading, error, updating, updateProfile } = useProfile();

  const [formData, setFormData] = useState({ name: "", email: "" });
  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData({ name: profile.name || "", email: profile.email || "" });
    }
  }, [profile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsEdited(true);
  };

  const handleSaveChanges = async () => {
    if (!isEdited) return;
    const success = await updateProfile(formData);
    if (success) setIsEdited(false);
  };

  const getInitial = () => {
    if (!profile?.name) return "A";
    return profile.name.charAt(0).toUpperCase();
  };

  if (loading) {
    return (
      <div className="p-6 text-white montserrat flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <FiLoader className="animate-spin text-4xl text-red" />
          <p className="text-lightGray">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-white montserrat">
        <div className="bg-red/10 border border-red/30 rounded-xl p-4 text-center">
          <p className="text-red">{error}</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="p-6 text-white montserrat">
        <div className="bg-[#0E1F2B] rounded-xl p-4 text-center">
          <p className="text-lightGray">No profile data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 text-white montserrat bg-[#121F27] min-h-screen">

      {/* HEADER */}
      <h2 className="text-xl sm:text-2xl font-semibold mb-1">Profile</h2>
      <p className="text-lightGray text-xs sm:text-sm mb-6">Manage your account information</p>

      {/* PROFILE CARD */}
      <div className="bg-[#1A2832] p-4 sm:p-5 rounded-xl mb-5 flex items-center gap-4 border border-gray/20">
        <div className="w-12 h-12 rounded-full bg-[#FF4959] flex items-center justify-center text-lg font-semibold flex-shrink-0">
          {getInitial()}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium truncate">{profile.name}</p>
          <p className="text-xs lightGray truncate">{profile.email}</p>
          <span className="text-[10px] px-2 py-1 bg-[#2D3E4D] rounded mt-1 inline-block">
            {profile.role}
          </span>
        </div>
      </div>

      {/* PERSONAL INFO */}
      <div className="bg-[#1A2832] p-4 sm:p-5 rounded-xl mb-5 border border-gray/20">
        <h3 className="text-sm mb-1">Personal Information</h3>
        <p className="text-xs lightGray mb-4">Update your personal details</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs white">Full Name</label>
            <div className="flex items-center gap-2 bg-[#1A2832] px-3 py-2 rounded-lg mt-1 border border-gray/30">
              <FiUser className="text-lightGray flex-shrink-0" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="bg-transparent outline-none text-sm w-full"
                placeholder="Enter your name"
              />
            </div>
          </div>
          <div>
            <label className="text-xs white">Email Address</label>
            <div className="flex items-center gap-2 bg-[#1A2832] px-3 py-2 rounded-lg mt-1 border border-gray/30">
              <FiMail className="text-lightGray flex-shrink-0" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="bg-transparent outline-none text-sm w-full"
                placeholder="Enter your email"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={handleSaveChanges}
            disabled={!isEdited || updating}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition ${
              !isEdited || updating
                ? "bg-gray/30 text-lightGray cursor-not-allowed"
                : "bg-red hover:bg-red/80"
            }`}
          >
            {updating ? (
              <><FiLoader className="animate-spin" /> Saving...</>
            ) : (
              <><FiSave /> Save Changes</>
            )}
          </button>
        </div>
      </div>

      {/* ACCOUNT INFO */}
      <div className="bg-[#1A2832] p-4 sm:p-5 rounded-xl border border-gray/20">
        <h3 className="text-sm mb-4">Account Information</h3>
        <div className="flex flex-col sm:flex-row sm:justify-between border-t border-gray/20 py-3 text-sm gap-1">
          <span className="lightGray flex-shrink-0">Account ID</span>
          <span className="break-all sm:text-right">{profile.account_id ?? profile.id}</span>
        </div>
        <div className="flex justify-between border-t border-gray/20 py-3 text-sm">
          <span className="lightGray">Role</span>
          <span>{profile.role}</span>
        </div>
      </div>

    </div>
  );
};

export default AdminProfilePage;
