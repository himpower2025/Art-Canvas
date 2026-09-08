import React from 'react';
import { Heart, Sparkles, Compass, Feather, ShieldCheck, Lock, LogOut, Brush, Award } from 'lucide-react';
import { useAdminContent } from '../context/AdminContentContext';

interface FooterProps {
  onOpenCanvas: () => void;
  onOpenZeroBudgetGuide: () => void;
  onOpenAdminLogin: () => void;
  onOpenAdminPortal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenCanvas,
  onOpenZeroBudgetGuide,
  onOpenAdminLogin,
  onOpenAdminPortal
}) => {
  const { isAdmin, logout } = useAdminContent();

  return (
    <footer className="bg-[#1C1917] text-stone-300 py-16 md:py-20 border-t border-stone-800 relative overflow-hidden text-left">
      {/* Archival ambient background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C84B31]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 relative z-10">
        <div className="grid md:grid-cols-12 gap-10 items-start">
          {/* Brand Vision */}
          <div className="md:col-span-6 space-y-5 text-left">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#C84B31] text-white flex items-center justify-center font-display-custom font-bold text-2xl shadow-lg">
                C
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display-custom font-normal text-2xl sm:text-3xl text-stone-100 tracking-tight">
                    CHOI Art Studio
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-stone-800 text-[#C84B31] text-[10px] font-mono uppercase tracking-widest border border-stone-700">
                    FREE STUDIO
                  </span>
                </div>
                <p className="text-xs text-stone-400 font-serif-custom italic mt-0.5">
                  Kathmandu • Free Creative Art for Every Child in Nepal
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-lg font-sans-custom">
              CHOI Art Studio offers free art education for youth across Nepal. We believe art is a wonderful way for every student to discover confidence, explore creativity, and express their thoughts through color and imagination.
            </p>

            <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800 text-xs text-stone-300 flex items-start gap-3 shadow-inner">
              <Sparkles className="w-4 h-4 text-[#C84B31] shrink-0 mt-0.5" />
              <p className="font-editorial-custom italic text-stone-200 text-sm">
                "Art is not a luxury — it gives every child a voice."
              </p>
            </div>
          </div>

          {/* Quick Access */}
          <div className="md:col-span-3 space-y-3.5 text-left">
            <h4 className="font-sans-custom text-xs text-stone-200 tracking-wider uppercase font-semibold">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button
                  id="footer-open-canvas"
                  onClick={onOpenCanvas}
                  className="hover:text-stone-100 transition-colors flex items-center gap-1.5 font-sans-custom"
                >
                  <Brush className="w-3.5 h-3.5 text-[#C84B31]" />
                  <span>Online Drawing Canvas</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-open-zero-budget"
                  onClick={onOpenZeroBudgetGuide}
                  className="hover:text-stone-100 transition-colors flex items-center gap-1.5 font-sans-custom"
                >
                  <Compass className="w-3.5 h-3.5 text-[#C84B31]" />
                  <span>Free Natural Paints Guide</span>
                </button>
              </li>
              <li>
                <span className="text-stone-400 font-sans-custom text-xs">Grades 1–5: Colors & Nature</span>
              </li>
              <li>
                <span className="text-stone-400 font-sans-custom text-xs">Grades 6–8: Shapes & Stories</span>
              </li>
              <li>
                <span className="text-stone-400 font-sans-custom text-xs">Grades 9–10: Voice & Style</span>
              </li>
            </ul>
          </div>

          {/* Curatorial Commitment */}
          <div className="md:col-span-3 space-y-3.5 text-left">
            <h4 className="font-sans-custom text-xs text-stone-200 tracking-wider uppercase font-semibold">
              Our Promise
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed font-sans-custom">
              100% free and open to everyone. Every lesson and paint recipe is made to work in any school or home without expensive supplies or internet.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <Award className="w-4 h-4 text-[#C84B31]" />
              <span className="font-mono text-[10px] text-stone-400 tracking-wider uppercase">
                Always Free • Made for Nepal
              </span>
            </div>
          </div>
        </div>

        {/* Bottom copyright line and Admin Portal Trigger */}
        <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <p className="font-sans-custom text-[11px]">
              © 2026 CHOI Art Studio. Made with care for the youth and teachers of Nepal.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="hidden md:flex items-center gap-1.5 text-stone-400 text-[11px]">
              <span className="font-serif-custom italic">A welcoming home for creativity</span>
              <Heart className="w-3 h-3 text-[#C84B31] fill-current" />
            </div>

            {/* Admin Portal Bottom Entry Point */}
            {isAdmin ? (
              <div className="flex items-center gap-2 bg-stone-900 text-white px-3.5 py-1.5 rounded-xl shadow-xs border border-stone-700">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <button
                  id="footer-admin-portal-open-btn"
                  onClick={onOpenAdminPortal}
                  className="text-xs font-semibold hover:text-[#C84B31] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C84B31]" />
                  <span>Admin Portal</span>
                </button>
                <span className="text-stone-700">|</span>
                <button
                  id="footer-admin-logout-btn"
                  onClick={logout}
                  className="text-[11px] text-stone-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                  title="Sign Out as Administrator"
                >
                  <LogOut className="w-3 h-3" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <button
                id="footer-admin-portal-login-btn"
                onClick={onOpenAdminLogin}
                className="group flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-700 shadow-2xs transition-all text-xs font-medium cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#C84B31] transition-colors" />
                <span>Admin Portal</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
