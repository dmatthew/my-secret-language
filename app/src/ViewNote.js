import React from 'react';
import PropTypes from 'prop-types';

class ViewNote extends React.Component {
  // NOTE: This is needed to access this.context.router.history so we can go back.
  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      isEditingNote: false
    };
  }

  setEditNoteMode() {
    this.setState({
      isEditingNote: true
    });
  }

  handleDeleteNoteClick() {
    this.context.router.history.goBack();
  }

  render() {
    return (
      <div>
        <div className="book-page">
          {this.state.isEditingNote === false &&
            <div>
              <h1>{this.props.note.title}</h1>
              <div>{this.props.note.description}</div>
            </div>
          }
          {this.state.isEditingNote === true &&
            <form>
              <label htmlFor="noteTitleEdit">Note Title</label>
              <input id="note-title-edit" required autoFocus type="text" />
              <label htmlFor="noteDescriptionEdit">Note Description</label>
              <input id="note-description-edit" required type="text" />
              <input type="submit" className="button btn-large" value="Save changes" />
            </form>
          }
        </div>
        <button onClick={() => this.setEditNoteMode()} type="button" className="button btn-large">Edit note</button>
        <button onClick={() => this.handleDeleteNoteClick()} type="button" className="button btn-large red">Delete note</button>
      </div>
    );
  }
}

export default ViewNote;
