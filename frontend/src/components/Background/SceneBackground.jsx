import React, { useEffect, useRef } from 'react';

export default function SceneBackground({ activePage = 'landing' }) {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);

  // Strategic opacity map specified in design guidelines
  const opacityMap = {
    landing: 0.88,
    dashboard: 0.22,
    analyze: 0.30,
    result: 0.20,
    history: 0.22,
    analytics: 0.25,
    'model-evaluation': 0.28,
    admin: 0.18,
    login: 0.50,
    register: 0.50,
  };

  const currentOpacity = opacityMap[activePage] ?? 0.25;

  // Canvas particle field overlay - expands/recedes & draws subtle neural connections
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes definition
    const particleCount = activePage === 'landing' ? 70 : 35;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2.2 + 0.8,
        baseAlpha: Math.random() * 0.5 + 0.2,
        phase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
      });
    }

    let mouse = { x: -1000, y: -1000, radius: 140 };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render neural links
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.18;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(32, 212, 122, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }

        // Mouse connection
        const mdx = particles[i].x - mouse.x;
        const mdy = particles[i].y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < mouse.radius) {
          const mAlpha = (1 - mdist / mouse.radius) * 0.35;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(22, 119, 255, ${mAlpha})`;
          ctx.lineWidth = 1;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      // Render glowing particle dots
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.phase += p.pulseSpeed;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const pulse = Math.sin(p.phase) * 0.2 + 0.8;
        const alpha = p.baseAlpha * pulse;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * pulse, 0, Math.PI * 2);
        ctx.fillStyle = i % 3 === 0 ? `rgba(32, 212, 122, ${alpha})` : `rgba(22, 119, 255, ${alpha})`;
        ctx.shadowColor = i % 3 === 0 ? '#20d47a' : '#1677ff';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activePage]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        backgroundColor: '#06111f',
      }}
    >
      {/* Native Scene-17 Video Element */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          minWidth: '100%',
          minHeight: '100%',
          width: 'auto',
          height: 'auto',
          transform: 'translate(-50%, -50%)',
          objectFit: 'cover',
          opacity: currentOpacity,
          transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          filter: activePage === 'landing' ? 'none' : 'blur(2px) contrast(1.05)',
        }}
        src="/Scene-17.mp4"
      />

      {/* Dynamic Deep Space Vignette Gradient for Readability */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            activePage === 'landing'
              ? 'radial-gradient(circle at center, rgba(6,17,31,0.2) 0%, rgba(6,17,31,0.75) 75%, rgba(6,17,31,0.95) 100%)'
              : 'radial-gradient(circle at center, rgba(6,17,31,0.75) 0%, rgba(6,17,31,0.92) 80%, #06111f 100%)',
          transition: 'background 0.8s ease',
        }}
      />

      {/* Interactive Particle & Neural Network Connection Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          opacity: activePage === 'landing' ? 0.75 : 0.45,
          transition: 'opacity 0.6s ease',
        }}
      />

      {/* Top subtle blue ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: '-150px',
          left: '20%',
          width: '600px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(22,119,255,0.15) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Bottom subtle green sustainability ambient glow */}
      <div
        style={{
          position: 'absolute',
          bottom: '-150px',
          right: '15%',
          width: '550px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(32,212,122,0.12) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
    </div>
  );
}
