import React, { PropTypes } from 'react';

const ConstantsProvider = (props) => {
  const childrenWithProps = React.Children.map(
    props.children,
    (child) => {
      if (typeof child.type === 'string') {
        return child;
      }

      return React.cloneElement(child);
    }
  );

  return <div>{childrenWithProps}</div>;
};

ConstantsProvider.propTypes = {
  children: PropTypes.node,
};

export default ConstantsProvider;
