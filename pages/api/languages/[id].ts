import { NextApiRequest, NextApiResponse } from 'next'
import { getLanguageByIdFromDatabase } from 'lib/backend/words'

export default async function getLanguageByIdRoute(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const id = parseInt(req.query.id.toString())
  const language = await getLanguageByIdFromDatabase(id)

  if (language) {
    const response = {
      message: 'success',
      language: language,
    }
    return res.status(201).json(response)
  } else {
    return res
      .status(400)
      .json({ message: `Language not found with id ${req.body.id}` })
  }
}
