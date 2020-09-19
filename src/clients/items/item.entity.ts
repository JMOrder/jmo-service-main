import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from "typeorm";
import { ClientEntity } from "../client.entity";
// import { OrderItem } from "./OrderItem";

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

  @ManyToOne(() => ClientEntity, (client) => client.items)
  client: ClientEntity | number;

  // @OneToMany(() => OrderItem, (orderItem) => orderItem.item)
  // orderItems: OrderItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
