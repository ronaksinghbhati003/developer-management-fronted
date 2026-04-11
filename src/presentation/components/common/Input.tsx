/**
 * @file Input.tsx
 * @description Controlled Input component with label, error, and helper text support.
 *
 * Usage:
 *   <Input
 *     label="Email"
 *     type="email"
 *     error={errors.email}
 *     helperText="We'll never share your email"
 *     {...register('email')}
 *   />
 */

import React from 'react';
import { clsx } from 'clsx';
import type { BaseComponentProps } from '@/types/common.types';

// ─── Types ────────────────────────────────────────────────────────────────────

interface InputProps extends BaseComponentProps, React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftAddon,
      rightAddon,
      id,
      className,
      disabled,
      ...props
    },
    ref,
  ) => {
    const inputId = id ?? `input-${props.name ?? Math.random().toString(36).slice(2)}`;
    const hasError = Boolean(error);

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-text-primary"
          >
            {label}
            {props.required && (
              <span className="ml-1 text-error text-xs" aria-label="required">*</span>
            )}
          </label>
        )}

        {/* Input wrapper */}
        <div className="relative flex items-center">
          {leftAddon && (
            <div className="absolute left-3 flex items-center text-text-muted">
              {leftAddon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={
              hasError ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
            className={clsx(
              'w-full rounded-xl border bg-surface px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted transition-all duration-200 outline-none shadow-sm',
              'focus:ring-2 focus:ring-primary/20 focus:border-primary',
              hasError
                ? 'border-error focus:ring-error focus:border-error'
                : 'border-border hover:border-border-hover',
              disabled && 'cursor-not-allowed opacity-50 bg-surface-muted',
              leftAddon && 'pl-10',
              rightAddon && 'pr-10',
              className,
            )}
            {...props}
          />

          {rightAddon && (
            <div className="absolute right-3 flex items-center text-text-muted">
              {rightAddon}
            </div>
          )}
        </div>

        {/* Error / Helper */}
        {hasError ? (
          <p id={`${inputId}-error`} role="alert" className="text-xs text-error">
            {error}
          </p>
        ) : helperText ? (
          <p id={`${inputId}-helper`} className="text-xs text-text-muted">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  },
);

Input.displayName = 'Input';
