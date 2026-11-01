import React, { useState, useEffect } from 'react';
import {
  X,
  AlertTriangle,
  ShieldAlert,
  Send,
  Bell,
  Clock,
  Eye,
  CheckCircle2
} from 'lucide-react';
import { StudentRecord, TeacherMessage } from '../types/game';
import { soundManager } from '../utils/audio';

interface TeacherWarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetStudentName: string;
  studentsList: StudentRecord[];
  onSendWarning: (targetStudent: string, message: string) => void;
}

const WARNING_TEMPLATES = [
  {
    id: 'tab',
    title: '🚨 Peringatan Keluar Tab / Aplikasi',
    desc: 'Untuk siswa yang terdeteksi berpindah tab browser atau jendela aplikasi.',
    text: 'Peringatan dari Guru: Terdeteksi berpindah tab browser atau jendela aplikasi! Harap segera kembali fokus mengerjakan misi di game ini secara tertib.'
  },
  {
    id: 'time',
    title: '⏱️ Peringatan Waktu Pengerjaan',
    desc: 'Mengingatkan sisa waktu belajar atau kuis.',
    text: 'Peringatan dari Guru: Waktu pengerjaan misi dan kuis hampir habis (tersisa 5 menit). Segera selesaikan dan periksa kembali jawabanmu.'
  },
  {
    id: 'focus',
    title: '🎯 Peringatan Fokus & Ketelitian',
    desc: 'Untuk siswa yang menjawab terlalu cepat atau kurang teliti.',
    text: 'Peringatan dari Guru: Bacalah penjelasan tugas profesi dan pertanyaan kuis dengan teliti sebelum menekan tombol jawaban.'
  },
  {
    id: 'integrity',
    title: '⚖️ Peringatan Kejujuran & Kemandirian',
    desc: 'Mengingatkan siswa agar tidak mencontek atau mencari jawaban.',
    text: 'Peringatan dari Guru: Kerjakan seluruh misi dan kuis secara jujur dan mandiri tanpa melihat buku atau bertanya teman.'
  }
];

export const TeacherWarningModal: React.FC<TeacherWarningModalProps> = ({
  isOpen,
  onClose,
  targetStudentName,
  studentsList,
  onSendWarning
}) => {
  const [selectedTarget, setSelectedTarget] = useState<string>(targetStudentName || 'Semua Siswa');
  const [warningText, setWarningText] = useState<string>(WARNING_TEMPLATES[0].text);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('tab');

  useEffect(() => {
    if (targetStudentName) {
      setSelectedTarget(targetStudentName);
    }
  }, [targetStudentName]);

  if (!isOpen) return null;

  const handleSelectTemplate = (id: string, text: string) => {
    soundManager.playClick();
    setSelectedTemplateId(id);
    setWarningText(text);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!warningText.trim()) return;

    soundManager.playViolation();
    onSendWarning(selectedTarget, warningText.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border-4 border-rose-400 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-600 via-rose-700 to-red-700 p-5 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shadow-inner font-bold text-yellow-300">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-display font-black text-xl leading-tight">
                Kirim Peringatan Resmi Guru
              </h3>
              <p className="text-xs text-rose-100">
                Peringatan kedisiplinan, batas waktu, dan kejujuran belajar
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

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {/* Target Student Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <span>Penerima Peringatan:</span>
            </label>
            <select
              value={selectedTarget}
              onChange={(e) => setSelectedTarget(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border-2 border-slate-300 rounded-2xl text-slate-900 font-bold text-sm focus:outline-none focus:border-rose-500 transition-colors"
            >
              <option value="Semua Siswa">📢 Semua Siswa di Kelas (Broadcast Peringatan)</option>
              {studentsList.map((s) => (
                <option key={s.id} value={s.name}>
                  👤 {s.name} ({s.classGroup}) {s.violationCount > 0 ? `— ${s.violationCount}x keluar tab` : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Quick Warning Templates */}
          <div>
            <span className="block text-xs font-bold text-slate-700 mb-1.5">
              Pilih Jenis Peringatan:
            </span>
            <div className="space-y-2">
              {WARNING_TEMPLATES.map((tmpl) => {
                const isSelected = selectedTemplateId === tmpl.id;
                return (
                  <button
                    key={tmpl.id}
                    type="button"
                    onClick={() => handleSelectTemplate(tmpl.id, tmpl.text)}
                    className={`w-full text-left p-3 rounded-2xl border-2 transition-all flex items-start gap-2.5 cursor-pointer ${
                      isSelected
                        ? 'bg-rose-50 border-rose-400 shadow-sm'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full mt-0.5 shrink-0 border flex items-center justify-center ${
                        isSelected
                          ? 'border-rose-600 bg-rose-600 text-white'
                          : 'border-slate-400 bg-white'
                      }`}
                    >
                      {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">{tmpl.title}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{tmpl.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Message Editor */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Isi Pesan Peringatan (Dapat Diedit):
            </label>
            <textarea
              rows={3}
              value={warningText}
              onChange={(e) => setWarningText(e.target.value)}
              className="w-full p-3 bg-rose-50/50 border-2 border-rose-300 rounded-2xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:border-rose-500 transition-colors"
              placeholder="Ketik teks peringatan..."
            />
          </div>

          {/* Action Buttons */}
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
              className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md flex items-center gap-2 active:scale-95 transition-all cursor-pointer"
            >
              <Send size={15} />
              <span>Kirim Peringatan Sekarang</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
