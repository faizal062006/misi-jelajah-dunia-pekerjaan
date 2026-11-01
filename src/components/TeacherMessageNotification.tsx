import React from 'react';
import { Bell, MessageSquare, Check, X, Megaphone, ShieldAlert, Heart, Info } from 'lucide-react';
import { TeacherMessage } from '../types/game';
import { soundManager } from '../utils/audio';

interface TeacherMessageNotificationProps {
  messages: TeacherMessage[];
  currentStudentName: string;
  onMarkAsRead: (messageId: string) => void;
  isOpenDrawer: boolean;
  onCloseDrawer: () => void;
}

export const TeacherMessageNotification: React.FC<TeacherMessageNotificationProps> = ({
  messages,
  currentStudentName,
  onMarkAsRead,
  isOpenDrawer,
  onCloseDrawer
}) => {
  // Filter messages intended for this student or broadcast to everyone
  const relevantMessages = messages.filter(
    m => m.targetStudentName === 'Semua Siswa' || m.targetStudentName.toLowerCase() === currentStudentName.toLowerCase()
  );

  // Unread latest message for popup notification
  const latestUnread = relevantMessages.find(m => !m.read);

  const getCategoryBadge = (cat: TeacherMessage['category']) => {
    switch (cat) {
      case 'Peringatan':
        return {
          bg: 'bg-rose-100 text-rose-800 border-rose-300',
          icon: <ShieldAlert className="w-3.5 h-3.5" />
        };
      case 'Motivasi':
        return {
          bg: 'bg-amber-100 text-amber-800 border-amber-300',
          icon: <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-400" />
        };
      case 'Instruksi':
        return {
          bg: 'bg-blue-100 text-blue-800 border-blue-300',
          icon: <Info className="w-3.5 h-3.5" />
        };
      default:
        return {
          bg: 'bg-purple-100 text-purple-800 border-purple-300',
          icon: <Megaphone className="w-3.5 h-3.5" />
        };
    }
  };

  const handleAcknowledge = (id: string) => {
    soundManager.playClick();
    onMarkAsRead(id);
  };

  return (
    <>
      {/* High-Priority Warning Modal from Teacher */}
      {latestUnread && !isOpenDrawer && latestUnread.category === 'Peringatan' && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border-4 border-rose-500 overflow-hidden flex flex-col animate-scaleUp">
            <div className="bg-gradient-to-r from-rose-600 via-rose-700 to-red-700 px-5 py-4 text-white flex items-center justify-between shadow-md">
              <div className="flex items-center gap-2.5">
                <ShieldAlert className="w-6 h-6 text-yellow-300 animate-pulse" />
                <div>
                  <h3 className="font-extrabold font-display text-base tracking-wide leading-tight">
                    PERINGATAN RESMI GURU
                  </h3>
                  <p className="text-[11px] text-rose-100 font-medium">Dari: Pak Faizal, S.Pd. (Wali Kelas 4)</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-white/20 text-white font-mono text-[10px] font-bold">
                {latestUnread.timestamp}
              </span>
            </div>

            <div className="p-5 flex flex-col gap-4 text-slate-900">
              <div className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-300 text-left">
                <p className="text-xs font-black uppercase text-rose-700 tracking-wider mb-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
                  Instruksi Kedisiplinan:
                </p>
                <p className="text-sm font-bold text-slate-800 leading-relaxed">
                  "{latestUnread.message}"
                </p>
              </div>

              <p className="text-[11px] text-slate-500 text-center font-medium">
                Peringatan ini tercatat di rekap aktivitas kelas. Tetap fokus dan jujur ya!
              </p>

              <button
                onClick={() => handleAcknowledge(latestUnread.id)}
                className="w-full py-3 px-4 bg-rose-600 hover:bg-rose-700 text-white font-black text-sm rounded-2xl shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all"
              >
                <Check className="w-5 h-5 text-yellow-200" />
                <span>Saya Mengerti & Akan Fokus</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Corner Notification for Regular Messages (Pengumuman, Motivasi, Instruksi) */}
      {latestUnread && !isOpenDrawer && latestUnread.category !== 'Peringatan' && (
        <div className="fixed bottom-5 right-5 z-[90] max-w-sm sm:max-w-md w-full p-4 animate-slideUp">
          <div className="bg-white rounded-3xl shadow-2xl border-3 border-amber-400 overflow-hidden flex flex-col">
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-3 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-yellow-200 animate-bounce" />
                <span className="font-extrabold font-display text-sm tracking-wide">
                  Pesan dari Guru (Pak Faizal, S.Pd.)
                </span>
              </div>
              <button
                onClick={() => handleAcknowledge(latestUnread.id)}
                className="text-white/80 hover:text-white p-1 rounded-full cursor-pointer"
                title="Tutup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 flex flex-col gap-2.5 text-slate-800">
              <div className="flex items-center justify-between text-xs">
                {(() => {
                  const badge = getCategoryBadge(latestUnread.category);
                  return (
                    <span className={`px-2 py-0.5 rounded-full border text-[11px] font-bold flex items-center gap-1 ${badge.bg}`}>
                      {badge.icon}
                      {latestUnread.category}
                    </span>
                  );
                })()}
                <span className="text-slate-400 text-[11px]">{latestUnread.timestamp}</span>
              </div>

              <p className="text-sm font-semibold text-slate-800 leading-relaxed bg-amber-50/60 p-3 rounded-2xl border border-amber-200/80">
                "{latestUnread.message}"
              </p>

              <button
                onClick={() => handleAcknowledge(latestUnread.id)}
                className="w-full mt-1 py-2.5 px-4 bg-amber-500 hover:bg-amber-600 text-white font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 cursor-pointer active:scale-98 transition"
              >
                <Check className="w-4 h-4" />
                Baik Pak Guru, Saya Mengerti
              </button>
            </div>
          </div>
        </div>
      )}

      {/* History Drawer Modal */}
      {isOpenDrawer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border-4 border-amber-300 overflow-hidden flex flex-col max-h-[85vh]">
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-6 h-6 text-yellow-200" />
                <div>
                  <h3 className="font-extrabold font-display text-lg leading-tight">Kotak Pesan dari Guru</h3>
                  <p className="text-xs text-amber-100">Instruksi & Pengumuman Pak Faizal, S.Pd.</p>
                </div>
              </div>
              <button
                onClick={onCloseDrawer}
                className="text-white hover:bg-white/20 p-1.5 rounded-full cursor-pointer transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-5 overflow-y-auto flex flex-col gap-3 flex-1">
              {relevantMessages.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <Bell className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                  <p className="font-bold text-sm">Belum ada pesan dari Guru saat ini.</p>
                  <p className="text-xs text-slate-400">Tetap semangat menjelajahi setiap pos profesi!</p>
                </div>
              ) : (
                relevantMessages.map((msg) => {
                  const badge = getCategoryBadge(msg.category);
                  return (
                    <div
                      key={msg.id}
                      className={`p-4 rounded-2xl border-2 transition ${
                        msg.read ? 'bg-slate-50 border-slate-200' : 'bg-amber-50/70 border-amber-300 shadow-sm'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold flex items-center gap-1 ${badge.bg}`}>
                          {badge.icon}
                          {msg.category}
                        </span>
                        <span className="text-[11px] text-slate-400">{msg.timestamp}</span>
                      </div>
                      <p className="text-sm font-semibold text-slate-800 mb-2 leading-relaxed">
                        {msg.message}
                      </p>
                      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-200/60">
                        <span>Penerima: {msg.targetStudentName}</span>
                        {!msg.read ? (
                          <button
                            onClick={() => handleAcknowledge(msg.id)}
                            className="text-amber-700 font-bold hover:underline cursor-pointer flex items-center gap-1"
                          >
                            <Check className="w-3.5 h-3.5" /> Tandai Dibaca
                          </button>
                        ) : (
                          <span className="text-emerald-600 font-bold flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" /> Sudah dibaca
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={onCloseDrawer}
                className="py-2 px-5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs cursor-pointer"
              >
                Tutup Pesan
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
