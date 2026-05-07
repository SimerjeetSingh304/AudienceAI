"use client"

import Link from "next/link"
import { Show, SignInButton, UserButton } from "@clerk/nextjs"
import {
  ArrowRight,
  Zap,
  Shield,
  BarChart3,
  Users,
  MessageSquare,
  Brain,
  Activity,
  Globe,
  Lock,
  Star,
  CheckCircle,
  ExternalLink,
  Layout,
  ChevronUp,
  Mic,
  Radio,
} from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ThemeToggle } from "@/components/shared/ThemeToggle"
import { useEffect, useState, useRef } from "react"
import Logo from "@/components/shared/Logo"

/* ─────────────────────────────────────────────
   Animated counter (IntersectionObserver)
───────────────────────────────────────────── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        let start = 0
        const step = Math.ceil(to / 60)
        const timer = setInterval(() => {
          start = Math.min(start + step, to)
          setCount(start)
          if (start >= to) clearInterval(timer)
        }, 16)
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [to])
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

/* ─────────────────────────────────────────────
   Marquee strip
───────────────────────────────────────────── */
function Marquee() {
  const items = [
      "Architected for 10K+ Users",
    "AI Clustering",
    "Live Polls",
    "Real-time Q&A",
      "WebSocket-driven",
    "Sub-50ms Latency",
      "Open Source",
    "Groq Llama 3.3",
  ]
  const doubled = [...items, ...items]
  return (
    <div className="overflow-hidden border-y border-border/50 bg-muted/30 backdrop-blur-sm py-4">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-3 text-xs font-semibold tracking-widest uppercase text-muted-foreground"
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary/60" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Audience wave SVG decoration
───────────────────────────────────────────── */
function AudienceWave() {
  return (
    <svg viewBox="0 0 600 120" className="w-full opacity-20 dark:opacity-30" fill="none">
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <motion.rect
          key={i}
          x={i * 68 + 8}
          width={52}
          rx={6}
          fill="url(#barGrad)"
          initial={{ height: 20, y: 100 }}
          animate={{
            height: [20, Math.random() * 80 + 20, 20],
            y: [100, 100 - (Math.random() * 80 + 20), 100],
          }}
          transition={{
            duration: 2 + Math.random() * 1.5,
            repeat: Infinity,
            repeatType: "mirror",
            delay: i * 0.18,
            ease: "easeInOut",
          }}
        />
      ))}
      <defs>
        <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.6 0.22 260)" />
          <stop offset="100%" stopColor="oklch(0.7 0.25 285)" />
        </linearGradient>
      </defs>
    </svg>
  )
}

