import { NextApiRequest, NextApiResponse } from 'next'
import { getUserFromDatabase, validPassword } from 'lib/backend/user'
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from 'lib/session'

export default withIronSessionApiRoute(loginRoute, sessionOptions)

export async function loginRoute(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const password = req.body.password
  const user = await getUserFromDatabase(req.body.email)

  if (user === null) {
    return res.status(400).json({ message: 'User not found' })
  } else {
    if (validPassword(user, password)) {
      const response = { isLoggedIn: true, email: user.email }
      req.session.user = response
      await req.session.save()
      return res.status(200).json(response)
    } else {
      return res.status(400).json({ message: 'Wrong Password' })
    }
  }
}
