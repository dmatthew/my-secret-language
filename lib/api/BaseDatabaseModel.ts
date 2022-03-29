import { Client } from 'pg'

abstract class BaseDatabaseModel {
  getClient() {
    const sslConfig =
      process.env.NODE_ENV === 'development'
        ? undefined //SSL not currently configured in local development
        : { rejectUnauthorized: false }
    return new Client({
      user: process.env.DATABASE_USER,
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE_NAME,
      password: process.env.DATABASE_PASS,
      port: parseInt(process.env.DATABASE_PORT),
      ssl: sslConfig,
    })
  }
}

export default BaseDatabaseModel
