import React from 'react';

class Home extends React.Component {
  render() {
    return (
      <div>
        <a href="#add-words" class="button btn-large">Add new word</a>
    		<a href="#translate" class="button btn-large">Translate</a>
    	  <a href="#dictionary" class="button btn-large">Dictionary</a>
    	  <a href="#flash-cards" class="button btn-large">Flash cards</a>
    	  <a href="#notes" class="button btn-large">Notes</a>
      </div>
    );
  }
}

export default Home;
