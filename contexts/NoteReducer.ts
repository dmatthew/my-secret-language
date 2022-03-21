import { NoteCategory, Note } from 'lib/types'

export type NoteAction =
  | {
      type: 'ADD_NOTE'
      categorySlug: string
      title: string
      description: string
      noteId: number
      languageId: number
    }
  | { type: 'DELETE_NOTE'; categorySlug: string; id: number }
  | {
      type: 'EDIT_NOTE'
      categorySlug: string
      noteId: number
      title: string
      description: string
      languageId: number
    }
  | { type: 'INIT_STORED'; value: NoteCategory[] }

export default function NoteReducer(
  state: NoteCategory[],
  action: NoteAction
): NoteCategory[] {
  let noteCategories: NoteCategory[], categoryGroupIndex: number
  switch (action.type) {
    case 'ADD_NOTE':
      noteCategories = [...state]
      categoryGroupIndex = noteCategories
        .map((el) => {
          return el.title.toLowerCase()
        })
        .indexOf(action.categorySlug.toLowerCase())
      if (noteCategories[categoryGroupIndex]) {
        let newNote: Note = {
          title: action.title,
          description: action.description,
          noteCategoryId: 1,
          languageId: 1,
        }
        noteCategories[categoryGroupIndex].notes.push(newNote)
      }
      return noteCategories
    case 'EDIT_NOTE':
      noteCategories = [...state]
      categoryGroupIndex = state
        .map((el) => {
          return el.title.toLowerCase()
        })
        .indexOf(action.categorySlug.toLowerCase())
      if (noteCategories[categoryGroupIndex]) {
        let updatedNote: Note = {
          title: action.title,
          description: action.description,
          noteCategoryId: 1,
          languageId: 1,
        }
        noteCategories[categoryGroupIndex].notes[action.noteId] = updatedNote
      }
      return noteCategories
    case 'DELETE_NOTE':
      noteCategories = [...state]
      categoryGroupIndex = state
        .map((el) => {
          return el.title.toLowerCase()
        })
        .indexOf(action.categorySlug.toLowerCase())
      if (noteCategories[categoryGroupIndex]) {
        noteCategories[categoryGroupIndex].notes.splice(action.id, 1)
      }
      return noteCategories
    case 'INIT_STORED':
      return action.value
    default:
      return state
  }
}
