import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Lesson, ArtMediaVideo, CreativePrompt, StudentArtwork } from '../types';
import { LESSONS_DATA, CURRENT_WEEK_PROMPT } from '../data/curriculumData';
import { ART_MEDIA_VIDEOS } from '../data/artMediaData';
import { STUDENT_ARTWORKS } from '../data/studentGalleryData';

const AUTHORIZED_ADMIN_EMAIL = 'citygas75@gmail.com';

const STORAGE_KEYS = {
  ADMIN_AUTH: 'choi_admin_authenticated',
  ADMIN_EMAIL: 'choi_admin_email',
  ADMIN_PASSWORD: 'choi_admin_password_store',
  LESSONS: 'choi_content_lessons_v1',
  VIDEOS: 'choi_content_videos_v1',
  WEEKLY_PROMPT: 'choi_content_prompt_v1',
  ARTWORKS: 'choi_content_artworks_v1',
};

interface AdminContentContextType {
  // Auth state
  isAdmin: boolean;
  adminEmail: string | null;
  isPasswordRegistered: boolean;
  login: (email: string, password: string) => { success: boolean; message: string; isFirstTime?: boolean };
  logout: () => void;
  updatePassword: (newPassword: string) => { success: boolean; message: string };

  // Content state
  lessons: Lesson[];
  videos: ArtMediaVideo[];
  weeklyPrompt: CreativePrompt;
  artworks: StudentArtwork[];

  // Curriculum CRUD
  addLesson: (lesson: Omit<Lesson, 'id'>) => void;
  updateLesson: (id: string, updated: Partial<Lesson>) => void;
  deleteLesson: (id: string) => void;

  // Video CRUD
  addVideo: (video: Omit<ArtMediaVideo, 'id'>) => void;
  updateVideo: (id: string, updated: Partial<ArtMediaVideo>) => void;
  deleteVideo: (id: string) => void;

  // Weekly Prompt CRUD
  updateWeeklyPrompt: (updated: Partial<CreativePrompt>) => void;

  // Student Artwork CRUD
  addArtwork: (artwork: Omit<StudentArtwork, 'id'>) => void;
  updateArtwork: (id: string, updated: Partial<StudentArtwork>) => void;
  deleteArtwork: (id: string) => void;
  likeArtwork: (id: string) => void;

  // Reset & Backup
  resetToDefaults: () => void;
  exportBackupJSON: () => string;
  importBackupJSON: (jsonString: string) => { success: boolean; message: string };
}

const AdminContentContext = createContext<AdminContentContextType | undefined>(undefined);

