import { Word } from 'lib/types'
import { WordAction } from 'contexts/WordReducer'
import fetchJson, { FetchError } from 'lib/fetchJson'

export default async function middlewareFn(state: Word[], action: WordAction) {
  switch (action.type) {
    case 'ADD_WORD':
      const body = {
        mainWord: action.mainWord,
        secretWord: action.secretWord,
      }

      try {
        const response = await fetchJson('/api/words/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
      } catch (error) {
        if (error instanceof FetchError) {
          console.log(error.data.message)
        } else {
          console.error('An unexpected error happened:', error)
        }
      }
  }
}
