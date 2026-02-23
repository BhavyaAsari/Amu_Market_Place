"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function CelebrationBurst() {

  useEffect(() => {

    const duration = 2000;
    const end = Date.now() + duration;

    const colors = [
      "#9333ea", // purple-600
      "#a855f7", // purple-500
      "#c084fc", // purple-400
      "#22c55e", // green
      "#ffffff"
    ];

    //  1. FIREWORK UPWARD BURST
    confetti({
      particleCount: 150,
      spread: 80,
      startVelocity: 55,
      origin: { y: 1 },
      gravity: 0.9,
      ticks: 200,
      colors
    });

    //  Side fireworks
    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { x: 0.1, y: 0.9 },
        startVelocity: 45,
        colors
      });
    }, 300);

    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { x: 0.9, y: 0.9 },
        startVelocity: 45,
        colors
      });
    }, 300);

    //  2. SLOW CONFETTI RAIN
    const rain = setInterval(() => {
      if (Date.now() > end) {
        clearInterval(rain);
        return;
      }

      confetti({
        particleCount: 6,
        angle: 90,
        spread: 40,
        startVelocity: 15,
        gravity: 0.4,
        origin: {
          x: Math.random(),
          y: 0
        },
        colors
      });

    }, 200);

  }, []);

  return null;
}