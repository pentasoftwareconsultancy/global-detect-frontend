import axios from "axios";
import { APPLICATION_CONSTANTS } from "../constants/app.constant";
import StorageService from "./storage.service";
import ServerUrl from "../constants/serverURL.constant";

class ApiInterceptor {
  static axiosReference = axios.create({
    baseURL: ServerUrl.REACT_APP_API_URL,
  });

  static requestCounts = 0;

  static init() {
    ApiInterceptor.axiosReference.interceptors.request.use((config) => {
      ApiInterceptor.requestCounts++;

      // console.log("Requesting to:", config.baseURL); // Logs actual base URL
      config.headers = {
        ...config.headers,
        ...this.generateHeader(),
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
        // console.log("API ERROR =>", {
        //   url: error.config.url,
        //   method: error.config.method,
        //   status: error.response?.status,
        //   response: error.response?.data,
        //   requestHeaders: error.config.headers,
        //   payload: error.config.data   // <-- add this
        // });
        return Promise.reject(error);
      }
    );

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