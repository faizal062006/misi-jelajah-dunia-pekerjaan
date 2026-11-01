import React, { useState } from 'react';
import {
  X,
  Users,
  Search,
  CheckCircle2,
  Trophy,
  Star,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  GraduationCap
} from 'lucide-react';
import { StudentRecord } from '../types/game';
import { soundManager } from '../utils/audio';

interface StudentRosterModalProps {
  isOpen: boolean;
  onClose: () => void;
  students: StudentRecord[];
  selectedStudentId: string;
  onSelectStudent: (student: StudentRecord) => void;
}

export const StudentRosterModal: React.FC<StudentRosterModalProps> = ({
  isOpen,
  onClose,
  students,
  selectedStudentId,
  onSelectStudent
}) => {
  const [search, setSearch] = useState('');
  const [selectedClass, setSelectedClass] = useState<string>('all');

  if (!isOpen) return null;

  const filteredStudents = students.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchesClass = selectedClass === 'all' || s.classGroup === selectedClass;
    return matchesSearch && matchesClass;
  });

  const classList = Array.from(new Set(students.map((s) => s.classGroup))).sort();

  const handlePick = (student: StudentRecord) => {
    soundManager.playClick();
    onSelectStudent(student);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/65 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border-4 border-amber-300 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 p-5 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shadow-inner font-bold border border-white/30">
              👥
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-black text-xl sm:text-2xl">
                  Daftar Nama Siswa Kelas 4
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white font-mono text-[11px] font-bold">
                  {students.length} Siswa Terdaftar
                </span>
              </div>
              <p className="text-xs text-amber-100 font-medium">
                Sesuai Buku Nilai Resmi di Dashboard Guru (Pak Faizal, S.Pd.)
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

        {/* Filter & Search Bar */}
        <div className="p-4 bg-amber-50/70 border-b border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama siswa..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-amber-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setSelectedClass('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedClass === 'all'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-white border border-amber-300 text-slate-700 hover:bg-amber-100'
              }`}
            >
              Semua Kelas ({students.length})
            </button>
            {classList.map((cls) => {
              const count = students.filter((s) => s.classGroup === cls).length;
              return (
                <button
                  key={cls}
                  onClick={() => setSelectedClass(cls)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    selectedClass === cls
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-white border border-amber-300 text-slate-700 hover:bg-amber-100'
                  }`}
                >
                  Kelas {cls} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Students Cards Grid */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3 flex-1 bg-slate-50/50">
          <p className="text-xs font-bold text-slate-600 mb-2">
            👉 Klik salah satu nama di bawah untuk login dan melanjutkan petualanganmu:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredStudents.map((s, idx) => {
              const isSelected = s.id === selectedStudentId;
              const isGold = s.medalTier.toLowerCase().includes('emas');
              const isSilver = s.medalTier.toLowerCase().includes('perak');

              return (
                <div
                  key={s.id}
                  onClick={() => handlePick(s)}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between group ${
                    isSelected
                      ? 'bg-amber-50 border-amber-500 shadow-md ring-2 ring-amber-400/30'
                      : 'bg-white border-slate-200 hover:border-amber-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 border border-amber-300 flex items-center justify-center font-black font-display text-sm shrink-0 shadow-xs">
                        {idx + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-extrabold text-sm text-slate-900 group-hover:text-amber-700 transition-colors">
                            {s.name}
                          </h4>
                          <span className="px-2 py-0.2 rounded-md bg-slate-100 border border-slate-200 text-[10px] font-bold text-slate-600">
                            {s.classGroup}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {s.status === 'Selesai' ? '✅ Petualangan Selesai' : '⏳ Sedang Belajar'}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-black font-display text-base text-amber-950 block">
                        {s.totalScore} Poin
                      </span>
                      <span className="text-[10px] font-bold text-amber-700 flex items-center gap-0.5 justify-end">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        {s.earnedStars} Bintang
                      </span>
                    </div>
                  </div>

                  {/* Badges footer */}
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`px-2 py-0.5 rounded-full font-bold text-[10px] flex items-center gap-1 ${
                          isGold
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : isSilver
                            ? 'bg-slate-200 text-slate-800 border border-slate-300'
                            : 'bg-orange-100 text-orange-900 border border-orange-300'
                        }`}
                      >
                        <Trophy size={11} className={isGold ? 'text-amber-600' : 'text-slate-600'} />
                        <span>{s.medalTier.split(':')[0]}</span>
                      </span>

                      <span className="text-slate-500 text-[10px]">
                        {s.visitedProfessionsCount} / 8 Pos
                      </span>
                    </div>

                    <button
                      type="button"
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                        isSelected
                          ? 'bg-amber-600 text-white'
                          : 'bg-slate-100 text-slate-700 group-hover:bg-amber-500 group-hover:text-white'
                      }`}
                    >
                      <span>{isSelected ? 'Terpilih' : 'Pilih'}</span>
                      <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            Daftar siswa ini otomatis sinkron dengan tabel buku nilai di <strong>Dashboard Guru</strong>.
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
