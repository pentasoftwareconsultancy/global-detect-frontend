import ApiInterceptor from './interceptor.service';
import ServerUrl from '../constants/serverURL.constant';

const DETECTIVE_DASHBOARD_BASE_URL = `${ServerUrl.REACT_APP_API_URL}/detective/dashboard`;

/**
 * Get detective dashboard statistics
 */
export const getDashboardStats = async () => {
  try {
    const response = await ApiInterceptor.init().get(`${DETECTIVE_DASHBOARD_BASE_URL}/stats`);
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw error;
  }
};

/**
 * Get assigned cases for detective
 */
export const getAssignedCases = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    
    if (filters.status) params.append('status', filters.status);
    if (filters.priority) params.append('priority', filters.priority);
    if (filters.search) params.append('search', filters.search);
    if (filters.page) params.append('page', filters.page);
    if (filters.limit) params.append('limit', filters.limit);
    
    const response = await ApiInterceptor.init().get(
      `${DETECTIVE_DASHBOARD_BASE_URL}/assigned-cases?${params.toString()}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching assigned cases:', error);
    throw error;
  }
};

/**
 * Get case details for detective
 */
export const getCaseDetails = async (caseId) => {
  try {
    const response = await ApiInterceptor.init().get(`${DETECTIVE_DASHBOARD_BASE_URL}/cases/${caseId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching case details:', error);
    throw error;
  }
};

/**
 * Submit investigation insights
 */
export const submitInsights = async (caseId, insights) => {
  try {
    const response = await ApiInterceptor.init().post(
      `${DETECTIVE_DASHBOARD_BASE_URL}/cases/${caseId}/insights`,
      { insights }
    );
    return response.data;
  } catch (error) {
    console.error('Error submitting insights:', error);
    throw error;
  }
};

/**
 * Update case status
 */
export const updateCaseStatus = async (caseId, status) => {
  try {
    const response = await ApiInterceptor.init().patch(
      `${DETECTIVE_DASHBOARD_BASE_URL}/cases/${caseId}/status`,
      { status }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating case status:', error);
    throw error;
  }
};
