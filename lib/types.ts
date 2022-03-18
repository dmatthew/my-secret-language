export interface Language {
  id: number
  name: string
}

export interface Word {
  mainWord: string
  secretWord: string
  languageId: number
  id?: number
}

export interface NoteCategory {
  title: string
  notes: Array<{ title: string; description: string }>
}

export interface Note {
  title: string
  description: string
}
