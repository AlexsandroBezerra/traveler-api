import { createConnection } from 'typeorm'

createConnection().catch(() => {
  console.error('Unable to connect to database, please start your database.')
})
