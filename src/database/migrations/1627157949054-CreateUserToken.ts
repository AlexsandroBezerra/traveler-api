import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserToken1627157949054 implements MigrationInterface {
  private table = new Table({
    name: "user_tokens",
    columns: [
      {
        name: "id",
        type: "integer",
        isPrimary: true,
        isGenerated: true,
        generationStrategy: "increment"
      },
      {
        name: "token",
        type: "varchar",
      },
      {
        name: "user_id",
        type: "integer",
      },
    ],
    foreignKeys: [
      {
        name: "FK_UsersUserTokens",
        columnNames: ["user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
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
