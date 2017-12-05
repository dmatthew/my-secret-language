import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import createHistory from 'history/createBrowserHistory';
import Home from './Home';
import AddWord from './AddWord';
import Translate from './Translate';
import Dictionary from './Dictionary';
import FlashCards from './FlashCards';
import Notes from './Notes';
import AddNote from './AddNote';
import EditWord from './EditWord';
import Setup from './Setup';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      words: [],
      flashCardWord: '',
      translateTextarea: '',
      translatedWords: [],
      notes: Setup.DEFAULT_NOTES
    };
  }

  componentDidMount() {
    let flashCardWord = this.getRandomValue(this.state.words);
    flashCardWord = {mainWord: 'Test', secretWord: 'Sroto'};
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
  }

  handleTranslateTextareaChange(event) {
    this.setState({
      translateTextarea: event.target.value,
      translatedWords: []
    });

    let mainText = event.target.value;
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
    this.setState({
      words: words
    });
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
  }

  deleteWord(mainWord) {
    let words = [...this.state.words];
    let index = words.map(function(el) { return el.mainWord; }).indexOf(mainWord);
    words.splice(index, 1);
    this.setState({
      words: words
    });
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
          onEditNoteFormSubmit={(category, title, description) => this.handleAddNoteFormSubmit(category, title, description)} />
      );
    };

    const history = createHistory();
    return (
      <BrowserRouter>
        <div className="app">
          <header className="app-header">
            <a className="backButton button" onClick={history.goBack}>Back</a>
            <h1 className="app-title">Mi Scrt Lngwij</h1>
          </header>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/add-word' render={addWord} />
            <Route path='/translate' render={translate} />
            <Route path='/dictionary' render={dictionary} />
            <Route path='/flash-cards' render={flashCards} />
            <Route path='/notes' render={notes} />
            <Route path='/edit-word/:word' render={editWord} />
            <Route path='/add-note/:category' render={addNote} />
            <Redirect from='/add-note' to='/notes' />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
