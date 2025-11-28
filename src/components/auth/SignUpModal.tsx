"use client";

import { useState } from "react";
import { X, Loader2, Lock, Mail, User, AlertCircle } from "lucide-react";
import { registerUser } from "@/lib/auth-service";
import { z } from "zod";
type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void; // Callback to switch back to login
};
const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Confirm Password must be at least 8 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
});

export default function SignUpModal({ isOpen, onClose, onSwitchToLogin }: Props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const validation = registerSchema.safeParse({ username, email, password, confirmPassword });
    if (!validation.success) {
      setError(validation.error.issues?.[0]?.message || "Validation failed");
      setIsLoading(false);
      return;
    }

    try {
      const response = await registerUser({ username, email, password });

      if (response.success) {
        setSuccess(true);
        setTimeout(() => {
          onSwitchToLogin(); // Auto switch to login after success
        }, 2000);
      } else {
        setError(response.error || "Registration failed");
      }
    } catch (err) {
        console.log(err)
        setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-gray-400 text-sm">Join us to unlock OCR features.</p>
        </div>

        {success ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-white">Success!</h3>
            <p className="text-gray-400 mt-2">Redirecting to login...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Username</label>
                <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-black border border-gray-800 rounded-lg py-3 pl-10 pr-4 text-white focus:border-blue-500 transition-all" placeholder="johndoe" />
                </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Email</label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-black border border-gray-800 rounded-lg py-3 pl-10 pr-4 text-white focus:border-blue-500 transition-all" placeholder="name@example.com" />
                </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Password</label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-black border border-gray-800 rounded-lg py-3 pl-10 pr-4 text-white focus:border-blue-500 transition-all" placeholder="••••••••" />
                </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Confirm Password</label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full bg-black border border-gray-800 rounded-lg py-3 pl-10 pr-4 text-white focus:border-blue-500 transition-all" placeholder="••••••••" />
                </div>
            </div>

            {error && (
                <div className="p-3 bg-red-900/20 border border-red-900/50 rounded-lg flex items-center gap-3 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
                </div>
            )}

            <button type="submit" disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg disabled:opacity-50 flex items-center justify-center gap-2">
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign Up"}
            </button>
          </form>
        )}

        <div className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <button onClick={onSwitchToLogin} className="text-blue-500 hover:text-blue-400 font-medium">
            Log in here
          </button>
        </div>
      </div>
    </div>
  );
}