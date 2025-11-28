"use client";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { fetchUserProfile } from "@/lib/auth-service";
type User = {
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isLoginModalOpen: boolean;
  isSignUpModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  openSignUpModal: () => void;
  closeSignUpModal: () => void;
  loading: boolean; // New state to prevent flicker
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Start loading
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  // --- RESTORE SESSION ON LOAD ---
  useEffect(() => {
  const restoreSession = async () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      // Use the service function instead of manual fetch
      const result = await fetchUserProfile(token);

      if (result.success && result.user) {
         setUser({
           name: result.user.username,
           email: result.user.email
         });
      } else {
         localStorage.removeItem("accessToken");
      }
    }
    setLoading(false);
  };
  restoreSession();
}, []);

  const login = (userData: User) => setUser(userData);
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
    // Optional: Call backend logout to clear HttpOnly cookie if used
    fetch(`${API_BASE_URL}/auth/logout`, { method: "POST" });
  };
  
  const openLoginModal = () => { setIsLoginModalOpen(true); setIsSignUpModalOpen(false); };
  const closeLoginModal = () => setIsLoginModalOpen(false);
  
  const openSignUpModal = () => { setIsSignUpModalOpen(true); setIsLoginModalOpen(false); };
  const closeSignUpModal = () => setIsSignUpModalOpen(false);

  return (
    <AuthContext.Provider value={{ 
      user, login, logout, 
      isLoginModalOpen, openLoginModal, closeLoginModal,
      isSignUpModalOpen, openSignUpModal, closeSignUpModal,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}