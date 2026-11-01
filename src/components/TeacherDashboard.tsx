import React, { useState } from 'react';
import {
  Users,
  Award,
  Trophy,
  Download,
  Plus,
  RefreshCw,
  Search,
  CheckCircle2,
  Trash2,
  Printer,
  Music,
  ArrowLeft,
  GraduationCap,
  Sparkles,
  Sliders,
  Play,
  Pause,
  LogOut,
  LogIn,
  ShieldCheck,
  ShieldAlert,
  Lock,
  Unlock,
  Send,
  MessageSquare,
  FileText,
  AlertTriangle,
  RotateCcw,
  Check,
  Megaphone,
  BookOpen,
  Calculator,
  Palette,
  Activity,
  Home
} from 'lucide-react';
import { StudentRecord, PlayerProgress, TeacherUser, MissionLockState, TeacherMessage, MataPelajaran } from '../types/game';
import { soundManager, MUSIC_TRACKS, MusicTrack } from '../utils/audio';
import { GoogleLoginModal } from './GoogleLoginModal';
import { StudentAnswerLogModal } from './StudentAnswerLogModal';
import { StudentScoreEditModal } from './StudentScoreEditModal';
import { TeacherWarningModal } from './TeacherWarningModal';
import { PROFESSIONS_DATA } from '../data/professions';
import { SUBJECT_METADATA } from '../data/subjectCurriculum';

