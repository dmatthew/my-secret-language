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
