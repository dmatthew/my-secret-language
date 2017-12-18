import React from 'react';
import {connect} from 'react-redux';
import {addWord} from './actions'

class AddWord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainWord: '',
      secretWord: ''
    }
  }

  onMainWordChange(event) {
    this.setState({
      mainWord: event.target.value
    });
  }

  onSecretWordChange(event) {
    this.setState({
      secretWord: event.target.value
    });
  }

  onAddWordFormSubmit(event) {
    event.preventDefault();
    this.setState({
      mainWord: '',
      secretWord: ''
    })
    this.props.onAddWordFormSubmit(this.state.mainWord, this.state.secretWord);
  }

  render() {
    return (
      <div>
        <h3>Add a new Word</h3>
        <form name="addWordForm" onSubmit={(e) => this.onAddWordFormSubmit(e)}>
          <label htmlFor="main-text">Main Word</label>
          <input
            name="mainText" id="main-text"
            onChange={(e) => this.onMainWordChange(e)}
            value={this.state.mainWord}
            placeholder="Main word here..." required autoFocus type="text" />
          <label htmlFor="secret-text">Secret word</label>
          <input
            id="secret-text"
             onChange={(e) => this.onSecretWordChange(e)}
             value={this.state.secretWord}
             placeholder="Secret word here..." required type="text" />
          <input type="submit" className="button btn-large" value="Save" />
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onAddWordFormSubmit: (mainWord, secretWord) => dispatch(addWord(mainWord, secretWord))
  }
}

export default connect(null, mapDispatchToProps)(AddWord);
