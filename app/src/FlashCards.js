import React from 'react';

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
    return (
      <div class="panel" title="Flash Cards" id="flash-cards" data-footer="none">
        {this.state.mainIsVisible && <h1>{this.props.word.mainWord}</h1>}
        {!this.state.mainIsVisible && <h1>{this.props.word.secretWord}</h1>}
        <button class="button btn-large" type="button" onClick={() => this.flipCard()}>Flip card</button>
        <button class="button btn-large" type="button">Next word</button>
      </div>
    );
  }
}

export default FlashCards;
