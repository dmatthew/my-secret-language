export const addNote = (category, title, description) => {
  return {
    type: 'ADD_NOTE',
    category,
    title,
    description
  }
}

export const editNote = (category, index, title, description) => {
  return {
    type: 'EDIT_NOTE',
    category,
    index,
    title,
    description
  }
}

export const deleteNote = (category, index) => {
  return {
    type: 'DELETE_NOTE',
    category,
    index
  };
}
