import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Category } from '../entities/category.entity';
import { Product } from '../entities/product.entity';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import { Favorite } from '../entities/favorite.entity';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(__dirname, '../../.env') });

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'erenusul',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'perde_db',
  entities: [User, Category, Product, Order, OrderItem, Favorite],
  synchronize: process.env.NODE_ENV !== 'production', // Auto-sync in development
  logging: process.env.NODE_ENV === 'development',
};

