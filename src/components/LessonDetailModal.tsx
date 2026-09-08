import React, { useState } from 'react';
import { 
  X, Play, Pause, RotateCcw, Volume2, VolumeX, Maximize2, 
  Sparkles, Clock, Compass, BookOpen, CheckCircle, 
  Download, Printer, Heart, Share2, Layers, AlertCircle
} from 'lucide-react';
import { Lesson, LessonChapter } from '../types';

interface LessonDetailModalProps {
  lesson: Lesson | null;
  onClose: () => void;
  onOpenCanvasWithLesson: (lessonTitle: string) => void;
}

export const LessonDetailModal: React.FC<LessonDetailModalProps> = ({
  lesson,
  onClose,
  onOpenCanvasWithLesson
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTimeSec, setCurrentTimeSec] = useState<number>(45);
  const [currentChapterIndex, setCurrentChapterIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'studio' | 'materials' | 'steps' | 'reflection'>('studio');
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  if (!lesson) return null;

  const totalDurationSec = 14 * 60 + 20; // Simulated 14:20
  const progressPercent = (currentTimeSec / totalDurationSec) * 100;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setCurrentTimeSec(val);
  };

  const handlePrintGuide = () => {
    window.print();
  };

  return (
    <div
      id="lesson-detail-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-stone-900/60 backdrop-blur-xs transition-all duration-300 animate-in fade-in"
    >
      <div className="relative w-full max-w-5xl h-[94vh] max-h-[950px] bg-white rounded-3xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden text-left">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-stone-200 bg-stone-50/90">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#D95338] text-white shadow-xs">
              {lesson.gradeDisplay}
            </span>
            <div className="h-4 w-px bg-stone-200" />
            <span className="text-xs font-medium text-stone-500 font-mono uppercase tracking-wider">
              {lesson.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="bookmark-lesson-btn"
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-2 rounded-xl border transition-all ${
                isBookmarked
                  ? 'bg-[#D95338]/10 border-[#D95338]/30 text-[#D95338]'
                  : 'bg-white border-stone-200 text-stone-500 hover:text-stone-900'
              }`}
              title="Bookmark for weekly lesson"
            >
              <Heart className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            <button
              id="print-lesson-btn"
              onClick={handlePrintGuide}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-stone-200 bg-white text-xs font-medium text-stone-700 hover:bg-stone-50 transition-colors"
              title="Print offline lesson sheet"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Guide</span>
            </button>

            <button
              id="close-lesson-detail-btn"
              onClick={onClose}
              className="p-2 rounded-xl text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto">
          {/* Video Player Experience */}
          <div className="relative bg-stone-950 text-white w-full aspect-video max-h-[220px] sm:max-h-[320px] md:max-h-[420px] flex items-center justify-center overflow-hidden group">
            {/* Background Simulated Video Image */}
            <img
              src={lesson.videoPoster}
              alt={lesson.title}
              className={`w-full h-full object-cover transition-opacity duration-700 ${
                isPlaying ? 'opacity-90 scale-102' : 'opacity-65'
              }`}
            />

            {/* Ambient Dark Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />

            {/* Active Chapter Watermark Overlay */}
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 bg-stone-900/80 backdrop-blur-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl border border-white/10 text-[11px] sm:text-xs flex items-center gap-2 max-w-[85%]">
              <span className="w-2 h-2 rounded-full bg-[#D95338] animate-ping shrink-0" />
              <span className="font-medium text-white/90 truncate">
                Chapter {currentChapterIndex + 1}: {lesson.chapters[currentChapterIndex]?.title || 'Lesson Stream'}
              </span>
            </div>

            {/* Play Button Overlay (when paused) */}
            {!isPlaying && (
              <button
                id="video-play-center-btn"
                onClick={() => setIsPlaying(true)}
                className="absolute z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/90 hover:bg-white text-stone-900 shadow-2xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95 group/play"
              >
                <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current ml-1 text-[#D95338]" />
              </button>
            )}

            {/* Video Controls Bar */}
            <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col gap-1.5 sm:gap-2 z-10">
              {/* Timeline Bar */}
              <div className="relative flex items-center">
                <input
                  id="video-timeline-scrubber"
                  type="range"
                  min="0"
                  max={totalDurationSec}
                  value={currentTimeSec}
                  onChange={handleSeek}
                  className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#D95338]"
                />
              </div>

              {/* Controls and chapters */}
              <div className="flex items-center justify-between text-xs text-white/80">
                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    id="video-play-toggle-btn"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1 hover:text-white transition-colors"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                  </button>

                  <div className="font-mono text-[10px] sm:text-[11px] text-white/90">
                    {formatTime(currentTimeSec)} / {lesson.videoDuration}
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-4">
                  <span className="text-[11px] text-white/60 hidden md:inline">
                    Interactive Teaching Session
                  </span>
                  <button
                    id="launch-studio-from-video-btn"
                    onClick={() => onOpenCanvasWithLesson(lesson.title)}
                    className="px-2.5 sm:px-3 py-1 rounded-lg bg-[#D95338] hover:bg-[#C2452D] text-white font-medium text-[11px] sm:text-xs flex items-center gap-1.5 shadow-xs transition-transform active:scale-95"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Practice on Canvas</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Chapters Navigation Pill Bar */}
          <div className="bg-stone-100/90 border-b border-stone-200 px-4 sm:px-6 py-2.5 overflow-x-auto no-scrollbar flex items-center gap-2">
            <span className="text-[11px] font-medium text-stone-500 uppercase tracking-wider whitespace-nowrap mr-2">
              Timeline:
            </span>
            {lesson.chapters.map((ch, idx) => (
              <button
                key={ch.id}
                id={`chapter-jump-${idx}`}
                onClick={() => {
                  setCurrentChapterIndex(idx);
                  const [m, s] = ch.time.split(':').map(Number);
                  setCurrentTimeSec((m || 0) * 60 + (s || 0));
                }}
                className={`px-3 py-1 rounded-full text-xs whitespace-nowrap transition-all flex items-center gap-1.5 select-none ${
                  currentChapterIndex === idx
                    ? 'bg-stone-900 text-white font-medium shadow-xs'
                    : 'bg-white text-stone-700 hover:bg-stone-50 border border-stone-200/80'
                }`}
              >
                <span className="font-mono text-[10px] text-stone-400">{ch.time}</span>
                <span>{ch.title}</span>
              </button>
            ))}
          </div>

          {/* Lesson Info Header & Tabs */}
          <div className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto space-y-5 sm:space-y-6">
            <div className="space-y-2">
              <h2 className="font-display-custom text-xl sm:text-2xl md:text-3xl font-bold text-stone-900">
                {lesson.title}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {lesson.description}
              </p>
            </div>

            {/* Emotional Wellness Anchor Card */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-semibold text-amber-800 uppercase tracking-wider">
                  Weekly Creative Focus
                </h4>
                <p className="text-xs sm:text-sm text-stone-700 mt-0.5 leading-relaxed font-serif-custom italic">
                  {lesson.emotionalGoal}
                </p>
              </div>
            </div>

            {/* Content Tabs */}
            <div className="border-b border-stone-200 flex items-center gap-4 sm:gap-6 text-xs sm:text-sm overflow-x-auto no-scrollbar">
              {[
                { id: 'studio', label: "What You'll Learn" },
                { id: 'materials', label: 'Free Everyday Materials' },
                { id: 'steps', label: 'Step-by-Step Guide' },
                { id: 'reflection', label: 'Questions & Reflections' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  id={`lesson-tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`pb-3 font-medium transition-all relative whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'text-stone-900 font-semibold'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#D95338]" />
                  )}
                </button>
              ))}
            </div>

            {/* Tab 1: Objectives & Instructor */}
            {activeTab === 'studio' && (
              <div className="space-y-6 animate-in fade-in">
                <div>
                  <h4 className="font-display-custom font-semibold text-base text-stone-900 mb-3">
                    What You Will Discover:
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {lesson.learningObjectives.map((obj, i) => (
                      <div key={i} className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80">
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-stone-700">{obj}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Facilitator Card */}
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-center gap-4">
                  <img
                    src={lesson.instructor.avatar}
                    alt={lesson.instructor.name}
                    className="w-14 h-14 rounded-full object-cover border border-stone-200"
                  />
                  <div>
                    <span className="text-[11px] font-medium text-stone-500 uppercase tracking-wider">
                      Educator & Mentor
                    </span>
                    <h5 className="font-display-custom font-bold text-base text-stone-900">
                      {lesson.instructor.name}
                    </h5>
                    <p className="text-xs text-stone-600">
                      {lesson.instructor.role} • {lesson.instructor.location}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Zero-Budget Materials */}
            {activeTab === 'materials' && (
              <div className="space-y-4 animate-in fade-in">
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                  <p className="text-xs text-stone-700">
                    <strong>Never let money stop you from creating.</strong> If you do not have art shop supplies, use these kitchen and backyard alternatives used by generations of traditional Nepali artisans!
                  </p>
                </div>

                <div className="space-y-3">
                  {lesson.zeroBudgetMaterials.map((mat, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#D95338]" />
                          <h5 className="font-semibold text-sm text-stone-900">
                            Zero-Cost Alternative: {mat.nepaliAlternative}
                          </h5>
                        </div>
                        <span className="text-xs text-stone-500 bg-white px-2.5 py-0.5 rounded-full border border-stone-200">
                          Replaces: {mat.standard}
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 leading-relaxed pl-4 border-l-2 border-[#D95338]">
                        <strong>How to prepare at home:</strong> {mat.howToPrepare}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Steps */}
            {activeTab === 'steps' && (
              <div className="space-y-4 animate-in fade-in">
                {lesson.steps.map((step) => (
                  <div key={step.number} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center font-mono text-sm shrink-0">
                      {step.number}
                    </div>
                    <div className="space-y-1.5 flex-1">
                      <h5 className="font-display-custom font-bold text-base text-stone-900">
                        {step.title}
                      </h5>
                      <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                        {step.action}
                      </p>
                      <div className="p-2.5 rounded-xl bg-white text-[11px] sm:text-xs text-stone-600 font-serif-custom italic border border-stone-200">
                        💡 <strong>Inner Mindset:</strong> {step.mindsetTip}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 4: Reflection */}
            {activeTab === 'reflection' && (
              <div className="space-y-4 animate-in fade-in">
                <p className="text-xs text-stone-600">
                  When you finish your piece, write these down in a private notebook or talk about them with a friend:
                </p>
                <div className="space-y-2.5">
                  {lesson.reflectionQuestions.map((q, i) => (
                    <div key={i} className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-3">
                      <span className="font-mono text-sm font-bold text-[#D95338]">Q{i + 1}.</span>
                      <p className="text-xs sm:text-sm text-stone-700">{q}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTA Bar */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <div className="text-xs text-stone-500 hidden sm:block">
            Estimated time: <strong className="text-stone-900">{lesson.duration}</strong> • Difficulty: <strong className="text-stone-900">{lesson.difficulty}</strong>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              id="bottom-close-lesson-btn"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900"
            >
              Back to Catalog
            </button>
            <button
              id="bottom-launch-canvas-btn"
              onClick={() => onOpenCanvasWithLesson(lesson.title)}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-[#D95338] hover:bg-[#C2452D] text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-transform active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>Open Drawing Studio</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
