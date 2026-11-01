import React, { useEffect } from 'react';
import {
  Trophy,
  Award,
  Star,
  RefreshCw,
  MapPin,
  Sparkles,
  HeartHandshake,
  CheckCircle2
} from 'lucide-react';
import { PlayerProgress } from '../types/game';
import { getMedalTier } from '../game/rules';
import { soundManager } from '../utils/audio';
import { fireGrandCelebrationConfetti } from '../utils/confetti';
import { adventurerMascot, professionsMontage } from '../assets/images';

interface EndingScreenProps {
  progress: PlayerProgress;
  onPlayAgain: () => void;
  onOpenCertificate: () => void;
  onBackToMap: () => void;
}

export const EndingScreen: React.FC<EndingScreenProps> = ({
  progress,
  onPlayAgain,
  onOpenCertificate,
  onBackToMap
}) => {
  const medal = getMedalTier(progress.score);

  useEffect(() => {
    soundManager.playFanfare();
    fireGrandCelebrationConfetti();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-8 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border-4 border-amber-300">
      {/* Top Banner */}
      <div className="text-center pb-4 border-b border-amber-200">
        <span className="px-3.5 py-1 bg-amber-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-full shadow-sm">
          Misi Penjelajahan Berhasil!
        </span>
        <h1 className="text-2xl sm:text-4xl font-black font-display text-slate-900 mt-2">
          PENGHARGAAN MASTER PENJELAJAH
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Petualangan Mengenal Jenis-Jenis Pekerjaan Selesai
        </p>
      </div>

      {/* Main Mascot Greeting Bubble */}
      <div className="my-6 p-6 rounded-3xl bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 border-2 border-amber-300 shadow-sm flex flex-col md:flex-row items-center gap-6">
        {/* Mascot Avatar */}
        <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-3xl overflow-hidden border-4 border-amber-400 shadow-xl bg-white shrink-0 animate-float-soft">
          <img
            src={adventurerMascot}
            alt="Boni Penjelajah Cilik"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Mascot Speech */}
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500 text-white rounded-full text-xs font-bold mb-2">
            <Sparkles size={13} />
            <span>Pesan dari Boni si Penjelajah:</span>
          </div>

          <p className="text-base sm:text-lg font-bold text-amber-950 font-display leading-snug">
            "Selamat, {progress.playerName}! Kamu telah berhasil menjelajahi dunia pekerjaan. Sekarang kamu tahu bahwa setiap pekerjaan memiliki tugas dan manfaat bagi kehidupan kita!"
          </p>

          <p className="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed">
            Tidak ada pekerjaan yang lebih rendah atau lebih tinggi. Guru, dokter, polisi, petani, pilot, nelayan, koki, maupun pemadam kebakaran—semuanya adalah pahlawan yang saling membutuhkan demi kebaikan bersama!
          </p>
        </div>
      </div>

      {/* Montage of Professions */}
      <div className="rounded-3xl overflow-hidden border-3 border-amber-200 shadow-md aspect-[16/8] sm:aspect-[16/7] relative my-4">
        <img
          src={professionsMontage}
          alt="Sahabat Seluruh Profesi Masyarakat"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-4">
          <p className="text-white text-xs sm:text-sm font-bold drop-shadow">
            🤝 Semua profesi mulia, mari kita saling menghargai dan berterima kasih!
          </p>
        </div>
      </div>

      {/* Summary of Learning Outcomes (Ringkasan Pembelajaran SD Kelas 4) */}
      <div className="my-6 p-5 rounded-3xl bg-slate-50 border-2 border-slate-200">
        <h3 className="font-display font-black text-base sm:text-lg text-slate-900 mb-3 flex items-center gap-2">
          <HeartHandshake className="w-5 h-5 text-emerald-600" />
          <span>Poin Intisari Pembelajaran Kita:</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
          <div className="p-3 bg-white rounded-2xl border border-slate-200 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900">Mengenali Profesi:</span>
              <p className="text-slate-600 text-xs mt-0.5">Memahami keberagaman pekerjaan yang ada di lingkungan sekitar kita.</p>
            </div>
          </div>

          <div className="p-3 bg-white rounded-2xl border border-slate-200 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900">Tugas & Tanggung Jawab:</span>
              <p className="text-slate-600 text-xs mt-0.5">Mengetahui kontribusi nyata yang dilakukan setiap pekerja setiap hari.</p>
            </div>
          </div>

          <div className="p-3 bg-white rounded-2xl border border-slate-200 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900">Alat Kerja Khas:</span>
              <p className="text-slate-600 text-xs mt-0.5">Memahami kegunaan stetoskop, cangkul, jaring, radar, dan alat lainnya.</p>
            </div>
          </div>

          <div className="p-3 bg-white rounded-2xl border border-slate-200 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900">Manfaat bagi Masyarakat:</span>
              <p className="text-slate-600 text-xs mt-0.5">Menghargai bahwa kehidupan kita berjalan baik berkat kerja sama semua profesi.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Score & Medal Stat Strip */}
      <div className="grid grid-cols-3 gap-3 my-6 text-center">
        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200">
          <Trophy className="w-6 h-6 text-amber-500 mx-auto mb-1" />
          <span className="text-[10px] font-bold text-slate-500 uppercase block">Total Skor</span>
          <span className="text-xl sm:text-2xl font-black font-display text-amber-950 tabular-nums">
            {progress.score} Pts
          </span>
        </div>

        <div className="p-4 bg-yellow-50 rounded-2xl border border-yellow-200">
          <Star className="w-6 h-6 text-yellow-500 fill-yellow-400 mx-auto mb-1" />
          <span className="text-[10px] font-bold text-slate-500 uppercase block">Total Bintang</span>
          <span className="text-xl sm:text-2xl font-black font-display text-yellow-900 tabular-nums">
            {progress.earnedStars} ★
          </span>
        </div>

        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
          <Award className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
          <span className="text-[10px] font-bold text-slate-500 uppercase block">Medali Juara</span>
          <span className="text-base sm:text-lg font-black font-display text-emerald-900">
            {medal.tier}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-slate-200">
        <button
          onClick={onOpenCertificate}
          className="w-full sm:w-auto px-7 py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          <Award size={18} />
          <span>Lihat & Cetak Sertifikat Digital</span>
        </button>

        <button
          onClick={onBackToMap}
          className="w-full sm:w-auto px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm rounded-2xl border border-slate-300 flex items-center justify-center gap-1.5 transition-all"
        >
          <MapPin size={16} />
          <span>Kembali ke Peta Pulau</span>
        </button>

        <button
          onClick={onPlayAgain}
          className="w-full sm:w-auto px-5 py-3 bg-white hover:bg-rose-50 text-rose-700 font-bold text-sm rounded-2xl border border-rose-300 flex items-center justify-center gap-1.5 transition-all"
        >
          <RefreshCw size={16} />
          <span>Main Lagi (Reset)</span>
        </button>
      </div>
    </div>
  );
};
