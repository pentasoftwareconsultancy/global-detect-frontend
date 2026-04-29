import axios from "axios";
import { APPLICATION_CONSTANTS } from "../constants/app.constant";
import StorageService from "./storage.service";
import ServerUrl from "../constants/serverURL.constant";

class ApiInterceptor {
  static axiosReference = axios.create({
    baseURL: ServerUrl.REACT_APP_API_URL,
  });

  static requestCounts = 0;
  static interceptorsRegistered = false;

  static init() {
    // Only register interceptors once — prevents stacking on repeated calls
    if (!ApiInterceptor.interceptorsRegistered) {
      ApiInterceptor.interceptorsRegistered = true;

      ApiInterceptor.axiosReference.interceptors.request.use((config) => {
        ApiInterceptor.requestCounts++;
        // Merge auth header without overwriting existing custom headers
        const authHeader = this.generateHeader();
        config.headers = {
          ...authHeader,
          ...config.headers, // custom headers (like x-session-id) take precedence
        };
        return config;
      });

      ApiInterceptor.axiosReference.interceptors.response.use(
        (response) => {
          ApiInterceptor.requestCounts--;
          return response;
        },
        (error) => {
          ApiInterceptor.requestCounts--;
          return Promise.reject(error);
        }
      );
    }

    return ApiInterceptor.axiosReference;
  }

  static generateHeader() {
    const storedUser = localStorage.getItem("user");
    
    if (!storedUser) {
      // console.log("No user found in localStorage");
      return {};
    }
  
    const user = JSON.parse(storedUser);
  
    if (!user.token) {
      // console.log("No token found inside user object");
      return {};
    }
  
    // console.log("TOKEN FOUND:", user.token);
  
    return {
      Authorization: `Bearer ${user.token}`,
    };
  }
}

export default ApiInterceptor;