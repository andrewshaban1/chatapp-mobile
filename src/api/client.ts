import axios, { AxiosError } from 'axios';
import * as SecureStore from 'expo-secure-store';

import { API_URL } from '@/env';
import { ApiError } from '@/src/types';

export const TOKEN_KEY = 'auth_token';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor — attach JWT token to every request
apiClient.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor — normalize error messages
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    console.error(error);
    const message = error.response?.data?.message;
    // NestJS validation errors return an array of messages
    const normalized = Array.isArray(message)
      ? message.join('\n')
      : (message ?? 'Something went wrong.');
    return Promise.reject(new Error(normalized));
  },
);
