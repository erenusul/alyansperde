import api from './api.service';
import type { Product } from './products.service';

export interface Favorite {
  id: number;
  product: Product;
  createdAt: string;
}

export const favoritesService = {
  async getAll(): Promise<Favorite[]> {
    const response = await api.get<Favorite[]>('/favorites');
    return response.data;
  },

  async add(productId: number): Promise<Favorite> {
    const response = await api.post<Favorite>(`/favorites/${productId}`);
    return response.data;
  },

  async remove(productId: number): Promise<void> {
    await api.delete(`/favorites/${productId}`);
  },

  async check(productId: number): Promise<boolean> {
    const response = await api.get<boolean>(`/favorites/check/${productId}`);
    return response.data;
  },

  async getFavoriteIds(): Promise<number[]> {
    const response = await api.get<number[]>('/favorites/ids');
    return response.data;
  },
};

