/**
 * Custom Hook for User Management
 * Handles user data fetching, filtering, and actions
 * @module hooks/useUserManagement
 */

import { useState, useEffect, useCallback } from "react";
import { userManagementService } from "../services/userManagement.service";
import { toast } from "react-toastify";

export const useUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
    blockedUsers: 0,
  });
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: "",
    search: "",
    page: 1,
    limit: 10,
  });

  /**
   * Fetch user statistics with caching
   */
  const fetchStats = useCallback(async () => {
    // Check cache first (valid for 5 minutes)
    const cachedStats = sessionStorage.getItem('userManagementStats');
    const cacheTimestamp = sessionStorage.getItem('userManagementStats_timestamp');
    
    if (cachedStats && cacheTimestamp) {
      const age = Date.now() - parseInt(cacheTimestamp);
      if (age < 300000) { // 5 minutes
        setStats(JSON.parse(cachedStats));
        return;
      }
    }

    try {
      const response = await userManagementService.getUserStats();
      if (response?.data?.success) {
        const statsData = response.data.data;
        setStats(statsData);
        
        // Cache the stats
        sessionStorage.setItem('userManagementStats', JSON.stringify(statsData));
        sessionStorage.setItem('userManagementStats_timestamp', Date.now().toString());
      }
    } catch (err) {
      console.error("Error fetching stats:", err);
      setError(err.response?.data?.message || "Failed to fetch statistics");
    }
  }, []);

  /**
   * Fetch users with current filters and caching
   */
  const fetchUsers = useCallback(async () => {
    // Generate cache key based on filters
    const cacheKey = `userManagementList_${filters.status}_${filters.search}_${filters.page}`;
    const cachedData = sessionStorage.getItem(cacheKey);
    const cacheTimestamp = sessionStorage.getItem(`${cacheKey}_timestamp`);
    
    if (cachedData && cacheTimestamp) {
      const age = Date.now() - parseInt(cacheTimestamp);
      if (age < 120000) { // 2 minutes
        const parsed = JSON.parse(cachedData);
        setUsers(parsed.users);
        setPagination(parsed.pagination);
        setLoading(false);
        return;
      }
    }

    setLoading(true);
    setError(null);
    try {
      const response = await userManagementService.getAllUsers(filters);
      if (response?.data?.success) {
        const usersData = response.data.data || [];
        const paginationData = response.data.pagination || pagination;
        
        setUsers(usersData);
        setPagination(paginationData);
        
        // Cache the data
        sessionStorage.setItem(cacheKey, JSON.stringify({
          users: usersData,
          pagination: paginationData,
        }));
        sessionStorage.setItem(`${cacheKey}_timestamp`, Date.now().toString());
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setError(err.response?.data?.message || "Failed to fetch users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  /**
   * Update filters and reset to page 1
   */
  const updateFilters = useCallback((newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: newFilters.page !== undefined ? newFilters.page : 1,
    }));
  }, []);

  /**
   * Change page
   */
  const changePage = useCallback((page) => {
    setFilters((prev) => ({ ...prev, page }));
  }, []);

  /**
   * Block a user and clear cache
   */
  const blockUser = useCallback(
    async (userId, reason = null) => {
      try {
        const response = await userManagementService.blockUser(userId, reason);
        if (response?.data?.success) {
          toast.success(response.data.message || "User blocked successfully");
          
          // Clear cache
          const keys = Object.keys(sessionStorage);
          keys.forEach(key => {
            if (key.startsWith('userManagementList_') || key === 'userManagementStats') {
              sessionStorage.removeItem(key);
            }
          });
          
          // Refresh data
          await Promise.all([fetchUsers(), fetchStats()]);
          return true;
        }
      } catch (err) {
        console.error("Error blocking user:", err);
        toast.error(err.response?.data?.message || "Failed to block user");
        return false;
      }
    },
    [fetchUsers, fetchStats]
  );

  /**
   * Unblock a user and clear cache
   */
  const unblockUser = useCallback(
    async (userId) => {
      try {
        const response = await userManagementService.unblockUser(userId);
        if (response?.data?.success) {
          toast.success(response.data.message || "User unblocked successfully");
          
          // Clear cache
          const keys = Object.keys(sessionStorage);
          keys.forEach(key => {
            if (key.startsWith('userManagementList_') || key === 'userManagementStats') {
              sessionStorage.removeItem(key);
            }
          });
          
          // Refresh data
          await Promise.all([fetchUsers(), fetchStats()]);
          return true;
        }
      } catch (err) {
        console.error("Error unblocking user:", err);
        toast.error(err.response?.data?.message || "Failed to unblock user");
        return false;
      }
    },
    [fetchUsers, fetchStats]
  );

  /**
   * Refresh all data
   */
  const refresh = useCallback(async () => {
    await Promise.all([fetchUsers(), fetchStats()]);
  }, [fetchUsers, fetchStats]);

  // Fetch data on mount and when filters change
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Fetch stats on mount
  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    users,
    stats,
    pagination,
    loading,
    error,
    filters,
    updateFilters,
    changePage,
    blockUser,
    unblockUser,
    refresh,
  };
};

export default useUserManagement;