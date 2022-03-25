import { LanguageType } from './types'
import fetchJson, { FetchError } from './fetchJson'
import { APIJsonResponse } from './types'

export async function getUserLanguages(): Promise<LanguageType[]> {
  try {
    const response = await fetchJson<APIJsonResponse>('/api/user/languages', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    if ('data' in response) {
      let items = response.data.items
      let newLanguages: LanguageType[] = items.map(({ id, name, userId }) => {
        return { id, name, userId }
      })
      return newLanguages
    }
  } catch (error) {
    if (error instanceof FetchError) {
      console.log(error.data)
    } else {
      console.error('An unexpected error happened:', error)
    }
  }
}
