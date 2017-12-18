import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {editNote, deleteNote} from './actions';

class ViewNote extends React.Component {
  // NOTE: This is needed to access this.context.router.history so we can go back.
  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      noteTitle: this.props.note.title,
      noteDescription: this.props.note.description,
      isEditingNote: false
    };
  }

  setEditNoteMode() {
    this.setState({
      isEditingNote: true
    });
  }

  handleNoteTitleChange(event) {
    this.setState({
      noteTitle: event.target.value
    });
  }

  handleNoteDescriptionChange(event) {
    this.setState({
      noteDescription: event.target.value
    });
  }

  handleEditNoteFormSubmit(event) {
    event.preventDefault();
    this.setState({
      isEditingNote: false
    });
    this.props.onEditNoteFormSubmit(this.props.category, this.props.index, this.state.noteTitle, this.state.noteDescription);
  }

  handleDeleteNoteClick() {
    this.props.onDeleteNoteClick(this.props.category, this.props.index);
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
            <form onSubmit={(e) => this.handleEditNoteFormSubmit(e)}>
              <label htmlFor="noteTitleEdit">Note Title</label>
              <input
                id="note-title-edit" required autoFocus type="text"
                value={this.state.noteTitle}
                onChange={(e) => this.handleNoteTitleChange(e)} />
              <label htmlFor="noteDescriptionEdit">Note Description</label>
              <textarea
                id="note-description-edit" required type="text" rows="10"
                value={this.state.noteDescription}
                onChange={(e) => this.handleNoteDescriptionChange(e)}>
              </textarea>
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

const mapStateToProps = (state, ownProps) => {
  let category = ownProps.match.params.category;
  let index = ownProps.match.params.id;
  let categoryGroup = state.notes.find(function(el) { return el.categoryTitle === category});
  let note = (categoryGroup.categoryNotes[index])
    ? categoryGroup.categoryNotes[index]
    : {categoryTitle: '', categoryNotes: []};
  return {
    note,
    category,
    index
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onDeleteNoteClick: (category, index) => dispatch(deleteNote(category, index)),
    onEditNoteFormSubmit: (category, index, title, description) => dispatch(editNote(category, index, title, description))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewNote);
