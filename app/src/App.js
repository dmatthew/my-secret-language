import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from "react-router-dom";
import createHistory from 'history/createBrowserHistory';
import Home from './Home';
import AddWords from './AddWords';
import Translate from './Translate';
import Dictionary from './Dictionary';
import FlashCards from './FlashCards';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      words: [],
      addWords: {
        mainWord: '',
        secretWord: ''
      },
      flashCardWord: '',
      translateTextarea: '',
      translatedWords: []
    };
  }

  componentDidMount() {
    let flashCardWord = this.getRandomValue(this.state.words);
    flashCardWord = {mainWord: 'Test', secretWord: 'Sroto'};
    this.setState({flashCardWord: flashCardWord});
  }

  handleAddWordSubmit(event) {
    let words = [...this.state.words];
    words.push({
      mainWord: this.state.addWords.mainWord,
      secretWord: this.state.addWords.secretWord
    });
    this.setState({
      words: words,
      addWords: {
        mainWord: '',
        secretWord: ''
      }
    });
    event.preventDefault();
  }

  handleMainWordChange(event) {
    let addWords = {...this.state.addWords};
    addWords.mainWord = event.target.value;
    this.setState({
      addWords: addWords
    });
  }

  handleSecretWordChange(event) {
    let addWords = {...this.state.addWords};
    addWords.secretWord = event.target.value;
    this.setState({
      addWords: addWords
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

  render() {
    const addWords = () => {
      return (
        <AddWords
          mainWord={this.state.addWords.mainWord}
          secretWord={this.state.addWords.secretWord}
          onAddWordSubmit={(e) => this.handleAddWordSubmit(e)}
          onMainWordChange={(e) => this.handleMainWordChange(e)}
          onSecretWordChange={(e) => this.handleSecretWordChange(e)} />
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
            <Route path='/add-words' render={addWords} />
            <Route path='/translate' render={translate} />
            <Route path='/dictionary' render={dictionary} />
            <Route path='/flash-cards' render={flashCards} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
