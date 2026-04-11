import React from 'react';
import { Section } from '@/presentation/components/lifeos/ui';

export default function SocialPage() {
  return (
    <div className="space-y-4">
      <Section title="Friends List">
        <ul className="space-y-2 text-sm text-text-secondary">
          <li className="rounded border border-border px-3 py-2">Aman</li>
          <li className="rounded border border-border px-3 py-2">Ritika</li>
          <li className="rounded border border-border px-3 py-2">Neeraj</li>
        </ul>
      </Section>

      <Section title="Recent Interactions">
        <ul className="space-y-2 text-sm text-text-secondary">
          <li className="rounded border border-border px-3 py-2">Call with Aman - 2 days ago</li>
          <li className="rounded border border-border px-3 py-2">Coffee with Ritika - 4 days ago</li>
        </ul>
      </Section>

      <Section title="Reminder">
        <p className="text-sm text-error">You haven't talked to Neeraj</p>
      </Section>
    </div>
  );
}
