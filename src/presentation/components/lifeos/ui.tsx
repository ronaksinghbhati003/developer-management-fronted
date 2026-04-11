import React from 'react';
import { clsx } from 'clsx';

interface SectionProps {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function Section({ title, action, children, className }: SectionProps) {
  return (
    <section className={clsx('rounded-xl border border-border bg-surface p-4 shadow-sm transition-all hover:shadow-md', className)}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold tracking-tight text-text-primary">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

interface ProgressRowProps {
  label: string;
  value: number;
  tone?: 'blue' | 'green';
}

export function ProgressRow({ label, value, tone = 'blue' }: ProgressRowProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="text-text-secondary">{label}</span>
        <span className="font-medium text-text-primary">{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-surface-muted">
        <div
          className={clsx('h-2 rounded-full transition-all', tone === 'blue' ? 'bg-primary' : 'bg-secondary')}
          style={{ width: `${Math.min(value, 100)}%` }}
        />
      </div>
    </div>
  );
}

interface StatusBadgeProps {
  label: string;
  status: 'On Track' | 'Delayed' | 'Completed' | 'Skipped' | 'Pending';
}

export function StatusBadge({ label, status }: StatusBadgeProps) {
  const statusClass =
    status === 'On Track' || status === 'Completed'
      ? 'bg-success-subtle text-success'
      : status === 'Delayed' || status === 'Skipped'
        ? 'bg-error-subtle text-error'
        : 'bg-primary-subtle text-primary';

  return (
    <span className={clsx('inline-flex rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-black/5', statusClass)}>
      {label}
    </span>
  );
}
