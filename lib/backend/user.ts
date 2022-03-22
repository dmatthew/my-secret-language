import { Client } from 'pg'
import crypto from 'crypto'

function getClient() {
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

export async function getUserFromDatabase(email: string): Promise<any> {
  const client = getClient()
  await client.connect()
  const { rows } = await client.query(
    `
    SELECT * FROM users WHERE email = $1
  `,
    [email]
  )
  await client.end()
  if (rows.length) {
    return rows[0]
  }
  return null
}

export async function registerNewUser(
  email: string,
  password: string
): Promise<any> {
  /** https://auth0.com/blog/adding-salt-to-hashing-a-better-way-to-store-passwords/ */
  const salt = crypto.randomBytes(16).toString('hex')
  const encryptedPassword = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex')

  let user = {
    email: email,
    hash: encryptedPassword,
    salt: salt,
  }
  const client = getClient()
  await client.connect()
  const { rows } = await client.query(
    `
    INSERT INTO users (email, hash, salt)
    VALUES ($1, $2, $3)
    ON CONFLICT DO NOTHING
    RETURNING id, email
  `,
    [user.email, user.hash, user.salt]
  )
  await client.end()
  if (rows.length) {
    return {
      id: rows[0].id,
      email: rows[0].email,
    }
  }

  return null
}

export function validPassword(
  user: { email: string; hash: string; salt: string },
  password: string
): boolean {
  const hash = crypto
    .pbkdf2Sync(password, user.salt, 10000, 64, 'sha512')
    .toString('hex')
  return hash === user.hash
}

export async function getUserLanguagesFromDatabase(userId: number) {
  const client = getClient()
  await client.connect()
  const { rows } = await client.query(
    `
    SELECT id, name, user_id
    FROM "languages"
    WHERE "languages".user_id = $1
    `,
    [userId]
  )
  await client.end()
  return rows
}
