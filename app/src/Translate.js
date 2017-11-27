import React from 'react';

class Translate extends React.Component {
  render() {
    return (
      <div>
        <textarea rows="5" placeholder="Enter your text to be translated..." value={this.props.translateText} onChange={this.props.onTextareaChange}></textarea>
        <div>
          <span></span>
        </div>
        <input type="button" value="Clear" className="button btn-large" />
        <div id="add-word-popup">
          <form name="addFormPop">
            <label htmlFor="secret-text-pop"></label>
            <input id="secret-text-pop" placeholder="Translation" required type="text" autoFocus />
            <input type="submit" className="button btn-large" value="Save" />
            <input type="button" value="Cancel" className="button btn-large red" />
          </form>
        </div>
      </div>
    );
  }
}

export default Translate;
