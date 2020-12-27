import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn, OneToMany
} from "typeorm";
import { ClientEntity } from "./client.entity";
import { OrderItemEntity } from "./order-item.entity";

@Entity({ name: "items" })
export class ItemEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  unitName: string;

  @Column()
  quantityName: string;

  @Column()
  comment: string;

  @Column()
  favorite: boolean;

  @ManyToOne(() => ClientEntity, (client) => client.items)
  client: ClientEntity | number;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.item)
  orderItems: OrderItemEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
