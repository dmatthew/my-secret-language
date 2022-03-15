import { Word } from 'lib/types'

export type WordAction =
  | { type: 'ADD_WORD'; mainWord: string; secretWord: string }
  | { type: 'DELETE_WORD'; mainWord: string }
  | { type: 'EDIT_WORD'; mainWord: string; secretWord: string }
  | { type: 'INIT_STORED'; value: Word[] }

export default function WordReducer(state: Word[], action: WordAction): Word[] {
  let words: Word[], index: number
  switch (action.type) {
    case 'ADD_WORD':
      return [
        ...state,
        {
          mainWord: action.mainWord,
          secretWord: action.secretWord,
        },
      ]
    case 'EDIT_WORD':
      words = [...state]
      index = words
        .map((el) => {
          return el.mainWord
        })
        .indexOf(action.mainWord)
      words[index] = {
        mainWord: action.mainWord,
        secretWord: action.secretWord,
      }
      return words
    case 'DELETE_WORD':
      words = [...state]
      index = words
        .map((el) => {
          return el.mainWord
        })
        .indexOf(action.mainWord)
      words.splice(index, 1)
      return words
    case 'INIT_STORED':
      return action.value
    default:
      return state
  }
}
