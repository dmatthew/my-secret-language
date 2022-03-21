import { NextApiRequest, NextApiResponse } from 'next'
import { getUserFromDatabase, registerNewUser } from 'lib/backend/user'
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from 'lib/session'

export default withIronSessionApiRoute(registerRoute, sessionOptions)

export async function registerRoute(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const user = await getUserFromDatabase(req.body.email)
    if (user) {
      return res
        .status(400)
        .json({ message: `User with email ${req.body.email} already exists.` })
    }
  } catch (error) {
    return res.status(400).json({ message: error.responseText })
  }
  // if (user) {
  //   return res
  //     .status(400)
  //     .json({ message: `User with email ${req.body.email} already exists.` })
  // }

  try {
    const newUser = await registerNewUser(req.body.email, req.body.password)
  } catch (error) {
    return res.status(400).json({ message: error.responseText })
  }
  // const newUser = await registerNewUser(req.body.email, req.body.password)

  // if (newUser) {
  //   const response = { isLoggedIn: true, email: newUser.email, id: newUser.id }
  //   req.session.user = response
  //   await req.session.save()
  //   return res.status(201).json({ response: response })
  // } else {
  //   return res.status(400).json({ message: 'User not found' })
  // }
}
