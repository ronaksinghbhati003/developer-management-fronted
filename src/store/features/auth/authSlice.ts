/**
 * @file authSlice.ts
 * @description Redux slice for authentication state management.
 *
 * Manages: current user, auth status, loading, and error state.
 */

import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthUser, User } from '@/domain/entities/user.entity';
import type { AsyncState } from '@/types/common.types';
import { container } from '@/lib/di/container';
import { TYPES } from '@/lib/di/types';
import type { IAuthRepository, LoginCredentials } from '@/domain/repositories/IAuthRepository';
import { LoginUseCase } from '@/domain/use-cases/auth/loginUseCase';
import { LogoutUseCase } from '@/domain/use-cases/auth/logoutUseCase';
import { logger } from '@/utils/logger';

// ─── State Shape ──────────────────────────────────────────────────────────────

interface AuthState extends AsyncState<User | null> {
  isAuthenticated: boolean;
  accessToken: string | null;
}

const initialState: AuthState = {
  data: null,
  status: 'idle',
  error: null,
  isAuthenticated: false,
  accessToken: null,
};

// ─── Shared repository resolved from DI ───────────────────────────────────────
const authRepository = container.get<IAuthRepository>(TYPES.IAuthRepository);

// ─── Async Thunks ─────────────────────────────────────────────────────────────

export const loginThunk = createAsyncThunk<AuthUser, LoginCredentials>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const loginUseCase = container.get<LoginUseCase>(TYPES.LoginUseCase);
      return await loginUseCase.execute(credentials);
    } catch (error) {
      logger.error('loginThunk failed', error);
      return rejectWithValue(error instanceof Error ? error.message : 'Login failed');
    }
  },
);

export const logoutThunk = createAsyncThunk<void, void>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const logoutUseCase = container.get<LogoutUseCase>(TYPES.LogoutUseCase);
      await logoutUseCase.execute();
    } catch (error) {
      logger.error('logoutThunk failed', error);
      return rejectWithValue(error instanceof Error ? error.message : 'Logout failed');
    }
  },
);

export const getMeThunk = createAsyncThunk<User, void>(
  'auth/getMe',
  async (_, { rejectWithValue }) => {
    try {
      return await authRepository.getMe();
    } catch (error) {
      logger.error('getMeThunk failed', error);
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch user');
    }
  },
);

// ─── Slice ────────────────────────────────────────────────────────────────────

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /** Manually set the authenticated user (e.g., after token refresh) */
    setUser(state, action: PayloadAction<User>) {
      state.data = action.payload;
      state.isAuthenticated = true;
    },
    /** Clear auth state (e.g., on manual logout) */
    clearAuth(state) {
      state.data = null;
      state.isAuthenticated = false;
      state.accessToken = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // ── Login ──
    builder
      .addCase(loginThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.isAuthenticated = true;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });

    // ── Logout ──
    builder
      .addCase(logoutThunk.fulfilled, (state) => {
        state.data = null;
        state.isAuthenticated = false;
        state.accessToken = null;
        state.status = 'idle';
        state.error = null;
      });

    // ── Get Me ──
    builder
      .addCase(getMeThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getMeThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getMeThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
        state.isAuthenticated = false;
      });
  },
});

export const { setUser, clearAuth } = authSlice.actions;
export default authSlice.reducer;
