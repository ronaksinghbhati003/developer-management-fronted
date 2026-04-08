import React from 'react';
import { Button } from '@/presentation/components/common';

export default function WelcomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-text-primary font-mono selection:bg-primary/30">
      {/* ─── Navigation ────────────────────────────────────────────────────────── */}
      <header className="fixed top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-glow">
              <span className="text-xl font-bold text-white">DM</span>
            </div>
            <span className="text-xl font-bold tracking-tight">
              Dev<span className="text-primary text-3xl">.</span>Management
            </span>
          </div>

          <nav className="hidden lg:flex lg:items-center lg:gap-12">
            {['Features', 'About', 'Docs'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-[11px] font-bold uppercase tracking-[0.3em] text-text-secondary transition-all hover:text-primary"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-[10px] uppercase tracking-widest">Log In</Button>
            <Button variant="primary" size="md" className="rounded-full px-8 text-[11px] uppercase tracking-widest shadow-glow">Join Us</Button>
          </div>
        </div>
      </header>

      {/* ─── Spacer for Fixed Header ────────────────────────────────────────── */}
      <div className="h-20 w-full" />

      <main className="flex-1">
        {/* ─── Hero Section ────────────────────────────────────────────────────── */}
        <section className="relative flex flex-col items-center justify-center border-b border-border px-6 py-24 text-center sm:px-10 lg:py-48">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_30%,rgba(99,102,241,0.1)_0%,transparent_60%)]" />
          
          <div className="flex w-full max-w-5xl flex-col items-center">
            {/* Project Status Badge */}
            <div className="mb-12 flex animate-fade-in items-center gap-3 rounded-full border border-primary/20 bg-primary/5 px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.3em] text-primary shadow-glow">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span>Dependency Injection Layer Active</span>
            </div>
            
            {/* The Main Headline */}
            <h1 className="leading-[1.1] text-4xl font-black tracking-tighter sm:text-6xl lg:text-8xl">
              Engineering Teams, <br />
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Perfectly Orchestrated.
              </span>
            </h1>
            
            {/* Sub-headline / Description */}
            <p className="mt-12 max-w-3xl text-sm leading-[2] text-text-secondary sm:text-lg lg:text-xl">
              The professional benchmark for managing high-performance remote engineering teams. 
              Architected with <span className="text-primary font-bold transition-all hover:text-primary-hover">Clean Architecture</span> and 
              enterprise-grade <span className="text-primary font-bold transition-all hover:text-primary-hover">TypeScript</span>.
            </p>
            
            {/* Engagement Buttons */}
            <div className="mt-16 flex flex-col items-center justify-center gap-8 sm:flex-row">
              <Button variant="primary" size="xl" className="group min-w-[240px] rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:scale-105 hover:shadow-glow">
                Explore Platform
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
              </Button>
              <Button variant="outline" size="xl" className="min-w-[240px] rounded-full border-2 border-border text-[10px] font-black uppercase tracking-[0.2em] hover:bg-surface">
                View Blueprint
              </Button>
            </div>

            {/* Live DI Container Visualization */}
            <div className="mt-32 w-full max-w-4xl animate-slide-up">
              <div className="relative rounded-3xl border border-border bg-surface/20 p-2 shadow-2xl backdrop-blur-2xl">
                <div className="rounded-2xl border border-border bg-black/60 p-8 text-left shadow-inner sm:p-10">
                  <div className="mb-8 flex items-center justify-between border-b border-border/20 pb-6">
                    <div className="flex gap-2.5">
                      <div className="h-4 w-4 rounded-full bg-[#ff5f56]" />
                      <div className="h-4 w-4 rounded-full bg-[#ffbd2e]" />
                      <div className="h-4 w-4 rounded-full bg-[#27c93f]" />
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-muted">src/lib/di/container.ts</div>
                  </div>
                  <pre className="overflow-x-auto font-mono text-xs leading-10 text-text-secondary sm:text-sm lg:text-base">
                    <code>
                      <span className="text-secondary opacity-70">1  </span> <span className="text-secondary">container</span>.<span className="text-blue-400">bind</span>&lt;<span className="text-primary">IAuthRepository</span>&gt;(<span className="text-primary">TYPES.IAuthRepo</span>)
                      <br /><span className="text-secondary opacity-70">2  </span>   .<span className="text-blue-400">to</span>(<span className="text-primary">AuthRepository</span>)
                      <br /><span className="text-secondary opacity-70">3  </span>   .<span className="text-blue-400">inSingletonScope</span>();
                      <br /><span className="text-secondary opacity-70">4  </span>
                      <br /><span className="text-secondary opacity-70">5  </span> <span className="text-slate-500 italic">// Infrastructure abstraction complete.</span>
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Core Architecture Pillars ───────────────────────────────────────── */}
        <section id="features" className="relative border-y border-border bg-surface/10 py-32 lg:py-48">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <div className="mb-28 flex flex-col items-center text-center">
              <h2 className="text-4xl font-black uppercase tracking-tighter sm:text-6xl text-text-primary">
                The Architecture
              </h2>
              <div className="mt-8 h-1 w-32 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent" />
              <p className="mt-10 max-w-2xl text-lg leading-relaxed text-text-secondary">
                A rigid, battle-tested foundation designed for massive engineering scale.
              </p>
            </div>

            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3 text-center">
              {[
                { title: 'Clean Architecture', desc: 'Isolated layers for logic.', icon: '🏗️' },
                { title: 'Dependency Injection', desc: 'InversifyJS decoupling.', icon: '🔌' },
                { title: 'Feature-Based State', desc: 'Domain-focused modules.', icon: '📦' },
                { title: 'Design System', desc: 'Tokenized Tailwind.', icon: '🎨' },
                { title: 'Zod Validation', desc: 'Runtime safety.', icon: '🛡️' },
                { title: 'Performance', desc: 'Optimized vitals.', icon: '⚡' }
              ].map((pill, i) => (
                <div key={i} className="group relative flex flex-col items-center rounded-[2.5rem] border border-border bg-surface/40 p-12 transition-all hover:bg-surface hover:shadow-glow hover:-translate-y-3 duration-500">
                  <div className="mb-10 flex h-24 w-24 items-center justify-center rounded-[2rem] bg-primary/5 text-5xl group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-700">
                    {pill.icon}
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-widest text-text-primary mb-4 group-hover:text-primary transition-colors">
                    {pill.title}
                  </h3>
                  <p className="text-sm font-medium leading-loose text-text-secondary opacity-60 group-hover:opacity-100 transition-opacity">
                    {pill.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ─── Final Footer ────────────────────────────────────────────────────── */}
      <footer className="bg-background py-24 text-center">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 h-0.5 w-full bg-gradient-to-r from-transparent via-border to-transparent" />
          <p className="text-[10px] font-black uppercase tracking-[0.6em] text-text-disabled">
            &copy; {new Date().getFullYear()} Framework Orchestrator &middot; Build 0.1.0-alpha
          </p>
        </div>
      </footer>
    </div>
  );
}



