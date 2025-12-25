import api from './api.service';

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  categoryId: number;
  category?: {
    id: number;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export const productsService = {
  async getAll(categoryId?: number): Promise<Product[]> {
    const params = categoryId ? { categoryId } : {};
    const response = await api.get<Product[]>('/products', { params });
    return response.data;
  },

  async getById(id: number): Promise<Product> {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  },

  async create(data: {
    name: string;
    description?: string;
    price: number;
    imageUrl?: string;
    categoryId: number;
  }): Promise<Product> {
    const response = await api.post<Product>('/products', data);
    return response.data;
  },

  async update(
    id: number,
    data: {
      name?: string;
      description?: string;
      price?: number;
      imageUrl?: string;
      categoryId?: number;
    }
  ): Promise<Product> {
    const response = await api.patch<Product>(`/products/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/products/${id}`);
  },
};

