import { OrderEntity } from "./order.entity";
import { BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, OneToMany } from "typeorm";
import { ItemEntity } from "./item.entity";

@Entity({ name: "clients" })
export class ClientEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  archived: boolean;

  @Column()
  phone: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => OrderEntity, (order) => order.client)
  orders: OrderEntity[];

  @OneToMany(() => ItemEntity, (item) => item.client, { eager: true, cascade: true })
  items: ItemEntity[];

  static async findById(id: number): Promise<ClientEntity> {
    return this.findOneOrFail({ id });
  }

  public archive(): void {
    this.archived = true;
  }
}
