import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { Word } from 'lib/types'
import WordReducer, { WordAction } from 'contexts/WordReducer'
import middlewareFn from 'contexts/middleware/database'

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
    middlewareFns: Array<(state: Word[], action: WordAction) => void> = []
  ): [Word[], React.Dispatch<WordAction>] => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const dispatchWithMiddleware = (action) => {
      middlewareFns.forEach((middlewareFn) => {
        middlewareFn(state, action)
      })

      dispatch(action)
    }

    useEffect(() => {
      // checking if there already is a state in localStorage
      // if yes, update the current state with the stored one
      if (JSON.parse(localStorage.getItem('words'))) {
        dispatch({
          type: 'INIT_STORED',
          value: JSON.parse(localStorage.getItem('words')),
        })
      }
    }, [])

    useEffect(() => {
      if (state !== initialState) {
        // create and/or set a new localStorage variable called "state"
        localStorage.setItem('words', JSON.stringify(state))
      }
    }, [state, initialState])

    return [state, dispatchWithMiddleware]
  }

  const [state, dispatch] = useReducerWithMiddleware(
    WordReducer,
    initialState,
    [middlewareFn]
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
