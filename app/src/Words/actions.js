export const addWord = (mainWord, secretWord) => {
  return {
    type: 'ADD_WORD',
    mainWord,
    secretWord
  }
}

export const editWord = (index, mainWord, secretWord) => {
  return {
    type: 'EDIT_WORD',
    mainWord,
    editWord,
    index
  }
}
