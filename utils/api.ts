import { ApiResponse } from '@/app/types';
import { get, post } from './http';

// Example: login
export const loginUser = async (email: string, password: string): Promise<ApiResponse<any>> => {
  return post('/login', { email, password });
};

// Example: register
export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
}): Promise<ApiResponse<any>> => {
  return post('/register', data);
};

// Example: get current authenticated user
export const fetchUser = async (): Promise<ApiResponse<any>> => {
  return get('/user');
};
