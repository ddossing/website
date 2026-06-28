import { useEffect, useRef } from 'react';
import { ArrowDown, Zap, Music, Shield } from 'lucide-react';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      heroRef.current.style.setProperty('--mouse-x', `${x}%`);
      heroRef.current.style.setProperty('--mouse-y', `${y}%`);
    };
    const el = heroRef.current;
    if (el) el.addEventListener('mousemove', handleMouseMove);
    return () => { if (el) el.removeEventListener('mousemove', handleMouseMove); };
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      style={{
        background: 'radial-gradient(1200px 600px at 50% -10%, #16241b 0%, transparent 60%), radial-gradient(800px 400px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(29, 185, 84, 0.08) 0%, transparent 60%), #0b0d10',
      }}
    >
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-green/20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-[1080px] mx-auto px-6 text-center relative z-10">
        {/* Badge */}
        <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-2 rounded-full bg-panel border border-line mb-8">
          <Zap className="w-4 h-4 text-green" />
          <span className="text-sm font-semibold text-muted">The all-in-one Discord bot</span>
        </div>

        {/* Title */}
        <h1 className="animate-fade-in-up animation-delay-200 text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-6">
          notepad is the{' '}
          <span className="text-gradient">ultimate</span>
          <br />
          <span className="text-gradient">all-in-one</span> app
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-in-up animation-delay-400 text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
          Social media embeds, profile lookups, notes, music & Spotify, moderation —
          all from chat. No setup required, just add and go.
        </p>

        {/* CTAs */}
        <div className="animate-fade-in-up animation-delay-600 flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="https://discord.com/oauth2/authorize?client_id=1067857955803344976"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-green text-lg px-8"
          >
            <Zap className="w-5 h-5" />
            Add to Discord
          </a>
          <button
            onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn btn-ghost text-lg px-8"
          >
            See it in action
          </button>
        </div>

        {/* Quick features pills */}
        <div className="animate-fade-in-up animation-delay-800 flex flex-wrap items-center justify-center gap-3">
          {[
            { icon: Zap, label: 'Instant setup' },
            { icon: Music, label: 'Music & Spotify' },
            { icon: Shield, label: 'Moderation' },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-panel/60 border border-line/50 text-sm text-muted"
            >
              <item.icon className="w-4 h-4 text-green" />
              {item.label}
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="mt-20 animate-fade-in-up animation-delay-800">
          <button
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-muted/50 hover:text-muted transition-colors animate-bounce"
          >
            <ArrowDown className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
