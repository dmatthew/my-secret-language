import React from 'react';
import {connect} from 'react-redux';

class FlashCards extends React.Component {
  constructor() {
    super();
    this.state = {
      mainIsVisible: true
    };
  }

  flipCard() {
    this.setState({mainIsVisible: !this.state.mainIsVisible});
  }

  render() {
    if (this.props.word) {
      return (
        <div id="flash-cards">
          {this.state.mainIsVisible && <h1>{this.props.word.mainWord}</h1>}
          {!this.state.mainIsVisible && <h1>{this.props.word.secretWord}</h1>}
          <button className="button btn-large" type="button" onClick={() => this.flipCard()}>Flip card</button>
          <button className="button btn-large" type="button" onClick={this.props.onNextWordClick}>Next word</button>
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
    word: state.flashCardWord
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onNextWordClick: () => console.log('FlashCards mapDispatchToProps onNextWordClick')
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlashCards);
