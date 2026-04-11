'use client';

import React, { useMemo, useState } from 'react';
import { Button, Input } from '@/presentation/components/common';
import { Section, StatusBadge } from '@/presentation/components/lifeos/ui';

type ExpenseCategory = 'Living' | 'Food' | 'Transport' | 'Learning' | 'Health' | 'Other';
type FinanceTaskStatus = 'planned' | 'in-progress' | 'done';

interface ExpenseItem {
  id: string;
  title: string;
  amount: number;
  category: ExpenseCategory;
}

interface FinanceTask {
  id: string;
  title: string;
  amount: number;
  dueDate: string;
  status: FinanceTaskStatus;
}

const categoryStyles: Record<ExpenseCategory, string> = {
  Living: 'bg-primary-subtle text-primary',
  Food: 'bg-amber-100 text-amber-700',
  Transport: 'bg-cyan-100 text-cyan-700',
  Learning: 'bg-violet-100 text-violet-700',
  Health: 'bg-emerald-100 text-emerald-700',
  Other: 'bg-surface-muted text-text-secondary',
};

const statusColumns: Array<{ key: FinanceTaskStatus; label: string }> = [
  { key: 'planned', label: 'Planned' },
  { key: 'in-progress', label: 'In Progress' },
  { key: 'done', label: 'Done' },
];

function formatINR(value: number) {
  return `Rs ${value.toLocaleString('en-IN')}`;
}

function getNextStatus(status: FinanceTaskStatus): FinanceTaskStatus {
  if (status === 'planned') return 'in-progress';
  if (status === 'in-progress') return 'done';
  return 'planned';
}

