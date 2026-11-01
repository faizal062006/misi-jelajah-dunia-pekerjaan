export type ScreenState = 
  | 'title' 
  | 'map' 
  | 'profession-detail'
  | 'minigame-guess' 
  | 'minigame-tools' 
  | 'minigame-whoami' 
  | 'minigame-workplace' 
  | 'final-quiz' 
  | 'ending'
  | 'teacher-dashboard';

export type MataPelajaran = 
  | 'Matematika' 
  | 'PKn' 
  | 'Bahasa Indonesia' 
  | 'SBdP' 
  | 'PJOK';

export interface SubjectInfo {
  subject: MataPelajaran;
  shortDesc: string;
  badgeColor: string;
  iconName: string;
}

export interface ToolItem {
  id: string;
  name: string;
  description: string;
  iconName: string;
}

export interface ProfessionSubjectIntegration {
  primarySubject: MataPelajaran;
  secondarySubject: MataPelajaran;
  topicTitle: string;
  applicationExample: string;
}

export interface Profession {
  id: string;
  name: string;
  title: string;
  workplace: string;
  workplaceDescription: string;
  responsibilities: string[];
  tools: ToolItem[];
  benefits: string;
  dailyRoutine: string[];
  funFact: string;
  narrativeText: string;
  subjectIntegration?: ProfessionSubjectIntegration;
  colorTheme: {
    primary: string;
    bg: string;
    border: string;
    accent: string;
    text: string;
  };
  mapCoords: {
    x: number; // percentage (0-100)
    y: number; // percentage (0-100)
  };
}

export interface DragToolItem {
  id: string;
  name: string;
  professionId: string;
  professionName: string;
  icon: string;
  description: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  category: 'identifikasi' | 'tugas' | 'alat' | 'tempat' | 'manfaat';
  difficulty: 'Mudah' | 'Sedang' | 'Tantangan';
  subject?: MataPelajaran;
  professionOrigin?: string;
  iconHint?: string;
}

export interface AnswerLog {
  id: string;
  questionId: string | number;
  questionText: string;
  subject: MataPelajaran;
  professionOrigin?: string;
  studentAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  pointsEarned: number;
  timestamp: string; // e.g. "10:24:15"
  explanation?: string;
}

export interface ViolationRecord {
  id: string;
  timestamp: string;
  type: 'TAB_BLUR' | 'TAB_HIDDEN' | 'WINDOW_BLUR';
  screen: string;
  description: string;
}

export interface TeacherMessage {
  id: string;
  teacherName: string;
  targetStudentName: string; // 'Semua Siswa' or specific student name
  category: 'Pengumuman' | 'Peringatan' | 'Motivasi' | 'Instruksi';
  message: string;
  timestamp: string;
  read: boolean;
}

export interface MissionLockState {
  [missionId: string]: boolean; // true = unlocked (open), false = locked (closed)
}

export interface StudentRecord {
  id: string;
  name: string;
  classGroup: string;
  completedAt: string;
  visitedProfessionsCount: number;
  visitedProfessions: string[];
  minigameScores: {
    guess: number;
    tools: number;
    whoami: number;
    workplace: number;
  };
  finalQuizScore: number;
  totalScore: number;
  earnedStars: number;
  medalTier: string;
  status: 'Selesai' | 'Sedang Belajar';
  violationCount: number;
  violations: ViolationRecord[];
  answerLogs: AnswerLog[];
}

export interface PlayerProgress {
  playerName: string;
  score: number;
  visitedProfessions: string[]; // profession IDs
  completedMinigames: {
    guess: boolean;
    tools: boolean;
    whoami: boolean;
    workplace: boolean;
  };
  minigameScores: {
    guess: number;
    tools: number;
    whoami: number;
    workplace: number;
  };
  finalQuizCompleted: boolean;
  finalQuizScore: number;
  earnedStars: number;
  completedAt?: string;
  violationCount: number;
  violations: ViolationRecord[];
  answerLogs: AnswerLog[];
}

export interface TeacherUser {
  email: string;
  name: string;
  avatarUrl?: string;
  school: string;
  role: string;
  loggedInAt: string;
}
