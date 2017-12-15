import React from 'react';
import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <Link to="/add-word" className="button btn-large">Add new word</Link>
  		<Link to="/translate" className="button btn-large">Translate</Link>
  	  <Link to="/dictionary" className="button btn-large">Dictionary</Link>
  	  <Link to="/flash-cards" className="button btn-large">Flash cards</Link>
  	  <Link to="/notes" className="button btn-large">Notes</Link>
    </div>
  );
}

export default Home;
