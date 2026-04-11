import Link from 'next/link';
import React from 'react';
import { ProgressRow, Section, StatusBadge } from '@/presentation/components/lifeos/ui';
import { products, type ProductSlug } from './productData';

export default function PortfolioPage() {
  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm text-text-secondary">Portfolio</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-text-primary">Product Overview</h2>
            <p className="mt-2 text-sm text-text-secondary">Select a product to view detailed frontend and backend execution plans.</p>
          </div>
          <div className="grid min-w-[220px] grid-cols-2 gap-2">
            <div className="rounded-xl border border-border bg-surface-hover p-3">
              <p className="text-xs text-text-secondary">Active Products</p>
              <p className="mt-1 text-lg font-semibold text-text-primary">2</p>
            </div>
            <div className="rounded-xl border border-border bg-surface-hover p-3">
              <p className="text-xs text-text-secondary">Avg Progress</p>
              <p className="mt-1 text-lg font-semibold text-primary">68%</p>
            </div>
          </div>
        </div>
      </section>

      <Section title="Products">
        <div className="grid items-stretch gap-3 lg:grid-cols-2">
          {products.map((product) => {
            const href = `/portfolio/${product.slug}` as `/portfolio/${ProductSlug}`;

            return (
              <Link
                key={product.slug}
                href={href}
                className="group block h-full rounded-xl border border-border bg-surface p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              >
                <article className="flex h-full flex-col">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <h3 className="text-base font-semibold tracking-tight text-text-primary">{product.name}</h3>
                    <StatusBadge label={product.status} status={product.status} />
                  </div>

                  <p className="text-sm text-text-secondary">{product.summary}</p>

                  <div className="mt-3 space-y-3">
                    <ProgressRow label="Progress" value={product.progress} />
                    <div className="flex items-center gap-2 text-xs text-text-secondary">
                      <span className="rounded-full bg-surface-hover px-2 py-0.5">Team: {product.teamMembers.length}</span>
                      <span
                        className={[
                          'rounded-full px-2 py-0.5',
                          product.deadlineImpact === 'High'
                            ? 'bg-error-subtle text-error'
                            : product.deadlineImpact === 'Medium'
                              ? 'bg-warning-subtle text-warning'
                              : 'bg-success-subtle text-success',
                        ].join(' ')}
                      >
                        Deadline Impact: {product.deadlineImpact}
                      </span>
                    </div>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-3">
                    <span className="rounded-full bg-primary-subtle px-2.5 py-1 text-xs font-medium text-primary">
                      {product.stage}
                    </span>
                    <span className="text-xs font-medium text-text-secondary transition-colors group-hover:text-primary">
                      Open details
                    </span>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </Section>
    </div>
  );
}
