import React, { useState } from 'react';
import {
  X,
  Volume2,
  CheckCircle2,
  Sparkles,
  MapPin,
  Briefcase,
  Wrench,
  HeartHandshake,
  Clock,
  ArrowRight,
  BookOpen,
  Calculator,
  ShieldCheck,
  Palette,
  Activity,
  GraduationCap
} from 'lucide-react';
import { Profession, AnswerLog } from '../types/game';
import { soundManager } from '../utils/audio';
import { PROFESSION_SPECIFIC_MISSIONS, getRandomProfessionMission, MissionQuiz } from '../data/questions';
import { fireCorrectAnswerConfetti } from '../utils/confetti';
import { SUBJECT_METADATA } from '../data/subjectCurriculum';
import { ProfessionThemedBackdrop } from './ProfessionThemedBackdrop';

interface ProfessionDetailModalProps {
  profession: Profession | null;
  isOpen: boolean;
  onClose: () => void;
  isVisited: boolean;
  onMarkAsVisited: (professionId: string) => void;
  onPlayMinigame: () => void;
  onRecordAnswerLog?: (log: AnswerLog) => void;
}

export const ProfessionDetailModal: React.FC<ProfessionDetailModalProps> = ({
  profession,
  isOpen,
  onClose,
  isVisited,
  onMarkAsVisited,
  onPlayMinigame,
  onRecordAnswerLog
}) => {
  const [selectedMissionOpt, setSelectedMissionOpt] = useState<number | null>(null);
  const [missionAnswered, setMissionAnswered] = useState(false);
  const [missionCorrect, setMissionCorrect] = useState(false);
  const [activeMissionQuiz, setActiveMissionQuiz] = useState<MissionQuiz | null>(null);

  // Pick fresh randomized mission question and shuffled options when profession opens/changes
  React.useEffect(() => {
    if (profession && isOpen) {
      setSelectedMissionOpt(null);
      setMissionAnswered(false);
      setMissionCorrect(false);
      setActiveMissionQuiz(getRandomProfessionMission(profession.id));
    }
  }, [profession?.id, isOpen]);

  if (!isOpen || !profession) return null;

  const missionQuiz = activeMissionQuiz || PROFESSION_SPECIFIC_MISSIONS[profession.id];

  const handleSelectMissionOption = (idx: number) => {
    if (missionAnswered || !missionQuiz) return;
    soundManager.playClick();
    setSelectedMissionOpt(idx);
    setMissionAnswered(true);

    const isCorrect = idx === missionQuiz.correctIndex;
    if (isCorrect) {
      setMissionCorrect(true);
      soundManager.playCorrect();
      soundManager.playStar();
      fireCorrectAnswerConfetti();
      onMarkAsVisited(profession.id);
    } else {
      setMissionCorrect(false);
      soundManager.playIncorrect();
    }

    if (onRecordAnswerLog) {
      onRecordAnswerLog({
        id: 'ans_prof_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
        questionId: 'prof_' + profession.id,
        questionText: missionQuiz.question,
        subject: missionQuiz.subject || (profession.subjectIntegration?.primarySubject || 'Matematika'),
        professionOrigin: profession.name,
        studentAnswer: missionQuiz.options[idx] || '',
        correctAnswer: missionQuiz.options[missionQuiz.correctIndex],
        isCorrect: isCorrect,
        pointsEarned: isCorrect ? 10 : 0,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        explanation: missionQuiz.explanation
      });
    }
  };

  const handleRetryMission = () => {
    soundManager.playClick();
    setSelectedMissionOpt(null);
    setMissionAnswered(false);
    setMissionCorrect(false);
  };

  const handleSpeak = () => {
    soundManager.playClick();
    soundManager.speak(profession.narrativeText);
  };

  const handleMarkVisited = () => {
    soundManager.playCorrect();
    soundManager.playStar();
    onMarkAsVisited(profession.id);
  };

  const handleClose = () => {
    soundManager.playClick();
    soundManager.stopSpeech();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-slate-950 rounded-3xl shadow-2xl border-4 border-amber-300 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Full Thematic Station Background */}
        <ProfessionThemedBackdrop professionId={profession.id} opacity={1} />

        {/* Header with Station Identity */}
        <div
          className="relative z-10 px-6 py-4 flex items-center justify-between text-white shadow-md border-b border-white/20 bg-slate-950/40 backdrop-blur-md"
        >
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-md font-display font-black border border-white/30"
              style={{ backgroundColor: profession.colorTheme.primary }}
            >
              {profession.id === 'guru' && '👨‍🏫'}
              {profession.id === 'dokter' && '🩺'}
              {profession.id === 'polisi' && '👮'}
              {profession.id === 'petani' && '🌾'}
              {profession.id === 'pilot' && '✈️'}
              {profession.id === 'nelayan' && '🎣'}
              {profession.id === 'koki' && '👨‍🍳'}
              {profession.id === 'pemadam' && '🚒'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/20 text-amber-200 border border-white/30">
                  Pos Profesi: {profession.name}
                </span>
                {isVisited && (
                  <span className="px-2 py-0.5 bg-emerald-500/90 text-white text-[11px] font-bold rounded-full flex items-center gap-1 shadow-xs">
                    <CheckCircle2 size={12} />
                    Selesai
                  </span>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-display tracking-wide text-white drop-shadow">
                {profession.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSpeak}
              className="p-2.5 rounded-2xl bg-white/20 hover:bg-white/30 text-white transition-transform active:scale-95 cursor-pointer shadow-sm border border-white/30"
              title="Dengarkan Narasi Suara"
              aria-label="Dengarkan Narasi"
            >
              <Volume2 size={20} className="text-amber-300" />
            </button>
            <button
              onClick={handleClose}
              className="p-2.5 rounded-2xl bg-white/20 hover:bg-white/30 text-white transition-transform active:scale-95 cursor-pointer shadow-sm border border-white/30"
              aria-label="Tutup detail pos profesi"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body with Atmospheric Backdrop Scrim */}
        <div className="relative z-10 p-4 sm:p-6 overflow-y-auto space-y-5 bg-slate-950/40 backdrop-blur-xs">
          {/* Narrative Speech Bubble from Profession */}
          <div className="relative p-4 rounded-2xl bg-amber-50 border-2 border-amber-200 flex items-start gap-3">
            <div className="p-2 bg-amber-400 text-amber-950 rounded-xl font-bold shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-0.5">Sapaan Profesi</p>
              <p className="text-sm text-slate-800 italic leading-relaxed">
                "{profession.narrativeText}"
              </p>
            </div>
          </div>

          {/* Grid: Tempat Bekerja & Manfaat bagi Masyarakat */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Tempat Bekerja */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 font-bold font-display text-slate-900 text-sm mb-1.5">
                <MapPin className="w-4 h-4 text-rose-500" />
                <span>Tempat Bekerja</span>
              </div>
              <p className="text-xs font-bold text-slate-800">{profession.workplace}</p>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {profession.workplaceDescription}
              </p>
            </div>

            {/* Manfaat bagi Masyarakat */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
              <div className="flex items-center gap-2 font-bold font-display text-emerald-900 text-sm mb-1.5">
                <HeartHandshake className="w-4 h-4 text-emerald-600" />
                <span>Manfaat bagi Masyarakat</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {profession.benefits}
              </p>
            </div>
          </div>

          {/* Tugas dan Tanggung Jawab */}
          <div>
            <div className="flex items-center gap-2 font-bold font-display text-slate-900 text-base mb-2.5">
              <Briefcase className="w-5 h-5 text-indigo-600" />
              <span>Tugas & Tanggung Jawab Utama</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {profession.responsibilities.map((resp, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2 text-xs">
                  <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center shrink-0 text-[10px]">
                    {idx + 1}
                  </div>
                  <span className="text-slate-700 leading-relaxed">{resp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Integrasi 5 Mata Pelajaran SD (Kurikulum Merdeka Kelas 4) */}
          {profession.subjectIntegration && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border-2 border-indigo-200">
              <div className="flex items-center gap-2 mb-2 font-display font-black text-slate-900 text-sm">
                <GraduationCap className="w-5 h-5 text-indigo-600" />
                <span>Integrasi 5 Mata Pelajaran SD (Kelas 4)</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-600 text-white font-extrabold text-[11px] flex items-center gap-1 shadow-xs">
                  Mapel Utama: {profession.subjectIntegration.primarySubject}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 border border-purple-300 font-bold text-[11px]">
                  Mapel Terkait: {profession.subjectIntegration.secondarySubject}
                </span>
              </div>
              <h4 className="font-extrabold text-xs text-indigo-950 mb-1">
                📌 {profession.subjectIntegration.topicTitle}
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed bg-white/80 p-2.5 rounded-xl border border-indigo-100">
                {profession.subjectIntegration.applicationExample}
              </p>
            </div>
          )}

          {/* Alat-Alat yang Digunakan */}
          <div>
            <div className="flex items-center gap-2 font-bold font-display text-slate-900 text-base mb-2.5">
              <Wrench className="w-5 h-5 text-amber-600" />
              <span>Alat-Alat yang Digunakan</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {profession.tools.map((tool) => (
                <div key={tool.id} className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 flex flex-col justify-between">
                  <div>
                    <span className="font-bold text-amber-950 text-xs block mb-1">
                      {tool.name}
                    </span>
                    <p className="text-[11px] text-slate-600 leading-snug">
                      {tool.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contoh Jadwal & Kegiatan Sehari-hari */}
          <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200">
            <div className="flex items-center gap-2 font-bold font-display text-sky-950 text-sm mb-2">
              <Clock className="w-4 h-4 text-sky-600" />
              <span>Kegiatan Sehari-Hari</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {profession.dailyRoutine.map((routine, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 shrink-0" />
                  <span>{routine}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Misi Uji Pemahaman Khusus Pos Ini (Soal Berbeda untuk Setiap Profesi) */}
          {missionQuiz && (
            <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                  <Sparkles size={14} className="text-amber-600" />
                  <span>Tantangan Misi Khusus: {profession.name}</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">
                  +10 Poin & Bintang
                </span>
              </div>

              <h4 className="font-display font-bold text-sm sm:text-base text-slate-900 mb-3 leading-snug">
                {missionQuiz.question}
              </h4>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                {missionQuiz.options.map((opt: string, idx: number) => {
                  let optStyle = 'bg-white border-slate-200 hover:border-amber-400 text-slate-800';

                  if (missionAnswered) {
                    if (idx === missionQuiz.correctIndex) {
                      optStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold';
                    } else if (selectedMissionOpt === idx) {
                      optStyle = 'bg-rose-100 border-rose-300 text-rose-950';
                    } else {
                      optStyle = 'bg-white/60 border-slate-200 text-slate-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectMissionOption(idx)}
                      disabled={missionAnswered}
                      className={`p-2.5 rounded-xl border text-left text-xs flex items-center gap-2 transition-all cursor-pointer ${optStyle}`}
                    >
                      <span className="w-5 h-5 rounded-md bg-slate-100 border border-current flex items-center justify-center font-bold text-[10px] shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="leading-snug">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Feedback */}
              {missionAnswered && (
                <div
                  className={`p-3 rounded-xl border text-xs flex items-start justify-between gap-2 ${
                    missionCorrect
                      ? 'bg-emerald-100 border-emerald-300 text-emerald-950 font-medium'
                      : 'bg-rose-100 border-rose-300 text-rose-950'
                  }`}
                >
                  <p>
                    <span className="font-bold">
                      {missionCorrect ? '🌟 Jawaban Tepat! ' : 'Coba lagi yuk! '}
                    </span>
                    {missionQuiz.explanation}
                  </p>
                  {!missionCorrect && (
                    <button
                      onClick={handleRetryMission}
                      className="px-2.5 py-1 bg-white text-rose-800 font-bold rounded-lg border border-rose-300 text-[11px] shrink-0 cursor-pointer"
                    >
                      Ulangi
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Fakta Unik */}
          <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-200 text-xs text-purple-950">
            <span className="font-bold text-purple-900 mr-1.5">🌟 Fakta Menarik:</span>
            <span>{profession.funFact}</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="relative z-10 p-4 bg-slate-900/80 backdrop-blur-md border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          {!isVisited ? (
            <button
              onClick={handleMarkVisited}
              className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 size={18} />
              <span>Selesai Membaca (+10 Poin & Bintang)</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-xl">
              <CheckCircle2 size={16} />
              <span>Pos Profesi Telah Dipelajari!</span>
            </div>
          )}

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={onPlayMinigame}
              className="flex-1 sm:flex-none px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5"
            >
              <span>Mainkan Mini Game</span>
              <ArrowRight size={16} />
            </button>
            <button
              onClick={handleClose}
              className="px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs sm:text-sm rounded-2xl transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
