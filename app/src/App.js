import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Header from './Header';
import Home from './Home';
import AddWord from './AddWord';
import Translate from './Translate';
import Dictionary from './Dictionary';
import FlashCards from './FlashCards';
import Notes from './Notes';
import AddNote from './AddNote';
import ViewNote from './ViewNote';
import EditWord from './EditWord';
import Setup from './Setup';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
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
    this.state = {
      words: words,
      flashCardWord: '',
      translateTextarea: '',
      translatedWords: [],
      notes: JSON.parse(localStorage.getItem('notes'))
    };
  }

  componentDidMount() {
    let flashCardWord = this.getRandomValue(this.state.words);
    this.setState({flashCardWord: flashCardWord});
  }

  handleAddWordFormSubmit(mainWord, secretWord) {
    let words = [...this.state.words];
    words.push({
      mainWord: mainWord,
      secretWord: secretWord
    });
    this.setState({
      words: words
    });
    localStorage.setItem('words', JSON.stringify(words));
  }

  handleTranslateTextareaChange(event) {
    let mainText = event.target.value;
    this.setState({
      translateTextarea: mainText,
      translatedWords: []
    });

    this.updateTranslatedWords(mainText);
  }

  updateTranslatedWords(mainText) {
    let translatedWords = [];
    mainText = mainText.split(" ");

    // Loop through the english textarea text
    for (let i = 0; i < mainText.length; i++) {
      let isWordInDictionary = false;     // Whether the word is in the dictionary or not.
      let specialChar = "";  // The special character that is at the end of the word.

      // Check if the word ends in a special character
      let specialCharsList = [',', '.', ';', ':', '?', '!'];
      if (specialCharsList.indexOf(mainText[i].charAt(mainText[i].length - 1)) !== -1) {
        specialChar = mainText[i].charAt(mainText[i].length - 1);
        mainText[i] = mainText[i].substring(0, mainText[i].length - 1);
      }

      // Loop through the dictionary and check if the word has been defined yet.
      for (let j = 0; j < this.state.words.length; j++) {
        // if it is found, add it to the translatedWords array
        if (mainText[i].toUpperCase() === this.state.words[j].mainWord.toUpperCase()) {
          // The word to add to the translated words array
          let newWord = this.state.words[j].secretWord;
          newWord += specialChar + ' ';
          translatedWords.push({
            word: newWord,
            hasClick: false
          });
          this.setState({
            translatedWords: translatedWords
          });
          isWordInDictionary = true;
          break;
        }
      }
      if (!isWordInDictionary) {
        let newWord = mainText[i]; // The word to add to the translated words array.
        translatedWords.push({
          word: newWord,
          hasClick: true
        });
        translatedWords.push({
          word: specialChar +  ' ',
          hasClick: false
        });

        this.setState({
          translatedWords: translatedWords
        });
      }
    }
  }

  handleClearTranslationClick() {
    this.setState({
      translateTextarea: '',
      translatedWords: []
    });
  }

  handleTranslateNewWordFormSubmit(word) {
    let words = [...this.state.words];
    words.push({
      mainWord: word.main,
      secretWord: word.secret
    });
    localStorage.setItem('words', JSON.stringify(words));
    this.setState({
      words: words
    }, () => this.updateTranslatedWords(this.state.translateTextarea));
  }

  /**
  * Get a random word from the dictionary of words.
  * @returns {String}
  */
  getRandomValue(arr) {
      var randNum = Math.floor(Math.random() * arr.length);
      if (arr[randNum]) {
          return arr[randNum];
      }
      else {
          return "";
      }
  }

  flashCardNextWord(event) {
    this.setState({
      flashCardWord: this.getRandomValue(this.state.words)
    });
  }

  wordToEdit(pathWord) {
    return this.state.words.find((element) => element.mainWord === pathWord);
  }

  handleEditWordSubmit(word) {
    let words = [...this.state.words];
    let index = words.map(function(el) { return el.mainWord; }).indexOf(word.mainWord);
    words[index] = {
      mainWord: word.mainWord,
      secretWord: word.secretWord
    };
    this.setState({
      words: words
    });
    localStorage.setItem('words', JSON.stringify(words));
  }

  deleteWord(mainWord) {
    let words = [...this.state.words];
    let index = words.map(function(el) { return el.mainWord; }).indexOf(mainWord);
    words.splice(index, 1);
    this.setState({
      words: words
    });
    localStorage.setItem('words', JSON.stringify(words));
  }

  addToCategory(category) {
    return category;
  }

  handleAddNoteFormSubmit(category, title, description) {
    let notes = [...this.state.notes];
    let index = notes.map(function(el) { return el.categoryTitle; }).indexOf(category);
    notes[index].categoryNotes.push({
      title: title,
      description: description
    });
    this.setState({
      notes: notes
    });
    localStorage.setItem('notes', JSON.stringify(notes));
  }

  getNote(category, index) {
    let categoryGroup = this.state.notes.find(function(el) { return el.categoryTitle === category});
    if (categoryGroup.categoryNotes[index]) return categoryGroup.categoryNotes[index];
    return {categoryTitle: '', categoryNotes: []};
  }

  editNote(category, index, noteTitle, noteDescription) {
    let categoryGroupIndex = this.state.notes.map(function(el) { return el.categoryTitle; }).indexOf(category);
    let notes = [...this.state.notes];
    notes[categoryGroupIndex].categoryNotes[index] = {
      title: noteTitle,
      description: noteDescription
    };
    this.setState({
      notes: notes
    });
    localStorage.setItem('notes', JSON.stringify(notes));
  }

  deleteNote(category, index) {
    let categoryGroupIndex = this.state.notes.map(function(el) { return el.categoryTitle; }).indexOf(category);
    let notes = [...this.state.notes];
    notes[categoryGroupIndex].categoryNotes.splice(index, 1);
    this.setState({
      notes: notes
    });
    localStorage.setItem('notes', JSON.stringify(notes));
  }

  render() {
    const addWord = () => {
      return (
        <AddWord
          onAddWordFormSubmit={(mainWord, secretWord) => this.handleAddWordFormSubmit(mainWord, secretWord)} />
      )
    };
    const translate = () => {
      return (
        <Translate
          translateText={this.state.translateTextarea}
          onTextareaChange={(e) => this.handleTranslateTextareaChange(e)}
          translatedWords={this.state.translatedWords}
          onClearTranslationClick={() => this.handleClearTranslationClick()}
          onNewWordFormSubmit={(e) => this.handleTranslateNewWordFormSubmit(e)} />
      )
    };
    const dictionary = () => {
      return (
        <Dictionary
          words={this.state.words} />
      );
    };
    const flashCards = () => {
      return (
        <FlashCards
          word={this.state.flashCardWord}
          onNextWordClick={(e) => this.flashCardNextWord(e)} />
      );
    };
    const notes = () => {
      return (
        <Notes
          notes={this.state.notes} />
      );
    };
    const editWord = ({match}) => {
      return (
        <EditWord
          word={this.wordToEdit(match.params.word)}
          onEditWordFormSubmit={(word) => this.handleEditWordSubmit(word)}
          onDeleteWordClick={(word) => this.deleteWord(word)} />
      );
    }
    const addNote = ({match}) => {
      return (
        <AddNote
          category={this.addToCategory(match.params.category)}
          onAddNoteFormSubmit={(category, title, description) => this.handleAddNoteFormSubmit(category, title, description)} />
      );
    };
    const viewNote = ({match}) => {
      return (
        <ViewNote
          note={this.getNote(match.params.category, match.params.id)}
          category={this.addToCategory(match.params.category)}
          index={match.params.id}
          onDeleteNoteClick={(category, index) => this.deleteNote(category, index)}
          onEditNoteFormSubmit={(category, index, noteTitle, noteDescription) => this.editNote(category, index, noteTitle, noteDescription)} />
      );
    };

    return (
      <BrowserRouter>
        <div id="app">
          <Header title="Mi Scrt Lngwij" />
          <div id="content">
            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/add-word' render={addWord} />
              <Route path='/translate' render={translate} />
              <Route path='/dictionary' render={dictionary} />
              <Route path='/flash-cards' render={flashCards} />
              <Route path='/notes' render={notes} />
              <Route path='/edit-word/:word' render={editWord} />
              <Route path='/add-note/:category' render={addNote} />
              <Route path='/view-note/:category/:id' render={viewNote} />
              <Redirect from='/add-note' to='/notes' />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
