import React, { useState, useEffect, useRef } from 'react';
import {
  ScreenState,
  Profession,
  PlayerProgress,
  StudentRecord,
  MissionLockState,
  TeacherMessage,
  AnswerLog,
  ViolationRecord
} from './types/game';
import { PROFESSIONS_DATA } from './data/professions';
import { TitleScreen } from './components/TitleScreen';
import { InstructionsModal } from './components/InstructionsModal';
import { AdventureMap } from './components/AdventureMap';
import { ProfessionDetailModal } from './components/ProfessionDetailModal';
import { MinigameGuessProfession } from './components/MinigameGuessProfession';
import { MinigameToolMatch } from './components/MinigameToolMatch';
import { MinigameWhoAmI } from './components/MinigameWhoAmI';
import { MinigameWorkplaceMatch } from './components/MinigameWorkplaceMatch';
import { FinalQuiz } from './components/FinalQuiz';
import { CertificateModal } from './components/CertificateModal';
import { EndingScreen } from './components/EndingScreen';
import { TeacherDashboard } from './components/TeacherDashboard';
import { AntiCheatWarningModal } from './components/AntiCheatWarningModal';
import { TeacherMessageNotification } from './components/TeacherMessageNotification';
import { AudioControls } from './components/AudioControls';
import { soundManager } from './utils/audio';
import { fireMiniGameCompleteConfetti, fireChampionshipConfetti } from './utils/confetti';
import { INITIAL_SAMPLE_STUDENTS } from './data/sampleStudents';

const STORAGE_KEY = 'misi_jelajah_pekerjaan_progress_v2';
const STUDENTS_STORAGE_KEY = 'misi_jelajah_teacher_students_v2';
const LOCKS_STORAGE_KEY = 'misi_jelajah_mission_locks_v2';
const MESSAGES_STORAGE_KEY = 'misi_jelajah_teacher_messages_v2';

const DEFAULT_LOCKS: MissionLockState = {
  guru: true,
  dokter: true,
  polisi: true,
  petani: true,
  pilot: true,
  nelayan: true,
  koki: true,
  pemadam: true,
  'final-quiz': true
};

const INITIAL_TEACHER_MESSAGES: TeacherMessage[] = [
  {
    id: 'msg_welcome',
    teacherName: 'Pak Faizal, S.Pd.',
    targetStudentName: 'Semua Siswa',
    category: 'Pengumuman',
    message: 'Selamat datang di Game Edukasi Misi Jelajah Profesi Kelas 4! Kerjakan setiap pos dengan teliti dan jujur ya anak-anak.',
    timestamp: '08:00:00',
    read: false
  }
];

