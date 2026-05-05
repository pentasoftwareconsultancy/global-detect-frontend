import ApiInterceptor from './interceptor.service';
import ServerUrl from '../constants/serverURL.constant';

class AdminDashboardService {
  /**
   * Get dashboard statistics
   */
  async getDashboardStatistics() {
    try {
      const response = await ApiInterceptor.init().get(ServerUrl.GET_DASHBOARD_STATISTICS_API);
      return response.data;
    } catch (error) {
      console.error('getDashboardStatistics error:', error);
      throw error;
    }
  }

  /**
   * Get case status overview
   */
  async getCaseStatusOverview() {
    try {
      const response = await ApiInterceptor.init().get(ServerUrl.GET_CASE_STATUS_OVERVIEW_API);
      return response.data;
    } catch (error) {
      console.error('getCaseStatusOverview error:', error);
      throw error;
    }
  }

  /**
   * Get priority cases
   */
  async getPriorityCases() {
    try {
      const response = await ApiInterceptor.init().get(ServerUrl.GET_PRIORITY_CASES_API);
      return response.data;
    } catch (error) {
      console.error('getPriorityCases error:', error);
      throw error;
    }
  }

  /**
   * Get recent activity
   */
  async getRecentActivity() {
    try {
      const response = await ApiInterceptor.init().get(ServerUrl.GET_RECENT_ACTIVITY_API);
      return response.data;
    } catch (error) {
      console.error('getRecentActivity error:', error);
      throw error;
    }
  }
}

export default new AdminDashboardService();
