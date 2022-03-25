import { Word, APIJsonResponse } from './types'
import fetchJson, { FetchError } from './fetchJson'

export async function addWordToLanguage(
  languageId: number,
  mainWord: string,
  secretWord: string
): Promise<Word | null> {
  const body = {
    languageId: languageId,
    mainWord: mainWord,
    secretWord: secretWord,
  }
  try {
    const response = await fetchJson<APIJsonResponse>(`/api/words/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (response.data) {
      return {
        mainWord: response.data.mainWord,
        secretWord: response.data.secretWord,
        languageId: response.data.languageId,
        id: response.data.id,
      }
    }
  } catch (error) {
    if (error instanceof FetchError) {
      console.log(error.data)
    } else {
      console.error('An unexpected error happened:', error)
    }
  }
}

export async function deleteWord(wordId: number): Promise<boolean> {
  try {
    const response = await fetchJson<APIJsonResponse>(
      `/api/words/${wordId}/delete`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      }
    )
    return !('error' in response)
  } catch (error) {
    if (error instanceof FetchError) {
      console.log(error.data)
    } else {
      console.error('An unexpected error happened:', error)
    }
  }
}

export async function editWord(
  wordId: number,
  mainWord: string,
  secretWord: string
): Promise<Word | null> {
  const body = {
    mainWord: mainWord,
    secretWord: secretWord,
  }
  try {
    const response = await fetchJson<APIJsonResponse>(
      `/api/words/${wordId}/edit`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    )
    if (response.data) {
      return {
        mainWord: response.data.mainWord,
        secretWord: response.data.secretWord,
        languageId: response.data.languageId,
        id: response.data.id,
      }
    }
  } catch (error) {
    if (error instanceof FetchError) {
      console.log(error.data)
    } else {
      console.error('An unexpected error happened:', error)
    }
  }
}
