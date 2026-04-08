/**
 * @file ReduxProvider.tsx
 * @description Wraps the app with Redux store provider.
 * Must be placed in the root layout.
 *
 * Usage in layout.tsx:
 *   import { ReduxProvider } from '@/presentation/providers/ReduxProvider';
 *   <ReduxProvider>{children}</ReduxProvider>
 */

'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store';

interface ReduxProviderProps {
  children: React.ReactNode;
}

export function ReduxProvider({ children }: ReduxProviderProps): React.JSX.Element {
  return <Provider store={store}>{children}</Provider>;
}
