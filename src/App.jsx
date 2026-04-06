import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./core/contexts/AuthContext";
import ScrollToTop from "./pages/ScrollToTop";
import './App.css'
import Footer from "./components/public/Footer";

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AppRoutes/>
        
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
