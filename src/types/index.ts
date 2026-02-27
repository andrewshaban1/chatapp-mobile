export interface User {
  id: string;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface ApiError {
  message: string | string[];
  statusCode: number;
  error?: string;
}
