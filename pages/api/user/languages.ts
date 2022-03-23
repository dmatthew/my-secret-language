import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from 'lib/session'
import { NextApiRequest, NextApiResponse } from 'next'
import { getUserLanguagesFromDatabase } from 'lib/backend/user'

export default withIronSessionApiRoute(languagesRoute, sessionOptions)

async function languagesRoute(req: NextApiRequest, res: NextApiResponse) {
  const user = req.session.user

  if (!user || user.isLoggedIn === false) {
    res.status(401).end()
    return
  }

  const userId = user.id
  try {
    const userLanguages = await getUserLanguagesFromDatabase(userId)
    if (userLanguages) {
      return res.json(userLanguages)
    }
  } catch (error) {
    return res.status(200).json({})
  }
}
