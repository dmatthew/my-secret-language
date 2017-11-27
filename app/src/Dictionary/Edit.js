import React from 'react';

class Edit extends React.Component {
  render() {
    return (
      <div className="panel" title="Dictionary" id="edit-dictionary" data-footer="none">
        <form name="editWordForm">
          <label htmlFor="edit-main-text">English</label>
          <input name="editMainText" id="edit-main-text" required type="text" />
          <label htmlFor="edit-secret-text">Secret word</label>
          <input id="edit-secret-text" required type="text" />
          <input type="submit" className="button btn-large" value="Save">
        </form>
        <a className="button btn-large red">Delete</a>
      </div>
    );
  }
}

export default Edit;
