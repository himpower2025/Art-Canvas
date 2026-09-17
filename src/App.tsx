import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { AboutSection } from './components/AboutSection';
import { WeeklyPromptBanner } from './components/WeeklyPromptBanner';
import { CurriculumSection } from './components/CurriculumSection';
import { ArtContentSection } from './components/ArtContentSection';
import { StudentGallerySection } from './components/StudentGallerySection';
import { LessonDetailModal } from './components/LessonDetailModal';
import { VideoContentModal } from './components/VideoContentModal';
import { ExpressiveCanvasModal } from './components/ExpressiveCanvasModal';
import { ZeroBudgetGuideModal } from './components/ZeroBudgetGuideModal';
import { Footer } from './components/Footer';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminPortalModal } from './components/admin/AdminPortalModal';
import { AdminContentProvider, useAdminContent } from './context/AdminContentContext';
import { Lesson, StudentArtwork, ArtMediaVideo } from './types';
import { ShieldCheck } from 'lucide-react';

function StudioApp() {
  const { artworks, addArtwork, likeArtwork, isAdmin, adminEmail } = useAdminContent();
  const [activeSection, setActiveSection] = useState<string>('about');
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<ArtMediaVideo | null>(null);
  const [isCanvasOpen, setIsCanvasOpen] = useState<boolean>(false);
  const [canvasPromptTitle, setCanvasPromptTitle] = useState<string>('Free Expression: Authentic Voice & Discovery');
  const [isZeroBudgetGuideOpen, setIsZeroBudgetGuideOpen] = useState<boolean>(false);

  // Admin Portal Modals
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState<boolean>(false);
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState<boolean>(false);

  // Smooth scroll handler for the 4 core sections
  const handleSelectSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'about' || sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenCanvas = (promptTitle?: string) => {
    if (promptTitle) {
      setCanvasPromptTitle(promptTitle);
    } else {
      setCanvasPromptTitle('Free Expression: Authentic Voice & Discovery');
    }
    setIsCanvasOpen(true);
  };

  const handleArtworkSubmitted = (newArtwork: StudentArtwork) => {
    // Add via admin content store so it persists
    const { id, ...rest } = newArtwork;
    addArtwork(rest);
    // Scroll smoothly to gallery to see newly posted artwork
    setTimeout(() => {
      const galleryElem = document.getElementById('gallery');
      if (galleryElem) {
        galleryElem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#F0F8F5] text-[#141312] font-sans-custom flex flex-col selection:bg-[#FF3B20] selection:text-white relative">
      {/* Top Navigation */}
      <Navbar
        onOpenCanvas={() => handleOpenCanvas()}
        onOpenZeroBudgetGuide={() => setIsZeroBudgetGuideOpen(true)}
        onSelectSection={handleSelectSection}
        activeSection={activeSection}
      />

      {/* Main Experience Flow: 4 Core Stations + Weekly Prompt */}
      <main className="flex-1">
        {/* 1. Introduction to ArtStudio (About ArtStudio & 4 Stations) */}
        <AboutSection
          onOpenCanvas={() => handleOpenCanvas()}
          onExploreCurriculum={() => handleSelectSection('curriculum')}
          onExploreContents={() => handleSelectSection('contents')}
          onViewStudentSanctuary={() => handleSelectSection('gallery')}
          onOpenZeroBudgetGuide={() => setIsZeroBudgetGuideOpen(true)}
        />

        {/* Weekly Decompression Creative Prompt */}
        <WeeklyPromptBanner
          onOpenCanvasWithPrompt={(title) => handleOpenCanvas(`Weekly Prompt: ${title}`)}
        />

        {/* 2. Curriculum by Grade (Grades 1-5 / 6-8 / 9-10) */}
        <CurriculumSection
          onSelectLesson={(lesson) => setSelectedLesson(lesson)}
          onOpenCanvasWithLesson={(title) => handleOpenCanvas(`Lesson Practice: ${title}`)}
        />

        {/* 3. Art Video Library (Hands-on Video Content & Masterclasses) */}
        <ArtContentSection
          onSelectVideo={(video) => setSelectedVideo(video)}
          onOpenCanvasWithVideo={(title) => handleOpenCanvas(`Video Practice: ${title}`)}
        />

        {/* 4. Student Gallery (Artworks Created at ArtStudio) */}
        <StudentGallerySection
          artworks={artworks}
          onOpenCanvas={() => handleOpenCanvas()}
          onLikeArtwork={likeArtwork}
        />
      </main>

      {/* Footer with Admin Portal trigger at bottom */}
      <Footer
        onOpenCanvas={() => handleOpenCanvas()}
        onOpenZeroBudgetGuide={() => setIsZeroBudgetGuideOpen(true)}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
        onOpenAdminPortal={() => setIsAdminPortalOpen(true)}
      />

      {/* Floating Admin Pill at bottom right if authenticated */}
      {isAdmin && (
        <div className="fixed bottom-5 right-5 z-40 animate-fade-in">
          <button
            onClick={() => setIsAdminPortalOpen(true)}
            className="px-4 py-2.5 rounded-2xl bg-[#1C1917] hover:bg-stone-900 text-white shadow-xl border border-stone-700 flex items-center gap-2 text-xs font-medium cursor-pointer transition-all hover:scale-105 active:scale-95"
            title="Open Admin Portal"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <ShieldCheck className="w-4 h-4 text-[#D95338]" />
            <span>Admin Portal</span>
          </button>
        </div>
      )}

      {/* Admin Login Dialog */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={() => {
          setIsAdminLoginOpen(false);
          setIsAdminPortalOpen(true);
        }}
      />

      {/* Admin Portal Dashboard Modal */}
      <AdminPortalModal
        isOpen={isAdminPortalOpen}
        onClose={() => setIsAdminPortalOpen(false)}
        onOpenCanvasWithLesson={(title) => handleOpenCanvas(`Lesson: ${title}`)}
      />

      {/* Immersive Lesson Detail Modal with Step Guide */}
      <LessonDetailModal
        lesson={selectedLesson}
        onClose={() => setSelectedLesson(null)}
        onOpenCanvasWithLesson={(title) => {
          setSelectedLesson(null);
          handleOpenCanvas(`Lesson Practice: ${title}`);
        }}
      />

      {/* Rich Video Content Player Modal */}
      <VideoContentModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
        onOpenCanvasWithVideo={(title) => {
          setSelectedVideo(null);
          handleOpenCanvas(`Video Practice: ${title}`);
        }}
      />

      {/* Interactive Expressive Drawing Studio Canvas */}
      <ExpressiveCanvasModal
        isOpen={isCanvasOpen}
        onClose={() => setIsCanvasOpen(false)}
        onArtworkSubmitted={handleArtworkSubmitted}
        initialPromptTitle={canvasPromptTitle}
      />

      {/* Zero-Budget Art Kit Guide Modal */}
      <ZeroBudgetGuideModal
        isOpen={isZeroBudgetGuideOpen}
        onClose={() => setIsZeroBudgetGuideOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AdminContentProvider>
      <StudioApp />
    </AdminContentProvider>
  );
}
