import api from './api.service';

export interface User {
  id: number;
  email: string;
  name: string;
  role: 'ADMIN' | 'USER';
  createdAt: string;
  updatedAt: string;
}

export const usersService = {
  async getAll(): Promise<User[]> {
    const response = await api.get<User[]>('/users');
    return response.data;
  },

  async getById(id: number): Promise<User> {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/users/${id}`);
  },
};
