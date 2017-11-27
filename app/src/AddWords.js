import React from 'react';

class AddWords extends React.Component {
  render() {
    return (
      <div>
        <h2>Add a new Word</h2>
        <form name="addWordForm" onSubmit={this.props.onAddWordSubmit}>
          <label for="main-text">English</label>
          <input name="mainText" id="main-text" onChange={this.props.onMainWordChange} value={this.props.mainWord} placeholder="English word here..." required autofocus type="text" />
          <label for="secret-text">Secret word</label>
          <input id="secret-text" onChange={this.props.onSecretWordChange} value={this.props.secretWord} placeholder="Secret word here..." required type="text" />
          <input type="submit" class="button btn-large" value="Save" />
        </form>
      </div>
    );
  }
}

export default AddWords;
