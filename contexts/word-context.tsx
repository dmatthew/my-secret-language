import React, { createContext, useContext, useEffect, useReducer } from "react"
import WordReducer from './WordReducer'

const WordContext = createContext([])

const initialState = []

export function WordContextProvider({ children}) {
  const [state, dispatch] = useReducer(WordReducer, initialState)

  useEffect(() => {
    // checking if there already is a state in localStorage
    // if yes, update the current state with the stored one
    if (JSON.parse(localStorage.getItem("words"))) {
      dispatch({
        type: "INIT_STORED",
        value: JSON.parse(localStorage.getItem("words"))
      })
    }
  }, [])

  useEffect(() => {
    if (state !== initialState) {
      // create and/or set a new localStorage variable called "state"
      localStorage.setItem("words", JSON.stringify(state))
    }
  }, [state])

  return (
    <WordContext.Provider value={[state, dispatch]}>
      {children}
    </WordContext.Provider>
  )
}

export function useWordContext() {
  return useContext(WordContext)
}
