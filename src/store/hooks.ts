/**
 * @file hooks.ts
 * @description Typed Redux hooks for use across the entire app.
 * Always import from here instead of from react-redux directly.
 *
 * Usage:
 *   import { useAppSelector, useAppDispatch } from '@/store/hooks';
 *
 *   const user = useAppSelector(selectCurrentUser);
 *   const dispatch = useAppDispatch();
 */

import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/store';

/** Typed dispatch hook — supports thunks and async actions */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/** Typed selector hook — fully typed against RootState */
export const useAppSelector = <TSelected>(selector: (state: RootState) => TSelected): TSelected =>
  useSelector<RootState, TSelected>(selector);
