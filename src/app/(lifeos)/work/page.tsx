import React from 'react';
import { Button } from '@/presentation/components/common';
import { ProgressRow, Section, StatusBadge } from '@/presentation/components/lifeos/ui';

const scheduleBlocks = [
  { time: '09:00 - 10:00', title: 'Sprint planning prep', lane: 'Office', focus: 'High' },
  { time: '10:15 - 11:00', title: 'Review teammate PR', lane: 'Office', focus: 'Medium' },
  { time: '11:30 - 12:30', title: 'LifeOS dashboard polish', lane: 'Product', focus: 'High' },
  { time: '14:00 - 15:10', title: 'Landing page bugfix', lane: 'Freelance', focus: 'High' },
  { time: '15:15 - 15:50', title: 'CMS workflow review', lane: 'Product', focus: 'Medium' },
  { time: '16:00 - 16:35', title: 'Client analytics setup', lane: 'Freelance', focus: 'Medium' },
];

const officeTasks = [
  { name: 'Sprint planning prep', estimate: '1h', spent: '1h 20m', priority: 'High', status: 'Completed' as const },
  { name: 'Review teammate PR', estimate: '45m', spent: '45m', priority: 'Medium', status: 'Pending' as const },
  { name: 'Update sprint notes', estimate: '30m', spent: '0m', priority: 'Low', status: 'Pending' as const },
];

const freelanceTasks = [
  { name: 'Landing page bugfix', estimate: '1h', spent: '1h 10m', priority: 'High', status: 'Completed' as const },
  { name: 'Client analytics setup', estimate: '40m', spent: '35m', priority: 'Medium', status: 'Pending' as const },
  { name: 'Prepare weekly client report', estimate: '50m', spent: '0m', priority: 'Medium', status: 'Pending' as const },
];

const productTasks = [
  { product: 'LifeOS', name: 'Refine dashboard course-correction UX', estimate: '1h', spent: '30m', priority: 'High', status: 'Pending' as const },
  { product: 'LifeOS', name: 'Integrate work scheduling actions', estimate: '45m', spent: '20m', priority: 'Medium', status: 'Pending' as const },
  { product: 'Content Management System', name: 'Finalize editorial workflow status chip logic', estimate: '50m', spent: '35m', priority: 'High', status: 'Pending' as const },
  { product: 'Content Management System', name: 'Review content approval API contract', estimate: '40m', spent: '15m', priority: 'Medium', status: 'Pending' as const },
];

const deadlines = [
  { date: '13 Apr', task: 'Sprint update submission', owner: 'Office' },
  { date: '14 Apr', task: 'Client report delivery', owner: 'Freelance' },
  { date: '15 Apr', task: 'Roadmap sync meeting', owner: 'Office' },
];

