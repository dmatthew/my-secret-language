export interface Word {
  mainWord: string,
  secretWord: string
}

export interface NoteCategory {
  title: string,
  notes: Array<{title: string, description: string}>
}

export interface Note {
  title: string,
  description: string
}
