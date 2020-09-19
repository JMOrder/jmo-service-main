import { BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, OneToMany } from "typeorm";
import { ItemEntity } from "./items/item.entity";

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

  @OneToMany(() => Order, (order) => order.client)
  orders: Order[];

  @OneToMany(() => ItemEntity, (item) => item.client, { eager: true, cascade: true })
  items: ItemEntity[];

  public archive(): void {
    this.archived = true;
  }
}
