import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddLazyLoadHashToCity1613770048853 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'cities',
      new TableColumn({
        name: 'img_lazy_load_hash',
        type: 'varchar',
        default: "'LEHV6nWB2yk8pyo0adR*.7kCMdnj'"
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('cities', 'img_lazy_load_hash')
  }
}
