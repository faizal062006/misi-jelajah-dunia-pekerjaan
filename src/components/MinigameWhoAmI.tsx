import React, { useState } from 'react';
import { HelpCircle, Star, Sparkles, CheckCircle2, AlertCircle, ArrowRight, RefreshCw, Eye } from 'lucide-react';
import confetti from 'canvas-confetti';
import { WHO_AM_I_RIDDLES } from '../data/questions';
import { soundManager } from '../utils/audio';
import { shuffleArray } from '../game/rules';

interface MinigameWhoAmIProps {
  onAddScore: (points: number) => void;
  onComplete: (score: number) => void;
  onBackToMap: () => void;
}

interface ShuffledRiddle {
  id: number;
  hints: string[];
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const MinigameWhoAmI: React.FC<MinigameWhoAmIProps> = ({
  onAddScore,
  onComplete,
  onBackToMap
}) => {
  // Randomize riddle sequence and shuffle options for non-identical game rounds
  const [riddles] = useState<ShuffledRiddle[]>(() => {
    const shuffledRiddles = shuffleArray(WHO_AM_I_RIDDLES);
    return shuffledRiddles.map(r => {
      const opts = r.options.map((opt, i) => ({ text: opt, isCorrect: i === r.correctIndex }));
      const shuffledOpts = shuffleArray(opts);
      return {
        ...r,
        options: shuffledOpts.map(s => s.text),
        correctIndex: shuffledOpts.findIndex(s => s.isCorrect)
      };
    });
  });

  const [currentIdx, setCurrentIdx] = useState(0);
  const [revealedHints, setRevealedHints] = useState<number>(2); // Start with 2 hints visible
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [totalScore, setTotalScore] = useState(0);

  const riddle = riddles[currentIdx] || riddles[0];

  const handleRevealMoreHint = () => {
    soundManager.playClick();
    if (revealedHints < riddle.hints.length) {
      setRevealedHints(prev => prev + 1);
    }
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    soundManager.playClick();
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === riddle.correctIndex) {
      setIsCorrect(true);
      setTotalScore(prev => prev + 10);
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
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
  };

  const handleNext = () => {
    soundManager.playClick();
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setRevealedHints(2);

    if (currentIdx + 1 < riddles.length) {
      setCurrentIdx(currentIdx + 1);
    } else {
      onComplete(totalScore);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 bg-white/95 backdrop-blur-md rounded-3xl shadow-xl border-4 border-amber-300">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-amber-200">
        <div>
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">
            Mini Game 3
          </span>
          <h2 className="text-xl sm:text-2xl font-black font-display text-slate-900">
            Teka-Teki: Siapa Aku?
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3.5 py-1.5 bg-amber-100 border border-amber-300 rounded-full text-xs font-extrabold text-amber-900 flex items-center gap-1.5">
            <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
            <span>Teka-Teki {currentIdx + 1} dari {riddles.length}</span>
          </div>

          <button
            onClick={onBackToMap}
            className="text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-xl hover:bg-slate-100 transition-colors"
          >
            Peta Pulau
          </button>
        </div>
      </div>

      {/* Riddle Clue Board */}
      <div className="my-6 p-6 rounded-3xl bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border-2 border-indigo-200 shadow-inner">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-indigo-600" />
            <span>Petunjuk Rahasia Profesi:</span>
          </span>

          {revealedHints < riddle.hints.length && !isAnswered && (
            <button
              onClick={handleRevealMoreHint}
              className="px-3 py-1 bg-white text-indigo-700 text-xs font-bold rounded-xl border border-indigo-200 shadow-sm hover:bg-indigo-50 flex items-center gap-1 transition-all"
            >
              <Eye size={13} />
              <span>Buka Petunjuk Tambahan</span>
            </button>
          )}
        </div>

        <div className="space-y-2.5">
          {riddle.hints.slice(0, revealedHints).map((hint, idx) => (
            <div
              key={idx}
              className="p-3 bg-white/90 backdrop-blur-sm rounded-2xl border border-indigo-100 flex items-start gap-3 shadow-xs animate-fadeIn"
            >
              <div className="w-6 h-6 rounded-full bg-indigo-500 text-white font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">
                {idx + 1}
              </div>
              <p className="text-sm font-semibold text-slate-800 leading-snug">
                "{hint}"
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Answer Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
        {riddle.options.map((opt, idx) => {
          let style = 'bg-slate-50 border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 text-slate-800';

          if (isAnswered) {
            if (idx === riddle.correctIndex) {
              style = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-black shadow-md ring-2 ring-emerald-400';
            } else if (selectedOption === idx) {
              style = 'bg-rose-100 border-rose-400 text-rose-950 font-bold';
            } else {
              style = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelectOption(idx)}
              disabled={isAnswered}
              className={`p-4 rounded-2xl border-2 text-left font-display font-bold text-sm sm:text-base flex items-center justify-between transition-all active:scale-98 shadow-sm ${style}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-white border border-current flex items-center justify-center font-bold text-xs shrink-0">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{opt}</span>
              </div>

              {isAnswered && idx === riddle.correctIndex && (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              )}
              {isAnswered && selectedOption === idx && idx !== riddle.correctIndex && (
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback Banner */}
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
                {isCorrect ? '🎉 Tebakanmu Tepat Sekali!' : 'Hampir benar, coba perhatikan petunjuknya lagi!'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {riddle.explanation}
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
              <span>{currentIdx + 1 < WHO_AM_I_RIDDLES.length ? 'Teka-Teki Berikutnya' : 'Selesai'}</span>
              <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
