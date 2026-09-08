import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Compass, 
  Heart, 
  BookOpen, 
  Palette, 
  Video,
  Brush,
  Droplets,
  Cpu,
  GraduationCap,
  ExternalLink,
  Eye,
  Award
} from 'lucide-react';
import { LiveStudioWorkbench } from './LiveStudioWorkbench';

interface AboutSectionProps {
  onOpenCanvas: () => void;
  onExploreCurriculum: () => void;
  onExploreContents: () => void;
  onViewStudentSanctuary: () => void;
  onOpenZeroBudgetGuide: () => void;
}

const NATURAL_RECIPES = [
  {
    name: 'Charcoal Soot',
    medium: 'Drawing Charcoal',
    origin: 'Kitchen Firewood Soot',
    ingredients: 'Cooking firewood soot + raw rice starch binder',
    cost: '0 NPR',
    use: 'High-contrast expressive sketches & dynamic chiaroscuro',
    color: '#1C1917',
    swatchClass: 'bg-[#1C1917]'
  },
  {
    name: 'Wild Turmeric',
    medium: 'Golden Ochre Gouache',
    origin: 'Wild Turmeric Rhizome',
    ingredients: 'Raw turmeric root + gum arabic or honey water',
    cost: '0 NPR',
    use: 'Traditional Mithila geometric backgrounds & warm accents',
    color: '#D97706',
    swatchClass: 'bg-[#D97706]'
  },
  {
    name: 'Steeped Ilam Tea',
    medium: 'Sepia Wash',
    origin: 'Alpine Tea Leaves',
    ingredients: 'Concentrated boiled black tea leaves steeped overnight',
    cost: '0 NPR',
    use: 'Monochromatic value studies & antique Lokta paper patina',
    color: '#78350F',
    swatchClass: 'bg-[#78350F]'
  },
  {
    name: 'Rhododendron Petals',
    medium: 'Scarlet Ink',
    origin: 'Laligurans Flower',
    ingredients: 'Crushed Laligurans petals + lemon juice mordant',
    cost: '0 NPR',
    use: 'Vibrant organic calligraphy & emotional focal points',
    color: '#C84B31',
    swatchClass: 'bg-[#C84B31]'
  },
  {
    name: 'Bagmati Valley Silt',
    medium: 'Terracotta Pigment',
    origin: 'Riverbed Clay Silt',
    ingredients: 'Fine filtered Bagmati silt + wood ash mineral filler',
    cost: '0 NPR',
    use: 'Earthy textured murals & traditional relief coatings',
    color: '#C2410C',
    swatchClass: 'bg-[#C2410C]'
  }
];

const CURATED_EXHIBITS = [
  {
    title: 'Rhododendron Clock',
    artist: 'Pooja Karki',
    location: 'Bhaktapur',
    grade: 'Grade 9',
    medium: 'Crushed Rhododendron & Tea Wash on Lokta',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80'
  },
  {
    title: 'The Solitary Pine',
    artist: 'Bikram Thapa',
    location: 'Pokhara',
    grade: 'Grade 7',
    medium: 'Charcoal Soot & Mountain Stone Wash',
    image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=600&auto=format&fit=crop&q=80'
  },
  {
    title: 'Dawn Above Patan',
    artist: 'Sujan Maharjan',
    location: 'Lalitpur',
    grade: 'Grade 10',
    medium: 'Wild Turmeric Ochre & Himalayan Lapis',
    image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=600&auto=format&fit=crop&q=80'
  }
];

