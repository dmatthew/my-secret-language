export interface LanguageType {
  id: number
  name: string
  words?: any[]
  userId?: any
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

export interface APIJsonResponse {
  data?: {
    items?: Array<{ [index: string]: any }>
    [index: string]: any
  }
  error?: {
    message: string
  }
}
