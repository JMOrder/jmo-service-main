import { Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from "typeorm";
import { User } from "./User";
import { Client } from "./Client";
import { OrderItem } from "./OrderItem";
import { Property } from "@tsed/common";

@Entity({ name: "orders" })
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Property()
  id: number;

  @ManyToOne(() => User, (user) => user.orders, { eager: true })
  @Property()
  @JoinColumn()
  user: User | number;

  @ManyToOne(() => Client, (client) => client.orders, { eager: true })
  @Property()
  @JoinColumn()
  client: Client | number;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { eager: true, cascade: true })
  @Property()
  orderItems!: OrderItem[];

  @CreateDateColumn()
  @Property()
  createdAt: Date;

  @UpdateDateColumn()
  @Property()
  updatedAt: Date;
}
