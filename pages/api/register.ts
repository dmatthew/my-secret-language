import { NextApiRequest, NextApiResponse } from 'next'
import crypto from 'crypto'
import { Client } from 'pg'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const password = req.body.password

  /** https://auth0.com/blog/adding-salt-to-hashing-a-better-way-to-store-passwords/ */
  const salt = crypto.randomBytes(16).toString('hex')
  const encryptedPassword = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex')

  let user = {
    email: req.body.email,
    hash: encryptedPassword,
    salt: salt,
  }
  const client = new Client({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASS,
    port: parseInt(process.env.DATABASE_PORT),
  })
  await client.connect()
  const response = await client.query(
    `
    INSERT INTO users (email, hash, salt)
    VALUES ($1, $2, $3)
    ON CONFLICT DO NOTHING
  `,
    [user.email, user.hash, user.salt]
  )
  await client.end()

  res.status(201).json({ response: response, user: user })
}
