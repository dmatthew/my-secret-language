const notes = (state = [], action) => {
  let notes, index, categoryGroupIndex;
  switch (action.type) {
    case 'ADD_NOTE':
      notes = [...state];
      index = notes.map(function(el) { return el.categoryTitle; }).indexOf(action.category);
      notes[index].categoryNotes.push({
        title: action.title,
        description: action.description
      });
      return notes;
    case 'EDIT_NOTE':
      categoryGroupIndex = state.map(function(el) { return el.categoryTitle; }).indexOf(action.category);
      notes = [...state];
      notes[categoryGroupIndex].categoryNotes[action.index] = {
        title: action.title,
        description: action.description
      };
      return notes;
    case 'DELETE_NOTE':
      categoryGroupIndex = state.map(function(el) { return el.categoryTitle; }).indexOf(action.category);
      notes = [...state];
      notes[categoryGroupIndex].categoryNotes.splice(action.index, 1);
      return notes;
    default:
      return state;
  }
}

export default notes;
