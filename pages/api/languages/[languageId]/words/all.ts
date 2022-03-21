import { NextApiRequest, NextApiResponse } from 'next'
import { getAllWordsByLanguageIdFromDatabase } from 'lib/backend/words'

export default async function allWordsRoute(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const id = parseInt(req.query.languageId.toString())
  const words = await getAllWordsByLanguageIdFromDatabase(id)

  if (words) {
    const response = {
      message: 'success',
      words: words,
    }
    return res.status(201).json({ response: response })
  } else {
    return res.status(400).json({ message: 'No words found' })
  }
}
