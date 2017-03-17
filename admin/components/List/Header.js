import React, { PropTypes } from 'react';
import calssNames from 'classnames';
import _ from 'lodash';

const Header = (props) => {
  const itemClass = calssNames(
    'row',
    'header'
  );
  const fieldClass = calssNames(
    'column'
  );
  return (
    <div
      className={itemClass}
    >
      {_.map(props.item, (value, key) => {
        return (
          <div
            key={key}
            className={fieldClass}
          >
            {key}
          </div>
        );
      })}
    </div>
  );
};

Header.defaultProps = {
  item: {},
};

Header.propTypes = {
  item: PropTypes.object,
};


export default Header;
