import React, { useState } from 'react';
import { Video, Play, Clock, Sparkles, ArrowRight } from 'lucide-react';
import { useAdminContent } from '../context/AdminContentContext';
import { ArtMediaCategory, ArtMediaVideo } from '../types';

interface ArtContentSectionProps {
  onSelectVideo: (video: ArtMediaVideo) => void;
  onOpenCanvasWithVideo: (videoTitle: string) => void;
}

export const ArtContentSection: React.FC<ArtContentSectionProps> = ({
  onSelectVideo,
  onOpenCanvasWithVideo
}) => {
  const { videos } = useAdminContent();
  const [selectedCategory, setSelectedCategory] = useState<ArtMediaCategory>('all');

  const filteredVideos = videos.filter((video) => {
    if (selectedCategory === 'all') return true;
    return video.category === selectedCategory;
  });

  const masterclassCount = videos.filter(v => v.category === 'masterclass').length;
  const wellnessCount = videos.filter(v => v.category === 'wellness').length;

  return (
    <section id="contents" className="py-16 md:py-24 bg-white border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-stone-200/80">
          <div className="space-y-3 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF8F5] text-stone-700 text-xs font-mono tracking-widest uppercase border border-stone-300/80 shadow-2xs">
              <Video className="w-3.5 h-3.5 text-[#C84B31]" />
              <span>STATION 02 // VIDEO CLASSES</span>
            </div>
            <h2 className="font-display-custom font-normal text-3xl sm:text-4xl md:text-5xl text-stone-900 tracking-tight">
              Video Classes & Studio Workshops
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-sans-custom">
              Watch artists show you how to paint, draw, and create step by step. Learn how to work with natural tea washes, firewood charcoal, and ink from the comfort of home or school.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="w-full md:w-auto overflow-x-auto no-scrollbar py-1">
            <div className="inline-flex items-center gap-1.5 bg-[#FAF8F5] p-1.5 rounded-2xl border border-stone-300/80 min-w-max shadow-2xs">
              {[
                { id: 'all', label: 'All Videos', count: videos.length },
                { id: 'masterclass', label: 'Studio Classes', count: masterclassCount },
                { id: 'wellness', label: 'Relaxation & Art', count: wellnessCount },
              ].map((tab) => (
                <button
                  key={tab.id}
                  id={`filter-video-${tab.id}`}
                  onClick={() => setSelectedCategory(tab.id as ArtMediaCategory)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 whitespace-nowrap select-none ${
                    selectedCategory === tab.id
                      ? 'bg-white text-stone-900 font-semibold shadow-2xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                    selectedCategory === tab.id ? 'bg-[#C84B31] text-white' : 'bg-stone-200 text-stone-700'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Video Cards Grid */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8">
          {filteredVideos.map((video, idx) => (
            <div
              key={video.id}
              id={`video-card-${video.id}`}
              className="group art-matting bg-white rounded-3xl border border-stone-200/90 hover:border-stone-300 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden text-left"
            >
              <div>
                {/* Thumbnail with Video Play Overlay */}
                <div 
                  onClick={() => onSelectVideo(video)}
                  className="relative aspect-16/10 overflow-hidden bg-stone-900 cursor-pointer"
                >
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Category Badge & Duration */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-mono tracking-wider bg-stone-900/85 backdrop-blur-xs text-white uppercase">
                      {video.categoryLabel}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-900/85 backdrop-blur-xs text-white text-[10px] font-mono font-medium">
                    <Clock className="w-3 h-3 text-[#C84B31]" />
                    <span>{video.duration}</span>
                  </div>

                  {/* Center Play Icon on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-85 group-hover:opacity-100 transition-opacity">
                    <div className="w-14 h-14 rounded-full bg-white text-stone-900 flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-[#C84B31] group-hover:text-white transition-all">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Recommendation pill bottom left */}
                  <div className="absolute bottom-3 left-3">
                    <span className="text-[11px] font-mono text-stone-200 uppercase tracking-wider">
                      {video.gradeRecommendation}
                    </span>
                  </div>
                </div>

                {/* Video Info Body */}
                <div className="p-6 sm:p-7 space-y-4">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">
                      VIDEO #{String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 
                    onClick={() => onSelectVideo(video)}
                    className="font-display-custom font-medium text-xl sm:text-2xl text-stone-900 group-hover:text-[#C84B31] transition-colors cursor-pointer line-clamp-2 leading-snug tracking-tight"
                  >
                    {video.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed">
                    {video.description}
                  </p>

                  {/* Key Takeaway box */}
                  <div className="p-4 rounded-xl bg-[#FAF8F5] border-l-2 border-[#C84B31] text-xs text-stone-700 leading-relaxed space-y-1">
                    <span className="font-mono text-[10px] text-stone-500 uppercase tracking-wider block">
                      Artist's Advice:
                    </span>
                    <p className="font-serif-custom italic text-stone-800 text-xs sm:text-sm leading-relaxed">
                      "{video.keyTakeaway}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Footer: Instructor & Actions */}
              <div className="px-6 pb-6 pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src={video.instructor.avatar}
                    alt={video.instructor.name}
                    className="w-8 h-8 rounded-full object-cover border border-stone-200"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-stone-900 truncate">
                      {video.instructor.name}
                    </div>
                    <div className="text-[10px] text-stone-500 truncate font-mono">
                      {video.instructor.role}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onOpenCanvasWithVideo(video.title)}
                    className="p-2.5 rounded-xl text-stone-500 hover:text-[#C84B31] hover:bg-[#FAF8F5] transition-colors"
                    title="Practice this on Canvas"
                  >
                    <Sparkles className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onSelectVideo(video)}
                    className="px-4 py-2 rounded-xl bg-[#1C1917] hover:bg-[#C84B31] text-white text-xs font-medium transition-colors flex items-center gap-1.5 shadow-2xs"
                  >
                    <span>Watch Video</span>
                    <Play className="w-3 h-3 fill-current ml-0.5" />
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
