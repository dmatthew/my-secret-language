const notes = (state = [], action) => {
  switch (action.type) {
    case 'ADD_NOTE':
      return state;
    case 'EDIT_NOTE':
      return state;
    case 'DELETE_NOTE':
      return state;
    default:
      return state;
  }
}

export default notes;
