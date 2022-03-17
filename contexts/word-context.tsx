import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { Word } from 'lib/types'
import WordReducer, { WordAction } from 'contexts/WordReducer'
import databaseMiddleware from 'contexts/middleware/database'
import fetchJson, { FetchError } from 'lib/fetchJson'

interface WordState {
  dispatch: (action: WordAction) => void
  state: Word[]
}

const initialState: Word[] = []

export const WordContext = createContext<WordState>({
  state: initialState,
  dispatch: () => {},
})

export function WordContextProvider({ children }: any) {
  const useReducerWithMiddleware = (
    reducer: (state: Word[], action: WordAction) => Word[],
    initialState: Word[],
    middlewareFn: (
      dispatchFunction: React.Dispatch<WordAction>
    ) => (action: WordAction) => Promise<void>
  ): [Word[], React.Dispatch<WordAction>] => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const dispatchWithMiddleware = middlewareFn(dispatch)

    useEffect(() => {
      async function getAllWords() {
        try {
          const { response } = await fetchJson<any>('/api/words/all', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          })
          dispatch({
            type: 'INIT_STORED',
            value: response.words,
          })
        } catch (error) {
          if (error instanceof FetchError) {
            console.log(error.data.message)
          } else {
            console.error('An unexpected error happened:', error)
          }
        }
      }
      getAllWords()
    }, [])

    return [state, dispatchWithMiddleware]
  }

  const [state, dispatch] = useReducerWithMiddleware(
    WordReducer,
    initialState,
    databaseMiddleware
  )

  return (
    <WordContext.Provider value={{ state, dispatch }}>
      {children}
    </WordContext.Provider>
  )
}

export function useWordContext() {
  return useContext(WordContext)
}
