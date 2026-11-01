import { QuizQuestion, DragToolItem, MataPelajaran } from '../types/game';

// 8 Tool items for Mini Game 2: Pasangkan Alat dan Profesi
export const DRAG_TOOL_ITEMS: DragToolItem[] = [
  {
    id: 'tool_stetoskop',
    name: 'Stetoskop Medis',
    professionId: 'dokter',
    professionName: 'Dokter',
    icon: 'Stethoscope',
    description: 'Digunakan untuk memeriksa detak jantung dan pernapasan.'
  },
  {
    id: 'tool_cangkul',
    name: 'Cangkul Tanah',
    professionId: 'petani',
    professionName: 'Petani',
    icon: 'Hammer',
    description: 'Digunakan untuk mencangkul dan menggemburkan tanah sawah.'
  },
  {
    id: 'tool_buku',
    name: 'Buku Pelajaran',
    professionId: 'guru',
    professionName: 'Guru',
    icon: 'BookOpen',
    description: 'Digunakan sebagai bahan ajar ilmu pengetahuan di sekolah.'
  },
  {
    id: 'tool_kompas',
    name: 'Kompas & Radar Navigasi',
    professionId: 'pilot',
    professionName: 'Pilot',
    icon: 'Compass',
    description: 'Digunakan untuk memandu arah terbang pesawat di angkasa.'
  },
  {
    id: 'tool_jaring',
    name: 'Jaring Ikan',
    professionId: 'nelayan',
    professionName: 'Nelayan',
    icon: 'Grid',
    description: 'Digunakan untuk menangkap rombongan ikan di laut lepas.'
  },
  {
    id: 'tool_wajan',
    name: 'Wajan & Spatula',
    professionId: 'koki',
    professionName: 'Koki',
    icon: 'Utensils',
    description: 'Digunakan untuk mengolah dan memasak hidangan lezat di dapur.'
  },
  {
    id: 'tool_selang',
    name: 'Selang Pemadam Semprot',
    professionId: 'pemadam',
    professionName: 'Pemadam Kebakaran',
    icon: 'Activity',
    description: 'Digunakan untuk menyemprotkan air bertekanan tinggi ke kobaran api.'
  },
  {
    id: 'tool_borgol',
    name: 'Borgol Pengaman',
    professionId: 'polisi',
    professionName: 'Polisi',
    icon: 'Lock',
    description: 'Digunakan untuk mengamankan pelaku kejahatan agar warga aman.'
  }
];

// Soal Misi Khusus untuk Setiap Pos Profesi (Masing-masing profesi punya soal unik tersendiri)
export interface MissionQuiz {
  professionId: string;
  professionName: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  subject?: MataPelajaran;
}

