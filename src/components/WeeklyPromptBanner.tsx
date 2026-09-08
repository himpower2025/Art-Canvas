import React from 'react';
import { Sparkles, Calendar, ArrowUpRight, HelpCircle, Compass, Feather } from 'lucide-react';
import { useAdminContent } from '../context/AdminContentContext';

interface WeeklyPromptBannerProps {
  onOpenCanvasWithPrompt: (promptTitle: string) => void;
}

export const WeeklyPromptBanner: React.FC<WeeklyPromptBannerProps> = ({
  onOpenCanvasWithPrompt
}) => {
  const { weeklyPrompt } = useAdminContent();
  const prompt = weeklyPrompt;

  return (
    <section id="weekly-prompt" className="py-10 sm:py-14 bg-[#FAF8F5] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-9 lg:p-11 art-matting overflow-hidden text-left">
          {/* Subtle archival watermark seal */}
          <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-[#C84B31]/5 pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-5 text-left">
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <span className="px-3.5 py-1 rounded-full bg-[#1C1917] text-white text-[11px] font-mono tracking-widest uppercase flex items-center gap-2 shrink-0 shadow-2xs">
                  <Calendar className="w-3.5 h-3.5 text-[#C84B31]" />
                  WEEKLY ART PROMPT // WEEK {prompt.weekNumber}
                </span>
                <span className="text-xs font-serif-custom italic text-stone-500">
                  45 Minutes of Creative Time
                </span>
              </div>

              <div className="space-y-1">
                <h2 className="font-display-custom font-normal text-2xl sm:text-3xl md:text-4xl text-stone-900 tracking-tight">
                  {prompt.title}
                </h2>
                <p className="font-editorial-custom italic text-lg sm:text-xl text-[#C84B31]">
                  {prompt.theme}
                </p>
              </div>

              <p className="text-xs sm:text-sm md:text-base text-stone-600 leading-relaxed font-sans-custom max-w-2xl">
                {prompt.description}
              </p>

              {/* Reflection Questions pills */}
              <div className="pt-2 space-y-2.5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                  <Feather className="w-3.5 h-3.5 text-[#C84B31]" />
                  <span>Questions to spark your imagination:</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {prompt.guidedQuestions.map((q, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-[#FAF8F5] border border-stone-200/80 text-xs text-stone-700 flex items-start gap-2.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C84B31] mt-1.5 shrink-0" />
                      <span className="leading-relaxed font-serif-custom italic text-stone-800">{q}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-stone-500">
                <Compass className="w-3.5 h-3.5 text-[#C84B31] shrink-0" />
                <span>
                  <strong className="text-stone-900 font-semibold">Materials you can use:</strong> {prompt.recommendedMedium}
                </span>
              </div>
            </div>

            {/* Right Action Box: Studio Invitation */}
            <div className="lg:col-span-4 flex flex-col items-stretch justify-center bg-[#FAF8F5] p-7 rounded-2xl border border-stone-200/80 text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#1C1917] text-white mx-auto flex items-center justify-center shadow-2xs">
                <Sparkles className="w-5 h-5 text-[#C84B31]" />
              </div>

              <div className="space-y-1">
                <h3 className="font-display-custom font-medium text-lg sm:text-xl text-stone-900 tracking-tight">
                  45 Minutes to Create Freely
                </h3>
                <p className="text-xs text-stone-500 font-serif-custom italic">
                  No mistakes, no grades. Just you and your imagination.
                </p>
              </div>

              <button
                id="weekly-prompt-launch-canvas-btn"
                onClick={() => onOpenCanvasWithPrompt(prompt.title)}
                className="w-full py-3.5 px-4 rounded-xl bg-[#C84B31] hover:bg-[#B33E26] text-white font-medium text-xs shadow-2xs hover:shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
              >
                <span>Start This Week's Drawing</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">
                Always Free • Draw Anytime
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