export const AdminContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Auth state
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
  });
  const [adminEmail, setAdminEmail] = useState<string | null>(() => {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_EMAIL);
  });
  const [isPasswordRegistered, setIsPasswordRegistered] = useState<boolean>(() => {
    return !!localStorage.getItem(STORAGE_KEYS.ADMIN_PASSWORD);
  });

  // Content state with localStorage fallback
  const [lessons, setLessons] = useState<Lesson[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LESSONS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved lessons:', e);
      }
    }
    return LESSONS_DATA;
  });

  const [videos, setVideos] = useState<ArtMediaVideo[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.VIDEOS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved videos:', e);
      }
    }
    return ART_MEDIA_VIDEOS;
  });

  const [weeklyPrompt, setWeeklyPrompt] = useState<CreativePrompt>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.WEEKLY_PROMPT);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved prompt:', e);
      }
    }
    return CURRENT_WEEK_PROMPT;
  });

  const [artworks, setArtworks] = useState<StudentArtwork[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ARTWORKS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved artworks:', e);
      }
    }
    return STUDENT_ARTWORKS;
  });

  // Persist content changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LESSONS, JSON.stringify(lessons));
  }, [lessons]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.VIDEOS, JSON.stringify(videos));
  }, [videos]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WEEKLY_PROMPT, JSON.stringify(weeklyPrompt));
  }, [weeklyPrompt]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ARTWORKS, JSON.stringify(artworks));
  }, [artworks]);

  // Auth functions
  const login = (email: string, password: string) => {
    const cleanEmail = email.trim().toLowerCase();
    if (cleanEmail !== AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
      return {
        success: false,
        message: `Access denied. Administrator privileges are granted exclusively to ${AUTHORIZED_ADMIN_EMAIL}.`
      };
    }

    if (!password || password.trim().length === 0) {
      return {
        success: false,
        message: 'Please enter your administrator password.'
      };
    }

    const savedPassword = localStorage.getItem(STORAGE_KEYS.ADMIN_PASSWORD);

    // If password was never registered, this first entered password is saved and remembered!
    if (!savedPassword) {
      localStorage.setItem(STORAGE_KEYS.ADMIN_PASSWORD, password);
      localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      localStorage.setItem(STORAGE_KEYS.ADMIN_EMAIL, AUTHORIZED_ADMIN_EMAIL);
      setIsAdmin(true);
      setAdminEmail(AUTHORIZED_ADMIN_EMAIL);
      setIsPasswordRegistered(true);
      return {
        success: true,
        isFirstTime: true,
        message: `Administrator account registered. The password you entered has been securely remembered for ${AUTHORIZED_ADMIN_EMAIL}.`
      };
    }

    // Subsequent logins: verify against saved password
    if (savedPassword === password) {
      localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      localStorage.setItem(STORAGE_KEYS.ADMIN_EMAIL, AUTHORIZED_ADMIN_EMAIL);
      setIsAdmin(true);
      setAdminEmail(AUTHORIZED_ADMIN_EMAIL);
      return {
        success: true,
        message: 'Administrator login successful.'
      };
    } else {
      return {
        success: false,
        message: 'Incorrect password. Please enter the password you registered on your first login.'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
    localStorage.removeItem(STORAGE_KEYS.ADMIN_EMAIL);
    setIsAdmin(false);
    setAdminEmail(null);
  };

  const updatePassword = (newPassword: string) => {
    if (!newPassword || newPassword.trim().length < 4) {
      return {
        success: false,
        message: 'Password must be at least 4 characters long.'
      };
    }
    localStorage.setItem(STORAGE_KEYS.ADMIN_PASSWORD, newPassword);
    setIsPasswordRegistered(true);
    return {
      success: true,
      message: 'Administrator password updated successfully.'
    };
  };

  // Lesson CRUD
  const addLesson = (newLessonData: Omit<Lesson, 'id'>) => {
    const newLesson: Lesson = {
      ...newLessonData,
      id: `lesson-custom-${Date.now()}`
    };
    setLessons((prev) => [newLesson, ...prev]);
  };

  const updateLesson = (id: string, updated: Partial<Lesson>) => {
    setLessons((prev) =>
      prev.map((l) => (l.id === id ? { ...l, ...updated } : l))
    );
  };

  const deleteLesson = (id: string) => {
    setLessons((prev) => prev.filter((l) => l.id !== id));
  };

  // Video CRUD
  const addVideo = (newVideoData: Omit<ArtMediaVideo, 'id'>) => {
    const newVideo: ArtMediaVideo = {
      ...newVideoData,
      id: `video-custom-${Date.now()}`
    };
    setVideos((prev) => [newVideo, ...prev]);
  };

  const updateVideo = (id: string, updated: Partial<ArtMediaVideo>) => {
    setVideos((prev) =>
      prev.map((v) => (v.id === id ? { ...v, ...updated } : v))
    );
  };

  const deleteVideo = (id: string) => {
    setVideos((prev) => prev.filter((v) => v.id !== id));
  };

  // Weekly Prompt CRUD
  const updateWeeklyPrompt = (updated: Partial<CreativePrompt>) => {
    setWeeklyPrompt((prev) => ({ ...prev, ...updated }));
  };

  // Student Artwork CRUD
  const addArtwork = (artworkData: Omit<StudentArtwork, 'id'>) => {
    const newArtwork: StudentArtwork = {
      ...artworkData,
      id: `art-custom-${Date.now()}`
    };
    setArtworks((prev) => [newArtwork, ...prev]);
  };

  const updateArtwork = (id: string, updated: Partial<StudentArtwork>) => {
    setArtworks((prev) =>
      prev.map((art) => (art.id === id ? { ...art, ...updated } : art))
    );
  };

  const deleteArtwork = (id: string) => {
    setArtworks((prev) => prev.filter((art) => art.id !== id));
  };

  const likeArtwork = (id: string) => {
    setArtworks((prev) =>
      prev.map((art) => (art.id === id ? { ...art, likes: art.likes + 1 } : art))
    );
  };

  // Factory reset to default data
  const resetToDefaults = () => {
    setLessons(LESSONS_DATA);
    setVideos(ART_MEDIA_VIDEOS);
    setWeeklyPrompt(CURRENT_WEEK_PROMPT);
    setArtworks(STUDENT_ARTWORKS);
    localStorage.removeItem(STORAGE_KEYS.LESSONS);
    localStorage.removeItem(STORAGE_KEYS.VIDEOS);
    localStorage.removeItem(STORAGE_KEYS.WEEKLY_PROMPT);
    localStorage.removeItem(STORAGE_KEYS.ARTWORKS);
  };

  // Backup & Import
  const exportBackupJSON = () => {
    const backupData = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      adminEmail: AUTHORIZED_ADMIN_EMAIL,
      lessons,
      videos,
      weeklyPrompt,
      artworks
    };
    return JSON.stringify(backupData, null, 2);
  };

  const importBackupJSON = (jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.lessons && Array.isArray(parsed.lessons)) setLessons(parsed.lessons);
      if (parsed.videos && Array.isArray(parsed.videos)) setVideos(parsed.videos);
      if (parsed.weeklyPrompt && typeof parsed.weeklyPrompt === 'object') setWeeklyPrompt(parsed.weeklyPrompt);
      if (parsed.artworks && Array.isArray(parsed.artworks)) setArtworks(parsed.artworks);
      return { success: true, message: 'Data successfully restored from backup.' };
    } catch (e: any) {
      return { success: false, message: `Failed to parse backup data: ${e?.message || 'Invalid JSON format'}` };
    }
  };

  return (
    <AdminContentContext.Provider
      value={{
        isAdmin,
        adminEmail,
        isPasswordRegistered,
        login,
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
        likeArtwork,
        resetToDefaults,
        exportBackupJSON,
        importBackupJSON
      }}
    >
      {children}
    </AdminContentContext.Provider>
  );
};

export const useAdminContent = (): AdminContentContextType => {
  const context = useContext(AdminContentContext);
  if (!context) {
    throw new Error('useAdminContent must be used within an AdminContentProvider');
  }
  return context;
};
