import ApiInterceptor from './interceptor.service';
import ServerUrl from '../constants/serverURL.constant';

class AdminCaseService {
  /**
   * Get all cases with filters
   */
  async getAllCases(filters = {}) {
    try {
      const params = new URLSearchParams();
      
      if (filters.status) params.append('status', filters.status);
      if (filters.investigationType) params.append('investigationType', filters.investigationType);
      if (filters.priority) params.append('priority', filters.priority);
      if (filters.search) params.append('search', filters.search);
      if (filters.page) params.append('page', filters.page);
      if (filters.limit) params.append('limit', filters.limit);
      
      const url = `${ServerUrl.GET_ALL_CASES_API}?${params.toString()}`;
      const response = await ApiInterceptor.init().get(url);
      return response.data;
    } catch (error) {
      console.error('getAllCases error:', error);
      throw error;
    }
  }

  /**
   * Get pending cases
   */
  async getPendingCases(page = 1, limit = 10) {
    try {
      const url = `${ServerUrl.GET_PENDING_CASES_API}?page=${page}&limit=${limit}`;
      const response = await ApiInterceptor.init().get(url);
      return response.data;
    } catch (error) {
      console.error('getPendingCases error:', error);
      throw error;
    }
  }

  /**
   * Get cases with insights
   */
  async getCasesWithInsights(page = 1, limit = 10) {
    try {
      const url = `${ServerUrl.GET_CASES_WITH_INSIGHTS_API}?page=${page}&limit=${limit}`;
      const response = await ApiInterceptor.init().get(url);
      return response.data;
    } catch (error) {
      console.error('getCasesWithInsights error:', error);
      throw error;
    }
  }

  /**
   * Get case by ID
   */
  async getCaseById(caseId) {
    try {
      const url = ServerUrl.GET_CASE_BY_ID_API.replace(':id', caseId);
      const response = await ApiInterceptor.init().get(url);
      return response.data;
    } catch (error) {
      console.error('getCaseById error:', error);
      throw error;
    }
  }

  /**
   * Assign detective to case
   */
  async assignDetective(caseId, detectiveId) {
    try {
      const url = ServerUrl.ASSIGN_DETECTIVE_API.replace(':id', caseId);
      const response = await ApiInterceptor.init().patch(url, { detectiveId });
      return response.data;
    } catch (error) {
      console.error('assignDetective error:', error);
      throw error;
    }
  }

  /**
   * Update case priority
   */
  async updateCasePriority(caseId, priority) {
    try {
      const url = ServerUrl.UPDATE_CASE_PRIORITY_API.replace(':id', caseId);
      const response = await ApiInterceptor.init().patch(url, { priority });
      return response.data;
    } catch (error) {
      console.error('updateCasePriority error:', error);
      throw error;
    }
  }

  /**
   * Delete case
   */
  async deleteCase(caseId) {
    try {
      const url = ServerUrl.DELETE_CASE_API.replace(':id', caseId);
      const response = await ApiInterceptor.init().delete(url);
      return response.data;
    } catch (error) {
      console.error('deleteCase error:', error);
      throw error;
    }
  }

  /**
   * Get available detectives for assignment
   */
  async getAvailableDetectives() {
    try {
      const response = await ApiInterceptor.init().get(ServerUrl.GET_AVAILABLE_DETECTIVES_API);
      return response.data;
    } catch (error) {
      console.error('getAvailableDetectives error:', error);
      throw error;
    }
  }

  /**
   * Generate case report
   */
  async generateCaseReport(caseId) {
    try {
      const url = ServerUrl.GENERATE_CASE_REPORT_API.replace(':id', caseId);
      const response = await ApiInterceptor.init().post(url);
      return response.data;
    } catch (error) {
      console.error('generateCaseReport error:', error);
      throw error;
    }
  }

  /**
   * Get case statistics
   */
  async getCaseStatistics() {
    try {
      const response = await ApiInterceptor.init().get(ServerUrl.GET_CASE_STATISTICS_API);
      return response.data;
    } catch (error) {
      console.error('getCaseStatistics error:', error);
      throw error;
    }
  }
}

export default new AdminCaseService();
