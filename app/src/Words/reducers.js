const words = (state = [], action) => {
  switch (action.type) {
    case 'ADD_WORD':
    return [
      ...state,
      {
        mainWord: action.mainWord,
        secretWord: action.secretWord
      }
    ];
    case 'EDIT_WORD':
      return state;
    case 'DELETE_WORD':
      return state;
    default:
      return state;
  }
}

export default words;
