import Setup from './Setup';

const configureLocalStorage = () => {
  // Initialize words and notes from local storage.
  if ( ! localStorage.getItem('words')) localStorage.setItem('words', JSON.stringify([]));
  if ( ! localStorage.getItem('notes')) localStorage.setItem('notes', JSON.stringify(Setup.DEFAULT_NOTES));
  let words = JSON.parse(localStorage.getItem('words'));
  // Old "word" structure was {english: '', secret: ''}. Now its {mainWord: '', secretWord: ''}
  if (localStorage.getItem('wordObjectKeysVersion') !== '2') {
    localStorage.setItem('wordObjectKeysVersion', '2');
    for (let i = 0; i < words.length; i++) {
      if (words[i].english) {
        words[i].mainWord = words[i].english;
        delete words[i].english;
      }
      if (words[i].secret) {
        words[i].secretWord = words[i].secret;
        delete words[i].secret;
      }
    }
    localStorage.setItem('words', JSON.stringify(words));
  }
}

export default configureLocalStorage;
