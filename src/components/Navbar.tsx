import React, { useState } from 'react';
import { Palette, Menu, X, Sparkles, Compass } from 'lucide-react';
import { AudioAmbience } from './AudioAmbience';

interface NavbarProps {
  onOpenCanvas: () => void;
  onOpenZeroBudgetGuide: () => void;
  onSelectSection: (sectionId: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCanvas,
  onOpenZeroBudgetGuide,
  onSelectSection,
  activeSection
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const navItems = [
    { id: 'about', label: 'Our Story' },
    { id: 'curriculum', label: 'Lessons (Grades 1–10)' },
    { id: 'contents', label: 'Video Classes' },
    { id: 'gallery', label: 'Student Gallery' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#F0F8F5]/95 backdrop-blur-md border-b border-[#D4ECE1] transition-all">
      {/* Editorial Curatorial Micro-Bar */}
      <div className="bg-[#1C1917] text-stone-300 border-b border-stone-800/80">
        <div className="studio-container py-1.5 text-[10px] sm:text-[11px] font-mono tracking-widest uppercase flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D95338] animate-pulse" />
            <span className="text-stone-200 font-semibold tracking-wider">CHOI ART STUDIO</span>
            <span className="hidden md:inline text-stone-500">•</span>
            <span className="hidden md:inline text-stone-400">RESEARCHING ART AS SELF-EXPRESSION • TEACHER TRAINING FOR NEPAL'S SCHOOLS</span>
          </div>
          <div className="flex items-center gap-4 text-stone-400">
            <span className="hidden sm:inline font-mono tracking-wider text-[10px] text-stone-400">
              KATHMANDU
            </span>
            <span className="hidden sm:inline text-stone-600">|</span>
            <span className="text-[#D95338] font-medium tracking-normal font-mono text-[10px]">EDUCATION & JOY</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="studio-container h-16 sm:h-18 flex items-center justify-between gap-4">
        {/* Brand Monogram & Exhibition Title */}
        <div 
          onClick={() => onSelectSection('hero')}
          className="cursor-pointer flex items-center gap-3 group select-none shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-[#1C1917] text-[#F0F8F5] border border-stone-700/60 flex items-center justify-center font-display-custom font-medium text-2xl shadow-sm shrink-0 group-hover:border-[#D95338] transition-colors relative overflow-hidden">
            <span className="relative z-10 text-[#F0F8F5]">C</span>
            <div className="absolute inset-0 bg-radial from-[#D95338]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display-custom font-medium text-lg sm:text-xl md:text-2xl tracking-tight text-stone-900 leading-none">
                CHOI Art Studio
              </span>
            </div>
            <p className="text-[10px] text-stone-500 font-sans-custom font-medium tracking-wider uppercase mt-0.5">
              Art as Expression • Teacher Training
            </p>
          </div>
        </div>

        {/* Desktop Curatorial Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#F2ECE1]/80 p-1.5 rounded-full border border-stone-300/70 shadow-2xs">
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`nav-link-${item.id}`}
              onClick={() => onSelectSection(item.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap min-h-[34px] flex items-center ${
                activeSection === item.id
                  ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-white/50'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            id="nav-zero-budget-guide-btn"
            onClick={onOpenZeroBudgetGuide}
            className="px-3.5 py-1.5 rounded-full text-xs font-medium text-stone-700 hover:text-stone-900 hover:bg-white/50 transition-all flex items-center gap-1.5 whitespace-nowrap min-h-[34px]"
          >
            <span>Natural Materials Guide</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D95338]" />
          </button>
        </nav>

        {/* Action Controls & Ambience Toggle */}
        <div className="hidden md:flex items-center gap-2.5 shrink-0">
          {/* Himalayan Singing Bowl Soundscape Controller */}
          <AudioAmbience />

          <button
            id="nav-launch-expressive-canvas-btn"
            onClick={onOpenCanvas}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#C84B31] hover:bg-[#B33E26] text-white text-xs font-medium shadow-2xs hover:shadow-md transition-all active:scale-95 group min-h-[38px]"
          >
            <Palette className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
            <span>Draw on Canvas</span>
          </button>
        </div>

        {/* Mobile & Tablet Toggle Controls (< md) */}
        <div className="flex md:hidden items-center gap-2">
          <AudioAmbience />
          
          <button
            id="mobile-canvas-btn"
            onClick={onOpenCanvas}
            className="min-w-[38px] min-h-[38px] px-2.5 py-1.5 rounded-xl bg-[#C84B31] hover:bg-[#B33E26] text-white flex items-center justify-center gap-1.5 text-xs font-medium shadow-2xs transition-transform active:scale-95"
            title="Expressive Studio"
          >
            <Palette className="w-4 h-4" />
            <span className="hidden sm:inline">Canvas</span>
          </button>
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="min-w-[38px] min-h-[38px] p-2 text-stone-700 hover:bg-stone-200/60 rounded-xl flex items-center justify-center transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-stone-800" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#D4ECE1] bg-[#F0F8F5] px-4 py-4 space-y-3 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSelectSection(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors min-h-[40px] flex items-center ${
                  activeSection === item.id
                    ? 'bg-white text-stone-900 font-semibold shadow-2xs'
                    : 'text-stone-700 hover:bg-white/60'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                onOpenZeroBudgetGuide();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium text-stone-800 hover:bg-white/60 transition-colors flex items-center justify-between min-h-[40px]"
            >
              <span>Natural Materials Guide</span>
              <span className="w-2 h-2 rounded-full bg-[#D95338]" />
            </button>
          </div>

          <div className="pt-2 border-t border-stone-200/80">
            <button
              onClick={() => {
                onOpenCanvas();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-xl bg-[#C84B31] text-white text-sm font-medium flex items-center justify-center gap-2 shadow-2xs"
            >
              <Palette className="w-4 h-4" />
              <span>Draw on Canvas Now</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
