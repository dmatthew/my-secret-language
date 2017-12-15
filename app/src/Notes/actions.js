export const addNote = (category, title, description) => {
  return {
    type: 'ADD_NOTE',
    title,
    description
  }
}

export const editNote = (category, index, title, description) => {
  return {
    type: 'EDIT_NOTE',
    index,
    title,
    description
  }
}
