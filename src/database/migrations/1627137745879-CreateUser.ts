import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUser1627137745879 implements MigrationInterface {
  private table = new Table({
    name: "users",
    columns: [
      {
        name: "id",
        type: "integer",
        isPrimary: true,
        isGenerated: true,
        generationStrategy: "increment"
      },
      {
        name: "email",
        type: "varchar",
        isUnique: true,
      },
      {
        name: "password",
        type: "varchar",
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
    ]
  })

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
