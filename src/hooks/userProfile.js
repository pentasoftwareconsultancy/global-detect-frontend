/**
 * Custom Hook for Profile Management
 * Handles fetching and updating user profile
 * @module hooks/useProfile
 */

import { useState, useEffect, useCallback } from "react";
import { authService } from "../core/services/auth.service";
import { toast } from "react-toastify";

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);

  /**
   * Fetch profile data
   */
  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.getProfile();
      if (response?.data?.success) {
        setProfile(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError(err.response?.data?.message || "Failed to fetch profile");
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Update profile data
   */
  const updateProfile = useCallback(
    async (profileData) => {
      setUpdating(true);
      try {
        const response = await authService.updateProfile(profileData);
        if (response?.data?.success) {
          toast.success(response.data.message || "Profile updated successfully");
          setProfile(response.data.data);
          return true;
        }
      } catch (err) {
        console.error("Error updating profile:", err);
        toast.error(err.response?.data?.message || "Failed to update profile");
        return false;
      } finally {
        setUpdating(false);
      }
    },
    []
  );

  /**
   * Refresh profile data
   */
  const refresh = useCallback(async () => {
    await fetchProfile();
  }, [fetchProfile]);

  // Fetch profile on mount
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return {
    profile,
    loading,
    error,
    updating,
    updateProfile,
    refresh,
  };
};

export default useProfile;