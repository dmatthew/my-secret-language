import { NextApiRequest, NextApiResponse } from 'next'
import crypto from 'crypto'
import { Client } from 'pg'

function validPassword(
  user: { email: string; hash: string; salt: string },
  password: string
): boolean {
  const hash = crypto
    .pbkdf2Sync(password, user.salt, 10000, 64, 'sha512')
    .toString('hex')
  return hash === user.hash
}

async function getUserFromDatabase(email: string): Promise<any> {
  const client = new Client({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASS,
    port: parseInt(process.env.DATABASE_PORT),
  })
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const password = req.body.password
  const user = await getUserFromDatabase(req.body.email)

  if (user === null) {
    return res.status(400).json({ message: 'User not found' })
  } else {
    if (validPassword(user, password)) {
      return res.status(200).json({ message: 'User Logged In' })
    } else {
      return res.status(400).json({ message: 'Wrong Password' })
    }
  }
}
