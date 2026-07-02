import React, { useEffect, useRef } from 'react';

interface DreamyBackgroundProps {
  brightness?: number;
}

interface CanvasStar {
  x: number;
  y: number;
  size: number;
  opacity: number;
  pulseSpeed: number;
  phase: number;
}

interface CanvasParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  wobble: number;
  wobbleSpeed: number;
}

interface CanvasCloud {
  x: number;
  y: number;
  radiusX: number;
  radiusY: number;
  vx: number;
  opacity: number;
}

interface CanvasLightRay {
  x: number;
  width: number;
  angle: number;
  speed: number;
  phase: number;
  maxOpacity: number;
}

export const DreamyBackground: React.FC<DreamyBackgroundProps> = React.memo(({ brightness = 0 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Initializations
    const stars: CanvasStar[] = [];
    const particles: CanvasParticle[] = [];
    const clouds: CanvasCloud[] = [];
    const lightRays: CanvasLightRay[] = [];

    // Create stars
    const starCount = 50;
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * (height * 0.75),
        size: Math.random() * 1.6 + 0.4,
        opacity: Math.random() * 0.8 + 0.2,
        pulseSpeed: 0.008 + Math.random() * 0.015,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // Create particles (glowing warm sparkles)
    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -0.12 - Math.random() * 0.2,
        size: Math.random() * 2.2 + 0.8,
        opacity: Math.random() * 0.6 + 0.2,
        color: ['#FFB7C5', '#FFFDF6', '#E6E6FA', '#D4AF37', '#A0E6FF'][Math.floor(Math.random() * 5)],
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.005 + Math.random() * 0.01,
      });
    }

    // Create soft puffy clouds
    const cloudCount = 5;
    for (let i = 0; i < cloudCount; i++) {
      clouds.push({
        x: Math.random() * width,
        y: height * 0.45 + Math.random() * (height * 0.4),
        radiusX: 140 + Math.random() * 90,
        radiusY: 70 + Math.random() * 35,
        vx: 0.015 + Math.random() * 0.025,
        opacity: 0.1 + Math.random() * 0.06,
      });
    }

    // Create cinematic light rays
    const rayCount = 3;
    for (let i = 0; i < rayCount; i++) {
      lightRays.push({
        x: width * 0.2 + Math.random() * (width * 0.6),
        width: 80 + Math.random() * 120,
        angle: Math.PI / 8 + (Math.random() - 0.5) * 0.1, // slightly angled
        speed: 0.003 + Math.random() * 0.004,
        phase: Math.random() * Math.PI * 2,
        maxOpacity: 0.08 + Math.random() * 0.06,
      });
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', handleResize);

    // Track time for wave animations
    let time = 0;

    const draw = () => {
      time += 0.003;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Background Sky Gradient (Reacting to brightness)
      if (brightness <= 0.01) {
        ctx.fillStyle = '#070709';
        ctx.fillRect(0, 0, width, height);
      } else {
        const grad = ctx.createLinearGradient(0, 0, 0, height);
        
        // Dark space -> Cream White / soft pink
        const bg1_r = Math.round(7 + (255 - 7) * brightness);
        const bg1_g = Math.round(7 + (243 - 7) * brightness);
        const bg1_b = Math.round(9 + (246 - 9) * brightness);

        // Dark space -> Soft peach pink
        const bg2_r = Math.round(4 + (255 - 4) * brightness);
        const bg2_g = Math.round(4 + (215 - 4) * brightness);
        const bg2_b = Math.round(6 + (222 - 6) * brightness);

        // Dark space -> Secondary Lavender
        const bg3_r = Math.round(11 + (230 - 11) * brightness);
        const bg3_g = Math.round(11 + (230 - 11) * brightness);
        const bg3_b = Math.round(15 + (250 - 15) * brightness);

        grad.addColorStop(0, `rgb(${bg1_r}, ${bg1_g}, ${bg1_b})`);
        grad.addColorStop(0.5, `rgb(${bg2_r}, ${bg2_g}, ${bg2_b})`);
        grad.addColorStop(1, `rgb(${bg3_r}, ${bg3_g}, ${bg3_b})`);

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }

      // 2. Draw Stars (Twinkling space indicators)
      stars.forEach((star) => {
        star.phase += star.pulseSpeed;
        const currentOpacity = star.opacity * (0.25 + 0.75 * Math.sin(star.phase));
        
        // Star bloom
        const glowRad = star.size * 3.5;
        ctx.beginPath();
        const starGlow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, glowRad);
        starGlow.addColorStop(0, `rgba(255, 254, 250, ${currentOpacity * 0.8})`);
        starGlow.addColorStop(0.4, `rgba(255, 254, 250, ${currentOpacity * 0.25})`);
        starGlow.addColorStop(1, 'rgba(255, 254, 250, 0)');
        ctx.fillStyle = starGlow;
        ctx.arc(star.x, star.y, glowRad, 0, Math.PI * 2);
        ctx.fill();

        // Core star
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Draw Volumetric Light Rays (Shimmering atmospheric overlay)
      if (brightness > 0.05) {
        lightRays.forEach((ray) => {
          ray.phase += ray.speed;
          // Sway position horizontally using sine
          const currentX = ray.x + Math.sin(ray.phase) * 60;
          const currentOpacity = ray.maxOpacity * (0.6 + 0.4 * Math.cos(ray.phase)) * brightness;

          const grad = ctx.createLinearGradient(
            currentX, 
            0, 
            currentX + Math.tan(ray.angle) * height, 
            height
          );
          
          grad.addColorStop(0, `rgba(255, 253, 246, ${currentOpacity})`);
          grad.addColorStop(0.4, `rgba(255, 230, 236, ${currentOpacity * 0.4})`);
          grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.moveTo(currentX - ray.width / 2, 0);
          ctx.lineTo(currentX + ray.width / 2, 0);
          
          const bottomX = currentX + Math.tan(ray.angle) * height;
          ctx.lineTo(bottomX + ray.width * 1.5, height);
          ctx.lineTo(bottomX - ray.width * 1.5, height);
          ctx.closePath();
          ctx.fill();
        });
      }

      // 4. Draw Drift Particles (Twinkling sparkles)
      particles.forEach((p) => {
        p.y += p.vy;
        p.wobble += p.wobbleSpeed;
        p.x += p.vx + Math.sin(p.wobble) * 0.12;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        const glowRad = p.size * 5;
        const particleGlow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowRad);
        particleGlow.addColorStop(0, p.color);
        particleGlow.addColorStop(0.3, p.color + '44');
        particleGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = particleGlow;
        ctx.arc(p.x, p.y, glowRad, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity * (0.55 + 0.45 * Math.sin(p.wobble))})`;
        ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // 5. Draw Soft Clouds
      if (brightness > 0.05) {
        clouds.forEach((c) => {
          c.x += c.vx;
          if (c.x - c.radiusX > width) {
            c.x = -c.radiusX;
          }

          ctx.beginPath();
          const cloudGlow = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.radiusX);
          const cloudColor = brightness > 0.5
            ? `rgba(255, 245, 247, ${c.opacity * brightness})`
            : `rgba(235, 235, 252, ${c.opacity * 0.35 * brightness})`;

          cloudGlow.addColorStop(0, cloudColor);
          cloudGlow.addColorStop(0.5, cloudColor);
          cloudGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');

          ctx.fillStyle = cloudGlow;
          ctx.ellipse(c.x, c.y, c.radiusX, c.radiusY, 0, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      // 6. Draw Soft Ground Fog/Mist (Drifting wave layers at bottom screen)
      if (brightness > 0.05) {
        // Fog Layer 1: White-Pink
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 240, 242, ${0.28 * brightness})`;
        ctx.moveTo(0, height);
        for (let x = 0; x <= width; x += 15) {
          const y = height - 55 + Math.sin(x * 0.004 + time * 1.5) * 12;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fill();

        // Fog Layer 2: White-Lavender (offset phase and height)
        ctx.beginPath();
        ctx.fillStyle = `rgba(244, 244, 255, ${0.22 * brightness})`;
        ctx.moveTo(0, height);
        for (let x = 0; x <= width; x += 15) {
          const y = height - 40 + Math.sin(x * 0.003 + time * 1.0 + Math.PI / 2) * 8;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [brightness]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
});
export default DreamyBackground;
