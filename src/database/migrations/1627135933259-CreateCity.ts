import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCity1627135933259 implements MigrationInterface {
  private table = new Table({
    name: "cities",
    columns: [
      {
        name: "id",
        type: "integer",
        isPrimary: true,
        isGenerated: true,
        generationStrategy: "increment",
      },
      {
        name: "name",
        type: "varchar",
      },
      {
        name: "description",
        type: "varchar",
        length: "320"
      },
      {
        name: "photo",
        type: "varchar"
      },
      {
        name: "slug",
        type: "varchar",
        isUnique: true
      },
      {
        name: "created_at",
        type: "timestamp with time zone",
        default: "now()"
      },
      {
        name: "updated_at",
        type: "timestamp with time zone",
        default: "now()"
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
