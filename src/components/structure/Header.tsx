"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, LogOut, User } from "lucide-react";
import LoginModal from "@/components/auth/LoginModal";
import SignUpModal from "@/components/auth/SignUpModal"; // Import
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { 
    user, logout, login,
    isLoginModalOpen, openLoginModal, closeLoginModal,
    isSignUpModalOpen, openSignUpModal, closeSignUpModal 
  } = useAuth();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "OCR Tool", href: "/ocr" },
    { name: "About Us", href: "/about" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-black via-gray-900 to-blue-950 border-b border-white/10 shadow-lg backdrop-blur-sm">
        {/* ... (Header layout remains the same) ... */}
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <Image src="/ocr.jpg" alt="FYP Logo" width={69} height={69} className="rounded-md object-contain group-hover:border-blue-500 transition-colors" />
            <span className="text-xl font-bold text-white tracking-wide hidden sm:block">FYP OCR</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="text-sm font-medium text-gray-300 hover:text-white hover:scale-105 transition-all relative group">
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="hidden md:flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-300 text-sm">
                  <User className="w-4 h-4" />
                  <span>{user.name}</span>
                </div>
                <button onClick={logout} className="px-4 py-2 text-sm font-bold text-white bg-red-600 rounded-full hover:bg-red-700 transition-all flex items-center gap-2">
                  <LogOut className="w-4 h-4" /> Log Out
                </button>
              </div>
            ) : (
              <button onClick={openLoginModal} className="hidden md:inline-flex px-5 py-2 text-sm font-bold text-gray-900 bg-white rounded-full hover:bg-gray-200 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all">
                Log in
              </button>
            )}
            
            {/* Mobile Menu Button */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-gray-300 hover:bg-white/10 hover:text-white rounded-md transition-colors">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-gray-900 absolute w-full left-0 animate-in slide-in-from-top-2">
            <nav className="flex flex-col p-4 space-y-4">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 p-2 rounded-lg transition-colors">
                  {link.name}
                </Link>
              ))}
              <hr className="border-white/10 my-2" />
              {user ? (
                <button onClick={() => { logout(); setIsMenuOpen(false); }} className="text-base font-bold text-center text-white bg-red-600 py-3 rounded-lg hover:bg-red-700 transition-colors w-full">
                  Log Out
                </button>
              ) : (
                <button onClick={() => { openLoginModal(); setIsMenuOpen(false); }} className="text-base font-bold text-center text-gray-900 bg-white py-3 rounded-lg hover:bg-gray-200 transition-colors w-full">
                  Log in
                </button>
              )}
            </nav>
          </div>
        )}
      </header>

      {/* Modals */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={closeLoginModal}
        onLoginSuccess={login}
        onSwitchToSignUp={openSignUpModal}
      />
      <SignUpModal 
        isOpen={isSignUpModalOpen}
        onClose={closeSignUpModal}
        onSwitchToLogin={openLoginModal}
      />
    </>
  );
}