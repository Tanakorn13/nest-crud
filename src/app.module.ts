import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './users/entities/user.entity';
import { ProductsModule } from './products/products.module';
import { AttractionModule } from './attraction/attraction.module';
import { Attraction } from './attraction/entities/attraction.entity';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { Product } from './products/entities/product.entity';
import { Category } from './category/entities/category.entity';
import { Order } from './order/entities/order.entity';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: 'admin',
      database: 'nest-crud',
      entities: [User, Attraction, Category, Product, Order],
      synchronize: true,
    }),
    ProductsModule,
    AttractionModule,
    CategoryModule,
    OrderModule,
    CartModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
