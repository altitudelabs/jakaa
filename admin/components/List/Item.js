import React, { PropTypes } from 'react';
import calssNames from 'classnames';
import _ from 'lodash';

const Item = (props) => {
  const itemClass = calssNames(
    'row',
    'item'
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
            {value}
          </div>
        );
      })}
    </div>
  );
};

Item.defaultProps = {
  item: {},
};

Item.propTypes = {
  item: PropTypes.object,
};


export default Item;
