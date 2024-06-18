import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Category } from 'src/category/entities/category.entity';
import { Order } from 'src/order/entities/order.entity';
@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_name: string;

  @Column()
  price: number;

  @Column()
  img: string;

  @Column()
  descript: string;

  @Column()
  amount: number;

  @ManyToOne(() => Category, category => category.products)
  category: Category;

  @ManyToMany(() => Order, order => order.products)
  @JoinTable()
  orders: Order[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
