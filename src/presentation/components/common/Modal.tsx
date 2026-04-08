/**
 * @file Modal.tsx
 * @description Accessible modal dialog using React Portal.
 * Traps focus, closes on Escape key and backdrop click.
 *
 * Usage:
 *   <Modal isOpen={isOpen} onClose={handleClose} title="Confirm Delete">
 *     <p>Are you sure?</p>
 *     <Modal.Footer>
 *       <Button variant="danger" onClick={handleDelete}>Delete</Button>
 *     </Modal.Footer>
 *   </Modal>
 */

'use client';

import React, { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { clsx } from 'clsx';
import type { BaseComponentProps } from '@/types/common.types';

// ─── Types ────────────────────────────────────────────────────────────────────

type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: ModalSize;
  closeOnBackdrop?: boolean;
  children: React.ReactNode;
}

interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
}

// ─── Size Map ─────────────────────────────────────────────────────────────────

const sizeClasses: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-2xl',
  full: 'max-w-full m-4',
};

// ─── Sub-component: Footer ────────────────────────────────────────────────────

function ModalFooter({ children, className }: ModalFooterProps): React.JSX.Element {
  return (
    <div
      className={clsx(
        'flex items-center justify-end gap-3 border-t border-border px-6 py-4',
        className,
      )}
    >
      {children}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

function Modal({
  isOpen,
  onClose,
  title,
  size = 'md',
  closeOnBackdrop = true,
  children,
  className,
}: ModalProps): React.JSX.Element | null {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const modal = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={closeOnBackdrop ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={clsx(
          'relative z-10 w-full bg-surface rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden',
          'animate-in fade-in zoom-in-95 duration-200',
          sizeClasses[size],
          className,
        )}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <h2 id="modal-title" className="text-lg font-semibold text-text-primary">
              {title}
            </h2>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="rounded-lg p-1 text-text-muted hover:bg-surface-hover hover:text-text-primary transition-colors"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}

Modal.Footer = ModalFooter;

export { Modal };
