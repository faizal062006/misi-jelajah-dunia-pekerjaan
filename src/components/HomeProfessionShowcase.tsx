import React, { useState } from 'react';
import {
  BookOpen,
  MapPin,
  Volume2,
  Sparkles,
  CheckCircle2,
  Wrench,
  HeartHandshake,
  ArrowRight,
  Clock,
  Compass,
  Play
} from 'lucide-react';
import { Profession } from '../types/game';
import { PROFESSIONS_DATA } from '../data/professions';
import { ProfessionThemedBackdrop } from './ProfessionThemedBackdrop';
import { soundManager } from '../utils/audio';
import { SUBJECT_METADATA } from '../data/subjectCurriculum';

interface HomeProfessionShowcaseProps {
  onStartWithProfession: (professionId: string) => void;
}

export const HomeProfessionShowcase: React.FC<HomeProfessionShowcaseProps> = ({
  onStartWithProfession
}) => {
  const [selectedProfId, setSelectedProfId] = useState<string>('guru');
  const activeProf = PROFESSIONS_DATA.find((p) => p.id === selectedProfId) || PROFESSIONS_DATA[0];

  const handleSelectProf = (id: string) => {
    soundManager.playClick();
    setSelectedProfId(id);
  };

  const handleSpeakDiscussion = () => {
    soundManager.playClick();
    const narration = `${activeProf.name}. ${activeProf.title}. Bekerja di ${activeProf.workplace}. ${activeProf.narrativeText} Manfaat utamanya: ${activeProf.benefits}`;
    soundManager.speak(narration);
  };

  const handleStartMission = () => {
    soundManager.playClick();
    soundManager.startBGM();
    soundManager.playStar();
    onStartWithProfession(activeProf.id);
  };

  const primarySubjMeta = activeProf.subjectIntegration?.primarySubject
    ? SUBJECT_METADATA[activeProf.subjectIntegration.primarySubject]
    : null;

  return (
    <section className="w-full max-w-5xl my-8 flex flex-col items-center">
      {/* Section Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/90 text-white font-black text-xs uppercase tracking-wider rounded-full shadow-md mb-2">
          <Sparkles className="w-4 h-4 text-amber-200" />
          <span>Eksplorasi Pembahasan 8 Pekerjaan</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black font-display text-white drop-shadow-[0_3px_0_rgba(180,83,9,1)]">
          Kenali Tugas, Alat Khas & Manfaat Setiap Profesi
        </h2>
        <p className="text-xs sm:text-sm font-semibold text-amber-950 max-w-xl mx-auto mt-1">
          Pilih profesi di bawah untuk melihat pembahasan mendalam dengan latar suasana tempat kerjanya:
        </p>
      </div>

      {/* 8 Profession Selector Pills */}
      <div className="w-full overflow-x-auto pb-2 scrollbar-none">
        <div className="flex items-center justify-start sm:justify-center gap-2 min-w-max px-2">
          {PROFESSIONS_DATA.map((p) => {
            const isSelected = p.id === activeProf.id;
            return (
              <button
                key={p.id}
                onClick={() => handleSelectProf(p.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer ${
                  isSelected
                    ? 'bg-amber-400 text-amber-950 scale-105 ring-4 ring-white shadow-xl'
                    : 'bg-white/90 hover:bg-white text-slate-800 hover:scale-102 opacity-90'
                }`}
              >
                <span className="text-lg">
                  {p.id === 'guru' && '👨‍🏫'}
                  {p.id === 'dokter' && '🩺'}
                  {p.id === 'polisi' && '👮'}
                  {p.id === 'petani' && '🌾'}
                  {p.id === 'pilot' && '✈️'}
                  {p.id === 'nelayan' && '🎣'}
                  {p.id === 'koki' && '👨‍🍳'}
                  {p.id === 'pemadam' && '🚒'}
                </span>
                <span>{p.name}</span>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-amber-950 animate-ping" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Themed Discussion Stage with Profession Matching Background */}
      <div className="relative w-full mt-4 rounded-3xl overflow-hidden border-4 border-amber-300 shadow-2xl transition-all duration-500 min-h-[560px] flex flex-col justify-between">
        {/* Dynamic Thematic Background */}
        <ProfessionThemedBackdrop professionId={activeProf.id} opacity={1} />

        {/* Semi-transparent protective content layer for high contrast and readability */}
        <div className="relative z-10 p-5 sm:p-8 flex flex-col gap-6 text-white bg-slate-950/40 backdrop-blur-xs">
          {/* Header of Active Profession */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/20">
            <div className="flex items-center gap-3.5">
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg border-2 border-white/40"
                style={{ backgroundColor: activeProf.colorTheme.primary }}
              >
                {activeProf.id === 'guru' && '👨‍🏫'}
                {activeProf.id === 'dokter' && '🩺'}
                {activeProf.id === 'polisi' && '👮'}
                {activeProf.id === 'petani' && '🌾'}
                {activeProf.id === 'pilot' && '✈️'}
                {activeProf.id === 'nelayan' && '🎣'}
                {activeProf.id === 'koki' && '👨‍🍳'}
                {activeProf.id === 'pemadam' && '🚒'}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white drop-shadow">
                    {activeProf.name}
                  </h3>
                  {primarySubjMeta && (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/20 backdrop-blur-md border border-white/30 text-amber-200">
                      Mapel: {primarySubjMeta.name}
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-amber-200 font-semibold drop-shadow-xs">
                  {activeProf.title}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-slate-200 mt-1">
                  <MapPin size={13} className="text-rose-400 shrink-0" />
                  <span className="font-medium">{activeProf.workplace}</span>
                </div>
              </div>
            </div>

            {/* Audio Narration Button */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleSpeakDiscussion}
                className="px-3.5 py-2 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold text-xs flex items-center gap-2 border border-white/30 transition-all active:scale-95 cursor-pointer shadow-md"
                title="Dengarkan narasi suara"
              >
                <Volume2 size={16} className="text-amber-300" />
                <span>Dengarkan Narasi</span>
              </button>
            </div>
          </div>

          {/* Sapaan Naratif & Deskripsi Suasana Tempat Kerja */}
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/25 flex items-start gap-3 shadow-inner">
            <span className="text-2xl">💬</span>
            <div className="text-left">
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-300 block mb-0.5">
                Sapaan Hangat {activeProf.name}:
              </span>
              <p className="text-xs sm:text-sm text-white italic leading-relaxed">
                "{activeProf.narrativeText}"
              </p>
              <p className="text-[11px] text-slate-300 mt-1.5 font-medium">
                📍 <strong className="text-white">Lingkungan Kerja:</strong> {activeProf.workplaceDescription}
              </p>
            </div>
          </div>

          {/* Two-Column Grid: Tugas & Tanggung Jawab vs Alat Kerja Khas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Responsibilities Column */}
            <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-left flex flex-col justify-between shadow-lg">
              <div>
                <div className="flex items-center gap-2 mb-2.5">
                  <CheckCircle2 size={18} className="text-emerald-400" />
                  <h4 className="font-display font-black text-sm sm:text-base text-amber-300">
                    Tugas & Tanggung Jawab Utama
                  </h4>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-100">
                  {activeProf.responsibilities.map((r, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/30 text-emerald-300 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-snug">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Kurikulum KD Mapel */}
              {activeProf.subjectIntegration && (
                <div className="mt-3 pt-3 border-t border-white/15 text-xs text-slate-200">
                  <span className="font-bold text-amber-300">Integrasi Pembelajaran:</span>{' '}
                  {activeProf.subjectIntegration.applicationExample}
                </div>
              )}
            </div>

            {/* Tools Column */}
            <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-left shadow-lg">
              <div className="flex items-center gap-2 mb-2.5">
                <Wrench size={18} className="text-amber-400" />
                <h4 className="font-display font-black text-sm sm:text-base text-amber-300">
                  Alat-Alat Kerja Khas
                </h4>
              </div>
              <div className="grid grid-cols-1 gap-2.5">
                {activeProf.tools.map((t) => (
                  <div
                    key={t.id}
                    className="p-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 flex items-center gap-3 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0 font-bold">
                      ⭐
                    </div>
                    <div>
                      <p className="font-bold text-xs sm:text-sm text-white">{t.name}</p>
                      <p className="text-[11px] text-slate-300 leading-snug">{t.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Manfaat Mulia bagi Masyarakat & Fakta Unik */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 text-left">
            <div className="md:col-span-8 p-3.5 rounded-2xl bg-amber-500/20 border border-amber-300/40 backdrop-blur-md flex items-start gap-3">
              <HeartHandshake className="w-6 h-6 text-amber-300 shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs font-black uppercase tracking-wider text-amber-200">
                  Manfaat bagi Kehidupan Masyarakat:
                </h5>
                <p className="text-xs sm:text-sm text-white font-medium mt-0.5 leading-relaxed">
                  {activeProf.benefits}
                </p>
              </div>
            </div>

            <div className="md:col-span-4 p-3.5 rounded-2xl bg-indigo-900/50 border border-indigo-400/30 backdrop-blur-md">
              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-200 block mb-0.5">
                💡 Tahukah Kamu?
              </span>
              <p className="text-xs text-slate-200 leading-snug">
                {activeProf.funFact}
              </p>
            </div>
          </div>

          {/* Call-to-Action to Start Mission */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/20">
            <span className="text-xs text-amber-200 font-medium text-center sm:text-left">
              Ingin membuktikan keahlianmu pada profesi ini? Mainkan kuis dan mini game-nya!
            </span>
            <button
              onClick={handleStartMission}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 hover:from-amber-500 hover:to-orange-500 text-amber-950 font-black text-sm flex items-center justify-center gap-2 shadow-xl hover:scale-102 active:scale-95 transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-amber-950" />
              <span>Mulai Misi {activeProf.name} Sekarang</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
