'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import { Button, Input } from '@/presentation/components/common';
import { getRealityCheckEventName } from '@/presentation/hooks';

interface LifeOSShellProps {
  children: React.ReactNode;
}

type NavIconName =
  | 'dashboard'
  | 'study'
  | 'work'
  | 'finance'
  | 'health'
  | 'social'
  | 'dsa'
  | 'portfolio'
  | 'settings';

interface NavItem {
  label: string;
  href: string;
  icon: NavIconName;
}

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: 'dashboard' },
  { label: 'Study', href: '/study', icon: 'study' },
  { label: 'Work', href: '/work', icon: 'work' },
  { label: 'Finance', href: '/finance', icon: 'finance' },
  { label: 'Health', href: '/health', icon: 'health' },
  { label: 'Social', href: '/social', icon: 'social' },
  { label: 'DSA', href: '/dsa', icon: 'dsa' },
  { label: 'Portfolio', href: '/portfolio', icon: 'portfolio' },
  { label: 'Settings', href: '/settings', icon: 'settings' },
] as const satisfies readonly NavItem[];

function NavIcon({ name, active }: { name: NavIconName; active: boolean }) {
  const iconClass = active ? 'text-primary' : 'text-text-secondary';

  if (name === 'dashboard') {
    return (
      <svg aria-hidden="true" viewBox="0 0 20 20" className={`h-4 w-4 ${iconClass}`} fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="6" height="6" rx="1.2" />
        <rect x="11" y="3" width="6" height="4" rx="1.2" />
        <rect x="11" y="9" width="6" height="8" rx="1.2" />
        <rect x="3" y="11" width="6" height="6" rx="1.2" />
      </svg>
    );
  }

  if (name === 'study') {
    return (
      <svg aria-hidden="true" viewBox="0 0 20 20" className={`h-4 w-4 ${iconClass}`} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 4.5h8a2 2 0 0 1 2 2V16H6a2 2 0 0 0-2 2z" />
        <path d="M6 6h8" />
        <path d="M6 9h6" />
      </svg>
    );
  }

  if (name === 'work') {
    return (
      <svg aria-hidden="true" viewBox="0 0 20 20" className={`h-4 w-4 ${iconClass}`} fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="6" width="14" height="10" rx="2" />
        <path d="M7 6V4.8A1.8 1.8 0 0 1 8.8 3h2.4A1.8 1.8 0 0 1 13 4.8V6" />
      </svg>
    );
  }

  if (name === 'finance') {
    return (
      <svg aria-hidden="true" viewBox="0 0 20 20" className={`h-4 w-4 ${iconClass}`} fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="4" width="14" height="12" rx="2" />
        <circle cx="10" cy="10" r="2.5" />
        <path d="M14 10h1.5" />
      </svg>
    );
  }

  if (name === 'health') {
    return (
      <svg aria-hidden="true" viewBox="0 0 20 20" className={`h-4 w-4 ${iconClass}`} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M10 16s-6-3.7-6-8a3.4 3.4 0 0 1 6-2.2A3.4 3.4 0 0 1 16 8c0 4.3-6 8-6 8z" />
      </svg>
    );
  }

  if (name === 'social') {
    return (
      <svg aria-hidden="true" viewBox="0 0 20 20" className={`h-4 w-4 ${iconClass}`} fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="7" cy="8" r="2.3" />
        <circle cx="13.5" cy="7.5" r="1.8" />
        <path d="M3.8 15.5a3.8 3.8 0 0 1 6.4-2.8" />
        <path d="M11.4 15.5a3 3 0 0 1 4.8-2.3" />
      </svg>
    );
  }

  if (name === 'dsa') {
    return (
      <svg aria-hidden="true" viewBox="0 0 20 20" className={`h-4 w-4 ${iconClass}`} fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="6" cy="6" r="1.4" />
        <circle cx="14" cy="6" r="1.4" />
        <circle cx="10" cy="14" r="1.4" />
        <path d="M7.2 7.2l1.7 5.6" />
        <path d="M12.8 7.2l-1.7 5.6" />
        <path d="M7.4 6h5.2" />
      </svg>
    );
  }

  if (name === 'portfolio') {
    return (
      <svg aria-hidden="true" viewBox="0 0 20 20" className={`h-4 w-4 ${iconClass}`} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 7h12v8.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 4 15.5z" />
        <path d="M7 7V5.5A1.5 1.5 0 0 1 8.5 4h3A1.5 1.5 0 0 1 13 5.5V7" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className={`h-4 w-4 ${iconClass}`} fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="10" cy="10" r="3" />
      <path d="M10 2.5v2" />
      <path d="M10 15.5v2" />
      <path d="M2.5 10h2" />
      <path d="M15.5 10h2" />
    </svg>
  );
}

const PAGE_TITLES: Record<string, string> = {
  dashboard: 'Dashboard',
  study: 'Study',
  work: 'Work',
  finance: 'Finance',
  health: 'Health',
  social: 'Social',
  dsa: 'DSA',
  portfolio: 'Portfolio',
  settings: 'Settings',
};

function getPageTitle(pathname: string): string {
  const key = pathname.split('/')[1] ?? 'dashboard';
  return PAGE_TITLES[key] ?? 'Dashboard';
}

function getCurrentDateText() {
  return new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function LifeOSShell({ children }: LifeOSShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [panelOpen, setPanelOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const title = useMemo(() => getPageTitle(pathname), [pathname]);

  useEffect(() => {
    if (pathname === '/dashboard') {
      setPanelOpen(true);
    }
  }, [pathname]);

  useEffect(() => {
    const eventName = getRealityCheckEventName();
    const openPanel = () => setPanelOpen(true);

    window.addEventListener(eventName, openPanel);

    return () => {
      window.removeEventListener(eventName, openPanel);
    };
  }, []);

  const handleFixMyPlan = () => {
    setPanelOpen(false);
    router.push('/work#product-tasks');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-surface-hover/60 text-text-primary">
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[250px] border-r border-border/90 bg-surface/95 backdrop-blur lg:block">
        <div className="border-b border-border px-5 py-4">
          <p className="text-lg font-semibold tracking-tight">LifeOS</p>
          <p className="mt-1 text-xs text-text-secondary">Life Operating System</p>
        </div>
        <nav className="p-3">
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={[
                      'flex items-center rounded-lg px-3 py-2.5 text-sm transition-colors',
                      active
                        ? 'bg-primary-subtle font-medium text-primary'
                        : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary',
                    ].join(' ')}
                  >
                    <span className="mr-2 inline-flex items-center justify-center">
                      <NavIcon name={item.icon} active={active} />
                    </span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="absolute bottom-4 left-4 right-4 rounded-lg border border-border bg-surface p-3">
          <p className="text-xs font-medium text-text-primary">AI Mode</p>
          <p className="mt-1 text-xs text-text-secondary">Course correction alerts enabled</p>
        </div>
      </aside>

      <div className="lg:pl-[250px]">
        <header className="sticky top-0 z-30 border-b border-border bg-surface/95 backdrop-blur">
          <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
              >
                Menu
              </Button>
              <div>
                <h1 className="text-base font-semibold text-text-primary sm:text-lg">{title}</h1>
                <p className="text-xs text-text-secondary">{getCurrentDateText()}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <Button size="sm" variant="outline" className="hidden border-border sm:inline-flex">Plan Tomorrow</Button>
              <Button size="sm" variant="primary">Log Day</Button>
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-sm font-semibold shadow-sm">
                P
              </div>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="border-t border-border bg-surface p-3 lg:hidden">
              <ul className="grid grid-cols-2 gap-2">
                {NAV_ITEMS.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={[
                          'flex items-center gap-2 rounded-md border px-3 py-2 text-sm',
                          active
                            ? 'border-primary bg-primary-subtle text-primary'
                            : 'border-border text-text-secondary hover:bg-surface-hover',
                        ].join(' ')}
                      >
                        <NavIcon name={item.icon} active={active} />
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </header>

        <main className="mx-auto w-full max-w-[1200px] px-4 pb-36 pt-6 sm:px-6">{children}</main>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-30 px-4 pb-4 pt-2 lg:pl-[270px]">
        <div className="mx-auto w-full max-w-[1200px] rounded-xl border border-primary/20 bg-surface p-2 shadow-lg shadow-primary/10">
          <div className="mb-2 flex items-center justify-between px-2">
            <div className="inline-flex items-center gap-2 rounded-md bg-primary-subtle px-2 py-1">
              <span className="h-2 w-2 rounded-full bg-secondary" />
              <span className="text-xs font-medium text-primary">AI Planner</span>
            </div>
            <p className="hidden text-xs text-text-secondary sm:block">Smart scheduling assistant</p>
          </div>
          <div className="flex items-center gap-2">
          <Input
            className="h-11 border-primary/25 focus:border-primary"
            placeholder="Log your day or ask AI to plan your schedule"
            aria-label="AI input"
          />
          <Button size="sm" className="h-11 px-6 shadow-sm">Send</Button>
          </div>
        </div>
      </div>

      <aside
        aria-label="Course Correction Panel"
        className={[
          'fixed right-4 top-20 z-50 w-[340px] rounded-xl border border-border bg-surface p-4 shadow-xl shadow-slate-900/10 transition-all duration-200',
          panelOpen ? 'translate-x-0 opacity-100 animate-slide-in-right' : 'translate-x-6 opacity-0 pointer-events-none',
        ].join(' ')}
      >
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-text-primary">Course Correction</h2>
          <button
            type="button"
            className="text-xs text-text-secondary hover:text-text-primary"
            onClick={() => setPanelOpen(false)}
          >
            Close
          </button>
        </div>
        <p className="mb-3 text-sm text-text-secondary">
          You spent too much time on low-priority tasks and missed study goals
        </p>
        <ul className="mb-4 space-y-2 text-sm">
          <li className="flex justify-between rounded-md border border-border px-2 py-1.5"><span>Study</span><span className="text-error">Missed (2h pending)</span></li>
          <li className="flex justify-between rounded-md border border-border px-2 py-1.5"><span>Work</span><span className="text-secondary">Completed</span></li>
          <li className="flex justify-between rounded-md border border-border px-2 py-1.5"><span>Health</span><span className="text-error">Skipped</span></li>
        </ul>
        <div className="flex items-center gap-2">
          <Button size="sm" className="flex-1" onClick={handleFixMyPlan}>Fix My Plan</Button>
          <Button size="sm" variant="outline" className="flex-1" onClick={() => setPanelOpen(false)}>
            Remind Later
          </Button>
        </div>
      </aside>
    </div>
  );
}
