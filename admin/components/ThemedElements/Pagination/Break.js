import React, { PropTypes } from 'react';

const Break = ({ breakLabel, breakClassName }) => {
  const className = breakClassName || 'break';

  return (
    <div className={className}>
      {breakLabel}
    </div>
  );
};

Break.propTypes = {
  breakLabel: PropTypes.node,
  breakClassName: PropTypes.string,
};

Break.defaultProps = {
  breakLabe: '...',
};

export default Break;
