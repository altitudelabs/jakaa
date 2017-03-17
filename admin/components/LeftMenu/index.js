import './style.scss';

import React from 'react';
import calssNames from 'classnames';
import Header from './Header';
import Menu from './Menu';

const LeftMenu = () => {
  const listClass = calssNames(
    'left-menu' // TODO better prefix
  );

  return (
    <div className={listClass}>
      <Header />
      <Menu />
      <Menu />
    </div>
  );
};

LeftMenu.defaultProps = {
};

LeftMenu.propTypes = {
};


export default LeftMenu;
