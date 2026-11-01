import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldAlert,
  Search,
  Filter,
  Printer,
  Download,
  Award,
  BookOpen,
  Calculator,
  Palette,
  Activity,
  ShieldCheck,
  Send
} from 'lucide-react';
import { StudentRecord, MataPelajaran, AnswerLog } from '../types/game';
import { soundManager } from '../utils/audio';
import { SUBJECT_METADATA } from '../data/subjectCurriculum';

interface StudentAnswerLogModalProps {
  student: StudentRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onQuickSendMessage?: (studentName: string) => void;
}

export const StudentAnswerLogModal: React.FC<StudentAnswerLogModalProps> = ({
  student,
  isOpen,
  onClose,
  onQuickSendMessage
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen || !student) return null;

  const logs = student.answerLogs || [];
  const violations = student.violations || [];

  // Filter logs by subject and search
  const filteredLogs = logs.filter(log => {
    const matchSubject = selectedSubject === 'all' || log.subject === selectedSubject;
    const matchSearch =
      log.questionText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.studentAnswer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.professionOrigin && log.professionOrigin.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchSubject && matchSearch;
  });

  // Calculate subject breakdown
  const subjectsList: MataPelajaran[] = ['Matematika', 'PKn', 'Bahasa Indonesia', 'SBdP', 'PJOK'];
  const subjectStats = subjectsList.map(subj => {
    const subjLogs = logs.filter(l => l.subject === subj);
    const correctCount = subjLogs.filter(l => l.isCorrect).length;
    const totalCount = subjLogs.length;
    const percent = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
    return { subject: subj, correctCount, totalCount, percent };
  });

  const totalAnswered = logs.length;
  const totalCorrect = logs.filter(l => l.isCorrect).length;
  const overallAccuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

  const getSubjectIcon = (subj: MataPelajaran) => {
    switch (subj) {
      case 'Matematika': return <Calculator className="w-3.5 h-3.5" />;
      case 'PKn': return <ShieldCheck className="w-3.5 h-3.5" />;
      case 'Bahasa Indonesia': return <BookOpen className="w-3.5 h-3.5" />;
      case 'SBdP': return <Palette className="w-3.5 h-3.5" />;
      case 'PJOK': return <Activity className="w-3.5 h-3.5" />;
    }
  };

  const handlePrint = () => {
    soundManager.playClick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border-4 border-indigo-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-blue-700 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white/20 border-2 border-white/30 flex items-center justify-center text-xl font-black font-display shadow-inner">
              {student.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black font-display">{student.name}</h2>
                <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs font-bold">
                  Kelas {student.classGroup}
                </span>
                {student.violationCount > 0 ? (
                  <span className="px-2 py-0.5 bg-rose-500 text-white rounded-full text-xs font-extrabold flex items-center gap-1 animate-pulse">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    {student.violationCount} Pelanggaran
                  </span>
                ) : (
                  <span className="px-2 py-0.5 bg-emerald-500/90 text-white rounded-full text-xs font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Integritas Terjaga
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-indigo-100 mt-0.5">
                Audit Trail Log Jawaban & Rekap Mata Pelajaran SD Kelas 4
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold text-white cursor-pointer transition"
            >
              <Printer className="w-4 h-4" /> Cetak
            </button>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 p-2 rounded-full cursor-pointer transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex flex-col gap-5 flex-1">
          {/* Summary Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-indigo-50 border border-indigo-200 p-3.5 rounded-2xl">
              <span className="text-[10px] font-bold text-indigo-700 uppercase block">Total Skor Poin</span>
              <span className="text-xl font-black text-indigo-950 font-display">{student.totalScore} Poin</span>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-2xl">
              <span className="text-[10px] font-bold text-emerald-700 uppercase block">Akurasi Jawaban</span>
              <span className="text-xl font-black text-emerald-950 font-display">
                {overallAccuracy}% ({totalCorrect}/{totalAnswered})
              </span>
            </div>
            <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-2xl">
              <span className="text-[10px] font-bold text-amber-700 uppercase block">Nilai Kuis Akhir</span>
              <span className="text-xl font-black text-amber-950 font-display">{student.finalQuizScore} / 100</span>
            </div>
            <div className={`p-3.5 rounded-2xl border ${
              student.violationCount > 0 ? 'bg-rose-50 border-rose-300' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className={`text-[10px] font-bold uppercase block ${
                student.violationCount > 0 ? 'text-rose-700' : 'text-slate-500'
              }`}>
                Pelanggaran Keluar Tab
              </span>
              <span className={`text-xl font-black font-display ${
                student.violationCount > 0 ? 'text-rose-700' : 'text-slate-800'
              }`}>
                {student.violationCount} Kali
              </span>
            </div>
          </div>

          {/* Violations Box (if any) */}
          {violations.length > 0 && (
            <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-rose-600" />
                  <h4 className="font-extrabold text-sm text-rose-900">
                    Riwayat Pelanggaran Keluar Tab / Pindah Jendela ({violations.length})
                  </h4>
                </div>
                {onQuickSendMessage && (
                  <button
                    onClick={() => onQuickSendMessage(student.name)}
                    className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer transition shadow-xs"
                  >
                    <Send className="w-3 h-3" /> Tegur Siswa
                  </button>
                )}
              </div>
              <div className="space-y-1.5">
                {violations.map((v, i) => (
                  <div key={v.id || i} className="flex items-center justify-between bg-white/80 px-3 py-2 rounded-xl text-xs text-rose-950 border border-rose-200">
                    <span className="font-semibold">⚠️ {v.description}</span>
                    <span className="font-mono text-rose-700 font-bold">{v.timestamp} (Layar: {v.screen})</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5 Subjects Breakdown Bar */}
          <div>
            <h4 className="font-extrabold text-xs text-slate-500 uppercase tracking-wider mb-2">
              Penguasaan 5 Mata Pelajaran SD
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {subjectStats.map(stat => {
                const meta = SUBJECT_METADATA[stat.subject];
                return (
                  <div
                    key={stat.subject}
                    className={`p-3 rounded-2xl border ${meta.borderColor} ${meta.badgeBg} flex flex-col`}
                  >
                    <div className="flex items-center justify-between text-xs font-extrabold mb-1">
                      <span className={meta.badgeText}>{stat.subject}</span>
                      <span className="text-[11px] font-bold text-slate-600">{stat.percent}%</span>
                    </div>
                    <div className="w-full bg-white/80 rounded-full h-2 overflow-hidden border border-slate-200 mb-1.5">
                      <div
                        className={`${meta.accentBg} h-full transition-all duration-500`}
                        style={{ width: `${stat.percent}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-500 mt-auto">
                      {stat.correctCount} dari {stat.totalCount} benar
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            {/* Subject Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
              <button
                onClick={() => setSelectedSubject('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition ${
                  selectedSubject === 'all'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Semua Mapel ({logs.length})
              </button>
              {subjectsList.map(subj => {
                const count = logs.filter(l => l.subject === subj).length;
                return (
                  <button
                    key={subj}
                    onClick={() => setSelectedSubject(subj)}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition flex items-center gap-1 ${
                      selectedSubject === subj
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {getSubjectIcon(subj)}
                    {subj} ({count})
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari pertanyaan / jawaban..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-indigo-400 outline-none"
              />
            </div>
          </div>

          {/* Detailed Question & Answer Logs */}
          <div className="flex flex-col gap-3">
            {filteredLogs.length === 0 ? (
              <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300 text-slate-400">
                <BookOpen className="w-8 h-8 mx-auto mb-1 text-slate-300" />
                <p className="font-bold text-xs">Tidak ada log jawaban yang cocok dengan filter.</p>
              </div>
            ) : (
              filteredLogs.map((log, idx) => {
                const meta = SUBJECT_METADATA[log.subject] || SUBJECT_METADATA['Matematika'];
                return (
                  <div
                    key={log.id || idx}
                    className={`p-4 rounded-2xl border-2 transition ${
                      log.isCorrect
                        ? 'bg-emerald-50/40 border-emerald-200'
                        : 'bg-rose-50/40 border-rose-200'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase flex items-center gap-1 border ${meta.borderColor} ${meta.badgeBg} ${meta.badgeText}`}>
                          {getSubjectIcon(log.subject)}
                          {log.subject}
                        </span>
                        {log.professionOrigin && (
                          <span className="text-[11px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded-lg border border-slate-200">
                            Pos: {log.professionOrigin}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-slate-400 font-mono flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {log.timestamp}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full font-black text-xs ${
                          log.isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {log.isCorrect ? `+${log.pointsEarned} Poin` : '0 Poin'}
                        </span>
                      </div>
                    </div>

                    {/* Question text */}
                    <p className="text-sm font-bold text-slate-900 mb-2.5 leading-snug">
                      {idx + 1}. {log.questionText}
                    </p>

                    {/* Student answer vs correct answer */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className={`p-2.5 rounded-xl border flex items-start gap-2 ${
                        log.isCorrect
                          ? 'bg-white border-emerald-300 text-emerald-950'
                          : 'bg-white border-rose-300 text-rose-950'
                      }`}>
                        {log.isCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                        )}
                        <div>
                          <span className="text-[10px] font-bold text-slate-500 block uppercase">
                            Jawaban Siswa:
                          </span>
                          <span className="font-bold">{log.studentAnswer}</span>
                        </div>
                      </div>

                      {!log.isCorrect && (
                        <div className="p-2.5 rounded-xl bg-white border border-emerald-300 text-emerald-950 flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="text-[10px] font-bold text-emerald-700 block uppercase">
                              Kunci Jawaban Benar:
                            </span>
                            <span className="font-bold">{log.correctAnswer}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Explanation */}
                    {log.explanation && (
                      <p className="mt-2 text-xs text-slate-600 italic bg-white/70 p-2.5 rounded-xl border border-slate-200/80">
                        💡 <strong>Pembahasan:</strong> {log.explanation}
                      </p>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">
            Menampilkan {filteredLogs.length} dari {logs.length} catatan aktivitas
          </span>
          <button
            onClick={onClose}
            className="py-2 px-6 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs cursor-pointer transition shadow-xs"
          >
            Tutup Log
          </button>
        </div>
      </div>
    </div>
  );
};
