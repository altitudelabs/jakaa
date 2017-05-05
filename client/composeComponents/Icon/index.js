import './style.scss';
import React, { PropTypes } from 'react';

const Icon = ({ icon }) => {
  // eslint-disable-next-line global-require
  const svg = icon ? require(`raw-loader!./icons/${icon}.svg`) : '';

  return (
    icon ? <div
      className={'icon'}
      dangerouslySetInnerHTML={{ __html: svg }}
    /> : <div />
  );
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
};

export default Icon;
