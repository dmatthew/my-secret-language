import { NextApiRequest, NextApiResponse } from 'next'
import { deleteWordFromDatabase } from 'lib/api/words'

export default async function deleteWordRoute(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const id = parseInt(req.query.id.toString())
  const success = await deleteWordFromDatabase(id)
  if (success) {
    const response = {
      data: {
        success: true,
      },
    }
    return res.status(201).json(response)
  } else {
    return res.status(400).json({
      error: {
        message: 'Unable to delete word',
      },
    })
  }
}
