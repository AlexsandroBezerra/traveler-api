import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddAccessCounterFieldToCity1613260269852
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'cities',
      new TableColumn({
        name: 'accesses_counter',
        type: 'integer',
        isNullable: false,
        default: 0
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('cities', 'accesses_counter')
  }
}
