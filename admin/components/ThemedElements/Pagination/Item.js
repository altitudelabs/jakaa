import React, { PropTypes } from 'react';

const Item = ({ content, selected, itemClassName, activeClassName, onClick }) => {
  const cssClassName = [itemClassName];

  if (selected) cssClassName.push(activeClassName);

  return (
    <span
      tabIndex="0"
      onClick={onClick}
      onKeyPress={onClick}
      className={cssClassName.join(' ')}
    >
      {content}
    </span>
  );
};

Item.propTypes = {
  content: PropTypes.node,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  itemClassName: PropTypes.string,
  activeClassName: PropTypes.string,
  disabledClassName: PropTypes.string,
};

Item.defaultProps = {
  selected: false,
  itemClassName: 'item',
  disabledClassName: 'disabled',
};

export default Item;
