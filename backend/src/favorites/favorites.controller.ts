import { Controller, Get, Post, Delete, Param, UseGuards } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../entities/user.entity';

@Controller('favorites')
@UseGuards(JwtAuthGuard)
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  /**
   * Kullanıcının favorilerini listeleme endpoint'i
   * GET /favorites
   * Sadece giriş yapmış kullanıcılar erişebilir
   */
  @Get()
  getUserFavorites(@GetUser() user: User) {
    return this.favoritesService.getUserFavorites(user.id);
  }

  /**
   * Ürünü favorilere ekleme endpoint'i
   * POST /favorites/:productId
   * Sadece giriş yapmış kullanıcılar erişebilir
   */
  @Post(':productId')
  addFavorite(@GetUser() user: User, @Param('productId') productId: string) {
    return this.favoritesService.addFavorite(user.id, +productId);
  }

  /**
   * Ürünü favorilerden çıkarma endpoint'i
   * DELETE /favorites/:productId
   * Sadece giriş yapmış kullanıcılar erişebilir
   */
  @Delete(':productId')
  removeFavorite(@GetUser() user: User, @Param('productId') productId: string) {
    return this.favoritesService.removeFavorite(user.id, +productId);
  }

  /**
   * Ürünün favoride olup olmadığını kontrol etme endpoint'i
   * GET /favorites/check/:productId
   * Sadece giriş yapmış kullanıcılar erişebilir
   */
  @Get('check/:productId')
  checkFavorite(@GetUser() user: User, @Param('productId') productId: string) {
    return this.favoritesService.isFavorite(user.id, +productId);
  }

  /**
   * Kullanıcının favori ürün ID'lerini listeleme endpoint'i
   * GET /favorites/ids
   * Sadece giriş yapmış kullanıcılar erişebilir
   */
  @Get('ids')
  getFavoriteIds(@GetUser() user: User) {
    return this.favoritesService.getUserFavoriteIds(user.id);
  }
}

