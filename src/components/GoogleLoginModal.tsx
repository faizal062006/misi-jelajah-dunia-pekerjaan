import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Lock,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Sparkles,
  School
} from 'lucide-react';
import { TeacherUser } from '../types/game';
import { soundManager } from '../utils/audio';

interface GoogleLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: TeacherUser) => void;
}

export const GoogleLoginModal: React.FC<GoogleLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [useCustomAccount, setUseCustomAccount] = useState(false);
  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');
  const [customSchool, setCustomSchool] = useState('SDN 01 Harapan Bangsa');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const defaultTeacher: TeacherUser = {
    email: 'faizal230923@gmail.com',
    name: 'Pak Faizal, S.Pd.',
    school: 'SDN 01 Harapan Bangsa',
    role: 'Wali Kelas 4 SD & Administrator Nilai',
    loggedInAt: new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  };

  const handleSelectQuickAccount = () => {
    soundManager.playClick();
    setIsLoading(true);

    setTimeout(() => {
      soundManager.playFanfare();
      onLoginSuccess(defaultTeacher);
      setIsLoading(false);
    }, 600);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail.trim() || !customName.trim()) return;

    soundManager.playClick();
    setIsLoading(true);

    setTimeout(() => {
      soundManager.playFanfare();
      onLoginSuccess({
        email: customEmail.trim(),
        name: customName.trim(),
        school: customSchool.trim() || 'SDN 01 Harapan Bangsa',
        role: 'Guru Kelas 4 SD',
        loggedInAt: new Date().toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })
      });
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border-4 border-amber-300 overflow-hidden flex flex-col">
        {/* Google Dialog Header */}
        <div className="p-6 bg-gradient-to-b from-slate-50 to-white border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Google Logo SVG */}
            <div className="w-10 h-10 rounded-2xl bg-white shadow-md border border-slate-100 flex items-center justify-center p-2">
              <svg viewBox="0 0 24 24" className="w-full h-full">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-1.5 font-display">
                Masuk dengan Google
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </h2>
              <p className="text-xs text-slate-500">
                Portal Guru & Evaluasi Nilai Siswa
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Tutup dialog login"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-3 flex items-start gap-2.5">
            <Lock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-900 leading-relaxed">
              Otentikasi khusus pendidik untuk melihat rekap nilai, cetak sertifikat, mengelola basis data kelas, dan kontrol musik pengiring belajar.
            </p>
          </div>

          {!useCustomAccount ? (
            <div className="space-y-3">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Pilih Akun Guru Terdaftar:
              </label>

              {/* Verified Teacher Account Card */}
              <div
                onClick={handleSelectQuickAccount}
                className="group relative p-3.5 rounded-2xl border-2 border-indigo-200 hover:border-indigo-500 bg-gradient-to-r from-indigo-50/50 via-white to-blue-50/40 hover:shadow-lg transition-all cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 text-white font-bold text-sm flex items-center justify-center shadow-md">
                      FZ
                    </div>
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">
                        Pak Faizal, S.Pd.
                      </h3>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-md">
                        Terverifikasi
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-mono">faizal230923@gmail.com</p>
                    <p className="text-[10px] text-indigo-700 font-medium flex items-center gap-1 mt-0.5">
                      <School className="w-3 h-3" /> SDN 01 Harapan Bangsa • Kelas 4
                    </p>
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-white shadow-xs group-hover:bg-indigo-600 group-hover:text-white transition-all text-slate-400">
                  <ArrowRight size={16} />
                </div>
              </div>

              {/* 1-Click Action Button */}
              <button
                disabled={isLoading}
                onClick={handleSelectQuickAccount}
                className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 active:scale-[0.98] text-white font-bold text-sm rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Menghubungkan ke Akun Google...</span>
                  </>
                ) : (
                  <>
                    <span>Lanjutkan sebagai Faizal (Guru Kelas 4)</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setUseCustomAccount(true);
                  }}
                  className="text-xs text-indigo-700 hover:text-indigo-900 font-bold hover:underline cursor-pointer"
                >
                  Gunakan akun Google / email madrasah lain
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleCustomSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Akun Google Guru:
                </label>
                <input
                  type="email"
                  required
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  placeholder="contoh: nama.guru@sekolah.sch.id atau gmail.com"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Lengkap & Gelar Guru:
                </label>
                <input
                  type="text"
                  required
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="contoh: Ibu Siti Rahma, S.Pd."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Sekolah / Rombel:
                </label>
                <input
                  type="text"
                  value={customSchool}
                  onChange={(e) => setCustomSchool(e.target.value)}
                  placeholder="contoh: SDN 01 Harapan Bangsa"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setUseCustomAccount(false);
                  }}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
                >
                  Kembali ke Akun Utama
                </button>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                >
                  {isLoading ? 'Memverifikasi...' : 'Masuk Dashboard'}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer info */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5">
            <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Google Workspace for Education</span>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="font-bold text-slate-700 hover:text-slate-900 cursor-pointer"
          >
            Batal & Kembali ke Game
          </button>
        </div>
      </div>
    </div>
  );
};
