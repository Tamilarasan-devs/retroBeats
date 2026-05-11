import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, LogIn } from 'lucide-react';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Default credentials for demo
    if (username === 'admin' && password === 'retrobest123') {
      localStorage.setItem('adminLoggedIn', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo/Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-600/10 border border-red-600/20 mb-6">
            <Lock className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-white font-serif mb-2">Admin Portal</h1>
          <p className="text-slate-500">Enter your credentials to access the gallery management</p>
        </div>

        {/* Login Form */}
        <div className="bg-[#111] border border-white/5 rounded-3xl p-8 shadow-2xl shadow-black/50">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-slate-400 text-xs font-bold uppercase tracking-widest mb-2 px-1">Username</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-black/40 border border-red-900/20 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-red-600/50 transition-colors"
                  placeholder="admin"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 text-xs font-bold uppercase tracking-widest mb-2 px-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/40 border border-red-900/20 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-red-600/50 transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-red-950/30 border border-red-800/30 text-red-400 text-sm font-medium">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-red-700 to-rose-600 text-white font-bold tracking-wide hover:from-red-600 hover:to-rose-500 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-red-900/20 flex items-center justify-center gap-2"
            >
              <LogIn className="w-5 h-5" />
              Sign In
            </button>
          </form>
        </div>

        {/* Footer Note */}
        <p className="mt-8 text-center text-slate-600 text-sm">
          Protected by Retro Beats Security
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
