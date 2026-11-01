import React, { useState } from 'react';
import {
  Compass,
  Star,
  Trophy,
  Award,
  Sparkles,
  MapPin,
  CheckCircle2,
  Gamepad2,
  HelpCircle,
  ChevronRight,
  Lock,
  Bell,
  ShieldCheck,
  ShieldAlert,
  Calculator,
  Palette,
  Activity,
  BookOpen,
  Filter
} from 'lucide-react';
import { Profession, ScreenState, PlayerProgress, MissionLockState, TeacherMessage, MataPelajaran } from '../types/game';
import { PROFESSIONS_DATA } from '../data/professions';
import { getMedalTier, calculateProgress } from '../game/rules';
import { soundManager } from '../utils/audio';
import { SUBJECT_METADATA, SUBJECTS_LIST } from '../data/subjectCurriculum';
import { heroWorldMap, adventurerMascot } from '../assets/images';

interface AdventureMapProps {
  progress: PlayerProgress;
  onSelectProfession: (profession: Profession) => void;
  onNavigateScreen: (screen: ScreenState) => void;
  onOpenInstructions: () => void;
  missionLocks?: MissionLockState;
  teacherMessages?: TeacherMessage[];
  onOpenTeacherMessages?: () => void;
}

export const AdventureMap: React.FC<AdventureMapProps> = ({
  progress,
  onSelectProfession,
  onNavigateScreen,
  onOpenInstructions,
  missionLocks = {},
  teacherMessages = [],
  onOpenTeacherMessages
}) => {
  const [hoveredProfession, setHoveredProfession] = useState<Profession | null>(null);
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('all');
  const [lockedModalInfo, setLockedModalInfo] = useState<{ name: string; message: string } | null>(null);

  const completedMinigamesCount = [
    progress.completedMinigames.guess,
    progress.completedMinigames.tools,
    progress.completedMinigames.whoami,
    progress.completedMinigames.workplace
  ].filter(Boolean).length;

  const progressPercent = calculateProgress(
    progress.visitedProfessions.length,
    completedMinigamesCount,
    progress.finalQuizCompleted
  );

  // Unread teacher messages count
  const unreadMessagesCount = teacherMessages.filter(
    m => !m.read && (m.targetStudentName === 'Semua Siswa' || m.targetStudentName.toLowerCase() === progress.playerName.toLowerCase())
  ).length;

  const handlePinClick = (prof: Profession) => {
    // Check if locked by teacher
    const isLocked = missionLocks[prof.id] === false;
    if (isLocked) {
      soundManager.playIncorrect();
      setLockedModalInfo({
        name: prof.name,
        message: `Pos ${prof.name} sedang dikunci oleh Pak Faizal, S.Pd. Silakan fokus mengerjakan pos lain yang telah dibuka oleh Guru ya!`
      });
      return;
    }
    soundManager.playClick();
    onSelectProfession(prof);
  };

  const handleFinalQuizClick = () => {
    if (missionLocks['final-quiz'] === false) {
      soundManager.playIncorrect();
      setLockedModalInfo({
        name: 'Tantangan Kuis Akhir',
        message: 'Tantangan Kuis Akhir sedang dikunci oleh Pak Faizal, S.Pd. Silakan tuntaskan eksplorasi pos profesi yang tersedia terlebih dahulu!'
      });
      return;
    }
    handleTabClick('final-quiz');
  };

  const handleTabClick = (screen: ScreenState) => {
    soundManager.playClick();
    onNavigateScreen(screen);
  };

  // Filter professions by subject if selected
  const isProfessionMatchingSubject = (prof: Profession) => {
    if (selectedSubjectFilter === 'all') return true;
    const integ = prof.subjectIntegration;
    if (!integ) return true;
    return integ.primarySubject === selectedSubjectFilter || integ.secondarySubject === selectedSubjectFilter;
  };

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-4">
      {/* HUD Header Bar */}
      <header className="w-full bg-white/95 backdrop-blur-md rounded-3xl p-4 sm:p-5 shadow-xl border-3 border-amber-300 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Player Profile & Greeting */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-12 h-12 rounded-2xl overflow-hidden border-2 border-amber-400 bg-amber-100 shadow-sm shrink-0">
            <img
              src={adventurerMascot}
              alt="Avatar Penjelajah"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wide">
                Penjelajah Cilik
              </span>
              <span className="px-2 py-0.2 bg-amber-100 text-amber-900 text-[10px] font-extrabold rounded-full border border-amber-300">
                Kelas 4 SD
              </span>

              {/* Anti-Cheat Integrity Indicator */}
              {(progress.violationCount || 0) > 0 ? (
                <span className="px-2 py-0.2 bg-rose-100 text-rose-800 text-[10px] font-extrabold rounded-full border border-rose-300 flex items-center gap-1">
                  <ShieldAlert className="w-3 h-3 text-rose-600" />
                  {progress.violationCount} Keluar Tab
                </span>
              ) : (
                <span className="px-2 py-0.2 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full border border-emerald-300 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  Integritas Tertib
                </span>
              )}
            </div>
            <h2 className="text-base sm:text-lg font-black font-display text-slate-900 leading-tight">
              {progress.playerName}
            </h2>
          </div>
        </div>

        {/* Stats Strip: Score, Stars, Explored, Messages, Help */}
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 sm:gap-3 w-full md:w-auto">
          {/* Total Score */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-2xl shadow-xs">
            <Trophy className="w-4 h-4 text-amber-500 fill-amber-400" />
            <div className="text-left">
              <span className="text-[9px] font-bold uppercase text-slate-500 block leading-none">Skor Poin</span>
              <span className="text-xs font-black font-display text-amber-950 tabular-nums">
                {progress.score} Poin
              </span>
            </div>
          </div>

          {/* Stars */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-50 border border-yellow-200 rounded-2xl shadow-xs">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-400" />
            <div className="text-left">
              <span className="text-[9px] font-bold uppercase text-slate-500 block leading-none">Bintang</span>
              <span className="text-xs font-black font-display text-yellow-950 tabular-nums">
                {progress.earnedStars} ★
              </span>
            </div>
          </div>

          {/* Locations Explored */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-2xl shadow-xs">
            <Compass className="w-4 h-4 text-emerald-600" />
            <div className="text-left">
              <span className="text-[9px] font-bold uppercase text-slate-500 block leading-none">Pos Dijelajahi</span>
              <span className="text-xs font-black font-display text-emerald-950 tabular-nums">
                {progress.visitedProfessions.length} / 8
              </span>
            </div>
          </div>

          {/* Progress Bar Badge */}
          <div className="flex flex-col gap-1 px-3 py-1 bg-slate-50 border border-slate-200 rounded-2xl min-w-[90px]">
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-700">
              <span>Progres</span>
              <span className="tabular-nums font-mono text-amber-700">{progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Teacher Message Icon Button */}
          {onOpenTeacherMessages && (
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenTeacherMessages();
              }}
              className="relative p-2 rounded-2xl bg-purple-100 hover:bg-purple-200 text-purple-900 border border-purple-300 transition-colors cursor-pointer"
              title="Kotak Pesan dari Guru"
            >
              <Bell size={18} className={unreadMessagesCount > 0 ? 'animate-bounce text-purple-700' : ''} />
              {unreadMessagesCount > 0 && (
                <span className="absolute -top-1 -right-1 px-1.5 py-0.2 bg-rose-600 text-white rounded-full text-[10px] font-black border border-white">
                  {unreadMessagesCount}
                </span>
              )}
            </button>
          )}

          {/* Help Button */}
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenInstructions();
            }}
            className="p-2 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 transition-colors cursor-pointer"
            title="Buka Petunjuk Permainan"
            aria-label="Petunjuk"
          >
            <HelpCircle size={18} />
          </button>
        </div>
      </header>

      {/* 5 Subjects Integration Filter Bar */}
      <div className="w-full bg-white/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 shadow-md border-2 border-amber-200 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-black uppercase text-slate-600 flex items-center gap-1">
            <Filter size={13} className="text-amber-600" />
            Integrasi 5 Mata Pelajaran SD:
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => {
              soundManager.playClick();
              setSelectedSubjectFilter('all');
            }}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
              selectedSubjectFilter === 'all'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Semua Pos (8)
          </button>

          {SUBJECTS_LIST.map((subj) => {
            const meta = SUBJECT_METADATA[subj];
            const isSelected = selectedSubjectFilter === subj;
            return (
              <button
                key={subj}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedSubjectFilter(subj);
                }}
                className={`px-2.5 py-1 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer border ${
                  isSelected
                    ? `${meta.accentBg} text-white ${meta.borderColor} shadow-xs`
                    : `${meta.badgeBg} ${meta.badgeText} ${meta.borderColor} hover:brightness-95`
                }`}
              >
                {subj === 'Matematika' && <Calculator size={12} />}
                {subj === 'PKn' && <ShieldCheck size={12} />}
                {subj === 'Bahasa Indonesia' && <BookOpen size={12} />}
                {subj === 'SBdP' && <Palette size={12} />}
                {subj === 'PJOK' && <Activity size={12} />}
                <span>{subj}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Curriculum Competency Banner (if subject selected) */}
      {selectedSubjectFilter !== 'all' && (
        <div className="px-4 py-2.5 rounded-2xl bg-amber-50/90 border border-amber-300 text-xs text-amber-950 flex items-center justify-between gap-2 animate-fadeIn">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-amber-800 uppercase text-[10px] px-2 py-0.5 bg-white rounded-md border border-amber-200">
              Target KD / Capaian {selectedSubjectFilter} Kelas 4
            </span>
            <span className="font-medium text-slate-700">
              {SUBJECT_METADATA[selectedSubjectFilter as MataPelajaran]?.grade4Competency}
            </span>
          </div>
          <button
            onClick={() => setSelectedSubjectFilter('all')}
            className="text-amber-800 hover:text-amber-950 font-bold underline text-[11px] shrink-0 cursor-pointer"
          >
            Tampilkan Semua
          </button>
        </div>
      )}

      {/* Activity Navigation Segmented Bar */}
      <nav className="w-full bg-white/90 backdrop-blur-md rounded-2xl p-2 shadow-md border-2 border-amber-200 flex flex-wrap items-center gap-1.5 justify-center sm:justify-start">
        <button
          onClick={() => handleTabClick('map')}
          className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-amber-500 text-white shadow-sm flex items-center gap-1.5 cursor-pointer"
        >
          <Compass size={14} />
          <span>Peta Petualangan 3D</span>
        </button>

        <button
          onClick={() => handleTabClick('minigame-guess')}
          className="px-3 py-1.5 text-xs font-bold rounded-xl bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <Gamepad2 size={14} />
          <span>Mini Game 1: Tebak</span>
        </button>

        <button
          onClick={() => handleTabClick('minigame-tools')}
          className="px-3 py-1.5 text-xs font-bold rounded-xl bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <Gamepad2 size={14} />
          <span>Mini Game 2: Alat</span>
        </button>

        <button
          onClick={() => handleTabClick('minigame-whoami')}
          className="px-3 py-1.5 text-xs font-bold rounded-xl bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <Gamepad2 size={14} />
          <span>Mini Game 3: Siapa Aku</span>
        </button>

        <button
          onClick={() => handleTabClick('minigame-workplace')}
          className="px-3 py-1.5 text-xs font-bold rounded-xl bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <Gamepad2 size={14} />
          <span>Mini Game 4: Tempat</span>
        </button>

        <button
          onClick={handleFinalQuizClick}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer ml-auto ${
            missionLocks['final-quiz'] === false
              ? 'bg-slate-200 text-slate-600 border border-slate-300'
              : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200'
          }`}
        >
          {missionLocks['final-quiz'] === false ? <Lock size={13} /> : <Sparkles size={14} />}
          <span>{missionLocks['final-quiz'] === false ? 'Kuis (Dikunci)' : 'Tantangan Kuis Akhir'}</span>
        </button>

        <button
          onClick={() => handleTabClick('ending')}
          className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <Award size={14} />
          <span>Sertifikat</span>
        </button>

        <button
          onClick={() => handleTabClick('teacher-dashboard')}
          className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <span className="text-sm">👨‍🏫</span>
          <span>Dashboard Guru</span>
        </button>
      </nav>

      {/* Main 3D Interactive Map Canvas Container */}
      <div className="relative w-full rounded-3xl overflow-hidden border-4 border-amber-300 shadow-2xl bg-amber-100 aspect-[16/10] sm:aspect-[16/9]">
        {/* Background 3D Diorama Image */}
        <img
          src={heroWorldMap}
          alt="Peta 3D Pulau Petualangan Dunia Pekerjaan"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />

        {/* Floating Clouds / Lighting Vignette */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-slate-900/20 pointer-events-none" />

        {/* 8 Interactive Profession Map Pins */}
        {PROFESSIONS_DATA.map((prof) => {
          const isVisited = progress.visitedProfessions.includes(prof.id);
          const isHovered = hoveredProfession?.id === prof.id;
          const isLocked = missionLocks[prof.id] === false;
          const isMatchingSubject = isProfessionMatchingSubject(prof);

          return (
            <div
              key={prof.id}
              style={{
                left: `${prof.mapCoords.x}%`,
                top: `${prof.mapCoords.y}%`
              }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 group transition-all duration-300 ${
                isMatchingSubject ? 'opacity-100' : 'opacity-35 scale-90'
              }`}
              onMouseEnter={() => setHoveredProfession(prof)}
              onMouseLeave={() => setHoveredProfession(null)}
            >
              {/* Clickable Map Pin */}
              <button
                onClick={() => handlePinClick(prof)}
                className={`relative p-2.5 sm:p-3 rounded-2xl shadow-xl transition-all duration-300 flex items-center justify-center cursor-pointer ${
                  isHovered ? 'scale-125 z-30 ring-4 ring-white' : 'scale-100'
                } ${
                  isLocked
                    ? 'bg-slate-700 text-slate-300 ring-2 ring-rose-400'
                    : isVisited
                    ? 'bg-emerald-600 text-white ring-2 ring-emerald-300'
                    : 'bg-amber-500 text-white ring-2 ring-amber-300 animate-pulse-glow'
                }`}
                title={isLocked ? `Pos ${prof.name} dikunci oleh guru` : `Kunjungi pos: ${prof.name} (${prof.workplace})`}
              >
                {isLocked ? (
                  <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-rose-300" />
                ) : (
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 fill-white" />
                )}

                {isVisited && !isLocked && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white text-emerald-700 flex items-center justify-center text-[10px] font-black shadow">
                    ✓
                  </div>
                )}
                {isLocked && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px] font-black shadow">
                    🔒
                  </div>
                )}
              </button>

              {/* Pin Tag Label */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap pointer-events-none">
                <span
                  className={`text-[10px] sm:text-xs font-black px-2.5 py-0.5 rounded-full shadow-md backdrop-blur-sm border transition-all flex items-center gap-1 ${
                    isLocked
                      ? 'bg-rose-950/90 text-rose-200 border-rose-400'
                      : isVisited
                      ? 'bg-emerald-900/90 text-emerald-100 border-emerald-400'
                      : 'bg-slate-900/85 text-amber-200 border-amber-300'
                  }`}
                >
                  {isLocked && '🔒'}
                  {prof.name}
                </span>
              </div>
            </div>
          );
        })}

        {/* Bottom Hover Preview Card */}
        {hoveredProfession && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-sm bg-white/95 backdrop-blur-md p-4 rounded-3xl shadow-2xl border-3 border-amber-300 z-30 animate-fadeIn">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">
                Pos Profesi
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                missionLocks[hoveredProfession.id] === false
                  ? 'bg-rose-100 text-rose-800 border border-rose-300'
                  : progress.visitedProfessions.includes(hoveredProfession.id)
                  ? 'bg-emerald-100 text-emerald-900'
                  : 'bg-amber-100 text-amber-900'
              }`}>
                {missionLocks[hoveredProfession.id] === false
                  ? '🔒 Dikunci Guru'
                  : progress.visitedProfessions.includes(hoveredProfession.id)
                  ? '★ Telah Dikunjungi'
                  : 'Belum Dikunjungi'}
              </span>
            </div>

            <h3 className="text-base font-black font-display text-slate-900">
              {hoveredProfession.name}
            </h3>
            <p className="text-xs text-slate-600 mb-1.5">
              📍 {hoveredProfession.workplace}
            </p>

            {hoveredProfession.subjectIntegration && (
              <div className="mb-2 p-2 rounded-xl bg-slate-50 border border-slate-200 text-[11px]">
                <span className="font-bold text-indigo-900 block">
                  Mapel: {hoveredProfession.subjectIntegration.primarySubject} & {hoveredProfession.subjectIntegration.secondarySubject}
                </span>
                <span className="text-slate-600 line-clamp-1">
                  {hoveredProfession.subjectIntegration.topicTitle}
                </span>
              </div>
            )}

            <button
              onClick={() => handlePinClick(hoveredProfession)}
              className={`w-full py-2 text-white text-xs font-bold rounded-xl shadow flex items-center justify-center gap-1 active:scale-95 transition-all cursor-pointer ${
                missionLocks[hoveredProfession.id] === false
                  ? 'bg-slate-700 hover:bg-slate-800'
                  : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600'
              }`}
            >
              <span>{missionLocks[hoveredProfession.id] === false ? '🔒 Pos Sedang Dikunci' : 'Pelajari Pos Ini'}</span>
              <ChevronRight size={14} />
            </button>
          </div>
        )}

        {/* Legend Overlay at Top Left of Map */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-2 rounded-2xl border border-amber-300 shadow text-xs text-slate-800 hidden sm:flex flex-col gap-1 pointer-events-none">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="font-semibold text-[11px]">Kuning = Pos Terbuka</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
            <span className="font-semibold text-[11px]">Hijau = Pos Selesai</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
            <span className="font-semibold text-[11px]">Merah = Dikunci Guru</span>
          </div>
        </div>
      </div>

      {/* 8 Professions Quick Directory Grid Below Map */}
      <div className="w-full bg-white/95 backdrop-blur-md rounded-3xl p-5 shadow-xl border-3 border-amber-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
          <div>
            <h3 className="font-display font-black text-lg text-slate-900">
              Daftar 8 Pos Profesi di Pulau Petualangan
            </h3>
            <p className="text-xs text-slate-600">
              Klik kartu untuk mempelajari tugas, alat kerja, manfaat, dan materi 5 mata pelajaran SD:
            </p>
          </div>

          <span className="text-xs font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-xl self-start sm:self-auto">
            {progress.visitedProfessions.length} dari 8 Selesai
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {PROFESSIONS_DATA.map((prof) => {
            const isDone = progress.visitedProfessions.includes(prof.id);
            const isLocked = missionLocks[prof.id] === false;
            const primarySubject = prof.subjectIntegration?.primarySubject;

            return (
              <button
                key={prof.id}
                onClick={() => handlePinClick(prof)}
                className={`p-3.5 rounded-2xl border-2 text-left transition-all active:scale-95 shadow-xs flex flex-col justify-between cursor-pointer ${
                  isLocked
                    ? 'bg-slate-100 border-slate-300 opacity-75'
                    : isDone
                    ? 'bg-emerald-50/70 border-emerald-300 hover:border-emerald-500'
                    : 'bg-slate-50 border-slate-200 hover:border-amber-400 hover:bg-amber-50/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="w-7 h-7 rounded-lg bg-white shadow-xs border border-slate-200 flex items-center justify-center font-bold text-xs">
                      {prof.name.charAt(0)}
                    </span>
                    {isLocked ? (
                      <span className="px-1.5 py-0.5 rounded-md bg-rose-100 text-rose-800 text-[10px] font-black flex items-center gap-0.5">
                        <Lock size={10} /> Dikunci
                      </span>
                    ) : isDone ? (
                      <CheckCircle2 size={16} className="text-emerald-600" />
                    ) : (
                      <span className="text-[10px] font-bold text-amber-600">+10 Pts</span>
                    )}
                  </div>
                  <h4 className="font-display font-bold text-sm text-slate-900">
                    {prof.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                    {prof.workplace}
                  </p>
                </div>

                {primarySubject && (
                  <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-indigo-700">
                      Mapel: {primarySubject}
                    </span>
                    <ChevronRight size={12} className="text-slate-400" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Friendly Locked Modal Alert */}
      {lockedModalInfo && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border-4 border-rose-300 text-center space-y-4">
            <div className="w-14 h-14 rounded-3xl bg-rose-100 text-rose-600 mx-auto flex items-center justify-center">
              <Lock size={28} />
            </div>
            <div>
              <h3 className="font-display font-black text-lg text-slate-900">
                {lockedModalInfo.name} Sedang Dikunci
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                {lockedModalInfo.message}
              </p>
            </div>
            <button
              onClick={() => {
                soundManager.playClick();
                setLockedModalInfo(null);
              }}
              className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs cursor-pointer"
            >
              Baik, Saya Akan Membuka Pos Lain
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
