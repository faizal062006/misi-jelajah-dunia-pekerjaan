import React, { useState, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Music,
  Sliders,
  Play,
  Pause,
  ChevronDown,
  X
} from 'lucide-react';
import { soundManager, MUSIC_TRACKS, MusicTrack } from '../utils/audio';

export const AudioControls: React.FC = () => {
  const [isMuted, setIsMuted] = useState(soundManager.getIsMuted());
  const [isVoiceMuted, setIsVoiceMuted] = useState(soundManager.getIsVoiceMuted());
  const [isBgmPlaying, setIsBgmPlaying] = useState(soundManager.getIsBgmPlaying());
  const [currentTrack, setCurrentTrack] = useState<MusicTrack>(soundManager.getCurrentTrack());
  const [volume, setVolume] = useState(soundManager.getVolume());
  const [isOpenPanel, setIsOpenPanel] = useState(false);

  useEffect(() => {
    return soundManager.subscribe(() => {
      setIsMuted(soundManager.getIsMuted());
      setIsVoiceMuted(soundManager.getIsVoiceMuted());
      setIsBgmPlaying(soundManager.getIsBgmPlaying());
      setCurrentTrack(soundManager.getCurrentTrack());
      setVolume(soundManager.getVolume());
    });
  }, []);

  const handleToggleSound = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      soundManager.playClick();
    }
  };

  const handleToggleVoice = () => {
    const muted = soundManager.toggleVoice();
    setIsVoiceMuted(muted);
    if (!muted) {
      soundManager.playClick();
      soundManager.speak('Suara narasi aktif');
    }
  };

  const handleToggleBgm = () => {
    soundManager.playClick();
    if (isBgmPlaying) {
      soundManager.stopBGM();
    } else {
      soundManager.startBGM();
    }
  };

  const handleSelectTrack = (trackId: MusicTrack['id']) => {
    soundManager.playClick();
    soundManager.setTrack(trackId);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    soundManager.setVolume(val);
  };

  return (
    <>
      {/* Floating Audio Dock */}
      <div className="fixed top-4 right-4 z-40 flex items-center gap-2 bg-white/90 backdrop-blur-md px-2 py-1.5 rounded-full shadow-lg border-2 border-amber-300">
        {/* Play / Pause Music */}
        <button
          onClick={handleToggleBgm}
          className={`p-2 rounded-full transition-transform duration-200 active:scale-95 ${
            isBgmPlaying
              ? 'bg-amber-500 text-white shadow-sm'
              : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
          }`}
          title={isBgmPlaying ? 'Jeda Musik' : 'Putar Musik'}
          aria-label={isBgmPlaying ? 'Jeda Musik' : 'Putar Musik'}
        >
          {isBgmPlaying ? <Pause size={17} /> : <Play size={17} className="ml-0.5" />}
        </button>

        {/* Music Options Panel Toggle */}
        <button
          onClick={() => {
            soundManager.playClick();
            setIsOpenPanel(!isOpenPanel);
          }}
          className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold text-amber-950 bg-amber-100 hover:bg-amber-200 transition-colors"
          title="Pengaturan Musik & Nada"
          aria-label="Pilih Musik"
        >
          <Music size={14} className="text-amber-700" />
          <span className="hidden sm:inline max-w-[110px] truncate">{currentTrack.name}</span>
          <ChevronDown size={13} className="text-amber-800" />
        </button>

        {/* Sound FX Mute */}
        <button
          onClick={handleToggleSound}
          className={`p-2 rounded-full transition-transform duration-200 active:scale-95 ${
            isMuted
              ? 'bg-rose-100 text-rose-700'
              : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
          }`}
          title={isMuted ? 'Nyalakan Efek Suara' : 'Matikan Efek Suara'}
          aria-label={isMuted ? 'Nyalakan Suara' : 'Matikan Suara'}
        >
          {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
        </button>

        {/* Voice Narration Toggle */}
        <button
          onClick={handleToggleVoice}
          className={`p-2 rounded-full transition-transform duration-200 active:scale-95 ${
            isVoiceMuted
              ? 'bg-slate-100 text-slate-400'
              : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
          }`}
          title={isVoiceMuted ? 'Nyalakan Narasi Suara' : 'Matikan Narasi Suara'}
          aria-label={isVoiceMuted ? 'Nyalakan Narasi' : 'Matikan Narasi'}
        >
          {isVoiceMuted ? <MicOff size={17} /> : <Mic size={17} />}
        </button>
      </div>

      {/* Floating Music Settings Modal */}
      {isOpenPanel && (
        <div className="fixed top-18 right-4 z-50 w-80 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border-3 border-amber-300 p-4 animate-fadeIn">
          <div className="flex items-center justify-between pb-2 border-b border-amber-200 mb-3">
            <div className="flex items-center gap-2">
              <Music className="w-5 h-5 text-amber-600" />
              <h3 className="font-display font-black text-sm text-slate-900">
                Pilihan Musik Menyenangkan
              </h3>
            </div>
            <button
              onClick={() => setIsOpenPanel(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100"
            >
              <X size={16} />
            </button>
          </div>

          {/* Track List */}
          <div className="space-y-1.5 mb-3">
            {MUSIC_TRACKS.map(t => {
              const isSelected = currentTrack.id === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => handleSelectTrack(t.id)}
                  className={`w-full p-2.5 rounded-2xl text-left border transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-amber-100 border-amber-400 text-amber-950 font-bold shadow-xs'
                      : 'bg-slate-50 border-slate-200 hover:bg-amber-50 hover:border-amber-300 text-slate-700'
                  }`}
                >
                  <div>
                    <p className="text-xs font-display">{t.name}</p>
                    <p className="text-[10px] text-slate-500">{t.genre} · {t.description}</p>
                  </div>
                  {isSelected && isBgmPlaying && (
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping mr-1" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Volume Slider */}
          <div className="p-3 bg-amber-50/70 rounded-2xl border border-amber-200">
            <div className="flex items-center justify-between text-xs font-bold text-amber-950 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Sliders size={13} />
                Volume Musik
              </span>
              <span className="tabular-nums font-mono">{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>
        </div>
      )}
    </>
  );
};
