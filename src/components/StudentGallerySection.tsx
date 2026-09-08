import React, { useState } from 'react';
import { Sparkles, Heart, MapPin, Plus, X, Award, Eye, ArrowRight } from 'lucide-react';
import { StudentArtwork } from '../types';

interface StudentGallerySectionProps {
  artworks: StudentArtwork[];
  onOpenCanvas: () => void;
  onLikeArtwork: (id: string) => void;
}

export const StudentGallerySection: React.FC<StudentGallerySectionProps> = ({
  artworks,
  onOpenCanvas,
  onLikeArtwork
}) => {
  const [selectedArtwork, setSelectedArtwork] = useState<StudentArtwork | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filtered = artworks.filter((item) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'high') return item.grade.includes('10') || item.grade.includes('11') || item.grade.includes('12') || item.grade.includes('High') || item.grade.includes('Secondary');
    if (activeFilter === 'middle') return item.grade.includes('6') || item.grade.includes('7') || item.grade.includes('8') || item.grade.includes('Middle');
    if (activeFilter === 'primary') return item.grade.includes('1') || item.grade.includes('2') || item.grade.includes('3') || item.grade.includes('4') || item.grade.includes('5') || item.grade.includes('Primary');
    return true;
  });

  return (
    <section id="gallery" className="py-16 md:py-24 bg-[#FAF8F5] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-stone-200/80">
          <div className="space-y-3 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white text-stone-700 text-xs font-mono tracking-widest uppercase border border-stone-300/80 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#C84B31]" />
              <span>STATION 04 // STUDENT ART GALLERY</span>
            </div>
            <h2 className="font-display-custom font-normal text-3xl sm:text-4xl md:text-5xl text-stone-900 tracking-tight">
              Artworks Created by Nepali Students
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-sans-custom">
              Bright, honest art created by children and youth sharing their stories, dreams, and surroundings. Each piece celebrates personal creativity and pride from schools across Nepal.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full md:w-auto">
            {/* Filter buttons */}
            <div className="overflow-x-auto no-scrollbar py-1">
              <div className="inline-flex items-center gap-1.5 bg-[#F2ECE1]/80 p-1.5 rounded-2xl border border-stone-300/80 min-w-max shadow-2xs">
                {[
                  { id: 'all', label: 'All Artworks' },
                  { id: 'primary', label: 'Grades 1–5 (Primary)' },
                  { id: 'middle', label: 'Grades 6–8 (Middle)' },
                  { id: 'high', label: 'Grades 9–10 (High School)' },
                ].map((f) => (
                  <button
                    key={f.id}
                    id={`filter-gallery-${f.id}`}
                    onClick={() => setActiveFilter(f.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                      activeFilter === f.id
                        ? 'bg-white text-stone-900 font-semibold shadow-2xs'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              id="gallery-submit-art-btn"
              onClick={onOpenCanvas}
              className="px-4 py-2.5 rounded-xl bg-[#C84B31] hover:bg-[#B33E26] text-white text-xs font-medium flex items-center justify-center gap-1.5 shadow-2xs hover:shadow-md transition-all active:scale-95 shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Open Drawing Canvas</span>
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {filtered.map((item, idx) => (
            <div
              key={item.id}
              id={`student-art-card-${item.id}`}
              className="group art-matting bg-white rounded-3xl border border-stone-200/90 hover:border-stone-300 shadow-2xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between text-left"
            >
              <div>
                {/* Image Matting */}
                <div
                  onClick={() => setSelectedArtwork(item)}
                  className="relative aspect-4/3 overflow-hidden bg-stone-950 cursor-pointer"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95 group-hover:opacity-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider bg-stone-900/85 text-white backdrop-blur-xs">
                      {item.grade}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-medium bg-stone-900/85 text-white backdrop-blur-xs flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#C84B31]" />
                      {item.location}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="font-display-custom font-medium text-lg sm:text-xl text-white line-clamp-1 leading-snug tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-stone-200 font-serif-custom italic mt-0.5">
                      by {item.artist}, {item.age} yrs
                    </p>
                  </div>
                </div>

                {/* Story & Medium */}
                <div className="p-5 sm:p-6 space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">
                      ARTWORK #{String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] font-mono text-stone-500">
                      {item.date}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-600 font-serif-custom italic leading-relaxed line-clamp-3">
                    "{item.story}"
                  </p>

                  <div className="pt-2 border-t border-stone-100 text-[11px] text-stone-500 font-sans-custom">
                    <span className="line-clamp-1">
                      <strong className="text-stone-800 font-semibold">Materials:</strong> {item.medium}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="p-5 pt-0 border-t border-stone-100 flex items-center justify-between mt-2">
                <button
                  id={`like-btn-${item.id}`}
                  onClick={() => onLikeArtwork(item.id)}
                  className="flex items-center gap-1.5 text-xs font-medium text-stone-600 hover:text-[#C84B31] transition-colors group/like min-h-[36px] py-1"
                  title="Send encouragement"
                >
                  <Heart className="w-4 h-4 text-[#C84B31] fill-[#C84B31]/20 group-hover/like:fill-[#C84B31] transition-colors" />
                  <span>{item.likes} Likes</span>
                </button>

                <button
                  id={`read-story-btn-${item.id}`}
                  onClick={() => setSelectedArtwork(item)}
                  className="px-3.5 py-1.5 rounded-xl bg-[#1C1917] hover:bg-[#C84B31] text-white text-xs font-medium transition-colors min-h-[32px] flex items-center gap-1 shadow-2xs"
                >
                  <span>View Artwork</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Single Artwork Detail Modal */}
      {selectedArtwork && (
        <div
          id="artwork-detail-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-stone-950/75 backdrop-blur-xs animate-in fade-in"
        >
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-stone-200/90 overflow-hidden flex flex-col md:flex-row max-h-[92vh] sm:max-h-[88vh]">
            {/* Artwork Image */}
            <div className="md:w-1/2 bg-stone-950 flex items-center justify-center relative min-h-[220px] sm:min-h-[260px] md:min-h-[400px] shrink-0 p-4">
              <img
                src={selectedArtwork.imageUrl}
                alt={selectedArtwork.title}
                className="w-full h-full object-contain max-h-[400px] rounded-lg shadow-lg"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Details Column */}
            <div className="md:w-1/2 p-6 sm:p-7 flex flex-col justify-between overflow-y-auto space-y-4 text-left bg-[#FAF8F5]">
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider bg-stone-900 text-stone-100">
                    {selectedArtwork.grade} • {selectedArtwork.location}
                  </span>
                  <button
                    id="close-art-detail-btn"
                    onClick={() => setSelectedArtwork(null)}
                    className="p-1.5 text-stone-400 hover:text-stone-800 rounded-lg hover:bg-stone-200/60 transition-colors"
                    aria-label="Close details"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div>
                  <h3 className="font-display-custom font-bold text-2xl text-stone-900 leading-snug">
                    {selectedArtwork.title}
                  </h3>
                  <p className="font-editorial-custom italic text-lg text-[#C84B31] mt-0.5">
                    By {selectedArtwork.artist}, age {selectedArtwork.age}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-stone-200/80 space-y-1.5 shadow-2xs">
                  <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest block">
                    The Artist's Story:
                  </span>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-serif-custom italic">
                    "{selectedArtwork.story}"
                  </p>
                </div>

                <div className="text-xs text-stone-600 space-y-1.5 font-sans-custom">
                  <div>
                    <strong className="text-stone-900 font-semibold">Materials:</strong> {selectedArtwork.medium}
                  </div>
                  <div>
                    <strong className="text-stone-900 font-semibold">Date Added:</strong> {selectedArtwork.date}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedArtwork.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-md bg-white border border-stone-200 text-[10px] font-mono text-stone-600 uppercase"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Action */}
              <div className="pt-4 border-t border-stone-200/80 flex items-center justify-between">
                <button
                  id="modal-like-artwork-btn"
                  onClick={() => onLikeArtwork(selectedArtwork.id)}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#C84B31] hover:bg-[#B33E26] text-white text-xs font-medium flex items-center justify-center gap-2 shadow-2xs transition-all active:scale-95 min-h-[42px]"
                >
                  <Heart className="w-4 h-4 fill-current" />
                  <span>Like this Artwork ({selectedArtwork.likes})</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
