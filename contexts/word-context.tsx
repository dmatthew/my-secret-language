import React, { createContext, useContext, useReducer } from "react"
import { Word } from '../lib/types'

type Action =
  | { type: 'ADD_WORD', mainWord: string, secretWord: string }
  | { type: 'DELETE_WORD', mainWord: string }

const WordContext = createContext([])

const initState = []

const reducer = (state: Word[], action: Action): Word[] => {
  switch (action.type) {
    case "ADD_WORD":
      return [
        ...state,
        {
          mainWord: action.mainWord,
          secretWord: action.secretWord
        }
      ]
  }
}

export function AppProvider({ children}) {
  const [words, setWords] = useReducer(reducer, initState)

  return (
    <WordContext.Provider value={[words, setWords]}>
      {children}
    </WordContext.Provider>
  )
}

export function useAppContext() {
  return useContext(WordContext)
}
