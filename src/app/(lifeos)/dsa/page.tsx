'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Button, Input } from '@/presentation/components/common';
import { Section, StatusBadge } from '@/presentation/components/lifeos/ui';

type Difficulty = 'Easy' | 'Medium' | 'Hard';
type ProblemStatus = 'Pending' | 'Solved' | 'Revise';

interface DsaProblem {
  id: string;
  title: string;
  topic: string;
  difficulty: Difficulty;
  status: ProblemStatus;
  solvedAt?: string;
}

const initialProblems: DsaProblem[] = [
  { id: 'p1', title: 'Two Sum', topic: 'Arrays', difficulty: 'Easy', status: 'Solved', solvedAt: '2026-04-11' },
  { id: 'p2', title: 'Lowest Common Ancestor', topic: 'Trees', difficulty: 'Medium', status: 'Pending' },
  { id: 'p3', title: 'Word Ladder', topic: 'Graphs', difficulty: 'Hard', status: 'Revise' },
];

const difficultyPoints: Record<Difficulty, number> = {
  Easy: 1,
  Medium: 2,
  Hard: 3,
};

export default function DsaPage() {
  const [problems, setProblems] = useState<DsaProblem[]>(initialProblems);
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<'All' | Difficulty>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | ProblemStatus>('All');

  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('Easy');

  useEffect(() => {
    const raw = window.localStorage.getItem('lifeos-dsa-problems');
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw) as DsaProblem[];
      if (Array.isArray(parsed) && parsed.length) {
        setProblems(parsed);
      }
    } catch {
      // Ignore malformed persisted data and keep defaults.
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('lifeos-dsa-problems', JSON.stringify(problems));
  }, [problems]);

  const solvedCount = useMemo(
    () => problems.filter((problem) => problem.status === 'Solved').length,
    [problems],
  );
  const reviseCount = useMemo(
    () => problems.filter((problem) => problem.status === 'Revise').length,
    [problems],
  );
  const pendingCount = useMemo(
    () => problems.filter((problem) => problem.status === 'Pending').length,
    [problems],
  );

  const consistencyStreak = useMemo(() => {
    const solvedDates = Array.from(
      new Set(
        problems
          .filter((problem) => problem.status === 'Solved' && problem.solvedAt)
          .map((problem) => problem.solvedAt as string),
      ),
    ).sort((a, b) => b.localeCompare(a));

    if (!solvedDates.length) return 0;

    let streak = 0;
    const cursor = new Date();

    while (true) {
      const dateKey = cursor.toISOString().slice(0, 10);
      if (solvedDates.includes(dateKey)) {
        streak += 1;
        cursor.setDate(cursor.getDate() - 1);
        continue;
      }

      if (streak === 0) {
        cursor.setDate(cursor.getDate() - 1);
        const yesterdayKey = cursor.toISOString().slice(0, 10);
        if (solvedDates.includes(yesterdayKey)) {
          streak += 1;
        }
      }
      break;
    }

    return streak;
  }, [problems]);

  const score = useMemo(() => {
    return problems.reduce((sum, problem) => {
      if (problem.status !== 'Solved') return sum;
      return sum + difficultyPoints[problem.difficulty];
    }, 0);
  }, [problems]);

  const filteredProblems = useMemo(() => {
    return problems.filter((problem) => {
      const bySearch =
        !searchTerm.trim() ||
        `${problem.title} ${problem.topic}`.toLowerCase().includes(searchTerm.trim().toLowerCase());
      const byDifficulty = difficultyFilter === 'All' || problem.difficulty === difficultyFilter;
      const byStatus = statusFilter === 'All' || problem.status === statusFilter;

      return bySearch && byDifficulty && byStatus;
    });
  }, [problems, searchTerm, difficultyFilter, statusFilter]);

  const addProblem = () => {
    if (!title.trim() || !topic.trim()) return;

    const next: DsaProblem = {
      id: `p-${Date.now()}`,
      title: title.trim(),
      topic: topic.trim(),
      difficulty,
      status: 'Pending',
    };

    setProblems((prev) => [next, ...prev]);
    setTitle('');
    setTopic('');
    setDifficulty('Easy');
  };

  const updateStatus = (id: string, status: ProblemStatus) => {
    setProblems((prev) =>
      prev.map((problem) => {
        if (problem.id !== id) return problem;
        if (status === 'Solved') {
          return {
            ...problem,
            status,
            solvedAt: new Date().toISOString().slice(0, 10),
          };
        }
        return {
          ...problem,
          status,
          solvedAt: status === 'Pending' ? undefined : problem.solvedAt,
        };
      }),
    );
  };

  const removeProblem = (id: string) => {
    setProblems((prev) => prev.filter((problem) => problem.id !== id));
  };

  const clearFilters = () => {
    setSearchTerm('');
    setDifficultyFilter('All');
    setStatusFilter('All');
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Section title="Problems Solved">
          <p className="text-2xl font-semibold">{solvedCount}</p>
          <p className="mt-1 text-xs text-text-secondary">Solved and logged</p>
        </Section>

        <Section title="Streak">
          <p className="text-2xl font-semibold text-secondary">{consistencyStreak} days</p>
          <p className="mt-1 text-xs text-text-secondary">Daily solving consistency</p>
        </Section>

        <Section title="Revision Queue">
          <p className="text-2xl font-semibold text-primary">{reviseCount}</p>
          <p className="mt-1 text-xs text-text-secondary">Problems to revisit</p>
        </Section>

        <Section title="DSA Score">
          <p className="text-2xl font-semibold">{score}</p>
          <p className="mt-1 text-xs text-text-secondary">Weighted by difficulty</p>
        </Section>
      </div>

      <Section title="Add New Problem">
        <div className="grid gap-3 md:grid-cols-4">
          <Input
            placeholder="Problem title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <Input
            placeholder="Topic (arrays, trees...)"
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
          />

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-text-primary">Difficulty</span>
            <select
              value={difficulty}
              onChange={(event) => setDifficulty(event.target.value as Difficulty)}
              className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-text-primary outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </label>

          <div className="flex items-end">
            <Button fullWidth onClick={addProblem}>Add Problem</Button>
          </div>
        </div>
      </Section>

      <Section title="Problem Manager" action={<span className="text-xs text-text-secondary">All functionalities enabled</span>}>
        <div className="grid gap-3 md:grid-cols-4">
          <Input
            placeholder="Search by title or topic"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-text-primary">Difficulty</span>
            <select
              value={difficultyFilter}
              onChange={(event) => setDifficultyFilter(event.target.value as 'All' | Difficulty)}
              className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-text-primary outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option value="All">All</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-text-primary">Status</span>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value as 'All' | ProblemStatus)}
              className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-text-primary outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Solved">Solved</option>
              <option value="Revise">Revise</option>
            </select>
          </label>

          <div className="flex items-end gap-2">
            <Button variant="outline" fullWidth onClick={clearFilters}>Reset Filters</Button>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          {filteredProblems.map((problem) => (
            <article key={problem.id} className="rounded-xl border border-border bg-surface p-3">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold text-text-primary">{problem.title}</p>
                  <p className="text-xs text-text-secondary">
                    {problem.topic} - {problem.difficulty}
                    {problem.solvedAt ? ` - Solved on ${problem.solvedAt}` : ''}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge label={problem.status} status={problem.status} />
                  <Button size="sm" variant="outline" onClick={() => updateStatus(problem.id, 'Solved')}>
                    Mark Solved
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => updateStatus(problem.id, 'Revise')}>
                    Move to Revise
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => updateStatus(problem.id, 'Pending')}>
                    Set Pending
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => removeProblem(problem.id)}>
                    Remove
                  </Button>
                </div>
              </div>
            </article>
          ))}

          {filteredProblems.length === 0 && (
            <p className="rounded-xl border border-dashed border-border px-3 py-6 text-center text-sm text-text-secondary">
              No problems found for current filters.
            </p>
          )}
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-xl border border-border bg-surface-muted/40 px-3 py-2.5 text-sm">
            <p className="text-xs text-text-secondary">Pending</p>
            <p className="font-semibold text-text-primary">{pendingCount} problems</p>
          </div>
          <div className="rounded-xl border border-border bg-surface-muted/40 px-3 py-2.5 text-sm">
            <p className="text-xs text-text-secondary">Solved Ratio</p>
            <p className="font-semibold text-text-primary">
              {problems.length ? Math.round((solvedCount / problems.length) * 100) : 0}%
            </p>
          </div>
          <div className="rounded-xl border border-border bg-surface-muted/40 px-3 py-2.5 text-sm">
            <p className="text-xs text-text-secondary">Total Tracked</p>
            <p className="font-semibold text-text-primary">{problems.length}</p>
          </div>
        </div>
      </Section>
    </div>
  );
}
