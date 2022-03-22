import BaseDatabaseModel from './BaseDatabaseModel'
import { Word } from 'lib/types'

class Language extends BaseDatabaseModel {
  id: number
  name: string
  words: Word[]
  userId: number

  constructor(userId: number = null, name: string = null) {
    super()
    this.id = null
    this.userId = userId
    this.name = name
    this.words = []
  }

  async save(): Promise<boolean> {
    if (!this.userId || !this.name) return false

    const client = this.getClient()
    await client.connect()
    const { rows } = await client.query(
      `
      INSERT INTO languages (name, user_id)
      VALUES ($1, $2)
      ON CONFLICT DO NOTHING
      RETURNING id, name, user_id as "userId"
    `,
      [this.name, this.userId]
    )
    await client.end()
    if (rows.length) {
      this.id = rows[0].id
      return true
    } else {
      return false
    }
  }
}

export default Language
