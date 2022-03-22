import { NextApiRequest, NextApiResponse } from 'next'
import { addLanguageToDatabase } from 'lib/backend/languages'
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from 'lib/session'

export default withIronSessionApiRoute(addLanguageRoute, sessionOptions)

async function addLanguageRoute(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const user = req.session.user

  if (!user || user.isLoggedIn === false) {
    res.status(401).end()
    return
  }

  const userId = user.id

  const language = await addLanguageToDatabase(userId, req.body.name)

  if (language) {
    const response = {
      message: 'success',
      language: {
        id: language.id,
        name: language.name,
      },
    }
    return res.status(201).json(response)
  } else {
    return res.status(400).json({ message: 'Unable to add language' })
  }
}
