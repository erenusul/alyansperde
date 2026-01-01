import api from './api.service';

export interface OrderItem {
  id: number;
  productId: number;
  quantity: number;
  product?: {
    id: number;
    name: string;
    price: number;
    imageUrl?: string;
  };
}

export interface Order {
  id: number;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED';
  totalPrice: number;
  userId: number;
  user?: {
    id: number;
    name: string;
    email: string;
  };
  orderItems: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export const ordersService = {
  async getAll(): Promise<Order[]> {
    const response = await api.get<Order[]>('/orders');
    return response.data;
  },

  async getById(id: number): Promise<Order> {
    const response = await api.get<Order>(`/orders/${id}`);
    return response.data;
  },

  async create(data: { items: Array<{ productId: number; quantity: number }> }): Promise<Order> {
    const response = await api.post<Order>('/orders', data);
    return response.data;
  },

  async update(id: number, data: { status?: Order['status'] }): Promise<Order> {
    const response = await api.patch<Order>(`/orders/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/orders/${id}`);
  },
};

