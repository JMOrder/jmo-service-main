import { Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from "typeorm";
import { UserEntity } from "src/users/user.entity";
import { ClientEntity } from "src/clients/client.entity";

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

  // @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { eager: true, cascade: true })
  // orderItems!: OrderItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
