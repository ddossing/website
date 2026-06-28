import { useState, useEffect, useRef } from 'react';
import {
  Terminal,
  Music,
  MessageCircle,
  Shield,
  Image,
  User,
  StickyNote,
  Hash,
  Plus,
  Smile,
  Gift,
  AtSign,
  Paperclip,
  Sparkles,
  Lock,
} from 'lucide-react';

interface DemoMessage {
  type: 'bot' | 'user';
  content: React.ReactNode;
  delay: number;
}

const demoScenarios: { label: string; icon: React.ElementType; messages: DemoMessage[] }[] = [
  {
    label: 'Social Media',
    icon: MessageCircle,
    messages: [
      {
        type: 'user',
        content: (
          <div className="flex flex-col gap-0.5">
            <span className="text-[#f2f3f5] font-normal">Hey check this tweet out https://x.com/notepad/status/1234567890</span>
          </div>
        ),
        delay: 0,
      },
      {
        type: 'bot',
        content: (
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green to-green-dark flex items-center justify-center shrink-0 mt-1">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[#1DB954] font-bold text-sm">notepad</span>
                <span className="text-[#949ba4] text-xs">Today at 14:32</span>
              </div>
              <div className="bg-[#111214] rounded-lg overflow-hidden border border-[#1e1f22] max-w-md">
                <div className="h-32 bg-gradient-to-br from-green/20 to-blurple/20 flex items-center justify-center">
                  <Image className="w-8 h-8 text-green/50" />
                </div>
                <div className="p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-5 h-5 rounded-full bg-blurple" />
                    <span className="text-sm font-bold text-[#f2f3f5]">notepad</span>
                    <span className="text-xs text-[#949ba4]">@notepad</span>
                  </div>
                  <p className="text-sm text-[#dbdee1] leading-relaxed">The best Discord bot is here! Check out all the new features we just shipped</p>
                </div>
              </div>
            </div>
          </div>
        ),
        delay: 800,
      },
    ],
  },
  {
    label: 'Music',
    icon: Music,
    messages: [
      {
        type: 'user',
        content: <span className="text-[#f2f3f5] font-normal">,play Blinding Lights</span>,
        delay: 0,
      },
      {
        type: 'bot',
        content: (
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green to-green-dark flex items-center justify-center shrink-0 mt-1">
              <Music className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[#1DB954] font-bold text-sm">notepad</span>
                <span className="text-[#949ba4] text-xs">Today at 14:33</span>
              </div>
              <div className="bg-[#111214] rounded-lg p-3 border border-[#1e1f22] max-w-sm">
                <div className="flex gap-3">
                  <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-green to-green-dark flex items-center justify-center shrink-0">
                    <Music className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-[#f2f3f5] truncate">Blinding Lights</div>
                    <div className="text-xs text-[#949ba4] truncate">The Weeknd</div>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1 h-1 rounded-full bg-[#1e1f22] overflow-hidden">
                        <div className="w-1/3 h-full rounded-full bg-[#1DB954]" />
                      </div>
                      <span className="text-xs text-[#949ba4]">1:23</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs text-[#949ba4]">
                  <span className="px-2 py-1 rounded bg-[#1e1f22] text-[#1DB954]">Now Playing</span>
                  <span>Added to queue</span>
                </div>
              </div>
            </div>
          </div>
        ),
        delay: 800,
      },
    ],
  },
  {
    label: 'Private Notes',
    icon: StickyNote,
    messages: [
      {
        type: 'user',
        content: <span className="text-[#f2f3f5] font-normal">,priv note create passwords my discord password is hunter2</span>,
        delay: 0,
      },
      {
        type: 'bot',
        content: (
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green to-green-dark flex items-center justify-center shrink-0 mt-1">
              <StickyNote className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[#1DB954] font-bold text-sm">notepad</span>
                <span className="text-[#949ba4] text-xs">Today at 14:35</span>
              </div>
              <div className="bg-[#111214] rounded-lg p-3 border border-[#1e1f22] max-w-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-bold text-[#f2f3f5]">Private Note Created</span>
                </div>
                <div className="space-y-1 text-sm text-[#949ba4]">
                  <div className="flex justify-between"><span>Name</span><span className="text-[#f2f3f5]">passwords</span></div>
                  <div className="flex justify-between"><span>Visibility</span><span className="text-yellow-500">Private</span></div>
                  <div className="flex justify-between"><span>Encrypted</span><span className="text-[#1DB954]">Yes</span></div>
                </div>
                <div className="mt-3 text-xs text-[#949ba4] bg-[#1e1f22] rounded p-2">
                  Only you can read this note. Use <code className="text-[#f2f3f5]">,notes</code> to manage your notes.
                </div>
              </div>
            </div>
          </div>
        ),
        delay: 800,
      },
    ],
  },
  {
    label: 'Moderation',
    icon: Shield,
    messages: [
      {
        type: 'user',
        content: <span className="text-[#f2f3f5] font-normal">,purge 50</span>,
        delay: 0,
      },
      {
        type: 'bot',
        content: (
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green to-green-dark flex items-center justify-center shrink-0 mt-1">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[#1DB954] font-bold text-sm">notepad</span>
                <span className="text-[#949ba4] text-xs">Today at 14:36</span>
              </div>
              <div className="bg-[#111214] rounded-lg p-3 border border-[#1e1f22] max-w-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-[#1DB954]" />
                  <span className="text-sm font-bold text-[#f2f3f5]">Messages Purged</span>
                </div>
                <div className="space-y-1 text-sm text-[#949ba4]">
                  <div className="flex justify-between"><span>Deleted</span><span className="text-[#f2f3f5]">50 messages</span></div>
                  <div className="flex justify-between"><span>Moderator</span><span className="text-[#f2f3f5]">@admin</span></div>
                  <div className="flex justify-between"><span>Channel</span><span className="text-[#f2f3f5]">#general</span></div>
                </div>
                <div className="mt-3 text-xs text-[#949ba4] bg-[#1e1f22] rounded p-2">
                  Action logged to moderation log.
                </div>
              </div>
            </div>
          </div>
        ),
        delay: 800,
      },
    ],
  },
];

export default function Demo() {
  const [activeScenario, setActiveScenario] = useState(0);
  const [displayedMessages, setDisplayedMessages] = useState<DemoMessage[]>([]);
  const [typing, setTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<number[]>([]);

  const runScenario = (idx: number) => {
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];

    setDisplayedMessages([]);
    setTyping(false);
    setActiveScenario(idx);

    const scenario = demoScenarios[idx];
    let accumulatedDelay = 300;

    scenario.messages.forEach((msg, i) => {
      const t1 = window.setTimeout(() => {
        if (msg.type === 'bot') {
          setTyping(true);
          const t2 = window.setTimeout(() => {
            setTyping(false);
            setDisplayedMessages((prev) => [...prev, msg]);
          }, msg.delay || 500);
          timeoutsRef.current.push(t2);
        } else {
          setDisplayedMessages((prev) => [...prev, msg]);
        }
      }, accumulatedDelay);
      timeoutsRef.current.push(t1);
      accumulatedDelay += msg.type === 'bot' ? msg.delay + 500 : 400;
    });
  };

  useEffect(() => {
    runScenario(0);
    return () => {
      timeoutsRef.current.forEach((t) => clearTimeout(t));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [displayedMessages, typing]);

  return (
    <section id="demo" className="py-24 sm:py-32 relative">
      <div className="max-w-[1080px] mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-panel border border-line mb-6">
            <Terminal className="w-4 h-4 text-green" />
            <span className="text-sm font-semibold text-muted">See it in action</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
            Powerful commands, <span className="text-gradient">beautiful results</span>
          </h2>
          <p className="text-lg text-muted max-w-xl mx-auto">
            Rich embeds, clean formatting, and instant responses. Every interaction feels premium.
          </p>
        </div>

        {/* Scenario selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {demoScenarios.map((scenario, i) => (
            <button
              key={scenario.label}
              onClick={() => runScenario(i)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                activeScenario === i
                  ? 'bg-green text-[#06120a] shadow-[0_8px_24px_rgba(29,185,84,0.3)]'
                  : 'bg-panel border border-line text-muted hover:text-text hover:border-muted/50'
              }`}
            >
              <scenario.icon className="w-4 h-4" />
              {scenario.label}
            </button>
          ))}
        </div>

        {/* Discord Chat Window */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-[#313338] rounded-lg overflow-hidden shadow-2xl">
            {/* Discord Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[#1e1f22] bg-[#313338]">
              <Hash className="w-5 h-5 text-[#949ba4]" />
              <span className="font-bold text-[#f2f3f5] text-sm">general</span>
              <div className="ml-4 flex-1 h-6 bg-[#1e1f22] rounded-full flex items-center px-3 gap-2">
                <span className="text-[#949ba4] text-xs">Search</span>
              </div>
              <div className="flex items-center gap-3">
                <AtSign className="w-5 h-5 text-[#949ba4]" />
                <div className="w-6 h-6 rounded-full bg-blurple flex items-center justify-center">
                  <User className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>

            {/* Messages area */}
            <div className="h-[420px] overflow-y-auto bg-[#313338] p-4 space-y-4 scrollbar-hide">
              {/* Welcome message */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green to-green-dark flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[#1DB954] font-bold text-sm">notepad</span>
                    <span className="text-[#949ba4] text-xs">Today at 14:30</span>
                  </div>
                  <p className="text-[#dbdee1] text-sm">Hey! I am ready to help. Try sending a command or just drop a social media link!</p>
                </div>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-4 py-2">
                <div className="flex-1 h-px bg-[#3f4147]" />
                <span className="text-[10px] text-[#949ba4] font-bold uppercase tracking-wider">New Messages</span>
                <div className="flex-1 h-px bg-[#3f4147]" />
              </div>

              {/* Animated messages */}
              {displayedMessages.map((msg, i) => (
                <div key={i} className="animate-fade-in-up">
                  {msg.content}
                </div>
              ))}

              {/* Typing indicator */}
              {typing && (
                <div className="flex gap-3 animate-fade-in-up">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green to-green-dark flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#949ba4] animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-[#949ba4] animate-bounce animation-delay-200" />
                    <div className="w-2 h-2 rounded-full bg-[#949ba4] animate-bounce animation-delay-400" />
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Discord Input Bar */}
            <div className="px-4 py-3 bg-[#313338] border-t border-[#1e1f22]">
              <div className="flex items-center gap-2 bg-[#383a40] rounded-lg px-3 py-2.5">
                <button className="text-[#b5bac1] hover:text-[#dbdee1] transition-colors">
                  <Plus className="w-5 h-5" />
                </button>
                <div className="flex-1 text-sm text-[#949ba4] truncate">
                  Message #general
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-[#b5bac1] hover:text-[#dbdee1] transition-colors">
                    <Gift className="w-5 h-5" />
                  </button>
                  <button className="text-[#b5bac1] hover:text-[#dbdee1] transition-colors">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <button className="text-[#b5bac1] hover:text-[#dbdee1] transition-colors">
                    <Smile className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
