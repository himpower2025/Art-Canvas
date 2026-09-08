import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, Sparkles, Check, Clock, User, Compass, Tag } from 'lucide-react';
import { ArtMediaVideo } from '../types';

interface VideoContentModalProps {
  video: ArtMediaVideo | null;
  onClose: () => void;
  onOpenCanvasWithVideo: (videoTitle: string) => void;
}

export const VideoContentModal: React.FC<VideoContentModalProps> = ({
  video,
  onClose,
  onOpenCanvasWithVideo
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTimeSec, setCurrentTimeSec] = useState<number>(0);

  useEffect(() => {
    setCurrentTimeSec(0);
    setIsPlaying(true);
  }, [video]);

  // Video playback simulation timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying && video) {
      interval = setInterval(() => {
        setCurrentTimeSec((prev) => {
          if (prev >= video.durationSec) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, video]);

  if (!video) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = video.durationSec > 0 ? (currentTimeSec / video.durationSec) * 100 : 0;

  return (
    <div 
      id="video-content-modal-backdrop"
      className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-4xl xl:max-w-5xl max-h-[94vh] bg-white rounded-3xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden text-left">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 border-b border-stone-200 bg-stone-50/90">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#D95338]/10 text-[#D95338] whitespace-nowrap">
              {video.categoryLabel}
            </span>
            <h3 className="font-display-custom font-bold text-sm sm:text-base xl:text-lg text-stone-900 truncate">
              {video.title}
            </h3>
          </div>
          <button
            id="close-video-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-xl text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition-colors shrink-0 ml-2 flex items-center justify-center"
            aria-label="Close video"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Container */}
        <div className="flex-1 overflow-y-auto">
          <div className="relative bg-stone-950 text-white w-full aspect-video max-h-[220px] sm:max-h-[340px] md:max-h-[440px] xl:max-h-[520px] flex items-center justify-center overflow-hidden group">
            <img
              src={video.videoPoster}
              alt={video.title}
              className={`w-full h-full object-cover transition-opacity duration-500 ${
                isPlaying ? 'opacity-90 scale-102 transition-transform duration-1000' : 'opacity-60'
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

            {/* Simulated Center Play Button when paused */}
            {!isPlaying && (
              <button
                id="video-content-center-play-btn"
                onClick={() => setIsPlaying(true)}
                className="absolute z-10 w-16 h-16 rounded-full bg-white/90 hover:bg-white text-stone-900 shadow-2xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
              >
                <Play className="w-7 h-7 fill-current ml-1 text-[#D95338]" />
              </button>
            )}

            {/* Video Controls Bar */}
            <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex flex-col gap-1.5 sm:gap-2 z-10">
              {/* Scrubbing bar */}
              <div className="relative flex items-center">
                <input
                  type="range"
                  min="0"
                  max={video.durationSec}
                  value={currentTimeSec}
                  onChange={(e) => setCurrentTimeSec(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/30 rounded-lg appearance-none cursor-pointer accent-[#D95338]"
                />
              </div>

              {/* Bottom controls row */}
              <div className="flex items-center justify-between text-xs text-white/90">
                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1.5 hover:text-white transition-colors"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                  </button>
                  <span className="font-mono text-[11px] text-white/80">
                    {formatTime(currentTimeSec)} / {video.duration}
                  </span>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="hidden sm:inline text-[11px] text-white/60">
                    {video.gradeRecommendation}
                  </span>
                  <button
                    onClick={() => onOpenCanvasWithVideo(video.title)}
                    className="px-2.5 sm:px-3 py-1 rounded-lg bg-[#D95338] hover:bg-[#C2452D] text-white font-medium text-xs flex items-center gap-1.5 shadow-xs transition-transform active:scale-95"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Practice on Canvas</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Details & Chapters */}
          <div className="p-4 sm:p-6 md:p-8 space-y-6">
            <div className="space-y-2">
              <h2 className="font-display-custom text-xl sm:text-2xl md:text-3xl font-bold text-stone-900">
                {video.title}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {video.description}
              </p>
            </div>

            {/* Key Takeaway Banner */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-3">
              <Compass className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                  Key Learning Point
                </h4>
                <p className="text-xs sm:text-sm text-stone-800 mt-0.5 leading-relaxed font-medium">
                  {video.keyTakeaway}
                </p>
              </div>
            </div>

            {/* Timeline Chapters */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                Video Chapters (Click to Jump)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {video.chapters.map((ch, idx) => {
                  const [m, s] = ch.time.split(':').map(Number);
                  const jumpSec = (m || 0) * 60 + (s || 0);
                  const isCurrent = currentTimeSec >= jumpSec;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setCurrentTimeSec(jumpSec);
                        setIsPlaying(true);
                      }}
                      className={`p-3 rounded-2xl border text-left flex items-center justify-between text-xs transition-colors ${
                        isCurrent
                          ? 'bg-white border-[#D95338] shadow-xs'
                          : 'bg-stone-50 border-stone-200 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="font-mono text-[11px] font-semibold text-[#D95338] shrink-0">
                          {ch.time}
                        </span>
                        <span className="text-stone-800 truncate font-medium">
                          {ch.title}
                        </span>
                      </div>
                      <Play className="w-3 h-3 text-stone-400 shrink-0 ml-2" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Materials & Instructor */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-stone-200">
              {/* Materials */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                  Materials Needed (Local Everyday Items)
                </h4>
                <ul className="space-y-1.5">
                  {video.materialsNeeded.map((mat, i) => (
                    <li key={i} className="text-xs text-stone-600 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                      <span>{mat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
                <img
                  src={video.instructor.avatar}
                  alt={video.instructor.name}
                  className="w-11 h-11 rounded-full object-cover border border-stone-200"
                />
                <div>
                  <div className="text-xs font-medium text-stone-900">
                    {video.instructor.name}
                  </div>
                  <div className="text-[11px] text-stone-500">
                    {video.instructor.role}
                  </div>
                  <div className="text-[10px] text-emerald-700 font-medium mt-0.5">
                    CHOI Art Studio Faculty
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 sm:p-4 border-t border-stone-200 bg-stone-50/90 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            {video.tags.map((tag, i) => (
              <span key={i} className="px-2 py-0.5 rounded-md text-[10px] bg-white border border-stone-200 text-stone-600">
                #{tag}
              </span>
            ))}
          </div>
          <button
            onClick={() => onOpenCanvasWithVideo(video.title)}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#D95338] hover:bg-[#C2452D] text-white text-xs font-medium flex items-center justify-center gap-1.5 shadow-xs active:scale-95 min-h-[42px]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Practice on Studio Canvas</span>
          </button>
        </div>
      </div>
    </div>
  );
};
