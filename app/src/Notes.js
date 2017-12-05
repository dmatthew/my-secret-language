import React from 'react';
import { Link } from 'react-router-dom';

class Notes extends React.Component {
  render() {
    let notes = this.props.notes.map((note, index) => {
      return (
        <span key={index}>
          <li className="divider category">{note.categoryTitle}</li>
          <IndividualNotes notes={note.categoryNotes} />
          <div>
            <Link to={"add-note/" + note.categoryTitle} className="button btn-sepia icon add"> Note</Link>
          </div>
        </span>
      );
    });
    return (
      <div>
        <ul className="list">
          {notes}
        </ul>
      </div>
    );
  }
}

class IndividualNotes extends React.Component {
  render () {
    let notes = this.props.notes.map((note, index) => {
      return (
        <li key={index}>
          <a>{note.title}</a>
        </li>
      );
    });

    return (
      <li>
        <ul>
          {notes}
        </ul>
      </li>
    );
  }
}

export default Notes;
