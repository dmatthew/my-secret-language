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
      translate: {
        main: '',
        secret: ''
      }
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
      translate: {
        main: event.target.value
      }
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
          translateText={this.state.translate.main}
          onTextareaChange={(e) => this.handleTranslateTextareaChange(e)} />
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
