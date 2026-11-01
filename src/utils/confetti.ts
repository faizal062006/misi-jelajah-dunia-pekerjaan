import confetti from 'canvas-confetti';

/**
 * Reusable Confetti Effects for Educational Celebration
 */

// Grand celebratory fireworks with dual cannons from left and right
export function fireGrandCelebrationConfetti() {
  const duration = 2.5 * 1000;
  const animationEnd = Date.now() + duration;
  const colors = ['#F59E0B', '#10B981', '#3B82F6', '#EC4899', '#8B5CF6', '#EF4444', '#FCD34D'];

  const interval: ReturnType<typeof setInterval> = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      clearInterval(interval);
      return;
    }

    const particleCount = 40 * (timeLeft / duration);

    // Left cannon
    confetti({
      particleCount,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors
    });

    // Right cannon
    confetti({
      particleCount,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors
    });
  }, 250);
}

// Gold star championship explosion for completing the final quiz
export function fireChampionshipConfetti() {
  // Center star burst
  confetti({
    particleCount: 120,
    spread: 100,
    origin: { y: 0.45 },
    colors: ['#F59E0B', '#FBBF24', '#FCD34D', '#FDE68A', '#FFFFFF']
  });

  // Delayed side burst
  setTimeout(() => {
    fireGrandCelebrationConfetti();
  }, 350);
}

// Mini-game completion confetti burst
export function fireMiniGameCompleteConfetti() {
  confetti({
    particleCount: 80,
    spread: 80,
    origin: { y: 0.55 },
    colors: ['#34D399', '#60A5FA', '#FBBF24', '#F472B6', '#A78BFA']
  });

  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 60,
      origin: { x: 0.1, y: 0.65 }
    });
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 60,
      origin: { x: 0.9, y: 0.65 }
    });
  }, 200);
}

// Quick gentle burst for individual question correct answer
export function fireCorrectAnswerConfetti() {
  confetti({
    particleCount: 35,
    spread: 50,
    origin: { y: 0.65 },
    colors: ['#10B981', '#34D399', '#FBBF24']
  });
}
