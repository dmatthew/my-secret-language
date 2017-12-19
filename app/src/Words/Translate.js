import React from 'react';
import {connect} from 'react-redux';
import {addWord} from './actions';

class Translate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: props.words,
      translateTextarea: '',
      translatedWords: [],
      showNewWordForm: false,
      newWord: {
        main: '',
        secret: ''
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      words: nextProps.words
    }, () => this.updateTranslatedWords(this.state.translateTextarea));
  }

  onTranslateTextareaChange(event) {
    let mainText = event.target.value;
    this.setState({
      translateTextarea: mainText
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
            text: newWord,
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
          text: newWord,
          hasClick: true
        });
        translatedWords.push({
          text: specialChar +  ' ',
          hasClick: false
        });

        this.setState({
          translatedWords: translatedWords
        });
      }
    }
  }

  handleUntranslatedWordClick(word) {
    this.setState({
      showNewWordForm: true,
      newWord: {
        main: word,
        secret: ''
      }
    });
  }

  handleCancelNewWord() {
    this.setState({showNewWordForm: false})
  }

  handleClearTranslationClick() {
    this.setState({
      showNewWordForm: false,
      translateTextarea: '',
      translatedWords: []
    });
  }

  handleNewWordSecretChange(event) {
    let newWord = {...this.state.newWord};
    newWord.secret = event.target.value;
    this.setState({
      newWord: newWord
    });
  }

  handleNewWordFormSDubmit(event) {
    event.preventDefault();
    let word = this.state.newWord;
    this.setState({
      showNewWordForm: false,
      newWord: {
        main: '',
        secret: ''
      }
    });
    this.props.onNewWordFormSubmit(word.main, word.secret);
  }

  render() {
    let translatedText = '';
    if (this.state.translatedWords) {
      translatedText = this.state.translatedWords.map((word, index) => {
        return (
          <span
            key={index}
            onClick={word.hasClick ? (() => this.handleUntranslatedWordClick(word.text)) : undefined}
            className={word.hasClick ? 'highlight' : ''}>
            {word.text}
          </span>
        );
      });
    }
    return (
      <div>
        <textarea rows="5" placeholder="Enter your text to be translated..." value={this.state.translateTextarea} onChange={(e) => this.onTranslateTextareaChange(e)} autoFocus></textarea>
        <div>
          {translatedText}
        </div>
        <input type="button" value="Clear" className="button btn-large" onClick={() => this.handleClearTranslationClick()} />
        {this.state.showNewWordForm &&
          <div id="add-word-popup">
            <form name="addFormPop" onSubmit={(e) => this.handleNewWordFormSDubmit(e)}>
              <label htmlFor="secret-text-pop">{this.state.newWord.main}</label>
              <input
                id="secret-text-pop"
                placeholder={"Translation for \u0022" + this.state.newWord.main + "\u0022"}
                value={this.state.newWord.secret}
                onChange={(e) => this.handleNewWordSecretChange(e)}
                required type="text" autoFocus />
              <input type="submit" className="button btn-large" value="Save" />
              <button className="button btn-large red" onClick={() => this.handleCancelNewWord()}>Cancel</button>
            </form>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    words: state.words
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onNewWordFormSubmit: (mainWord, secretWord) => dispatch(addWord(mainWord, secretWord))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Translate);
