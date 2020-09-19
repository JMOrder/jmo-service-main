import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class DropPasswordFromUser1600482669592 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.dropColumn("users", "password");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.addColumn("users", new TableColumn({
      name: "password",
      type: "varchar",
      isNullable: false
    }));
  }
}
