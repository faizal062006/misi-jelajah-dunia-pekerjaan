import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateScore,
  checkToolMatch,
  checkWorkplaceMatch,
  calculateProgress,
  calculateStars,
  getMedalTier,
  isWorldFullyExplored,
  shuffleArray,
  getRandomSlice
} from './rules';

test('calculateScore increments and clamps values', () => {
  assert.equal(calculateScore(10, 10), 20);
  assert.equal(calculateScore(0, 10), 10);
  assert.equal(calculateScore(5, -10), 0, 'Score should not drop below 0');
});

test('checkToolMatch validates tool assignment to professions', () => {
  assert.equal(checkToolMatch('tool_stetoskop', 'dokter'), true);
  assert.equal(checkToolMatch('tool_cangkul', 'petani'), true);
  assert.equal(checkToolMatch('tool_buku', 'guru'), true);
  assert.equal(checkToolMatch('tool_kompas', 'pilot'), true);
  assert.equal(checkToolMatch('tool_jaring', 'nelayan'), true);
  assert.equal(checkToolMatch('tool_wajan', 'koki'), true);
  assert.equal(checkToolMatch('tool_selang', 'pemadam'), true);
  assert.equal(checkToolMatch('tool_borgol', 'polisi'), true);

  // Mismatches
  assert.equal(checkToolMatch('tool_stetoskop', 'petani'), false);
  assert.equal(checkToolMatch('tool_cangkul', 'dokter'), false);
  assert.equal(checkToolMatch('invalid_id', 'dokter'), false);
});

test('checkWorkplaceMatch correctly validates workplace pairings', () => {
  assert.equal(checkWorkplaceMatch('guru', 'sekolah'), true);
  assert.equal(checkWorkplaceMatch('dokter', 'rumahsakit'), true);
  assert.equal(checkWorkplaceMatch('polisi', 'kantor_polisi'), true);
  assert.equal(checkWorkplaceMatch('petani', 'sawah'), true);
  assert.equal(checkWorkplaceMatch('pilot', 'bandara'), true);
  assert.equal(checkWorkplaceMatch('nelayan', 'laut'), true);
  assert.equal(checkWorkplaceMatch('koki', 'restoran'), true);
  assert.equal(checkWorkplaceMatch('pemadam', 'pos_damkar'), true);

  // Mismatches
  assert.equal(checkWorkplaceMatch('guru', 'laut'), false);
  assert.equal(checkWorkplaceMatch('pilot', 'dapur'), false);
});

test('calculateProgress aggregates exploration, mini-games, and final quiz', () => {
  // Empty progress
  assert.equal(calculateProgress(0, 0, false), 0);

  // All 8 professions visited (40%)
  assert.equal(calculateProgress(8, 0, false), 40);

  // 8 visited + 4 mini-games complete (40% + 30% = 70%)
  assert.equal(calculateProgress(8, 4, false), 70);

  // Everything 100% complete
  assert.equal(calculateProgress(8, 4, true), 100);
});

test('calculateStars awards 1 to 3 stars accurately', () => {
  assert.equal(calculateStars(100, 100), 3);
  assert.equal(calculateStars(80, 100), 3);
  assert.equal(calculateStars(50, 100), 2);
  assert.equal(calculateStars(20, 100), 1);
  assert.equal(calculateStars(10, 100), 0);
});

test('getMedalTier rewards correct medal levels', () => {
  const gold = getMedalTier(200);
  assert.equal(gold.tier, 'Emas');

  const silver = getMedalTier(120);
  assert.equal(silver.tier, 'Perak');

  const bronze = getMedalTier(60);
  assert.equal(bronze.tier, 'Perunggu');

  const beginner = getMedalTier(20);
  assert.equal(beginner.tier, 'Petualang Cilik');
});

test('isWorldFullyExplored checks if 8 professions have been reached', () => {
  assert.equal(isWorldFullyExplored(['guru', 'dokter']), false);
  const eight = ['guru', 'dokter', 'polisi', 'petani', 'pilot', 'nelayan', 'koki', 'pemadam'];
  assert.equal(isWorldFullyExplored(eight), true);
});

test('shuffleArray preserves length and items without mutating original', () => {
  const original = [1, 2, 3, 4, 5, 6, 7, 8];
  const copy = [...original];
  const shuffled = shuffleArray(original);

  assert.equal(shuffled.length, original.length);
  assert.deepEqual(original, copy, 'Original array should not be mutated');
  // Contains all original items
  original.forEach(item => {
    assert.equal(shuffled.includes(item), true);
  });
});

test('getRandomSlice selects exact count of unique items', () => {
  const pool = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
  const slice = getRandomSlice(pool, 4);

  assert.equal(slice.length, 4);
  const uniqueItems = new Set(slice);
  assert.equal(uniqueItems.size, 4, 'All selected items must be unique');
});
