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
        main: word,
        secret: ''
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
    this.props.onNewWordFormSubmit(word);
  }

  handleNewWordSecretChange(event) {
    let newWord = {...this.state.newWord};
    newWord.secret = event.target.value;
    this.setState({
      newWord: newWord
    });
  }

  render() {
    let translatedText = '';
    if (this.props.translatedWords) {
      translatedText = this.props.translatedWords.map((word, index) => {
        return (
          <span
            key={index}
            onClick={word.hasClick ? (() => this.handleUntranslatedWordClick(word.word)) : undefined}
            className={word.hasClick ? 'highlight' : ''}>
            {word.word}
          </span>
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

export default Translate;
