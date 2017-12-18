import React from 'react';
import {connect} from 'react-redux';

class FlashCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainIsVisible: true,
      flashCardWord: this.getNextFlashCard()
    };
  }

  flipCard() {
    this.setState({mainIsVisible: !this.state.mainIsVisible});
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
          return null;
      }
  }

  getNextFlashCard() {
      return this.getRandomValue(this.props.words);
  }

  onNextWordClick() {
    this.setState({
      mainIsVisible: true,
      flashCardWord: this.getNextFlashCard(this.props.words)
    });
  }

  render() {
    if (this.state.flashCardWord) {
      return (
        <div id="flash-cards">
          {this.state.mainIsVisible && <h1>{this.state.flashCardWord.mainWord}</h1>}
          {!this.state.mainIsVisible && <h1>{this.state.flashCardWord.secretWord}</h1>}
          <button className="button btn-large" type="button" onClick={() => this.flipCard()}>Flip card</button>
          <button className="button btn-large" type="button" onClick={() => this.onNextWordClick()}>Next word</button>
        </div>
      );
    }
    else {
      return (
        <div id="flash-cards">
          <h2>You have no words in your dictionary. Go to the Add Word page to start adding new words.</h2>
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    words: state.words
  }
}

export default connect(mapStateToProps)(FlashCards);
