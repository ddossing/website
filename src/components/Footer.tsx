import { Bot, Github, Twitter, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-line bg-panel/30">
      <div className="max-w-[1080px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 font-extrabold text-lg tracking-wide mb-4">
              <div className="w-9 h-9 rounded-[11px] bg-gradient-to-br from-green to-green-dark grid place-items-center shadow-[0_6px_20px_rgba(29,185,84,0.35)]">
                <Bot className="w-5 h-5 text-white" />
              </div>
              notepad
            </div>
            <p className="text-sm text-muted leading-relaxed max-w-sm">
              The all-in-one Discord bot for social media embeds, profile lookups, notes, music, moderation, and more.
              Built for communities that demand the best.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-bold text-text mb-4">Product</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Invite Bot', href: 'https://discord.com/oauth2/authorize?client_id=1067857955803344976' },
                { label: 'Support Server', href: 'https://discord.gg/notepad' },
                { label: 'Commands', href: 'https://notepad.help/' },
                { label: 'Status', href: 'https://notepad.help/' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted hover:text-text transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-text mb-4">Legal</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Terms of Service', href: 'https://notepad.help/' },
                { label: 'Privacy Policy', href: 'https://notepad.help/' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted hover:text-text transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span>by the notepad team</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/notepad"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-text transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com/notepad"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-text transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
