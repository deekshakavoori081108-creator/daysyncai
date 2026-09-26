import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, Globe, BookOpen, ShieldCheck, Cpu } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-lapis-900 text-heritage-100 border-t-4 border-terracotta-500 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🏺</span>
              <span className="font-heritage text-2xl font-bold tracking-wider text-white">
                SANSKRITI<span className="text-terracotta-400">PLAY</span>
              </span>
            </div>
            <p className="text-sm text-heritage-300 leading-relaxed">
              Bridging ancient heritage and modern play. An end-to-end studio for students to conceptualize, simulate, 3D print, and publish games based on world history and civilization.
            </p>
            <div className="flex items-center gap-2 text-xs text-terracotta-300 font-semibold bg-lapis-800/80 px-3 py-2 rounded-lg border border-lapis-700">
              <Cpu className="w-4 h-4 text-heritage-400" />
              <span>Powered by Google Gemini 2.5 AI Engine</span>
            </div>
          </div>

          {/* Col 2: Civilizations */}
          <div>
            <h3 className="font-heritage text-base font-bold text-white mb-4 tracking-wider uppercase border-b border-lapis-800 pb-2">
              Ancient Civilizations
            </h3>
            <ul className="space-y-2 text-sm text-heritage-300">
              <li><Link to="/gallery?civ=Ancient+Mesopotamia" className="hover:text-terracotta-400 transition-colors">Mesopotamia & Sumer (2600 BCE)</Link></li>
              <li><Link to="/gallery?civ=Indus+Valley" className="hover:text-terracotta-400 transition-colors">Indus Valley & Harappa (2500 BCE)</Link></li>
              <li><Link to="/gallery?civ=Ancient+Egypt" className="hover:text-terracotta-400 transition-colors">Ancient Egypt & Dynasty Era (3100 BCE)</Link></li>
              <li><Link to="/gallery?civ=Vedic" className="hover:text-terracotta-400 transition-colors">Vedic & Classical India (1500 BCE)</Link></li>
              <li><Link to="/gallery?civ=Nordic" className="hover:text-terracotta-400 transition-colors">Nordic & Viking Era (800 CE)</Link></li>
              <li><Link to="/gallery?civ=Mesoamerica" className="hover:text-terracotta-400 transition-colors">Mesoamerica (Maya & Aztec)</Link></li>
            </ul>
          </div>

          {/* Col 3: Studio & Maker Hub */}
          <div>
            <h3 className="font-heritage text-base font-bold text-white mb-4 tracking-wider uppercase border-b border-lapis-800 pb-2">
              Maker & Innovation Hub
            </h3>
            <ul className="space-y-2 text-sm text-heritage-300">
              <li><Link to="/studio" className="hover:text-terracotta-400 transition-colors">AI Concept Wizard</Link></li>
              <li><Link to="/gallery" className="hover:text-terracotta-400 transition-colors">Community Toy Gallery</Link></li>
              <li><Link to="/dashboard" className="hover:text-terracotta-400 transition-colors">3D STL & PDF Export Center</Link></li>
              <li><Link to="/challenge" className="hover:text-terracotta-400 transition-colors">Student Innovation Challenge</Link></li>
            </ul>
          </div>

          {/* Col 4: Pedagogical Framework */}
          <div>
            <h3 className="font-heritage text-base font-bold text-white mb-4 tracking-wider uppercase border-b border-lapis-800 pb-2">
              Pedagogical Pillars
            </h3>
            <div className="space-y-2.5 text-xs text-heritage-300">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Verified Historical Accuracy & Museum Citations</span>
              </div>
              <div className="flex items-start gap-2">
                <BookOpen className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>Hands-on STEM & Digital Fabrication (CAD/3D)</span>
              </div>
              <div className="flex items-start gap-2">
                <Globe className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>Cultural Anthropology & Global Empathy</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-lapis-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-heritage-400">
          <p>© 2026 SanskritiPlay Studio • Student Innovation Challenge Platform</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-heritage-300">
              Crafted with <Heart className="w-3.5 h-3.5 text-terracotta-500 fill-current" /> for History Educators & Student Makers
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
