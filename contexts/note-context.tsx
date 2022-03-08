import React, { createContext, useContext, useReducer } from "react"
import { Note, NoteCategory } from '../lib/types'

type Action =
  | { type: 'ADD_NOTE', categorySlug: string, title: string, description: string }
  | { type: 'DELETE_NOTE', categorySlug: string, id: number }
  | { type: 'EDIT_NOTE', categorySlug: string, noteId: number, title: string, description: string }

const initState: NoteCategory[] = [
  {
    title: "General",
    notes: [
      {
        title: "This is a general note",
        description: "Anything that does not fit into any of the other categories should be placed into this category."
      }
    ]
  },
  {
    title: "Phonology",
    notes: [
      {
        title: "Notes on phonology",
        description: "The sounds of words and letters in your language."
      }
    ]
  },
  {
    title: "Morphology",
    notes: [
      {
        title: "A note on morphology",
        description: "Anything do to with how words are structured in your language should be placed here."
      }
    ]
  },
  {
    title: "Syntax",
    notes: [
      {
        title: "Some notes about syntax",
        description: "Notes you have that involve the syntax of your language go here."
      }
    ]
  }
]

const NoteContext = createContext([])

const reducer = (state: NoteCategory[], action: Action): NoteCategory[] => {
  switch (action.type) {
    case "ADD_NOTE":
      let noteCategories: NoteCategory[], categoryGroupIndex: number
      noteCategories = [...state]
      categoryGroupIndex = noteCategories.map((el) => { return el.title.toLowerCase() }).indexOf(action.categorySlug.toLowerCase())
      if (noteCategories[categoryGroupIndex]) {
        let newNote: Note = {
          title: action.title,
          description: action.description
        }
        noteCategories[categoryGroupIndex].notes.push(newNote)
      }
      console.log(noteCategories)
      return noteCategories
    case "EDIT_NOTE":
      noteCategories = [...state]
      categoryGroupIndex = state.map((el) => { return el.title.toLowerCase() }).indexOf(action.categorySlug.toLowerCase())
      if (noteCategories[categoryGroupIndex]) {
        let updatedNote: Note = {
          title: action.title,
          description: action.description
        }
        noteCategories[categoryGroupIndex].notes[action.noteId] = updatedNote
      }
      return noteCategories
    case "DELETE_NOTE":
      noteCategories = [...state]
      categoryGroupIndex = state.map((el) => { return el.title.toLowerCase() }).indexOf(action.categorySlug.toLowerCase())
      if (noteCategories[categoryGroupIndex]) {
        noteCategories[categoryGroupIndex].notes.splice(action.id, 1)
      }
      return noteCategories
    default:
      return state
  }
}

export function NoteContextProvider({ children}) {
  const [noteCategories, setNoteCategories] = useReducer(reducer, initState)

  return (
    <NoteContext.Provider value={[noteCategories, setNoteCategories]}>
      {children}
    </NoteContext.Provider>
  )
}

export function useNoteContext() {
  return useContext(NoteContext)
}
