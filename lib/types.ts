export interface Word {
  mainWord: string
  secretWord: string
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