export const PROFESSION_MISSION_POOLS: Record<string, MissionQuiz[]> = {
  guru: [
    {
      professionId: 'guru',
      professionName: 'Guru',
      question: 'Di dalam ruang kelas, mengapa seorang guru selalu sabar menjelaskan materi dan membimbing siswa berdiskusi?',
      options: [
        'Supaya waktu istirahat lebih cepat datang',
        'Agar setiap siswa memahami ilmu dan tumbuh menjadi anak yang berbudi pekerti luhur',
        'Untuk menghabiskan persediaan kapur dan spidol',
        'Hanya untuk mengisi waktu luang di sekolah'
      ],
      correctIndex: 1,
      explanation: 'Tugas mulia guru bukan sekadar mengajar, melainkan mendidik karakter dan mencerdaskan kehidupan generasi muda bangsa.'
    },
    {
      professionId: 'guru',
      professionName: 'Guru',
      question: 'Sebelum memulai semester baru, apa yang dipersiapkan guru agar proses belajar di kelas berjalan teratur dan menyenangkan?',
      options: [
        'Rencana Pelaksanaan Pembelajaran (RPP/Modul Ajar) dan media pembelajaran menarik',
        'Tiket liburan ke luar kota',
        'Menutup semua jendela sekolah',
        'Membiarkan siswa belajar tanpa arahan'
      ],
      correctIndex: 0,
      explanation: 'Guru profesional menyiapkan modul ajar dan alat peraga agar siswa SD dapat memahami konsep ilmu dengan mudah dan gembira.'
    },
    {
      professionId: 'guru',
      professionName: 'Guru',
      question: 'Bagaimana cara guru menghargai perbedaan kemampuan belajar antar siswa di kelas 4?',
      options: [
        'Hanya memuji siswa yang nilainya 100',
        'Memberikan bimbingan tambahan dengan sabar serta memotivasi semua siswa agar terus berkembang',
        'Menyuruh siswa yang belum paham belajar sendiri di luar kelas',
        'Tidak pernah mengadakan ulangan'
      ],
      correctIndex: 1,
      explanation: 'Guru teladan menyayangi semua murid dan memberikan bimbingan sesuai kebutuhan belajar masing-masing anak.'
    }
  ],
  dokter: [
    {
      professionId: 'dokter',
      professionName: 'Dokter',
      question: 'Saat memeriksa pasien yang batuk dan demam di klinik, mengapa dokter meletakkan stetoskop di dada pasien?',
      options: [
        'Untuk mengukur tinggi badan pasien',
        'Untuk mendengarkan irama detak jantung dan suara saluran napas di paru-paru',
        'Sebagai hiasan agar terlihat keren',
        'Untuk mengukur berat badan pasien'
      ],
      correctIndex: 1,
      explanation: 'Stetoskop memperbesar suara detak jantung dan aliran udara paru-paru sehingga dokter dapat mengetahui kondisi kesehatan pasien.'
    },
    {
      professionId: 'dokter',
      professionName: 'Dokter',
      question: 'Mengapa dokter menuliskan resep obat dengan dosis tertentu dan meminta pasien meminumnya sesuai aturan?',
      options: [
        'Agar penyakit cepat sembuh tanpa menimbulkan efek samping berbahaya bagi tubuh',
        'Hanya agar pasien membeli banyak botol obat',
        'Supaya pasien merasa bosan minum obat',
        'Karena semua jenis obat rasanya manis'
      ],
      correctIndex: 0,
      explanation: 'Dosis obat dihitung cermat oleh dokter agar efektif membunuh kuman penyakit secara aman bagi organ tubuh manusia.'
    },
    {
      professionId: 'dokter',
      professionName: 'Dokter',
      question: 'Sebelum memeriksa luka pasien atau melakukan tindakan medis, mengapa dokter selalu mencuci tangan dengan sabun antiseptik?',
      options: [
        'Supaya tangan terasa wangi buah-buahan',
        'Membunuh kuman dan bakteri agar luka pasien tidak terkena infeksi',
        'Supaya sarung tangan tidak basah',
        'Hanya untuk mengisi waktu luang di rumah sakit'
      ],
      correctIndex: 1,
      explanation: 'Sterilisasi dan kebersihan tangan adalah protokol medis utama pencegahan penularan kuman di lingkungan kesehatan.'
    }
  ],
  polisi: [
    {
      professionId: 'polisi',
      professionName: 'Polisi',
      question: 'Ketika lampu lalu lintas sedang padam di persimpangan jalan, tindakan apakah yang dilakukan polisi?',
      options: [
        'Duduk santai di pos menunggu listrik menyala',
        'Turun langsung ke jalan meniup peluit dan memberi aba-aba tangan agar arus kendaraan tetap tertib',
        'Menutup seluruh jalan agar tidak ada kendaraan yang lewat',
        'Menyuruh pejalan kaki melompat pagar'
      ],
      correctIndex: 1,
      explanation: 'Polisi sigap mengurai kemacetan dan mencegah kecelakaan lalu lintas dengan mengatur kendaraan secara manual menggunakan aba-aba tangan.'
    },
    {
      professionId: 'polisi',
      professionName: 'Polisi',
      question: 'Apa tugas penting polisi patroli (Bhabinkamtibmas) saat mengunjungi perumahan dan perkampungan warga?',
      options: [
        'Menjaga keamanan lingkungan, mendengarkan keluhan warga, dan mencegah terjadinya tindak kejahatan',
        'Meminta makanan gratis dari rumah ke rumah',
        'Melarang warga keluar rumah setiap sore',
        'Mengunci seluruh pintu pagar desa'
      ],
      correctIndex: 0,
      explanation: 'Polisi bermitra erat dengan masyarakat untuk menciptakan lingkungan pemukiman yang aman, tenteram, dan harmonis.'
    },
    {
      professionId: 'polisi',
      professionName: 'Polisi',
      question: 'Mengapa polisi mewajibkan pengendara sepeda motor memakai helm berstandar SNI dan mengunci tali dagunya?',
      options: [
        'Agar model rambut tidak berantakan',
        'Melindungi kepala dari benturan keras bila sewaktu-waktu terjadi kecelakaan di jalan',
        'Sebagai gaya busana jalan raya semata',
        'Supaya tidak kepanasan oleh sinar matahari'
      ],
      correctIndex: 1,
      explanation: 'Helm berstandar keselamatan melindungi tempurung kepala dan otak pengendara dari risiko cedera fatal di jalan raya.'
    }
  ],
  petani: [
    {
      professionId: 'petani',
      professionName: 'Petani',
      question: 'Sebelum bibit padi ditanam oleh petani, mengapa tanah persawahan harus dibajak dan dicangkul terlebih dahulu?',
      options: [
        'Supaya tanah menjadi gembur, berlumpur subur, dan mudah dialiri air irigasi',
        'Agar tanah menjadi keras seperti batu',
        'Supaya rumput liar tumbuh semakin banyak',
        'Hanya untuk olahraga pagi saja'
      ],
      correctIndex: 0,
      explanation: 'Membajak dan mencangkul tanah membuat sirkulasi udara di dalam tanah lancar dan mempermudah akar tanaman padi menyerap zat hara.'
    },
    {
      professionId: 'petani',
      professionName: 'Petani',
      question: 'Mengapa petani sering membuat orang-orangan sawah di tengah petak sawah yang padinya mulai menguning?',
      options: [
        'Sebagai tempat berteduh saat hujan',
        'Untuk menakut-nakuti burung pemakan bulir padi agar tidak merusak hasil panen',
        'Sebagai patung hiasan festival desa',
        'Supaya sawah terlihat ramai di malam hari'
      ],
      correctIndex: 1,
      explanation: 'Orang-orangan sawah bergerak tertiup angin dan menyerupai manusia, efektif mencegah kawanan burung pipit mematuk bulir padi.'
    },
    {
      professionId: 'petani',
      professionName: 'Petani',
      question: 'Apa manfaat saluran irigasi sawah yang dibuat secara gotong royong oleh para petani?',
      options: [
        'Mengalirkan air bersih secara teratur dari sungai ke setiap petak sawah agar padi tumbuh subur',
        'Sebagai tempat berenang anak-anak saat siang hari',
        'Untuk membuang sampah sisa pertanian',
        'Agar jalan setapak persawahan menjadi licin'
      ],
      correctIndex: 0,
      explanation: 'Sistem irigasi yang baik memastikan ketersediaan air yang cukup sepanjang musim tanam hingga panen tiba.'
    }
  ],
  pilot: [
    {
      professionId: 'pilot',
      professionName: 'Pilot',
      question: 'Sebelum pesawat tinggal landas (take-off), hal penting apa yang dilakukan pilot bersama kopilot di kokpit?',
      options: [
        'Membuka pintu pesawat untuk melihat pemandangan',
        'Melakukan pemeriksaan daftar kelayakan (checklist) sistem navigasi, bahan bakar, dan berkoordinasi dengan menara ATC',
        'Mematikan mesin pesawat agar hemat energi',
        'Tidur sejenak sebelum menempuh penerbangan'
      ],
      correctIndex: 1,
      explanation: 'Pemeriksaan pra-terbang (pre-flight checklist) sangat ketat dan wajib dilakukan demi menjamin keselamatan seluruh penumpang di udara.'
    },
    {
      professionId: 'pilot',
      professionName: 'Pilot',
      question: 'Ketika pesawat menghadapi awan mendung tebal dan turbulensi di udara, tindakan apa yang diambil pilot?',
      options: [
        'Nyalakan tanda sabuk pengaman bagi penumpang dan minta izin ATC untuk mengubah ketinggian penerbangan yang lebih aman',
        'Mematikan kedua mesin pesawat',
        'Membuka jendela kokpit untuk mengecek arah angin',
        'Mendarat darurat di jalan raya sembarangan'
      ],
      correctIndex: 0,
      explanation: 'Pilot terlatih mengendalikan pesawat dalam turbulensi dan berkoordinasi dengan menara pengawas cuaca penerbangan.'
    },
    {
      professionId: 'pilot',
      professionName: 'Pilot',
      question: 'Alat apakah di kokpit yang membantu pilot menentukan arah terbang pesawat tanpa tersesat di tengah awan gelap?',
      options: [
        'Lampu senter biasa',
        'Kompas gyroskopik dan sistem navigasi satelit (GPS Aviasi)',
        'Kacamata hitam teropong',
        'Kaca spion pesawat'
      ],
      correctIndex: 1,
      explanation: 'Kompas penerbangan dan panel instrumen canggih memandu pilot melintasi benua dan samudera dengan presisi tinggi.'
    }
  ],
  nelayan: [
    {
      professionId: 'nelayan',
      professionName: 'Nelayan',
      question: 'Mengapa nelayan tradisional Indonesia sangat menghindari penggunaan bahan peledak atau pukat harimau saat menangkap ikan?',
      options: [
        'Karena ikan tidak suka suara ledakan',
        'Karena merusak terumbu karang dan mematikan benih ikan kecil sehingga populasi ikan laut bisa punah',
        'Karena harganya terlalu murah',
        'Supaya perahu tidak kotor'
      ],
      correctIndex: 1,
      explanation: 'Nelayan bijak menggunakan jaring ramah lingkungan untuk menjaga kelestarian terumbu karang dan ekosistem laut untuk masa depan.'
    },
    {
      professionId: 'nelayan',
      professionName: 'Nelayan',
      question: 'Kapan nelayan tradisional biasanya mulai berangkat melaut dan mengapa memanfaatkan angin darat?',
      options: [
        'Malam hari, karena angin bertiup dari darat ke laut mendorong layar perahu nelayan',
        'Siang hari bolong saat matahari sangat terik',
        'Hanya saat musim badai topan',
        'Sore hari saat air laut sedang surut habis'
      ],
      correctIndex: 0,
      explanation: 'Nelayan memanfaatkan angin darat pada malam hari untuk mendorong perahu ke tengah laut, dan angin laut di siang hari untuk pulang ke dermaga.'
    },
    {
      professionId: 'nelayan',
      professionName: 'Nelayan',
      question: 'Setelah berhasil menangkap ikan segar di laut, ke manakah nelayan membawanya untuk dijual kepada pedagang dan masyarakat?',
      options: [
        'Ke Tempat Pelelangan Ikan (TPI) di dermaga pelabuhan',
        'Ke kantor pos pusat',
        'Ke apotek terdekat',
        'Ke bengkel kendaraan'
      ],
      correctIndex: 0,
      explanation: 'Di Tempat Pelelangan Ikan (TPI), hasil tangkapan laut segar didistribusikan ke pasar-pasar konsumsi masyarakat.'
    }
  ],
  koki: [
    {
      professionId: 'koki',
      professionName: 'Koki',
      question: 'Mengapa seorang koki (chef) profesional wajib mengenakan celemek bersih dan topi koki (toque) saat memasak di dapur restoran?',
      options: [
        'Agar terlihat tinggi di depan kamera',
        'Menjaga kebersihan higienis makanan agar rambut dan kotoran tidak jatuh ke dalam masakan pengunjung',
        'Sebagai tanda bahwa masakan tersebut rasanya pedas',
        'Supaya baju tidak terkena angin malam'
      ],
      correctIndex: 1,
      explanation: 'Standar kebersihan (higienitas) adalah aturan nomor satu bagi koki untuk menyajikan makanan sehat, bergizi, dan aman dikonsumsi.'
    },
    {
      professionId: 'koki',
      professionName: 'Koki',
      question: 'Bagaimana cara koki memastikan masakan yang dibuat lezat sebelum disajikan ke meja pelanggan?',
      options: [
        'Mencicipi sedikit rasa saus atau kuah menggunakan sendok pencicip khusus yang higienis',
        'Meminta pelanggan memasak sendiri di meja',
        'Memasukkan garam sebanyak-banyaknya tanpa takaran',
        'Menebak rasa masakan dari aromanya saja tanpa resep'
      ],
      correctIndex: 0,
      explanation: 'Mencicipi rasa masakan dengan sendok higienis memastikan takaran bumbu, gurih, manis, dan asin seimbang sempurna.'
    },
    {
      professionId: 'koki',
      professionName: 'Koki',
      question: 'Mengapa koki membedakan talenan untuk memotong daging mentah dan memotong sayuran buah?',
      options: [
        'Agar talenan tidak cepat patah',
        'Mencegah kontaminasi silang bakteri berbahaya dari daging mentah ke sayuran segar',
        'Hanya karena warna talenannya berbeda',
        'Supaya dapur terlihat lebih penuh peralatan'
      ],
      correctIndex: 1,
      explanation: 'Talenan warna-warni (merah untuk daging, hijau untuk sayuran) mencegah bakteri daging mentah mencemari sayuran siap saji.'
    }
  ],
  pemadam: [
    {
      professionId: 'pemadam',
      professionName: 'Pemadam Kebakaran',
      question: 'Selain memadamkan api kebakaran gedung, misi kemanusiaan apakah yang sering dilakukan oleh petugas pemadam kebakaran?',
      options: [
        'Menjual tiket tempat wisata',
        'Menolong penyelamatan darurat seperti mengevakuasi korban banjir, sarang tawon berbahaya, atau hewan yang terjebak',
        'Menanam pohon di hutan lindung',
        'Mengganti lampu jalan tol'
      ],
      correctIndex: 1,
      explanation: 'Petugas Damkar terlatih dalam operasi SAR (Pencarian dan Pertolongan) untuk berbagai situasi darurat yang membahayakan nyawa warga.'
    },
    {
      professionId: 'pemadam',
      professionName: 'Pemadam Kebakaran',
      question: 'Mengapa petugas pemadam kebakaran wajib mengenakan tabung pernapasan (SCBA) dan masker oksigen saat masuk ke dalam gedung berasap?',
      options: [
        'Agar suara teriakan terdengar lebih keras',
        'Menyediakan oksigen bersih dan melindungi paru-paru dari gas beracun serta asap pekat kebakaran',
        'Sebagai pemberat tubuh agar tidak tertiup angin',
        'Supaya wajah tidak kotor terkena abu'
      ],
      correctIndex: 1,
      explanation: 'Asap kebakaran mengandung karbon monoksida berbahaya. Tabung SCBA memberikan udara bersih agar petugas tetap sadar saat menyelamatkan korban.'
    },
    {
      professionId: 'pemadam',
      professionName: 'Pemadam Kebakaran',
      question: 'Apa yang harus dilakukan masyarakat saat mendengar sirine mobil pemadam kebakaran di jalan raya?',
      options: [
        'Segera menepi dan memberikan prioritas jalan agar mobil damkar bisa segera sampai di lokasi bencana',
        'Mengikuti mobil damkar dari belakang dengan kecepatan tinggi',
        'Membunyikan klakson bersama-sama',
        'Menghentikan mobil damkar untuk berfoto'
      ],
      correctIndex: 0,
      explanation: 'Setiap detik sangat berharga saat kebakaran. Memberikan jalan bagi mobil damkar dapat menyelamatkan nyawa dan harta warga.'
    }
  ]
};