export default function FinancePage() {
  const monthlyIncome = 78000;

  const [expenses, setExpenses] = useState<ExpenseItem[]>([
    { id: 'e1', title: 'Rent', amount: 15000, category: 'Living' },
    { id: 'e2', title: 'Food', amount: 8200, category: 'Food' },
    { id: 'e3', title: 'Transport', amount: 2800, category: 'Transport' },
    { id: 'e4', title: 'Gym + Supplements', amount: 3200, category: 'Health' },
  ]);

  const [tasks, setTasks] = useState<FinanceTask[]>([
    { id: 't1', title: 'Buy Mechanical Keyboard', amount: 6500, dueDate: '2026-04-20', status: 'planned' },
    { id: 't2', title: 'Renew Course Subscription', amount: 2999, dueDate: '2026-04-16', status: 'done' },
    { id: 't3', title: 'Emergency Fund Top-up', amount: 10000, dueDate: '2026-04-25', status: 'in-progress' },
  ]);

  const [expenseTitle, setExpenseTitle] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseCategory, setExpenseCategory] = useState<ExpenseCategory>('Other');

  const [taskTitle, setTaskTitle] = useState('');
  const [taskAmount, setTaskAmount] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');

  const totalExpenses = useMemo(() => expenses.reduce((sum, item) => sum + item.amount, 0), [expenses]);
  const totalSavings = monthlyIncome - totalExpenses;
  const savingsRate = Math.max(0, Math.round((totalSavings / monthlyIncome) * 100));
  const plannedSpend = useMemo(
    () => tasks.filter((task) => task.status !== 'done').reduce((sum, task) => sum + task.amount, 0),
    [tasks],
  );

  const categoryTotals = useMemo(() => {
    return expenses.reduce<Record<ExpenseCategory, number>>(
      (acc, item) => {
        acc[item.category] += item.amount;
        return acc;
      },
      { Living: 0, Food: 0, Transport: 0, Learning: 0, Health: 0, Other: 0 },
    );
  }, [expenses]);

  const addExpense = () => {
    const amount = Number(expenseAmount);
    if (!expenseTitle.trim() || Number.isNaN(amount) || amount <= 0) return;

    setExpenses((prev) => [
      {
        id: `e-${Date.now()}`,
        title: expenseTitle.trim(),
        amount,
        category: expenseCategory,
      },
      ...prev,
    ]);

    setExpenseTitle('');
    setExpenseAmount('');
    setExpenseCategory('Other');
  };

  const addTask = () => {
    const amount = Number(taskAmount);
    if (!taskTitle.trim() || Number.isNaN(amount) || amount <= 0 || !taskDueDate) return;

    setTasks((prev) => [
      {
        id: `t-${Date.now()}`,
        title: taskTitle.trim(),
        amount,
        dueDate: taskDueDate,
        status: 'planned',
      },
      ...prev,
    ]);

    setTaskTitle('');
    setTaskAmount('');
    setTaskDueDate('');
  };

  const cycleTaskStatus = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, status: getNextStatus(task.status) } : task)),
    );
  };

  const removeTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Section title="Income">
          <p className="text-2xl font-semibold">{formatINR(monthlyIncome)}</p>
          <p className="mt-1 text-xs text-text-secondary">Monthly active income</p>
        </Section>

        <Section title="Expenses">
          <p className="text-2xl font-semibold">{formatINR(totalExpenses)}</p>
          <p className="mt-1 text-xs text-text-secondary">Tracked in this month</p>
        </Section>

        <Section title="Savings">
          <p className="text-2xl font-semibold text-secondary">{formatINR(totalSavings)}</p>
          <p className="mt-1 text-xs text-text-secondary">Current retained amount</p>
        </Section>

        <Section title="Savings Rate">
          <p className="text-2xl font-semibold text-primary">{savingsRate}%</p>
          <p className="mt-1 text-xs text-text-secondary">Target: above 35%</p>
        </Section>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Section title="Add Expense" className="lg:col-span-2">
          <div className="grid gap-3 md:grid-cols-3">
            <Input
              placeholder="Expense title"
              value={expenseTitle}
              onChange={(event) => setExpenseTitle(event.target.value)}
            />
            <Input
              type="number"
              placeholder="Amount"
              value={expenseAmount}
              onChange={(event) => setExpenseAmount(event.target.value)}
            />
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-text-primary">Category</span>
              <select
                value={expenseCategory}
                onChange={(event) => setExpenseCategory(event.target.value as ExpenseCategory)}
                className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-text-primary outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                <option value="Living">Living</option>
                <option value="Food">Food</option>
                <option value="Transport">Transport</option>
                <option value="Learning">Learning</option>
                <option value="Health">Health</option>
                <option value="Other">Other</option>
              </select>
            </label>
          </div>

          <div className="mt-3 flex justify-end">
            <Button variant="primary" onClick={addExpense}>Add Expense</Button>
          </div>
        </Section>

        <Section title="Planned Spend">
          <p className="text-2xl font-semibold text-primary">{formatINR(plannedSpend)}</p>
          <p className="mt-1 text-xs text-text-secondary">Upcoming tasks not completed</p>
        </Section>
      </div>

      <div className="grid gap-4 xl:grid-cols-5">
        <Section title="Expense List" className="xl:col-span-3">
          <ul className="space-y-2 text-sm text-text-secondary">
            {expenses.map((expense) => (
              <li key={expense.id} className="flex items-center justify-between rounded-xl border border-border px-3 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-text-primary">{expense.title}</span>
                  <span className={`inline-flex rounded-full px-2 py-0.5 text-xs ${categoryStyles[expense.category]}`}>
                    {expense.category}
                  </span>
                </div>
                <span className="font-medium">{formatINR(expense.amount)}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Category Breakdown" className="xl:col-span-2">
          <ul className="space-y-3 text-sm">
            {(Object.keys(categoryTotals) as ExpenseCategory[])
              .filter((category) => categoryTotals[category] > 0)
              .map((category) => {
                const value = categoryTotals[category];
                const percentage = Math.round((value / Math.max(totalExpenses, 1)) * 100);

                return (
                  <li key={category} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary">{category}</span>
                      <span className="font-medium text-text-primary">{formatINR(value)}</span>
                    </div>
                    <div className="h-2 rounded-full bg-surface-muted">
                      <div className="h-2 rounded-full bg-primary" style={{ width: `${percentage}%` }} />
                    </div>
                  </li>
                );
              })}
          </ul>
        </Section>
      </div>

      <Section title="Finance Task Board" action={<span className="text-xs text-text-secondary">Modern task workflow</span>}>
        <div className="grid gap-3 md:grid-cols-3">
          <Input
            placeholder="Task title"
            value={taskTitle}
            onChange={(event) => setTaskTitle(event.target.value)}
          />
          <Input
            type="number"
            placeholder="Task amount"
            value={taskAmount}
            onChange={(event) => setTaskAmount(event.target.value)}
          />
          <Input
            type="date"
            value={taskDueDate}
            onChange={(event) => setTaskDueDate(event.target.value)}
          />
        </div>

        <div className="mt-3 flex justify-end">
          <Button onClick={addTask}>Add Task</Button>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {statusColumns.map((column) => (
            <div key={column.key} className="rounded-xl border border-border bg-surface-muted/40 p-3">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-text-primary">{column.label}</h3>
                <span className="rounded-full bg-surface px-2 py-0.5 text-xs text-text-secondary">
                  {tasks.filter((task) => task.status === column.key).length}
                </span>
              </div>

              <div className="space-y-2">
                {tasks
                  .filter((task) => task.status === column.key)
                  .map((task) => (
                    <article key={task.id} className="rounded-xl border border-border bg-surface p-3 shadow-sm">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-semibold text-text-primary">{task.title}</p>
                          <p className="text-xs text-text-secondary">Due {task.dueDate}</p>
                        </div>
                        <StatusBadge
                          label={task.status === 'planned' ? 'Pending' : task.status === 'in-progress' ? 'On Track' : 'Completed'}
                          status={task.status === 'planned' ? 'Pending' : task.status === 'in-progress' ? 'On Track' : 'Completed'}
                        />
                      </div>

                      <p className="mt-2 text-sm font-medium text-primary">{formatINR(task.amount)}</p>

                      <div className="mt-3 flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => cycleTaskStatus(task.id)}>
                          Move
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => removeTask(task.id)}>
                          Remove
                        </Button>
                      </div>
                    </article>
                  ))}

                {tasks.every((task) => task.status !== column.key) && (
                  <p className="rounded-xl border border-dashed border-border px-3 py-5 text-center text-xs text-text-secondary">
                    No tasks here yet
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
