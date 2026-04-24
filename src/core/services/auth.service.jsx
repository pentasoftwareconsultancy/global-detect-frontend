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

  // ========== PROFILE ==========
  
  // Get current user profile (requires auth token)
  getProfile: async () => {
    return apiService.apiget(ServerUrl.GET_PROFILE_API);
  },
};

