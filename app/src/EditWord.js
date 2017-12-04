import React from 'react';

class EditWord extends React.Component {
  // NOTE: This is needed to access this.context.router.history so we can go back.
  static contextTypes = {
    router: () => true, // replace with PropTypes.object if you use them
  }

  constructor(props) {
    super(props);
    this.state = {
      mainWord: this.props.word.mainWord,
      secretWord: this.props.word.secretWord
    };
  }

  handleEditMainWordChange(event) {
    this.setState({
      editWord: event.target.value
    });
  }

  handleEditSecretWordChange(event) {
    this.setState({
      secretWord: event.target.value
    });
  }

  handleEditWordFormSubmit(event) {
    event.preventDefault();
    this.props.onEditWordFormSubmit({mainWord: this.state.mainWord, secretWord: this.state.secretWord});
  }

  handleDeleteWordClick() {
    this.props.onDeleteWordClick(this.state.mainWord);
    this.context.router.history.goBack();
  }

  render() {
    return (
      <div className="panel" title="Dictionary" id="edit-dictionary" data-footer="none">
        <form name="editWordForm" onSubmit={(e) => this.handleEditWordFormSubmit(e)}>
          <label htmlFor="edit-main-text">English</label>
          <input name="editMainText" id="edit-main-text" onChange={(e) => this.handleEditMainWordChange(e)} value={this.state.mainWord} required type="text" />
          <label htmlFor="edit-secret-text">Secret word</label>
          <input id="edit-secret-text" onChange={(e) => this.handleEditSecretWordChange(e)} value={this.state.secretWord} required type="text" />
          <input type="submit" className="button btn-large" value="Save" />
        </form>
        <button className="button btn-large red" onClick={() => this.handleDeleteWordClick()}>Delete</button>
      </div>
    );
  }
}

export default EditWord;
