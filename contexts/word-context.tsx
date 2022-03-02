import { createContext, useContext, useReducer } from "react"

const WordContext = createContext([])

const initState = []

const reducer = (state, action) => {
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
