import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Bot,
  Music,
  MessageCircle,
  StickyNote,
  Shield,
  Search,
  Sparkles,
  Info,
  Wrench,
  Settings,
  Radio,
  ChevronRight,
  Command,
  Lock,
  Hash,
  ArrowLeft,
  Search as SearchIcon,
} from 'lucide-react';
import { commands, categories, type Command as CommandType } from '../data/commands';

const categoryIcons: Record<string, React.ElementType> = {
  music: Music,
  social: MessageCircle,
  notes: StickyNote,
  moderation: Shield,
  profiles: Search,
  fun: Sparkles,
  info: Info,
  utility: Wrench,
  settings: Settings,
  lastfm: Radio,
};

const categoryOrder = ['social', 'music', 'notes', 'moderation', 'profiles', 'fun', 'info', 'utility', 'lastfm', 'settings'];

function CommandCard({ cmd }: { cmd: CommandType }) {
  const cat = categories[cmd.category];
  const Icon = categoryIcons[cmd.category] || Command;

  return (
    <div className="group relative p-5 rounded-xl bg-panel border border-line hover:border-green/30 transition-all duration-300 hover:-translate-y-0.5">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green/20 to-green/5 border border-green/20 flex items-center justify-center shrink-0 mt-0.5">
          <Icon className="w-5 h-5 text-green" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <code className="text-[15px] font-mono font-bold text-green break-all">
              {cmd.name}
            </code>
            {cmd.perms && (
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 font-semibold">
                {cmd.perms}
              </span>
            )}
          </div>
          <p className="text-sm text-muted leading-relaxed">{cmd.desc}</p>
          {cmd.args && (
            <div className="mt-2 flex items-center gap-1.5 text-xs text-muted/70">
              <Hash className="w-3 h-3" />
              <span className="font-mono">{cmd.args}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CommandsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const filteredCommands = commands.filter((cmd) => {
    const matchesSearch =
      searchQuery === '' ||
      cmd.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !activeCategory || cmd.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const grouped = filteredCommands.reduce((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = [];
    acc[cmd.category].push(cmd);
    return acc;
  }, {} as Record<string, CommandType[]>);

  const sortedGroups = Object.entries(grouped).sort(
    (a, b) => categoryOrder.indexOf(a[0]) - categoryOrder.indexOf(b[0])
  );

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
      { threshold: 0.05, rootMargin: '0px 0px -30px 0px' }
    );
    cardsRef.current.forEach((card) => { if (card) observer.observe(card); });
    return () => observer.disconnect();
  }, [sortedGroups]);

  return (
    <div className="min-h-screen bg-bg text-text font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-xl border-b border-line">
        <div className="max-w-[1080px] mx-auto px-6 flex items-center justify-between h-16">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-3 font-extrabold text-lg tracking-wide"
          >
            <div className="w-9 h-9 rounded-[11px] bg-gradient-to-br from-green to-green-dark grid place-items-center shadow-[0_6px_20px_rgba(29,185,84,0.35)]">
              <Bot className="w-5 h-5 text-white" />
            </div>
            notepad
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-muted font-semibold text-[15px] hover:text-text transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 max-w-[1080px] mx-auto px-6">
        {/* Page header */}
        <div className="flex items-center gap-5 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-panel border border-line flex items-center justify-center">
            <Command className="w-7 h-7 text-green" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold">Commands</h1>
            <p className="text-sm text-muted mt-1">
              {commands.length} commands across {Object.keys(categories).length} categories
            </p>
          </div>
        </div>

        {/* Search bar */}
        <div className="relative mb-6">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
          <input
            type="text"
            placeholder="Search commands..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-panel border border-line rounded-xl pl-12 pr-4 py-3.5 text-text placeholder:text-muted/60 focus:outline-none focus:border-green/40 focus:ring-1 focus:ring-green/20 transition-all"
          />
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
              activeCategory === null
                ? 'bg-green text-[#06120a] shadow-[0_8px_24px_rgba(29,185,84,0.3)]'
                : 'bg-panel border border-line text-muted hover:text-text'
            }`}
          >
            All
          </button>
          {categoryOrder.map((cat) => {
            const info = categories[cat];
            if (!info) return null;
            const count = commands.filter((c) => c.category === cat).length;
            const Icon = categoryIcons[cat] || Command;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                  activeCategory === cat
                    ? 'bg-green text-[#06120a] shadow-[0_8px_24px_rgba(29,185,84,0.3)]'
                    : 'bg-panel border border-line text-muted hover:text-text'
                }`}
              >
                <Icon className="w-4 h-4" />
                {info.name}
                <span className="text-xs opacity-70">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Commands grid */}
        {sortedGroups.map(([cat, cmds]) => {
          const info = categories[cat];
          const Icon = categoryIcons[cat] || Command;
          return (
            <div key={cat} className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-green/20 to-green/5 border border-green/20 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-green" />
                </div>
                <h2 className="text-xl font-bold text-text">{info?.name || cat}</h2>
                <span className="text-sm text-muted">{cmds.length} commands</span>
                <div className="flex-1 h-px bg-line ml-2" />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {cmds.map((cmd, i) => (
                  <div key={cmd.name}>
                    <CommandCard cmd={cmd} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {sortedGroups.length === 0 && (
          <div className="text-center py-20">
            <SearchIcon className="w-12 h-12 text-muted/30 mx-auto mb-4" />
            <p className="text-lg text-muted">No commands found matching "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
