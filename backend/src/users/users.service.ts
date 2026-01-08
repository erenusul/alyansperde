import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    const savedUser = await this.userRepository.save(user);
    const { password, ...result } = savedUser;
    return result;
  }

  async findAll() {
    const users = await this.userRepository.find({
      select: ['id', 'email', 'name', 'role', 'createdAt', 'updatedAt'],
    });
    return users;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ['id', 'email', 'name', 'role', 'createdAt', 'updatedAt'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    Object.assign(user, updateUserDto);
    const savedUser = await this.userRepository.save(user);
    const { password, ...result } = savedUser;
    return result;
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    
    try {
      // Kullanıcının siparişlerini bul
      const orders = await this.orderRepository.find({
        where: { userId: id },
        relations: ['orderItems'],
      });

      // Her sipariş için orderItems'ı sil
      for (const order of orders) {
        if (order.orderItems && order.orderItems.length > 0) {
          await this.orderItemRepository.remove(order.orderItems);
        }
      }

      // Siparişleri sil
      if (orders.length > 0) {
        await this.orderRepository.remove(orders);
      }

      // Favorites zaten cascade delete ile silinecek (entity'de tanımlı)
      // Kullanıcıyı sil
      await this.userRepository.remove(user);
      
      return { message: 'User deleted successfully' };
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new InternalServerErrorException(
        `Failed to delete user: ${error.message || 'Unknown error'}`
      );
    }
  }
}

