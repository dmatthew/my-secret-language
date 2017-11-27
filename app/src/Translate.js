import React from 'react';

class Translate extends React.Component {
  render() {
    return (
      <div>
        <textarea rows="5" placeholder="Enter your text to be translated..."></textarea>
        <div>
          <span></span>
        </div>
        <input type="button" value="Clear" class="button btn-large" />
        <div id="add-word-popup">
          <form name="addFormPop">
            <label for="secret-text-pop"></label>
            <input id="secret-text-pop" placeholder="Translation" required type="text" autofocus />
            <input type="submit" class="button btn-large" value="Save" />
            <input type="button" value="Cancel" class="button btn-large red" />
          </form>
        </div>
      </div>
    );
  }
}

export default Translate;
