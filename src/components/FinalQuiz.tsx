import React, { useState, useEffect } from 'react';
import {
  Trophy,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  RefreshCw,
  HelpCircle,
  Pause,
  Play
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { FINAL_QUIZ_POOL } from '../data/questions';
import { QuizQuestion, AnswerLog } from '../types/game';
import { soundManager } from '../utils/audio';
import { fireChampionshipConfetti, fireCorrectAnswerConfetti } from '../utils/confetti';
import { shuffleArray, getRandomSlice } from '../game/rules';

interface FinalQuizProps {
  onAddScore: (points: number) => void;
  onFinishQuiz: (finalScore: number) => void;
  onBackToMap: () => void;
  onRecordAnswerLog?: (log: AnswerLog) => void;
}

export const FinalQuiz: React.FC<FinalQuizProps> = ({
  onAddScore,
  onFinishQuiz,
  onBackToMap,
  onRecordAnswerLog
}) => {
  // Randomly select 10 non-identical questions from the 20-question pool and shuffle answer choices
  const [activeQuestions] = useState<QuizQuestion[]>(() => {
    const chosen = getRandomSlice(FINAL_QUIZ_POOL, 10);
    return chosen.map(q => {
      const optsWithCorrect = q.options.map((opt, i) => ({
        text: opt,
        isCorrect: i === q.correctAnswerIndex
      }));
      const shuffledOpts = shuffleArray(optsWithCorrect);
      return {
        ...q,
        options: shuffledOpts.map(o => o.text),
        correctAnswerIndex: shuffledOpts.findIndex(o => o.isCorrect)
      };
    });
  });

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  // Optional Timer: 25 seconds per question
  const [timerEnabled, setTimerEnabled] = useState(true);
  const [timeLeft, setTimeLeft] = useState(25);
  const [isPaused, setIsPaused] = useState(false);

  const question = activeQuestions[currentIdx] || activeQuestions[0];

  // Timer loop
  useEffect(() => {
    if (!timerEnabled || isAnswered || isPaused) return;

    if (timeLeft <= 0) {
      // Auto-submit time out
      handleTimeOut();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, isAnswered, timerEnabled, isPaused]);

  const handleTimeOut = () => {
    setIsAnswered(true);
    setSelectedOption(-1); // No option chosen
    soundManager.playIncorrect();

    if (onRecordAnswerLog) {
      onRecordAnswerLog({
        id: 'ans_fq_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
        questionId: question.id,
        questionText: question.question,
        subject: question.subject || 'Matematika',
        professionOrigin: question.professionOrigin || 'Kuis Akhir',
        studentAnswer: 'Tidak Menjawab (Waktu Habis)',
        correctAnswer: question.options[question.correctAnswerIndex],
        isCorrect: false,
        pointsEarned: 0,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        explanation: question.explanation
      });
    }
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    soundManager.playClick();
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === question.correctAnswerIndex;
    if (isCorrect) {
      setQuizScore(prev => prev + 10);
      setCorrectCount(prev => prev + 1);
      onAddScore(10);
      soundManager.playCorrect();
      soundManager.playStar();
      fireCorrectAnswerConfetti();
    } else {
      soundManager.playIncorrect();
    }

    if (onRecordAnswerLog) {
      onRecordAnswerLog({
        id: 'ans_fq_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
        questionId: question.id,
        questionText: question.question,
        subject: question.subject || 'Matematika',
        professionOrigin: question.professionOrigin || 'Kuis Akhir',
        studentAnswer: question.options[idx] || '',
        correctAnswer: question.options[question.correctAnswerIndex],
        isCorrect: isCorrect,
        pointsEarned: isCorrect ? 10 : 0,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        explanation: question.explanation
      });
    }
  };

  const handleNextQuestion = () => {
    soundManager.playClick();
    setSelectedOption(null);
    setIsAnswered(false);
    setTimeLeft(25);

    if (currentIdx + 1 < activeQuestions.length) {
      setCurrentIdx(currentIdx + 1);
    } else {
      soundManager.playFanfare();
      fireChampionshipConfetti();
      onFinishQuiz(quizScore + (selectedOption === question.correctAnswerIndex ? 0 : 0));
    }
  };

  const isCurrentCorrect = selectedOption === question.correctAnswerIndex;

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-7 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border-4 border-amber-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-amber-200 gap-3">
        <div>
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">
            Ujian Akhir Ekspedisi
          </span>
          <h2 className="text-xl sm:text-2xl font-black font-display text-slate-900">
            Tantangan Akhir: Uji Ahli Profesi
          </h2>
        </div>

        <div className="flex items-center gap-3">
          {/* Optional Timer */}
          <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-300 text-xs font-bold text-slate-700">
            <button
              onClick={() => setTimerEnabled(!timerEnabled)}
              title="Aktifkan / Matikan Timer"
              className="text-slate-500 hover:text-slate-800"
            >
              <Clock size={15} />
            </button>
            {timerEnabled ? (
              <>
                <span className={`tabular-nums font-mono ${timeLeft <= 5 ? 'text-rose-600 font-extrabold animate-pulse' : ''}`}>
                  {timeLeft}s
                </span>
                <button
                  onClick={() => setIsPaused(!isPaused)}
                  className="ml-1 text-slate-500 hover:text-slate-900"
                  title={isPaused ? 'Lanjut Timer' : 'Jeda Timer'}
                >
                  {isPaused ? <Play size={12} /> : <Pause size={12} />}
                </button>
              </>
            ) : (
              <span className="text-[11px] text-slate-400">Timer Nonaktif</span>
            )}
          </div>

          <div className="px-3 py-1.5 bg-amber-100 border border-amber-300 rounded-full text-xs font-extrabold text-amber-900 flex items-center gap-1">
            <Trophy size={14} className="text-amber-600" />
            <span>Skor: {quizScore} / 100</span>
          </div>

          <button
            onClick={onBackToMap}
            className="text-xs font-bold text-slate-600 hover:text-slate-900 px-2.5 py-1.5 rounded-xl hover:bg-slate-100 transition-colors"
          >
            Peta
          </button>
        </div>
      </div>

      {/* Progress Line */}
      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden my-4">
        <div
          className="bg-gradient-to-r from-amber-500 to-orange-500 h-full transition-all duration-300"
          style={{ width: `${((currentIdx + 1) / activeQuestions.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-amber-50/80 via-orange-50/60 to-amber-100/40 border-2 border-amber-200 my-3">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Soal {currentIdx + 1} dari {activeQuestions.length}
            </span>
            {question.subject && (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wide bg-indigo-100 text-indigo-900 border border-indigo-200">
                Mapel: {question.subject}
              </span>
            )}
          </div>
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900">
            Kategori: {question.category} · {question.difficulty}
          </span>
        </div>

        <h3 className="text-base sm:text-xl font-bold font-display text-slate-900 leading-snug">
          {question.question}
        </h3>
      </div>

      {/* Options List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-4">
        {question.options.map((opt, idx) => {
          let style = 'bg-slate-50 border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 text-slate-800';

          if (isAnswered) {
            if (idx === question.correctAnswerIndex) {
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
              className={`p-4 rounded-2xl border-2 text-left font-display text-sm sm:text-base flex items-center justify-between transition-all active:scale-98 shadow-sm ${style}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-white border border-current flex items-center justify-center font-bold text-xs shrink-0">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="leading-snug">{opt}</span>
              </div>

              {isAnswered && idx === question.correctAnswerIndex && (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 ml-2" />
              )}
              {isAnswered && selectedOption === idx && idx !== question.correctAnswerIndex && (
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 ml-2" />
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation Banner (Pembahasan Jawaban) */}
      {isAnswered && (
        <div
          className={`p-4 rounded-2xl border-2 mb-4 animate-fadeIn ${
            isCurrentCorrect
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
              : 'bg-rose-50 border-rose-300 text-rose-950'
          }`}
        >
          <div className="flex items-start gap-3">
            {isCurrentCorrect ? (
              <div className="p-2 bg-emerald-500 text-white rounded-xl shadow shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
            ) : (
              <div className="p-2 bg-rose-500 text-white rounded-xl shadow shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
            )}
            <div>
              <h4 className="font-display font-bold text-sm sm:text-base mb-1">
                {isCurrentCorrect
                  ? '🌟 Jawaban Tepat! (+10 Poin)'
                  : selectedOption === -1
                  ? '⏰ Waktu Habis!'
                  : 'Kurang Tepat, ini pembahasannya:'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                <span className="font-bold">Pembahasan: </span>
                {question.explanation}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer Controls */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-200">
        <button
          onClick={onBackToMap}
          className="px-4 py-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
        >
          Kembali ke Peta
        </button>

        {isAnswered && (
          <button
            onClick={handleNextQuestion}
            className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md flex items-center gap-1.5 transition-all active:scale-95"
          >
            <span>{currentIdx + 1 < activeQuestions.length ? 'Soal Berikutnya' : 'Lihat Hasil Kuis'}</span>
            <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
};
