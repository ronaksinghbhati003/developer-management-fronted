'use client';

import React, { useState } from 'react';
import { Button } from '@/presentation/components/common';
import { ProgressRow, Section, StatusBadge } from '@/presentation/components/lifeos/ui';

type TopicId = 'system-design' | 'react-patterns' | 'langchain-ai';

const topics: Array<{
  id: TopicId;
  title: string;
  progress: number;
  status: 'On Track' | 'Delayed' | 'Completed' | 'Skipped' | 'Pending';
  sessions: string;
}> = [
  {
    id: 'system-design',
    title: 'System Design Basics',
    progress: 64,
    status: 'On Track',
    sessions: '4 sessions this week',
  },
  {
    id: 'react-patterns',
    title: 'Advanced React Patterns',
    progress: 39,
    status: 'Delayed',
    sessions: '2 sessions this week',
  },
  {
    id: 'langchain-ai',
    title: 'LangChain and Applied AI',
    progress: 28,
    status: 'On Track',
    sessions: '3 sessions this week',
  },
];

const practicalImplementations: Array<{
  id: string;
  topicId: TopicId;
  objective: string;
  tasks: string[];
  completion: number;
}> = [
  {
    id: 'practical-langchain',
    topicId: 'langchain-ai',
    objective: 'Build a mini retrieval assistant to understand end-to-end LangChain workflows.',
    completion: 35,
    tasks: [
      'Implement notes-to-QA retrieval pipeline with embeddings.',
      'Create prompt templates for concise, exam-style answers.',
      'Add short-term memory for follow-up context handling.',
    ],
  },
  {
    id: 'practical-system-design',
    topicId: 'system-design',
    objective: 'Convert design theory into practical architecture communication.',
    completion: 52,
    tasks: [
      'Design URL shortener with assumptions and bottlenecks.',
      'Document API + schema for a messaging system.',
      'Write trade-offs for cache, queue, and consistency.',
    ],
  },
  {
    id: 'practical-react',
    topicId: 'react-patterns',
    objective: 'Apply reusable React patterns to real screens.',
    completion: 30,
    tasks: [
      'Build compound modal workflow components.',
      'Refactor one page using domain-level hooks.',
      'Measure and compare render performance after memoization.',
    ],
  },
];

const exams: Array<{
  date: string;
  subject: string;
  syllabus: string;
  priority: 'High' | 'Medium';
}> = [
  {
    date: '20 Apr',
    subject: 'Operating Systems Mid-Sem',
    syllabus: 'Unit 1-3',
    priority: 'High',
  },
  {
    date: '24 Apr',
    subject: 'DBMS Mid-Sem',
    syllabus: 'Unit 2-4',
    priority: 'High',
  },
  {
    date: '29 Apr',
    subject: 'Computer Networks Quiz',
    syllabus: 'Routing + Transport',
    priority: 'Medium',
  },
];

const pendingTopics = [
  { title: 'Graph Algorithms', detail: '2 chapters', eta: 'Due in 3 days' },
  { title: 'OS Scheduling', detail: 'Notes rewrite', eta: 'Due tomorrow' },
];

const backlogTopics = [
  { title: 'Database Indexing', reason: 'Delayed 6 days' },
  { title: 'DP Revision Set', reason: 'Delayed 4 days' },
];

const collegeSubjects = [
  { name: 'Operating Systems', attendance: '84%', internal: '22/30', prep: 58 },
  { name: 'Database Management Systems', attendance: '88%', internal: '24/30', prep: 66 },
  { name: 'Computer Networks', attendance: '79%', internal: '21/30', prep: 52 },
  { name: 'Software Engineering', attendance: '91%', internal: '26/30', prep: 73 },
];

const examPrepBlocks = [
  { slot: '07:00 - 08:00', task: 'OS Process Scheduling + Notes Revision' },
  { slot: '19:30 - 20:30', task: 'DBMS Normalization Problems' },
  { slot: '22:00 - 22:30', task: 'CN Quick Revision + Formula Sheet' },
];

function getPracticalByTopic(topicId: TopicId) {
  return practicalImplementations.find((item) => item.topicId === topicId);
}

