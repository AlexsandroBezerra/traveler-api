require('dotenv/config')

const devConfig = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT || 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB_NAME,
  entities: ['./src/**/infra/entities/*.ts'],
  migrations: ['./src/infra/database/migrations/*.ts'],
  cli: {
    migrationsDir: './src/infra/database/migrations'
  }
}

const prodConfig = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT || 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB_NAME,
  entities: ['./dist/**/infra/database/entities/*.js'],
  migrations: ['./dist/infra/database/migrations/*.js'],
  cli: {
    migrationsDir: './src/shared/infra/typeorm/migrations'
  }
}

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig

module.exports = config
