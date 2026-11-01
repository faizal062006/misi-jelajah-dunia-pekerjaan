import React, { useState } from 'react';
import { HelpCircle, Star, Sparkles, RefreshCw, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GUESS_PROFESSION_QUESTIONS } from '../data/questions';
import { soundManager } from '../utils/audio';
import { shuffleArray, getRandomSlice } from '../game/rules';

interface MinigameGuessProfessionProps {
  onAddScore: (points: number) => void;
  onComplete: (score: number) => void;
  onBackToMap: () => void;
}

interface ShuffledGuessQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  hint: string;
  explanation: string;
}

export const MinigameGuessProfession: React.FC<MinigameGuessProfessionProps> = ({
  onAddScore,
  onComplete,
  onBackToMap
}) => {
  // Select 5 non-identical questions randomly from the 12-question pool and shuffle answer choices
  const [questions] = useState<ShuffledGuessQuestion[]>(() => {
    const selected = getRandomSlice(GUESS_PROFESSION_QUESTIONS, 5);
    return selected.map(q => {
      const opts = q.options.map((opt, i) => ({ text: opt, isCorrect: i === q.correctIndex }));
      const shuffled = shuffleArray(opts);
      return {
        ...q,
        options: shuffled.map(s => s.text),
        correctIndex: shuffled.findIndex(s => s.isCorrect)
      };
    });
  });

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [earnedScore, setEarnedScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const question = questions[currentIdx] || questions[0];

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    soundManager.playClick();
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === question.correctIndex) {
      setIsCorrect(true);
      setEarnedScore(prev => prev + 10);
      onAddScore(10);
      soundManager.playCorrect();
      soundManager.playStar();
      setShowCelebration(true);

      // Trigger confetti
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
    setShowCelebration(false);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);

    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(currentIdx + 1);
    } else {
      soundManager.playFanfare();
      onComplete(earnedScore);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 bg-white/95 backdrop-blur-md rounded-3xl shadow-xl border-4 border-amber-300">
      {/* Game Header */}
      <div className="flex items-center justify-between pb-4 border-b border-amber-200">
        <div>
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">
            Mini Game 1
          </span>
          <h2 className="text-xl sm:text-2xl font-black font-display text-slate-900">
            Tebak Profesi Misterius
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3.5 py-1.5 bg-amber-100 border border-amber-300 rounded-full text-xs font-extrabold text-amber-900 flex items-center gap-1.5">
            <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
            <span>Soal {currentIdx + 1} dari {questions.length}</span>
          </div>

          <button
            onClick={onBackToMap}
            className="text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-xl hover:bg-slate-100 transition-colors"
          >
            Peta Pulau
          </button>
        </div>
      </div>

      {/* Question Card */}
      <div className="my-6 p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200">
        <div className="flex items-start gap-3">
          <div className="p-3 bg-amber-500 text-white rounded-2xl shadow-md shrink-0">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-amber-800 uppercase tracking-wide mb-1">
              Petunjuk Kasus:
            </p>
            <p className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {question.question}
            </p>
            <div className="mt-2 text-xs text-amber-900/80 bg-white/70 px-3 py-1.5 rounded-xl border border-amber-200 inline-block font-medium">
              💡 <span className="font-bold">Kiat:</span> {question.hint}
            </div>
          </div>
        </div>
      </div>

      {/* 4 Answer Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
        {question.options.map((option, idx) => {
          let btnStyle = 'bg-slate-50 border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 text-slate-800';

          if (isAnswered) {
            if (idx === question.correctIndex) {
              btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-black shadow-md ring-2 ring-emerald-400';
            } else if (selectedOption === idx) {
              btnStyle = 'bg-rose-100 border-rose-400 text-rose-950 font-bold';
            } else {
              btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelectOption(idx)}
              disabled={isAnswered}
              className={`p-4 rounded-2xl border-2 text-left font-display font-bold text-sm sm:text-base flex items-center justify-between transition-all active:scale-98 shadow-sm ${btnStyle}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-white border border-current flex items-center justify-center font-bold text-xs shrink-0">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{option}</span>
              </div>

              {isAnswered && idx === question.correctIndex && (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              )}
              {isAnswered && selectedOption === idx && idx !== question.correctIndex && (
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Answer Feedback Banner */}
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
            <div className="flex-1">
              <h4 className="font-display font-bold text-base mb-1">
                {isCorrect ? '🌟 Hebat! Jawaban kamu benar!' : 'Ayo coba lagi, jangan berkecil hati!'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {question.explanation}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Action Footer */}
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
              <span>{currentIdx + 1 < GUESS_PROFESSION_QUESTIONS.length ? 'Soal Berikutnya' : 'Selesai'}</span>
              <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
