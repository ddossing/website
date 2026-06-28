import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Bot, Command } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    if (!isHome) {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  const navLinks = [
    { label: 'Features', id: 'features' },
    { label: 'Demo', id: 'demo' },
    { label: 'Stats', id: 'stats' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-bg/80 backdrop-blur-xl border-b border-line' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1080px] mx-auto px-6 flex items-center justify-between h-16">
        <button
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-3 font-extrabold text-lg tracking-wide"
        >
          <div className="w-9 h-9 rounded-[11px] bg-gradient-to-br from-green to-green-dark grid place-items-center shadow-[0_6px_20px_rgba(29,185,84,0.35)]">
            <Bot className="w-5 h-5 text-white" />
          </div>
          notepad
        </button>

        <div className="hidden md:flex items-center gap-7 text-muted font-semibold text-[15px]">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="hover:text-text transition-colors"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => { navigate('/commands'); setMobileOpen(false); }}
            className={`hover:text-text transition-colors ${location.pathname === '/commands' ? 'text-text' : ''}`}
          >
            Commands
          </button>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://discord.com/oauth2/authorize?client_id=1519811044942282784&permissions=1073835072&scope=bot"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Add to Discord
          </a>
        </div>

        <button
          className="md:hidden text-text"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-panel/95 backdrop-blur-xl border-b border-line px-6 pb-4 space-y-3">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="block w-full text-left text-muted font-semibold py-2 hover:text-text transition-colors"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => { navigate('/commands'); setMobileOpen(false); }}
            className={`block w-full text-left font-semibold py-2 hover:text-text transition-colors ${location.pathname === '/commands' ? 'text-text' : 'text-muted'}`}
          >
            Commands
          </button>
          <a
            href="https://discord.com/oauth2/authorize?client_id=1519811044942282784&permissions=1073835072&scope=bot"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary w-full justify-center mt-2"
          >
            Add to Discord
          </a>
        </div>
      )}
    </nav>
  );
}
