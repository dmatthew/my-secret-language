import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { NoteCategory } from 'lib/types'
import NoteReducer, { NoteAction } from 'contexts/NoteReducer'
import noteMiddleware from 'contexts/middleware/note-middleware'
import fetchJson, { FetchError } from 'lib/fetchJson'

interface NoteState {
  dispatch: (action: NoteAction) => void
  state: NoteCategory[]
}

const DEFAULT_STATE: NoteCategory[] = []
const OLD_DEFAULT_STATE: NoteCategory[] = [
  {
    id: 1,
    title: 'General',
    notes: [
      {
        title: 'This is a general note',
        description:
          'Anything that does not fit into any of the other categories should be placed into this category.',
        languageId: 1,
        noteCategoryId: 1,
      },
    ],
  },
  {
    id: 2,
    title: 'Phonology',
    notes: [
      {
        title: 'Notes on phonology',
        description: 'The sounds of words and letters in your language.',
        languageId: 1,
        noteCategoryId: 2,
      },
    ],
  },
  {
    id: 3,
    title: 'Morphology',
    notes: [
      {
        title: 'A note on morphology',
        description:
          'Anything do to with how words are structured in your language should be placed here.',
        languageId: 1,
        noteCategoryId: 3,
      },
    ],
  },
  {
    id: 4,
    title: 'Syntax',
    notes: [
      {
        title: 'Some notes about syntax',
        description:
          'Notes you have that involve the syntax of your language go here.',
        languageId: 1,
        noteCategoryId: 4,
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
  const useReducerWithMiddleware = (
    reducer: (state: NoteCategory[], action: NoteAction) => NoteCategory[],
    initialState: NoteCategory[],
    middlewareFn: (
      dispatchFunction: React.Dispatch<NoteAction>
    ) => (action: NoteAction) => Promise<void>
  ): [NoteCategory[], React.Dispatch<NoteAction>] => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const dispatchWithMiddleware = middlewareFn(dispatch)

    useEffect(() => {
      async function getAllNotes() {
        try {
          const { response } = await fetchJson<any>('/api/notes/all', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          })
          dispatch({
            type: 'INIT_STORED',
            value: response.notes,
          })
        } catch (error) {
          if (error instanceof FetchError) {
            console.log(error.data.message)
          } else {
            console.error('An unexpected error happened:', error)
          }
        }
      }
      // getAllNotes()
    }, [])

    return [state, dispatchWithMiddleware]
  }

  const [state, dispatch] = useReducerWithMiddleware(
    NoteReducer,
    initialState,
    noteMiddleware
  )

  return (
    <NoteContext.Provider value={{ state, dispatch }}>
      {children}
    </NoteContext.Provider>
  )
}

export function useNoteContext() {
  return useContext(NoteContext)
}
