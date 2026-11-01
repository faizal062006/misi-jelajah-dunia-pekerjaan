import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  PROFESSION_MISSION_POOLS,
  PROFESSION_SPECIFIC_MISSIONS,
  getRandomProfessionMission,
  GUESS_PROFESSION_QUESTIONS,
  WHO_AM_I_RIDDLES,
  WORKPLACE_MATCH_ITEMS,
  FINAL_QUIZ_POOL
} from '../data/questions';

describe('Question Pools & Randomization Integrity', () => {
  it('contains multi-question pools for all 8 professions', () => {
    const requiredProfessions = ['guru', 'dokter', 'polisi', 'petani', 'pilot', 'nelayan', 'koki', 'pemadam'];

    for (const prof of requiredProfessions) {
      assert.ok(PROFESSION_MISSION_POOLS[prof], `Mission pool for ${prof} must exist`);
      assert.ok(PROFESSION_MISSION_POOLS[prof].length >= 3, `${prof} must have at least 3 distinct mission questions`);

      // Verify questions are non-identical within the profession pool
      const questionsText = PROFESSION_MISSION_POOLS[prof].map(q => q.question);
      const uniqueQuestions = new Set(questionsText);
      assert.strictEqual(uniqueQuestions.size, questionsText.length, `Questions for ${prof} must be unique`);
    }
  });

  it('getRandomProfessionMission returns valid mission quiz with correct index mapping', () => {
    const mission = getRandomProfessionMission('guru');
    assert.ok(mission);
    assert.strictEqual(mission.professionId, 'guru');
    assert.strictEqual(mission.options.length, 4);
    assert.ok(mission.correctIndex >= 0 && mission.correctIndex < 4);
    assert.ok(mission.explanation.length > 10);
  });

  it('verifies mini game 1 questions pool is expanded and unique', () => {
    assert.ok(GUESS_PROFESSION_QUESTIONS.length >= 10);
    const questions = GUESS_PROFESSION_QUESTIONS.map(q => q.question);
    const set = new Set(questions);
    assert.strictEqual(set.size, questions.length, 'Mini Game 1 questions must be unique');
  });

  it('verifies mini game 3 riddles and mini game 4 workplaces are valid', () => {
    assert.strictEqual(WHO_AM_I_RIDDLES.length, 8);
    for (const r of WHO_AM_I_RIDDLES) {
      assert.ok(r.hints.length >= 3);
      assert.strictEqual(r.options.length, 4);
      assert.ok(r.correctIndex >= 0 && r.correctIndex < 4);
    }

    assert.strictEqual(WORKPLACE_MATCH_ITEMS.length, 8);
    for (const w of WORKPLACE_MATCH_ITEMS) {
      assert.ok(w.options.length >= 3);
      assert.ok(w.options.some((o: any) => o.correct === true || o.isCorrect === true));
    }
  });

  it('verifies final quiz pool contains 20 rich unique questions', () => {
    assert.strictEqual(FINAL_QUIZ_POOL.length, 20);
    const questions = FINAL_QUIZ_POOL.map(q => q.question);
    const uniqueQuestions = new Set(questions);
    assert.strictEqual(uniqueQuestions.size, 20, 'All 20 Final Quiz questions must be unique');

    for (const q of FINAL_QUIZ_POOL) {
      assert.strictEqual(q.options.length, 4);
      assert.ok(q.correctAnswerIndex >= 0 && q.correctAnswerIndex < 4);
      assert.ok(q.explanation.length > 10);
    }
  });
});
