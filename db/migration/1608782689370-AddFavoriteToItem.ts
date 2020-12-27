import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddFavoriteToItem1608782689370 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("items", new TableColumn({
            name: "favorite",
            type: "boolean",
            default: false
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("items", "favorite");
    }

}
