import React, { useState, useEffect } from 'react';
import { Play, HelpCircle, Sparkles, Compass, User, Star, ChevronDown, Briefcase } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { HomeProfessionShowcase } from './HomeProfessionShowcase';
import { heroWorldMap, adventurerMascot } from '../assets/images';

import { StudentRecord } from '../types/game';

interface TitleScreenProps {
  onStart: (playerName: string, targetProfessionId?: string) => void;
  onOpenInstructions: () => void;
  initialPlayerName: string;
  students?: StudentRecord[];
}

export const TitleScreen: React.FC<TitleScreenProps> = ({
  onStart,
  onOpenInstructions,
  initialPlayerName,
  students = []
}) => {
  const [useCustomName, setUseCustomName] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<string>(() => {
    const match = students.find(s => s.name.toLowerCase() === initialPlayerName?.toLowerCase());
    return match ? match.id : (students[0]?.id || '');
  });
  const [playerName, setPlayerName] = useState(() => {
    if (initialPlayerName && initialPlayerName !== 'Petualang Cilik') return initialPlayerName;
    return students[0]?.name || 'Aisyah Zahra';
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleStartClick();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playerName]);

  const handleStartClick = () => {
    soundManager.playClick();
    soundManager.startBGM();
    soundManager.playCorrect();
    const finalName = playerName.trim() || 'Petualang Cilik';
    soundManager.speak(`Selamat datang ${finalName}! Mari kita mulai petualangan menjelajah dunia pekerjaan!`);
    onStart(finalName);
  };

  const handleInstructionsClick = () => {
    soundManager.playClick();
    onOpenInstructions();
  };

  const scrollToDiscussion = () => {
    soundManager.playClick();
    const elem = document.getElementById('pembahasan-pekerjaan-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-start p-3 sm:p-6 md:p-8 overflow-y-auto bg-gradient-to-b from-sky-400 via-amber-200 to-emerald-300">
      {/* Background Decor Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-10 left-10 w-48 h-48 bg-white/40 rounded-full blur-2xl animate-float-soft" />
        <div className="absolute top-40 right-20 w-72 h-72 bg-amber-200/50 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-10 left-1/3 w-96 h-96 bg-emerald-400/40 rounded-full blur-3xl" />
      </div>

      {/* Top Banner Badge */}
      <header className="relative z-10 w-full max-w-5xl flex items-center justify-between pt-2">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full shadow-md border-2 border-amber-300">
          <Compass className="w-5 h-5 text-amber-600 animate-spin" style={{ animationDuration: '10s' }} />
          <span className="text-xs md:text-sm font-bold text-amber-900">
            Game Edukasi Interaktif Kelas 4 SD
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundManager.playClick();
              onStart('teacher_mode_nav');
            }}
            className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-xs font-bold shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
            title="Masuk ke Dashboard Guru"
          >
            <span>👨‍🏫</span>
            <span>Dashboard Guru</span>
          </button>

          <div className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-500/90 text-white rounded-full text-xs font-bold shadow-md">
            <Star className="w-4 h-4 fill-amber-200 text-amber-200" />
            <span>8 Pos Profesi</span>
          </div>
        </div>
      </header>

      {/* Main Title & Hero Content */}
      <main className="relative z-10 w-full max-w-5xl my-4 py-4 flex flex-col items-center text-center">
        {/* Title Lockup */}
        <div className="inline-block relative mb-3">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="px-3.5 py-1 bg-amber-500 text-white font-black text-xs md:text-sm tracking-wider uppercase rounded-full shadow-sm">
              Misi Edukasi Anak
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-display tracking-tight text-white drop-shadow-[0_6px_0_rgba(180,83,9,1)] stroke-amber-900">
            MISI: JELAJAH
            <br />
            <span className="text-amber-300 drop-shadow-[0_6px_0_rgba(180,83,9,1)]">
              DUNIA PEKERJAAN
            </span>
          </h1>

          <p className="mt-3 text-base sm:text-xl font-medium text-amber-950 max-w-2xl mx-auto drop-shadow-sm font-display">
            Ayo berkeliling pulau 3D, temukan 8 profesi hebat masyarakat, kenali alat kerja ajaibnya, dan raih Medali Master Penjelajah!
          </p>
        </div>

        {/* 3D Visual Centerpiece */}
        <div className="relative w-full max-w-3xl my-2 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* 3D Isometric Island Thumbnail Preview */}
          <div className="md:col-span-8 relative group">
            <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-amber-100 aspect-video">
              <img
                src={heroWorldMap}
                alt="Peta 3D Pulau Profesi Dunia Pekerjaan"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent flex items-end p-4">
                <p className="text-white text-xs sm:text-sm font-bold drop-shadow">
                  Pulau Profesi: Sekolah · Rumah Sakit · Kantor Polisi · Sawah · Bandara · Laut · Restoran · Damkar
                </p>
              </div>
            </div>
          </div>

          {/* Adventurer Mascot Card */}
          <div className="md:col-span-4 flex flex-col items-center">
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-3xl overflow-hidden border-4 border-amber-300 shadow-2xl bg-white animate-float-soft">
              <img
                src={adventurerMascot}
                alt="Karakter Penjelajah Cilik"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-2 right-2 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                Pemandu
              </div>
            </div>
            <div className="mt-2 bg-white/90 backdrop-blur-md px-3 py-1 rounded-2xl border border-amber-300 shadow text-xs font-bold text-amber-900">
              Halo! Aku Boni, pemandumu!
            </div>
          </div>
        </div>

        {/* Student Login with Name Provided by Teacher */}
        <div className="w-full max-w-md mt-2 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-3xl shadow-xl border-2 border-amber-300 space-y-3.5">
          <div className="text-left">
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="student-picker" className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                <User className="w-4 h-4 text-amber-600" />
                <span>Pilih Nama Siswa (Daftar Guru):</span>
              </label>
              <button
                type="button"
                onClick={() => setUseCustomName(!useCustomName)}
                className="text-[11px] font-bold text-indigo-600 hover:underline cursor-pointer"
              >
                {useCustomName ? '📋 Pilih dari Daftar Guru' : '✏️ Ketik Nama Lain'}
              </button>
            </div>

            {!useCustomName && students.length > 0 ? (
              <div className="space-y-2">
                <select
                  id="student-picker"
                  value={selectedStudentId}
                  onChange={(e) => {
                    const id = e.target.value;
                    setSelectedStudentId(id);
                    const found = students.find((s) => s.id === id);
                    if (found) {
                      setPlayerName(found.name);
                      soundManager.playClick();
                    }
                  }}
                  className="w-full px-3.5 py-2.5 bg-amber-50/80 border-2 border-amber-300 rounded-2xl text-slate-800 font-bold text-xs sm:text-sm focus:outline-none focus:ring-4 focus:ring-amber-400/30 focus:border-amber-500 transition-all cursor-pointer"
                >
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      👤 {s.name} ({s.classGroup}) — {s.totalScore} Poin · {s.medalTier}
                    </option>
                  ))}
                </select>

                {/* Selected Student Profile Preview */}
                {(() => {
                  const sel = students.find((s) => s.id === selectedStudentId);
                  if (!sel) return null;
                  return (
                    <div className="p-2.5 rounded-xl bg-amber-100/70 border border-amber-300 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-extrabold text-amber-950">{sel.name}</span>
                        <span className="text-[11px] text-amber-800 ml-1.5">Kelas {sel.classGroup}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-amber-900">{sel.totalScore} Poin</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-200 text-amber-900">
                          {sel.medalTier}
                        </span>
                      </div>
                    </div>
                  );
                })()}
              </div>
            ) : (
              <div>
                <input
                  id="player-name-input"
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="Ketik namamu di sini..."
                  maxLength={25}
                  className="w-full px-4 py-2.5 bg-amber-50/70 border-2 border-amber-300 rounded-2xl text-slate-800 font-bold text-sm sm:text-base focus:outline-none focus:ring-4 focus:ring-amber-400/30 focus:border-amber-500 transition-all"
                />
                <p className="text-[10px] text-slate-500 mt-1">
                  Nama ini akan dicantumkan pada sertifikat dan buku nilai guru.
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5">
            <button
              onClick={handleStartClick}
              data-start="true"
              className="flex-1 py-3 px-6 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white font-black text-sm sm:text-base rounded-2xl shadow-lg hover:from-amber-600 hover:to-orange-600 hover:scale-102 active:scale-95 transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <Play className="w-5 h-5 fill-white transition-transform group-hover:scale-110" />
              <span>MASUK PETUALANGAN</span>
            </button>

            <button
              onClick={handleInstructionsClick}
              className="py-3 px-4 bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs sm:text-sm rounded-2xl border-2 border-amber-300 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-amber-700" />
              <span>Petunjuk</span>
            </button>
          </div>

          {/* Quick scroll down to discussion */}
          <div className="pt-1">
            <button
              onClick={scrollToDiscussion}
              className="w-full py-1.5 px-3 bg-amber-100/80 hover:bg-amber-200/90 text-amber-950 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <Briefcase size={14} className="text-amber-700" />
              <span>Lihat Pembahasan 8 Pekerjaan Berlatar Khusus</span>
              <ChevronDown size={14} className="text-amber-700 animate-bounce" />
            </button>
          </div>
        </div>
      </main>

      {/* Bagian Halaman Utama: Pembahasan Pekerjaan dengan Background Sesuai Topik */}
      <div id="pembahasan-pekerjaan-section" className="w-full flex justify-center">
        <HomeProfessionShowcase
          onStartWithProfession={(profId) => {
            const finalName = playerName.trim() || 'Petualang Cilik';
            onStart(finalName, profId);
          }}
        />
      </div>

      {/* Footer safe margin */}
      <footer className="relative z-10 text-center text-xs text-amber-950/80 font-medium py-4">
        <span>Tekan tombol </span>
        <kbd className="px-2 py-0.5 bg-white/80 border border-amber-300 rounded font-mono text-[10px] font-bold">
          Enter
        </kbd>
        <span> untuk langsung mulai · Cocok untuk Komputer, Laptop, Tablet & HP</span>
      </footer>
    </div>
  );
};