// Backward-compatible single mapping (points to the first question of each pool)
export const PROFESSION_SPECIFIC_MISSIONS: Record<string, MissionQuiz> = {
  guru: PROFESSION_MISSION_POOLS.guru[0],
  dokter: PROFESSION_MISSION_POOLS.dokter[0],
  polisi: PROFESSION_MISSION_POOLS.polisi[0],
  petani: PROFESSION_MISSION_POOLS.petani[0],
  pilot: PROFESSION_MISSION_POOLS.pilot[0],
  nelayan: PROFESSION_MISSION_POOLS.nelayan[0],
  koki: PROFESSION_MISSION_POOLS.koki[0],
  pemadam: PROFESSION_MISSION_POOLS.pemadam[0]
};

/**
 * Returns a randomized mission quiz for a given profession with shuffled options
 */
export function getRandomProfessionMission(professionId: string): MissionQuiz {
  const pool = PROFESSION_MISSION_POOLS[professionId.toLowerCase()] || [PROFESSION_SPECIFIC_MISSIONS[professionId.toLowerCase()]];
  const selected = pool[Math.floor(Math.random() * pool.length)];

  // Shuffle options and recalculate correct index so options are never identical
  const mapped = selected.options.map((opt, idx) => ({
    text: opt,
    isCorrect: idx === selected.correctIndex
  }));
  for (let i = mapped.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [mapped[i], mapped[j]] = [mapped[j], mapped[i]];
  }

  return {
    ...selected,
    options: mapped.map(m => m.text),
    correctIndex: mapped.findIndex(m => m.isCorrect)
  };
}

