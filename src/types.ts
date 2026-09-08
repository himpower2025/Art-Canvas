export type GradeLevel = 'all' | 'primary' | 'middle' | 'high';

export interface LessonChapter {
  id: string;
  time: string;
  title: string;
  description: string;
}

export interface LocalMaterial {
  standard: string;
  nepaliAlternative: string;
  howToPrepare: string;
}

export interface Lesson {
  id: string;
  title: string;
  gradeLevel: 'primary' | 'middle' | 'high';
  gradeDisplay: string; // e.g. "Grades 1–5 (Ages 6–11)"
  category: 'Self-Expression' | 'Creative Expression' | 'Emotional Release' | 'Self Identity' | 'Observational Flow' | 'Contemporary Voice' | 'Form & Freedom';
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Expressive / All Levels';
  thumbnailUrl: string;
  videoPoster: string;
  videoDuration: string;
  description: string;
  emotionalGoal: string; // Creative expressive outcome & self-discovery
  learningObjectives: string[];
  chapters: LessonChapter[];
  zeroBudgetMaterials: LocalMaterial[];
  steps: {
    number: number;
    title: string;
    action: string;
    mindsetTip: string;
  }[];
  reflectionQuestions: string[];
  instructor: {
    name: string;
    role: string;
    location: string;
    avatar: string;
  };
}

export interface StudentArtwork {
  id: string;
  title: string;
  artist: string;
  age: number;
  grade: string;
  location: string; // e.g., "Kathmandu", "Pokhara", "Lalitpur", "Janakpur"
  medium: string;
  story: string;
  imageUrl: string;
  colors: string[];
  likes: number;
  date: string;
  tags: string[];
}

export interface CreativePrompt {
  id: string;
  weekNumber: number;
  title: string;
  theme: string;
  tagline: string;
  description: string;
  guidedQuestions: string[];
  recommendedMedium: string;
  suggestedMusicMood: string;
}

export type ArtMediaCategory = 'all' | 'masterclass' | 'wellness';

export interface ArtMediaVideo {
  id: string;
  title: string;
  category: 'masterclass' | 'wellness';
  categoryLabel: string;
  duration: string;
  durationSec: number;
  gradeRecommendation: string;
  thumbnailUrl: string;
  videoPoster: string;
  instructor: {
    name: string;
    role: string;
    avatar: string;
  };
  description: string;
  keyTakeaway: string;
  materialsNeeded: string[];
  chapters: { time: string; title: string }[];
  tags: string[];
  viewsCount: number;
}