export default function StudyPage() {
  const [viewMode, setViewMode] = useState<'flow' | 'cards'>('flow');

  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm text-text-secondary">Study Tracker</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-text-primary">Connected Learning Workspace</h2>
            <p className="mt-2 text-sm text-text-secondary">Link personal learning topics directly with practical implementation tasks.</p>
          </div>
          <div className="grid min-w-[220px] grid-cols-2 gap-2">
            <div className="rounded-xl border border-border bg-surface-hover p-3">
              <p className="text-xs text-text-secondary">Active Topics</p>
              <p className="mt-1 text-lg font-semibold text-text-primary">3</p>
            </div>
            <div className="rounded-xl border border-border bg-surface-hover p-3">
              <p className="text-xs text-text-secondary">Practical Modules</p>
              <p className="mt-1 text-lg font-semibold text-primary">3</p>
            </div>
            <div className="rounded-xl border border-border bg-surface-hover p-3">
              <p className="text-xs text-text-secondary">Academic Exams</p>
              <p className="mt-1 text-lg font-semibold text-text-primary">3</p>
            </div>
            <div className="rounded-xl border border-border bg-surface-hover p-3">
              <p className="text-xs text-text-secondary">Avg Progress</p>
              <p className="mt-1 text-lg font-semibold text-primary">44%</p>
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="inline-flex rounded-lg border border-border bg-surface p-1">
          <button
            type="button"
            className={[
              'rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
              viewMode === 'flow' ? 'bg-primary text-white' : 'text-text-secondary hover:text-text-primary',
            ].join(' ')}
            onClick={() => setViewMode('flow')}
          >
            Flow View
          </button>
          <button
            type="button"
            className={[
              'rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
              viewMode === 'cards' ? 'bg-primary text-white' : 'text-text-secondary hover:text-text-primary',
            ].join(' ')}
            onClick={() => setViewMode('cards')}
          >
            Card View
          </button>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline">Add Practical</Button>
          <Button size="sm">Add Topic</Button>
        </div>
      </div>

      <Section title="Priority Queue (Pending + Backlog)">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="space-y-2">
            <div className="mb-1 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-text-primary">Pending Topics</h3>
              <span className="rounded-full bg-primary-subtle px-2 py-0.5 text-xs text-primary">{pendingTopics.length}</span>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              {pendingTopics.map((topic) => (
                <article key={topic.title} className="rounded-xl border border-border bg-surface p-3 shadow-sm">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-text-primary">{topic.title}</p>
                    <span className="rounded-full bg-primary-subtle px-2 py-0.5 text-xs text-primary">Pending</span>
                  </div>
                  <p className="mt-1 text-xs text-text-secondary">{topic.detail}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="rounded-full bg-surface-hover px-2 py-0.5 text-xs text-text-secondary">{topic.eta}</span>
                    <button type="button" className="text-xs font-medium text-primary hover:underline">Plan block</button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="mb-1 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-text-primary">Backlog Topics</h3>
              <span className="rounded-full bg-error-subtle px-2 py-0.5 text-xs text-error">{backlogTopics.length}</span>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              {backlogTopics.map((topic) => (
                <article key={topic.title} className="rounded-xl border border-error/60 bg-error-subtle p-3 shadow-sm">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-error">{topic.title}</p>
                    <span className="rounded-full bg-white/70 px-2 py-0.5 text-xs text-error">Backlog</span>
                  </div>
                  <p className="mt-1 text-xs text-error/90">{topic.reason}</p>
                  <div className="mt-2 text-right">
                    <button type="button" className="text-xs font-medium text-error hover:underline">Recover now</button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {viewMode === 'flow' ? (
        <>
          <Section title="Learning Connections (Topic -> Practical)">
            <div className="space-y-3">
              {topics.map((topic) => {
                const practical = getPracticalByTopic(topic.id);

                return (
                  <article key={topic.id} className="rounded-xl border border-border bg-surface p-3.5">
                    <div className="mb-2 flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-semibold text-text-primary">{topic.title}</h3>
                        <p className="text-xs text-text-secondary">{topic.sessions}</p>
                      </div>
                      <StatusBadge label={topic.status} status={topic.status} />
                    </div>

                    <div className="mb-2 grid gap-2 sm:grid-cols-3">
                      <span className="rounded-full bg-surface-hover px-2 py-1 text-xs text-text-secondary">Personal Learning Topic</span>
                      <span className="rounded-full bg-primary-subtle px-2 py-1 text-xs text-primary">
                        Practical: {practical ? `${practical.completion}% done` : 'Not linked'}
                      </span>
                      <span className="rounded-full bg-surface-hover px-2 py-1 text-xs text-text-secondary">Execution Focus</span>
                    </div>

                    <ProgressRow label="Topic Progress" value={topic.progress} />
                  </article>
                );
              })}
            </div>
          </Section>

          <Section title="Practical Implementation (Topic Linked)">
            <div className="space-y-3">
              {practicalImplementations.map((implementation) => {
                const linkedTopic = topics.find((topic) => topic.id === implementation.topicId);

                return (
                  <article key={implementation.id} className="rounded-xl border border-border bg-surface p-3.5">
                    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-sm font-semibold text-text-primary">{linkedTopic?.title}</h3>
                      <span className="rounded-full bg-primary-subtle px-2 py-0.5 text-xs text-primary">Linked Topic</span>
                    </div>

                    <p className="text-xs text-text-secondary">Objective: {implementation.objective}</p>
                    <p className="mt-1 text-xs text-secondary">AI-supported practical path for deeper understanding.</p>

                    <div className="mt-2">
                      <ProgressRow label="Practical Completion" value={implementation.completion} />
                    </div>

                    <div className="mt-2 grid gap-2">
                      {implementation.tasks.map((task) => (
                        <div key={task} className="rounded-lg border border-border bg-surface-hover px-3 py-2 text-xs text-text-secondary">
                          {task}
                        </div>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </Section>
        </>
      ) : (
        <Section title="Topic Cards (Practical Aligned)">
          <div className="grid gap-3 lg:grid-cols-2">
            {topics.map((topic) => {
              const practical = getPracticalByTopic(topic.id);

              return (
                <article key={topic.id} className="rounded-xl border border-border bg-surface p-4">
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-semibold text-text-primary">{topic.title}</h3>
                      <p className="text-xs text-text-secondary">{topic.sessions}</p>
                    </div>
                    <StatusBadge label={topic.status} status={topic.status} />
                  </div>

                  <div className="space-y-2">
                    <ProgressRow label="Topic Progress" value={topic.progress} />
                    <ProgressRow label="Practical Progress" value={practical?.completion ?? 0} />
                  </div>

                  <p className="mt-3 text-xs text-text-secondary">Objective: {practical?.objective ?? 'No practical module linked yet.'}</p>

                  <div className="mt-2 space-y-1.5">
                    {(practical?.tasks ?? []).slice(0, 2).map((task) => (
                      <div key={task} className="rounded-md border border-border bg-surface-hover px-2.5 py-1.5 text-xs text-text-secondary">
                        {task}
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="rounded-full bg-primary-subtle px-2 py-0.5 text-xs text-primary">Linked Practical</span>
                    <button type="button" className="text-xs font-medium text-primary hover:underline">
                      Open full practical
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </Section>
      )}

      <Section title="College Subjects (Academic Track - Separate)">
        <div className="space-y-2">
          {collegeSubjects.map((subject) => (
            <article key={subject.name} className="rounded-xl border border-border bg-surface p-3">
              <div className="mb-2 flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-text-primary">{subject.name}</h3>
                <span className="rounded-full bg-primary-subtle px-2 py-0.5 text-xs text-primary">Attendance {subject.attendance}</span>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <p className="text-xs text-text-secondary">Internal Score: {subject.internal}</p>
                <p className="text-xs text-text-secondary">Exam Prep: {subject.prep}%</p>
              </div>
              <div className="mt-2">
                <ProgressRow label="Academic Readiness" value={subject.prep} />
              </div>
            </article>
          ))}
        </div>
      </Section>

      <div className="grid gap-4 lg:grid-cols-2">
        <Section title="Upcoming Exams">
          <ul className="space-y-2">
            {exams.map((exam) => (
              <li key={`${exam.date}-${exam.subject}`} className="rounded-xl border border-border bg-surface px-3 py-2.5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-text-primary">{exam.subject}</p>
                  <span className="rounded-full bg-surface-hover px-2 py-0.5 text-xs text-text-secondary">{exam.date}</span>
                </div>
                <p className="mt-1 text-xs text-text-secondary">Syllabus: {exam.syllabus}</p>
                <span className={[
                  'mt-2 inline-flex rounded-full px-2 py-0.5 text-xs font-medium',
                  exam.priority === 'High' ? 'bg-error-subtle text-error' : 'bg-warning-subtle text-warning',
                ].join(' ')}>
                  {exam.priority} Priority
                </span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Exam Prep Schedule">
          <ul className="space-y-2">
            {examPrepBlocks.map((block) => (
              <li key={`${block.slot}-${block.task}`} className="rounded-xl border border-border bg-surface px-3 py-2.5">
                <p className="text-sm font-medium text-text-primary">{block.slot}</p>
                <p className="mt-1 text-xs text-text-secondary">{block.task}</p>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </div>
  );
}
