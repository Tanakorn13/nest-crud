import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { category: categoryId, ...productDetails } = createProductDto;
  
    const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }
  
    const product = this.productRepository.create({
      ...productDetails,
      category,
    });
  
    return await this.productRepository.save(product);
  }
  
  
  async findAll(query: any): Promise<Product[]> {
    const { product_name, minPrice, maxPrice, category, order } = query;
    const queryBuilder = this.productRepository.createQueryBuilder('product');

    if (product_name) {
      queryBuilder.andWhere('product.product_name LIKE :product_name', { product_name: `%${product_name}%` });
    }

    if (minPrice) {
      queryBuilder.andWhere('product.price >= :minPrice', { minPrice });
    }

    if (maxPrice) {
      queryBuilder.andWhere('product.price <= :maxPrice', { maxPrice });
    }

    if (category) {
      queryBuilder.andWhere('product.category = :category', { category });
    }

    if (order) {
      queryBuilder.andWhere('product.orders LIKE :order', { order: `%${order}%` });
    }

    return await queryBuilder.getMany();
  }

  async findOne(id: number) {
    const product = (await this.productRepository.findOne({where: {id: id}, relations:['category']}))
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product
  }


  async update(id: number, updateProductDto: UpdateProductDto) {
    let product = await this.productRepository.findOneBy({id:id});
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  
    if (updateProductDto.category) {
      const category = await this.categoryRepository.findOne({ where: { id: updateProductDto.category } });
      if (!category) {
        throw new NotFoundException(`Category with ID ${updateProductDto.category} not found`);
      }
      product.category = category; // set category directly to product entity
    }
  
    product = {
      ...product,
      ...updateProductDto,
      category: product.category // ensure category is set correctly
    };
  
    let toUpdate = await this.productRepository.save(product);
    return toUpdate;    
  }
  
      

  async remove(id: number) {
    const toDelete = await this.productRepository.delete({id: id})
    return toDelete
  }
}
