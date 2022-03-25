import { Client } from 'pg'

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

export async function getAllWordsByLanguageIdFromDatabase(
  languageId: number
): Promise<any[] | null> {
  const client = getClient()
  await client.connect()
  const { rows } = await client.query(
    `
    SELECT id, main_word as "mainWord", secret_word as "secretWord" 
    FROM words WHERE language_id = $1
  `,
    [languageId]
  )
  await client.end()
  return rows
}

export async function getWordByIdFromDatabase(
  languageId: number
): Promise<any> {
  const client = getClient()
  await client.connect()
  const { rows } = await client.query(
    `
    SELECT id, main_word as "mainWord", secret_word as "secretWord" 
    FROM words WHERE language_id = 1 AND id = $1
  `,
    [languageId]
  )
  await client.end()
  if (rows.length) {
    return rows[0]
  }
  return null
}

export async function addWordToDatabase(
  languageId: string,
  mainWord: string,
  secretWord: string
): Promise<{
  id: number
  mainWord: string
  secretWord: string
  languageId: number
} | null> {
  const client = getClient()
  await client.connect()
  const { rows } = await client.query(
    `
    INSERT INTO words (main_word, secret_word, language_id)
    VALUES ($1, $2, $3)
    ON CONFLICT DO NOTHING
    RETURNING id, main_word, secret_word, language_id
  `,
    [mainWord, secretWord, languageId]
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

export async function getWordFromDatabase(mainWord: string): Promise<{
  id: number
  mainWord: string
  secretWord: string
  languageId: number
} | null> {
  const client = getClient()
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

export async function deleteWordFromDatabase(id: number): Promise<boolean> {
  const client = getClient()
  await client.connect()
  const { rowCount } = await client.query(
    `
    DELETE FROM words WHERE id = $1
  `,
    [id]
  )
  await client.end()
  return rowCount > 0
}

export async function editWordByIdFromDatabase(
  id: number,
  mainWord: string,
  secretWord: string
): Promise<{
  id: number
  mainWord: string
  secretWord: string
  languageId: number
} | null> {
  const client = getClient()
  await client.connect()
  const { rows } = await client.query(
    `
    UPDATE "words" SET
    "main_word" = $1,
    "secret_word" = $2
    WHERE "id" = $3
    RETURNING id, main_word, secret_word, language_id
  `,
    [mainWord, secretWord, id]
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

export async function getLanguageByIdFromDatabase(id: number): Promise<any> {
  const client = getClient()
  await client.connect()
  const { rows } = await client.query(
    `
    SELECT * FROM languages WHERE id = $1
  `,
    [id]
  )
  await client.end()
  if (rows.length) {
    return {
      id: rows[0].id,
      name: rows[0].name,
    }
  }
  return null
}
