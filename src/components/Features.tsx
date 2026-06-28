import { useEffect, useRef, useState } from 'react';
import {
  MessageSquare,
  Search,
  StickyNote,
  Music,
  Shield,
  Image,
  BarChart3,
  Clock,
  ExternalLink,
  Sparkles,
  PenTool,
  Server,
  GitBranch,
  Lock,
  Newspaper,
  Check,
} from 'lucide-react';

interface FeatureCard {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
  tags: string[];
}

const features: FeatureCard[] = [
  {
    icon: MessageSquare,
    title: 'Social Media Embeds',
    description: 'Fix any link. Twitter/X, Instagram, TikTok, Reddit, Bluesky — auto-embeds in rich Discord format with metadata.',
    color: 'from-green/20 to-green/5',
    tags: ['Twitter/X', 'Instagram', 'TikTok'],
  },
  {
    icon: Search,
    title: 'Profile Lookups',
    description: 'Lookup any Roblox user, avatar, groups, and games. Deep profile cards with stats and thumbnails.',
    color: 'from-blurple/20 to-blurple/5',
    tags: ['Roblox', 'Avatars', 'Groups'],
  },
  {
    icon: StickyNote,
    title: 'Notes & Reminders',
    description: 'Create persistent notes, set reminders, and manage server knowledge bases directly from chat.',
    color: 'from-yellow-500/20 to-yellow-500/5',
    tags: ['Persistent', 'Reminders', 'KB'],
  },
  {
    icon: Music,
    title: 'Music & Spotify',
    description: 'Play music from YouTube, Spotify, and SoundCloud. Queue, playlists, volume control, and lyrics.',
    color: 'from-green/20 to-green/5',
    tags: ['Spotify', 'YouTube', 'Lyrics'],
  },
  {
    icon: Shield,
    title: 'Moderation',
    description: 'Auto-mod, ban, kick, mute, warn, slowmode, and audit logs. Keep your server safe without effort.',
    color: 'from-red-500/20 to-red-500/5',
    tags: ['Auto-mod', 'Logs', 'Warns'],
  },
  {
    icon: Image,
    title: 'Image Manipulation',
    description: 'Generate memes, manipulate images, create avatars, and apply filters on the fly.',
    color: 'from-purple-500/20 to-purple-500/5',
    tags: ['Memes', 'Filters', 'Avatars'],
  },
  {
    icon: BarChart3,
    title: 'Server Stats',
    description: 'Real-time member growth, message analytics, voice activity, and engagement charts.',
    color: 'from-blue-500/20 to-blue-500/5',
    tags: ['Growth', 'Analytics', 'Charts'],
  },
  {
    icon: Clock,
    title: 'Auto Roles & Events',
    description: 'Welcome messages, auto-roles, scheduled events, reaction roles, and custom triggers.',
    color: 'from-orange-500/20 to-orange-500/5',
    tags: ['Welcome', 'Auto-roles', 'Events'],
  },
  {
    icon: ExternalLink,
    title: 'Web Dashboard',
    description: 'Configure everything from a beautiful web interface. No need to remember slash commands.',
    color: 'from-blurple/20 to-blurple/5',
    tags: ['Config', 'Logs', 'Analytics'],
  },
];

export default function Features() {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number(entry.target.getAttribute('data-index'));
          if (entry.isIntersecting) {
            setVisibleCards((prev) => new Set([...prev, idx]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" className="py-24 sm:py-32 relative">
      <div className="max-w-[1080px] mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-panel border border-line mb-6">
            <Sparkles className="w-4 h-4 text-green" />
            <span className="text-sm font-semibold text-muted">Everything you need</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
            One bot, <span className="text-gradient">all features</span>
          </h2>
          <p className="text-lg text-muted max-w-xl mx-auto">
            No need to add 10 different bots. notepad covers every use case with best-in-class quality.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              ref={(el) => { cardsRef.current[i] = el; }}
              data-index={i}
              className={`group relative p-6 rounded-2xl bg-panel border border-line transition-all duration-500 hover:border-green/30 hover:-translate-y-1 ${
                visibleCards.has(i) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${(i % 3) * 100}ms` }}
            >
              {/* Glow background */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              <div className="relative z-10">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-green/20 to-green/5 border border-green/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-5 h-5 text-green" />
                </div>

                <h3 className="text-lg font-bold text-text mb-2">{feature.title}</h3>
                <p className="text-sm text-muted leading-relaxed mb-4">{feature.description}</p>

                <div className="flex flex-wrap gap-2">
                  {feature.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-full bg-panel-2 border border-line text-muted font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
