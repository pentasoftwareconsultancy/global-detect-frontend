/**
 * Custom Hook for User Details
 * Handles fetching and managing individual user details
 * @module hooks/useUserDetails
 */

import { useState, useEffect, useCallback } from "react";
import { userManagementService } from "../services/userManagement.service";
import { toast } from "react-toastify";

export const useUserDetails = (userId) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  /**
   * Fetch user details
   */
  const fetchUserDetails = useCallback(async () => {
    if (!userId) return;

    setLoading(true);
    setError(null);
    try {
      const response = await userManagementService.getUserById(userId);
      if (response?.data?.success) {
        setUser(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching user details:", err);
      setError(err.response?.data?.message || "Failed to fetch user details");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  /**
   * Block user
   */
  const blockUser = useCallback(
    async (reason = null) => {
      if (!userId) return false;

      setActionLoading(true);
      try {
        const response = await userManagementService.blockUser(userId, reason);
        if (response?.data?.success) {
          toast.success(response.data.message || "User blocked successfully");
          // Refresh user details
          await fetchUserDetails();
          return true;
        }
      } catch (err) {
        console.error("Error blocking user:", err);
        toast.error(err.response?.data?.message || "Failed to block user");
        return false;
      } finally {
        setActionLoading(false);
      }
    },
    [userId, fetchUserDetails]
  );

  /**
   * Unblock user
   */
  const unblockUser = useCallback(async () => {
    if (!userId) return false;

    setActionLoading(true);
    try {
      const response = await userManagementService.unblockUser(userId);
      if (response?.data?.success) {
        toast.success(response.data.message || "User unblocked successfully");
        // Refresh user details
        await fetchUserDetails();
        return true;
      }
    } catch (err) {
      console.error("Error unblocking user:", err);
      toast.error(err.response?.data?.message || "Failed to unblock user");
      return false;
    } finally {
      setActionLoading(false);
    }
  }, [userId, fetchUserDetails]);

  /**
   * Refresh user details
   */
  const refresh = useCallback(async () => {
    await fetchUserDetails();
  }, [fetchUserDetails]);

  // Fetch user details on mount or when userId changes
  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  return {
    user,
    loading,
    error,
    actionLoading,
    blockUser,
    unblockUser,
    refresh,
  };
};

export default useUserDetails;