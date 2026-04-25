import api from "./api.service";
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
    loginWithEmail: async (email, password) => {
      return apiService.apipost(ServerUrl.LOGIN_API, {
        email,
        password,
      });
    },

    // Case 2: Send OTP for Phone-based Login
    loginSendOtp: async (phone) => {
      return apiService.apipost(ServerUrl.LOGIN_API, {
        phone,
      });
    },

    // Case 3: Verify OTP for Phone-based Login
    loginVerifyOtp: async (phone, otp) => {
      return apiService.apipost(ServerUrl.LOGIN_API, {
        phone,
        otp,
      });
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
      return apiService.apipost(ServerUrl.DRAFT_REQUEST_FORM_API, formData);
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
      return apiService.apipost(ServerUrl.LINK_ALL_GUEST_FORMS_API);
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
      return apiService.apiput(endpoint, statusData);
    },

    getKYCApplicationById: async (applicationId) => {
      const endpoint = ServerUrl.GET_KYC_APPLICATION_API.replace(':id', applicationId);
      return apiService.apiget(endpoint);
    },

  // ----------------------- Blogs -----------------------

    createBlog: async (blogData) => {
      return apiService.apipost(ServerUrl.CREATE_BLOG_API, blogData);
    },
  
    getAllBlogsAdmin: async () => {
      return apiService.apiget(ServerUrl.GET_ALL_BLOGS_API);
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
      const endpoint = ServerUrl.CREATE_BLOG_API + `/${blogId}`;
      return apiService.apiput(endpoint, blogData);
    },
  
    deleteBlog: async (blogId) => {
      const endpoint = ServerUrl.CREATE_BLOG_API + `/${blogId}`;
      return apiService.apidelete(endpoint);
    },
};

// total 32 apis