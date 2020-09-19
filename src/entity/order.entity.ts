import { Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToMany } from "typeorm";
import { UserEntity } from "./user.entity";
import { ClientEntity } from "./client.entity";
import { OrderItemEntity } from "./order-item.entity";

@Entity({ name: "orders" })
export class OrderEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.orders, { eager: true })
  @JoinColumn()
  user: UserEntity | number;

  @ManyToOne(() => ClientEntity, (client) => client.orders, { eager: true })
  @JoinColumn()
  client: ClientEntity | number;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order, { eager: true, cascade: true })
  orderItems!: OrderItemEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
