import { NextApiRequest, NextApiResponse } from 'next'
import { getWordByIdFromDatabase } from 'lib/backend/words'

export default async function getWordByIdRoute(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const id = parseInt(req.query.id.toString())
  const word = await getWordByIdFromDatabase(id)

  if (word) {
    const response = {
      message: 'success',
      word: word,
    }
    return res.status(201).json(response)
  } else {
    return res
      .status(400)
      .json({ message: `Word not found with id ${req.body.id}` })
  }
}
