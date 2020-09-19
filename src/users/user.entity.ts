import { OrderEntity } from "src/orders/order.entity";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToMany } from "typeorm";

@Entity({ name: "users" })
export class UserEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => OrderEntity, (order) => order.user)
  orders: OrderEntity[];
}