// Expanded Mini Game 1: Tebak Profesi Questions Pool (12 soal unik & bervariasi)
export const GUESS_PROFESSION_QUESTIONS = [
  {
    id: 1,
    question: 'Siapakah yang bertugas mengajar siswa di sekolah agar menjadi cerdas dan berakhlak mulia?',
    options: ['Dokter', 'Guru', 'Pilot', 'Koki'],
    correctIndex: 1,
    hint: 'Bekerja di dalam ruang kelas dan menggunakan papan tulis serta buku pelajaran.',
    explanation: 'Hebat! Guru bertugas mendidik siswa di sekolah dengan penuh kesabaran agar menjadi generasi cerdas penerus bangsa.'
  },
  {
    id: 2,
    question: 'Siapakah yang memeriksa detak jantung pasien menggunakan stetoskop di rumah sakit?',
    options: ['Polisi', 'Nelayan', 'Dokter', 'Petani'],
    correctIndex: 2,
    hint: 'Mengenakan jas putih bersih dan menulis resep obat.',
    explanation: 'Luar biasa! Dokter menggunakan stetoskop untuk mendiagnosis penyakit dan membantu pasien sembuh.'
  },
  {
    id: 3,
    question: 'Siapakah yang menanam bibit padi di sawah hingga menghasilkan beras yang kita makan setiap hari?',
    options: ['Petani', 'Pilot', 'Pemadam Kebakaran', 'Guru'],
    correctIndex: 0,
    hint: 'Memakai topi caping anyaman bambu dan mencangkul tanah yang subur.',
    explanation: 'Tepat sekali! Petani mengolah sawah dan menanam padi dengan gigih sehingga kita memiliki beras dan makanan pokok.'
  },
  {
    id: 4,
    question: 'Siapakah yang bertugas memadamkan kobaran api dan menyelamatkan korban bencana dengan baju tahan panas?',
    options: ['Koki', 'Pemadam Kebakaran', 'Polisi', 'Dokter'],
    correctIndex: 1,
    hint: 'Mengendarai truk pemadam merah gagah berbunyi sirine nyaring.',
    explanation: 'Pintar! Pemadam kebakaran adalah pahlawan pemberani yang mempertaruhkan keselamatan demi memadamkan api dan menolong warga.'
  },
  {
    id: 5,
    question: 'Siapakah yang menerbangkan pesawat terbang di angkasa dan membawa penumpang ke kota yang jauh?',
    options: ['Nelayan', 'Petani', 'Pilot', 'Guru'],
    correctIndex: 2,
    hint: 'Duduk di kokpit pesawat dan memantau instrumen navigasi penerbangan.',
    explanation: 'Keren! Pilot memiliki keterampilan khusus menerbangkan pesawat melintasi langit dengan aman.'
  },
  {
    id: 6,
    question: 'Siapakah yang berlayar ke tengah laut luas di malam hari menebarkan jaring untuk menangkap ikan segar?',
    options: ['Nelayan', 'Guru', 'Dokter', 'Polisi'],
    correctIndex: 0,
    hint: 'Membawa perahu kayu berpelampung dan kotak es pendingin ikan.',
    explanation: 'Tepat! Nelayan menerjang ombak samudera demi menyediakan pasokan ikan segar bergizi untuk masyarakat.'
  },
  {
    id: 7,
    question: 'Siapakah yang ahli meracik aneka bumbu rempah dan memasak makanan lezat di restoran atau hotel?',
    options: ['Pilot', 'Koki (Chef)', 'Petani', 'Pemadam'],
    correctIndex: 1,
    hint: 'Mengenakan celemek dan topi putih tinggi di hadapan wajan kompor.',
    explanation: 'Hebat! Koki adalah seniman kuliner yang mengolah bahan makanan segar menjadi santapan yang lezat dan bergizi.'
  },
  {
    id: 8,
    question: 'Siapakah yang bertugas menjaga keamanan lingkungan, mengurai kemacetan jalan, dan menolong warga yang tersesat?',
    options: ['Polisi', 'Koki', 'Nelayan', 'Guru'],
    correctIndex: 0,
    hint: 'Mengenakan seragam dinas berlogo lambang negara dan meniup peluit nyaring.',
    explanation: 'Pintar! Polisi mengabdi demi ketertiban masyarakat dan keselamatan lalu lintas di jalan raya.'
  },
  {
    id: 9,
    question: 'Ketika ada siswa yang belum lancar membaca, siapakah yang membimbing dengan teliti dan penuh kasih sayang?',
    options: ['Pilot', 'Nelayan', 'Guru', 'Koki'],
    correctIndex: 2,
    hint: 'Setiap hari mendampingi proses belajar mengajar di sekolah.',
    explanation: 'Benar sekali! Guru dengan sabar membimbing setiap siswa hingga mampu menguasai keterampilan membaca dan berhitung.'
  },
  {
    id: 10,
    question: 'Siapakah yang memberikan imunisasi dan vaksinasi pada anak-anak agar terlindung dari serangan kuman penyakit?',
    options: ['Dokter', 'Petani', 'Polisi', 'Pilot'],
    correctIndex: 0,
    hint: 'Memeriksa kesehatan di Puskesmas atau Posyandu anak.',
    explanation: 'Luar biasa! Dokter dan tenaga medis memberikan vaksin pelindung agar tubuh anak kebal terhadap penyakit menular.'
  },
  {
    id: 11,
    question: 'Siapakah yang mengendarai traktor membajak sawah saat musim tanam baru dimulai?',
    options: ['Petani', 'Guru', 'Dokter', 'Pemadam'],
    correctIndex: 0,
    hint: 'Bekerja di hamparan tanah lapang berlumpur yang subur.',
    explanation: 'Tepat! Petani menggunakan traktor modern untuk mengolah tanah sawah agar siap ditanami benih padi.'
  },
  {
    id: 12,
    question: 'Alat apakah yang disambungkan ke pipa hydrant air saat mobil pemadam sedang kehabisan pasokan air di lokasi kebakaran?',
    options: ['Selang Pemadam Khusus', 'Jaring Ikan', 'Stetoskop', 'Cangkul'],
    correctIndex: 0,
    hint: 'Selang kanvas tebal bertekanan tinggi penyalur debit air besar.',
    explanation: 'Petugas pemadam kebakaran menyambungkan selang khusus ke hydrant kota untuk memompa air menuju titik api.'
  }
];

