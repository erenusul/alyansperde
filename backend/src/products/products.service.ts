import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  async findAll() {
    return this.productRepository.find({
      relations: ['category'],
    });
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async findByCategory(categoryId: number) {
    return this.productRepository.find({
      where: { categoryId },
      relations: ['category'],
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);
    Object.assign(product, updateProductDto);
    return this.productRepository.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
    return { message: 'Product deleted successfully' };
  }

  async updateAllProductImages() {
    const categoryImageMap: { [key: string]: string } = {
      'Klasik Perdeler': '/alyansperdegorselleroptimize/Klasik_Kadife_Perde.png',
      'Modern Rollo Stor': '/alyansperdegorselleroptimize/Modern_Rollo_Stor.png',
      'Blackout Perdeler': '/alyansperdegorselleroptimize/Blackout_Perde.png',
      'Dekoratif Tüller': '/alyansperdegorselleroptimize/Dekoratif_Tül_Perde.png',
      'Zebra Stor': '/alyansperdegorselleroptimize/Zebra_Stor_Perde.png',
      'Pleatli Perdeler': '/alyansperdegorselleroptimize/Pleatli_Perde.png'
    };

    const products = await this.productRepository.find({
      relations: ['category'],
    });

    let updatedCount = 0;
    for (const product of products) {
      const categoryName = product.category?.name || '';
      const defaultImage = categoryImageMap[categoryName];
      
      if (defaultImage && (!product.imageUrl || !product.imageUrl.includes('alyansperdegorselleroptimize'))) {
        product.imageUrl = defaultImage;
        await this.productRepository.save(product);
        updatedCount++;
      }
    }

    return { 
      message: `${updatedCount} ürünün görseli güncellendi`,
      updatedCount 
    };
  }
}

