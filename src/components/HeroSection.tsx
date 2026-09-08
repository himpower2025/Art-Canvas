import React from 'react';
import { Sparkles, ArrowRight, Play, Compass, Flame, ShieldAlert, Heart } from 'lucide-react';

interface HeroSectionProps {
  onOpenCanvas: () => void;
  onExploreCurriculum: () => void;
  onViewStudentSanctuary: () => void;
  onOpenZeroBudgetGuide: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenCanvas,
  onExploreCurriculum,
  onViewStudentSanctuary,
  onOpenZeroBudgetGuide
}) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-18 md:pb-28 border-b border-stone-200 bg-stone-50/50">
      {/* Subtle Himalayan Mountain Skyline Silhouette in Background */}
      <div className="absolute inset-x-0 bottom-0 h-44 opacity-10 pointer-events-none flex items-end justify-center overflow-hidden">
        <svg viewBox="0 0 1440 280" className="w-full h-auto fill-none stroke-stone-400 stroke-1">
          <path d="M0,280 L120,180 L280,240 L450,90 L620,210 L810,60 L980,190 L1150,110 L1320,230 L1440,160 L1440,280 L0,280 Z" />
          <path d="M200,280 L350,140 L500,250 L680,120 L880,260 L1100,160 L1250,280 Z" strokeDasharray="3 3" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Main Hero Typography */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Mission Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D95338]/10 border border-[#D95338]/20 text-[#D95338] text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#D95338] animate-pulse" />
              <span>100% Free Art Education for Nepal's Youth</span>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h1 className="font-display-custom font-normal sm:font-medium text-3xl sm:text-4xl md:text-5xl lg:text-[56px] text-stone-900 tracking-tight leading-[1.12] break-words">
                Discover the Joy of Art. <br className="hidden sm:inline" />
                <span className="font-serif-custom italic font-normal text-[#D95338] tracking-normal">
                  Express What Words Cannot Say.
                </span>
              </h1>
            </div>

            {/* Story Paragraph */}
            <p className="text-sm sm:text-base md:text-lg text-stone-600 leading-relaxed max-w-2xl font-sans-custom">
              Welcome to CHOI Art Studio. We believe every young person is an artist with a story to tell. Here, you can learn drawing, painting, and creativity for free—using simple everyday items like firewood charcoal, kitchen tea, and scrap paper. No grades, no pressure, just the pure joy of creating.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-3.5 pt-2 w-full sm:w-auto">
              <button
                id="hero-start-decompressing-btn"
                onClick={onOpenCanvas}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#D95338] hover:bg-[#C2452D] text-white font-medium text-sm shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 group active:scale-95"
              >
                <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform shrink-0" />
                <span>Start Drawing on Canvas</span>
              </button>

              <button
                id="hero-explore-curriculum-btn"
                onClick={onExploreCurriculum}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-stone-50 text-stone-900 font-medium text-sm border border-stone-200 shadow-2xs transition-colors flex items-center justify-center gap-2"
              >
                <Play className="w-3.5 h-3.5 fill-current text-[#D95338] shrink-0" />
                <span>Browse Free Lessons</span>
              </button>
            </div>

            {/* Zero-Budget Callout */}
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-stone-500">
              <span className="font-serif-custom italic text-sm sm:text-base text-emerald-800">
                No money for art supplies?
              </span>
              <button
                id="hero-zero-budget-guide-link"
                onClick={onOpenZeroBudgetGuide}
                className="text-emerald-800 font-semibold underline underline-offset-4 hover:text-stone-900 text-left"
              >
                Make paints with tea, charcoal, and kitchen spices →
              </button>
            </div>
          </div>

          {/* Right Hero Interactive Art & Student Impact Card */}
          <div className="lg:col-span-5 relative w-full">
            <div className="relative mx-auto w-full max-w-md bg-white p-4 sm:p-6 rounded-3xl shadow-xl border border-stone-200 space-y-4">
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#D95338]" />
                  <span className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
                    Featured Student Art
                  </span>
                </div>
                <span className="text-[11px] font-mono text-stone-400">
                  Student Story
                </span>
              </div>

              {/* Artwork Preview Image */}
              <div 
                onClick={onViewStudentSanctuary}
                className="group relative aspect-4/3 rounded-2xl overflow-hidden cursor-pointer bg-stone-100 border border-stone-200"
              >
                <img
                  src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80"
                  alt="Student Art Highlight"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 flex flex-col justify-end text-white">
                  <span className="text-[11px] text-amber-200 uppercase font-medium tracking-wider">
                    Kathmandu • Age 15
                  </span>
                  <h4 className="font-display-custom font-medium text-base sm:text-lg text-white">
                    "Rhododendrons in Morning Light"
                  </h4>
                </div>
              </div>

              {/* Student Quote */}
              <blockquote className="text-xs text-stone-600 font-serif-custom italic leading-relaxed border-l-2 border-[#D95338] pl-3">
                "Drawing helps me share my feelings when words are hard to find. Making my own paints from kitchen tea made me realize that anyone can create art anywhere."
              </blockquote>

              {/* Quick interactive action */}
              <div className="pt-1 flex items-center justify-between">
                <span className="text-xs text-stone-500 font-sans-custom">
                  Pooja Karki, Grade 10
                </span>
                <button
                  id="hero-view-gallery-action"
                  onClick={onViewStudentSanctuary}
                  className="text-xs font-semibold text-[#D95338] hover:text-[#C2452D] flex items-center gap-1 font-sans-custom"
                >
                  <span>See 60+ Student Artworks</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Asymmetrical Floating Decorative Stamp */}
            <div className="hidden sm:block absolute -bottom-4 -left-5 bg-stone-900 text-stone-100 p-4 rounded-2xl shadow-xl border border-stone-800 max-w-[210px]">
              <p className="font-serif-custom italic text-sm text-amber-300 leading-snug">
                "Art gives every child a voice."
              </p>
              <span className="text-[10px] text-stone-400 block mt-1.5 font-mono uppercase tracking-wider">
                Free for All Nepali Youth
              </span>
            </div>
          </div>
        </div>

        {/* 3 Pillar Summary Grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6 pt-8 sm:pt-10 border-t border-stone-200">
          <div className="p-5 rounded-2xl bg-white border border-stone-200 space-y-2 text-left shadow-2xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#D95338]/10 text-[#D95338] flex items-center justify-center shrink-0">
                <Flame className="w-4 h-4" />
              </div>
              <h4 className="font-display-custom font-semibold text-base sm:text-lg text-stone-900">
                1. Freedom to Create
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans-custom">
              Draw, paint, and share what makes you unique. There are no wrong lines and no grades—just the freedom to explore.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-stone-200 space-y-2 text-left shadow-2xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center shrink-0">
                <Compass className="w-4 h-4" />
              </div>
              <h4 className="font-display-custom font-semibold text-base sm:text-lg text-stone-900">
                2. Zero-Cost Supplies
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans-custom">
              You do not need expensive store paints. Learn how to turn firewood charcoal, tea leaves, and garden clay into beautiful colors.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-stone-200 space-y-2 text-left sm:col-span-2 md:col-span-1 shadow-2xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-700 flex items-center justify-center shrink-0">
                <Heart className="w-4 h-4" />
              </div>
              <h4 className="font-display-custom font-semibold text-base sm:text-lg text-stone-900">
                3. Step-by-Step Lessons
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Clear, engaging video lessons for Grades 1 to 10. Learn drawing skills at your own pace from home or the classroom.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