function PriorityPill({ value }: { value: string }) {
  const tone =
    value === 'High'
      ? 'bg-error-subtle text-error'
      : value === 'Medium'
        ? 'bg-warning-subtle text-warning'
        : 'bg-surface-hover text-text-secondary';

  return <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${tone}`}>{value}</span>;
}

export default function WorkPage() {
  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm text-text-secondary">Work Command Center</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-text-primary">Manage time, priorities, and delivery</h2>
            <p className="mt-2 text-sm text-text-secondary">Plan your office and freelance work in a single daily execution view.</p>
          </div>
          <div className="grid min-w-[220px] grid-cols-2 gap-2">
            <div className="rounded-xl border border-border bg-surface-hover p-3">
              <p className="text-xs text-text-secondary">Planned Hours</p>
              <p className="mt-1 text-lg font-semibold text-text-primary">5h 05m</p>
            </div>
            <div className="rounded-xl border border-border bg-surface-hover p-3">
              <p className="text-xs text-text-secondary">Tracked Hours</p>
              <p className="mt-1 text-lg font-semibold text-primary">4h 10m</p>
            </div>
            <div className="rounded-xl border border-border bg-surface-hover p-3">
              <p className="text-xs text-text-secondary">Capacity Left</p>
              <p className="mt-1 text-lg font-semibold text-secondary">1h 20m</p>
            </div>
            <div className="rounded-xl border border-border bg-surface-hover p-3">
              <p className="text-xs text-text-secondary">Productivity</p>
              <p className="mt-1 text-lg font-semibold text-secondary">78%</p>
            </div>
          </div>
        </div>
      </section>

      <Section
        title="Today's Schedule"
        action={<Button size="sm">Add Time Block</Button>}
      >
        <ul className="space-y-2">
          {scheduleBlocks.map((block) => (
            <li key={`${block.time}-${block.title}`} className="flex items-center justify-between rounded-xl border border-border bg-surface px-3 py-2.5">
              <div>
                <p className="text-sm font-medium text-text-primary">{block.time} - {block.title}</p>
                <p className="mt-0.5 text-xs text-text-secondary">{block.lane}</p>
              </div>
              <PriorityPill value={block.focus} />
            </li>
          ))}
        </ul>
      </Section>

      <div className="grid gap-4 lg:grid-cols-2">
        <Section title="Office Tasks">
          <ul className="space-y-2">
            {officeTasks.map((task) => (
              <li key={task.name} className="rounded-xl border border-border bg-surface p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-text-primary">{task.name}</p>
                    <p className="mt-1 text-xs text-text-secondary">Estimate: {task.estimate} | Spent: {task.spent}</p>
                  </div>
                  <StatusBadge label={task.status} status={task.status} />
                </div>
                <div className="mt-2">
                  <PriorityPill value={task.priority} />
                </div>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Freelance Tasks">
          <ul className="space-y-2">
            {freelanceTasks.map((task) => (
              <li key={task.name} className="rounded-xl border border-border bg-surface p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-text-primary">{task.name}</p>
                    <p className="mt-1 text-xs text-text-secondary">Estimate: {task.estimate} | Spent: {task.spent}</p>
                  </div>
                  <StatusBadge label={task.status} status={task.status} />
                </div>
                <div className="mt-2">
                  <PriorityPill value={task.priority} />
                </div>
              </li>
            ))}
          </ul>
        </Section>
      </div>

      <Section
        title="Product Tasks"
        action={<span className="text-xs text-text-secondary">LifeOS + Content Management System</span>}
        className="scroll-mt-24"
      >
        <div id="product-tasks" className="space-y-2">
          {productTasks.map((task) => (
            <article key={`${task.product}-${task.name}`} className="rounded-xl border border-border bg-surface p-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-text-primary">{task.name}</p>
                  <p className="mt-1 text-xs text-text-secondary">{task.product}</p>
                  <p className="mt-1 text-xs text-text-secondary">Estimate: {task.estimate} | Spent: {task.spent}</p>
                </div>
                <StatusBadge label={task.status} status={task.status} />
              </div>
              <div className="mt-2">
                <PriorityPill value={task.priority} />
              </div>
            </article>
          ))}
        </div>
      </Section>

      <div className="grid gap-4 lg:grid-cols-2">
        <Section title="Time Allocation">
          <div className="space-y-3">
            <ProgressRow label="Office" value={62} />
            <ProgressRow label="Freelance" value={38} tone="green" />
            <ProgressRow label="Product" value={46} />
            <ProgressRow label="Deep Work Completion" value={74} />
          </div>
        </Section>

        <Section title="Upcoming Deadlines">
          <ul className="space-y-2">
            {deadlines.map((item) => (
              <li key={`${item.date}-${item.task}`} className="rounded-xl border border-border bg-surface px-3 py-2.5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-text-primary">{item.task}</p>
                  <span className="rounded-full bg-primary-subtle px-2 py-0.5 text-xs text-primary">{item.date}</span>
                </div>
                <p className="mt-1 text-xs text-text-secondary">{item.owner}</p>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </div>
  );
}
