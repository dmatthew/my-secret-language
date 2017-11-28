import React from 'react';

class Translate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showNewWordForm: false,
      newWord: {
        main: '',
        secret: ''
      }
    };
  }

  handleUntranslatedWordClick(word) {
    this.setState({
      showNewWordForm: true,
      newWord: {
        main: word
      }
    });
  }

  handleCancelNewWord() {
    this.setState({showNewWordForm: false})
  }

  handleClearTranslationClick() {
    this.setState({showNewWordForm: false});
    this.props.onClearTranslationClick();
  }

  render() {
    let translatedText = '';
    if (this.props.translatedWords) {
      translatedText = this.props.translatedWords.map((word, index) => {
        return (
          <span key={index} onClick={word.hasClick && (() => this.handleUntranslatedWordClick(word.word))}>{word.word}</span>
        );
      });
    }
    return (
      <div>
        <textarea rows="5" placeholder="Enter your text to be translated..." value={this.props.translateText} onChange={this.props.onTextareaChange} autoFocus></textarea>
        <div>
          {translatedText}
        </div>
        <input type="button" value="Clear" className="button btn-large" onClick={() => this.handleClearTranslationClick()} />
        {this.state.showNewWordForm &&
          <div id="add-word-popup">
            <form name="addFormPop">
              <label htmlFor="secret-text-pop">{this.state.newWord.main}</label>
              <input id="secret-text-pop" placeholder={"Translation for \u0022" + this.state.newWord.main + "\u0022"} required type="text" autoFocus />
              <input type="submit" className="button btn-large" value="Save" />
              <input type="button" value="Cancel" className="button btn-large red" onClick={() => this.handleCancelNewWord()} />
            </form>
          </div>
        }
      </div>
    );
  }
}

export default Translate;
