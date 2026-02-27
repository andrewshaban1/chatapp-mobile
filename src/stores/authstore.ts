import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';

import { authApi, LoginPayload, RegisterPayload } from '@/src/api/auth';
import { apiClient, TOKEN_KEY } from '@/src/api/client';
import { User } from '@/src/types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean; // true while restoring token on app launch
  isHydrated: boolean; // true once SecureStore has been read

  // actions
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
  hydrate: () => Promise<void>; // call once on app start
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  isHydrated: false,

  // Restore session on app launch
  hydrate: async () => {
    try {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      if (token) {
        // Validate token is still good by fetching current user
        const { data: user } = await apiClient.get<User>('/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        set({ token, user, isAuthenticated: true });
      }
    } catch {
      // Token expired or invalid — clear it
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      set({ token: null, user: null, isAuthenticated: false });
    } finally {
      set({ isHydrated: true });
    }
  },

  // Login
  login: async (payload) => {
    set({ isLoading: true });
    try {
      const { accessToken, user } = await authApi.login(payload);
      await SecureStore.setItemAsync(TOKEN_KEY, accessToken);
      set({ token: accessToken, user, isAuthenticated: true });
    } finally {
      set({ isLoading: false });
    }
  },

  // Register
  register: async (payload) => {
    set({ isLoading: true });
    try {
      const { accessToken, user } = await authApi.register(payload);
      await SecureStore.setItemAsync(TOKEN_KEY, accessToken);
      set({ token: accessToken, user, isAuthenticated: true });
    } catch (error: unknown) {
      console.log(error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Logout
  logout: async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    set({ token: null, user: null, isAuthenticated: false });
  },
}));
