import { MataPelajaran } from '../types/game';

export interface SubjectCurriculumDetail {
  name: MataPelajaran;
  shortDesc: string;
  badgeBg: string;
  badgeText: string;
  borderColor: string;
  accentBg: string;
  icon: string;
  grade4Competency: string;
  relatedProfessions: string[];
}

export const SUBJECTS_LIST: MataPelajaran[] = [
  'Matematika',
  'PKn',
  'Bahasa Indonesia',
  'SBdP',
  'PJOK'
];

export const SUBJECT_METADATA: Record<MataPelajaran, SubjectCurriculumDetail> = {
  'Matematika': {
    name: 'Matematika',
    shortDesc: 'Operasi Hitung, Luas/Keliling, Debit, & Pecahan Kontekstual',
    badgeBg: 'bg-blue-100',
    badgeText: 'text-blue-800',
    borderColor: 'border-blue-400',
    accentBg: 'bg-blue-600',
    icon: 'Calculator',
    grade4Competency: 'Menghitung keliling/luas bangun datar (petani), pecahan senilai resep (koki), konversi satuan waktu & debit air (damkar).',
    relatedProfessions: ['petani', 'koki', 'pemadam', 'pilot', 'dokter']
  },
  'PKn': {
    name: 'PKn',
    shortDesc: 'Pendidikan Pancasila, Norma Hukum, Hak & Kewajiban Warga',
    badgeBg: 'bg-rose-100',
    badgeText: 'text-rose-800',
    borderColor: 'border-rose-400',
    accentBg: 'bg-rose-600',
    icon: 'ShieldCheck',
    grade4Competency: 'Menerapkan norma hukum di jalan raya (polisi), musyawarah mufakat (guru), gotong royong dan kedaulatan laut (nelayan).',
    relatedProfessions: ['polisi', 'guru', 'nelayan']
  },
  'Bahasa Indonesia': {
    name: 'Bahasa Indonesia',
    shortDesc: 'Teks Petunjuk, Kosakata Baku, Wawancara, & Gagasan Pokok',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-800',
    borderColor: 'border-emerald-400',
    accentBg: 'bg-emerald-600',
    icon: 'BookOpen',
    grade4Competency: 'Membaca teks petunjuk penggunaan checklist navigasi (pilot), kosakata baku profesi, dan menyusun pertanyaan wawancara.',
    relatedProfessions: ['guru', 'pilot', 'dokter']
  },
  'SBdP': {
    name: 'SBdP',
    shortDesc: 'Seni Budaya & Prakarya: Gambar Dekoratif, Desain & Kriya',
    badgeBg: 'bg-purple-100',
    badgeText: 'text-purple-800',
    borderColor: 'border-purple-400',
    accentBg: 'bg-purple-600',
    icon: 'Palette',
    grade4Competency: 'Mengenal karya gambar dekoratif motif anyaman caping (petani), plating estetika masakan (koki), dan seni kriya perahu tradisional (nelayan).',
    relatedProfessions: ['koki', 'petani', 'nelayan']
  },
  'PJOK': {
    name: 'PJOK',
    shortDesc: 'Pendidikan Jasmani: Kebugaran, P3K, & Ergonomi Sehat',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-800',
    borderColor: 'border-amber-400',
    accentBg: 'bg-amber-600',
    icon: 'Activity',
    grade4Competency: 'Melatih daya tahan jantung paru (pemadam), kebugaran jasmani aparat (polisi), dan memahami tindakan P3K pertolongan pertama luka/demam (dokter).',
    relatedProfessions: ['pemadam', 'dokter', 'polisi']
  }
};