/* ─────────────────────────────────────────────
   Main page
───────────────────────────────────────────── */
export default function LandingPage() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.6], [0, -60])

  const features = [
    {
      icon: Radio,
      label: "01",
      title: "WebSocket Sync",
      description: "Real-time question submission and upvoting powered by Socket.io and Redis Pub/Sub for cross-instance consistency.",
      accentClass: "text-primary",
      bgClass: "bg-primary/5 border-primary/15",
      iconBg: "bg-primary/10",
    },
    {
      icon: Brain,
      label: "02",
      title: "AI Clustering",
      description: "Llama 3.3 (via Groq) groups similar questions in <1s. Reduces redundancy and surfaces core audience concerns.",
      accentClass: "text-accent",
      bgClass: "bg-accent/5 border-accent/15",
      iconBg: "bg-accent/10",
    },
    {
      icon: BarChart3,
      label: "03",
      title: "Live Polling Engine",
      description: "Transactional polling system with real-time result aggregation and D3-powered live visualizations.",
      accentClass: "text-emerald-500",
      bgClass: "bg-emerald-500/5 border-emerald-500/15",
      iconBg: "bg-emerald-500/10",
    },
    {
      icon: Users,
      label: "04",
      title: "Redis State",
      description: "Session state and message queues managed via Redis, ensuring sub-millisecond data access and high concurrency.",
      accentClass: "text-orange-500",
      bgClass: "bg-orange-500/5 border-orange-500/15",
      iconBg: "bg-orange-500/10",
    },
    {
      icon: Lock,
      label: "05",
      title: "Clerk Auth + RBAC",
      description: "Secure presenter authentication via Clerk with role-based access control for session moderation.",
      accentClass: "text-violet-500",
      bgClass: "bg-violet-500/5 border-violet-500/15",
      iconBg: "bg-violet-500/10",
    },
    {
      icon: Activity,
      label: "06",
      title: "System Analytics",
      description: "Detailed session logs and AI-generated transcripts, exportable for post-event architectural review.",
      accentClass: "text-cyan-500",
      bgClass: "bg-cyan-500/5 border-cyan-500/15",
      iconBg: "bg-cyan-500/10",
    },
  ]

  const testimonials = [
    {
      name: "Architecture Review",
      role: "Project Goal",
      content: "The primary objective was to handle high-concurrency Q&A without state drifting, achieved through Redis Pub/Sub.",
      initials: "AR",
      colorClass: "bg-primary/10 text-primary ring-1 ring-primary/20",
    },
    {
      name: "AI Performance",
      role: "Benchmark",
      content: "Groq's Llama 3.3 inference allows for near-instantaneous question clustering even with hundreds of active threads.",
      initials: "AI",
      colorClass: "bg-accent/10 text-accent ring-1 ring-accent/20",
    },
    {
      name: "User Experience",
      role: "Design Focus",
      content: "A frictionless 'scan-to-join' flow ensures that audience members can participate without any app installation or sign-up.",
      initials: "UX",
      colorClass: "bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/20",
    },
  ]

  return (
    <div className="noise flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/20">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,700&family=DM+Serif+Display:ital@0;1&display=swap');

        body { font-family: 'DM Sans', system-ui, sans-serif; }
        .serif { font-family: 'DM Serif Display', Georgia, serif; }

        /* Uses --primary from design system */
        .text-gradient-brand {
          background: linear-gradient(135deg, var(--foreground) 20%, oklch(0.6 0.22 260) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Uses mesh-gradient utility from globals.css */
        .hero-ambient {
          background:
            radial-gradient(ellipse 80% 50% at 50% -5%, oklch(0.6 0.22 260 / 0.15) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 80% 15%, oklch(0.7 0.25 285 / 0.10) 0%, transparent 60%);
        }

        .grid-dots {
          background-image:
            linear-gradient(oklch(0.5 0 0 / 0.04) 1px, transparent 1px),
            linear-gradient(90deg, oklch(0.5 0 0 / 0.04) 1px, transparent 1px);
          background-size: 48px 48px;
        }

        .card-lift {
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease;
        }
        .card-lift:hover {
          transform: translateY(-5px);
          box-shadow: var(--glass-glow), 0 20px 50px -15px oklch(0 0 0 / 0.25);
        }

        /* Primary button — uses --primary token */
        .btn-primary {
          background: var(--primary);
          color: var(--primary-foreground);
          box-shadow: 0 4px 24px -6px oklch(0.55 0.22 260 / 0.5);
          transition: box-shadow 0.25s ease, transform 0.25s ease, filter 0.2s ease;
        }
        .btn-primary:hover {
          filter: brightness(1.1);
          box-shadow: 0 8px 32px -6px oklch(0.55 0.22 260 / 0.65);
          transform: translateY(-2px);
        }

        /* Ghost button — uses glass utility */
        .btn-ghost {
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          backdrop-filter: blur(12px);
          transition: background 0.2s ease;
        }
        .btn-ghost:hover { background: oklch(0.5 0 0 / 0.08); }

        /* Pro plan glow — uses --primary */
        .plan-pro {
          box-shadow: var(--glass-glow), 0 32px 64px -20px oklch(0 0 0 / 0.3);
          border: 1.5px solid oklch(0.6 0.22 260 / 0.3);
        }

        /* Feature card accent bar */
        .feature-bar {
          position: absolute;
          bottom: 0; left: 0;
          height: 2px;
          width: 0;
          background: var(--primary);
          transition: width 0.45s ease;
          opacity: 0.7;
        }
        .feature-wrap:hover .feature-bar { width: 100%; }
      `}</style>

      {/* ════════════════ HEADER ════════════════ */}
      <header className="px-6 lg:px-14 h-[72px] flex items-center border-b border-border/50 sticky top-0 z-50 bg-background/80 backdrop-blur-xl">
        <Logo />

        <nav className="ml-auto flex items-center gap-2 sm:gap-6">
          {["Features", "Docs"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden md:block"
            >
              {item}
            </Link>
          ))}
          <Show when="signed-in">
            <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Dashboard
            </Link>
            <ThemeToggle />
            <UserButton />
          </Show>
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden md:block">
                Sign In
              </button>
            </SignInButton>
            <ThemeToggle />
            <Link href="/dashboard">
              <button className="btn-primary text-sm font-semibold px-5 py-2.5 rounded-full">
                Get Started
              </button>
            </Link>
          </Show>
        </nav>
      </header>

      <main className="flex-1">

        {/* ════════════════ HERO ════════════════ */}
        <section
          ref={heroRef}
          className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 py-24 overflow-hidden grid-dots"
        >
          <div className="hero-ambient absolute inset-0 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />

          <motion.div style={{ opacity: heroOpacity, y: heroY }} className="relative z-10 max-w-5xl mx-auto">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 mb-10"
            >
              <Users className="w-3.5 h-3.5" />
              Built by Simerjeet Singh — CS @ MSIT Delhi · CGPA 8.47
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="serif font-bold leading-[1.06] tracking-tight mb-8"
              style={{ fontSize: "clamp(2.8rem,8vw,6.5rem)" }}
            >
              <span className="text-foreground">Smarter Q&A.</span>
              <br />
              <span className="text-gradient-brand">Live.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-12"
            >
              Real-time Q&A, AI-clustered questions, and live polls — seamlessly woven into every session.
              Built for presenters who demand more.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <Link href="/dashboard">
                <button className="btn-primary font-bold px-8 h-14 rounded-full text-base flex items-center gap-2 group">
                  Start Presenting
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link href="/join">
                <button className="btn-ghost text-foreground font-medium px-8 h-14 rounded-full text-base flex items-center gap-2 group">
                  <Users className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  Join a Session
                </button>
              </Link>

              {/* QR Code Teaser */}
              <div className="hidden lg:flex items-center gap-4 pl-6 border-l border-border/50">
                <div className="w-16 h-16 bg-white p-1 rounded-lg shadow-sm">
                   {/* Placeholder for a real QR code */}
                   <img 
                    src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://audience-ai.onrender.com/join/demo" 
                    alt="QR Code" 
                    className="w-full h-full object-contain"
                   />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Scan to Join</p>
                  <p className="text-xs text-muted-foreground">Try the live demo</p>
                </div>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 text-xs text-muted-foreground/60"
            >
              Open-source Portfolio Project · Powered by Groq Llama 3.3 · Sub-50ms Latency
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="relative z-10 w-full max-w-lg mx-auto mt-16"
          >
            <AudienceWave />
          </motion.div>
        </section>

        {/* ════════════════ MARQUEE ════════════════ */}
        <Marquee />

        {/* ════════════════ LIVE MOCKUP ════════════════ */}
        <section className="py-28 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass rounded-3xl overflow-hidden"
            >
              {/* Chrome */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border/50 bg-muted/20">
                <div className="flex gap-2">
                  {["oklch(0.6 0.2 25)", "oklch(0.75 0.18 80)", "oklch(0.65 0.2 145)"].map((c, i) => (
                    <div key={i} className="w-3 h-3 rounded-full opacity-70" style={{ background: c }} />
                  ))}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                  <Lock className="w-3 h-3" />
                  app.audienceai.io/session/live
                </div>
                <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  LIVE
                </span>
              </div>

              {/* Body */}
              <div className="p-8 grid md:grid-cols-3 gap-6">
                {/* Q&A */}
                <div className="md:col-span-2 space-y-3">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-semibold text-foreground">Trending Questions</h3>
                    <span className="text-xs text-muted-foreground">248 participants · 34 questions</span>
                  </div>
                  {[
                    { votes: 124, q: "How do you manage shared state across 10K users?", user: "Anonymous", ago: "2m ago", active: true },
                    { votes: 89, q: "Are you planning to add Discord integration soon?", user: "Sarah T.", ago: "5m ago", active: false },
                    { votes: 55, q: "What's the strategy for handling network partition?", user: "Alex M.", ago: "8m ago", active: false },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.3 }}
                      className={`flex gap-4 p-4 rounded-xl border transition-all ${item.active
                        ? "bg-primary/5 border-primary/20"
                        : "bg-card border-border hover:bg-muted/20"
                      }`}
                    >
                      <div className="flex flex-col items-center gap-1 min-w-[36px]">
                        <ChevronUp className={`w-4 h-4 ${item.active ? "text-primary" : "text-muted-foreground"}`} />
                        <span className={`text-sm font-bold ${item.active ? "text-primary" : "text-muted-foreground"}`}>
                          {item.votes}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-card-foreground font-medium leading-snug">{item.q}</p>
                        <p className="text-xs text-muted-foreground mt-1.5">{item.user} · {item.ago}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Sidebar */}
                <div className="space-y-4">
                  <div className="p-5 rounded-xl border bg-accent/5 border-accent/20">
                    <div className="flex items-center gap-2 mb-3">
                      <Brain className="w-4 h-4 text-accent" />
                      <span className="text-xs font-bold uppercase tracking-widest text-accent">AI Insight</span>
                    </div>
                    <p className="text-sm text-card-foreground/70 leading-relaxed">
                      Your audience is focused on{" "}
                      <strong className="text-card-foreground">backend scalability</strong>.
                      Address Redis clustering next — 3 similar questions clustered.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl border bg-card border-border">
                    <h4 className="text-sm font-semibold text-card-foreground mb-3">Active Poll</h4>
                    <p className="text-xs text-muted-foreground mb-4">Primary tech stack?</p>
                    {[
                      { label: "Next.js", pct: 65, color: "oklch(0.55 0.22 260)" },
                      { label: "Remix", pct: 20, color: "oklch(0.7 0.25 285)" },
                      { label: "Other", pct: 15, color: "oklch(0.5 0.02 260)" },
                    ].map((bar, i) => (
                      <div key={i} className="mb-2">
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                          <span>{bar.label}</span><span>{bar.pct}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${bar.pct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                            className="h-full rounded-full"
                            style={{ background: bar.color }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {[{ val: "Real-time", label: "Sync Status" }].map((s, i) => (
                      <div key={i} className="p-3 rounded-xl border border-border bg-muted/30 text-center">
                        <div className="text-xl font-bold text-card-foreground">{s.val}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ════════════════ STATS ════════════════ */}
        <section className="py-20 px-6 border-y border-border/50 bg-muted/10">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { val: 10000, suffix: "+", label: "Architected for scale", icon: Users },
              { val: 50, suffix: "ms", label: "Groq inference speed", icon: Zap },
              { val: 1, suffix: "ms", label: "Redis avg latency", icon: Activity },
              { val: 1, suffix: "sec", label: "AI Clustering Time", icon: Brain },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <s.icon className="w-5 h-5 mx-auto mb-4 text-muted-foreground/40" />
                <div className="serif text-4xl md:text-5xl text-foreground mb-2 tracking-tight">
                  <Counter to={s.val} suffix={s.suffix} />
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ════════════════ FEATURES ════════════════ */}
        <section id="features" className="py-28 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-2xl mb-20">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Features</p>
              <h2 className="serif font-bold text-foreground leading-tight mb-6" style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}>
                Every tool you need,<br />nothing you don't.
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Built for conference stages, corporate all-hands, and university lectures alike.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  onMouseEnter={() => setHoveredFeature(i)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  className={`feature-wrap card-lift relative overflow-hidden rounded-2xl border p-8 bg-card ${f.bgClass}`}
                >
                  <span className="absolute top-6 right-6 text-xs font-mono text-muted-foreground/25">{f.label}</span>

                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${f.iconBg}`}>
                    <f.icon className={`w-5 h-5 ${f.accentClass}`} />
                  </div>

                  <h3 className="font-bold text-card-foreground text-lg mb-3 tracking-tight">{f.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
                  <div className="feature-bar" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════ TESTIMONIALS ════════════════ */}
        <section className="py-28 px-6 border-t border-border/50 bg-muted/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Benchmarks</p>
              <h2 className="serif font-bold text-foreground" style={{ fontSize: "clamp(2rem,5vw,3rem)" }}>
                Core Project Objectives
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="card-lift p-8 rounded-2xl border border-border bg-card"
                >
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-current text-amber-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-8">"{t.content}"</p>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${t.colorClass}`}>
                      {t.initials}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-card-foreground">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════ HOW IT WORKS ════════════════ */}
        <section id="docs" className="py-28 px-6 border-t border-border/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Architecture</p>
              <h2 className="serif font-bold text-foreground mb-4" style={{ fontSize: "clamp(2rem,5vw,3rem)" }}>
                How AudienceAI Works
              </h2>
              <p className="text-muted-foreground">A deep dive into the technical flow of a session.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
              {/* Connector lines (Desktop) */}
              <div className="hidden lg:block absolute top-24 left-[10%] right-[10%] h-0.5 bg-border -z-10" />

              {[
                {
                  step: "01",
                  title: "Session Initialization",
                  desc: "Presenter starts a session via Clerk-secured dashboard. A unique room ID is generated, and Redis initializes a fresh session state store.",
                  icon: Layout
                },
                {
                  step: "02",
                  title: "Real-time Interaction",
                  desc: "Audience joins via QR/Link. Questions and upvotes are broadcast via Socket.io, with Redis Pub/Sub keeping distributed instances in sync.",
                  icon: MessageSquare
                },
                {
                  step: "03",
                  title: "AI Analysis & Clustering",
                  desc: "Groq Llama 3.3 processes incoming streams, auto-merging duplicates and surfacing 'hot' topics to the presenter in real-time.",
                  icon: Brain
                },
                {
                  step: "04",
                  title: "Error Resilience",
                  desc: "If Groq fails, questions display unclustered. If Redis drops, in-memory fallback activates with exponential backoff reconnect.",
                  icon: Shield
                }
              ].map((s, i) => (
                <div key={i} className="flex flex-col items-center text-center group">
                  <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-6 border border-border group-hover:border-primary/50 transition-colors bg-card shadow-sm">
                    <s.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-3">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed px-4">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════ CTA BANNER ════════════════ */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mesh-gradient relative rounded-3xl overflow-hidden p-12 md:p-20 text-center glass"
            >
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] pointer-events-none"
                style={{ background: "radial-gradient(ellipse at top, oklch(0.6 0.22 260 / 0.15) 0%, transparent 70%)" }}
              />
              <div className="relative z-10">
                <h2 className="serif font-bold text-foreground mb-6 leading-tight" style={{ fontSize: "clamp(2rem,5vw,3rem)" }}>
                  Want to see the<br />full architecture?
                </h2>
                <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                  Explore the source code on GitHub or try out a live session to see the real-time sync in action.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="https://github.com/SimerjeetSingh304/AudienceAI">
                    <button className="btn-primary font-bold px-10 h-14 rounded-full text-base flex items-center gap-2 group">
                      View on GitHub
                      <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </button>
                  </Link>
                  <Link href="/join">
                    <button className="btn-ghost font-bold px-10 h-14 rounded-full text-base flex items-center gap-2 group">
                      Try Demo Session
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* ════════════════ FOOTER ════════════════ */}
      <footer className="border-t border-border/50 py-16 px-6 bg-muted/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-14">
            <div className="col-span-2">
              <Logo className="mb-5 w-fit" />
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                Open-source audience engagement platform. Built for performance, architected for scale.
              </p>
            </div>
            {[
              { title: "Project", links: ["GitHub", "Live Demo", "Architecture"], urls: ["https://github.com/SimerjeetSingh304/AudienceAI", "/join", "#docs"] },
              { title: "Connect", links: ["Portfolio", "LinkedIn"], urls: ["https://portfolio2026-sepia.vercel.app/", "https://www.linkedin.com/in/simerjeet-singh-8b1700295/"] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground/50 mb-5">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map((l, idx) => (
                    <li key={l}>
                      <Link href={col.urls[idx]} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        {l}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-border/50">
            <p className="text-xs text-muted-foreground/50">© 2026 Simerjeet Singh. Built with Next.js, Redis, and Groq AI.</p>
            <div className="flex gap-5">
              {[
                { icon: Globe, label: "Portfolio", href: "https://portfolio2026-sepia.vercel.app/" },
                { icon: ExternalLink, label: "GitHub", href: "https://github.com/SimerjeetSingh304/AudienceAI" },
                { icon: Layout, label: "LinkedIn", href: "https://www.linkedin.com/in/simerjeet-singh-8b1700295/" }
              ].map((link, i) => (
                <Link key={i} href={link.href} className="text-muted-foreground/40 hover:text-muted-foreground transition-colors flex items-center gap-1.5 text-xs font-medium">
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}