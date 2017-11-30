import React from 'react';

class EditWord extends React.Component {
  constructor(props) {
    super(props);
    this.state={something: props.path, two: props.match};
  }
  render() {
    return (
      <div className="panel" title="Dictionary" id="edit-dictionary" data-footer="none">
        <form name="editWordForm">
          <label htmlFor="edit-main-text">English</label>
          <input name="editMainText" id="edit-main-text" value={this.props.word.mainWord} required type="text" />
          <label htmlFor="edit-secret-text">Secret word</label>
          <input id="edit-secret-text" value={this.props.word.secretWord} required type="text" />
          <input type="submit" className="button btn-large" value="Save" />
        </form>
        <button className="button btn-large red">Delete</button>
      </div>
    );
  }
}

export default EditWord;
