import React, { useState } from 'react';
import { Play, Clock, Layers, ArrowRight, BookOpen, Brush } from 'lucide-react';
import { useAdminContent } from '../context/AdminContentContext';
import { GradeLevel, Lesson } from '../types';
import { BrushStrokeHighlight, ArtisticPaintDab } from './PainterlyBrushBackground';

interface CurriculumSectionProps {
  onSelectLesson: (lesson: Lesson) => void;
  onOpenCanvasWithLesson: (lessonTitle: string) => void;
}

export const CurriculumSection: React.FC<CurriculumSectionProps> = ({
  onSelectLesson,
  onOpenCanvasWithLesson
}) => {
  const { lessons } = useAdminContent();
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>('all');

  const filteredLessons = lessons.filter((lesson) => {
    if (selectedGrade === 'all') return true;
    return lesson.gradeLevel === selectedGrade;
  });

  const primaryCount = lessons.filter(l => l.gradeLevel === 'primary').length;
  const middleCount = lessons.filter(l => l.gradeLevel === 'middle').length;
  const highCount = lessons.filter(l => l.gradeLevel === 'high').length;

  return (
    <section id="curriculum" className="py-16 md:py-24 bg-[#F0F8F5]/80 backdrop-blur-xs border-b border-[#D4ECE1] relative overflow-hidden">
      {/* Decorative paint marks */}
      <ArtisticPaintDab className="absolute top-8 right-10 hidden lg:block opacity-60" size={80} />
      <ArtisticPaintDab className="absolute bottom-12 -left-6 hidden md:block opacity-50" size={90} />

      <div className="studio-container relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#D4ECE1]">
          <div className="space-y-3 max-w-2xl xl:max-w-3xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-stone-700 text-xs font-mono tracking-widest uppercase border border-[#D4ECE1] shadow-2xs">
              <Layers className="w-3.5 h-3.5 text-[#C84B31]" />
              <span>ART LESSONS</span>
            </div>
            <h2 className="font-display-custom font-normal text-3xl sm:text-4xl md:text-5xl text-stone-900 tracking-tight relative">
              Art Lessons for{' '}
              <span className="font-medium text-stone-900 relative inline-block">
                Grades 1 to 10
                <BrushStrokeHighlight
                  variant="mint"
                  className="absolute -bottom-1 left-0 w-full h-4 sm:h-5 -z-10"
                />
              </span>
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-sans-custom">
              Step-by-step drawing lessons for students across Nepal. Learn skills, have fun, and express your creative ideas.
            </p>
          </div>

          {/* Level Filter Tabs */}
          <div className="w-full md:w-auto overflow-x-auto no-scrollbar py-1">
            <div className="inline-flex items-center gap-1.5 bg-[#E4F4EC] p-1.5 rounded-2xl border border-[#CCE8DB] min-w-max shadow-2xs">
              {[
                { id: 'all', label: 'All Grades (1–10)', count: lessons.length },
                { id: 'primary', label: 'Grades 1–5 (Primary)', count: primaryCount },
                { id: 'middle', label: 'Grades 6–8 (Middle)', count: middleCount },
                { id: 'high', label: 'Grades 9–10 (High School)', count: highCount },
              ].map((tab) => (
                <button
                  key={tab.id}
                  id={`filter-curriculum-${tab.id}`}
                  onClick={() => setSelectedGrade(tab.id as GradeLevel)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 whitespace-nowrap select-none ${
                    selectedGrade === tab.id
                      ? 'bg-white text-stone-900 font-semibold shadow-2xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                    selectedGrade === tab.id ? 'bg-[#C84B31] text-white' : 'bg-stone-200 text-stone-700'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 xl:gap-7 2xl:gap-8">
          {filteredLessons.map((lesson, idx) => (
            <div
              key={lesson.id}
              id={`lesson-card-${lesson.id}`}
              className="group art-matting bg-white rounded-3xl border border-stone-200/90 hover:border-stone-300 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden text-left"
            >
              <div>
                {/* Thumbnail with Video Play Badge */}
                <div 
                  onClick={() => onSelectLesson(lesson)}
                  className="relative aspect-16/10 overflow-hidden bg-stone-100 cursor-pointer"
                >
                  <img
                    src={lesson.thumbnailUrl}
                    alt={lesson.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-mono tracking-wider bg-stone-900/85 text-white backdrop-blur-xs uppercase">
                      {lesson.gradeDisplay}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-medium bg-stone-900/85 text-white backdrop-blur-xs flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-[#C84B31]" />
                      {lesson.videoDuration}
                    </span>
                  </div>

                  {/* Play Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-85 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-white group-hover:bg-[#C84B31] text-stone-900 group-hover:text-white flex items-center justify-center shadow-lg transition-all group-hover:scale-110">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Category Pill on bottom */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <span className="text-[11px] font-mono text-stone-200 uppercase tracking-widest">
                      {lesson.category}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 sm:p-6 space-y-3.5">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">
                      LESSON #{String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 
                    onClick={() => onSelectLesson(lesson)}
                    className="font-display-custom font-medium text-xl sm:text-2xl text-stone-900 group-hover:text-[#C84B31] transition-colors cursor-pointer line-clamp-1 leading-snug tracking-tight"
                  >
                    {lesson.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-2">
                    {lesson.description}
                  </p>

                  {/* Expressive Focus Card */}
                  <div className="p-3.5 rounded-xl bg-[#F2FAF6] border-l-2 border-[#C84B31] text-xs text-stone-700 space-y-1">
                    <span className="font-mono text-[10px] text-stone-500 uppercase tracking-wider block">
                      What you'll discover:
                    </span>
                    <span className="line-clamp-2 italic font-serif-custom text-stone-800 text-xs leading-relaxed">
                      "{lesson.emotionalGoal}"
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-5 sm:p-6 pt-0 border-t border-stone-100 flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  <img
                    src={lesson.instructor.avatar}
                    alt={lesson.instructor.name}
                    className="w-7 h-7 rounded-full object-cover border border-stone-200"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-xs font-medium text-stone-700">
                    {lesson.instructor.name}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    id={`open-lesson-btn-${lesson.id}`}
                    onClick={() => onSelectLesson(lesson)}
                    className="px-3.5 py-1.5 rounded-xl bg-[#1C1917] hover:bg-[#C84B31] text-white text-xs font-medium transition-colors flex items-center gap-1.5 shadow-2xs"
                  >
                    <span>Start Lesson</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
