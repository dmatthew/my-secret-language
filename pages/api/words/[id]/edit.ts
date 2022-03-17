import { NextApiRequest, NextApiResponse } from 'next'
import { editWordByIdFromDatabase } from 'lib/backend/words'

export default async function editWordByIdRoute(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const id = parseInt(req.query.id.toString())
  const mainWord = req.body.mainWord
  const secretWord = req.body.secretWord
  const word = await editWordByIdFromDatabase(id, mainWord, secretWord)

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
