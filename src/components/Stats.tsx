import { useEffect, useRef, useState } from 'react';
import { Server, Users, MessageSquare, Heart, Globe, Star } from 'lucide-react';

interface StatItem {
  icon: React.ElementType;
  value: string;
  label: string;
  suffix?: string;
}

const stats: StatItem[] = [
  { icon: Server, value: '8,500', label: 'Servers' },
  { icon: Users, value: '2.1M', label: 'Users', suffix: '+' },
  { icon: MessageSquare, value: '50M', label: 'Messages processed' },
  { icon: Heart, value: '99.9', label: 'Uptime', suffix: '%' },
];

export default function Stats() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="stats" className="py-24 sm:py-32 relative" ref={sectionRef}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green/[0.03] to-transparent pointer-events-none" />

      <div className="max-w-[1080px] mx-auto px-6 relative">
        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`relative p-6 rounded-2xl bg-panel border border-line text-center transition-all duration-700 hover:border-green/30 hover:-translate-y-1 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green/20 to-green/5 border border-green/20 flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-green" />
              </div>
              <div className="text-base sm:text-lg font-semibold text-text">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA section */}
        <div
          className={`relative rounded-3xl bg-gradient-to-br from-panel to-panel-2 border border-line p-10 sm:p-14 text-center overflow-hidden transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          {/* Decorative glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-green/5 blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-panel border border-line mb-6">
              <Star className="w-4 h-4 text-green" />
              <span className="text-sm font-semibold text-muted">Ready to upgrade?</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
              Add notepad to your{' '}
              <span className="text-gradient">server today</span>
            </h2>

            <p className="text-lg text-muted max-w-xl mx-auto mb-8">
              Join thousands of servers using notepad. Setup takes 30 seconds, no configuration required.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://discord.com/oauth2/authorize?client_id=1519811044942282784&permissions=1073835072&scope=bot"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-green text-lg px-8"
              >
                <Globe className="w-5 h-5" />
                Add to Discord
              </a>
              <a
                href="https://discord.gg/pain"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost text-lg px-8"
              >
                Join Support Server
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
