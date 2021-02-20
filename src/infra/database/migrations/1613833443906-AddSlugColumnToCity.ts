import slugify from 'slugify'
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'
import City from '../entities/City'

export class AddSlugColumnToCity1613833443906 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'cities',
      new TableColumn({
        name: 'slug',
        type: 'varchar',
        isNullable: true
      })
    )

    await queryRunner.commitTransaction()
    await queryRunner.startTransaction()

    const citiesRepository = queryRunner.connection.getRepository(City)
    const cities = await citiesRepository.find()

    const citiesWithSlug = cities.map(city => ({
      ...city,
      slug: slugify(city.name, {
        locale: 'pt',
        lower: true
      })
    }))

    await citiesRepository.save(citiesWithSlug)

    await queryRunner.commitTransaction()
    await queryRunner.startTransaction()

    await queryRunner.changeColumn(
      'cities',
      'slug',
      new TableColumn({
        name: 'slug',
        type: 'varchar',
        isUnique: true,
        isNullable: false
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('cities', 'slug')
  }
}
