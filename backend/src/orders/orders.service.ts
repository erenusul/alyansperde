import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import { Product } from '../entities/product.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { User, UserRole } from '../entities/user.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createOrderDto: CreateOrderDto, userId: number) {
    let totalPrice = 0;
    const orderItems: OrderItem[] = [];

    for (const item of createOrderDto.items) {
      const product = await this.productRepository.findOne({
        where: { id: item.productId },
      });

      if (!product) {
        throw new NotFoundException(`Product with ID ${item.productId} not found`);
      }

      totalPrice += Number(product.price) * item.quantity;

      const orderItem = this.orderItemRepository.create({
        productId: item.productId,
        quantity: item.quantity,
      });
      orderItems.push(orderItem);
    }

    const order = this.orderRepository.create({
      userId,
      totalPrice,
      status: OrderStatus.PENDING,
      orderItems,
    });

    return this.orderRepository.save(order);
  }

  async findAll(user: User) {
    if (user.role === UserRole.ADMIN) {
      return this.orderRepository.find({
        relations: ['user', 'orderItems', 'orderItems.product'],
      });
    } else {
      return this.orderRepository.find({
        where: { userId: user.id },
        relations: ['orderItems', 'orderItems.product'],
      });
    }
  }

  async findOne(id: number, user: User) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['user', 'orderItems', 'orderItems.product'],
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    if (user.role !== UserRole.ADMIN && order.userId !== user.id) {
      throw new ForbiddenException('You can only view your own orders');
    }

    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto, user: User) {
    const order = await this.findOne(id, user);

    if (user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Only admins can update orders');
    }

    Object.assign(order, updateOrderDto);
    return this.orderRepository.save(order);
  }

  async remove(id: number, user: User) {
    const order = await this.findOne(id, user);

    if (user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Only admins can delete orders');
    }

    if (order.orderItems && order.orderItems.length > 0) {
      await this.orderItemRepository.remove(order.orderItems);
    }

    await this.orderRepository.remove(order);
    return { message: 'Order deleted successfully' };
  }
}

