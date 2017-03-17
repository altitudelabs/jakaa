import './style.scss';

import React, { PropTypes } from 'react';
import Item from './Item';
import Header from './Header';
import calssNames from 'classnames';

const List = (props) => {
  const listClass = calssNames(
    'admin-list' // TODO better prefix
  );

  return (
    <div className={listClass}>
      <Header item={props.items[0]} />
      {props.items.map((item, i) => {
        return <Item key={i} item={item} />;
      })}
    </div>
  );
};

List.defaultProps = {
  items: [],
};

List.propTypes = {
  items: PropTypes.array,
};


export default List;
