import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, Sparkles, BookOpen, Layers, Award, Hammer, Flame } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  const navLinks = [
    { name: 'Explore', path: '/', icon: Compass },
    { name: 'AI Studio', path: '/studio', icon: Sparkles, highlight: true },
    { name: 'Gallery', path: '/gallery', icon: Layers },
    { name: 'Workspace', path: '/dashboard', icon: BookOpen },
    { name: 'Challenge', path: '/challenge', icon: Award }
  ];

  return (
    <header className="sticky top-0 z-50 bg-heritage-50/90 backdrop-blur-md border-b border-heritage-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-terracotta-500 via-heritage-600 to-lapis-600 flex items-center justify-center text-white text-2xl shadow-md group-hover:scale-105 transition-transform">
              🏺
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heritage text-2xl font-bold tracking-wider text-lapis-900 group-hover:text-terracotta-600 transition-colors">
                  SANSKRITI<span className="text-terracotta-500">PLAY</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-terracotta-100 text-terracotta-700 border border-terracotta-200">
                  STUDIO
                </span>
              </div>
              <p className="text-xs text-lapis-600 font-medium tracking-wide">
                Cultural Heritage Toy & Game Innovation
              </p>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-terracotta-500 text-white shadow-sm'
                      : link.highlight
                      ? 'bg-heritage-200/80 text-terracotta-800 hover:bg-terracotta-100'
                      : 'text-lapis-700 hover:bg-heritage-200/50 hover:text-lapis-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : link.highlight ? 'text-terracotta-600' : 'text-lapis-500'}`} />
                  {link.name}
                  {link.highlight && !isActive && (
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-terracotta-500 animate-pulse"></span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA & Student Badge */}
          <div className="flex items-center gap-3">
            <Link
              to="/studio"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-terracotta-500 to-terracotta-600 hover:from-terracotta-600 hover:to-terracotta-700 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Sparkles className="w-4 h-4 animate-spin-slow" />
              <span>Create Toy/Game</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
