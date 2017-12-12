import React from 'react';
import { Link } from 'react-router-dom';

class Dictionary extends React.Component {
  constructor() {
    super();
    this.state = {
      searchTerm: ''
    };
  }

  sortByMainWord(arr) {
    arr.sort(function(a, b){
      var valueA = a.mainWord.toLowerCase(), valueB = b.mainWord.toLowerCase();
      if (valueA < valueB) return -1;
      if (valueA > valueB) return 1;
      return 0;
    });
    return arr;
  }

  handleSearchUpdate(event) {
    event.preventDefault();
    this.setState({searchTerm: event.target.value});
  }

  render() {
    let words = '';
    if (this.props.words) {
      let searchTerm = this.state.searchTerm;
      let currentLetter = '';
      words = this.props.words.slice(0);
      words = this.sortByMainWord(words);
      words = words.map((word, index) => {
        let found = word.mainWord.indexOf(searchTerm) !== -1 || word.secretWord.indexOf(searchTerm) !== -1;
        if (searchTerm === '' || found) {
          let isNewLetter = word.mainWord.substr(0, 1) !== currentLetter;
          currentLetter = word.mainWord.substr(0, 1);
          return (
            <span key={index}>
              {isNewLetter &&
                <li className="divider">{word.mainWord.substr(0, 1).toUpperCase()}</li>
              }
              <li>
                <Link to={"/edit-word/" + word.mainWord}>
                  {word.mainWord}
                  <span className="right">{word.secretWord}</span>
                </Link>
              </li>
            </span>
          );
        }
        else return undefined;
      });
    }

    return (
      <div>
        <input value={this.state.searchTerm} onChange={(e) => this.handleSearchUpdate(e)}
          type="search" placeholder="Enter search term..." />
        <ul className="list">
          {words}
        </ul>
      </div>
    );
  }
}

export default Dictionary;