const DEFAULT_PROGRESS: PlayerProgress = {
  playerName: 'Petualang Cilik',
  score: 0,
  visitedProfessions: [],
  completedMinigames: {
    guess: false,
    tools: false,
    whoami: false,
    workplace: false
  },
  minigameScores: {
    guess: 0,
    tools: 0,
    whoami: 0,
    workplace: 0
  },
  finalQuizCompleted: false,
  finalQuizScore: 0,
  earnedStars: 0,
  violationCount: 0,
  violations: [],
  answerLogs: []
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('title');
  const [selectedProfession, setSelectedProfession] = useState<Profession | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [certificateData, setCertificateData] = useState<PlayerProgress | null>(null);

  // Anti-Cheat & Messaging Modal State
  const [isAntiCheatModalOpen, setIsAntiCheatModalOpen] = useState(false);
  const [isMessageDrawerOpen, setIsMessageDrawerOpen] = useState(false);
  const lastViolationTriggerRef = useRef<number>(0);

  // Student database state for Teacher Dashboard
  const [students, setStudents] = useState<StudentRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STUDENTS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_SAMPLE_STUDENTS;
  });

  // Mission Lock Controls State
  const [missionLocks, setMissionLocks] = useState<MissionLockState>(() => {
    try {
      const saved = localStorage.getItem(LOCKS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return DEFAULT_LOCKS;
  });

  // Teacher Messages State
  const [teacherMessages, setTeacherMessages] = useState<TeacherMessage[]>(() => {
    try {
      const saved = localStorage.getItem(MESSAGES_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_TEACHER_MESSAGES;
  });

  const [progress, setProgress] = useState<PlayerProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return DEFAULT_PROGRESS;
  });

  // Save progress changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // ignore
    }
  }, [progress]);

  // Save students database changes
  useEffect(() => {
    try {
      localStorage.setItem(STUDENTS_STORAGE_KEY, JSON.stringify(students));
    } catch {
      // ignore
    }
  }, [students]);

  // Save mission locks
  useEffect(() => {
    try {
      localStorage.setItem(LOCKS_STORAGE_KEY, JSON.stringify(missionLocks));
    } catch {
      // ignore
    }
  }, [missionLocks]);

  // Save teacher messages
  useEffect(() => {
    try {
      localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(teacherMessages));
    } catch {
      // ignore
    }
  }, [teacherMessages]);

  // Handle URL autostart (?autostart=1 skips title to map, ?teacher=1 goes to dashboard)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('teacher') === '1') {
      setCurrentScreen('teacher-dashboard');
    } else if (params.get('autostart') === '1') {
      setCurrentScreen('map');
    }
  }, []);

  // Sync body dataset state
  useEffect(() => {
    document.body.dataset.state = currentScreen;
  }, [currentScreen]);

  // --- ANTI-CHEAT DETECTION (Tab Switching & Window Blur) ---
  useEffect(() => {
    // Only detect violations in student mode
    if (currentScreen === 'teacher-dashboard') return;

    const handleViolation = (type: 'TAB_HIDDEN' | 'TAB_BLUR') => {
      const now = Date.now();
      // Debounce 1500ms to avoid duplicate trigger when user switches apps
      if (now - lastViolationTriggerRef.current < 1500) return;
      lastViolationTriggerRef.current = now;

      const timeStr = new Date().toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });

      const screenDesc =
        currentScreen === 'final-quiz'
          ? 'Kuis Akhir'
          : currentScreen === 'map'
          ? 'Peta Petualangan'
          : currentScreen.startsWith('minigame')
          ? 'Mini Game'
          : currentScreen;

      const newViolation: ViolationRecord = {
        id: 'viol_' + now,
        timestamp: timeStr,
        type: type,
        screen: screenDesc,
        description:
          type === 'TAB_HIDDEN'
            ? 'Meninggalkan tab browser (Buka tab lain)'
            : 'Fokus jendela browser hilang (Pindah aplikasi)'
      };

      soundManager.playViolation();
      setIsAntiCheatModalOpen(true);

      setProgress((prev) => {
        const updatedCount = (prev.violationCount || 0) + 1;
        const updatedViolations = [newViolation, ...(prev.violations || [])];
        return {
          ...prev,
          violationCount: updatedCount,
          violations: updatedViolations
        };
      });

      // Synchronize immediately to active student in teacher dashboard
      setStudents((prev) => {
        const exists = prev.find(
          (s) => s.name.toLowerCase() === progress.playerName.toLowerCase()
        );
        if (exists) {
          return prev.map((s) =>
            s.id === exists.id
              ? {
                  ...s,
                  violationCount: (s.violationCount || 0) + 1,
                  violations: [newViolation, ...(s.violations || [])]
                }
              : s
          );
        }
        return prev;
      });
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        handleViolation('TAB_HIDDEN');
      }
    };

    const handleWindowBlur = () => {
      handleViolation('TAB_BLUR');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [currentScreen, progress.playerName]);

  const handleStartAdventure = (playerName: string, targetProfessionId?: string) => {
    if (playerName === 'teacher_mode_nav') {
      setCurrentScreen('teacher-dashboard');
      return;
    }

    const matchedStudent = students.find(
      (s) => s.name.toLowerCase() === playerName.trim().toLowerCase()
    );

    if (matchedStudent) {
      setProgress((prev) => ({
        ...prev,
        playerName: matchedStudent.name,
        score: matchedStudent.totalScore,
        earnedStars: matchedStudent.earnedStars,
        visitedProfessions: matchedStudent.visitedProfessions || [],
        minigameScores: matchedStudent.minigameScores || prev.minigameScores,
        finalQuizScore: matchedStudent.finalQuizScore || 0,
        violationCount: matchedStudent.violationCount || 0,
        violations: matchedStudent.violations || [],
        answerLogs: matchedStudent.answerLogs || []
      }));
    } else {
      setProgress((prev) => ({
        ...prev,
        playerName: playerName.trim() || prev.playerName
      }));
    }

    if (targetProfessionId) {
      const targetProf = PROFESSIONS_DATA.find((p) => p.id === targetProfessionId);
      if (targetProf) {
        setSelectedProfession(targetProf);
        setIsDetailOpen(true);
      }
    }
    setCurrentScreen('map');
  };

  const handleUpdateStudent = (updatedStudent: StudentRecord) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === updatedStudent.id ? updatedStudent : s))
    );

    if (
      progress.playerName.toLowerCase() === updatedStudent.name.toLowerCase()
    ) {
      setProgress((prev) => ({
        ...prev,
        score: updatedStudent.totalScore,
        earnedStars: updatedStudent.earnedStars,
        minigameScores: updatedStudent.minigameScores,
        finalQuizScore: updatedStudent.finalQuizScore,
        visitedProfessions: updatedStudent.visitedProfessions || prev.visitedProfessions,
        violationCount: updatedStudent.violationCount,
        violations: updatedStudent.violations,
        answerLogs: updatedStudent.answerLogs
      }));
    }
  };

  const handleAddScore = (points: number) => {
    setProgress((prev) => ({
      ...prev,
      score: prev.score + points
    }));
  };

  const handleSelectProfession = (prof: Profession) => {
    setSelectedProfession(prof);
    setIsDetailOpen(true);
  };

  const handleMarkAsVisited = (professionId: string) => {
    setProgress((prev) => {
      if (prev.visitedProfessions.includes(professionId)) return prev;
      return {
        ...prev,
        score: prev.score + 10,
        earnedStars: prev.earnedStars + 1,
        visitedProfessions: [...prev.visitedProfessions, professionId]
      };
    });
  };

  // Record question answers into student logs
  const handleRecordAnswerLog = (log: AnswerLog) => {
    setProgress((prev) => ({
      ...prev,
      answerLogs: [log, ...(prev.answerLogs || [])]
    }));

    // Update in students database if student exists
    setStudents((prev) => {
      const existing = prev.find(
        (s) => s.name.toLowerCase() === progress.playerName.toLowerCase()
      );
      if (existing) {
        return prev.map((s) =>
          s.id === existing.id
            ? {
                ...s,
                answerLogs: [log, ...(s.answerLogs || [])]
              }
            : s
        );
      }
      return prev;
    });
  };

  const handleMinigameGuessComplete = (gameScore: number) => {
    setProgress((prev) => ({
      ...prev,
      completedMinigames: { ...prev.completedMinigames, guess: true },
      minigameScores: { ...prev.minigameScores, guess: gameScore },
      earnedStars: prev.earnedStars + 2
    }));
    soundManager.playCorrect();
    fireMiniGameCompleteConfetti();
    setCurrentScreen('map');
  };

  const handleMinigameToolsComplete = (gameScore: number) => {
    setProgress((prev) => ({
      ...prev,
      completedMinigames: { ...prev.completedMinigames, tools: true },
      minigameScores: { ...prev.minigameScores, tools: gameScore },
      earnedStars: prev.earnedStars + 3
    }));
    soundManager.playCorrect();
    fireMiniGameCompleteConfetti();
    setCurrentScreen('map');
  };

  const handleMinigameWhoAmIComplete = (gameScore: number) => {
    setProgress((prev) => ({
      ...prev,
      completedMinigames: { ...prev.completedMinigames, whoami: true },
      minigameScores: { ...prev.minigameScores, whoami: gameScore },
      earnedStars: prev.earnedStars + 2
    }));
    soundManager.playCorrect();
    fireMiniGameCompleteConfetti();
    setCurrentScreen('map');
  };

  const handleMinigameWorkplaceComplete = (gameScore: number) => {
    setProgress((prev) => ({
      ...prev,
      completedMinigames: { ...prev.completedMinigames, workplace: true },
      minigameScores: { ...prev.minigameScores, workplace: gameScore },
      earnedStars: prev.earnedStars + 2
    }));
    soundManager.playCorrect();
    fireMiniGameCompleteConfetti();
    setCurrentScreen('map');
  };

  const handleFinalQuizComplete = (quizScore: number) => {
    const finalScore = progress.score + quizScore;
    const finalStars = progress.earnedStars + 5;

    setProgress((prev) => ({
      ...prev,
      score: finalScore,
      finalQuizCompleted: true,
      finalQuizScore: quizScore,
      earnedStars: finalStars,
      completedAt: new Date().toISOString()
    }));

    // Auto-record to teacher dashboard students list
    const newStudentRecord: StudentRecord = {
      id: 'student_' + Date.now(),
      name: progress.playerName,
      classGroup: '4A',
      completedAt: new Date().toLocaleDateString('id-ID'),
      visitedProfessionsCount: progress.visitedProfessions.length,
      visitedProfessions: progress.visitedProfessions,
      minigameScores: progress.minigameScores,
      finalQuizScore: quizScore,
      totalScore: finalScore,
      earnedStars: finalStars,
      medalTier:
        finalScore >= 180
          ? 'Medali Emas: Master Penjelajah'
          : finalScore >= 110
          ? 'Medali Perak: Ahli Penjelajah'
          : 'Medali Perunggu: Muda Cekatan',
      status: 'Selesai',
      violationCount: progress.violationCount || 0,
      violations: progress.violations || [],
      answerLogs: progress.answerLogs || []
    };

    setStudents((prev) => [
      newStudentRecord,
      ...prev.filter((s) => s.name.toLowerCase() !== progress.playerName.toLowerCase())
    ]);
    fireChampionshipConfetti();
    setCurrentScreen('ending');
  };

  const handlePlayAgain = () => {
    soundManager.playClick();
    setProgress({
      ...DEFAULT_PROGRESS,
      playerName: progress.playerName
    });
    localStorage.removeItem(STORAGE_KEY);
    setCurrentScreen('map');
  };

  // --- Teacher Dashboard Actions ---
  const handleAddStudent = (newStudent: StudentRecord) => {
    setStudents((prev) => [newStudent, ...prev]);
  };

  const handleDeleteStudent = (studentId: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== studentId));
  };

  const handleLoadSampleData = () => {
    soundManager.playCorrect();
    setStudents(INITIAL_SAMPLE_STUDENTS);
  };

  const handleClearAllData = () => {
    soundManager.playClick();
    setStudents([]);
    localStorage.removeItem(STUDENTS_STORAGE_KEY);
  };

  const handleResetStudentViolations = (studentId: string) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, violationCount: 0, violations: [] } : s))
    );
  };

  const handleToggleMissionLock = (missionId: string) => {
    setMissionLocks((prev) => ({
      ...prev,
      [missionId]: prev[missionId] === false ? true : false
    }));
  };

  const handleSetAllMissionLocks = (unlocked: boolean) => {
    setMissionLocks({
      guru: unlocked,
      dokter: unlocked,
      polisi: unlocked,
      petani: unlocked,
      pilot: unlocked,
      nelayan: unlocked,
      koki: unlocked,
      pemadam: unlocked,
      'final-quiz': unlocked
    });
  };

  const handleSendMessage = (msg: {
    targetStudentName: string;
    category: TeacherMessage['category'];
    message: string;
  }) => {
    const newMsg: TeacherMessage = {
      id: 'msg_' + Date.now(),
      teacherName: 'Pak Faizal, S.Pd.',
      targetStudentName: msg.targetStudentName,
      category: msg.category,
      message: msg.message,
      timestamp: new Date().toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }),
      read: false
    };

    setTeacherMessages((prev) => [newMsg, ...prev]);

    // If sent to current student or broadcast, sound alert chime!
    if (
      msg.targetStudentName === 'Semua Siswa' ||
      msg.targetStudentName.toLowerCase() === progress.playerName.toLowerCase()
    ) {
      soundManager.playTeacherMessage();
    }
  };

  const handleDeleteMessage = (msgId: string) => {
    setTeacherMessages((prev) => prev.filter((m) => m.id !== msgId));
  };

  const handleMarkMessageAsRead = (messageId: string) => {
    setTeacherMessages((prev) =>
      prev.map((m) => (m.id === messageId ? { ...m, read: true } : m))
    );
  };

  const handleViewStudentCertificate = (student: StudentRecord) => {
    setCertificateData({
      playerName: student.name,
      score: student.totalScore,
      visitedProfessions: student.visitedProfessions,
      completedMinigames: { guess: true, tools: true, whoami: true, workplace: true },
      minigameScores: student.minigameScores,
      finalQuizCompleted: true,
      finalQuizScore: student.finalQuizScore,
      earnedStars: student.earnedStars,
      completedAt: student.completedAt,
      violationCount: student.violationCount || 0,
      violations: student.violations || [],
      answerLogs: student.answerLogs || []
    });
    setIsCertificateOpen(true);
  };

  const handleOpenMyCertificate = () => {
    setCertificateData(progress);
    setIsCertificateOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100/60 via-amber-50 to-emerald-100/40 text-slate-800 flex flex-col items-center justify-start p-3 sm:p-6 select-none relative overflow-x-hidden font-body">
      {/* Persistent Audio & Speech Toggles */}
      <AudioControls />

      {/* Screen Routing */}
      {currentScreen === 'title' && (
        <TitleScreen
          onStart={handleStartAdventure}
          onOpenInstructions={() => setIsInstructionsOpen(true)}
          initialPlayerName={progress.playerName}
          students={students}
        />
      )}

      {currentScreen === 'map' && (
        <AdventureMap
          progress={progress}
          onSelectProfession={handleSelectProfession}
          onNavigateScreen={setCurrentScreen}
          onOpenInstructions={() => setIsInstructionsOpen(true)}
          missionLocks={missionLocks}
          teacherMessages={teacherMessages}
          onOpenTeacherMessages={() => setIsMessageDrawerOpen(true)}
        />
      )}

      {currentScreen === 'minigame-guess' && (
        <MinigameGuessProfession
          onAddScore={handleAddScore}
          onComplete={handleMinigameGuessComplete}
          onBackToMap={() => setCurrentScreen('map')}
        />
      )}

      {currentScreen === 'minigame-tools' && (
        <MinigameToolMatch
          onAddScore={handleAddScore}
          onComplete={handleMinigameToolsComplete}
          onBackToMap={() => setCurrentScreen('map')}
        />
      )}

      {currentScreen === 'minigame-whoami' && (
        <MinigameWhoAmI
          onAddScore={handleAddScore}
          onComplete={handleMinigameWhoAmIComplete}
          onBackToMap={() => setCurrentScreen('map')}
        />
      )}

      {currentScreen === 'minigame-workplace' && (
        <MinigameWorkplaceMatch
          onAddScore={handleAddScore}
          onComplete={handleMinigameWorkplaceComplete}
          onBackToMap={() => setCurrentScreen('map')}
        />
      )}

      {currentScreen === 'final-quiz' && (
        <FinalQuiz
          onAddScore={handleAddScore}
          onFinishQuiz={handleFinalQuizComplete}
          onBackToMap={() => setCurrentScreen('map')}
          onRecordAnswerLog={handleRecordAnswerLog}
        />
      )}

      {currentScreen === 'ending' && (
        <EndingScreen
          progress={progress}
          onPlayAgain={handlePlayAgain}
          onOpenCertificate={handleOpenMyCertificate}
          onBackToMap={() => setCurrentScreen('map')}
        />
      )}

      {currentScreen === 'teacher-dashboard' && (
        <TeacherDashboard
          students={students}
          onAddStudent={handleAddStudent}
          onUpdateStudent={handleUpdateStudent}
          onDeleteStudent={handleDeleteStudent}
          onLoadSampleData={handleLoadSampleData}
          onClearAllData={handleClearAllData}
          onBackToGame={() => setCurrentScreen('map')}
          onBackToHome={() => setCurrentScreen('title')}
          onViewStudentCertificate={handleViewStudentCertificate}
          missionLocks={missionLocks}
          onToggleMissionLock={handleToggleMissionLock}
          onSetAllMissionLocks={handleSetAllMissionLocks}
          teacherMessages={teacherMessages}
          onSendMessage={handleSendMessage}
          onDeleteMessage={handleDeleteMessage}
          onResetStudentViolations={handleResetStudentViolations}
        />
      )}

      {/* Modal: Detailed Profession Profile */}
      <ProfessionDetailModal
        profession={selectedProfession}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        isVisited={Boolean(
          selectedProfession && progress.visitedProfessions.includes(selectedProfession.id)
        )}
        onMarkAsVisited={handleMarkAsVisited}
        onPlayMinigame={() => {
          setIsDetailOpen(false);
          setCurrentScreen('minigame-guess');
        }}
        onRecordAnswerLog={handleRecordAnswerLog}
      />

      {/* Modal: Game Instructions & Educational Objectives */}
      <InstructionsModal
        isOpen={isInstructionsOpen}
        onClose={() => setIsInstructionsOpen(false)}
      />

      {/* Modal: Official Digital Certificate */}
      <CertificateModal
        progress={certificateData || progress}
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
      />

      {/* Modal: Student Anti-Cheat Warning Alert */}
      <AntiCheatWarningModal
        isOpen={isAntiCheatModalOpen}
        playerName={progress.playerName}
        violationCount={progress.violationCount || 0}
        lastViolationTime={progress.violations?.[0]?.timestamp}
        onDismiss={() => setIsAntiCheatModalOpen(false)}
      />

      {/* Notification & Drawer: Teacher to Student Messages */}
      <TeacherMessageNotification
        messages={teacherMessages}
        currentStudentName={progress.playerName}
        onMarkAsRead={handleMarkMessageAsRead}
        isOpenDrawer={isMessageDrawerOpen}
        onCloseDrawer={() => setIsMessageDrawerOpen(false)}
      />
    </div>
  );
}
