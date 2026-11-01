import React, { useState } from 'react';
import { MapPin, Star, Sparkles, CheckCircle2, AlertCircle, ArrowRight, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { WORKPLACE_MATCH_ITEMS } from '../data/questions';
import { soundManager } from '../utils/audio';
import { shuffleArray } from '../game/rules';

interface MinigameWorkplaceMatchProps {
  onAddScore: (points: number) => void;
  onComplete: (score: number) => void;
  onBackToMap: () => void;
}

export const MinigameWorkplaceMatch: React.FC<MinigameWorkplaceMatchProps> = ({
  onAddScore,
  onComplete,
  onBackToMap
}) => {
  // Randomize question sequence and shuffle choices for each workplace challenge
  const [items] = useState(() => {
    const shuffledItems = shuffleArray(WORKPLACE_MATCH_ITEMS);
    return shuffledItems.map(it => ({
      ...it,
      options: shuffleArray(it.options)
    }));
  });

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);

  const item = items[currentIdx] || items[0];

  const handleSelectOption = (optId: string, isOptCorrect: boolean) => {
    if (isAnswered) return;
    soundManager.playClick();
    setSelectedOptionId(optId);
    setIsAnswered(true);

    if (isOptCorrect) {
      setIsCorrect(true);
      setScore(prev => prev + 10);
      onAddScore(10);
      soundManager.playCorrect();
      soundManager.playStar();

      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
    } else {
      setIsCorrect(false);
      soundManager.playIncorrect();
    }
  };

  const handleRetry = () => {
    soundManager.playClick();
    setSelectedOptionId(null);
    setIsAnswered(false);
    setIsCorrect(false);
  };

  const handleNext = () => {
    soundManager.playClick();
    setSelectedOptionId(null);
    setIsAnswered(false);
    setIsCorrect(false);

    if (currentIdx + 1 < items.length) {
      setCurrentIdx(currentIdx + 1);
    } else {
      onComplete(score);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 bg-white/95 backdrop-blur-md rounded-3xl shadow-xl border-4 border-amber-300">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-amber-200">
        <div>
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">
            Mini Game 4
          </span>
          <h2 className="text-xl sm:text-2xl font-black font-display text-slate-900">
            Pilih Tempat Kerja yang Tepat
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3.5 py-1.5 bg-amber-100 border border-amber-300 rounded-full text-xs font-extrabold text-amber-900 flex items-center gap-1.5">
            <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
            <span>Misi {currentIdx + 1} dari {items.length}</span>
          </div>

          <button
            onClick={onBackToMap}
            className="text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-xl hover:bg-slate-100 transition-colors"
          >
            Peta Pulau
          </button>
        </div>
      </div>

      {/* Target Question */}
      <div className="my-6 p-6 rounded-3xl bg-gradient-to-br from-emerald-50 via-teal-50 to-sky-50 border-2 border-emerald-200">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-emerald-600 text-white rounded-2xl shadow">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase text-emerald-800 tracking-wider">
              Profesi Sasaran: {item.professionName}
            </span>
            <h3 className="font-display font-black text-lg sm:text-xl text-slate-900">
              {item.question}
            </h3>
          </div>
        </div>
      </div>

      {/* Options: Workplace Building Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {item.options.map(opt => {
          let cardStyle = 'bg-slate-50 border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 text-slate-800';

          if (isAnswered) {
            if (opt.correct) {
              cardStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-black shadow-md ring-2 ring-emerald-400 scale-102';
            } else if (selectedOptionId === opt.id) {
              cardStyle = 'bg-rose-100 border-rose-400 text-rose-950 font-bold';
            } else {
              cardStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-50';
            }
          }

          return (
            <button
              key={opt.id}
              onClick={() => handleSelectOption(opt.id, opt.correct)}
              disabled={isAnswered}
              className={`p-5 rounded-3xl border-2 flex flex-col items-center text-center justify-between transition-all active:scale-95 shadow-sm min-h-[140px] ${cardStyle}`}
            >
              <div className="w-14 h-14 rounded-2xl bg-white border border-current shadow-xs flex items-center justify-center text-2xl mb-3 shrink-0">
                🏢
              </div>

              <span className="font-display font-bold text-sm leading-snug">
                {opt.name}
              </span>

              {isAnswered && opt.correct && (
                <div className="mt-2 flex items-center gap-1 text-xs font-bold text-emerald-700 bg-white/90 px-2 py-0.5 rounded-full">
                  <CheckCircle2 size={13} />
                  <span>Tempat Tepat!</span>
                </div>
              )}
              {isAnswered && selectedOptionId === opt.id && !opt.correct && (
                <div className="mt-2 flex items-center gap-1 text-xs font-bold text-rose-700 bg-white/90 px-2 py-0.5 rounded-full">
                  <AlertCircle size={13} />
                  <span>Bukan di sini</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {isAnswered && (
        <div
          className={`p-4 rounded-2xl border-2 mb-6 animate-fadeIn ${
            isCorrect
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
              : 'bg-rose-50 border-rose-300 text-rose-950'
          }`}
        >
          <div className="flex items-start gap-3">
            {isCorrect ? (
              <div className="p-2 bg-emerald-500 text-white rounded-xl shadow shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
            ) : (
              <div className="p-2 bg-rose-500 text-white rounded-xl shadow shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
            )}
            <div>
              <h4 className="font-display font-bold text-base mb-1">
                {isCorrect ? '🌟 Tempat kerja terkonfirmasi!' : 'Perhatikan kembali ciri khas pekerjaannya!'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {item.explanation}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={onBackToMap}
          className="px-4 py-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
        >
          Kembali ke Peta
        </button>

        <div className="flex items-center gap-2">
          {isAnswered && !isCorrect && (
            <button
              onClick={handleRetry}
              className="px-4 py-2.5 bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs sm:text-sm rounded-2xl border border-amber-300 flex items-center gap-1.5 transition-all"
            >
              <RefreshCw size={15} />
              <span>Coba Lagi</span>
            </button>
          )}

          {isAnswered && (
            <button
              onClick={handleNext}
              className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md flex items-center gap-1.5 transition-all active:scale-95"
            >
              <span>{currentIdx + 1 < WORKPLACE_MATCH_ITEMS.length ? 'Misi Berikutnya' : 'Selesai'}</span>
              <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
