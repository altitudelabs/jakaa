import React from 'react';
import calssNames from 'classnames';

const Header = () => {
  const itemClass = calssNames(
    'header'
  );
  return (
    <div
      className={itemClass}
    >
      <div className={'logo'}></div>
    </div>
  );
};

Header.defaultProps = {
};

Header.propTypes = {
};


export default Header;