export const AboutSection: React.FC<AboutSectionProps> = ({
  onOpenCanvas,
  onExploreCurriculum,
  onExploreContents,
  onViewStudentSanctuary,
  onOpenZeroBudgetGuide
}) => {
  const [selectedRecipe, setSelectedRecipe] = useState<number>(0);

  return (
    <section id="about" className="relative overflow-hidden pt-6 pb-20 md:pt-10 md:pb-28 border-b border-stone-200/80 studio-grid">
      {/* 1. Curatorial Marquee Ticker */}
      <div className="border-y border-stone-200/70 bg-[#F4EFE6]/60 py-2.5 overflow-hidden mb-8 select-none">
        <div className="animate-marquee flex items-center gap-8 text-[11px] font-mono tracking-widest text-stone-700 uppercase">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C84B31]" />
            "Art is not a luxury — it gives every child a voice."
          </span>
          <span className="text-stone-400">✦</span>
          <span>CHOI ART STUDIO • KATHMANDU</span>
          <span className="text-stone-400">✦</span>
          <span>100% FREE NATURAL PAINTS & INKS</span>
          <span className="text-stone-400">✦</span>
          <span>1,400+ STUDENT ARTISTS ACROSS NEPAL</span>
          <span className="text-stone-400">✦</span>
          <span>FREE LESSONS FOR GRADES 1–10</span>
          <span className="text-stone-400">✦</span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C84B31]" />
            "Art is not a luxury — it gives every child a voice."
          </span>
          <span className="text-stone-400">✦</span>
          <span>CHOI ART STUDIO • KATHMANDU</span>
          <span className="text-stone-400">✦</span>
          <span>100% FREE NATURAL PAINTS & INKS</span>
          <span className="text-stone-400">✦</span>
          <span>1,400+ STUDENT ARTISTS ACROSS NEPAL</span>
          <span className="text-stone-400">✦</span>
          <span>FREE LESSONS FOR GRADES 1–10</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
        {/* 2. Hero Grand Foyer: Editorial Typography & Live Easel */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Monumental Fine Art Editorial */}
          <div className="lg:col-span-6 space-y-7 text-left">
            {/* Atelier Coordinates & Identity Stamp */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-xs border border-stone-300/80 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#C84B31] animate-ping" />
              <span className="font-mono text-[10px] tracking-widest text-stone-700 uppercase font-medium">
                FREE ART STUDIO • EST. 2024
              </span>
              <span className="text-stone-300">|</span>
              <span className="font-mono text-[10px] text-stone-500 tracking-wider">
                KATHMANDU
              </span>
            </div>

            {/* Monumental Headline */}
            <div className="space-y-3">
              <h1 className="font-display-custom font-normal text-4xl sm:text-5xl md:text-6xl lg:text-[68px] text-stone-900 tracking-tight leading-[1.08]">
                Art Belongs to <span className="font-semibold text-stone-900">Every Child</span>.
              </h1>
              <p className="font-editorial-custom italic font-normal text-[#C84B31] text-2xl sm:text-3xl md:text-4xl lg:text-[42px] leading-tight">
                Express what you feel through colors and lines.
              </p>
            </div>

            {/* Poetic Narrative Description */}
            <div className="space-y-3.5 text-stone-600 text-sm sm:text-base leading-relaxed font-sans-custom max-w-xl">
              <p className="text-stone-700">
                We believe art is not a test or an expensive hobby. It is the natural way young people discover who they are and share their hopes and stories with the world.
              </p>
              <p>
                <strong className="text-stone-900 font-semibold">CHOI Art Studio</strong> provides <strong className="text-stone-900 font-semibold">free drawing lessons for Grades 1 to 10</strong>, <strong className="text-stone-900 font-semibold">step-by-step video classes</strong>, and <strong className="text-stone-900 font-semibold">easy recipes to make paints for 0 NPR</strong> from kitchen tea, firewood charcoal, and garden petals. Any student and any classroom in Nepal can start today.
              </p>
            </div>

            {/* Action Directives */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 pt-2">
              <button
                id="about-open-canvas-btn"
                onClick={onOpenCanvas}
                className="px-6 py-3.5 rounded-xl bg-[#C84B31] hover:bg-[#B33E26] text-white font-medium text-sm shadow-2xs hover:shadow-md transition-all flex items-center justify-center gap-2 group active:scale-95 min-h-[46px]"
              >
                <Brush className="w-4 h-4 group-hover:rotate-12 transition-transform shrink-0" />
                <span>Start Drawing on Canvas</span>
              </button>

              <button
                id="about-explore-curriculum-btn"
                onClick={onExploreCurriculum}
                className="px-5 py-3.5 rounded-xl bg-white hover:bg-stone-50 text-stone-800 font-medium text-sm border border-stone-300/80 shadow-2xs transition-colors flex items-center justify-center gap-2 min-h-[46px]"
              >
                <GraduationCap className="w-4 h-4 text-stone-500 shrink-0" />
                <span>Grades 1–10 Lessons</span>
              </button>

              <button
                id="about-explore-contents-btn"
                onClick={onExploreContents}
                className="px-5 py-3.5 rounded-xl bg-white hover:bg-stone-50 text-stone-800 font-medium text-sm border border-stone-300/80 shadow-2xs transition-colors flex items-center justify-center gap-2 min-h-[46px]"
              >
                <Video className="w-4 h-4 text-stone-500 shrink-0" />
                <span>Watch Video Classes</span>
              </button>
            </div>

            {/* Curatorial Status Bar */}
            <div className="p-3.5 rounded-2xl bg-white/90 backdrop-blur-xs border border-stone-200/90 shadow-2xs flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-xs font-medium text-stone-800">
                  Over 1,400 Students Creating Daily Across Nepal
                </span>
              </div>
              <button
                id="about-zero-budget-guide-btn"
                onClick={onOpenZeroBudgetGuide}
                className="text-xs font-medium text-[#C84B31] hover:underline whitespace-nowrap flex items-center gap-1"
              >
                <span>Free Paint Recipes</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Right Column: Live Interactive Atelier Easel */}
          <div className="lg:col-span-6 w-full">
            <LiveStudioWorkbench
              onOpenFullCanvas={onOpenCanvas}
              onOpenZeroBudgetGuide={onOpenZeroBudgetGuide}
            />
          </div>
        </div>

        {/* 3. Featured Masterpiece Exhibition Showcase (Museum Wall) */}
        <div className="pt-4 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200/80 pb-4">
            <div className="space-y-1 text-left">
              <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-stone-500">
                <Award className="w-3.5 h-3.5 text-[#C84B31]" />
                <span>STUDENT ART GALLERY // RECENT WORKS</span>
              </div>
              <h3 className="font-display-custom font-normal text-2xl sm:text-3xl text-stone-900 tracking-tight">
                Real Art by Nepali Students
              </h3>
            </div>
            <button
              onClick={onViewStudentSanctuary}
              className="text-xs font-medium text-[#C84B31] hover:underline flex items-center gap-1 self-start sm:self-auto"
            >
              <span>See All Student Artworks</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CURATED_EXHIBITS.map((item, index) => (
              <div 
                key={item.title}
                onClick={onViewStudentSanctuary}
                className="group cursor-pointer art-matting rounded-2xl p-3 sm:p-4 border border-stone-200/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg text-left"
              >
                {/* Artwork Matting Frame */}
                <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden bg-stone-100 border border-stone-200/80 mb-3.5">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-stone-900/75 backdrop-blur-xs text-[10px] font-mono text-stone-100 uppercase">
                    {item.grade}
                  </div>
                </div>

                {/* Museum Exhibition Placard */}
                <div className="space-y-1 px-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <h4 className="font-display-custom font-bold text-lg text-stone-900 group-hover:text-[#C84B31] transition-colors">
                      {item.title}
                    </h4>
                    <span className="text-[11px] font-mono text-stone-400">
                      #{String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-stone-700">
                    {item.artist} <span className="text-stone-400 font-normal">· {item.location}</span>
                  </p>
                  <p className="text-[11px] font-mono text-stone-500 truncate pt-0.5">
                    {item.medium}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. The 0-NPR Himalayan Apothecary & Chemistry Archive */}
        <div className="art-matting rounded-3xl p-6 sm:p-9 border border-stone-200/90 text-left space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200/70 pb-5">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#C84B31] uppercase">
                <Droplets className="w-4 h-4" />
                <span>STATION 03 // NATURAL COLORS LAB</span>
              </div>
              <h3 className="font-display-custom font-normal text-2xl sm:text-3xl md:text-4xl text-stone-900 tracking-tight">
                Turn Simple Nature into Beautiful Paints
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 max-w-2xl">
                Every home and school in Nepal has rich colors waiting to be found. From kitchen charcoal and tea leaves to river clay, here is how you can paint for free.
              </p>
            </div>

            <button
              onClick={onOpenZeroBudgetGuide}
              className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-[#C84B31] text-white text-xs font-medium transition-colors shrink-0 shadow-2xs flex items-center gap-1.5"
            >
              <span>See All Free Recipes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Horizontal Pigment Bottles Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
            {NATURAL_RECIPES.map((item, idx) => {
              const isSelected = selectedRecipe === idx;
              return (
                <button
                  key={item.name}
                  onClick={() => setSelectedRecipe(idx)}
                  className={`p-3.5 rounded-2xl text-left transition-all border relative ${
                    isSelected
                      ? 'border-[#C84B31] ring-2 ring-[#C84B31]/20 bg-stone-50 shadow-2xs'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <div 
                      className="w-6 h-6 rounded-full shadow-inner border border-black/10"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-stone-100 text-stone-700">
                      {item.cost}
                    </span>
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-stone-900">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-stone-500 truncate mt-0.5">
                    {item.medium}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Active Recipe Dossier Card */}
          <div className="bg-[#FAF8F5] rounded-2xl p-5 sm:p-6 border border-stone-200/90 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div className="space-y-1.5 text-left">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-stone-900 uppercase tracking-wider">
                  RECIPE: {NATURAL_RECIPES[selectedRecipe].name}
                </span>
                <span className="text-xs text-[#C84B31] font-medium">
                  • {NATURAL_RECIPES[selectedRecipe].medium}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-700">
                <strong className="text-stone-900">Ingredients:</strong> {NATURAL_RECIPES[selectedRecipe].origin} — {NATURAL_RECIPES[selectedRecipe].ingredients}
              </p>
              <p className="text-xs text-stone-500">
                <strong className="text-stone-700">How to use:</strong> {NATURAL_RECIPES[selectedRecipe].use}
              </p>
            </div>

            <button
              onClick={onOpenCanvas}
              className="px-4 py-2.5 bg-[#C84B31] hover:bg-[#B33E26] text-white rounded-xl text-xs font-medium shrink-0 flex items-center gap-2 shadow-2xs transition-all active:scale-95"
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Try This Color on Canvas</span>
            </button>
          </div>
        </div>

        {/* 5. The Four Grand Pavilions (Museum Wings) */}
        <div className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-[10px] font-mono tracking-widest uppercase border border-stone-200/80">
              <Cpu className="w-3 h-3 text-[#C84B31]" />
              <span>EVERYTHING YOU NEED TO CREATE</span>
            </div>
            <h3 className="font-display-custom font-normal text-3xl sm:text-4xl md:text-5xl text-stone-900 tracking-tight">
              The Four Learning Areas
            </h3>
            <p className="text-sm sm:text-base text-stone-600 font-serif-custom italic">
              Designed to help every child learn, inspire every teacher, and celebrate creativity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Wing 1: Pedagogy */}
            <div 
              onClick={onExploreCurriculum}
              className="group cursor-pointer p-6 rounded-3xl bg-white border border-stone-200/90 shadow-2xs hover:shadow-md hover:border-stone-300 transition-all text-left space-y-4 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-[#1C1917] text-white flex items-center justify-center font-bold text-sm shadow-2xs group-hover:bg-[#C84B31] transition-colors">
                  <BookOpen className="w-4 h-4" />
                </div>
                <span className="font-mono text-xs text-stone-400 font-medium tracking-widest uppercase">
                  AREA 01
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono font-medium tracking-wider text-stone-500 uppercase block">
                  LESSONS FOR ALL AGES
                </span>
                <h4 className="font-display-custom font-medium text-lg text-stone-900 group-hover:text-[#C84B31] transition-colors leading-snug mt-1 tracking-tight">
                  Grades 1–10 Art Lessons
                </h4>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed font-sans-custom">
                Step-by-step drawing and painting guides for Primary (1–5), Middle (6–8), and High School (9–10). Easy to follow.
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-xs font-medium text-[#C84B31] group-hover:translate-x-1 transition-transform font-sans-custom">
                <span>Browse Lessons</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Wing 2: Masterclasses */}
            <div 
              onClick={onExploreContents}
              className="group cursor-pointer p-6 rounded-3xl bg-white border border-stone-200/90 shadow-2xs hover:shadow-md hover:border-stone-300 transition-all text-left space-y-4 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-[#1C1917] text-white flex items-center justify-center font-bold text-sm shadow-2xs group-hover:bg-[#C84B31] transition-colors">
                  <Video className="w-4 h-4" />
                </div>
                <span className="font-mono text-xs text-stone-400 font-medium tracking-widest uppercase">
                  AREA 02
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono font-medium tracking-wider text-stone-500 uppercase block">
                  VIDEO CLASSES
                </span>
                <h4 className="font-display-custom font-medium text-lg text-stone-900 group-hover:text-[#C84B31] transition-colors leading-snug mt-1 tracking-tight">
                  Follow-Along Video Lessons
                </h4>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed font-sans-custom">
                Watch artists show you how to draw with charcoal, paint with tea washes, and create with confidence.
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-xs font-medium text-[#C84B31] group-hover:translate-x-1 transition-transform font-sans-custom">
                <span>Watch Classes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Wing 3: Pigment Lab */}
            <div 
              onClick={onOpenZeroBudgetGuide}
              className="group cursor-pointer p-6 rounded-3xl bg-white border border-stone-200/90 shadow-2xs hover:shadow-md hover:border-stone-300 transition-all text-left space-y-4 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-[#1C1917] text-white flex items-center justify-center font-bold text-sm shadow-2xs group-hover:bg-[#C84B31] transition-colors">
                  <Compass className="w-4 h-4" />
                </div>
                <span className="font-mono text-xs text-stone-400 font-medium tracking-widest uppercase">
                  AREA 03
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono font-medium tracking-wider text-stone-500 uppercase block">
                  FREE PAINTS & INKS
                </span>
                <h4 className="font-display-custom font-medium text-lg text-stone-900 group-hover:text-[#C84B31] transition-colors leading-snug mt-1 tracking-tight">
                  Natural Colors from Home
                </h4>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed font-sans-custom">
                Learn how to make rich black ink from firewood charcoal and warm amber paint from black tea—all for 0 NPR.
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-xs font-medium text-[#C84B31] group-hover:translate-x-1 transition-transform font-sans-custom">
                <span>See Recipes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Wing 4: Student Sanctuary */}
            <div 
              onClick={onViewStudentSanctuary}
              className="group cursor-pointer p-6 rounded-3xl bg-white border border-stone-200/90 shadow-2xs hover:shadow-md hover:border-stone-300 transition-all text-left space-y-4 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-[#1C1917] text-white flex items-center justify-center font-bold text-sm shadow-2xs group-hover:bg-[#C84B31] transition-colors">
                  <Heart className="w-4 h-4" />
                </div>
                <span className="font-mono text-xs text-stone-400 font-medium tracking-widest uppercase">
                  AREA 04
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono font-medium tracking-wider text-stone-500 uppercase block">
                  STUDENT SHOWCASE
                </span>
                <h4 className="font-display-custom font-medium text-lg text-stone-900 group-hover:text-[#C84B31] transition-colors leading-snug mt-1 tracking-tight">
                  Student Art Gallery
                </h4>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed font-sans-custom">
                An online gallery celebrating creative drawings and heartfelt stories from students across Nepal.
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-xs font-medium text-[#C84B31] group-hover:translate-x-1 transition-transform font-sans-custom">
                <span>Visit Gallery</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* 6. Museum Impact Catalog Bar */}
          <div className="art-matting rounded-3xl p-6 sm:p-8 border border-stone-200/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center shadow-2xs">
            <div className="p-2 sm:border-r border-stone-200/80">
              <div className="font-mono text-xs text-stone-400 tracking-widest uppercase">
                TIER 01
              </div>
              <div className="font-display-custom font-medium text-2xl sm:text-3xl md:text-4xl text-stone-900 mt-1 tracking-tight">
                Grades 1–10
              </div>
              <p className="text-xs text-stone-500 mt-1 font-sans-custom">Step-by-Step Lessons for All Ages</p>
            </div>

            <div className="p-2 sm:border-r border-stone-200/80">
              <div className="font-mono text-xs text-[#C84B31] tracking-widest uppercase">
                TIER 02
              </div>
              <div className="font-display-custom font-medium text-2xl sm:text-3xl md:text-4xl text-[#C84B31] mt-1 tracking-tight">
                0 NPR
              </div>
              <p className="text-xs text-stone-500 mt-1 font-sans-custom">100% Free Natural Colors from Nature</p>
            </div>

            <div className="p-2 sm:border-r border-stone-200/80">
              <div className="font-mono text-xs text-stone-400 tracking-widest uppercase">
                TIER 03
              </div>
              <div className="font-display-custom font-medium text-2xl sm:text-3xl md:text-4xl text-stone-900 mt-1 tracking-tight">
                Video Classes
              </div>
              <p className="text-xs text-stone-500 mt-1 font-sans-custom">Watch & Learn at Your Own Pace</p>
            </div>

            <div className="p-2">
              <div className="font-mono text-xs text-stone-400 tracking-widest uppercase">
                TIER 04
              </div>
              <div className="font-display-custom font-medium text-2xl sm:text-3xl md:text-4xl text-stone-900 mt-1 tracking-tight">
                Online Canvas
              </div>
              <p className="text-xs text-stone-500 mt-1 font-sans-custom">Draw Directly on Your Screen</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
