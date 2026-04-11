import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';
import { ProgressRow, Section, StatusBadge } from '@/presentation/components/lifeos/ui';
import { getProductBySlug, products, type ProductSlug } from '../productData';

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

function RoadmapList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 text-sm text-text-secondary">
      {items.map((item) => (
        <li key={item} className="flex gap-2 rounded-lg border border-border bg-surface px-3 py-2">
          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export async function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Link
          href={'/portfolio' as const}
          className="rounded-md border border-border bg-surface-hover px-3 py-1.5 text-xs font-medium text-text-primary hover:border-primary hover:text-primary"
        >
          Back to Portfolio
        </Link>
        <StatusBadge label={product.status} status={product.status} />
      </div>

      <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
        <p className="text-sm text-text-secondary">{product.name}</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight text-text-primary">Execution Details</h2>
        <p className="mt-2 text-sm text-text-secondary">{product.summary}</p>
        <p className="mt-2 text-sm font-medium text-text-primary">Destination: {product.destination}</p>
      </section>

      <div className="grid gap-4 lg:grid-cols-3">
        <section className="rounded-xl border border-border bg-surface p-4 lg:col-span-2">
          <h3 className="mb-3 text-sm font-semibold text-text-primary">Tech Used</h3>
          <div className="flex flex-wrap gap-2">
            {product.techUsed.map((tech) => (
              <span key={tech} className="rounded-full bg-surface-hover px-2.5 py-1 text-xs text-text-secondary ring-1 ring-border">
                {tech}
              </span>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-border bg-surface p-4">
          <ProgressRow label="Overall Progress" value={product.progress} />
          <div className="mt-3 rounded-lg border border-border bg-surface-hover px-3 py-2 text-xs">
            <p className="text-text-secondary">Last Commit</p>
            <p className="mt-1 font-semibold text-text-primary">{product.lastCommit.hash}</p>
            <p className="mt-1 text-text-secondary">{product.lastCommit.message}</p>
            <p className="mt-1 text-text-muted">{product.lastCommit.date}</p>
          </div>
          <div className="mt-3 rounded-lg border border-border bg-surface-hover px-3 py-2 text-xs">
            <p className="text-text-secondary">Delivery Signal</p>
            <p className="mt-1 font-semibold text-text-primary">Next Deadline: {product.nextDeadline}</p>
            <p
              className={[
                'mt-1 inline-flex rounded-full px-2 py-0.5 font-medium',
                product.deadlineImpact === 'High'
                  ? 'bg-error-subtle text-error'
                  : product.deadlineImpact === 'Medium'
                    ? 'bg-warning-subtle text-warning'
                    : 'bg-success-subtle text-success',
              ].join(' ')}
            >
              Impact: {product.deadlineImpact}
            </p>
          </div>
        </section>
      </div>

      <Section title="Team Members">
        <div className="grid gap-2 md:grid-cols-2">
          {product.teamMembers.map((member) => (
            <article key={`${member.name}-${member.role}`} className="rounded-lg border border-border bg-surface px-3 py-2.5">
              <p className="text-sm font-semibold text-text-primary">{member.name}</p>
              <p className="mt-0.5 text-xs text-text-secondary">{member.role}</p>
              <p className="mt-1 text-xs text-primary">Allocation: {member.allocation}</p>
            </article>
          ))}
        </div>
      </Section>

      <div className="grid gap-4 lg:grid-cols-2">
        <Section title="Frontend Roadmap">
          <RoadmapList items={product.frontendRoadmap} />
        </Section>

        <Section title="Backend Roadmap">
          <RoadmapList items={product.backendRoadmap} />
        </Section>
      </div>
    </div>
  );
}
