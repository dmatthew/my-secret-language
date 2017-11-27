import React from 'react';

class Home extends React.Component {
  render() {
    return (
      <div>
        <a href="#add-words" className="button btn-large">Add new word</a>
    		<a href="#translate" className="button btn-large">Translate</a>
    	  <a href="#dictionary" className="button btn-large">Dictionary</a>
    	  <a href="#flash-cards" className="button btn-large">Flash cards</a>
    	  <a href="#notes" className="button btn-large">Notes</a>
      </div>
    );
  }
}

export default Home;
