import { IsNumber, IsString, IsArray, ArrayMinSize } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  totalPrice: number;

  @IsString()
  status: string;

  @IsArray()
  @ArrayMinSize(1) // ต้องมีสินค้าอย่างน้อย 1 รายการ
  products: number[]; // นี่คือ array ของ id ของสินค้าที่ใช้ในการสั่งซื้อ

  // คุณสมบัติ createdAt และ updatedAt จะถูกสร้างโดยอัตโนมัติจาก Entity ตามที่กำหนดใน Order Entity
}
