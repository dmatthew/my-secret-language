import { WordAction } from 'contexts/WordReducer'
import fetchJson, { FetchError } from 'lib/fetchJson'

// export default async function databaseMiddlewareFn(state: Word[], action: WordAction) {
//   let body: {}
//   switch (action.type) {
//     case 'ADD_WORD':
//       body = {
//         mainWord: action.mainWord,
//         secretWord: action.secretWord,
//       }

//       try {
//         const response = await fetchJson<Promise<{
//           message: string,
//           id?: number,
//           mainWord?: string,
//           secretWord?: string,
//           languageId?: number,
//         }>>('/api/words/add', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(body),
//         })
//         if ('id' in response) {
//           console.log('setting action.id')
//           action.id = response.id
//         }
//       } catch (error) {
//         if (error instanceof FetchError) {
//           console.log(error.data.message)
//         } else {
//           console.error('An unexpected error happened:', error)
//         }
//       }
//       return
//     case 'DELETE_WORD':
//       body = {
//         id: action.wordId
//       }

//       try {
//         const response = await fetchJson('/api/words/delete', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(body),
//         })
//       } catch (error) {
//         if (error instanceof FetchError) {
//           console.log(error.data)
//         } else {
//           console.error('An unexpected error happened:', error)
//         }
//       }
//       return
//     default:

//   }
// }

export default function databaseMiddleware(dispatch) {
  return async (action: WordAction) => {
    let body: {}
    switch (action.type) {
      case 'ADD_WORD':
        body = {
          mainWord: action.mainWord,
          secretWord: action.secretWord,
        }
        try {
          const response = await fetchJson<
            Promise<{
              message: string
              id?: number
              mainWord?: string
              secretWord?: string
              languageId?: number
            }>
          >('/api/words/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          })
          if ('id' in response) {
            console.log('setting action.id')
            action.id = response.id
          }
          dispatch(action)
        } catch (error) {
          if (error instanceof FetchError) {
            console.log(error.data.message)
          } else {
            console.error('An unexpected error happened:', error)
          }
        }
        return
      case 'DELETE_WORD':
        try {
          const response = await fetchJson(`/api/words/${action.id}/delete`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          })
          dispatch(action)
        } catch (error) {
          if (error instanceof FetchError) {
            console.log(error.data)
          } else {
            console.error('An unexpected error happened:', error)
          }
        }
        return
      case 'EDIT_WORD':
        body = {
          mainWord: action.mainWord,
          secretWord: action.secretWord,
        }
        try {
          const response = await fetchJson(`/api/words/${action.id}/edit`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          })
          dispatch(action)
        } catch (error) {
          if (error instanceof FetchError) {
            console.log(error.data)
          } else {
            console.error('An unexpected error happened:', error)
          }
        }
        return
      default:
        dispatch(action)
    }
  }
}
