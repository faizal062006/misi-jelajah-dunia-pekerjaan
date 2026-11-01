import { DRAG_TOOL_ITEMS } from '../data/questions';

/**
 * Pure scoring calculation
 */
export function calculateScore(currentScore: number, pointsToAdd: number): number {
  return Math.max(0, currentScore + pointsToAdd);
}

/**
 * Validates whether a tool matches the intended profession
 */
export function checkToolMatch(toolId: string, targetProfessionId: string): boolean {
  const item = DRAG_TOOL_ITEMS.find(t => t.id === toolId);
  if (!item) return false;
  return item.professionId.toLowerCase() === targetProfessionId.toLowerCase();
}

/**
 * Validates whether a workplace matches the profession
 */
export function checkWorkplaceMatch(professionId: string, selectedLocationKey: string): boolean {
  const map: Record<string, string[]> = {
    guru: ['sekolah', 'ruang_kelas', 'perpustakaan'],
    dokter: ['rumahsakit', 'puskesmas', 'klinik'],
    polisi: ['kantor_polisi', 'pos_polisi', 'jalan_raya'],
    petani: ['sawah', 'ladang'],
    pilot: ['bandara', 'kokpit', 'pesawat'],
    nelayan: ['laut', 'dermaga', 'perahu'],
    koki: ['restoran', 'dapur', 'hotel'],
    pemadam: ['pos_damkar', 'pos_pemadam', 'garasi_pemadam']
  };

  const allowed = map[professionId.toLowerCase()] || [];
  return allowed.includes(selectedLocationKey.toLowerCase());
}

/**
 * Calculates overall adventure progress percentage (0 - 100%)
 * Factors:
 * - Visited professions (8 items): 40%
 * - Completed mini games (4 games): 30%
 * - Final quiz completed: 30%
 */
export function calculateProgress(
  visitedCount: number,
  completedMinigamesCount: number,
  finalQuizCompleted: boolean
): number {
  const explorationPercent = Math.min(1, visitedCount / 8) * 40;
  const minigamesPercent = Math.min(1, completedMinigamesCount / 4) * 30;
  const quizPercent = finalQuizCompleted ? 30 : 0;
  return Math.round(explorationPercent + minigamesPercent + quizPercent);
}

/**
 * Determine earned stars (1 to 3 stars per activity)
 */
export function calculateStars(score: number, maxScore: number = 100): number {
  const ratio = score / maxScore;
  if (ratio >= 0.8) return 3;
  if (ratio >= 0.5) return 2;
  if (ratio >= 0.2) return 1;
  return 0;
}

export type MedalTier = 'Emas' | 'Perak' | 'Perunggu' | 'Petualang Cilik';

export interface MedalInfo {
  tier: MedalTier;
  title: string;
  badgeLabel: string;
  color: string;
  bgGradient: string;
  description: string;
}

/**
 * Determine explorer medal tier based on total earned score
 */
export function getMedalTier(totalScore: number): MedalInfo {
  if (totalScore >= 180) {
    return {
      tier: 'Emas',
      title: 'Medali Emas: Master Penjelajah Profesi',
      badgeLabel: 'MASTER EMAS',
      color: '#EAB308',
      bgGradient: 'from-amber-400 to-yellow-500',
      description: 'Luar biasa! Kamu menguasai seluruh wawasan profesi, tugas, alat kerja, dan tempat kerja dengan sempurna!'
    };
  }
  if (totalScore >= 110) {
    return {
      tier: 'Perak',
      title: 'Medali Perak: Ahli Penjelajah Profesi',
      badgeLabel: 'AHLI PERAK',
      color: '#94A3B8',
      bgGradient: 'from-slate-300 to-slate-400',
      description: 'Hebat! Pemahamanmu tentang aneka profesi di masyarakat sudah sangat mendalam!'
    };
  }
  if (totalScore >= 50) {
    return {
      tier: 'Perunggu',
      title: 'Medali Perunggu: Penjelajah Muda Cekatan',
      badgeLabel: 'PENJELAJAH MUDA',
      color: '#D97706',
      bgGradient: 'from-amber-600 to-amber-700',
      description: 'Bagus sekali! Kamu telah aktif menjelajahi dunia pekerjaan dan mengenal pahlawan masyarakat.'
    };
  }
  return {
    tier: 'Petualang Cilik',
    title: 'Lencana: Petualang Cilik',
    badgeLabel: 'PEMULA',
    color: '#3B82F6',
    bgGradient: 'from-blue-400 to-indigo-500',
    description: 'Terus jelajahi semua pos dan selesaikan tantangan untuk meraih medali kehormatan yang lebih tinggi!'
  };
}

/**
 * Checks whether all 8 professions have been visited/unlocked
 */
export function isWorldFullyExplored(visitedProfessions: string[], totalProfessions: number = 8): boolean {
  return visitedProfessions.length >= totalProfessions;
}

/**
 * Pure Fisher-Yates array shuffle (does not mutate original)
 */
export function shuffleArray<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Select N unique random items from a pool
 */
export function getRandomSlice<T>(items: T[], count: number): T[] {
  return shuffleArray(items).slice(0, count);
}
