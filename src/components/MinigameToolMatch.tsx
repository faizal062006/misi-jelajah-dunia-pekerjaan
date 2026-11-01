import React, { useState } from 'react';
import {
  Wrench,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  RefreshCw,
  Trophy,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DRAG_TOOL_ITEMS } from '../data/questions';
import { PROFESSIONS_DATA } from '../data/professions';
import { checkToolMatch } from '../game/rules';
import { soundManager } from '../utils/audio';
import { fireMiniGameCompleteConfetti } from '../utils/confetti';

interface MinigameToolMatchProps {
  onAddScore: (points: number) => void;
  onComplete: (score: number) => void;
  onBackToMap: () => void;
}

export const MinigameToolMatch: React.FC<MinigameToolMatchProps> = ({
  onAddScore,
  onComplete,
  onBackToMap
}) => {
  // State: matched pairs: Record<professionId, toolId>
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({});
  const [draggingToolId, setDraggingToolId] = useState<string | null>(null);
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null); // For tap-to-match fallback
  const [feedback, setFeedback] = useState<{ text: string; isCorrect: boolean } | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  // Available tools not yet matched
  const availableTools = DRAG_TOOL_ITEMS.filter(
    t => !Object.values(matchedPairs).includes(t.id)
  );

  const handleDragStart = (e: React.DragEvent, toolId: string) => {
    soundManager.playClick();
    e.dataTransfer.setData('text/plain', toolId);
    setDraggingToolId(toolId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, professionId: string) => {
    e.preventDefault();
    const toolId = e.dataTransfer.getData('text/plain') || draggingToolId;
    setDraggingToolId(null);
    if (!toolId) return;

    verifyPairing(toolId, professionId);
  };

  // Tap-to-pair fallback (click tool then click profession)
  const handleToolClick = (toolId: string) => {
    soundManager.playClick();
    if (selectedToolId === toolId) {
      setSelectedToolId(null);
    } else {
      setSelectedToolId(toolId);
    }
  };

  const handleProfessionClick = (professionId: string) => {
    if (!selectedToolId) return;
    verifyPairing(selectedToolId, professionId);
  };

  const verifyPairing = (toolId: string, professionId: string) => {
    const isCorrect = checkToolMatch(toolId, professionId);
    const tool = DRAG_TOOL_ITEMS.find(t => t.id === toolId);
    const prof = PROFESSIONS_DATA.find(p => p.id === professionId);

    if (isCorrect && tool && prof) {
      soundManager.playCorrect();
      soundManager.playStar();
      onAddScore(10);

      const newPairs = { ...matchedPairs, [professionId]: toolId };
      setMatchedPairs(newPairs);
      setSelectedToolId(null);
      setFeedback({
        text: `Tepat sekali! ${tool.name} adalah alat penting yang digunakan oleh ${prof.name}!`,
        isCorrect: true
      });

      // Check if all 8 tools are matched
      if (Object.keys(newPairs).length === DRAG_TOOL_ITEMS.length) {
        setIsCompleted(true);
        soundManager.playFanfare();
        fireMiniGameCompleteConfetti();
      }
    } else {
      soundManager.playIncorrect();
      const profName = prof ? prof.name : 'profesi ini';
      setFeedback({
        text: `Kurang pas. Coba cari profesi lain yang lebih sesuai dengan alat tersebut!`,
        isCorrect: false
      });
    }
  };

  const handleReset = () => {
    soundManager.playClick();
    setMatchedPairs({});
    setSelectedToolId(null);
    setFeedback(null);
    setIsCompleted(false);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 bg-white/95 backdrop-blur-md rounded-3xl shadow-xl border-4 border-amber-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-amber-200 gap-3">
        <div>
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">
            Mini Game 2
          </span>
          <h2 className="text-xl sm:text-2xl font-black font-display text-slate-900">
            Pasangkan Alat dan Profesi
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Tarik (Drag) alat ke profesi yang sesuai, atau klik alat lalu klik profesinya!
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3.5 py-1.5 bg-amber-100 border border-amber-300 rounded-full text-xs font-extrabold text-amber-900 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Terpasang: {Object.keys(matchedPairs).length} / {DRAG_TOOL_ITEMS.length}</span>
          </div>

          <button
            onClick={handleReset}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
            title="Ulangi Pasangan"
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div
          className={`my-3 p-3 rounded-2xl border flex items-center gap-2.5 text-xs sm:text-sm font-bold ${
            feedback.isCorrect
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
              : 'bg-rose-50 border-rose-300 text-rose-950'
          }`}
        >
          {feedback.isCorrect ? (
            <Sparkles className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          )}
          <span>{feedback.text}</span>
        </div>
      )}

      {/* Main Play Area Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-4">
        {/* Left Side: Available Tools to Drag */}
        <div className="lg:col-span-5 bg-amber-50/70 p-4 rounded-3xl border-2 border-amber-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display font-bold text-sm sm:text-base text-amber-950 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-amber-600" />
              <span>Daftar Alat Kerja</span>
            </h3>
            <span className="text-[11px] font-bold text-amber-800 bg-amber-200/80 px-2.5 py-0.5 rounded-full">
              {availableTools.length} Tersisa
            </span>
          </div>

          {availableTools.length === 0 ? (
            <div className="py-8 text-center bg-white/80 rounded-2xl border border-dashed border-emerald-300 p-4">
              <Sparkles className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              <p className="font-bold text-emerald-900 text-sm">Semua alat telah berhasil dipasangkan!</p>
            </div>
          ) : (
            <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
              {availableTools.map(tool => {
                const isSelected = selectedToolId === tool.id;
                return (
                  <div
                    key={tool.id}
                    draggable
                    onDragStart={e => handleDragStart(e, tool.id)}
                    onClick={() => handleToolClick(tool.id)}
                    className={`p-3 rounded-2xl border-2 bg-white cursor-grab active:cursor-grabbing transition-all select-none shadow-sm hover:shadow-md flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'border-amber-500 ring-2 ring-amber-400 bg-amber-100/50 scale-102'
                        : 'border-slate-200 hover:border-amber-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center font-bold text-amber-800 shrink-0 text-xs">
                        🛠️
                      </div>
                      <div>
                        <p className="font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                          {tool.name}
                        </p>
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                          {tool.description}
                        </p>
                      </div>
                    </div>

                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-slate-100 rounded-lg text-slate-600 shrink-0">
                      Tarik / Klik
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Side: 8 Profession Drop Slots */}
        <div className="lg:col-span-7 space-y-2.5">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-display font-bold text-sm sm:text-base text-slate-900">
              Tempatkan Alat pada Profesi yang Tepat:
            </h3>
            {selectedToolId && (
              <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-lg animate-pulse">
                Klik salah satu profesi di bawah!
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[460px] overflow-y-auto pr-1">
            {PROFESSIONS_DATA.map(prof => {
              const matchedToolId = matchedPairs[prof.id];
              const matchedTool = matchedToolId
                ? DRAG_TOOL_ITEMS.find(t => t.id === matchedToolId)
                : null;

              return (
                <div
                  key={prof.id}
                  onDragOver={handleDragOver}
                  onDrop={e => handleDrop(e, prof.id)}
                  onClick={() => handleProfessionClick(prof.id)}
                  className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer ${
                    matchedTool
                      ? 'bg-emerald-50/80 border-emerald-400'
                      : selectedToolId
                      ? 'bg-white border-dashed border-amber-400 hover:border-amber-600 hover:bg-amber-50/40 shadow-sm'
                      : 'bg-white border-slate-200 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold font-display text-sm text-slate-900">
                      {prof.name}
                    </span>
                    <span className="text-[10px] text-slate-500">{prof.workplace}</span>
                  </div>

                  {matchedTool ? (
                    <div className="p-2 bg-emerald-100/90 rounded-xl border border-emerald-300 flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                        <CheckCircle2 size={14} className="text-emerald-700" />
                        {matchedTool.name}
                      </span>
                      <span className="text-[10px] text-emerald-800 font-bold bg-white px-1.5 py-0.5 rounded">
                        Cocok!
                      </span>
                    </div>
                  ) : (
                    <div className="p-2.5 rounded-xl border border-dashed border-slate-300 text-center text-xs text-slate-400">
                      Tarik alat ke sini
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Completion Modal / Victory Banner */}
      {isCompleted && (
        <div className="p-4 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-3xl shadow-lg border-2 border-amber-500 text-amber-950 flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white rounded-2xl shadow">
              <Trophy className="w-8 h-8 text-amber-500" />
            </div>
            <div>
              <h4 className="font-display font-black text-lg">Misi Selesai! Kamu Menguasai Seluruh Alat!</h4>
              <p className="text-xs sm:text-sm font-medium">Semua 8 alat pekerjaan berhasil dipasangkan dengan tepat!</p>
            </div>
          </div>

          <button
            onClick={() => onComplete(Object.keys(matchedPairs).length * 10)}
            className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-2xl shadow active:scale-95 transition-all flex items-center gap-2 shrink-0"
          >
            <span>Klaim Bintang & Lanjut</span>
            <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 mt-2 border-t border-slate-200">
        <button
          onClick={onBackToMap}
          className="px-4 py-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
        >
          Kembali ke Peta
        </button>

        {isCompleted && (
          <button
            onClick={() => onComplete(80)}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-2xl shadow flex items-center gap-1.5 transition-all"
          >
            <span>Selesai & Simpan Skor</span>
            <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
};