// Expanded Mini Game 3: Siapa Aku? Riddles (8 teka-teki unik mencakup seluruh profesi)
export const WHO_AM_I_RIDDLES = [
  {
    id: 1,
    professionId: 'guru',
    professionName: 'Guru',
    hints: [
      'Aku bekerja di sebuah gedung yang penuh dengan anak-anak ceria.',
      'Setiap hari aku membawa buku dan menulis materi di papan tulis.',
      'Aku membantu siswa belajar membaca, menulis, dan berhitung.',
      'Siapakah aku?'
    ],
    options: ['Guru', 'Dokter', 'Polisi', 'Koki'],
    correctIndex: 0,
    explanation: 'Aku adalah Guru! Tugasku mendidik dan membimbing siswa di sekolah setiap hari.'
  },
  {
    id: 2,
    professionId: 'nelayan',
    professionName: 'Nelayan',
    hints: [
      'Aku bekerja saat matahari terbenam hingga fajar menyingsing.',
      'Tempat kerjaku adalah perahu yang bergoyang di atas air laut yang luas.',
      'Aku menebar jaring untuk menangkap ikan segar bergizi.',
      'Siapakah aku?'
    ],
    options: ['Petani', 'Nelayan', 'Pilot', 'Pemadam'],
    correctIndex: 1,
    explanation: 'Aku adalah Nelayan! Aku berlayar ke laut untuk membawa pulang ikan segar bagi masyarakat.'
  },
  {
    id: 3,
    professionId: 'koki',
    professionName: 'Koki',
    hints: [
      'Tempat kerjaku harum dengan aroma rempah dan bumbu lezat.',
      'Aku memakai topi putih tinggi yang bersih dan celemek kain.',
      'Aku memegang wajan dan spatula untuk memasak hidangan nikmat.',
      'Siapakah aku?'
    ],
    options: ['Koki (Chef)', 'Dokter', 'Guru', 'Pilot'],
    correctIndex: 0,
    explanation: 'Aku adalah Koki! Aku meracik bahan segar menjadi hidangan yang lezat dan bergizi di restoran.'
  },
  {
    id: 4,
    professionId: 'polisi',
    professionName: 'Polisi',
    hints: [
      'Aku mengenakan seragam dinas yang rapi dan topi berlogo lambang negara.',
      'Aku sering meniup peluit di persimpangan jalan saat ramai kendaraan.',
      'Aku menjaga keamanan warga dan menolong orang yang tersesat.',
      'Siapakah aku?'
    ],
    options: ['Pemadam Kebakaran', 'Polisi', 'Petani', 'Nelayan'],
    correctIndex: 1,
    explanation: 'Aku adalah Polisi! Aku bertugas menjaga ketertiban lalu lintas dan keamanan seluruh masyarakat.'
  },
  {
    id: 5,
    professionId: 'dokter',
    professionName: 'Dokter',
    hints: [
      'Aku mengenakan jas putih yang bersih di ruangan yang sejuk dan steril.',
      'Alat di leherku bisa mendengarkan detak jantung pasien yang berdegup.',
      'Aku menuliskan resep obat agar tubuh orang yang sakit kembali pulih.',
      'Siapakah aku?'
    ],
    options: ['Dokter', 'Koki', 'Guru', 'Pilot'],
    correctIndex: 0,
    explanation: 'Aku adalah Dokter! Tugasku menyembuhkan orang sakit dan menjaga kesehatan masyarakat.'
  },
  {
    id: 6,
    professionId: 'petani',
    professionName: 'Petani',
    hints: [
      'Aku bangun pagi-pagi sekali saat embun masih menempel di rerumputan.',
      'Caping bambu melindungi kepalaku dari teriknya panas matahari siang.',
      'Hasil panen padiku digiling menjadi beras untuk makan seluruh negeri.',
      'Siapakah aku?'
    ],
    options: ['Nelayan', 'Petani', 'Polisi', 'Dokter'],
    correctIndex: 1,
    explanation: 'Aku adalah Petani! Bekerja di sawah menghasilkan beras dan sayuran pangan pokok kita.'
  },
  {
    id: 7,
    professionId: 'pilot',
    professionName: 'Pilot',
    hints: [
      'Tempat dudukku berada di ruangan paling depan dengan ratusan tombol instrumen.',
      'Aku mengenakan seragam bergaris emas di pundak dan kacamata aviator.',
      'Aku membawa burung besi melintasi gumpalan awan putih di langit biru.',
      'Siapakah aku?'
    ],
    options: ['Pilot', 'Nelayan', 'Koki', 'Guru'],
    correctIndex: 0,
    explanation: 'Aku adalah Pilot! Menerbangkan pesawat udara mengantarkan penumpang ke berbagai penjuru dunia.'
  },
  {
    id: 8,
    professionId: 'pemadam',
    professionName: 'Pemadam Kebakaran',
    hints: [
      'Begitu alarm bahaya berbunyi, dalam 60 detik aku sudah siap meluncur.',
      'Truk besarku berwarna merah menyala dengan bunyi sirine meraung nyaring.',
      'Aku memegang selang air bertekanan besar untuk memadamkan kobaran api.',
      'Siapakah aku?'
    ],
    options: ['Pemadam Kebakaran', 'Polisi', 'Dokter', 'Petani'],
    correctIndex: 0,
    explanation: 'Aku adalah Petugas Pemadam Kebakaran! Siap siaga menantang bahaya demi menyelamatkan nyawa dan harta benda warga.'
  }
];

