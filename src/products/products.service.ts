import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = await this.productRepository.create(createProductDto)
    const toCreate = await this.productRepository.insert(product)
    return toCreate
  }

  async findAll() {
    const products = await this.productRepository.find(
      // {relations:['category','orders']}
    )
    return products
  }

  async findOne(id: number) {
    const product = (await this.productRepository.findOne({where: {id: id}, relations:['category']}))
    return product
  }

  async findOrderedProduct(id:number){
    const product = await this.productRepository.find({
      where:{id: id}
    })
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    let product = await this.productRepository.findOneBy({id:id})
    product = {
      ...product,
      ...updateProductDto
    }
    let toUpdate = await this.productRepository.save(product)
    return toUpdate
  }

  async remove(id: number) {
    const toDelete = await this.productRepository.delete({id: id})
    return toDelete
  }
}
