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
import ViewNote from './Notes/ViewNote';
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

  render() {
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
              <Route path='/view-note/:category/:id' component={ViewNote} />
              <Redirect from='/add-note' to='/notes' />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
