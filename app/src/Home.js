import React from 'react';
import {Link} from 'react-router-dom'

class Home extends React.Component {
  render() {
    return (
      <div>
        <Link to="/add-words" className="button btn-large">Add new word</Link>
    		<Link to="#/translate" className="button btn-large">Translate</Link>
    	  <Link to="#/dictionary" className="button btn-large">Dictionary</Link>
    	  <Link to="#/flash-cards" className="button btn-large">Flash cards</Link>
    	  <Link to="#/notes" className="button btn-large">Notes</Link>
      </div>
    );
  }
}

export default Home;
