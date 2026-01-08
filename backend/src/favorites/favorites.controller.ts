import { Controller, Get, Post, Delete, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../entities/user.entity';

@Controller('favorites')
@UseGuards(JwtAuthGuard)
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getUserFavorites(@GetUser() user: User) {
    return this.favoritesService.getUserFavorites(user.id);
  }

  @Post(':productId')
  addFavorite(
    @GetUser() user: User,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    return this.favoritesService.addFavorite(user.id, productId);
  }

  @Delete(':productId')
  removeFavorite(
    @GetUser() user: User,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    return this.favoritesService.removeFavorite(user.id, productId);
  }

  @Get('check/:productId')
  checkFavorite(
    @GetUser() user: User,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    return this.favoritesService.isFavorite(user.id, productId);
  }

  @Get('ids')
  getFavoriteIds(@GetUser() user: User) {
    return this.favoritesService.getUserFavoriteIds(user.id);
  }
}

