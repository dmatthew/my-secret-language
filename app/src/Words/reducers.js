const words = (state = [], action) => {
  let words, index;
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
      words = [...state];
      index = words.map(function(el) { return el.mainWord; }).indexOf(action.mainWord);
      words[index] = {
        mainWord: action.mainWord,
        secretWord: action.secretWord
      };
      return words;
    case 'DELETE_WORD':
      words = [...state];
      index = words.map(function(el) { return el.mainWord; }).indexOf(action.mainWord);
      words.splice(index, 1);
      return words;
    default:
      return state;
  }
}

export default words;
