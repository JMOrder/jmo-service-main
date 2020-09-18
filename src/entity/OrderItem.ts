import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn, BaseEntity } from "typeorm";
import { Order } from "./Order";
import { Item } from "./Item";
import { Property } from "@tsed/common";

@Entity({ name: "order_items" })
export class OrderItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Property()
  id: number;

  @ManyToOne(() => Order, (order) => order.orderItems)
  @JoinColumn()
  order: Order;

  @ManyToOne(() => Item, (item) => item.orderItems, { eager: true })
  @JoinColumn()
  item: Item;

  @Column()
  @Property()
  unitAmount: number;

  @Column()
  @Property()
  quantity: number;

  @Column()
  @Property()
  comment: string;
}
