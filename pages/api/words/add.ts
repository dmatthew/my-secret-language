import { NextApiRequest, NextApiResponse } from 'next'
import { addWordToDatabase, getWordFromDatabase } from 'lib/backend/words'

export default async function registerRoute(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const word = await addWordToDatabase(req.body.mainWord, req.body.secretWord)

  if (word) {
    const response = {
      message: 'success',
      id: word.id,
      mainWord: word.mainWord,
      secretWord: word.secretWord,
      languageId: word.languageId,
    }
    return res.status(201).json({ response: response })
  } else {
    return res.status(400).json({ message: 'Word not found' })
  }
}
