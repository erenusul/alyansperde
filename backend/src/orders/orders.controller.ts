import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../entities/user.entity';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  /**
   * Yeni sipariş oluşturma endpoint'i (Giriş yapmış kullanıcılar)
   * POST /orders
   */
  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @GetUser() user: User) {
    return this.ordersService.create(createOrderDto, user.id);
  }

  /**
   * Siparişleri listeleme endpoint'i
   * GET /orders
   * - Admin: Tüm siparişleri görür
   * - User: Sadece kendi siparişlerini görür
   */
  @Get()
  findAll(@GetUser() user: User) {
    return this.ordersService.findAll(user);
  }

  /**
   * Sipariş detayı endpoint'i
   * GET /orders/:id
   * - Admin: Tüm siparişleri görebilir
   * - User: Sadece kendi siparişlerini görebilir
   */
  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: User) {
    return this.ordersService.findOne(+id, user);
  }

  /**
   * Sipariş güncelleme endpoint'i (Sadece Admin)
   * PATCH /orders/:id
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto, @GetUser() user: User) {
    return this.ordersService.update(+id, updateOrderDto, user);
  }

  /**
   * Sipariş silme endpoint'i (Sadece Admin)
   * DELETE /orders/:id
   */
  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.ordersService.remove(+id, user);
  }
}

