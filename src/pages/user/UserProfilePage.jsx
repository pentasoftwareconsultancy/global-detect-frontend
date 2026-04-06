import React, { useState } from 'react';
import { Mail, Phone, User as UserIcon } from 'lucide-react';

const UserProfilePage = () => {
  const [formData, setFormData] = useState({
    fullName: 'Sarah Johnson',
    email: 'sarah@email.com',
    phone: '+1-555-0102',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveChanges = () => {
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-[#0b1120] text-white px-4 sm:px-6 md:px-10 lg:px-12 py-6 md:py-10">
      
      <div className="max-w-4xl mx-auto">
        
        {/* TITLE */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-10">
          Profile
        </h1>

        <p className="text-gray-400 mb-6 md:mb-8 text-sm sm:text-base">
          Manage your account information
        </p>

        <div className="bg-[#111827] rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10">

          {/* AVATAR */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 mb-8 md:mb-12 pb-8 md:pb-12 border-b border-white/10">

            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-[#D92B3A] to-[#a0202a] rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-2xl sm:text-4xl font-bold text-white">S</span>
            </div>

            <div className="flex-1">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1">
                {formData.fullName}
              </h2>
              <p className="text-gray-400 text-sm">User</p>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="w-full sm:w-auto bg-[#D92B3A] hover:bg-[#b0202a] text-white px-5 sm:px-6 py-2 rounded-xl font-medium transition-all"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          {/* PERSONAL INFO */}
          <div className="mb-8 md:mb-12">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4 md:mb-6">
              Personal information
            </h3>

            <p className="text-gray-400 text-xs sm:text-sm mb-4 md:mb-6">
              Update your personal details
            </p>

            <div className="space-y-5 md:space-y-6">

              {/* NAME + EMAIL */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Full Name
                  </label>

                  <div className="flex items-center gap-3 bg-[#0b1120] border border-white/10 rounded-xl px-4 py-3">
                    <UserIcon size={18} className="text-gray-400" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="flex-1 bg-transparent text-white focus:outline-none disabled:text-gray-400 text-sm sm:text-base"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Email Address
                  </label>

                  <div className="flex items-center gap-3 bg-[#0b1120] border border-white/10 rounded-xl px-4 py-3">
                    <Mail size={18} className="text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="flex-1 bg-transparent text-white focus:outline-none disabled:text-gray-400 text-sm sm:text-base"
                    />
                  </div>
                </div>

              </div>

              {/* PHONE */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Phone Number
                </label>

                <div className="flex items-center gap-3 bg-[#0b1120] border border-white/10 rounded-xl px-4 py-3">
                  <Phone size={18} className="text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="flex-1 bg-transparent text-white focus:outline-none disabled:text-gray-400 text-sm sm:text-base"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* ACCOUNT INFO */}
          <div className="mb-6 md:mb-8 pb-6 md:pb-8 border-b border-white/10">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4 md:mb-6">
              Account information
            </h3>

            <div className="space-y-3 md:space-y-4">

              <div className="flex items-center justify-between p-4 bg-[#0b1120] rounded-xl border border-white/10">
                <div>
                  <p className="text-gray-400 text-xs sm:text-sm">Account ID</p>
                  <p className="text-white font-semibold text-sm sm:text-base">user-2</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-[#0b1120] rounded-xl border border-white/10">
                <div>
                  <p className="text-gray-400 text-xs sm:text-sm">Role</p>
                  <p className="text-white font-semibold text-sm sm:text-base">User</p>
                </div>
              </div>

            </div>
          </div>

          {/* BUTTONS */}
          {isEditing && (
            <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
              <button
                onClick={() => setIsEditing(false)}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 rounded-xl border border-white/20 font-medium hover:bg-white/5 transition-all"
              >
                Cancel
              </button>

              <button
                onClick={handleSaveChanges}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 rounded-xl bg-[#D92B3A] hover:bg-[#b0202a] text-white font-medium transition-all"
              >
                Save Changes
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;