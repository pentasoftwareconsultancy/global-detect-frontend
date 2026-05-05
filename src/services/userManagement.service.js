/**
 * User Management Service
 * Handles all API calls related to admin user management
 * @module services/userManagement
 */

import api from "../core/services/api.service";
import ServerUrl from "../core/constants/serverURL.constant";

const apiService = new api();

export const userManagementService = {
  /**
   * Get user statistics for dashboard cards
   * @returns {Promise} Statistics object with totalUsers, activeUsers, inactiveUsers, blockedUsers
   */
  getUserStats: async () => {
    try {
      return await apiService.apiget(ServerUrl.GET_USER_STATS_API);
    } catch (error) {
      console.error("Error fetching user stats:", error);
      throw error;
    }
  },

  /**
   * Get all users with optional filtering and pagination
   * @param {Object} params - Query parameters
   * @param {string} params.status - Filter by status: 'active', 'inactive', 'blocked'
   * @param {string} params.search - Search by name, email, or phone
   * @param {number} params.page - Page number (default: 1)
   * @param {number} params.limit - Items per page (default: 10)
   * @returns {Promise} Users list with pagination info
   */
  getAllUsers: async ({ status, search, page = 1, limit = 10 } = {}) => {
    try {
      const params = new URLSearchParams();
      if (status) params.append("status", status);
      if (search) params.append("search", search);
      params.append("page", page);
      params.append("limit", limit);

      const endpoint = `${ServerUrl.GET_ALL_USERS_API}?${params.toString()}`;
      return await apiService.apiget(endpoint);
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  /**
   * Get user details by ID
   * @param {string} userId - User UUID
   * @returns {Promise} User details with case statistics
   */
  getUserById: async (userId) => {
    try {
      const endpoint = ServerUrl.GET_USER_BY_ID_API.replace(":id", userId);
      return await apiService.apiget(endpoint);
    } catch (error) {
      console.error(`Error fetching user ${userId}:`, error);
      throw error;
    }
  },

  /**
   * Block a user
   * @param {string} userId - User UUID
   * @param {string} reason - Reason for blocking (optional)
   * @returns {Promise} Success response
   */
  blockUser: async (userId, reason = null) => {
    try {
      const endpoint = ServerUrl.BLOCK_USER_API.replace(":id", userId);
      return await apiService.apipost(endpoint, { reason });
    } catch (error) {
      console.error(`Error blocking user ${userId}:`, error);
      throw error;
    }
  },

  /**
   * Unblock a user
   * @param {string} userId - User UUID
   * @returns {Promise} Success response
   */
  unblockUser: async (userId) => {
    try {
      const endpoint = ServerUrl.UNBLOCK_USER_API.replace(":id", userId);
      return await apiService.apipost(endpoint, {});
    } catch (error) {
      console.error(`Error unblocking user ${userId}:`, error);
      throw error;
    }
  },
};

export default userManagementService;