import { NextApiRequest, NextApiResponse } from 'next'
import { deleteWordFromDatabase } from 'lib/backend/words'

export default async function deleteWordRoute(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const success = await deleteWordFromDatabase(req.body.id)
  if (success) {
    const response = {
      message: 'success',
    }
    return res.status(201).json(response)
  } else {
    return res.status(400).json({ message: 'Unable to delete word' })
  }
}