// Expanded Mini Game 4: Pilih Tempat Kerja (8 skenario unik berbeda untuk setiap profesi)
export const WORKPLACE_MATCH_ITEMS = [
  {
    id: 'wp_1',
    professionId: 'guru',
    professionName: 'Guru',
    question: 'Di manakah tempat kerja utama seorang Guru dalam membimbing dan mendidik para murid?',
    options: [
      { id: 'sekolah', name: 'Gedung Sekolah & Ruang Kelas', correct: true, icon: 'School' },
      { id: 'sawah', name: 'Hamparan Sawah', correct: false, icon: 'Trees' },
      { id: 'bandara', name: 'Landasan Bandara', correct: false, icon: 'Plane' }
    ],
    explanation: 'Guru membimbing siswa di ruang kelas dan perpustakaan sekolah yang nyaman untuk belajar.'
  },
  {
    id: 'wp_2',
    professionId: 'pilot',
    professionName: 'Pilot',
    question: 'Di manakah tempat kerja utama seorang Pilot saat mengemudikan pesawat udara?',
    options: [
      { id: 'restoran', name: 'Dapur Restoran', correct: false, icon: 'Utensils' },
      { id: 'kokpit', name: 'Kokpit Pesawat & Bandara Udara', correct: true, icon: 'Plane' },
      { id: 'rumahsakit', name: 'Ruang Rawat Inap', correct: false, icon: 'Building2' }
    ],
    explanation: 'Pilot mengemudikan pesawat dari ruang kokpit dan lepas landas dari bandara udara.'
  },
  {
    id: 'wp_3',
    professionId: 'petani',
    professionName: 'Petani',
    question: 'Di manakah tempat kerja seorang Petani membudidayakan tanaman padi dan sayuran?',
    options: [
      { id: 'laut', name: 'Laut Lepas Samudera', correct: false, icon: 'Waves' },
      { id: 'sawah', name: 'Persawahan & Ladang Subur', correct: true, icon: 'Tractor' },
      { id: 'pos_polisi', name: 'Kantor Polisi', correct: false, icon: 'Shield' }
    ],
    explanation: 'Petani bekerja di persawahan dan ladang subur yang dialiri air irigasi bersih.'
  },
  {
    id: 'wp_4',
    professionId: 'pemadam',
    professionName: 'Pemadam Kebakaran',
    question: 'Di manakah markas pos petugas pemadam kebakaran bersiaga 24 jam?',
    options: [
      { id: 'pos_damkar', name: 'Pos Pemadam Kebakaran & Truk Damkar', correct: true, icon: 'Flame' },
      { id: 'sekolah', name: 'Laboratorium Sekolah', correct: false, icon: 'School' },
      { id: 'pasar', name: 'Pasar Tradisional', correct: false, icon: 'Store' }
    ],
    explanation: 'Petugas pemadam bersiaga di Pos Pemadam Kebakaran dengan mobil tangki air siap meluncur.'
  },
  {
    id: 'wp_5',
    professionId: 'dokter',
    professionName: 'Dokter',
    question: 'Di manakah tempat kerja seorang Dokter dalam memeriksa pasien dan melakukan perawatan medis?',
    options: [
      { id: 'dermaga', name: 'Dermaga Kapal', correct: false, icon: 'Ship' },
      { id: 'rumahsakit', name: 'Rumah Sakit, Puskesmas, & Klinik', correct: true, icon: 'Cross' },
      { id: 'ladang', name: 'Ladang Jagung', correct: false, icon: 'Sun' }
    ],
    explanation: 'Dokter bekerja di rumah sakit dan puskesmas yang memiliki fasilitas medis higienis.'
  },
  {
    id: 'wp_6',
    professionId: 'nelayan',
    professionName: 'Nelayan',
    question: 'Di manakah tempat kerja utama seorang Nelayan dalam mencari tangkapan hasil laut?',
    options: [
      { id: 'laut', name: 'Perahu Nelayan di Laut Lepas & Dermaga', correct: true, icon: 'Waves' },
      { id: 'sekolah', name: 'Perpustakaan Sekolah', correct: false, icon: 'Book' },
      { id: 'kantor', name: 'Kantor Bank', correct: false, icon: 'Building' }
    ],
    explanation: 'Nelayan mengarungi lautan lepas dengan perahu untuk menebar jaring dan menepi di dermaga pelelangan ikan.'
  },
  {
    id: 'wp_7',
    professionId: 'koki',
    professionName: 'Koki',
    question: 'Di manakah seorang Koki menghabiskan waktunya meracik masakan dan menumis aneka bumbu?',
    options: [
      { id: 'dapur', name: 'Dapur Restoran & Hotel Berbintang', correct: true, icon: 'Utensils' },
      { id: 'sawah', name: 'Pematang Sawah', correct: false, icon: 'Trees' },
      { id: 'kokpit', name: 'Kokpit Pesawat', correct: false, icon: 'Plane' }
    ],
    explanation: 'Koki memasak di dapur higienis yang dilengkapi kompor bertekanan, wajan, oven, dan rak bumbu.'
  },
  {
    id: 'wp_8',
    professionId: 'polisi',
    professionName: 'Polisi',
    question: 'Di manakah tempat seorang Polisi bertugas melayani laporan warga dan menjaga keamanan jalan?',
    options: [
      { id: 'kantor_polisi', name: 'Kantor Polisi & Pos Lalu Lintas Jalan Raya', correct: true, icon: 'Shield' },
      { id: 'kebun', name: 'Kebun Teh', correct: false, icon: 'Leaf' },
      { id: 'dapur', name: 'Dapur Bakery', correct: false, icon: 'Cake' }
    ],
    explanation: 'Polisi bertugas di kantor kepolisian serta pos patroli di jalan raya untuk melayani masyarakat.'
  }
];

