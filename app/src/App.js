import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Header from './Header';
import Home from './Home';
import AddWord from './Words/AddWord';
import Translate from './Words/Translate';
import Dictionary from './Words/Dictionary';
import FlashCards from './Words/FlashCards';
import Notes from './Notes/Notes';
import AddNote from './Notes/AddNote';
import ViewNote from './ViewNote';
import EditWord from './Words/EditWord';
// import Setup from './Setup';
import './App.css';

class App extends React.Component {
  // constructor() {
  //   super();
    // // Initialize words and notes from local storage.
    // if ( ! localStorage.getItem('words')) localStorage.setItem('words', JSON.stringify([]));
    // if ( ! localStorage.getItem('notes')) localStorage.setItem('notes', JSON.stringify(Setup.DEFAULT_NOTES));
    // let words = JSON.parse(localStorage.getItem('words'));
    // // Old "word" structure was {english: '', secret: ''}. Now its {mainWord: '', secretWord: ''}
    // if (localStorage.getItem('wordObjectKeysVersion') !== '2') {
    //   localStorage.setItem('wordObjectKeysVersion', '2');
    //   for (let i = 0; i < words.length; i++) {
    //     if (words[i].english) {
    //       words[i].mainWord = words[i].english;
    //       delete words[i].english;
    //     }
    //     if (words[i].secret) {
    //       words[i].secretWord = words[i].secret;
    //       delete words[i].secret;
    //     }
    //   }
    //   localStorage.setItem('words', JSON.stringify(words));
    // }
    // this.state = {
    //   words: words,
    //   flashCardWord: '',
    //   translateTextarea: '',
    //   translatedWords: [],
    //   notes: JSON.parse(localStorage.getItem('notes'))
    // };
  // }

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
    mainText = mainText.trim().split(" ");

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
    // const translate = () => {
    //   return (
    //     <Translate
    //       translateText={this.state.translateTextarea}
    //       onTextareaChange={(e) => this.handleTranslateTextareaChange(e)}
    //       translatedWords={this.state.translatedWords}
    //       onClearTranslationClick={() => this.handleClearTranslationClick()}
    //       onNewWordFormSubmit={(e) => this.handleTranslateNewWordFormSubmit(e)} />
    //   )
    // };
    // const addNote = ({match}) => {
    //   return (
    //     <AddNote
    //       category={match.params.category}
    //       onAddNoteFormSubmit={(category, title, description) => this.handleAddNoteFormSubmit(category, title, description)} />
    //   );
    // };
    const viewNote = ({match}) => {
      return (
        <ViewNote
          note={this.getNote(match.params.category, match.params.id)}
          category={match.params.category}
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
              <Route path='/add-word' component={AddWord} />
              <Route path='/translate' component={Translate} />
              <Route path='/dictionary' component={Dictionary} />
              <Route path='/flash-cards' component={FlashCards} />
              <Route path='/notes' component={Notes} />
              <Route path='/edit-word/:word' component={EditWord} />
              <Route path='/add-note/:category' component={AddNote} />
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
