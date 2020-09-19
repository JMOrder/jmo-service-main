import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class DropPasswordFromUser1600482669592 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("users", "password");
    await queryRunner.dropColumn("users", "is_email_verified");
    await queryRunner.dropColumn("users", "is_phone_verified");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn("users", new TableColumn({
      name: "password",
      type: "varchar",
      isNullable: false,
      default: "'_temporary_password'"
    }));
    await queryRunner.addColumn("users", new TableColumn({
      name: "is_email_verified",
      type: "boolean",
      default: false
    }));
    await queryRunner.addColumn("users", new TableColumn({
      name: "is_phone_verified",
      type: "boolean",
      default: false
    }));
  }
}
