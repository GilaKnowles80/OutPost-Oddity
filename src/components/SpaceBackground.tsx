'use client';

import React, { useEffect } from 'react';

export default function SpaceBackground() {
  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.15';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width: number, height: number;
    const stars: Array<{ x: number; y: number; r: number; alpha: number; dir: number }> = [];

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }

    function initStars() {
      stars.length = 0;
      for (let i = 0; i < 150; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 1.5 + 0.5,
          alpha: Math.random(),
          dir: Math.random() > 0.5 ? 1 : -1,
        });
      }
    }

    const context = ctx!;

    function draw() {
      context.clearRect(0, 0, width, height);

      const gradient = context.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, Math.max(width, height)
      );
      gradient.addColorStop(0, 'rgba(74, 20, 140, 0.08)');
      gradient.addColorStop(1, 'rgba(15, 23, 42, 0)');
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);

      context.fillStyle = '#ffffff';
      for (const star of stars) {
        context.globalAlpha = star.alpha;
        context.beginPath();
        context.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        context.fill();
      }

      context.globalAlpha = 1;
    }

    function animate() {
      for (const star of stars) {
        star.alpha += 0.01 * star.dir;
        if (star.alpha > 1) star.alpha = 1;
        if (star.alpha < 0.2) star.alpha = 0.2;
      }
      draw();
      requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
      resize();
      initStars();
      draw();
    });

    resize();
    initStars();
    draw();
    animate();

    return () => {
      document.body.removeChild(canvas);
    };
  }, []);

  return null;
}
