import { AuthResponse } from '@/src/types';

import { apiClient } from './client';

export interface RegisterPayload {
  email: string;
  username: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export const authApi = {
  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    try {
      const { data } = await apiClient.post<AuthResponse>(
        '/auth/register',
        payload,
      );
      return data;
    } catch (error: unknown) {
      console.log(error);
      throw error;
    }
  },

  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    try {
      const { data } = await apiClient.post<AuthResponse>(
        '/auth/login',
        payload,
      );
      return data;
    } catch (error: unknown) {
      console.log(error);
      throw error;
    }
  },
};
