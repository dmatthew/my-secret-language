import React from 'react';
import { Link } from 'react-router-dom';

class Dictionary extends React.Component {
  constructor() {
    super();
    this.state = {
      currentLetter: '',
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
      words = this.props.words.slice(0);
      words = this.sortByMainWord(words);
      words = words.map((word, index) => {
        let found = word.mainWord.indexOf(searchTerm) !== -1 || word.secretWord.indexOf(searchTerm) !== -1;
        if (searchTerm === '' || found) {
          return (
            <span key={index}>
              {word.mainWord.substr(0, 1) !== this.state.currentLetter &&
                <li className="divider">{word.mainWord.substr(0, 1).toUpperCase()}</li>
              }
              <li>
                <Link to={"/edit-word/" + word.mainWord} className="button btn-large">
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
        <ul>
          {words}
        </ul>
      </div>
    );
  }
}

export default Dictionary;
