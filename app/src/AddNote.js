import React from 'react';
import PropTypes from 'prop-types';

class AddNote extends React.Component {
  // NOTE: This is needed to access this.context.router.history so we can go back.
  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      noteTitle: '',
      noteDescription: ''
    };
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

  handleAddNoteFormSubmit(event) {
    event.preventDefault();
    this.props.onAddNoteFormSubmit(this.props.category, this.state.noteTitle, this.state.noteDescription);
    this.context.router.history.goBack();
  }

  render() {
    return (
      <div>
  		  <div className="formGroupHead">Category: {this.props.category}</div>
  		  <form name="addNoteForm" onSubmit={(e) => this.handleAddNoteFormSubmit(e)}>
    			<label htmlFor="noteTitleText">Note Title</label>
    			<input
            name="noteTitleText" id="note-title-text" placeholder="Note title here..."
            required autoFocus type="text"
            onChange={(e) => this.handleNoteTitleChange(e)}
            value={this.state.noteTitle} />
    			<label htmlFor="noteDescription">Description</label>
    			<textarea required rows="10" placeholder="Enter your note description..." onChange={(e) => this.handleNoteDescriptionChange(e)} value={this.noteDescription}></textarea>
    			<input type="submit" className="button btn-large" value="Save note" />
  		  </form>
  		</div>
    );
  }
}

export default AddNote;
