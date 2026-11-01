import React from 'react';

interface ProfessionThemedBackdropProps {
  professionId: string;
  className?: string;
  opacity?: number;
}

export const ProfessionThemedBackdrop: React.FC<ProfessionThemedBackdropProps> = ({
  professionId,
  className = '',
  opacity = 1
}) => {
  switch (professionId) {
    case 'guru':
      // Sekolah: Papan tulis hijau, rumus matematika, alfabet, meja kayu, buku
      return (
        <div
          className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
          style={{ opacity }}
        >
          {/* Deep chalkboard dark green gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-[#133926] to-[#0c2419]" />
          
          {/* Chalk grid lines */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px),
                                linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}
          />

          {/* Hand-drawn chalk sketches SVG */}
          <svg className="absolute inset-0 w-full h-full text-emerald-200/25" xmlns="http://www.w3.org/2000/svg">
            {/* Formulas & Alphabets */}
            <text x="5%" y="15%" fontFamily="sans-serif" fontSize="24" fontWeight="bold" fill="currentColor">A B C</text>
            <text x="85%" y="18%" fontFamily="sans-serif" fontSize="22" fontWeight="bold" fill="currentColor">1 + 2 = 3</text>
            <text x="80%" y="80%" fontFamily="sans-serif" fontSize="20" fill="currentColor">E = mc²</text>
            <text x="8%" y="75%" fontFamily="sans-serif" fontSize="18" fill="currentColor">Luas = p × l</text>

            {/* Geometry shapes in chalk */}
            <polygon points="120,90 170,160 70,160" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4,4" />
            <circle cx="85%" cy="45%" r="40" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" />
            <rect x="15%" y="45%" width="60" height="40" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
            
            {/* Book icon chalk */}
            <path d="M 500 80 Q 525 70 550 80 L 550 120 Q 525 110 500 120 Z M 500 80 Q 475 70 450 80 L 450 120 Q 475 110 500 120 Z" 
                  fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>

          {/* Warm classroom light overhead */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-200/10 rounded-full blur-3xl pointer-events-none" />
          {/* Wooden desk trim bottom bar */}
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-amber-900 via-amber-800 to-amber-950 border-t border-amber-700/50" />
        </div>
      );

    case 'dokter':
      // Rumah Sakit: Ruang klinis bersih, gelombang detak jantung ECG, palang medis, stetoskop
      return (
        <div
          className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
          style={{ opacity }}
        >
          {/* Medical cyan-teal sterile gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-950 via-teal-900 to-slate-950" />
          
          {/* Subtle medical hex grid */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(45, 212, 191, 0.4) 1px, transparent 0)`,
              backgroundSize: '28px 28px'
            }}
          />

          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="ecgGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {/* ECG Heartbeat pulse line across middle */}
            <path
              d="M 0 160 L 180 160 L 200 120 L 220 200 L 240 100 L 260 210 L 275 160 L 450 160 L 470 130 L 490 190 L 510 110 L 530 200 L 545 160 L 800 160 L 820 120 L 840 200 L 860 100 L 880 210 L 895 160 L 1200 160"
              fill="none"
              stroke="url(#ecgGrad)"
              strokeWidth="3.5"
            />

            {/* Glowing Medical Crosses */}
            <g className="text-teal-400/20 fill-current">
              <path d="M 60 70 h 20 v -20 h 15 v 20 h 20 v 15 h -20 v 20 h -15 v -20 h -20 z" />
              <path d="M 850 60 h 24 v -24 h 18 v 24 h 24 v 18 h -24 v 24 h -18 v -24 h -24 z" opacity="0.6" />
              <path d="M 780 230 h 16 v -16 h 12 v 16 h 16 v 12 h -16 v 16 h -12 v -16 h -16 z" opacity="0.4" />
            </g>
          </svg>

          {/* Clean clinical soft cyan glow */}
          <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-cyan-400/15 rounded-full blur-3xl" />
        </div>
      );

    case 'polisi':
      // Kantor Polisi / Patroli Jalan: Skyline kota malam, lampu patroli biru/merah, lencana bintang, marka jalan
      return (
        <div
          className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
          style={{ opacity }}
        >
          {/* Midnight blue police gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950" />
          
          {/* Red & Blue police emergency flasher light beams */}
          <div className="absolute -top-24 left-10 w-96 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -top-24 right-10 w-96 h-72 bg-rose-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '500ms' }} />

          {/* City skyline & road silhouettes */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {/* Distant building blocks */}
            <g fill="rgba(15, 23, 42, 0.7)">
              <rect x="2%" y="45%" width="8%" height="55%" />
              <rect x="12%" y="35%" width="10%" height="65%" />
              <rect x="24%" y="50%" width="9%" height="50%" />
              <rect x="68%" y="40%" width="11%" height="60%" />
              <rect x="81%" y="30%" width="8%" height="70%" />
              <rect x="91%" y="48%" width="8%" height="52%" />
            </g>

            {/* Glowing Windows in skyline */}
            <g fill="rgba(253, 224, 71, 0.4)">
              <circle cx="15%" cy="40%" r="2" />
              <circle cx="17%" cy="45%" r="2" />
              <circle cx="15%" cy="50%" r="2" />
              <circle cx="84%" cy="35%" r="2" />
              <circle cx="86%" cy="40%" r="2" />
              <circle cx="84%" cy="45%" r="2" />
            </g>

            {/* Police Badge Emblem Silhouette */}
            <path
              d="M 500 50 L 540 60 L 535 110 Q 500 140 500 150 Q 500 140 465 110 L 460 60 Z"
              fill="none"
              stroke="rgba(96, 165, 250, 0.25)"
              strokeWidth="3"
            />
          </svg>

          {/* Asphalt road line at bottom */}
          <div className="absolute bottom-0 inset-x-0 h-8 bg-slate-900 border-t-2 border-slate-700 flex items-center justify-around">
            <div className="w-16 h-1 bg-amber-400/60 rounded" />
            <div className="w-16 h-1 bg-amber-400/60 rounded" />
            <div className="w-16 h-1 bg-amber-400/60 rounded" />
            <div className="w-16 h-1 bg-amber-400/60 rounded" />
          </div>
        </div>
      );

    case 'petani':
      // Persawahan: Hamparan sawah terasering hijau keemasan, padi menguning, sinar matahari pagi
      return (
        <div
          className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
          style={{ opacity }}
        >
          {/* Lush morning farm sunrise gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-sky-900 via-emerald-950 to-amber-950" />

          {/* Warm sunrise sunburst */}
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-80 h-80 bg-amber-400/25 rounded-full blur-3xl" />

          {/* Terraced rice paddies landscape SVG */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            {/* Distant mountains */}
            <path d="M 0 160 Q 250 80 500 150 Q 750 70 1000 160 L 1000 350 L 0 350 Z" fill="rgba(6, 78, 59, 0.5)" />
            
            {/* Rolling green rice terraces */}
            <path d="M 0 190 Q 300 140 650 190 Q 850 170 1000 200 L 1000 350 L 0 350 Z" fill="rgba(20, 83, 45, 0.7)" />
            <path d="M 0 230 Q 350 200 700 240 Q 900 220 1000 250 L 1000 350 L 0 350 Z" fill="rgba(113, 63, 18, 0.8)" />

            {/* Golden Rice Stalk Silhouettes */}
            <g stroke="#facc15" strokeWidth="2" fill="none" opacity="0.35">
              <path d="M 80 300 Q 95 240 110 220 M 110 220 L 105 230 M 110 220 L 115 228" />
              <path d="M 90 310 Q 105 250 120 230 M 120 230 L 115 238 M 120 230 L 125 238" />
              <path d="M 880 300 Q 895 240 910 220 M 910 220 L 905 230 M 910 220 L 915 228" />
              <path d="M 900 310 Q 915 250 930 230 M 930 230 L 925 238 M 930 230 L 935 238" />
            </g>
          </svg>

          {/* Golden fertile soil footer */}
          <div className="absolute bottom-0 inset-x-0 h-4 bg-gradient-to-r from-amber-900 via-amber-800 to-amber-950" />
        </div>
      );

    case 'pilot':
      // Bandara & Angkasa: Landasan pacu bandara (runway), langit biru tinggi, awan putih, garis navigasi
      return (
        <div
          className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
          style={{ opacity }}
        >
          {/* High altitude sky to horizon gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-sky-950 via-blue-900 to-indigo-950" />

          {/* Distant soft clouds */}
          <div className="absolute top-10 left-12 w-64 h-24 bg-white/10 rounded-full blur-xl" />
          <div className="absolute top-20 right-16 w-80 h-32 bg-sky-200/10 rounded-full blur-2xl" />

          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            {/* Runway Perspective Lines leading into horizon */}
            <polygon points="400,160 600,160 850,350 150,350" fill="rgba(15, 23, 42, 0.75)" />
            
            {/* Runway centerline dashes */}
            <line x1="500" y1="170" x2="500" y2="190" stroke="#facc15" strokeWidth="3" />
            <line x1="500" y1="210" x2="500" y2="240" stroke="#facc15" strokeWidth="4" />
            <line x1="500" y1="260" x2="500" y2="300" stroke="#facc15" strokeWidth="5" />
            <line x1="500" y1="320" x2="500" y2="350" stroke="#facc15" strokeWidth="6" />

            {/* Runway Edge Green/Amber Lights */}
            <circle cx="390" cy="165" r="3" fill="#4ade80" />
            <circle cx="610" cy="165" r="3" fill="#4ade80" />
            <circle cx="320" cy="220" r="4" fill="#facc15" />
            <circle cx="680" cy="220" r="4" fill="#facc15" />
            <circle cx="230" cy="290" r="5" fill="#facc15" />
            <circle cx="770" cy="290" r="5" fill="#facc15" />

            {/* Flight jet contrail streak */}
            <line x1="100" y1="50" x2="350" y2="20" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeDasharray="6,4" />
          </svg>

          {/* Compass rose silhouette */}
          <div className="absolute top-4 right-6 w-16 h-16 opacity-20 border border-sky-300 rounded-full flex items-center justify-center">
            <span className="text-[10px] font-mono text-sky-200">N</span>
          </div>
        </div>
      );

    case 'nelayan':
      // Lautan & Dermaga: Ombak samudera biru, siluet kapal nelayan, mercusuar, sinar tembus air
      return (
        <div
          className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
          style={{ opacity }}
        >
          {/* Deep ocean blue gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-sky-950 via-cyan-950 to-blue-950" />

          {/* Ocean waves and ripples SVG */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            {/* Sun rays underwater / above water */}
            <path d="M 0 80 Q 250 60 500 80 T 1000 80 L 1000 350 L 0 350 Z" fill="rgba(8, 51, 68, 0.4)" />
            <path d="M 0 140 Q 250 170 500 140 T 1000 140 L 1000 350 L 0 350 Z" fill="rgba(12, 74, 110, 0.6)" />
            <path d="M 0 210 Q 250 180 500 210 T 1000 210 L 1000 350 L 0 350 Z" fill="rgba(7, 89, 133, 0.7)" />

            {/* Wooden fishing boat silhouette */}
            <g fill="rgba(15, 23, 42, 0.6)" transform="translate(700, 95) scale(0.6)">
              <path d="M 0 20 Q 50 25 100 20 L 90 40 Q 50 45 10 40 Z" />
              <line x1="50" y1="20" x2="50" y2="-10" stroke="rgba(15, 23, 42, 0.8)" strokeWidth="3" />
              <polygon points="50,-10 80,5 50,5" fill="rgba(255,255,255,0.4)" />
            </g>

            {/* Distant Lighthouse beam */}
            <polygon points="80,100 1000,40 1000,80" fill="rgba(253, 224, 71, 0.1)" />
            <rect x="75" y="80" width="10" height="30" fill="rgba(15, 23, 42, 0.8)" />
            <circle cx="80" cy="78" r="4" fill="#fef08a" />
          </svg>

          {/* Wooden dock pier planks at bottom */}
          <div className="absolute bottom-0 inset-x-0 h-6 bg-amber-950/80 border-t border-amber-800 flex justify-around">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="w-1 h-full bg-amber-900/60" />
            ))}
          </div>
        </div>
      );

    case 'koki':
      // Dapur Restoran: Keramik dapur bistro hangat, wajan tembaga, uap masakan lezat, api kompor
      return (
        <div
          className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
          style={{ opacity }}
        >
          {/* Warm culinary maroon/orange bistro gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-950 via-rose-950 to-orange-950" />

          {/* Restaurant subway tile pattern */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px),
                                linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)`,
              backgroundSize: '48px 24px'
            }}
          />

          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {/* Whimsical steam swirls */}
            <g stroke="rgba(254, 215, 170, 0.35)" strokeWidth="3" fill="none">
              <path d="M 120 180 Q 110 140 130 110 Q 150 80 135 50" />
              <path d="M 140 190 Q 160 150 145 120 Q 130 90 150 60" />
              <path d="M 850 170 Q 840 130 860 100 Q 880 70 865 40" />
            </g>

            {/* Hanging copper cookware silhouettes */}
            <g fill="none" stroke="rgba(249, 115, 22, 0.4)" strokeWidth="2">
              <line x1="0" y1="40" x2="1000" y2="40" strokeWidth="4" />
              <circle cx="220" cy="70" r="20" fill="rgba(180, 83, 9, 0.3)" />
              <line x1="220" y1="40" x2="220" y2="50" />
              <line x1="220" y1="70" x2="220" y2="105" />

              <circle cx="340" cy="75" r="16" fill="rgba(180, 83, 9, 0.3)" />
              <line x1="340" y1="40" x2="340" y2="59" />
              <line x1="340" y1="75" x2="340" y2="110" />

              {/* Chef Toque hat outline */}
              <path
                d="M 750 80 Q 730 60 745 40 Q 770 20 780 40 Q 800 20 815 40 Q 830 60 810 80 Z"
                fill="rgba(255,255,255,0.15)"
                stroke="rgba(255,255,255,0.4)"
              />
            </g>
          </svg>

          {/* Warm stove flame glow */}
          <div className="absolute bottom-4 left-1/4 w-72 h-36 bg-orange-500/20 rounded-full blur-2xl" />
          {/* Stainless steel counter bar at bottom */}
          <div className="absolute bottom-0 inset-x-0 h-4 bg-gradient-to-r from-slate-400 via-slate-200 to-slate-400 border-t border-slate-300" />
        </div>
      );

    case 'pemadam':
      // Pos Pemadam Kebakaran: Markas merah berani, armada damkar, selang air, lencana keberanian
      return (
        <div
          className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
          style={{ opacity }}
        >
          {/* Fire red and emergency amber gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-950 via-rose-950 to-amber-950" />

          {/* Red brick texture simulation */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px),
                                linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)`,
              backgroundSize: '36px 18px'
            }}
          />

          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {/* Fire station garage bay arched doors */}
            <path
              d="M 60 300 L 60 120 Q 140 70 220 120 L 220 300"
              fill="none"
              stroke="rgba(239, 68, 68, 0.4)"
              strokeWidth="4"
            />
            <path
              d="M 780 300 L 780 120 Q 860 70 940 120 L 940 300"
              fill="none"
              stroke="rgba(239, 68, 68, 0.4)"
              strokeWidth="4"
            />

            {/* Fire Hydrant outline */}
            <g fill="rgba(220, 38, 38, 0.4)" stroke="rgba(254, 202, 202, 0.5)" strokeWidth="2" transform="translate(115, 180) scale(0.7)">
              <rect x="20" y="20" width="40" height="70" rx="6" />
              <ellipse cx="40" cy="20" rx="20" ry="10" />
              <circle cx="40" cy="10" r="6" />
              <rect x="5" y="40" width="15" height="15" rx="3" />
              <rect x="60" y="40" width="15" height="15" rx="3" />
            </g>

            {/* Arch of high-pressure water spray droplets */}
            <path
              d="M 500 280 Q 600 120 850 140"
              fill="none"
              stroke="rgba(56, 189, 248, 0.35)"
              strokeWidth="4"
              strokeDasharray="8,6"
            />
          </svg>

          {/* Yellow/Black hazard warning caution stripe footer */}
          <div
            className="absolute bottom-0 inset-x-0 h-4 border-t border-amber-500/40"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, #f59e0b, #f59e0b 12px, #18181b 12px, #18181b 24px)`
            }}
          />
        </div>
      );

    default:
      return (
        <div className={`absolute inset-0 bg-gradient-to-br from-amber-900 to-slate-900 ${className}`} style={{ opacity }} />
      );
  }
};