// Expanded Final Quiz Questions Pool (20 soal komprehensif, 10 dipilih acak & non-repetitif per sesi)
export const FINAL_QUIZ_POOL: QuizQuestion[] = [
  {
    id: 1,
    category: 'identifikasi',
    difficulty: 'Mudah',
    subject: 'PJOK',
    professionOrigin: 'Dokter',
    question: 'Profesi apakah yang bertugas memeriksa kesehatan orang yang sedang sakit dan memberikan resep obat?',
    options: ['Dokter', 'Guru', 'Nelayan', 'Petani'],
    correctAnswerIndex: 0,
    explanation: 'Dokter bertugas memeriksa gejala penyakit pasien dan memberi obat agar pasien lekas sembuh.',
    iconHint: 'Stethoscope'
  },
  {
    id: 2,
    category: 'alat',
    difficulty: 'Mudah',
    subject: 'PJOK',
    professionOrigin: 'Dokter',
    question: 'Alat apakah yang digunakan dokter untuk mendengarkan suara detak jantung dan paru-paru di dada?',
    options: ['Termometer', 'Stetoskop', 'Cangkul', 'Borgol'],
    correctAnswerIndex: 1,
    explanation: 'Stetoskop adalah alat khusus medis dengan tabung pendengar untuk memeriksa ritme detak jantung.',
    iconHint: 'Heart'
  },
  {
    id: 3,
    category: 'tempat',
    difficulty: 'Mudah',
    subject: 'SBdP',
    professionOrigin: 'Koki',
    question: 'Seorang koki profesional (chef) melakukan tugas memasak dan meracik menu hidangannya di...',
    options: ['Perpustakaan', 'Dapur Restoran atau Hotel', 'Pematang Sawah', 'Pos Pemadam'],
    correctAnswerIndex: 1,
    explanation: 'Koki bekerja di dapur restoran yang dilengkapi kompor, wajan, oven, dan perlengkapan memasak higienis.',
    iconHint: 'Utensils'
  },
  {
    id: 4,
    category: 'tugas',
    difficulty: 'Sedang',
    subject: 'PKn',
    professionOrigin: 'Polisi',
    question: 'Mengapa polisi sering berdiri di persimpangan jalan raya pada pagi hari saat warga mulai beraktivitas?',
    options: [
      'Menjual tiket kendaraan',
      'Mengatur kelancaran lalu lintas dan mencegah kecelakaan',
      'Menonton orang yang lewat',
      'Mengecek kualitas aspal jalan'
    ],
    correctAnswerIndex: 1,
    explanation: 'Polisi lalu lintas bertugas memastikan kendaraan berjalan tertib, aman, dan pejalan kaki dapat menyeberang dengan selamat.',
    iconHint: 'ShieldCheck'
  },
  {
    id: 5,
    category: 'alat',
    difficulty: 'Sedang',
    subject: 'Matematika',
    professionOrigin: 'Petani',
    question: 'Petani membutuhkan alat ini untuk menggali dan membalik tanah sawah agar menjadi gembur sebelum ditanami bibit padi. Alat tersebut adalah...',
    options: ['Jaring Ikan', 'Cangkul', 'Peluit', 'Spatula'],
    correctAnswerIndex: 1,
    explanation: 'Cangkul adalah alat bertangkai kayu dan bermata besi lebar yang digunakan petani untuk mengolah tanah sawah.',
    iconHint: 'Hammer'
  },
  {
    id: 6,
    category: 'tugas',
    difficulty: 'Sedang',
    subject: 'Bahasa Indonesia',
    professionOrigin: 'Pilot',
    question: 'Sebelum menerbangkan pesawat udara, hal penting yang WAJIB dilakukan oleh seorang pilot adalah...',
    options: [
      'Langsung tancap gas tanpa memeriksa apapun',
      'Memeriksa rencana penerbangan, cuaca, dan kondisi mesin pesawat',
      'Membuka jendela pesawat di udara',
      'Mematikan radio komunikasi dengan menara bandara'
    ],
    correctAnswerIndex: 1,
    explanation: 'Pilot wajib melakukan pemeriksaan pra-terbang (pre-flight check) demi menjamin keselamatan seluruh penumpang.',
    iconHint: 'Plane'
  },
  {
    id: 7,
    category: 'manfaat',
    difficulty: 'Sedang',
    subject: 'PJOK',
    professionOrigin: 'Nelayan',
    question: 'Ikan laut yang ditangkap oleh para nelayan sangat bermanfaat bagi kesehatan anak-anak sekolah karena...',
    options: [
      'Bisa dijadikan pajangan kamar tidur',
      'Kaya akan protein dan asam lemak Omega-3 untuk kecerdasan otak',
      'Rasanya manis seperti gula-gula permen',
      'Tidak perlu dimasak langsung bisa dimakan'
    ],
    correctAnswerIndex: 1,
    explanation: 'Ikan laut segar mengandung nutrisi penting seperti protein hewani dan Omega-3 yang membantu konsentrasi belajar anak.',
    iconHint: 'Fish'
  },
  {
    id: 8,
    category: 'alat',
    difficulty: 'Tantangan',
    subject: 'PJOK',
    professionOrigin: 'Pemadam',
    question: 'Petugas pemadam kebakaran mengenakan jaket dan helm tebal khusus saat memadamkan api. Tujuan utama pakaian ini adalah...',
    options: [
      'Agar terlihat gaya saat difoto di media sosial',
      'Melindungi tubuh dari suhu panas membara dan reruntuhan puing bangunan',
      'Supaya tubuh terasa hangat saat musim hujan',
      'Sebagai tanda pengenal untuk meminta uang tiket'
    ],
    correctAnswerIndex: 1,
    explanation: 'Baju pemadam terbuat dari serat khusus tahan api (Nomex) untuk melindungi tubuh petugas dari panas ekstrem dan bara api.',
    iconHint: 'Flame'
  },
  {
    id: 9,
    category: 'manfaat',
    difficulty: 'Tantangan',
    subject: 'PKn',
    professionOrigin: 'Guru',
    question: 'Guru sering disebut sebagai "Pahlawan Tanpa Tanda Jasa". Mengapa peran guru sangat mulia bagi kemajuan suatu bangsa?',
    options: [
      'Karena guru memiliki mobil yang paling cepat di jalan',
      'Karena guru mendidik anak-anak menjadi pribadi berilmu, bijaksana, dan siap membangun masa depan',
      'Karena guru memberikan pekerjaan rumah yang banyak',
      'Karena guru selalu tinggal di dalam sekolah'
    ],
    correctAnswerIndex: 1,
    explanation: 'Tanpa guru yang membimbing dan mendidik, tidak akan lahir dokter, insinyur, polisi, pilot, maupun pemimpin bangsa yang hebat.',
    iconHint: 'GraduationCap'
  },
  {
    id: 10,
    category: 'manfaat',
    difficulty: 'Tantangan',
    subject: 'PKn',
    professionOrigin: 'Petani & Nelayan',
    question: 'Bayangkan jika di dunia ini tidak ada petani dan tidak ada nelayan. Apa dampak terbesar yang akan terjadi pada kehidupan masyarakat?',
    options: [
      'Masyarakat akan kebingungan mencari tempat berlibur',
      'Masyarakat akan kekurangan pasokan beras, sayur, dan ikan untuk kebutuhan makan sehari-hari',
      'Harga mainan anak-anak akan menjadi sangat murah',
      'Jalanan kota akan menjadi sangat sepi dari kendaraan'
    ],
    correctAnswerIndex: 1,
    explanation: 'Setiap pekerjaan saling melengkapi. Petani dan nelayan adalah pahlawan ketahanan pangan yang menjamin kebutuhan makanan pokok kita tercukupi!',
    iconHint: 'Sparkles'
  },
  {
    id: 11,
    category: 'identifikasi',
    difficulty: 'Mudah',
    subject: 'PJOK',
    professionOrigin: 'Dokter & Tenaga Kesehatan',
    question: 'Siapakah orang yang bertugas merawat pasien yang sedang rawat inap di rumah sakit serta membantu dokter?',
    options: ['Perawat', 'Petani', 'Pilot', 'Koki'],
    correctAnswerIndex: 0,
    explanation: 'Perawat bekerja sama dengan dokter untuk memantau infus, suhu tubuh, dan kenyamanan pasien.',
    iconHint: 'Heart'
  },
  {
    id: 12,
    category: 'alat',
    difficulty: 'Mudah',
    subject: 'SBdP',
    professionOrigin: 'Petani',
    question: 'Topi anyaman bambu berbentuk kerucut lebar dengan motif seni tradisional yang dipakai petani saat menyiangi sawah disebut...',
    options: ['Baret', 'Caping', 'Helm Proyek', 'Mahkota'],
    correctAnswerIndex: 1,
    explanation: 'Caping adalah karya kriya anyaman bambu khas nusantara yang melindungi kepala petani dari terik matahari.',
    iconHint: 'Sun'
  },
  {
    id: 13,
    category: 'tugas',
    difficulty: 'Sedang',
    subject: 'Bahasa Indonesia',
    professionOrigin: 'Pilot & Komunikasi Aviasi',
    question: 'Apakah tugas seorang petugas pemandu lalu lintas udara (Air Traffic Controller / ATC) di bandara?',
    options: [
      'Membersihkan kaca jendela pesawat',
      'Memandu pilot lewat radio komunikasi saat lepas landas, terbang, dan mendarat agar aman',
      'Menjual tiket makanan di dalam kabin',
      'Mengangkat koper penumpang'
    ],
    correctAnswerIndex: 1,
    explanation: 'Petugas ATC di menara bandara mengatur jadwal dan jalur aman pesawat di udara melalui komunikasi radio.',
    iconHint: 'Radio'
  },
  {
    id: 14,
    category: 'manfaat',
    difficulty: 'Sedang',
    subject: 'PKn',
    professionOrigin: 'Masyarakat & Profesi',
    question: 'Bagaimanakah sikap yang baik ketika kita bertemu dengan bapak petugas pembersih jalan atau pemadam kebakaran?',
    options: [
      'Mengejek dan membuang sampah sembarangan',
      'Menghormati, bersikap sopan, dan mengucapkan terima kasih atas kerja kerasnya',
      'Berlari menjauh karena takut',
      'Pura-pura tidak melihat'
    ],
    correctAnswerIndex: 1,
    explanation: 'Semua pekerjaan yang halal dan bermanfaat bagi masyarakat wajib kita hormati dan hargai dengan santun sesuai nilai Pancasila.',
    iconHint: 'HeartHandshake'
  },
  {
    id: 15,
    category: 'tempat',
    difficulty: 'Mudah',
    subject: 'PKn',
    professionOrigin: 'Nelayan',
    question: 'Dermaga pelabuhan tempat para nelayan menurunkan dan menjual hasil tangkapan lautnya secara bersama-sama disebut...',
    options: ['Tempat Pelelangan Ikan (TPI)', 'Bengkel Pesawat', 'Stasiun Kereta', 'Terminal Bus'],
    correctAnswerIndex: 0,
    explanation: 'TPI adalah pusat transaksi ekonomi gotong royong nelayan dan pedagang ikan segar.',
    iconHint: 'Anchor'
  },
  {
    id: 16,
    category: 'alat',
    difficulty: 'Sedang',
    subject: 'Bahasa Indonesia',
    professionOrigin: 'Polisi',
    question: 'Alat komunikasi nirkabel genggam yang dipakai polisi untuk mengirimkan laporan suara sandi darurat disebut...',
    options: ['Walkie-Talkie (HT)', 'Kamera Film', 'Kompas Magnet', 'Penggaris Segitiga'],
    correctAnswerIndex: 0,
    explanation: 'Handy Talky (HT) memungkinkan polisi mengirim pesan suara secara cepat dan jelas saat menjaga ketertiban.',
    iconHint: 'Radio'
  },
  {
    id: 17,
    category: 'tugas',
    difficulty: 'Sedang',
    subject: 'SBdP',
    professionOrigin: 'Koki',
    question: 'Di sebuah restoran besar, selain memasak, apa tanggung jawab artistik seorang kepala koki (Executive Chef)?',
    options: [
      'Mencuci mobil pengunjung restoran',
      'Menyusun menu hidangan, merancang estetika plating makanan, dan menjaga kebersihan dapur',
      'Mematikan lampu kota di malam hari',
      'Memperbaiki jalan raya'
    ],
    correctAnswerIndex: 1,
    explanation: 'Kepala koki memimpin dapur, memastikan komposisi rasa lezat, dan menata tampilan piring secara artistik.',
    iconHint: 'Utensils'
  },
  {
    id: 18,
    category: 'alat',
    difficulty: 'Tantangan',
    subject: 'Matematika',
    professionOrigin: 'Pemadam',
    question: 'Sebuah mobil pemadam kebakaran memiliki selang dengan debit semprot 60 liter air per menit. Berapa liter air yang disemprotkan selama 5 menit?',
    options: [
      '60 liter',
      '300 liter',
      '120 liter',
      '500 liter'
    ],
    correctAnswerIndex: 1,
    explanation: 'Volume air = debit x waktu = 60 liter/menit x 5 menit = 300 liter air.',
    iconHint: 'Flame'
  },
  {
    id: 19,
    category: 'identifikasi',
    difficulty: 'Sedang',
    subject: 'PKn',
    professionOrigin: 'Pelaut & Maritim',
    question: 'Pekerjaan yang memimpin kapal laut berukuran besar mengarungi samudera nusantara demi menghubungkan pulau-pulau Indonesia disebut...',
    options: ['Nahkoda', 'Masinis', 'Sopir', 'Pilot'],
    correctAnswerIndex: 0,
    explanation: 'Nahkoda adalah kapten pemimpin kapal laut yang menjaga keselamatan pelayaran maritim Indonesia.',
    iconHint: 'Ship'
  },
  {
    id: 20,
    category: 'manfaat',
    difficulty: 'Tantangan',
    subject: 'PKn',
    professionOrigin: 'Semua Profesi',
    question: 'Mengapa keberagaman profesi di masyarakat membuat kehidupan kita menjadi mudah dan saling melengkapi?',
    options: [
      'Karena manusia bisa melakukan segalanya sendirian tanpa bantuan orang lain',
      'Karena setiap profesi memiliki keahlian berbeda, sehingga kebutuhan pangan, kesehatan, keamanan, dan pendidikan kita semua terpenuhi',
      'Supaya seragam pakaian menjadi warna-warni',
      'Agar jalanan menjadi lebih macet'
    ],
    correctAnswerIndex: 1,
    explanation: 'Manusia adalah makhluk sosial yang saling membutuhkan. Setiap profesi berjasa bagi kebaikan bersama!',
    iconHint: 'Sparkles'
  }
];

// Default 10 for backwards compatibility
export const FINAL_QUIZ_QUESTIONS: QuizQuestion[] = FINAL_QUIZ_POOL.slice(0, 10);
