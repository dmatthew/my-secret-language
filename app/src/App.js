import React from 'react';
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
      }
    };
  }

  handleAddWordSubmit(e) {
    alert(this.state.addWords.mainWord + ' ' + this.state.addWords.secretWord);
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
    e.preventDefault();
  }

  handleMainWordChange(e) {
    let addWords = {...this.state.addWords};
    addWords.mainWord = e.target.value;
    this.setState({
      addWords: addWords
    });
  }

  handleSecretWordChange(e) {
    let addWords = {...this.state.addWords};
    addWords.secretWord = e.target.value;
    this.setState({
      addWords: addWords
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

  render() {
    let flashCardWord = this.getRandomValue(this.state.words);
    flashCardWord = {mainWord: 'Test', secretWord: 'Sroto'};
    return (
      <div className="app">
        <header className="app-header">
          <h1 className="app-title">Mi Scrt Lngwij</h1>
        </header>
        <Home />
        <hr />
        <AddWords
          mainWord={this.state.addWords.mainWord}
          secretWord={this.state.addWords.secretWord}
          onAddWordSubmit={(e) => this.handleAddWordSubmit(e)}
          onMainWordChange={(e) => this.handleMainWordChange(e)}
          onSecretWordChange={(e) => this.handleSecretWordChange(e)} />
        <Translate />
        <hr />
        <Dictionary
          words={this.state.words} />
        <hr />
        <FlashCards
          word={flashCardWord}/>
      </div>
    );
  }
}

export default App;
