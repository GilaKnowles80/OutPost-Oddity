'use client';
import React, { useEffect, useRef } from 'react';

interface WeatherProps {
  season: string;
}

export default function WeatherOverlay({ season }: WeatherProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{ x: number; y: number; r: number; d: number; speed: number }> = [];
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Configure particle styles dynamically based on the current live season
    const maxParticles = season === 'Winter_Christmas' ? 120 : season === 'Spooky_Halloween' ? 25 : 0;

    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: season === 'Winter_Christmas' ? Math.random() * 3 + 1 : Math.random() * 5 + 2, // Snow size vs Ghostly fog motes
        d: Math.random() * maxParticles,
        speed: season === 'Winter_Christmas' ? Math.random() * 1.5 + 0.5 : Math.random() * 0.4 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Select the thematic seasonal color mapping
      if (season === 'Winter_Christmas') {
        ctx.fillStyle = 'rgba(230, 242, 255, 0.85)'; // Glowing neon purple-white snow
      } else if (season === 'Spooky_Halloween') {
        ctx.fillStyle = 'rgba(168, 85, 247, 0.2)'; // Eerie purple glowing embers
      } else {
        return;
      }

      ctx.beginPath();
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.moveTo(p.x, p.y);
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
      }
      ctx.fill();
      update();
    };

    const update = () => {
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speed;
        // Introduce a light swaying motion
        p.x += Math.sin(p.d) * 0.3; 

        // If particle hits the floor, loop it back to the top ceiling grid
        if (p.y > canvas.height) {
          particles[i] = {
            x: Math.random() * canvas.width,
            y: -10,
            r: p.r,
            d: p.d,
            speed: p.speed,
          };
        }
      }
    };

    const anim = () => {
      draw();
      animationFrameId = requestAnimationFrame(anim);
    };
    anim();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [season]);

  if (season !== 'Winter_Christmas' && season !== 'Spooky_Halloween') return null;

  return (
    <canvas 
      ref={canvasRef} 
      className="pointer-events-none fixed inset-0 z-50 mix-blend-screen"
    />
  );
}
