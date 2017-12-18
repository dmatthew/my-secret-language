export const addWord = (mainWord, secretWord) => {
  return {
    type: 'ADD_WORD',
    mainWord,
    secretWord
  }
}

// This should use an id field!
export const editWord = (mainWord, secretWord) => {
  return {
    type: 'EDIT_WORD',
    mainWord,
    secretWord
  }
}

// This really should use an id field!
export const deleteWord = (mainWord) => {
  return {
    type: 'DELETE_WORD',
    mainWord
  }
}
