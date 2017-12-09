import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
  // NOTE: This is needed to access this.context.router.history so we can go back.
  static contextTypes = {
    router: PropTypes.object,
  }

  render() {
    const showBackButton = this.context.router.route.location.pathname !== '/';
    return (
      <header className="header">
        {showBackButton && <a className="back-button button" onClick={this.context.router.history.goBack}>Back</a>}
        <h1 className="app-title">{this.props.title}</h1>
      </header>
    );
  }
}

export default Header;
