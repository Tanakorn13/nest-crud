import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { ProductsService } from 'src/products/products.service';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}


  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const products = await Promise.all(
      createOrderDto.products.map(productId =>
        this.productRepository.findOneBy({id: productId}),
      ),
    );

    const orderToCreate: DeepPartial<Order> = {
      totalPrice: createOrderDto.totalPrice,
      status: createOrderDto.status,
      products: products, // This assumes products is an array of Product entities or DeepPartial<Product>
    };

    const createdOrder = await this.orderRepository.create(orderToCreate);
    return await this.orderRepository.save(createdOrder);
  }

  async findAll() {
    const orders = await this.orderRepository.find()
    return orders
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOneBy({id :id})
    return order
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  async remove(id: number) {
    const toDelete = await this.orderRepository.delete({id: id})
    return toDelete
  }
}
