import React from 'react';
import { X, Compass, Star, Award, Target, BookOpen } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface InstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstructionsModal: React.FC<InstructionsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleClose = () => {
    soundManager.playClick();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-4 border-amber-300 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 px-6 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-2xl">
              <Compass className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold font-display">Petunjuk Petualangan</h2>
              <p className="text-xs md:text-sm text-amber-100">Panduan Bermain untuk Siswa Kelas 4 SD</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
            aria-label="Tutup petunjuk"
          >
            <X size={22} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-700">
          {/* Tujuan Pembelajaran */}
          <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200">
            <div className="flex items-center gap-2 mb-2 text-amber-900 font-bold font-display text-base">
              <Target className="w-5 h-5 text-amber-600" />
              <span>Tujuan Pembelajaran Kita</span>
            </div>
            <ul className="text-sm space-y-1.5 text-slate-700 list-disc list-inside">
              <li>Mengenali 8 jenis pekerjaan penting di masyarakat.</li>
              <li>Menjelaskan tugas dan tanggung jawab masing-masing profesi.</li>
              <li>Mengidentifikasi alat-alat khas yang dipakai bekerja.</li>
              <li>Mengetahui tempat bekerja setiap profesi.</li>
              <li>Memahami bahwa semua pekerjaan mulia dan saling melengkapi!</li>
            </ul>
          </div>

          {/* 4 Langkah Bermain */}
          <div>
            <h3 className="font-display font-bold text-lg text-slate-900 mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              <span>Cara Menjelajah Pulau Pekerjaan</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-2xl flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0">
                  1
                </div>
                <div>
                  <p className="font-bold text-blue-900">Jelajahi Pos Profesi</p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Klik pin lokasi di peta pulau (Sekolah, RS, Kantor Polisi, Sawah, Bandara, Laut, Restoran, Pos Damkar). Pelajari tugas dan alatnya!
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0">
                  2
                </div>
                <div>
                  <p className="font-bold text-emerald-900">Mainkan 4 Mini Game</p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Tebak Profesi, Pasangkan Alat dengan Drag & Drop, Teka-Teki Siapa Aku, dan Pilih Tempat Kerja yang tepat!
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-purple-50 border border-purple-200 rounded-2xl flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center shrink-0">
                  3
                </div>
                <div>
                  <p className="font-bold text-purple-900">Hadapi Tantangan Akhir</p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Uji pemahamanmu lewat kuis 10 soal seru dengan pembahasan langsung dan perolehan skor otomatis.
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center shrink-0">
                  4
                </div>
                <div>
                  <p className="font-bold text-amber-900">Raih Medali & Sertifikat</p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Kumpulkan poin (+10 poin per jawaban benar), raih Medali Emas, dan cetak Sertifikat Penjelajah dengan namamu!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sistem Skor & Bintang */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Star className="w-8 h-8 text-amber-500 fill-amber-400" />
              <div>
                <p className="font-bold text-slate-900 text-sm">Sistem Bintang & Poin</p>
                <p className="text-xs text-slate-600">Setiap jawaban benar = +10 Poin. Setiap pos yang dikunjungi = +1 Bintang.</p>
              </div>
            </div>
            <Award className="w-8 h-8 text-indigo-500" />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex justify-end">
          <button
            onClick={handleClose}
            className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-2xl shadow-md hover:from-amber-600 hover:to-orange-600 active:scale-95 transition-all"
          >
            Saya Siap Berpetualang!
          </button>
        </div>
      </div>
    </div>
  );
};
