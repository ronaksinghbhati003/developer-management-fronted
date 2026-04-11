import React from 'react';
import { Section } from '@/presentation/components/lifeos/ui';

export default function HealthPage() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-3">
        <Section title="Workout">
          <p className="text-sm text-text-secondary">Today's Plan: Push workout + 20 min cardio</p>
          <p className="mt-2 text-sm font-semibold">Streak: 4 days</p>
        </Section>
        <Section title="Body Stats">
          <p className="text-sm text-text-secondary">Weight</p>
          <p className="mt-1 text-xl font-semibold">74.2 kg</p>
        </Section>
        <Section title="Activity">
          <p className="text-sm text-text-secondary">Steps: 7,860</p>
          <p className="mt-1 text-sm text-text-secondary">Calories: 1,980</p>
        </Section>
      </div>

      <Section title="AI Suggestion">
        <p className="text-sm text-primary">Sleep 30 minutes earlier to recover better and improve workout consistency.</p>
      </Section>
    </div>
  );
}
