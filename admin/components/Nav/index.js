import './style.scss';

import React, { PropTypes } from 'react';
import calssNames from 'classnames';

const Nav = (props) => {
  const listClass = calssNames(
    'nav' // TODO better prefix
  );
  return (
    <div className={listClass}>
        {'nava'}
    </div>
  );
};

Nav.defaultProps = {
};

Nav.propTypes = {
};


export default Nav;
