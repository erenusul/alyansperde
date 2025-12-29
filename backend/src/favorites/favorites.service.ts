import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from '../entities/favorite.entity';
import { Product } from '../entities/product.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async addFavorite(userId: number, productId: number) {
    // Ürünün var olup olmadığını kontrol et
    const product = await this.productRepository.findOne({ where: { id: productId } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    // Zaten favoride mi kontrol et
    const existingFavorite = await this.favoriteRepository.findOne({
      where: { userId, productId },
    });

    if (existingFavorite) {
      throw new ConflictException('Product is already in favorites');
    }

    const favorite = this.favoriteRepository.create({ userId, productId });
    return this.favoriteRepository.save(favorite);
  }

  async removeFavorite(userId: number, productId: number) {
    const favorite = await this.favoriteRepository.findOne({
      where: { userId, productId },
    });

    if (!favorite) {
      throw new NotFoundException('Favorite not found');
    }

    await this.favoriteRepository.remove(favorite);
    return { message: 'Favorite removed successfully' };
  }

  async getUserFavorites(userId: number) {
    const favorites = await this.favoriteRepository.find({
      where: { userId },
      relations: ['product', 'product.category'],
      order: { createdAt: 'DESC' },
    });

    return favorites.map((favorite) => ({
      id: favorite.id,
      product: favorite.product,
      createdAt: favorite.createdAt,
    }));
  }

  async isFavorite(userId: number, productId: number): Promise<boolean> {
    const favorite = await this.favoriteRepository.findOne({
      where: { userId, productId },
    });
    return !!favorite;
  }

  async getUserFavoriteIds(userId: number): Promise<number[]> {
    const favorites = await this.favoriteRepository.find({
      where: { userId },
      select: ['productId'],
    });
    return favorites.map((f) => f.productId);
  }
}

