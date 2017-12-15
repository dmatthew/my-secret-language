import { combineReducers } from 'redux';
import words from './Words/reducers';
import notes from './Notes/reducers';

const rootReducer = combineReducers({
  words,
  notes
});

export default rootReducer;
