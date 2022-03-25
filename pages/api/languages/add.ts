import { NextApiRequest, NextApiResponse } from 'next'
import Language from 'lib/api/languages'
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

  const language = new Language(userId, req.body.name)
  const success = await language.save()

  if (success) {
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
