import React, { useState } from 'react';
import { 
  ShieldCheck, 
  X, 
  Layers, 
  Video, 
  Sparkles, 
  Image as ImageIcon, 
  Settings, 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  RotateCcw, 
  Download, 
  Upload, 
  LogOut, 
  Check, 
  AlertCircle, 
  Eye, 
  Clock,
  KeyRound,
  Compass,
  FolderOpen
} from 'lucide-react';
import { useAdminContent } from '../../context/AdminContentContext';
import { Lesson, ArtMediaVideo, CreativePrompt, StudentArtwork, GradeLevel, ArtMediaCategory } from '../../types';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCanvasWithLesson?: (title: string) => void;
}

type AdminTab = 'curriculum' | 'videos' | 'prompt' | 'gallery' | 'settings';

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({
  isOpen,
  onClose,
  onOpenCanvasWithLesson
}) => {
  const {
    adminEmail,
    logout,
    updatePassword,
    lessons,
    videos,
    weeklyPrompt,
    artworks,
    addLesson,
    updateLesson,
    deleteLesson,
    addVideo,
    updateVideo,
    deleteVideo,
    updateWeeklyPrompt,
    addArtwork,
    updateArtwork,
    deleteArtwork,
    resetToDefaults,
    exportBackupJSON,
    importBackupJSON
  } = useAdminContent();

  const [activeTab, setActiveTab] = useState<AdminTab>('curriculum');
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Lesson Edit State
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [isNewLesson, setIsNewLesson] = useState<boolean>(false);

  // Video Edit State
  const [editingVideo, setEditingVideo] = useState<ArtMediaVideo | null>(null);
  const [isNewVideo, setIsNewVideo] = useState<boolean>(false);

  // Artwork Edit State
  const [editingArtwork, setEditingArtwork] = useState<StudentArtwork | null>(null);
  const [isNewArtwork, setIsNewArtwork] = useState<boolean>(false);

  // Weekly Prompt Edit State (direct form fields)
  const [promptForm, setPromptForm] = useState<CreativePrompt>(weeklyPrompt);

  // Password change state
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');

  // JSON Import state
  const [importJsonText, setImportJsonText] = useState('');
  const [showImportBox, setShowImportBox] = useState(false);

  if (!isOpen) return null;

  const showToast = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  // LESSON HANDLERS
  const handleOpenAddLesson = () => {
    const emptyLesson: Lesson = {
      id: '',
      title: 'New Studio Art Lesson',
      gradeLevel: 'middle',
      gradeDisplay: 'Grades 6–8 (Middle School)',
      category: 'Emotional Release',
      duration: '45 mins',
      difficulty: 'Beginner',
      thumbnailUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
      videoPoster: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
      videoDuration: '12:00',
      description: 'Describe the purpose and approach of this lesson.',
      emotionalGoal: 'Explain how this lesson de-stresses academic pressure.',
      learningObjectives: ['Learn organic mark-making', 'Explore natural textures'],
      chapters: [
        { id: 'ch1', time: '00:00', title: 'Preparation & Mindset', description: 'Centering the mind before drawing.' }
      ],
      zeroBudgetMaterials: [
        { standard: 'Charcoal or Soft Pencil', nepaliAlternative: 'Burnt firewood embers', howToPrepare: 'Collect cool charred wood from stove' }
      ],
      steps: [
        { number: 1, title: 'Unconstrained Breathing Marks', action: 'Draw free strokes with arms', mindsetTip: 'Let go of perfectionism' }
      ],
      reflectionQuestions: ['How did creating this without a grade feel?'],
      instructor: {
        name: 'Art Facilitator',
        role: 'Creative Studio Mentor',
        location: 'Kathmandu, Nepal',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
      }
    };
    setEditingLesson(emptyLesson);
    setIsNewLesson(true);
  };

  const handleSaveLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLesson) return;

    if (isNewLesson) {
      const { id, ...rest } = editingLesson;
      addLesson(rest);
      showToast('success', 'New art lesson added successfully.');
    } else {
      updateLesson(editingLesson.id, editingLesson);
      showToast('success', 'Art lesson updated successfully.');
    }
    setEditingLesson(null);
  };

  const handleDeleteLesson = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete the lesson "${title}"?`)) {
      deleteLesson(id);
      showToast('success', 'Lesson deleted successfully.');
    }
  };

  // VIDEO HANDLERS
  const handleOpenAddVideo = () => {
    const emptyVideo: ArtMediaVideo = {
      id: '',
      title: 'New Studio Workshop Demonstration',
      category: 'masterclass',
      categoryLabel: 'Studio Masterclass',
      duration: '14:20',
      durationSec: 860,
      gradeRecommendation: 'All Grades & Students',
      thumbnailUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
      videoPoster: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
      instructor: {
        name: 'Master Artisan',
        role: 'Senior Studio Mentor',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
      },
      description: 'Step-by-step hands-on creative workshop demonstration.',
      keyTakeaway: 'The core takeaway from this creative process.',
      materialsNeeded: ['Natural charcoal', 'Sketch paper', 'Water jar'],
      chapters: [
        { time: '00:00', title: 'Introduction' },
        { time: '05:00', title: 'Expressive Demonstration' }
      ],
      tags: ['Masterclass', 'Expression', 'De-stress'],
      viewsCount: 120
    };
    setEditingVideo(emptyVideo);
    setIsNewVideo(true);
  };

  const handleSaveVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVideo) return;

    if (isNewVideo) {
      const { id, ...rest } = editingVideo;
      addVideo(rest);
      showToast('success', 'New workshop video registered successfully.');
    } else {
      updateVideo(editingVideo.id, editingVideo);
      showToast('success', 'Workshop video updated successfully.');
    }
    setEditingVideo(null);
  };

  const handleDeleteVideo = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete the video "${title}"?`)) {
      deleteVideo(id);
      showToast('success', 'Video deleted successfully.');
    }
  };

  // ARTWORK HANDLERS
  const handleOpenAddArtwork = () => {
    const emptyArtwork: StudentArtwork = {
      id: '',
      title: 'Student Creative Expression',
      artist: 'Student Artist',
      age: 15,
      grade: 'Grade 9 (SEE Candidate)',
      location: 'Kathmandu',
      medium: 'Stove Charcoal & Ash on Newsprint',
      story: 'Painted to express my authentic voice and dreams of Himalayan mountain horizons.',
      imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
      colors: ['#2C3E50', '#D95338', '#E67E22'],
      likes: 12,
      date: 'Just now',
      tags: ['Creative Voice', 'Charcoal', 'High School']
    };
    setEditingArtwork(emptyArtwork);
    setIsNewArtwork(true);
  };

  const handleSaveArtwork = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArtwork) return;

    if (isNewArtwork) {
      const { id, ...rest } = editingArtwork;
      addArtwork(rest);
      showToast('success', 'Gallery artwork registered successfully.');
    } else {
      updateArtwork(editingArtwork.id, editingArtwork);
      showToast('success', 'Artwork updated successfully.');
    }
    setEditingArtwork(null);
  };

  const handleDeleteArtwork = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}" from the gallery?`)) {
      deleteArtwork(id);
      showToast('success', 'Artwork removed from gallery.');
    }
  };

  // PROMPT HANDLERS
  const handleSavePrompt = (e: React.FormEvent) => {
    e.preventDefault();
    updateWeeklyPrompt(promptForm);
    showToast('success', 'Weekly creative prompt updated successfully.');
  };

  // PASSWORD CHANGE
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPasswordInput !== confirmPasswordInput) {
      showToast('error', 'New password and confirmation do not match.');
      return;
    }
    const res = updatePassword(newPasswordInput);
    if (res.success) {
      showToast('success', res.message);
      setNewPasswordInput('');
      setConfirmPasswordInput('');
    } else {
      showToast('error', res.message);
    }
  };

  // BACKUP / EXPORT
  const handleExport = () => {
    const json = exportBackupJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `choi-artstudio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    showToast('success', 'Website content backup JSON downloaded successfully.');
  };

  const handleImport = () => {
    if (!importJsonText.trim()) {
      showToast('error', 'Please enter or paste the backup JSON text.');
      return;
    }
    const res = importBackupJSON(importJsonText);
    if (res.success) {
      showToast('success', res.message);
      setShowImportBox(false);
      setImportJsonText('');
    } else {
      showToast('error', res.message);
    }
  };

  const handleReset = () => {
    if (window.confirm('Warning: Are you sure you want to reset all curriculums, workshops, prompts, and gallery data to factory defaults?')) {
      resetToDefaults();
      showToast('success', 'All content has been reset to factory defaults.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-stone-950/70 backdrop-blur-md animate-fade-in text-left">
      <div 
        className="relative w-full max-w-6xl xl:max-w-7xl h-[92vh] max-h-[960px] bg-white rounded-3xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Dark Navigation Bar */}
        <header className="bg-[#1C1917] text-white px-5 sm:px-8 py-4 flex items-center justify-between border-b border-stone-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#D95338] text-white flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display-custom font-bold text-base sm:text-lg text-white">
                  CHOI Art Studio Admin Portal
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/80">
                  Active
                </span>
              </div>
              <p className="text-[11px] text-stone-400 font-mono">
                Authorized Admin: <span className="text-white font-semibold">{adminEmail}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                logout();
                onClose();
              }}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
              title="Sign Out as Administrator"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white flex items-center justify-center transition-colors ml-1"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Tab Selection Bar */}
        <div className="bg-[#F8F7F4] border-b border-stone-200 px-4 sm:px-8 flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar shrink-0">
          {[
            { id: 'curriculum', label: 'Art Lessons', count: lessons.length, icon: Layers },
            { id: 'videos', label: 'Studio Workshops', count: videos.length, icon: Video },
            { id: 'prompt', label: 'Weekly Prompt', icon: Sparkles },
            { id: 'gallery', label: 'Student Gallery', count: artworks.length, icon: ImageIcon },
            { id: 'settings', label: 'Account & Data Backup', icon: Settings }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as AdminTab);
                  setEditingLesson(null);
                  setEditingVideo(null);
                  setEditingArtwork(null);
                }}
                className={`py-3.5 px-3 sm:px-4 text-xs font-medium flex items-center gap-2 border-b-2 whitespace-nowrap transition-all ${
                  isActive
                    ? 'border-[#D95338] text-stone-900 font-bold bg-white/60'
                    : 'border-transparent text-stone-600 hover:text-stone-900 hover:bg-white/30'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#D95338]' : 'text-stone-400'}`} />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-[#D95338] text-white' : 'bg-stone-200 text-stone-600'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Notification Toast */}
        {notification && (
          <div className={`p-3 text-xs font-medium flex items-center justify-between px-6 shrink-0 ${
            notification.type === 'success' 
              ? 'bg-emerald-50 text-emerald-800 border-b border-emerald-200' 
              : 'bg-red-50 text-red-800 border-b border-red-200'
          }`}>
            <div className="flex items-center gap-2">
              {notification.type === 'success' ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-600" />
              )}
              <span>{notification.message}</span>
            </div>
            <button onClick={() => setNotification(null)} className="text-stone-500 hover:text-stone-800">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Tab Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#F0F8F5]">
          {/* TAB 1: CURRICULUM MANAGEMENT */}
          {activeTab === 'curriculum' && (
            <div className="space-y-6">
              {!editingLesson ? (
                <>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
                    <div>
                      <h3 className="font-display-custom font-bold text-lg sm:text-xl text-stone-900">
                        Grade 1–10 Art Lessons
                      </h3>
                      <p className="text-xs text-stone-500 mt-0.5">
                        Manage art lessons, free supply recipes, and creative guides.
                      </p>
                    </div>
                    <button
                      onClick={handleOpenAddLesson}
                      className="px-4 py-2 rounded-xl bg-[#D95338] hover:bg-[#C2452D] text-white text-xs font-medium flex items-center gap-1.5 shadow-xs transition-all self-start sm:self-auto"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Lesson</span>
                    </button>
                  </div>

                  {/* Lessons List Table/Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs flex flex-col justify-between hover:border-stone-300 transition-all text-left"
                      >
                        <div className="space-y-3">
                          <div className="relative h-36 rounded-xl overflow-hidden bg-stone-100">
                            <img
                              src={lesson.thumbnailUrl}
                              alt={lesson.title}
                              className="w-full h-full object-cover"
                            />
                            <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-mono uppercase">
                              {lesson.gradeLevel}
                            </span>
                            <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-mono">
                              {lesson.duration}
                            </span>
                          </div>

                          <div>
                            <span className="text-[10px] font-mono text-[#D95338] font-semibold uppercase">
                              {lesson.category}
                            </span>
                            <h4 className="font-bold text-sm text-stone-900 line-clamp-1 mt-0.5">
                              {lesson.title}
                            </h4>
                            <p className="text-xs text-stone-500 line-clamp-2 mt-1">
                              {lesson.description}
                            </p>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-stone-100 mt-4 flex items-center justify-between gap-2">
                          <span className="text-[11px] text-stone-400 font-mono truncate">
                            {lesson.steps?.length || 0} Steps • {lesson.zeroBudgetMaterials?.length || 0} Materials
                          </span>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => {
                                setEditingLesson(lesson);
                                setIsNewLesson(false);
                              }}
                              className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-600 hover:text-stone-900"
                              title="Edit"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteLesson(lesson.id, lesson.title)}
                              className="p-1.5 rounded-lg hover:bg-red-50 text-stone-400 hover:text-red-600"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                /* Lesson Edit/Create Form */
                <form onSubmit={handleSaveLesson} className="bg-white rounded-2xl border border-stone-200 p-6 space-y-6 max-w-4xl mx-auto shadow-xs">
                  <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                    <h3 className="font-display-custom font-bold text-lg text-stone-900 flex items-center gap-2">
                      <Edit3 className="w-4 h-4 text-[#D95338]" />
                      <span>{isNewLesson ? 'Create New Lesson Syllabus' : 'Edit Curriculum Syllabus'}</span>
                    </h3>
                    <button
                      type="button"
                      onClick={() => setEditingLesson(null)}
                      className="text-xs text-stone-500 hover:text-stone-800"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-stone-700">Lesson Title</label>
                      <input
                        type="text"
                        required
                        value={editingLesson.title}
                        onChange={(e) => setEditingLesson({ ...editingLesson, title: e.target.value })}
                        className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:bg-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-stone-700">Grade Level</label>
                      <select
                        value={editingLesson.gradeLevel}
                        onChange={(e) => {
                          const level = e.target.value as 'primary' | 'middle' | 'high';
                          const display = level === 'primary' 
                            ? 'Grades 1–5 (Primary)' 
                            : level === 'middle' 
                            ? 'Grades 6–8 (Middle)' 
                            : 'Grades 9–10 (High School)';
                          setEditingLesson({ ...editingLesson, gradeLevel: level, gradeDisplay: display });
                        }}
                        className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:bg-white"
                      >
                        <option value="primary">Grades 1–5 (Primary)</option>
                        <option value="middle">Grades 6–8 (Middle)</option>
                        <option value="high">Grades 9–10 (High School)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-stone-700">Category</label>
                      <select
                        value={editingLesson.category}
                        onChange={(e) => setEditingLesson({ ...editingLesson, category: e.target.value as any })}
                        className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:bg-white"
                      >
                        <option value="Emotional Release">Emotional Release</option>
                        <option value="Self Identity">Self Identity</option>
                        <option value="Observational Flow">Observational Flow</option>
                        <option value="Contemporary Voice">Contemporary Voice</option>
                        <option value="Form & Freedom">Form & Freedom</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-stone-700">Duration & Difficulty</label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={editingLesson.duration}
                          onChange={(e) => setEditingLesson({ ...editingLesson, duration: e.target.value })}
                          placeholder="e.g. 45 mins"
                          className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:bg-white"
                        />
                        <select
                          value={editingLesson.difficulty}
                          onChange={(e) => setEditingLesson({ ...editingLesson, difficulty: e.target.value as any })}
                          className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:bg-white"
                        >
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Expressive / All Levels">Expressive / All Levels</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs font-semibold text-stone-700">Thumbnail Image URL</label>
                      <input
                        type="url"
                        value={editingLesson.thumbnailUrl}
                        onChange={(e) => setEditingLesson({ ...editingLesson, thumbnailUrl: e.target.value, videoPoster: e.target.value })}
                        className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:bg-white font-mono"
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs font-semibold text-stone-700">Lesson Description</label>
                      <textarea
                        rows={3}
                        value={editingLesson.description}
                        onChange={(e) => setEditingLesson({ ...editingLesson, description: e.target.value })}
                        className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:bg-white"
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs font-semibold text-stone-700">Creative Reflection Goal & Mindful Relaxation</label>
                      <textarea
                        rows={2}
                        value={editingLesson.emotionalGoal}
                        onChange={(e) => setEditingLesson({ ...editingLesson, emotionalGoal: e.target.value })}
                        className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-stone-200 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setEditingLesson(null)}
                      className="px-4 py-2.5 rounded-xl border border-stone-200 text-xs font-medium text-stone-600 hover:bg-stone-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-[#D95338] hover:bg-[#C2452D] text-white text-xs font-medium flex items-center gap-1.5 shadow-xs"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Lesson</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* TAB 2: VIDEOS MANAGEMENT */}
          {activeTab === 'videos' && (
            <div className="space-y-6">
              {!editingVideo ? (
                <>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
                    <div>
                      <h3 className="font-display-custom font-bold text-lg sm:text-xl text-stone-900">
                        Studio Workshops & Video Masterclasses
                      </h3>
                      <p className="text-xs text-stone-500 mt-0.5">
                        Manage studio demonstrations, healing workshops, instructor credentials, and durations.
                      </p>
                    </div>
                    <button
                      onClick={handleOpenAddVideo}
                      className="px-4 py-2 rounded-xl bg-[#D95338] hover:bg-[#C2452D] text-white text-xs font-medium flex items-center gap-1.5 shadow-xs self-start sm:self-auto"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Video</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {videos.map((video) => (
                      <div
                        key={video.id}
                        className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs flex flex-col justify-between hover:border-stone-300 transition-all text-left"
                      >
                        <div className="space-y-3">
                          <div className="relative h-36 rounded-xl overflow-hidden bg-stone-100">
                            <img
                              src={video.thumbnailUrl}
                              alt={video.title}
                              className="w-full h-full object-cover"
                            />
                            <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-mono">
                              {video.category === 'masterclass' ? 'Masterclass' : 'Creative Wellness'}
                            </span>
                            <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-mono">
                              {video.duration}
                            </span>
                          </div>

                          <div>
                            <span className="text-[10px] font-mono text-[#D95338] font-semibold uppercase">
                              {video.categoryLabel}
                            </span>
                            <h4 className="font-bold text-sm text-stone-900 line-clamp-1 mt-0.5">
                              {video.title}
                            </h4>
                            <p className="text-xs text-stone-500 line-clamp-2 mt-1">
                              {video.description}
                            </p>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-stone-100 mt-4 flex items-center justify-between gap-2">
                          <span className="text-[11px] text-stone-400 truncate">
                            {video.instructor.name} ({video.instructor.role})
                          </span>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => {
                                setEditingVideo(video);
                                setIsNewVideo(false);
                              }}
                              className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-600 hover:text-stone-900"
                              title="Edit"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteVideo(video.id, video.title)}
                              className="p-1.5 rounded-lg hover:bg-red-50 text-stone-400 hover:text-red-600"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                /* Video Edit/Create Form */
                <form onSubmit={handleSaveVideo} className="bg-white rounded-2xl border border-stone-200 p-6 space-y-6 max-w-4xl mx-auto shadow-xs">
                  <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                    <h3 className="font-display-custom font-bold text-lg text-stone-900 flex items-center gap-2">
                      <Video className="w-4 h-4 text-[#D95338]" />
                      <span>{isNewVideo ? 'Register New Workshop Video' : 'Edit Workshop Video'}</span>
                    </h3>
                    <button
                      type="button"
                      onClick={() => setEditingVideo(null)}
                      className="text-xs text-stone-500 hover:text-stone-800"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs font-semibold text-stone-700">Video Title</label>
                      <input
                        type="text"
                        required
                        value={editingVideo.title}
                        onChange={(e) => setEditingVideo({ ...editingVideo, title: e.target.value })}
                        className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:bg-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-stone-700">Category</label>
                      <select
                        value={editingVideo.category}
                        onChange={(e) => {
                          const cat = e.target.value as 'masterclass' | 'wellness';
                          setEditingVideo({
                            ...editingVideo,
                            category: cat,
                            categoryLabel: cat === 'masterclass' ? 'Studio Masterclass' : 'Creative Wellness & Flow'
                          });
                        }}
                        className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:bg-white"
                      >
                        <option value="masterclass">Studio Masterclass</option>
                        <option value="wellness">Creative Wellness & Flow</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-stone-700">Duration</label>
                      <input
                        type="text"
                        value={editingVideo.duration}
                        onChange={(e) => setEditingVideo({ ...editingVideo, duration: e.target.value })}
                        placeholder="14:50"
                        className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:bg-white"
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs font-semibold text-stone-700">Thumbnail Poster URL</label>
                      <input
                        type="url"
                        value={editingVideo.thumbnailUrl}
                        onChange={(e) => setEditingVideo({ ...editingVideo, thumbnailUrl: e.target.value, videoPoster: e.target.value })}
                        className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:bg-white font-mono"
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs font-semibold text-stone-700">Video Description</label>
                      <textarea
                        rows={3}
                        value={editingVideo.description}
                        onChange={(e) => setEditingVideo({ ...editingVideo, description: e.target.value })}
                        className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:bg-white"
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs font-semibold text-stone-700">Key Creative Takeaway</label>
                      <input
                        type="text"
                        value={editingVideo.keyTakeaway}
                        onChange={(e) => setEditingVideo({ ...editingVideo, keyTakeaway: e.target.value })}
                        className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-stone-200 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setEditingVideo(null)}
                      className="px-4 py-2.5 rounded-xl border border-stone-200 text-xs font-medium text-stone-600 hover:bg-stone-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-[#D95338] hover:bg-[#C2452D] text-white text-xs font-medium flex items-center gap-1.5 shadow-xs"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Video</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* TAB 3: WEEKLY PROMPT MANAGEMENT */}
          {activeTab === 'prompt' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="pb-4 border-b border-stone-200">
                <h3 className="font-display-custom font-bold text-lg sm:text-xl text-stone-900">
                  Weekly Creative Prompt Management
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Set weekly creative decompression themes, guided inquiry questions, and recommended medium.
                </p>
              </div>

              <form onSubmit={handleSavePrompt} className="bg-white rounded-2xl border border-stone-200 p-6 space-y-5 shadow-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-700">Week Number</label>
                    <input
                      type="number"
                      required
                      value={promptForm.weekNumber}
                      onChange={(e) => setPromptForm({ ...promptForm, weekNumber: parseInt(e.target.value) || 1 })}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-700">Recommended Medium / Material</label>
                    <input
                      type="text"
                      value={promptForm.recommendedMedium}
                      onChange={(e) => setPromptForm({ ...promptForm, recommendedMedium: e.target.value })}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:bg-white"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-semibold text-stone-700">Prompt Title</label>
                    <input
                      type="text"
                      required
                      value={promptForm.title}
                      onChange={(e) => setPromptForm({ ...promptForm, title: e.target.value })}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:bg-white font-semibold"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-semibold text-stone-700">Weekly Theme / Subtitle</label>
                    <input
                      type="text"
                      value={promptForm.theme}
                      onChange={(e) => setPromptForm({ ...promptForm, theme: e.target.value })}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-[#D95338] focus:bg-white font-serif-custom italic"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-semibold text-stone-700">Prompt Narrative & Guidance</label>
                    <textarea
                      rows={3}
                      value={promptForm.description}
                      onChange={(e) => setPromptForm({ ...promptForm, description: e.target.value })}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:bg-white"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-semibold text-stone-700">
                      Guided Inquiry Questions (One question per line)
                    </label>
                    <textarea
                      rows={3}
                      value={promptForm.guidedQuestions.join('\n')}
                      onChange={(e) => setPromptForm({ ...promptForm, guidedQuestions: e.target.value.split('\n').filter(q => q.trim().length > 0) })}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-200 flex justify-end gap-3">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#D95338] hover:bg-[#C2452D] text-white text-xs sm:text-sm font-medium flex items-center gap-1.5 shadow-xs"
                  >
                    <Save className="w-4 h-4" />
                    <span>Apply Prompt Updates</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 4: STUDENT GALLERY MANAGEMENT */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              {!editingArtwork ? (
                <>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
                    <div>
                      <h3 className="font-display-custom font-bold text-lg sm:text-xl text-stone-900">
                        Student Artwork Gallery
                      </h3>
                      <p className="text-xs text-stone-500 mt-0.5">
                        Curate student artworks, creative stories, and student artist details.
                      </p>
                    </div>
                    <button
                      onClick={handleOpenAddArtwork}
                      className="px-4 py-2 rounded-xl bg-[#D95338] hover:bg-[#C2452D] text-white text-xs font-medium flex items-center gap-1.5 shadow-xs self-start sm:self-auto"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Artwork</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {artworks.map((art) => (
                      <div
                        key={art.id}
                        className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs flex flex-col justify-between hover:border-stone-300 transition-all text-left"
                      >
                        <div className="space-y-3">
                          <div className="relative h-44 rounded-xl overflow-hidden bg-stone-100">
                            <img
                              src={art.imageUrl}
                              alt={art.title}
                              className="w-full h-full object-cover"
                            />
                            <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-mono">
                              ♥ {art.likes}
                            </span>
                          </div>

                          <div>
                            <h4 className="font-bold text-sm text-stone-900 line-clamp-1">
                              {art.title}
                            </h4>
                            <p className="text-xs font-medium text-stone-700 mt-0.5">
                              {art.artist} ({art.grade}, {art.location})
                            </p>
                            <p className="text-xs text-stone-500 italic mt-1 line-clamp-2">
                              "{art.story}"
                            </p>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-stone-100 mt-4 flex items-center justify-between gap-2">
                          <span className="text-[11px] text-stone-400 truncate">
                            {art.medium}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => {
                                setEditingArtwork(art);
                                setIsNewArtwork(false);
                              }}
                              className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-600 hover:text-stone-900"
                              title="Edit"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteArtwork(art.id, art.title)}
                              className="p-1.5 rounded-lg hover:bg-red-50 text-stone-400 hover:text-red-600"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                /* Artwork Edit/Create Form */
                <form onSubmit={handleSaveArtwork} className="bg-white rounded-2xl border border-stone-200 p-6 space-y-6 max-w-3xl mx-auto shadow-xs">
                  <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                    <h3 className="font-display-custom font-bold text-lg text-stone-900 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-[#D95338]" />
                      <span>{isNewArtwork ? 'Add Student Artwork' : 'Edit Student Artwork'}</span>
                    </h3>
                    <button
                      type="button"
                      onClick={() => setEditingArtwork(null)}
                      className="text-xs text-stone-500 hover:text-stone-800"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs font-semibold text-stone-700">Artwork Title</label>
                      <input
                        type="text"
                        required
                        value={editingArtwork.title}
                        onChange={(e) => setEditingArtwork({ ...editingArtwork, title: e.target.value })}
                        className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:bg-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-stone-700">Student Artist Name</label>
                      <input
                        type="text"
                        required
                        value={editingArtwork.artist}
                        onChange={(e) => setEditingArtwork({ ...editingArtwork, artist: e.target.value })}
                        className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:bg-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-stone-700">Grade / Age</label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={editingArtwork.grade}
                          onChange={(e) => setEditingArtwork({ ...editingArtwork, grade: e.target.value })}
                          placeholder="Grade 9"
                          className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:bg-white"
                        />
                        <input
                          type="number"
                          value={editingArtwork.age}
                          onChange={(e) => setEditingArtwork({ ...editingArtwork, age: parseInt(e.target.value) || 15 })}
                          placeholder="15"
                          className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:bg-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-stone-700">Location (School / City)</label>
                      <input
                        type="text"
                        value={editingArtwork.location}
                        onChange={(e) => setEditingArtwork({ ...editingArtwork, location: e.target.value })}
                        placeholder="Kathmandu, Nepal"
                        className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:bg-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-stone-700">Medium & Materials</label>
                      <input
                        type="text"
                        value={editingArtwork.medium}
                        onChange={(e) => setEditingArtwork({ ...editingArtwork, medium: e.target.value })}
                        placeholder="Cooking Stove Charcoal on Cardboard"
                        className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:bg-white"
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs font-semibold text-stone-700">Artwork Image URL</label>
                      <input
                        type="url"
                        value={editingArtwork.imageUrl}
                        onChange={(e) => setEditingArtwork({ ...editingArtwork, imageUrl: e.target.value })}
                        className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:bg-white font-mono"
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs font-semibold text-stone-700">Student Story & Emotional Reflection</label>
                      <textarea
                        rows={3}
                        value={editingArtwork.story}
                        onChange={(e) => setEditingArtwork({ ...editingArtwork, story: e.target.value })}
                        className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-stone-200 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setEditingArtwork(null)}
                      className="px-4 py-2.5 rounded-xl border border-stone-200 text-xs font-medium text-stone-600 hover:bg-stone-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-[#D95338] hover:bg-[#C2452D] text-white text-xs font-medium flex items-center gap-1.5 shadow-xs"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Artwork</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* TAB 5: ADMIN SETTINGS & DATA BACKUP */}
          {activeTab === 'settings' && (
            <div className="max-w-3xl mx-auto space-y-6">
              {/* Account Card */}
              <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-stone-100 text-[#D95338] flex items-center justify-center">
                    <KeyRound className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display-custom font-bold text-base text-stone-900">
                      Administrator Account & Security
                    </h3>
                    <p className="text-xs text-stone-500">
                      Authorized Admin Email: <strong className="text-stone-800">{adminEmail}</strong>
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-600 leading-relaxed">
                  Per configuration, administrative authority is dedicated exclusively to <strong>citygas75@gmail.com</strong>. Your initial login password is securely remembered and retained in persistent storage. You may update your administrative password below at any time.
                </div>

                {/* Change Password Form */}
                <form onSubmit={handleChangePassword} className="pt-2 space-y-3 max-w-md">
                  <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                    Update Password
                  </h4>
                  <div className="space-y-2">
                    <input
                      type="password"
                      placeholder="Enter new password (min. 4 characters)"
                      value={newPasswordInput}
                      onChange={(e) => setNewPasswordInput(e.target.value)}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:bg-white"
                    />
                    <input
                      type="password"
                      placeholder="Confirm new password"
                      value={confirmPasswordInput}
                      onChange={(e) => setConfirmPasswordInput(e.target.value)}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:bg-white"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium transition-colors"
                  >
                    Save New Password
                  </button>
                </form>
              </div>

              {/* Backup & Restore Card */}
              <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-stone-100 text-stone-800 flex items-center justify-center">
                    <Download className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display-custom font-bold text-base text-stone-900">
                      Content Data Backup & Restore
                    </h3>
                    <p className="text-xs text-stone-500">
                      Export or import all curriculum lessons, masterclasses, weekly prompts, and student artworks as a JSON package.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={handleExport}
                    className="px-4 py-2.5 rounded-xl bg-white hover:bg-stone-50 text-stone-800 text-xs font-medium border border-stone-200 shadow-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Download className="w-4 h-4 text-[#D95338]" />
                    <span>Export Data (JSON)</span>
                  </button>

                  <button
                    onClick={() => setShowImportBox(!showImportBox)}
                    className="px-4 py-2.5 rounded-xl bg-white hover:bg-stone-50 text-stone-800 text-xs font-medium border border-stone-200 shadow-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Upload className="w-4 h-4 text-stone-600" />
                    <span>Import Data (JSON)</span>
                  </button>

                  <button
                    onClick={handleReset}
                    className="px-4 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-medium border border-red-200 transition-colors flex items-center gap-1.5 ml-auto"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset to Defaults</span>
                  </button>
                </div>

                {showImportBox && (
                  <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
                    <label className="text-xs font-semibold text-stone-700 block">
                      Paste Backup JSON
                    </label>
                    <textarea
                      rows={5}
                      value={importJsonText}
                      onChange={(e) => setImportJsonText(e.target.value)}
                      placeholder='{"lessons": [...], "videos": [...], ...}'
                      className="w-full p-2.5 bg-white border border-stone-200 rounded-xl text-xs font-mono text-stone-800"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setShowImportBox(false)}
                        className="px-3 py-1.5 rounded-lg text-xs text-stone-500 hover:text-stone-800"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleImport}
                        className="px-4 py-1.5 rounded-lg bg-[#D95338] text-white text-xs font-medium"
                      >
                        Apply Imported Data
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
