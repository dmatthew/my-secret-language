import { Client } from 'pg'

export async function addWordToDatabase(
  mainWord: string,
  secretWord: string
): Promise<{
  id: number
  mainWord: string
  secretWord: string
  languageId: number
} | null> {
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
    INSERT INTO words (main_word, secret_word, language_id)
    VALUES ($1, $2, $3)
    ON CONFLICT DO NOTHING
    RETURNING id, main_word, secret_word, language_id
  `,
    [mainWord, secretWord, 1]
  )
  await client.end()
  if (rows.length) {
    return {
      id: rows[0].id,
      mainWord: rows[0].main_word,
      secretWord: rows[0].secret_word,
      languageId: rows[0].language_id,
    }
  }

  return null
}

export async function getWordFromDatabase(
  mainWord: string
): Promise<{
  id: number
  mainWord: string
  secretWord: string
  languageId: number
} | null> {
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
    SELECT * FROM words WHERE main_word = $1
  `,
    [mainWord]
  )
  await client.end()
  if (rows.length) {
    return {
      id: rows[0].id,
      mainWord: rows[0].mainWord,
      secretWord: rows[0].secretWord,
      languageId: rows[0].languageId,
    }
  }
  return null
}
