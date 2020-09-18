import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  DeleteDateColumn
} from "typeorm";
import { Client } from "./Client";
import { Required, Property } from "@tsed/common";
import { OrderItem } from "./OrderItem";

@Entity({ name: "items" })
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Property()
  id: number;

  @Column()
  @Required()
  name: string;

  @Column()
  @Property()
  unitName: string;

  @Column()
  @Property()
  quantityName: string;

  @Column()
  @Property()
  comment: string;

  @ManyToOne(() => Client, (client) => client.items)
  client: Client | number;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.item)
  orderItems: OrderItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
