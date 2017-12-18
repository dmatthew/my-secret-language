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
      let words = [...state];
      let index = words.map(function(el) { return el.mainWord; }).indexOf(action.mainWord);
      words.splice(index, 1);
      return words;
    default:
      return state;
  }
}

export default words;
