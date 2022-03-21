import { NoteAction } from 'contexts/NoteReducer'
import fetchJson, { FetchError } from 'lib/fetchJson'

export default function noteMiddleware(
  dispatch: React.Dispatch<NoteAction>
): (action: NoteAction) => Promise<void> {
  return async (action: NoteAction) => {
    let body: {}
    switch (action.type) {
      case 'ADD_NOTE':
        return
      case 'DELETE_NOTE':
        return
      case 'EDIT_NOTE':
        return
      default:
        dispatch(action)
    }
  }
}