interface TeacherDashboardProps {
  students: StudentRecord[];
  onAddStudent: (student: StudentRecord) => void;
  onUpdateStudent: (student: StudentRecord) => void;
  onDeleteStudent: (id: string) => void;
  onLoadSampleData: () => void;
  onClearAllData: () => void;
  onBackToGame: () => void;
  onBackToHome: () => void;
  onViewStudentCertificate: (student: StudentRecord) => void;
  missionLocks: MissionLockState;
  onToggleMissionLock: (missionId: string) => void;
  onSetAllMissionLocks: (unlocked: boolean) => void;
  teacherMessages: TeacherMessage[];
  onSendMessage: (msg: { targetStudentName: string; category: TeacherMessage['category']; message: string }) => void;
  onDeleteMessage: (msgId: string) => void;
  onResetStudentViolations: (studentId: string) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  students,
  onAddStudent,
  onUpdateStudent,
  onDeleteStudent,
  onLoadSampleData,
  onClearAllData,
  onBackToGame,
  onBackToHome,
  onViewStudentCertificate,
  missionLocks,
  onToggleMissionLock,
  onSetAllMissionLocks,
  teacherMessages,
  onSendMessage,
  onDeleteMessage,
  onResetStudentViolations
}) => {
  // Tabs: 'students' | 'violations' | 'locks' | 'messages'
  const [activeTab, setActiveTab] = useState<'students' | 'violations' | 'locks' | 'messages'>('students');

  // Google Teacher Authentication State
  const [teacherUser, setTeacherUser] = useState<TeacherUser | null>(() => {
    try {
      const saved = localStorage.getItem('teacher_google_auth');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return null;
  });
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(() => !localStorage.getItem('teacher_google_auth'));

  const [searchQuery, setSearchQuery] = useState('');
  const [filterMedal, setFilterMedal] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Student Answer Log Modal State
  const [selectedStudentForLogs, setSelectedStudentForLogs] = useState<StudentRecord | null>(null);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);

  // Student Score Edit Modal State
  const [scoreEditStudent, setScoreEditStudent] = useState<StudentRecord | null>(null);
  const [isScoreEditModalOpen, setIsScoreEditModalOpen] = useState(false);

  // Teacher Warning Modal State
  const [warningTargetName, setWarningTargetName] = useState<string>('Semua Siswa');
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);

  // New Student Form State
  const [newName, setNewName] = useState('');
  const [newClass, setNewClass] = useState('4A');
  const [newQuizScore, setNewQuizScore] = useState(80);
  const [newVisitedCount, setNewVisitedCount] = useState(8);

  // Teacher Message Composer Form State
  const [messageTarget, setMessageTarget] = useState('Semua Siswa');
  const [messageCategory, setMessageCategory] = useState<TeacherMessage['category']>('Pengumuman');
  const [messageText, setMessageText] = useState('');

  // Audio state inside dashboard
  const [isBgmPlaying, setIsBgmPlaying] = useState(soundManager.getIsBgmPlaying());
  const [currentTrack, setCurrentTrack] = useState<MusicTrack>(soundManager.getCurrentTrack());
  const [volume, setVolume] = useState(soundManager.getVolume());

  const handleGoogleLoginSuccess = (user: TeacherUser) => {
    setTeacherUser(user);
    setIsGoogleModalOpen(false);
    try {
      localStorage.setItem('teacher_google_auth', JSON.stringify(user));
    } catch {
      // ignore
    }
  };

  const handleTeacherLogout = () => {
    soundManager.playClick();
    setTeacherUser(null);
    setIsGoogleModalOpen(true);
    try {
      localStorage.removeItem('teacher_google_auth');
    } catch {
      // ignore
    }
  };

  // Subscribe to audio changes
  React.useEffect(() => {
    return soundManager.subscribe(() => {
      setIsBgmPlaying(soundManager.getIsBgmPlaying());
      setCurrentTrack(soundManager.getCurrentTrack());
      setVolume(soundManager.getVolume());
    });
  }, []);

  // Filter students
  const filteredStudents = students.filter(s => {
    const matchName = s.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchMedal = filterMedal === 'all' || s.medalTier.toLowerCase().includes(filterMedal.toLowerCase());
    return matchName && matchMedal;
  });

  // Analytics
  const totalStudents = students.length;
  const avgQuizScore = totalStudents > 0
    ? Math.round(students.reduce((acc, s) => acc + s.finalQuizScore, 0) / totalStudents)
    : 0;
  const goldMedalCount = students.filter(s => s.medalTier.toLowerCase().includes('emas')).length;
  const avgVisited = totalStudents > 0
    ? (students.reduce((acc, s) => acc + s.visitedProfessionsCount, 0) / totalStudents).toFixed(1)
    : '0';

  // Anti-Cheat Stats
  const totalViolations = students.reduce((acc, s) => acc + (s.violationCount || 0), 0);
  const studentsWithViolations = students.filter(s => (s.violationCount || 0) > 0);

  // All violations across all students for the anti-cheat tab
  const allViolationRecords = students.flatMap(s => 
    (s.violations || []).map(v => ({
      studentId: s.id,
      studentName: s.name,
      classGroup: s.classGroup,
      ...v
    }))
  ).sort((a, b) => (b.timestamp || '').localeCompare(a.timestamp || ''));

  // Export to CSV for Excel
  const handleExportCSV = () => {
    soundManager.playClick();
    if (students.length === 0) {
      alert('Belum ada data siswa untuk diekspor.');
      return;
    }

    const headers = [
      'No',
      'Nama Siswa',
      'Kelas',
      'Tanggal Selesai',
      'Pos Terjelajahi (dari 8)',
      'Nilai Tebak Profesi',
      'Nilai Pasang Alat',
      'Nilai Siapa Aku',
      'Nilai Tempat Kerja',
      'Nilai Kuis Akhir',
      'Total Poin',
      'Pelanggaran Keluar Tab',
      'Bintang',
      'Tingkat Medali',
      'Status'
    ];

    const rows = students.map((s, idx) => [
      idx + 1,
      `"${s.name}"`,
      s.classGroup,
      `"${s.completedAt}"`,
      s.visitedProfessionsCount,
      s.minigameScores.guess,
      s.minigameScores.tools,
      s.minigameScores.whoami,
      s.minigameScores.workplace,
      s.finalQuizScore,
      s.totalScore,
      s.violationCount || 0,
      s.earnedStars,
      `"${s.medalTier}"`,
      s.status
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `rekap_nilai_kelas_4_misi_profesi_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    soundManager.playCorrect();
    const totalScore = newQuizScore + (newVisitedCount * 10) + 70;
    let medal = 'Medali Emas';
    if (totalScore < 110) medal = 'Medali Perunggu';
    else if (totalScore < 180) medal = 'Medali Perak';

    const newStudent: StudentRecord = {
      id: 'student_' + Date.now(),
      name: newName.trim(),
      classGroup: newClass,
      completedAt: new Date().toLocaleDateString('id-ID'),
      visitedProfessionsCount: newVisitedCount,
      visitedProfessions: ['guru', 'dokter', 'polisi', 'petani', 'pilot', 'nelayan', 'koki', 'pemadam'].slice(0, newVisitedCount),
      minigameScores: {
        guess: 20,
        tools: 20,
        whoami: 20,
        workplace: 10
      },
      finalQuizScore: newQuizScore,
      totalScore: totalScore,
      earnedStars: Math.min(10, Math.round(totalScore / 20)),
      medalTier: medal,
      status: 'Selesai',
      violationCount: 0,
      violations: [],
      answerLogs: []
    };

    onAddStudent(newStudent);
    setNewName('');
    setIsAddModalOpen(false);
  };

  const handleOpenStudentLogs = (student: StudentRecord) => {
    soundManager.playClick();
    setSelectedStudentForLogs(student);
    setIsLogModalOpen(true);
  };

  const handleQuickSendMessage = (studentName: string) => {
    setMessageTarget(studentName);
    setMessageCategory('Peringatan');
    setMessageText(`Harap fokus kembali mengerjakan kuis di tab permainan dan jangan beralih aplikasi ya.`);
    setIsLogModalOpen(false);
    setActiveTab('messages');
  };

  const handleOpenScoreEdit = (student: StudentRecord) => {
    soundManager.playClick();
    setScoreEditStudent(student);
    setIsScoreEditModalOpen(true);
  };

  const handleOpenWarningModal = (targetName: string) => {
    soundManager.playClick();
    setWarningTargetName(targetName);
    setIsWarningModalOpen(true);
  };

  const handleSendWarning = (target: string, msg: string) => {
    onSendMessage({
      targetStudentName: target,
      category: 'Peringatan',
      message: msg
    });
  };

  const handleSubmitMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    soundManager.playTeacherMessage();
    onSendMessage({
      targetStudentName: messageTarget,
      category: messageCategory,
      message: messageText.trim()
    });
    setMessageText('');
    alert(`Pesan berhasil dikirim ke: ${messageTarget}!`);
  };

  const applyTemplate = (text: string, cat: TeacherMessage['category']) => {
    soundManager.playClick();
    setMessageText(text);
    setMessageCategory(cat);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-7 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border-4 border-amber-300 flex flex-col gap-6">
      {/* Top Banner Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-amber-200 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-0.5 bg-indigo-600 text-white font-black text-[11px] uppercase tracking-wider rounded-full shadow-xs">
              Portal Guru & Wali Kelas 4 SD
            </span>
            <span className="text-xs text-slate-500 font-medium">Kurikulum Merdeka 5 Mapel</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-slate-900">
            Dashboard Guru: Jelajah Dunia Pekerjaan
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Monitoring data siswa, buku log audit jawaban, kontrol anti-kecurangan, kendali kunci misi, & komunikasi kelas.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {teacherUser ? (
            <div className="flex items-center gap-2.5 bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 px-3 py-1.5 rounded-2xl shadow-xs">
              <div className="relative">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                  FZ
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border border-white rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-2 h-2 text-white" />
                </span>
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1">
                  <span className="font-bold text-slate-900 text-xs">{teacherUser.name}</span>
                  <span className="text-[9px] font-bold px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded">
                    Google
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 font-mono truncate max-w-[140px]">{teacherUser.email}</p>
              </div>
              <button
                onClick={handleTeacherLogout}
                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                title="Keluar dari Akun Google"
              >
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                soundManager.playClick();
                setIsGoogleModalOpen(true);
              }}
              className="px-3.5 py-2 bg-white hover:bg-slate-50 border-2 border-slate-300 text-slate-800 font-bold text-xs rounded-2xl shadow-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Login Google</span>
            </button>
          )}

          <button
            onClick={() => {
              soundManager.playClick();
              onBackToHome();
            }}
            className="px-3.5 sm:px-4 py-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-md flex items-center gap-2 active:scale-95 transition-all cursor-pointer border border-blue-400/30"
            title="Kembali ke Halaman Depan / Utama"
          >
            <Home size={16} className="text-amber-300" />
            <span>Kembali ke Halaman Utama</span>
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              onBackToGame();
            }}
            className="px-3.5 sm:px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer"
            title="Kembali ke Peta Petualangan Siswa"
          >
            <ArrowLeft size={16} />
            <span>Peta Siswa</span>
          </button>
        </div>
      </div>

      {/* Classroom Pleasant Music & Sound Hub */}
      <div className="p-4 rounded-3xl bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100/60 border-2 border-amber-200 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="p-3 bg-amber-500 text-white rounded-2xl shadow-md shrink-0">
            <Music className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-black text-sm sm:text-base text-amber-950">
                Musik Pengiring Suasana Kelas
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">
                {isBgmPlaying ? 'Sedang Memutar' : 'Dijeda'}
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Pilih melodi riang yang menyenangkan saat siswa bermain di kelas atau laboratorium komputer:
            </p>
          </div>
        </div>

        {/* Music Controls Inside Dashboard */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end">
          <select
            value={currentTrack.id}
            onChange={(e) => {
              soundManager.playClick();
              soundManager.setTrack(e.target.value as MusicTrack['id']);
            }}
            className="px-3 py-2 bg-white border border-amber-300 rounded-xl text-xs font-bold text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            {MUSIC_TRACKS.map(t => (
              <option key={t.id} value={t.id}>
                🎵 {t.name} ({t.genre})
              </option>
            ))}
          </select>

          <button
            onClick={() => {
              soundManager.playClick();
              if (isBgmPlaying) soundManager.stopBGM();
              else soundManager.startBGM();
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm ${
              isBgmPlaying
                ? 'bg-amber-500 text-white hover:bg-amber-600'
                : 'bg-slate-800 text-white hover:bg-slate-900'
            }`}
          >
            {isBgmPlaying ? <Pause size={14} /> : <Play size={14} />}
            <span>{isBgmPlaying ? 'Jeda Musik' : 'Putar Musik'}</span>
          </button>

          <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-amber-200">
            <Sliders size={13} className="text-amber-700" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setVolume(val);
                soundManager.setVolume(val);
              }}
              className="w-16 sm:w-20 accent-amber-500 cursor-pointer"
              title="Volume"
            />
            <span className="text-[10px] font-mono font-bold text-slate-600 tabular-nums">
              {Math.round(volume * 100)}%
            </span>
          </div>
        </div>
      </div>

      {/* KPI Stats Cards Strip */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold uppercase text-slate-500">Total Siswa</span>
            <Users className="w-5 h-5 text-indigo-600" />
          </div>
          <span className="text-2xl font-black font-display text-slate-900 tabular-nums">
            {totalStudents} Siswa
          </span>
          <p className="text-[10px] text-slate-500 mt-0.5">Tercatat di sistem</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 shadow-xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold uppercase text-amber-800">Rata-Rata Kuis</span>
            <Trophy className="w-5 h-5 text-amber-500" />
          </div>
          <span className="text-2xl font-black font-display text-amber-950 tabular-nums">
            {avgQuizScore} / 100
          </span>
          <p className="text-[10px] text-amber-700 mt-0.5">Tantangan Akhir</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-yellow-50 border border-yellow-200 shadow-xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold uppercase text-yellow-800">Medali Emas</span>
            <Award className="w-5 h-5 text-yellow-600" />
          </div>
          <span className="text-2xl font-black font-display text-yellow-950 tabular-nums">
            {goldMedalCount} Siswa
          </span>
          <p className="text-[10px] text-yellow-700 mt-0.5">Master Penjelajah</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold uppercase text-emerald-800">Rata-rata Pos</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <span className="text-2xl font-black font-display text-emerald-950 tabular-nums">
            {avgVisited} / 8 Pos
          </span>
          <p className="text-[10px] text-emerald-700 mt-0.5">Eksplorasi selesai</p>
        </div>

        <div className={`p-3.5 rounded-2xl border shadow-xs ${
          totalViolations > 0 ? 'bg-rose-50 border-rose-300' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center justify-between mb-1">
            <span className={`text-[11px] font-bold uppercase ${totalViolations > 0 ? 'text-rose-800' : 'text-slate-500'}`}>
              Anti-Kecurangan
            </span>
            <ShieldAlert className={`w-5 h-5 ${totalViolations > 0 ? 'text-rose-600 animate-pulse' : 'text-slate-400'}`} />
          </div>
          <span className={`text-2xl font-black font-display tabular-nums ${totalViolations > 0 ? 'text-rose-700' : 'text-slate-900'}`}>
            {totalViolations} Insiden
          </span>
          <p className={`text-[10px] mt-0.5 ${totalViolations > 0 ? 'text-rose-600 font-bold' : 'text-slate-500'}`}>
            {studentsWithViolations.length} siswa keluar tab
          </p>
        </div>
      </div>

      {/* Main Feature Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => {
            soundManager.playClick();
            setActiveTab('students');
          }}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer transition ${
            activeTab === 'students'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Users size={16} />
          <span>Data Siswa & Rekap Nilai</span>
        </button>

        <button
          onClick={() => {
            soundManager.playClick();
            setActiveTab('violations');
          }}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer transition relative ${
            activeTab === 'violations'
              ? 'bg-rose-600 text-white shadow-md'
              : 'bg-slate-100 text-slate-700 hover:bg-rose-50'
          }`}
        >
          <ShieldAlert size={16} />
          <span>Log Anti-Kecurangan</span>
          {totalViolations > 0 && (
            <span className="px-1.5 py-0.2 bg-white text-rose-700 rounded-full text-[10px] font-black">
              {totalViolations}
            </span>
          )}
        </button>

        <button
          onClick={() => {
            soundManager.playClick();
            setActiveTab('locks');
          }}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer transition ${
            activeTab === 'locks'
              ? 'bg-amber-600 text-white shadow-md'
              : 'bg-slate-100 text-slate-700 hover:bg-amber-50'
          }`}
        >
          <Lock size={16} />
          <span>Kendali Kunci Misi (5 Mapel)</span>
        </button>

        <button
          onClick={() => {
            soundManager.playClick();
            setActiveTab('messages');
          }}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer transition ${
            activeTab === 'messages'
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-slate-100 text-slate-700 hover:bg-purple-50'
          }`}
        >
          <MessageSquare size={16} />
          <span>Kirim Pesan ke Siswa</span>
          {teacherMessages.length > 0 && (
            <span className="px-1.5 py-0.2 bg-purple-200 text-purple-900 rounded-full text-[10px] font-bold">
              {teacherMessages.length}
            </span>
          )}
        </button>
      </div>

      {/* TAB 1: Data Siswa & Rekap Nilai */}
      {activeTab === 'students' && (
        <div className="flex flex-col gap-4">
          {/* Action Bar: Search, Filter, Add, Export, Sample Data */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Search & Filter */}
            <div className="flex flex-wrap items-center gap-2 flex-1">
              <div className="relative flex-1 min-w-[200px] max-w-xs">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari nama siswa..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <select
                value={filterMedal}
                onChange={(e) => setFilterMedal(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <option value="all">Semua Medali</option>
                <option value="emas">Medali Emas</option>
                <option value="perak">Medali Perak</option>
                <option value="perunggu">Medali Perunggu</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => {
                  soundManager.playClick();
                  setIsAddModalOpen(true);
                }}
                className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus size={14} />
                <span>Tambah Siswa</span>
              </button>

              <button
                onClick={onLoadSampleData}
                className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Muat 10 contoh nilai siswa kelas 4"
              >
                <RefreshCw size={14} />
                <span>Muat Data Kelas 4 (10 Siswa)</span>
              </button>

              <button
                onClick={handleExportCSV}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Download file CSV untuk Microsoft Excel / Google Sheets"
              >
                <Download size={14} />
                <span>Ekspor Excel (CSV)</span>
              </button>

              {students.length > 0 && (
                <button
                  onClick={() => {
                    if (confirm('Apakah Anda yakin ingin menghapus seluruh data siswa di dashboard ini?')) {
                      onClearAllData();
                    }
                  }}
                  className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                  title="Bersihkan Data"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Gradebook Table */}
          <div className="w-full overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-3">No</th>
                  <th className="py-3 px-3">Nama Siswa</th>
                  <th className="py-3 px-2">Kelas</th>
                  <th className="py-3 px-2.5">Integritas</th>
                  <th className="py-3 px-3">Pos Selesai</th>
                  <th className="py-3 px-2 text-center">Tebak</th>
                  <th className="py-3 px-2 text-center">Alat</th>
                  <th className="py-3 px-2 text-center">Siapa</th>
                  <th className="py-3 px-2 text-center">Tempat</th>
                  <th className="py-3 px-2.5 text-center">Kuis Akhir</th>
                  <th className="py-3 px-2.5 text-center">Total Skor</th>
                  <th className="py-3 px-3 text-center">Medali</th>
                  <th className="py-3 px-3 text-center">Aksi Guru</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={13} className="py-12 text-center text-slate-400">
                      <GraduationCap className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                      <p className="font-bold text-slate-600">Belum ada data siswa.</p>
                      <p className="text-xs text-slate-400 mt-1">
                        Siswa yang bermain akan otomatis tercatat di sini, atau klik tombol{' '}
                        <span className="font-bold text-emerald-600">"Muat Data Kelas 4 (10 Siswa)"</span> di atas.
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((s, idx) => (
                    <tr key={s.id} className="hover:bg-amber-50/40 transition-colors">
                      <td className="py-3 px-3 text-slate-400 font-mono text-[11px]">{idx + 1}</td>
                      <td className="py-3 px-3 font-bold text-slate-900 whitespace-nowrap">
                        {s.name}
                      </td>
                      <td className="py-3 px-2 font-mono text-slate-600">{s.classGroup}</td>
                      <td className="py-3 px-2.5">
                        {(s.violationCount || 0) > 0 ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-100 text-rose-800 border border-rose-300 flex items-center gap-1 whitespace-nowrap">
                            <ShieldAlert className="w-3 h-3 text-rose-600" />
                            {s.violationCount} Keluar Tab
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1 whitespace-nowrap">
                            <CheckCircle2 className="w-3 h-3" />
                            Aman (0)
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {s.visitedProfessionsCount} / 8 Pos
                        </span>
                      </td>
                      <td className="py-3 px-2 text-center font-mono tabular-nums text-slate-700">
                        {s.minigameScores.guess}
                      </td>
                      <td className="py-3 px-2 text-center font-mono tabular-nums text-slate-700">
                        {s.minigameScores.tools}
                      </td>
                      <td className="py-3 px-2 text-center font-mono tabular-nums text-slate-700">
                        {s.minigameScores.whoami}
                      </td>
                      <td className="py-3 px-2 text-center font-mono tabular-nums text-slate-700">
                        {s.minigameScores.workplace}
                      </td>
                      <td className="py-3 px-2.5 text-center font-mono font-bold tabular-nums text-indigo-900 bg-indigo-50/50">
                        {s.finalQuizScore}
                      </td>
                      <td className="py-3 px-2.5 text-center font-mono font-black tabular-nums text-amber-950 bg-amber-50/50">
                        {s.totalScore}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap ${
                            s.medalTier.toLowerCase().includes('emas')
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : s.medalTier.toLowerCase().includes('perak')
                              ? 'bg-slate-200 text-slate-800 border border-slate-300'
                              : 'bg-orange-100 text-orange-900 border border-orange-300'
                          }`}
                        >
                          {s.medalTier}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => handleOpenScoreEdit(s)}
                            className="px-2.5 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer shadow-xs"
                            title="Atur & Sesuaikan Nilai Siswa Ini"
                          >
                            <Sliders size={12} />
                            <span>Atur Nilai</span>
                          </button>

                          <button
                            onClick={() => handleOpenWarningModal(s.name)}
                            className="px-2.5 py-1 bg-rose-100 hover:bg-rose-200 text-rose-900 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer shadow-xs"
                            title="Beri Peringatan Langsung ke Siswa Ini"
                          >
                            <ShieldAlert size={12} className="text-rose-600" />
                            <span>Peringatan</span>
                          </button>

                          <button
                            onClick={() => handleOpenStudentLogs(s)}
                            className="px-2.5 py-1 bg-indigo-100 hover:bg-indigo-200 text-indigo-900 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer shadow-xs"
                            title="Buka Rekap Log Jawaban 5 Mapel"
                          >
                            <FileText size={12} />
                            <span>Log Jawaban</span>
                          </button>

                          <button
                            onClick={() => {
                              soundManager.playClick();
                              onViewStudentCertificate(s);
                            }}
                            className="px-2 py-1 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                            title="Lihat & Cetak Sertifikat Siswa"
                          >
                            <Printer size={12} />
                            <span>Sertifikat</span>
                          </button>

                          <button
                            onClick={() => {
                              soundManager.playClick();
                              onDeleteStudent(s.id);
                            }}
                            className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="Hapus Nilai Siswa"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Log Integritas & Anti-Kecurangan */}
      {activeTab === 'violations' && (
        <div className="flex flex-col gap-4">
          <div className="p-4 bg-rose-50 border-2 border-rose-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-600" />
                <h3 className="font-display font-black text-base text-rose-950">
                  Audit Pelanggaran Integritas Ujian & Game
                </h3>
              </div>
              <p className="text-xs text-rose-800 mt-0.5">
                Mendeteksi siswa yang keluar dari tab browser atau meminimalkan jendela saat kuis/misi sedang berlangsung.
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-slate-600 block">Total Insiden Tercatat</span>
              <span className="text-2xl font-black font-display text-rose-700">{totalViolations} Kali</span>
            </div>
          </div>

          <div className="w-full overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-3">Waktu Kejadian</th>
                  <th className="py-3 px-3">Nama Siswa</th>
                  <th className="py-3 px-2">Kelas</th>
                  <th className="py-3 px-3">Layar Aktif</th>
                  <th className="py-3 px-3">Deskripsi Pelanggaran</th>
                  <th className="py-3 px-3 text-center">Tindakan Guru</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {allViolationRecords.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400">
                      <ShieldCheck className="w-10 h-10 mx-auto mb-2 text-emerald-500" />
                      <p className="font-bold text-slate-700 text-sm">Tidak ada pelanggaran terdeteksi!</p>
                      <p className="text-xs text-slate-400 mt-1">Seluruh siswa tertib mengerjakan misi tanpa keluar tab.</p>
                    </td>
                  </tr>
                ) : (
                  allViolationRecords.map((item, idx) => (
                    <tr key={idx} className="hover:bg-rose-50/30 transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-rose-700 whitespace-nowrap">
                        {item.timestamp}
                      </td>
                      <td className="py-3 px-3 font-bold text-slate-900 whitespace-nowrap">
                        {item.studentName}
                      </td>
                      <td className="py-3 px-2 font-mono text-slate-600">{item.classGroup}</td>
                      <td className="py-3 px-3 font-mono text-[11px] text-slate-600">
                        {item.screen}
                      </td>
                      <td className="py-3 px-3 text-rose-950 font-semibold">
                        ⚠️ {item.description}
                      </td>
                      <td className="py-3 px-3 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => handleOpenWarningModal(item.studentName)}
                            className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-[11px] font-bold flex items-center gap-1 cursor-pointer transition shadow-xs"
                            title="Kirim peringatan resmi terkait insiden keluar tab"
                          >
                            <ShieldAlert size={12} className="text-yellow-200" />
                            <span>Beri Peringatan</span>
                          </button>
                          <button
                            onClick={() => {
                              soundManager.playClick();
                              onResetStudentViolations(item.studentId);
                            }}
                            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-bold flex items-center gap-1 cursor-pointer transition"
                            title="Reset hitungan pelanggaran untuk siswa ini"
                          >
                            <RotateCcw size={11} />
                            <span>Reset</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Kendali Kunci Misi (5 Mata Pelajaran) */}
      {activeTab === 'locks' && (
        <div className="flex flex-col gap-5">
          <div className="p-4 bg-amber-50 border-2 border-amber-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-amber-700" />
                <h3 className="font-display font-black text-base text-amber-950">
                  Kendali Buka / Kunci Pos Misi 5 Mata Pelajaran SD
                </h3>
              </div>
              <p className="text-xs text-amber-800 mt-0.5">
                Guru dapat mengunci pos tertentu agar siswa hanya fokus mengerjakan materi yang ditugaskan hari ini.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  soundManager.playCorrect();
                  onSetAllMissionLocks(true);
                }}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition shadow-xs"
              >
                <Unlock size={14} />
                <span>Buka Semua Pos</span>
              </button>
              <button
                onClick={() => {
                  soundManager.playClick();
                  onSetAllMissionLocks(false);
                }}
                className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition shadow-xs"
              >
                <Lock size={14} />
                <span>Kunci Semua Pos</span>
              </button>
            </div>
          </div>

          {/* Grid of Missions to Lock/Unlock */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
            {PROFESSIONS_DATA.map((prof) => {
              const isUnlocked = missionLocks[prof.id] !== false;
              const integration = prof.subjectIntegration;
              const primaryMeta = integration ? SUBJECT_METADATA[integration.primarySubject] : null;

              return (
                <div
                  key={prof.id}
                  className={`p-4 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                    isUnlocked
                      ? 'bg-white border-emerald-300 shadow-xs'
                      : 'bg-slate-100 border-slate-300 opacity-80'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center font-bold text-sm">
                        {prof.name.charAt(0)}
                      </span>

                      <button
                        onClick={() => {
                          soundManager.playClick();
                          onToggleMissionLock(prof.id);
                        }}
                        className={`px-3 py-1 rounded-full text-xs font-black flex items-center gap-1.5 cursor-pointer transition shadow-xs ${
                          isUnlocked
                            ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                            : 'bg-rose-600 text-white hover:bg-rose-700'
                        }`}
                      >
                        {isUnlocked ? <Unlock size={12} /> : <Lock size={12} />}
                        <span>{isUnlocked ? 'Terbuka' : 'Terkunci'}</span>
                      </button>
                    </div>

                    <h4 className="font-display font-black text-base text-slate-900">
                      Pos {prof.name}
                    </h4>
                    <p className="text-xs text-slate-500 mb-2">{prof.workplace}</p>

                    {integration && (
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                        <div className="flex items-center gap-1 font-bold text-slate-700">
                          {primaryMeta && (
                            <span className={`px-2 py-0.2 rounded-md ${primaryMeta.badgeBg} ${primaryMeta.badgeText} text-[10px]`}>
                              {integration.primarySubject}
                            </span>
                          )}
                          <span className="text-[11px] text-slate-500">& {integration.secondarySubject}</span>
                        </div>
                        <p className="text-[11px] text-slate-600 font-medium">
                          {integration.topicTitle}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-200 text-[11px] flex items-center justify-between text-slate-500">
                    <span>Akses Siswa:</span>
                    <span className={`font-bold ${isUnlocked ? 'text-emerald-700' : 'text-rose-700'}`}>
                      {isUnlocked ? '✓ Dapat Diakses' : '🔒 Akses Ditutup'}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Final Quiz Lock Card */}
            <div
              className={`p-4 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                missionLocks['final-quiz'] !== false
                  ? 'bg-indigo-50/50 border-indigo-300 shadow-xs'
                  : 'bg-slate-100 border-slate-300 opacity-80'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
                    ⭐
                  </span>

                  <button
                    onClick={() => {
                      soundManager.playClick();
                      onToggleMissionLock('final-quiz');
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-black flex items-center gap-1.5 cursor-pointer transition shadow-xs ${
                      missionLocks['final-quiz'] !== false
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                        : 'bg-rose-600 text-white hover:bg-rose-700'
                    }`}
                  >
                    {missionLocks['final-quiz'] !== false ? <Unlock size={12} /> : <Lock size={12} />}
                    <span>{missionLocks['final-quiz'] !== false ? 'Terbuka' : 'Terkunci'}</span>
                  </button>
                </div>

                <h4 className="font-display font-black text-base text-indigo-950">
                  Tantangan Kuis Akhir
                </h4>
                <p className="text-xs text-slate-500 mb-2">Evaluasi 10 Soal Acak (5 Mapel SD)</p>

                <div className="p-2.5 rounded-xl bg-white border border-indigo-200 text-xs">
                  <span className="font-bold text-indigo-900 block mb-0.5">Ujian Komprehensif</span>
                  <p className="text-[11px] text-slate-600">
                    Kunci kuis ini hingga siswa menyelesaikan minimal 5 pos profesi agar hasil belajar maksimal.
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-200 text-[11px] flex items-center justify-between text-slate-500">
                <span>Akses Siswa:</span>
                <span className={`font-bold ${missionLocks['final-quiz'] !== false ? 'text-emerald-700' : 'text-rose-700'}`}>
                  {missionLocks['final-quiz'] !== false ? '✓ Dapat Dikerjakan' : '🔒 Ditutup oleh Guru'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Kirim Pesan ke Siswa */}
      {activeTab === 'messages' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Message Composer Form */}
          <div className="p-5 bg-purple-50/70 border-2 border-purple-200 rounded-3xl flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-purple-700" />
              <h3 className="font-display font-black text-base text-purple-950">
                Kirim Pengumuman & Instruksi ke Siswa
              </h3>
            </div>
            <p className="text-xs text-purple-800">
              Pesan akan langsung tampil secara interaktif di layar siswa disertai notifikasi bel sekolah.
            </p>

            <form onSubmit={handleSubmitMessage} className="space-y-3 pt-1">
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Target Penerima:
                  </label>
                  <select
                    value={messageTarget}
                    onChange={(e) => setMessageTarget(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-purple-300 rounded-xl text-xs font-bold text-slate-800"
                  >
                    <option value="Semua Siswa">📢 Semua Siswa (Broadcast)</option>
                    {students.map(s => (
                      <option key={s.id} value={s.name}>
                        👤 {s.name} ({s.classGroup})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Kategori Pesan:
                  </label>
                  <select
                    value={messageCategory}
                    onChange={(e) => setMessageCategory(e.target.value as TeacherMessage['category'])}
                    className="w-full px-3 py-2 bg-white border border-purple-300 rounded-xl text-xs font-bold text-slate-800"
                  >
                    <option value="Pengumuman">Pengumuman Umum</option>
                    <option value="Peringatan">Peringatan / Teguran Integritas</option>
                    <option value="Motivasi">Motivasi & Pujian</option>
                    <option value="Instruksi">Instruksi Khusus Mapel</option>
                  </select>
                </div>
              </div>

              {/* Fast Message Quick Templates */}
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                  Template Pesan Cepat:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => applyTemplate('Waktu pengerjaan misi tersisa 10 menit lagi. Semangat anak-anak!', 'Pengumuman')}
                    className="px-2 py-1 bg-white hover:bg-purple-100 border border-purple-200 text-purple-900 rounded-lg text-[10px] font-semibold cursor-pointer"
                  >
                    ⏱️ Sisa 10 Menit
                  </button>
                  <button
                    type="button"
                    onClick={() => applyTemplate('Peringatan: Harap tetap fokus di tab permainan dan jangan beralih aplikasi agar tidak tercatat pelanggaran!', 'Peringatan')}
                    className="px-2 py-1 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-900 rounded-lg text-[10px] font-semibold cursor-pointer"
                  >
                    ⚠️ Jangan Pindah Tab
                  </button>
                  <button
                    type="button"
                    onClick={() => applyTemplate('Hebat sekali! Kalian sudah menyelesaikan banyak pos profesi dengan nilai memuaskan.', 'Motivasi')}
                    className="px-2 py-1 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 rounded-lg text-[10px] font-semibold cursor-pointer"
                  >
                    🌟 Pujian Hebat
                  </button>
                  <button
                    type="button"
                    onClick={() => applyTemplate('Silakan buka pos Petani (Matematika) dan pos Polisi (PKn) terlebih dahulu ya.', 'Instruksi')}
                    className="px-2 py-1 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-900 rounded-lg text-[10px] font-semibold cursor-pointer"
                  >
                    📚 Fokus Mapel Petani & Polisi
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Isi Pesan Guru:
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Ketik pesan atau instruksi untuk siswa di sini..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-purple-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 cursor-pointer transition active:scale-98"
              >
                <Send size={14} />
                <span>Kirim Pesan Sekarang</span>
              </button>
            </form>
          </div>

          {/* Sent Messages History */}
          <div className="flex flex-col gap-3">
            <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-500">
              Riwayat Pesan Guru Terkirim ({teacherMessages.length})
            </h4>

            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
              {teacherMessages.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300 text-slate-400">
                  <MessageSquare className="w-8 h-8 mx-auto mb-1 text-slate-300" />
                  <p className="font-bold text-xs">Belum ada pesan yang dikirim.</p>
                </div>
              ) : (
                teacherMessages.map((msg) => (
                  <div key={msg.id} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-purple-900 bg-purple-100 px-2 py-0.5 rounded-full text-[10px]">
                          {msg.category}
                        </span>
                        <span className="text-[11px] text-slate-600 font-semibold">
                          Ke: {msg.targetStudentName}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-400 font-mono">{msg.timestamp}</span>
                        <button
                          onClick={() => {
                            soundManager.playClick();
                            onDeleteMessage(msg.id);
                          }}
                          className="text-slate-400 hover:text-rose-600 cursor-pointer"
                          title="Hapus Pesan"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>

                    <p className="font-medium text-slate-800 bg-white p-2.5 rounded-xl border border-slate-200/80 leading-relaxed">
                      "{msg.message}"
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal: Tambah Siswa Manual */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border-3 border-amber-300 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-amber-200">
              <h3 className="font-display font-black text-lg text-slate-900">
                Input Nilai Siswa Baru
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateStudent} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nama Lengkap Siswa:</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Contoh: Rian Pratama"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-bold text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Rombel / Kelas:</label>
                  <select
                    value={newClass}
                    onChange={(e) => setNewClass(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                  >
                    <option value="4A">Kelas 4A</option>
                    <option value="4B">Kelas 4B</option>
                    <option value="4C">Kelas 4C</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Pos Selesai (0-8):</label>
                  <input
                    type="number"
                    min="1"
                    max="8"
                    value={newVisitedCount}
                    onChange={(e) => setNewVisitedCount(parseInt(e.target.value) || 8)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-bold font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Nilai Kuis Akhir (0-100):</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="10"
                  value={newQuizScore}
                  onChange={(e) => setNewQuizScore(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-bold font-mono text-sm"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow cursor-pointer"
                >
                  Simpan Siswa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Google Sign-In */}
      <GoogleLoginModal
        isOpen={isGoogleModalOpen}
        onClose={() => {
          setIsGoogleModalOpen(false);
        }}
        onLoginSuccess={handleGoogleLoginSuccess}
      />

      {/* Modal: Student Answer Log & Audit Trail */}
      <StudentAnswerLogModal
        student={selectedStudentForLogs}
        isOpen={isLogModalOpen}
        onClose={() => {
          setIsLogModalOpen(false);
          setSelectedStudentForLogs(null);
        }}
        onQuickSendMessage={handleQuickSendMessage}
      />

      {/* Modal: Atur Nilai Siswa (Guru Score Adjustment) */}
      <StudentScoreEditModal
        student={scoreEditStudent}
        isOpen={isScoreEditModalOpen}
        onClose={() => {
          setIsScoreEditModalOpen(false);
          setScoreEditStudent(null);
        }}
        onSave={(updatedStudent) => {
          onUpdateStudent(updatedStudent);
        }}
      />

      {/* Modal: Kirim Peringatan Resmi Guru */}
      <TeacherWarningModal
        isOpen={isWarningModalOpen}
        onClose={() => {
          setIsWarningModalOpen(false);
        }}
        targetStudentName={warningTargetName}
        studentsList={students}
        onSendWarning={handleSendWarning}
      />
    </div>
  );
};
