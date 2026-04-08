/**
 * @file Spinner.tsx
 * @description Loading spinner component with size and color variants.
 *
 * Usage:
 *   <Spinner size="md" />
 *   <Spinner size="lg" className="text-white" />
 */

import React from 'react';
import { clsx } from 'clsx';
import type { BaseComponentProps } from '@/types/common.types';

type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface SpinnerProps extends BaseComponentProps {
  size?: SpinnerSize;
  label?: string;
}

const sizeClasses: Record<SpinnerSize, string> = {
  xs: 'h-3 w-3 border',
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-8 w-8 border-2',
  xl: 'h-12 w-12 border-4',
};

export function Spinner({ size = 'md', label = 'Loading...', className, ...props }: SpinnerProps): React.JSX.Element {
  return (
    <div
      role="status"
      aria-label={label}
      className={clsx('inline-flex items-center justify-center', className)}
      {...props}
    >
      <span
        className={clsx(
          'animate-spin rounded-full border-current border-t-transparent text-primary',
          sizeClasses[size],
        )}
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}
