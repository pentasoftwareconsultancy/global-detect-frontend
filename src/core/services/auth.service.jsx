import api from "./api.service";
import ApiInterceptor from "./interceptor.service";
import ServerUrl from "../constants/serverURL.constant";

const apiService = new api();

export const authService = {
// ========== REGISTRATION FLOWS ==========
  
    // Step 1: Send OTP for Registration
    registerSendOtp: async (userData) => {
      return apiService.apipost(ServerUrl.REGISTER_API, {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        AadharCard_number: userData.aadharCard || userData.aadharNumber,
        city: userData.city,
        password: userData.password,
        confirmPassword: userData.confirmPassword,
        role: userData.role || 'user',
      });
    },

    // Step 2: Verify OTP for Registration
    registerVerifyOtp: async (phone, otp) => {
      return apiService.apipost(ServerUrl.REGISTER_API, {
        phone,
        otp,
      });
    },

// ========== LOGIN FLOWS ==========
  
    // Case 1: Login with Email + Password
    loginWithEmail: async (email, password, role) => {
      return apiService.apipost(ServerUrl.LOGIN_API, {
        email,
        password,
        role,  // Pass role to backend for validation
      });
    },

    // Case 2: Send OTP for Phone-based Login
    loginSendOtp: async (phone, role) => {
      return apiService.apipost(ServerUrl.LOGIN_API, {
        phone,
        role,  // Pass role to backend for validation
      });
    },

    // Case 3: Verify OTP for Phone-based Login
    loginVerifyOtp: async (phone, otp) => {
      return apiService.apipost(ServerUrl.LOGIN_API, {
        phone,
        otp,
      });
    },

    // Logout - Clear token and set user offline
    logout: async () => {
      try {
        // Call backend to set is_online = false
        await apiService.apipost(ServerUrl.LOGOUT_API, {});
      } catch (error) {
        console.error('Logout API error:', error);
        // Continue with local cleanup even if API fails
      } finally {
        // Clear local storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        // Clear session ID if exists
        localStorage.removeItem('sessionId');
      }
    },

// ========== PUBLIC FLOWS ==========
  
  //------------------- blogs related APIs -------------------

    getPublishedBlogs: async () => {
      return apiService.apiget(ServerUrl.GET_PUBLISHED_BLOGS_API);
    },

    getBlogById: async (blogId) => {
      const endpoint = ServerUrl.GET_BLOG_BY_ID_API.replace(':id', blogId);
      return apiService.apiget(endpoint);
    },

  //---------------request form related APIs------------------
  
    createDraftRequestForm: async (formData) => {
      const sessionId = localStorage.getItem('sessionId');
      const axiosInstance = ApiInterceptor.init();
      return axiosInstance.post(ServerUrl.DRAFT_REQUEST_FORM_API, formData, {
        headers: sessionId ? { 'x-session-id': sessionId } : {},
      });
    },

    // Update Draft
    updateDraftRequestForm: async (formId, formData) => {
      const endpoint = ServerUrl.DRAFT_UPDATE_REQUEST_FORM_API.replace(':formId', formId);
      return apiService.apiput(endpoint, formData);
    },

    // Get Guest Form
    getGuestForm: async () => {
      return apiService.apiget(ServerUrl.GET_GUEST_FORM_API);
    },

    // Get Form By ID
    getFormById: async (formId) => {
      const endpoint =ServerUrl.GET_FORM_API.replace( ':formId', formId);
      return apiService.apiget(endpoint);
    },

    // Upload Evidence
    uploadEvidence: async (formId, evidenceData) => {
      const endpoint =ServerUrl.UPLOAD_EVIDENCE_API.replace(':formId', formId);
      return apiService.apipost(endpoint, evidenceData);
    },

// ========== USER FLOWS ==========

  // ---------------------- PROFILE -----------------------
  
    // Get current user profile (requires auth token)
    getProfile: async () => {
      return apiService.apiget(ServerUrl.GET_PROFILE_API);
    },

    updateProfile: async (profileData) => {
      return apiService.apiput(ServerUrl.GET_PROFILE_API, profileData);
    },

    deleteProfile: async () => {
      return apiService.apidelete(ServerUrl.GET_PROFILE_API);
    },

  // ---------------------- REQUEST FORMS -----------------------

    submitRequestFormById: async (formId) => {
      const endpoint = ServerUrl.SUBMIT_REQUEST_FORM_BYID_API.replace(':formId', formId);
      return apiService.apipost(endpoint);
    },

    deleteDraftRequestForm: async (formId) => {
      const endpoint = ServerUrl.DELETE_DRAFT_REQUEST_FORM_API.replace(':formId', formId);
      return apiService.apidelete(endpoint);
    },

    linkGuestForm: async (formId) => {
      const endpoint = ServerUrl.LINK_GUEST_FORM_API.replace(':formId', formId);
      return apiService.apipost(endpoint);
    },

    linkAllGuestForms: async () => {
      const sessionId = localStorage.getItem('sessionId');
      const axiosInstance = ApiInterceptor.init();
      return axiosInstance.post(ServerUrl.LINK_ALL_GUEST_FORMS_API, {}, {
        headers: sessionId ? { 'x-session-id': sessionId } : {},
      });
    },

    getMyForms: async () => {
      return apiService.apiget(ServerUrl.GET_MY_FORMS_API);
    },

    createRequestForm: async (formData) => {
      return apiService.apipost(ServerUrl.CREATE_REQUEST_FORM_API, formData);
    },

  // ---------------------- CASES -----------------------

    getMyCases: async () => {
      return apiService.apiget(ServerUrl.GET_MY_CASES_API);
    },

    getMyCasesFiltered: async ({ status, page = 1, limit = 10 } = {}) => {
      const params = new URLSearchParams();
      if (status) params.append('status', status);
      params.append('page', page);
      params.append('limit', limit);
      return apiService.apiget(`${ServerUrl.GET_MY_CASES_API}?${params.toString()}`);
    },

    getCaseStats: async () => {
      return apiService.apiget(ServerUrl.GET_CASE_STATS_API);
    },

    getCaseDetails: async (caseId) => {
      const endpoint = ServerUrl.GET_CASE_DETAILS_API.replace(':caseId', caseId);
      return apiService.apiget(endpoint);
    },

// ========== DETECTIVE FLOWS ==========

  // ---------------------- KYC -----------------------
  
    createDetectiveKYC: async (kycData) => {
      return apiService.apipost(ServerUrl.SUBMIT_KYC_API, kycData);
    },

    getMyKYCStatus: async () => {
      return apiService.apiget(ServerUrl.GET_MY_KYC_API);
    },

// ========== ADMIN FLOWS ==========

  // ----------------------- KYC applications -----------------------
  
    getAllKYCApplications: async () => {
      return apiService.apiget(ServerUrl.GET_ALL_KYC_API);
    },

    updateKYCStatus: async (applicationId, statusData) => {
      const endpoint = ServerUrl.UPDATE_KYC_STATUS_API.replace(':id', applicationId);
      return apiService.apipatch(endpoint, statusData);
    },

    getKYCApplicationById: async (applicationId) => {
      const endpoint = ServerUrl.GET_KYC_APPLICATION_API.replace(':id', applicationId);
      return apiService.apiget(endpoint);
    },

    getKYCApplicationByUserId: async (userId) => {
      const endpoint = ServerUrl.GET_KYC_BY_USER_API.replace(':userId', userId);
      return apiService.apiget(endpoint);
    },

  // ----------------------- Blogs -----------------------

    uploadBlogImage: async (imageFile) => {
      const formData = new FormData();
      formData.append('image', imageFile);
      const axiosInstance = ApiInterceptor.init();
      return axiosInstance.post(ServerUrl.UPLOAD_BLOG_IMAGE_API, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },

    createBlog: async (blogData) => {
      return apiService.apipost(ServerUrl.CREATE_BLOG_API, blogData);
    },
  
    getAllBlogsAdmin: async ({ page = 1, limit = 10, status = 'all', search = '', sort = 'newest' } = {}) => {
      const params = new URLSearchParams({ page, limit, status, sort });
      if (search) params.append('search', search);
      return apiService.apiget(`${ServerUrl.GET_ALL_BLOGS_API}?${params.toString()}`);
    },

    getBlogStats: async () => {
      return apiService.apiget(ServerUrl.GET_BLOG_STATS_API);
    },
  
    getBlogByIdAdmin: async (blogId) => {
      const endpoint = ServerUrl.GET_BLOG_BY_ID_ADMIN_API.replace(':id', blogId);
      return apiService.apiget(endpoint);
    },
  
    getBlogsByStatus: async (status) => {
      const endpoint = ServerUrl.GET_BLOG_BY_STATUS_API + `?status=${status}`;
      return apiService.apiget(endpoint);
    },
  
    updateBlog: async (blogId, blogData) => {
      const endpoint = ServerUrl.UPDATE_BLOG_API.replace(':id', blogId);
      return apiService.apiput(endpoint, blogData);
    },
  
    deleteBlog: async (blogId) => {
      const endpoint = ServerUrl.DELETE_BLOG_API.replace(':id', blogId);
      return apiService.apidelete(endpoint);
    },

  // ----------------------- Admin Detective Management -----------------------

    getDetectiveStats: async () => {
      return apiService.apiget(ServerUrl.GET_DETECTIVE_STATS_API);
    },

    getAllDetectives: async ({ page = 1, limit = 10, status = '', kycStatus = '', search = '' } = {}) => {
      const params = new URLSearchParams({ page, limit });
      if (status)    params.append('status',    status);
      if (kycStatus) params.append('kycStatus', kycStatus);
      if (search)    params.append('search',    search);
      return apiService.apiget(`${ServerUrl.GET_ALL_DETECTIVES_API}?${params.toString()}`);
    },

    getDetectiveById: async (detectiveId) => {
      const endpoint = ServerUrl.GET_DETECTIVE_BY_ID_API.replace(':id', detectiveId);
      return apiService.apiget(endpoint);
    },
};

// total 32 apis