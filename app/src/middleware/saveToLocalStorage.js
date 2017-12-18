export const saveToLocalStorage = ({getState}) => {
  return next => action => {
    // Call the next dispatch method in the middleware chain.
    let returnValue = next(action);

    let state = getState();
    if (['ADD_WORD', 'EDIT_WORD', 'DELETE_WORD'].indexOf(action.type) !== -1) {
      localStorage.setItem('words', JSON.stringify(state.words));
    }
    if (['ADD_NOTE', 'EDIT_NOTE', 'DELETE_NOTE'].indexOf(action.type) !== -1) {
      localStorage.setItem('notes', JSON.stringify(state.notes));
    }

    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue
  }
}
