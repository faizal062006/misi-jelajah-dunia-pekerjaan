import React from 'react';
import { AlertTriangle, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface AntiCheatWarningModalProps {
  isOpen: boolean;
  playerName: string;
  violationCount: number;
  lastViolationTime?: string;
  onDismiss: () => void;
}

export const AntiCheatWarningModal: React.FC<AntiCheatWarningModalProps> = ({
  isOpen,
  playerName,
  violationCount,
  lastViolationTime,
  onDismiss
}) => {
  if (!isOpen) return null;

  const handleDismiss = () => {
    soundManager.playClick();
    onDismiss();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border-4 border-rose-500 overflow-hidden flex flex-col animate-scaleUp">
        {/* Warning Header */}
        <div className="bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 p-5 text-white flex items-center gap-3.5 shadow-md">
          <div className="w-12 h-12 rounded-2xl bg-white/20 border-2 border-white/30 flex items-center justify-center shrink-0 animate-pulse">
            <ShieldAlert className="w-7 h-7 text-yellow-300" />
          </div>
          <div>
            <span className="px-2.5 py-0.5 bg-yellow-400 text-slate-900 text-[11px] font-black uppercase rounded-full tracking-wider inline-block">
              Sistem Anti-Kecurangan Aktif
            </span>
            <h2 className="text-xl sm:text-2xl font-black font-display tracking-tight mt-0.5">
              Peringatan Integritas Siswa!
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 flex flex-col gap-4 text-slate-800">
          <div className="flex items-center gap-3 p-3.5 bg-rose-50 border-2 border-rose-200 rounded-2xl">
            <AlertTriangle className="w-6 h-6 text-rose-600 shrink-0" />
            <div className="text-sm font-bold text-rose-950">
              Terdeteksi meninggalkan tab atau meminimalkan browser game!
            </div>
          </div>

          <div className="text-sm text-slate-600 leading-relaxed space-y-2">
            <p>
              Halo <strong className="text-slate-900">{playerName}</strong>, sistem mendeteksi kamu baru saja beralih ke tab atau aplikasi lain saat misi permainan sedang aktif.
            </p>
            <p className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-900 text-xs">
              📌 <strong>Catatan Guru:</strong> Kejadian ini <strong>otomatis tercatat di Dashboard Guru</strong> (Pak Faizal, S.Pd.) beserta jam dan menit kejadiannya.
            </p>
          </div>

          {/* Stats Pill */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="bg-slate-100 p-3 rounded-xl border border-slate-200 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Total Pelanggaran</span>
              <span className="text-xl font-black text-rose-600 font-display">
                {violationCount} Kali
              </span>
            </div>
            <div className="bg-slate-100 p-3 rounded-xl border border-slate-200 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Waktu Terakhir</span>
              <span className="text-base font-black text-slate-800 font-display">
                {lastViolationTime || 'Baru Saja'}
              </span>
            </div>
          </div>

          {/* Educational Encouragement */}
          <p className="text-xs text-slate-500 text-center italic">
            "Siswa hebat selalu mengutamakan kejujuran dan mandiri dalam belajar."
          </p>

          {/* Confirm Button */}
          <button
            onClick={handleDismiss}
            className="w-full py-3.5 px-6 mt-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold rounded-2xl shadow-lg shadow-emerald-600/30 active:scale-98 transition flex items-center justify-center gap-2 text-base cursor-pointer"
          >
            <CheckCircle2 className="w-5 h-5" />
            Saya Mengerti & Kembali Fokus Mengerjakan
          </button>
        </div>
      </div>
    </div>
  );
};
