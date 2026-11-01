import { Profession } from '../types/game';

export const PROFESSIONS_DATA: Profession[] = [
  {
    id: 'guru',
    name: 'Guru',
    title: 'Pendidik Generasi Penerus Bangsa',
    workplace: 'Sekolah (Ruang Kelas & Perpustakaan)',
    workplaceDescription: 'Ruang kelas yang ceria dengan papan tulis, meja kursi siswa, buku pelajaran, dan media belajar.',
    responsibilities: [
      'Mengajar siswa berbagai ilmu pengetahuan seperti membaca, menulis, berhitung, dan sains.',
      'Membimbing budi pekerti, sopan santun, dan karakter mulia siswa.',
      'Memeriksa tugas, membuat materi pembelajaran, dan mengevaluasi perkembangan siswa.',
      'Mendampingi siswa saat belajar dan beraktivitas di lingkungan sekolah.'
    ],
    tools: [
      { id: 'buku', name: 'Buku Pelajaran', description: 'Sumber ilmu pengetahuan untuk bahan mengajar siswa.', iconName: 'BookOpen' },
      { id: 'papan', name: 'Papan Tulis & Spidol', description: 'Media untuk menuliskan penjelasan dan materi di depan kelas.', iconName: 'Presentation' },
      { id: 'pulpen', name: 'Pulpen Penilai Merah', description: 'Digunakan untuk mengoreksi tugas dan memberi nilai pada siswa.', iconName: 'PenTool' }
    ],
    benefits: 'Guru membantu anak-anak menjadi pintar, berakhlak mulia, dan siap meraih cita-cita untuk memajukan bangsa.',
    dailyRoutine: [
      'Pukul 07.00: Menyambut siswa di depan gerbang dengan senyuman hangat.',
      'Pukul 07.30 - 12.00: Mengajar materi pelajaran di kelas dan berdiskusi.',
      'Pukul 12.30 - 14.00: Memeriksa tugas murid dan menyiapkan rencana pelajaran esok hari.'
    ],
    funFact: 'Tahukah kamu? Guru sering dijuluki "Pahlawan Tanpa Tanda Jasa" karena keikhlasannya mencerdaskan anak-anak bangsa!',
    narrativeText: 'Halo Petualang Cilik! Aku adalah seorang Guru. Setiap hari aku bekerja di sekolah untuk mendidik anak-anak agar pintar, kreatif, dan berbudi pekerti luhur. Belajar bersama siswa selalu membahagiakan!',
    subjectIntegration: {
      primarySubject: 'Bahasa Indonesia',
      secondarySubject: 'PKn',
      topicTitle: 'Kosakata Baku & Etika Musyawarah Kelas',
      applicationExample: 'Membaca teks cerita inspiratif, mencatat ide pokok paragraf, dan melatih siswa bermusyawarah secara tertib di kelas.'
    },
    colorTheme: {
      primary: '#3B82F6',
      bg: 'bg-blue-50',
      border: 'border-blue-300',
      accent: 'bg-blue-600 hover:bg-blue-700',
      text: 'text-blue-900'
    },
    mapCoords: { x: 50, y: 22 }
  },
  {
    id: 'dokter',
    name: 'Dokter',
    title: 'Penjaga Kesehatan & Penyembuh Penyakit',
    workplace: 'Rumah Sakit & Puskesmas',
    workplaceDescription: 'Ruang periksa yang bersih, steril, dan tenang dengan peralatan medis serta tempat tidur pasien.',
    responsibilities: [
      'Memeriksa pasien yang sedang sakit untuk mencari tahu penyebab sakitnya.',
      'Menuliskan resep obat yang tepat agar pasien cepat pulih dan sehat.',
      'Memberikan edukasi cara menjaga kebersihan diri dan pola makan sehat.',
      'Melakukan tindakan medis penanganan darurat saat ada orang terluka.'
    ],
    tools: [
      { id: 'stetoskop', name: 'Stetoskop', description: 'Alat untuk mendengarkan detak jantung dan suara paru-paru pasien.', iconName: 'Stethoscope' },
      { id: 'termometer', name: 'Termometer', description: 'Alat untuk mengukur suhu tubuh apakah pasien demam atau normal.', iconName: 'Thermometer' },
      { id: 'suntikan', name: 'Jarum Suntik & Vaksin', description: 'Digunakan untuk memberikan vaksin pelindung kekebalan tubuh.', iconName: 'Syringe' }
    ],
    benefits: 'Dokter membantu mengobati warga yang sakit sehingga masyarakat dapat kembali sehat, ceria, dan beraktivitas normal.',
    dailyRoutine: [
      'Pukul 08.00: Memeriksa kondisi pasien di ruang rawat inap.',
      'Pukul 09.00 - 14.00: Menerima pasien di klinik rawat jalan dan mendiagnosis.',
      'Pukul 14.00 - 16.00: Berdiskusi dengan tim perawat dan menyiapkan obat pasien.'
    ],
    funFact: 'Detak jantung anak-anak saat istirahat biasanya berdetak antara 70 hingga 110 kali per menit, dan dokter mendengarkannya dengan stetoskop!',
    narrativeText: 'Salam sehat, Petualang! Aku adalah seorang Dokter. Aku bertugas di rumah sakit untuk menolong orang-orang yang sakit, memeriksa detak jantung, dan memberikan resep obat agar tubuh mereka kembali kuat!',
    subjectIntegration: {
      primarySubject: 'PJOK',
      secondarySubject: 'Matematika',
      topicTitle: 'Pertolongan Pertama (P3K) & Takaran Dosis Obat',
      applicationExample: 'Menerapkan pola hidup bersih sehat, menangani luka ringan secara higienis, serta menghitung takaran sendok sirup obat anak.'
    },
    colorTheme: {
      primary: '#06B6D4',
      bg: 'bg-cyan-50',
      border: 'border-cyan-300',
      accent: 'bg-cyan-600 hover:bg-cyan-700',
      text: 'text-cyan-900'
    },
    mapCoords: { x: 68, y: 30 }
  },
  {
    id: 'polisi',
    name: 'Polisi',
    title: 'Penjaga Keamanan & Ketertiban Masyarakat',
    workplace: 'Kantor Polisi & Jalan Raya',
    workplaceDescription: 'Pos keamanan, ruang pelaporan warga, dan patroli di jalan raya dengan mobil serta motor patroli.',
    responsibilities: [
      'Menjaga keamanan lingkungan agar warga merasa aman dan damai.',
      'Mengatur lalu lintas di jalan raya agar tidak terjadi kemacetan dan kecelakaan.',
      'Menolong warga yang tersesat atau mengalami musibah di jalan.',
      'Menindak pelanggaran hukum dan menangkap pelaku kejahatan.'
    ],
    tools: [
      { id: 'borgol', name: 'Borgol', description: 'Alat pengaman dari logam untuk mengamankan pelaku kejahatan.', iconName: 'Lock' },
      { id: 'peluit', name: 'Peluit Polisi', description: 'Alat tiup bersuara nyaring untuk mengatur kendaraan di jalan raya.', iconName: 'Volume2' },
      { id: 'walkietalkie', name: 'Walkie-Talkie (HT)', description: 'Radio komunikasi nirkabel untuk berkoordinasi cepat antar petugas.', iconName: 'Radio' }
    ],
    benefits: 'Polisi membuat jalan raya tertib, lingkungan bebas dari kejahatan, dan seluruh masyarakat merasa aman beraktivitas.',
    dailyRoutine: [
      'Pukul 06.30 - 08.00: Mengatur lalu lintas pagi saat warga berangkat kerja dan anak sekolah.',
      'Pukul 09.00 - 13.00: Berpatroli keliling kota dan menerima laporan warga.',
      'Pukul 14.00 - 17.00: Melakukan penyuluhan keselamatan berkendara di sekolah-sekolah.'
    ],
    funFact: 'Selain mobil dan motor, polisi di beberapa kota besar juga berpatroli memakai sepeda dan sepatu roda yang ramah lingkungan!',
    narrativeText: 'Siap grak, Petualang! Aku adalah seorang Polisi. Tugasku menjaga keamanan warga dan mengatur ketertiban lalu lintas. Jangan takut pada polisi ya, kami adalah sahabat masyarakat!',
    subjectIntegration: {
      primarySubject: 'PKn',
      secondarySubject: 'PJOK',
      topicTitle: 'Norma Hukum, Rambu Lalu Lintas, & Kebugaran Fisik',
      applicationExample: 'Mengenal aturan hak dan kewajiban menyeberang di zebra cross, serta melatih ketangkasan dan disiplin baris-berbaris.'
    },
    colorTheme: {
      primary: '#4F46E5',
      bg: 'bg-indigo-50',
      border: 'border-indigo-300',
      accent: 'bg-indigo-600 hover:bg-indigo-700',
      text: 'text-indigo-900'
    },
    mapCoords: { x: 26, y: 35 }
  },
  {
    id: 'petani',
    name: 'Petani',
    title: 'Penghasil Pangan Utama Masyarakat',
    workplace: 'Persawahan & Ladang Pertanian',
    workplaceDescription: 'Hamparan sawah hijau terasering yang luas, saluran irigasi air, dan pematang sawah yang asri.',
    responsibilities: [
      'Membajak dan mengolah tanah sawah agar gembur dan subur.',
      'Menanam bibit padi, sayur-mayur, atau buah-buahan.',
      'Mengairi sawah serta merawat tanaman dari serangan hama.',
      'Memanen padi yang telah menguning untuk diolah menjadi beras makanan pokok.'
    ],
    tools: [
      { id: 'cangkul', name: 'Cangkul', description: 'Alat utama untuk menggali, meratakan, dan mengolah tanah sawah.', iconName: 'Hammer' },
      { id: 'caping', name: 'Topi Caping Anyaman', description: 'Topi anyaman bambu lebar untuk melindungi kepala dari panas terik matahari.', iconName: 'Sun' },
      { id: 'sabit', name: 'Sabit Panen', description: 'Pisau melengkung khusus untuk memotong batang padi saat musim panen.', iconName: 'Scissors' }
    ],
    benefits: 'Petani memproduksi beras, sayuran, dan makanan pokok yang kita makan setiap hari untuk memberi energi tubuh kita.',
    dailyRoutine: [
      'Pukul 05.30: Menuju sawah saat udara masih sejuk dan matahari baru terbit.',
      'Pukul 06.00 - 11.00: Mengairi saluran sawah, mencangkul tanah, dan menyiangi gulma.',
      'Pukul 14.00 - 17.00: Memeriksa pertumbuhan tanaman dan memupuk tanaman.'
    ],
    funFact: 'Indonesia memiliki tradisi sawah berundak-undak yang sangat terkenal di dunia bernama Subak di Bali!',
    narrativeText: 'Halo Petualang! Aku adalah Petani. Dari kerja keras kami di sawah yang hijau terhampar luas, lahirlah bulir-bulir beras yang setiap hari menjadi nasi lezat di meja makanmu!',
    subjectIntegration: {
      primarySubject: 'Matematika',
      secondarySubject: 'SBdP',
      topicTitle: 'Luas Petak Persegi Panjang & Seni Anyaman Bambu',
      applicationExample: 'Menghitung luas petak sawah menggunakan rumus panjang kali lebar serta menggambar motif dekoratif anyaman topi caping.'
    },
    colorTheme: {
      primary: '#16A34A',
      bg: 'bg-emerald-50',
      border: 'border-emerald-300',
      accent: 'bg-emerald-600 hover:bg-emerald-700',
      text: 'text-emerald-900'
    },
    mapCoords: { x: 34, y: 62 }
  },
  {
    id: 'pilot',
    name: 'Pilot',
    title: 'Pengemudi Burung Besi di Angkasa',
    workplace: 'Bandara & Kokpit Pesawat Terbang',
    workplaceDescription: 'Ruang kokpit canggih penuh tombol instrumen, kaca kemudi, dan landasan pacu bandara udara.',
    responsibilities: [
      'Menerbangkan pesawat udara mengangkut penumpang dan barang antar pulau atau antar negara.',
      'Memeriksa rencana penerbangan, kondisi cuaca, dan kelayakan mesin pesawat sebelum terbang.',
      'Berkomunikasi dengan petugas pemandu lalu lintas udara (ATC).',
      'Mendaratkan pesawat dengan mulus dan aman di bandara tujuan.'
    ],
    tools: [
      { id: 'kemudi', name: 'Kompas & Radar Navigasi', description: 'Instrumen canggih untuk menentukan arah terbang dan menghindari awan badai.', iconName: 'Compass' },
      { id: 'headset', name: 'Headset Aviasi', description: 'Alat dengar dan mikrofon untuk berbicara dengan menara pengawas bandara.', iconName: 'Headphones' },
      { id: 'logbook', name: 'Flight Logbook', description: 'Buku catatan resmi riwayat jam terbang dan rute pesawat.', iconName: 'FileText' }
    ],
    benefits: 'Pilot menghubungkan orang-orang ke berbagai kota dan negara di seluruh dunia dalam waktu singkat dan aman.',
    dailyRoutine: [
      '2 jam sebelum terbang: Melakukan briefing rute cuaca dan mengecek kondisi fisik pesawat.',
      'Saat terbang: Mengemudikan pesawat di ketinggian 30.000 kaki dengan panduan navigasi.',
      'Setelah mendarat: Menyerahkan laporan penerbangan dan memastikan penumpang turun dengan selamat.'
    ],
    funFact: 'Pesawat modern memiliki sistem autopilot otomatis, namun saat lepas landas dan mendarat, pilot harus mengendalikannya secara langsung dengan sangat teliti!',
    narrativeText: 'Salam terbang tinggi, Petualang! Aku adalah seorang Pilot. Bersama burung besi raksasa, aku menjelajahi langit biru mengantarkan jutaan penumpang melintasi samudera dan pegunungan!',
    subjectIntegration: {
      primarySubject: 'Matematika',
      secondarySubject: 'Bahasa Indonesia',
      topicTitle: 'Perhitungan Jarak Tempuh & Teks Prosedur Kokpit',
      applicationExample: 'Menghitung waktu tempuh perjalanan udara (kecepatan x waktu) serta membaca teks instruksi prosedur keselamatan aviasi.'
    },
    colorTheme: {
      primary: '#0284C7',
      bg: 'bg-sky-50',
      border: 'border-sky-300',
      accent: 'bg-sky-600 hover:bg-sky-700',
      text: 'text-sky-900'
    },
    mapCoords: { x: 78, y: 55 }
  },
  {
    id: 'nelayan',
    name: 'Nelayan',
    title: 'Penjelajah Samudera Pembawa Hasil Laut',
    workplace: 'Laut Lepas, Dermaga, & Perahu Nelayan',
    workplaceDescription: 'Perahu kayu bermesin di laut luas, dermaga tempat berlabuh, dan tempat pelelangan ikan yang ramai.',
    responsibilities: [
      'Berlayar ke laut mencari lokasi ikan yang melimpah dengan membaca tanda alam dan angin.',
      'Menebarkan jaring dan menarik hasil tangkapan ikan segar dari laut.',
      'Merawat perahu kayu, mesin kapal, dan memperbaiki jaring yang rusak.',
      'Membawa ikan hasil tangkapan ke dermaga untuk dijual kepada masyarakat.'
    ],
    tools: [
      { id: 'jaring', name: 'Jaring Ikan', description: 'Anyaman benang kuat untuk menangkap kelompok ikan di perairan laut.', iconName: 'Grid' },
      { id: 'dayung', name: 'Kompas Laut & Pelampung', description: 'Peralatan keselamatan agar tidak tenggelam dan alat navigasi di tengah laut.', iconName: 'LifeBuoy' },
      { id: 'coolbox', name: 'Kotak Es Pendingin', description: 'Wadah berisi es batu untuk menjaga ikan tetap segar sampai ke daratan.', iconName: 'Box' }
    ],
    benefits: 'Nelayan menyediakan ikan segar yang kaya protein dan nutrisi Omega-3 yang sangat penting untuk kecerdasan otak anak-anak!',
    dailyRoutine: [
      'Pukul 17.00: Berangkat berlayar ke laut lepas saat senja tiba.',
      'Pukul 22.00 - 03.00: Memasang jaring di bawah sinar bintang dan cahaya lampu pemanggil ikan.',
      'Pukul 06.00: Pulang ke dermaga membawa ratusan kilogram ikan segar untuk warga.'
    ],
    funFact: 'Nelayan tradisional zaman dahulu bisa mengetahui arah mata angin di laut hanya dengan melihat posisi rasi bintang di langit malam!',
    narrativeText: 'Ahoy, Petualang Bahari! Aku adalah seorang Nelayan. Setiap malam aku menantang ombak samudera untuk menangkap ikan segar bergizi tinggi agar anak-anak Indonesia tumbuh sehat dan cerdas!',
    subjectIntegration: {
      primarySubject: 'PKn',
      secondarySubject: 'SBdP',
      topicTitle: 'Kedaulatan Maritim Indonesia & Seni Ukir Perahu Tradisional',
      applicationExample: 'Menghargai kekayaan bahari nusantara sebagai wujud persatuan, serta mengamati seni hiasan ukiran warna-warni pada lambung perahu.'
    },
    colorTheme: {
      primary: '#0D9488',
      bg: 'bg-teal-50',
      border: 'border-teal-300',
      accent: 'bg-teal-600 hover:bg-teal-700',
      text: 'text-teal-900'
    },
    mapCoords: { x: 52, y: 76 }
  },
  {
    id: 'koki',
    name: 'Koki',
    title: 'Seniman Kuliner & Penyaji Makanan Lezat',
    workplace: 'Restoran & Dapur Hotel',
    workplaceDescription: 'Dapur bersih dengan deretan kompor api besar, rak rempah-rempah wangi, dan pisau tertata rapi.',
    responsibilities: [
      'Memilih bahan masakan yang segar, bergizi, dan higienis.',
      'Meracik bumbu rempah pilihan dengan resep masakan yang lezat.',
      'Memasak makanan dengan teknik yang benar dan menjaga kebersihan dapur.',
      'Menyajikan makanan di piring dengan hiasan menarik (plating) untuk pengunjung.'
    ],
    tools: [
      { id: 'wajan', name: 'Wajan Penggorengan & Spatula', description: 'Wajan logam dan sodet untuk menumis dan memasak aneka hidangan hangat.', iconName: 'Utensils' },
      { id: 'pisau', name: 'Pisau Koki & Talenan', description: 'Pisau tajam berkualitas untuk memotong sayuran, daging, dan bumbu dapur.', iconName: 'Slice' },
      { id: 'topikoki', name: 'Topi Koki (Toque)', description: 'Topi putih tinggi untuk menjaga kebersihan agar rambut tidak jatuh ke makanan.', iconName: 'Smile' }
    ],
    benefits: 'Koki menyajikan makanan bergizi, nikmat, dan higienis yang memberikan kebahagiaan serta energi bagi para penikmatnya.',
    dailyRoutine: [
      'Pukul 07.00: Belanja bahan sayur dan daging segar terbaik di pasar.',
      'Pukul 09.00 - 11.30: Memotong bahan dan menyiapkan kuah kaldu serta bumbu.',
      'Pukul 12.00 - 15.00 & 18.00 - 21.00: Memasak pesanan pengunjung restoran secara cepat dan lezat.'
    ],
    funFact: 'Tahukah kamu? Lipatan pada topi koki zaman dulu melambangkan seberapa banyak cara koki tersebut bisa memasak telur!',
    narrativeText: 'Bon appetit, Petualang Cilik! Aku adalah seorang Koki atau Chef. Aku suka meracik aneka bumbu nusantara menjadi hidangan yang lezat, harum, dan bergizi untuk keluarga!',
    subjectIntegration: {
      primarySubject: 'SBdP',
      secondarySubject: 'Matematika',
      topicTitle: 'Seni Penataan Makanan (Plating) & Pecahan Takaran Resep',
      applicationExample: 'Menerapkan harmoni visual warna pada penyajian makanan, serta menghitung pecahan 1/2 sendok teh garam dan 1/4 liter santan.'
    },
    colorTheme: {
      primary: '#EA580C',
      bg: 'bg-orange-50',
      border: 'border-orange-300',
      accent: 'bg-orange-600 hover:bg-orange-700',
      text: 'text-orange-900'
    },
    mapCoords: { x: 62, y: 60 }
  },
  {
    id: 'pemadam',
    name: 'Pemadam Kebakaran',
    title: 'Pahlawan Penyelamat Api & Bencana',
    workplace: 'Pos Pemadam Kebakaran & Lokasi Bencana',
    workplaceDescription: 'Garasi truk pemadam merah gagah, tiang seluncur cepat, serta perlengkapan baju tahan api.',
    responsibilities: [
      'Memadamkan kobaran api saat terjadi bencana kebakaran bangunan atau hutan.',
      'Menyelamatkan manusia atau hewan peliharaan yang terjebak di tempat berbahaya.',
      'Membantu evakuasi korban bencana alam seperti pohon tumbang atau banjir.',
      'Mengajarkan warga cara pencegahan bahaya api dan cara menggunakan APAR.'
    ],
    tools: [
      { id: 'selang', name: 'Selang Pemadam & Nozzle', description: 'Selang kanvas tebal bertekanan tinggi untuk menyemprotkan air ke titik api.', iconName: 'Activity' },
      { id: 'helm', name: 'Helm & Jaket Tahan Panas', description: 'Pakaian pelindung khusus yang tahan suhu panas tinggi dan benturan puing.', iconName: 'Shield' },
      { id: 'kapak', name: 'Kapak Penyelamat & Tangga', description: 'Alat untuk membongkar pintu atau jendela yang terkunci demi menyelamatkan korban.', iconName: 'Axe' }
    ],
    benefits: 'Petugas pemadam kebakaran melindungi nyawa dan harta benda warga dari amukan api dan siap siaga menolong dalam kondisi darurat apa pun.',
    dailyRoutine: [
      'Pukul 08.00: Apel pagi dan memeriksa fungsi mesin truk pemadam serta tekanan air tangki.',
      'Siaga 24 Jam: Siap meluncur dalam waktu kurang dari 60 detik begitu alarm darurat berbunyi!',
      'Pukul 10.00: Latihan fisik dan simulasi penyelamatan di medan sulit.'
    ],
    funFact: 'Petugas pemadam kebakaran tidak hanya memadamkan api, mereka juga sering menolong kucing yang tersangkut di atas pohon tinggi!',
    narrativeText: 'Tetap waspada, Petualang Pemberani! Aku adalah Petugas Pemadam Kebakaran. Kami siap siaga 24 jam menembus bahaya untuk melindungi masyarakat dan memadamkan api!',
    subjectIntegration: {
      primarySubject: 'PJOK',
      secondarySubject: 'Matematika',
      topicTitle: 'Kebugaran Daya Tahan Fisik & Debit Aliran Air Selang',
      applicationExample: 'Melatih kapasitas fisik pernapasan dan kekuatan otot saat evakuasi, serta menghitung debit aliran air pompa 600 liter/menit.'
    },
    colorTheme: {
      primary: '#DC2626',
      bg: 'bg-rose-50',
      border: 'border-rose-300',
      accent: 'bg-rose-600 hover:bg-rose-700',
      text: 'text-rose-900'
    },
    mapCoords: { x: 33, y: 32 }
  }
];
