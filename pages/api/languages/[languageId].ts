import { NextApiRequest, NextApiResponse } from 'next'
import {
  getLanguageByIdFromDatabase,
  getAllWordsByLanguageIdFromDatabase,
} from 'lib/backend/words'
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from 'lib/session'

export default withIronSessionApiRoute(getLanguageByIdRoute, sessionOptions)

async function getLanguageByIdRoute(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const id = parseInt(req.query.languageId.toString())
  if (!id) {
    res.json({
      language: null,
      words: [],
    })
  } else {
    const language = await getLanguageByIdFromDatabase(id)
    const words = await getAllWordsByLanguageIdFromDatabase(id)
    const response = {
      id: language.id,
      name: language.name,
      words: words,
    }

    if (language) {
      return res.status(201).json(response)
    } else {
      return res
        .status(400)
        .json({ message: `Language not found with id ${req.body.id}` })
    }
  }
}
