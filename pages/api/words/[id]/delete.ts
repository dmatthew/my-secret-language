import { NextApiRequest, NextApiResponse } from 'next'
import { deleteWordFromDatabase } from 'lib/backend/words'

export default async function deleteWordRoute(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const id = parseInt(req.query.id.toString())
  const success = await deleteWordFromDatabase(id)
  if (success) {
    const response = {
      message: 'success',
    }
    return res.status(201).json(response)
  } else {
    return res.status(400).json({ message: 'Unable to delete word' })
  }
}
