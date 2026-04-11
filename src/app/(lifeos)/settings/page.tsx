import React from 'react';
import { Section } from '@/presentation/components/lifeos/ui';

export default function SettingsPage() {
  return (
    <div className="space-y-4">
      <Section title="Preferences">
        <ul className="space-y-2 text-sm text-text-secondary">
          <li className="rounded border border-border px-3 py-2">Daily reminder time: 08:00 PM</li>
          <li className="rounded border border-border px-3 py-2">Week starts on: Monday</li>
          <li className="rounded border border-border px-3 py-2">Productivity score updates: Real-time</li>
        </ul>
      </Section>
    </div>
  );
}
