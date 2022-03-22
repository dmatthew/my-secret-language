import { Client } from 'pg'

function getClient() {
  return new Client({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASS,
    port: parseInt(process.env.DATABASE_PORT),
  })
}

export async function addLanguageToDatabase(
  userId: number,
  name: string
): Promise<{
  id: number
  name: string
} | null> {
  const client = getClient()
  await client.connect()
  const response = await client.query(
    `
    INSERT INTO languages (name)
    VALUES ($1)
    ON CONFLICT DO NOTHING
    RETURNING id, name
  `,
    [name]
  )
  if (response.rows[0].id) {
    const response2 = await client.query(
      `
      INSERT INTO user_language (user_id, language_id)
      VALUES ($1, $2)
      ON CONFLICT DO NOTHING
    `,
      [userId, response.rows[0].id]
    )
    await client.end()

    if (response2 && response2.rowCount > 0) {
      return {
        id: response.rows[0].id,
        name: response.rows[0].name,
      }
    } else {
      return null
    }
  } else {
    await client.end()
    return null
  }
}
