import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { NoteCategory } from 'lib/types'
import NoteReducer, { NoteAction } from './NoteReducer'

interface NoteState {
  dispatch: (action: NoteAction) => void
  state: NoteCategory[]
}

const DEFAULT_STATE: NoteCategory[] = [
  {
    title: 'General',
    notes: [
      {
        title: 'This is a general note',
        description:
          'Anything that does not fit into any of the other categories should be placed into this category.',
      },
    ],
  },
  {
    title: 'Phonology',
    notes: [
      {
        title: 'Notes on phonology',
        description: 'The sounds of words and letters in your language.',
      },
    ],
  },
  {
    title: 'Morphology',
    notes: [
      {
        title: 'A note on morphology',
        description:
          'Anything do to with how words are structured in your language should be placed here.',
      },
    ],
  },
  {
    title: 'Syntax',
    notes: [
      {
        title: 'Some notes about syntax',
        description:
          'Notes you have that involve the syntax of your language go here.',
      },
    ],
  },
]

let initialState: NoteCategory[] = []

const NoteContext = createContext<NoteState>({
  state: initialState,
  dispatch: () => {},
})

export function NoteContextProvider({ children }: any) {
  const [state, dispatch] = useReducer(NoteReducer, DEFAULT_STATE)

  useEffect(() => {
    // checking if there already is a state in localStorage
    // if yes, update the current state with the stored one
    if (JSON.parse(localStorage.getItem('notes'))) {
      dispatch({
        type: 'INIT_STORED',
        value: JSON.parse(localStorage.getItem('notes')),
      })
    }
  }, [])

  useEffect(() => {
    if (!localStorage.getItem('notes')) {
      localStorage.setItem('notes', JSON.stringify(DEFAULT_STATE))
    }
    if (state !== initialState) {
      // create and/or set a new localStorage variable called "state"
      localStorage.setItem('notes', JSON.stringify(state))
    }
  }, [state])

  return (
    <NoteContext.Provider value={{ state, dispatch }}>
      {children}
    </NoteContext.Provider>
  )
}

export function useNoteContext() {
  return useContext(NoteContext)
}
