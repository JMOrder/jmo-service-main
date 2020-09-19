import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn, BaseEntity } from "typeorm";
import { ItemEntity } from "./item.entity";
import { OrderEntity } from "./order.entity";

@Entity({ name: "order_items" })
export class OrderItemEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => OrderEntity, (order) => order.orderItems)
  @JoinColumn()
  order: OrderEntity;

  @ManyToOne(() => ItemEntity, (item) => item.orderItems, { eager: true })
  @JoinColumn()
  item: ItemEntity;

  @Column()
  unitAmount: number;

  @Column()
  quantity: number;

  @Column()
  comment: string;
}
