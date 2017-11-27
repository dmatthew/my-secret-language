import React from 'react';

class Dictionary extends React.Component {
  constructor() {
    super();
    this.state = {
      currentLetter: ''
    };
  }

  render() {
    let words = '';
    if (this.props.words) {
      words = this.props.words.map((word, index) => {
        return (
          <span key={index}>
            {word.mainWord.substr(0, 1) !== this.state.currentLetter &&
              <li class="divider">{word.mainWord.substr(0, 1).toUpperCase()}</li>
            }
            <li>
              <a>{word.mainWord}<span class="right">{word.secretWord}</span></a>
            </li>
          </span>
        );
      });
    }

    return (
      <div>
        <input type="search" placeholder="Enter search term..." />
        <ul>
        {words}
        </ul>
      </div>
    );
  }
}

export default Dictionary;
