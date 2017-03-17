import React from 'react';
import calssNames from 'classnames';

const Menu = () => {
  const menuClass = calssNames(
    'menu'
  );
  const headerClass = calssNames(
    'header'
  );
  const optionClass = calssNames(
    'option'
  );
  return (
    <div
      className={menuClass}
    >
      <div className={headerClass}>{'Header'}</div>
      <div className={optionClass}>{'Option'}</div>
    </div>
  );
};

Menu.defaultProps = {
};

Menu.propTypes = {
};


export default Menu;
