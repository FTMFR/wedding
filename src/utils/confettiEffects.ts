import confetti from 'canvas-confetti';

/**
 * Fires a romantic shower of wedding rose petals and gold foil flecks
 */
export function triggerWeddingPetals() {
  const scalar = 1.2;
  const petalShapes = confetti.shapeFromPath({
    // Heart/petal-like gentle curved path
    path: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'
  });

  // Left burst
  confetti({
    particleCount: 30,
    angle: 60,
    spread: 55,
    origin: { x: 0, y: 0.7 },
    colors: ['#FCE7F3', '#F472B6', '#E2C2AA', '#E5E7EB', '#D4AF37'],
    shapes: [petalShapes, 'circle'],
    scalar,
    drift: 0.1,
    gravity: 0.7,
  });

  // Right burst
  confetti({
    particleCount: 30,
    angle: 120,
    spread: 55,
    origin: { x: 1, y: 0.7 },
    colors: ['#FCE7F3', '#F472B6', '#E2C2AA', '#E5E7EB', '#D4AF37'],
    shapes: [petalShapes, 'circle'],
    scalar,
    drift: -0.1,
    gravity: 0.7,
  });
}

/**
 * Fires sparkling champagne gold stars for dress reveals & wax seal cracking
 */
export function triggerGoldSparkle() {
  confetti({
    particleCount: 40,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#D4AF37', '#F3E5AB', '#C5A059', '#FFF8DC', '#E6CA65'],
    shapes: ['circle'],
    scalar: 0.9,
    ticks: 200,
    gravity: 0.8,
  });
}
