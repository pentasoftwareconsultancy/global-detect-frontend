
import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../services/auth.service";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved user on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Login
  const login = (data) => {
    // console.log("LOGIN DATA IN CONTEXT:", data);

    // Extract token (works for all backend formats)
    const token =
      data.token ||
      data?.data?.token ||
      data?.accessToken ||
      data?.jwt ||
      null;

    // Extract user
    const userObj =
      data.user ||
      data?.data?.user ||
      data?.data ||
      null;

    // Get role from stored accountType or from user object
    const storedAccountType = localStorage.getItem('accountType');
    const role = userObj?.role || storedAccountType;

    if (!token) {
      console.error("❌ NO TOKEN RECEIVED FROM BACKEND");
    }

    // Determine kyc status: backends may provide it, otherwise default
    const kycComplete =
      userObj?.kycComplete ?? data?.kycComplete ?? (role === 'detective' ? false : true);

    const userData = {
      role: role,
      token: token,
      kycComplete,
    };

    // console.log("SAVING USER TO LS:", userData);

    localStorage.setItem("user", JSON.stringify(userData));

    // save token separately (important!)
    localStorage.setItem("TOKEN", token);

    setUser(userData);
  };

  // mark kyc complete (persists to localStorage & context)
  const setKycComplete = (value) => {
    const updated = { ...(user || {}), kycComplete: !!value };
    localStorage.setItem('user', JSON.stringify(updated));
    setUser(updated);
  };


  const logout = async () => {
    try {
      // Call backend to set is_online = false
      await authService.logout();
      
      // Reset auth state
      setUser(null);

    } catch (error) {
      console.error("Logout failed:", error);
      // Even if API fails, clear local data
      localStorage.removeItem("user");
      localStorage.removeItem("TOKEN");
      setUser(null);
    }
  };

  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, isLoading, login, logout, setKycComplete }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

