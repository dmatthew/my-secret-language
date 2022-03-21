export type Language = {
  id: number
  name: string
  words: any[]
  user: any
}

export interface Word {
  mainWord: string
  secretWord: string
  languageId: number
  id?: number
}

export interface Note {
  title: string
  description: string
  languageId: number
  noteCategoryId: number
}

export interface NoteCategory {
  id: number
  title: string
  notes: Note[]
}
