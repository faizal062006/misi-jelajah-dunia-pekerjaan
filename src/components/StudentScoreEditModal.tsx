import React, { useState, useEffect } from 'react';
import {
  X,
  Award,
  CheckCircle2,
  Sliders,
  Sparkles,
  Trophy,
  Star,
  RefreshCw,
  PlusCircle,
  HelpCircle,
  Calculator
} from 'lucide-react';
import { StudentRecord } from '../types/game';
import { soundManager } from '../utils/audio';

interface StudentScoreEditModalProps {
  student: StudentRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedStudent: StudentRecord) => void;
}

export const StudentScoreEditModal: React.FC<StudentScoreEditModalProps> = ({
  student,
  isOpen,
  onClose,
  onSave
}) => {
  const [guessScore, setGuessScore] = useState<number>(0);
  const [toolsScore, setToolsScore] = useState<number>(0);
  const [whoamiScore, setWhoamiScore] = useState<number>(0);
  const [workplaceScore, setWorkplaceScore] = useState<number>(0);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [visitedCount, setVisitedCount] = useState<number>(8);
  const [bonusScore, setBonusScore] = useState<number>(0);
  const [teacherNote, setTeacherNote] = useState<string>('');

  useEffect(() => {
    if (student) {
      setGuessScore(student.minigameScores?.guess ?? 20);
      setToolsScore(student.minigameScores?.tools ?? 20);
      setWhoamiScore(student.minigameScores?.whoami ?? 20);
      setWorkplaceScore(student.minigameScores?.workplace ?? 20);
      setQuizScore(student.finalQuizScore ?? 80);
      setVisitedCount(student.visitedProfessionsCount ?? 8);
      setBonusScore(0);
      setTeacherNote('');
    }
  }, [student]);

  if (!isOpen || !student) return null;

  // Realtime calculated values
  const totalMinigames = guessScore + toolsScore + whoamiScore + workplaceScore;
  const visitPoints = visitedCount * 10;
  const calculatedTotal = totalMinigames + quizScore + visitPoints + bonusScore;

  // Medal determination
  let calculatedMedal = 'Medali Emas';
  if (calculatedTotal < 110) calculatedMedal = 'Medali Perunggu';
  else if (calculatedTotal < 180) calculatedMedal = 'Medali Perak';

  // Stars calculation (approx 1 star per 15 points)
  const calculatedStars = Math.max(3, Math.min(25, Math.floor(calculatedTotal / 12)));

  const handleApplyPreset = (type: 'perfect' | 'kkm' | 'bonus10') => {
    soundManager.playClick();
    if (type === 'perfect') {
      setGuessScore(30);
      setToolsScore(30);
      setWhoamiScore(30);
      setWorkplaceScore(30);
      setQuizScore(100);
      setVisitedCount(8);
      setBonusScore(10);
    } else if (type === 'kkm') {
      setGuessScore(20);
      setToolsScore(20);
      setWhoamiScore(20);
      setWorkplaceScore(20);
      setQuizScore(75);
      setVisitedCount(6);
    } else if (type === 'bonus10') {
      setBonusScore((prev) => prev + 10);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playCorrect();

    const updated: StudentRecord = {
      ...student,
      visitedProfessionsCount: visitedCount,
      minigameScores: {
        guess: guessScore,
        tools: toolsScore,
        whoami: whoamiScore,
        workplace: workplaceScore
      },
      finalQuizScore: quizScore,
      totalScore: calculatedTotal,
      earnedStars: calculatedStars,
      medalTier: calculatedMedal,
      status: calculatedTotal >= 70 ? 'Selesai' : 'Sedang Belajar'
    };

    onSave(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-4 border-amber-300 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-blue-700 p-5 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shadow-inner font-bold">
              ✏️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-black text-xl">Atur & Sesuaikan Nilai Siswa</h3>
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/80 text-white text-[11px] font-bold">
                  {student.classGroup}
                </span>
              </div>
              <p className="text-xs text-indigo-100">
                Nama Siswa: <strong className="text-white text-sm">{student.name}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-2 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* Quick Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2 pb-3 border-b border-slate-200">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
              <Sparkles size={14} className="text-amber-500" /> Tombol Cepat Guru:
            </span>
            <button
              type="button"
              onClick={() => handleApplyPreset('perfect')}
              className="px-3 py-1 bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs rounded-xl transition cursor-pointer"
            >
              🏆 Nilai Sempurna (Emas)
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset('kkm')}
              className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-900 font-bold text-xs rounded-xl transition cursor-pointer"
            >
              📘 Standar KKM (75)
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset('bonus10')}
              className="px-3 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold text-xs rounded-xl transition cursor-pointer"
            >
              ⭐ +10 Poin Bonus Sikap
            </button>
          </div>

          {/* Nilai Mini Games Grid */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 mb-2.5 flex items-center gap-1.5">
              <Sliders size={14} className="text-indigo-600" />
              <span>Nilai Mini Game Stasiun (Skala 0 - 40 Poin)</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  1. Tebak Profesi
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="40"
                    step="5"
                    value={guessScore}
                    onChange={(e) => setGuessScore(parseInt(e.target.value) || 0)}
                    className="flex-1 accent-indigo-600 cursor-pointer"
                  />
                  <input
                    type="number"
                    min="0"
                    max="40"
                    value={guessScore}
                    onChange={(e) => setGuessScore(Math.min(40, Math.max(0, parseInt(e.target.value) || 0)))}
                    className="w-14 px-2 py-1 text-center font-bold text-sm bg-white border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  2. Pasang Alat & Profesi
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="40"
                    step="5"
                    value={toolsScore}
                    onChange={(e) => setToolsScore(parseInt(e.target.value) || 0)}
                    className="flex-1 accent-indigo-600 cursor-pointer"
                  />
                  <input
                    type="number"
                    min="0"
                    max="40"
                    value={toolsScore}
                    onChange={(e) => setToolsScore(Math.min(40, Math.max(0, parseInt(e.target.value) || 0)))}
                    className="w-14 px-2 py-1 text-center font-bold text-sm bg-white border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  3. Siapa Aku?
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="40"
                    step="5"
                    value={whoamiScore}
                    onChange={(e) => setWhoamiScore(parseInt(e.target.value) || 0)}
                    className="flex-1 accent-indigo-600 cursor-pointer"
                  />
                  <input
                    type="number"
                    min="0"
                    max="40"
                    value={whoamiScore}
                    onChange={(e) => setWhoamiScore(Math.min(40, Math.max(0, parseInt(e.target.value) || 0)))}
                    className="w-14 px-2 py-1 text-center font-bold text-sm bg-white border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  4. Pasang Tempat Kerja
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="40"
                    step="5"
                    value={workplaceScore}
                    onChange={(e) => setWorkplaceScore(parseInt(e.target.value) || 0)}
                    className="flex-1 accent-indigo-600 cursor-pointer"
                  />
                  <input
                    type="number"
                    min="0"
                    max="40"
                    value={workplaceScore}
                    onChange={(e) => setWorkplaceScore(Math.min(40, Math.max(0, parseInt(e.target.value) || 0)))}
                    className="w-14 px-2 py-1 text-center font-bold text-sm bg-white border border-slate-300 rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Nilai Kuis Akhir & Pos & Bonus */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200">
              <label className="block text-xs font-bold text-indigo-950 mb-1">
                Nilai Kuis Akhir (0-100)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                step="5"
                value={quizScore}
                onChange={(e) => setQuizScore(Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
                className="w-full px-3 py-1.5 font-black text-indigo-900 text-lg bg-white border border-indigo-300 rounded-xl text-center"
              />
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
              <label className="block text-xs font-bold text-emerald-950 mb-1">
                Pos Selesai (0 - 8 Pos)
              </label>
              <input
                type="number"
                min="0"
                max="8"
                value={visitedCount}
                onChange={(e) => setVisitedCount(Math.min(8, Math.max(0, parseInt(e.target.value) || 0)))}
                className="w-full px-3 py-1.5 font-black text-emerald-900 text-lg bg-white border border-emerald-300 rounded-xl text-center"
              />
              <span className="block text-[10px] text-emerald-700 text-center mt-0.5">
                +10 poin per pos
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
              <label className="block text-xs font-bold text-amber-950 mb-1">
                Poin Bonus Guru
              </label>
              <input
                type="number"
                min="0"
                max="50"
                value={bonusScore}
                onChange={(e) => setBonusScore(Math.min(50, Math.max(0, parseInt(e.target.value) || 0)))}
                className="w-full px-3 py-1.5 font-black text-amber-900 text-lg bg-white border border-amber-300 rounded-xl text-center"
              />
              <span className="block text-[10px] text-amber-700 text-center mt-0.5">
                Keaktifan / kejujuran
              </span>
            </div>
          </div>

          {/* Live Preview Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 text-amber-950 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-900">
                Kalkulasi Nilai Baru:
              </span>
              <div className="flex items-center gap-3 mt-1">
                <div>
                  <span className="text-3xl font-black font-display">{calculatedTotal}</span>
                  <span className="text-xs font-bold ml-1">Poin Total</span>
                </div>
                <div className="h-8 w-px bg-amber-600/40" />
                <div className="flex items-center gap-1 font-bold text-sm">
                  <Star className="w-4 h-4 fill-amber-950 text-amber-950" />
                  <span>{calculatedStars} Bintang</span>
                </div>
              </div>
            </div>

            <div className="px-4 py-2 bg-white/90 rounded-2xl font-black text-xs sm:text-sm text-slate-800 shadow-sm border border-amber-300 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-600" />
              <span>{calculatedMedal}</span>
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 font-bold text-xs rounded-xl cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md flex items-center gap-2 active:scale-95 transition-all cursor-pointer"
            >
              <CheckCircle2 size={16} />
              <span>Simpan Perubahan Nilai</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
