'use client';

import React from 'react';
import { Button } from '@/presentation/components/common';
import { ProgressRow, Section, StatusBadge } from '@/presentation/components/lifeos/ui';
import { openRealityCheckPanel } from '@/presentation/hooks';

const todayPlan = [
  { time: '07:00', title: 'Workout and stretching', domain: 'Health' },
  { time: '09:00', title: 'System design revision', domain: 'Study' },
  { time: '11:00', title: 'Office sprint tasks', domain: 'Work' },
  { time: '20:00', title: 'DSA practice set', domain: 'DSA' },
];

const pendingTasks = [
  { title: 'Finish React performance notes', domain: 'Study', priority: 'High' },
  { title: 'Prepare project status update', domain: 'Work', priority: 'Medium' },
  { title: 'Complete binary tree problems', domain: 'Study', priority: 'High' },
];

const weeklyProgress = [58, 70, 62, 65, 49, 71, 68];
const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function DashboardPage() {
  const weeklyAverage = Math.round(weeklyProgress.reduce((sum, value) => sum + value, 0) / weeklyProgress.length);
  const bestDay = Math.max(...weeklyProgress);
  const consistencyScore = Math.round(100 - (Math.max(...weeklyProgress) - Math.min(...weeklyProgress)));

  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm text-text-secondary">Good Evening, Piyush</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-text-primary">Keep your day on track</h2>
            <p className="mt-2 text-sm text-text-secondary">Focus on study and health to recover your weekly balance.</p>
          </div>
          <div className="grid min-w-[240px] grid-cols-2 gap-2 sm:grid-cols-4">
            <div className="rounded-xl border border-border bg-surface-hover p-3">
              <p className="text-xs text-text-secondary">Focus Score</p>
              <p className="mt-1 text-lg font-semibold text-text-primary">71%</p>
            </div>
            <div className="rounded-xl border border-border bg-surface-hover p-3">
              <p className="text-xs text-text-secondary">Study Done</p>
              <p className="mt-1 text-lg font-semibold text-primary">2.5h</p>
            </div>
            <div className="rounded-xl border border-border bg-surface-hover p-3">
              <p className="text-xs text-text-secondary">Tasks Left</p>
              <p className="mt-1 text-lg font-semibold text-text-primary">7</p>
            </div>
            <div className="rounded-xl border border-border bg-surface-hover p-3">
              <p className="text-xs text-text-secondary">Streak</p>
              <p className="mt-1 text-lg font-semibold text-secondary">12d</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-3">
        <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm lg:col-span-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-text-primary">Reality Check</h3>
            <StatusBadge label="Attention" status="Delayed" />
          </div>
          <p className="mt-2 text-sm text-text-secondary">You are behind in study and skipped workouts</p>
          <Button className="mt-3" size="sm" onClick={openRealityCheckPanel}>Fix My Plan</Button>
        </section>

        <section className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary-subtle via-surface to-surface p-5 shadow-sm lg:col-span-2">
          <div className="inline-flex items-center rounded-md bg-surface px-2 py-1 text-xs font-medium text-primary ring-1 ring-primary/20">
            AI Insight
          </div>
          <p className="mt-3 text-base font-semibold tracking-tight text-primary">2 hours of study added to weekend</p>
          <p className="mt-1 text-sm text-text-secondary">Suggested to protect weekday focus blocks and reduce context switching.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-surface px-2 py-1 text-xs text-text-secondary ring-1 ring-border">Sat: 10:00-11:00</span>
            <span className="rounded-full bg-surface px-2 py-1 text-xs text-text-secondary ring-1 ring-border">Sun: 09:30-10:30</span>
          </div>
        </section>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Section title="Today's Plan" className="lg:col-span-1">
          <ul className="space-y-2 text-sm">
            {todayPlan.map((item) => (
              <li key={`${item.time}-${item.title}`} className="flex items-center justify-between rounded-lg border border-border bg-surface px-3 py-2.5">
                <div>
                  <p className="font-medium text-text-primary">{item.time} - {item.title}</p>
                </div>
                <span className="rounded-full bg-surface-hover px-2 py-0.5 text-xs text-text-secondary">{item.domain}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Pending Tasks" className="lg:col-span-1">
          <ul className="space-y-2 text-sm">
            {pendingTasks.map((task) => (
              <li key={task.title} className="rounded-lg border border-border bg-surface px-3 py-2.5">
                <p className="font-medium text-text-primary">{task.title}</p>
                <div className="mt-1 flex items-center gap-2 text-xs">
                  <span className="rounded-full bg-surface-hover px-2 py-0.5 text-text-secondary">{task.domain}</span>
                  <span className="rounded-full bg-primary-subtle px-2 py-0.5 text-primary">{task.priority} Priority</span>
                </div>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Life Balance Summary" className="lg:col-span-1">
          <div className="space-y-3">
            <ProgressRow label="Study" value={52} />
            <ProgressRow label="Work" value={70} />
            <ProgressRow label="Health" value={40} tone="green" />
            <ProgressRow label="Social" value={34} tone="green" />
          </div>
        </Section>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Section title="Weekly Progress" className="lg:col-span-2">
          <div className="mb-3 grid gap-2 sm:grid-cols-3">
            <div className="rounded-lg border border-border bg-surface-hover px-3 py-2">
              <p className="text-xs text-text-secondary">Weekly Average</p>
              <p className="mt-1 text-sm font-semibold text-text-primary">{weeklyAverage}%</p>
            </div>
            <div className="rounded-lg border border-border bg-surface-hover px-3 py-2">
              <p className="text-xs text-text-secondary">Best Day</p>
              <p className="mt-1 text-sm font-semibold text-primary">{bestDay}%</p>
            </div>
            <div className="rounded-lg border border-border bg-surface-hover px-3 py-2">
              <p className="text-xs text-text-secondary">Consistency</p>
              <p className="mt-1 text-sm font-semibold text-secondary">{consistencyScore}%</p>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {weeklyProgress.map((value, index) => (
              <div key={`${value}-${index}`} className="space-y-1.5 text-center">
                <div className="flex h-28 items-end rounded-xl border border-border bg-surface-hover p-1">
                  <div
                    className="w-full rounded-lg bg-gradient-to-t from-primary to-primary/70 transition-all"
                    style={{ height: `${value}%` }}
                    title={`${weekDays[index]}: ${value}%`}
                  />
                </div>
                <p className="text-[11px] text-text-secondary">{weekDays[index]}</p>
                <p className="text-[11px] font-medium text-text-primary">{value}%</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Recent Activity Logs" className="lg:col-span-1">
          <ul className="space-y-2 text-sm text-text-secondary">
            <li className="rounded-lg border border-border bg-surface p-2.5">09:00 - Logged study sprint (45m)</li>
            <li className="rounded-lg border border-border bg-surface p-2.5">13:10 - Closed office task #42</li>
            <li className="rounded-lg border border-border bg-surface p-2.5">20:40 - Marked workout as skipped</li>
          </ul>
        </Section>
      </div>
    </div>
  );
}
