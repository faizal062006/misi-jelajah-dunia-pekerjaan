import React, { useEffect } from 'react';
import { X, Printer, Award, Compass, CheckCircle2 } from 'lucide-react';
import { PlayerProgress } from '../types/game';
import { getMedalTier } from '../game/rules';
import { soundManager } from '../utils/audio';
import { fireChampionshipConfetti } from '../utils/confetti';
import { goldenTrophyCert } from '../assets/images';

interface CertificateModalProps {
  progress: PlayerProgress;
  isOpen: boolean;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  progress,
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const medal = getMedalTier(progress.score);
  const today = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  useEffect(() => {
    soundManager.playFanfare();
    fireChampionshipConfetti();
  }, []);

  const handlePrint = () => {
    soundManager.playClick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/75 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border-4 border-amber-300 overflow-hidden flex flex-col max-h-[95vh]">
        {/* Modal Top Bar */}
        <div className="bg-amber-500 px-6 py-3 flex items-center justify-between text-white print:hidden">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-200" />
            <span className="font-display font-bold text-sm sm:text-base">
              Sertifikat Kehormatan Penjelajah
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-1.5 bg-white text-amber-900 font-bold text-xs sm:text-sm rounded-xl shadow-xs hover:bg-amber-100 flex items-center gap-1.5 transition-colors"
            >
              <Printer size={15} />
              <span>Cetak Sertifikat</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="p-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors"
              aria-label="Tutup sertifikat"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Printable Certificate Area */}
        <div
          id="certificate-print-area"
          className="p-6 sm:p-10 bg-gradient-to-br from-amber-50/80 via-white to-amber-50/80 overflow-y-auto flex-1 text-center border-8 border-double border-amber-400 m-2 sm:m-4 rounded-3xl relative"
        >
          {/* Subtle Watermark Pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
            <Compass className="w-96 h-96 text-amber-900" />
          </div>

          {/* Top Crest & Trophy */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-amber-400 shadow-lg bg-amber-100 mb-3 animate-float-soft">
              <img
                src={goldenTrophyCert}
                alt="Piala Penghargaan Penjelajah"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-amber-800">
              Kementerian Pendidikan Petualangan Cilik
            </span>
            <h1 className="text-2xl sm:text-4xl font-black font-display text-slate-900 tracking-tight mt-1 mb-2">
              SERTIFIKAT PENGHARGAAN
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
              Diberikan sebagai pengakuan atas ketekunan dan keberhasilan dalam menuntaskan ekspedisi pembelajaran edukatif:
            </p>
            <div className="my-2 inline-block px-4 py-1 bg-amber-100 text-amber-900 font-black font-display text-sm sm:text-base rounded-full border border-amber-300">
              MISI: JELAJAH DUNIA PEKERJAAN
            </div>
          </div>

          {/* Student Recipient Name */}
          <div className="relative z-10 my-4 sm:my-6 py-2 border-b-2 border-dashed border-amber-400 max-w-md mx-auto">
            <span className="text-xs text-slate-500 uppercase tracking-wider block mb-1">
              Diberikan Kepada Siswa Berprestasi:
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-amber-900">
              {progress.playerName}
            </h2>
            <span className="text-xs font-semibold text-slate-600 block mt-1">
              Siswa Kelas 4 Sekolah Dasar
            </span>
          </div>

          {/* Citation / Merit Body */}
          <div className="relative z-10 max-w-2xl mx-auto text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2 mb-6">
            <p>
              Telah berhasil menjelajahi seluruh pos profesi (Guru, Dokter, Polisi, Petani, Pilot, Nelayan, Koki, dan Pemadam Kebakaran), mengidentifikasi peralatan kerja, tempat kerja, serta memahami peran mulia setiap pekerjaan dalam memajukan masyarakat.
            </p>
          </div>

          {/* Score & Medal Badges Strip */}
          <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 sm:gap-8 my-4">
            {/* Score */}
            <div className="px-5 py-2.5 bg-white rounded-2xl border-2 border-amber-300 shadow-xs">
              <span className="text-[10px] font-bold uppercase text-slate-500 block">Total Poin</span>
              <span className="text-lg sm:text-xl font-black font-display text-amber-950 tabular-nums">
                {progress.score} Poin
              </span>
            </div>

            {/* Medal */}
            <div className="px-5 py-2.5 bg-white rounded-2xl border-2 border-amber-300 shadow-xs">
              <span className="text-[10px] font-bold uppercase text-slate-500 block">Pencapaian Medali</span>
              <span className="text-lg sm:text-xl font-black font-display text-amber-900">
                {medal.title}
              </span>
            </div>

            {/* Stars */}
            <div className="px-5 py-2.5 bg-white rounded-2xl border-2 border-amber-300 shadow-xs">
              <span className="text-[10px] font-bold uppercase text-slate-500 block">Bintang Penjelajah</span>
              <span className="text-lg sm:text-xl font-black font-display text-yellow-500">
                {progress.earnedStars} ★ Bintang
              </span>
            </div>
          </div>

          {/* Signatures & Seal */}
          <div className="relative z-10 pt-6 mt-4 flex items-center justify-between text-xs text-slate-700 max-w-xl mx-auto">
            <div className="text-center">
              <p className="font-bold text-slate-900 mb-8">{today}</p>
              <div className="w-32 border-b border-slate-400 mx-auto" />
              <p className="text-[11px] text-slate-500 mt-1">Tanggal Penyelesaian</p>
            </div>

            {/* Official Stamp */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-amber-500 p-1 flex items-center justify-center rotate-[-8deg] opacity-90 shadow-sm bg-amber-50">
              <div className="w-full h-full rounded-full border border-dashed border-amber-600 flex flex-col items-center justify-center text-[9px] font-black text-amber-800 uppercase">
                <span>TERVERIFIKASI</span>
                <CheckCircle2 size={12} className="text-amber-700" />
                <span>SD JUARA</span>
              </div>
            </div>

            <div className="text-center">
              <p className="font-bold text-amber-950 mb-8 font-serif italic text-sm">Boni Penjelajah</p>
              <div className="w-36 border-b border-slate-400 mx-auto" />
              <p className="font-bold text-slate-900 text-[11px]">Kepala Ekspedisi Petualang</p>
              <p className="text-[10px] text-slate-500">Misi Jelajah Dunia Pekerjaan</p>
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex justify-end gap-3 print:hidden">
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm rounded-2xl shadow flex items-center gap-1.5 transition-all"
          >
            <Printer size={16} />
            <span>Cetak / Download PDF</span>
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs sm:text-sm rounded-2xl transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
