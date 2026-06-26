import React, { useState, useEffect } from 'react';
import { Menu, X, User, Users } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../assets/img/logo.jpeg';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);
  const [visitorCount, setVisitorCount] = useState(null);

  useEffect(() => {
    setActive(location.pathname);
  }, [location]);

  useEffect(() => {
    // Local visitor count starting at 10
    let currentCount = parseInt(localStorage.getItem('retrobest_visitor_count'));
    
    if (isNaN(currentCount)) {
      currentCount = 10; // Start at 10 on first visit
    } else {
      currentCount += 1; // Increase on subsequent visits
    }
    
    localStorage.setItem('retrobest_visitor_count', currentCount.toString());
    setVisitorCount(currentCount);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Video', href: '/video' },
    {name:'About', href:'/about'},
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="w-full bg-[#0a0a0a]/90 backdrop-blur-md border-b border-red-900/30 px-4 md:px-8 shadow-2xl relative z-50">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between h-[80px] gap-4 md:gap-8">

        {/* Left Side: Logo */}
        <div className="flex-1 flex items-center gap-4">
          <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
            <img 
              src={Logo} 
              alt="Retro Beats Logo" 
              className="h-12 w-12 object-cover rounded-full border-2 border-red-900 group-hover:border-red-500 transition-colors shadow-lg" 
            />
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-bold uppercase tracking-widest text-white group-hover:text-red-500 transition-colors">
                Retro Beats
              </span>
              <span className="text-[10px] md:text-[15px] tracking-[0.2em] uppercase text-red-600 font-bold">
                Celebrating Music Legends
              </span>
            </div>
          </Link>
          <div className="hidden lg:block w-px h-8 bg-red-900/40 flex-shrink-0" />
        </div>

        {/* Center Side: Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`text-[14px] font-bold uppercase tracking-[0.15em] px-5 py-2.5 rounded-lg transition-all duration-300
                ${active === link.href
                  ? 'text-red-500 bg-red-950/30 shadow-inner border border-red-900/50'
                  : 'text-slate-100 hover:text-red-500 hover:bg-red-950/20'
                }`}
              onClick={() => setActive(link.href)}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Side: Badge, Profile & Mobile Button */}
        <div className="flex-1 flex items-center justify-end gap-4">
          <div className="hidden lg:flex flex-col items-end gap-2 flex-shrink-0">
            <div className="flex items-center gap-2">
              {visitorCount !== null && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 border border-red-900/50 bg-red-950/20 rounded-lg shadow-sm" title="Total Website Visitors">
                  <Users size={14} className="text-red-500" />
                  <span className="text-[10px] font-bold tracking-widest uppercase text-red-500">
                    {visitorCount.toLocaleString()} Visitors
                  </span>
                </div>
              )}
              <div className="flex items-center gap-1.5 px-3 py-1.5 border border-red-900/50 bg-red-950/20 rounded-lg shadow-sm">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1" className="text-red-500" />
                  <circle cx="7" cy="7" r="2.5" fill="currentColor" className="text-red-500" />
                </svg>
                <span className="text-[10px] font-bold tracking-widest uppercase text-red-500">
                  In association with FCMA
                </span>
              </div>
            </div>
          </div>

          {/* Profile Icon Link */}
          {/* <Link 
            to="/admin/login"
            className="p-2.5 rounded-xl bg-red-950/30 border border-red-900/50 text-slate-300 hover:text-red-500 hover:border-red-600/50 transition-all duration-300 shadow-lg group"
            title="Admin Login"
          >
            <User size={20} className="group-hover:scale-110 transition-transform" />
          </Link> */}

          <button
            className="lg:hidden p-2 text-slate-200 hover:text-red-500 transition-colors bg-red-950/30 rounded-lg border border-red-900/50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-red-900/50 py-4 bg-[#0a0a0a] absolute top-full left-0 w-full shadow-2xl z-50">
          <ul className="flex flex-col gap-1 px-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.href}
                  className={`block px-4 py-3 text-sm uppercase tracking-widest rounded-lg transition-colors
                    ${active === link.href
                      ? 'text-red-500 font-bold bg-red-950/40 border border-red-900/50 shadow-sm'
                      : 'text-slate-300 font-medium hover:text-red-500 hover:bg-red-950/20'
                    }`}
                  onClick={() => {
                    setActive(link.href);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li className="mt-4 pt-4 border-t border-red-900/50">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 px-4 py-2 border border-red-900/50 bg-red-950/20 rounded-lg inline-flex w-fit">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1" className="text-red-500" />
                        <circle cx="7" cy="7" r="2.5" fill="currentColor" className="text-red-500" />
                      </svg>
                      <span className="text-[10px] font-bold tracking-widest uppercase text-red-500">
                        In association with FCMA
                      </span>
                    </div>
                    
                    {/* Mobile Admin Link */}
                    <Link 
                      to="/admin/login"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-950/40 border border-red-900/50 text-slate-300 text-[10px] font-bold uppercase tracking-widest"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {/* <User size={14} /> */}
                      Login
                    </Link>
                  </div>
                  {visitorCount !== null && (
                    <div className="flex items-center gap-2 px-4 py-2 border border-red-900/50 bg-red-950/20 rounded-lg inline-flex w-fit mt-1">
                      <Users size={14} className="text-red-500" />
                      <span className="text-[10px] font-bold tracking-widest uppercase text-red-500">
                        {visitorCount.toLocaleString()} Visitors
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-[9px] tracking-widest uppercase text-slate-400 font-medium px-1 mt-2">
                  Fellowship of Coimbatore Malayalee Associations
                </p>
              </div>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}