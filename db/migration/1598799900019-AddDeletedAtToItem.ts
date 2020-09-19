import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddDeletedAtToItem1598799900019 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "items",
      new TableColumn({
        name: "deleted_at",
        type: "timestamp without time zone",
        isNullable: true
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("items", "deleted_at");
  }
}
