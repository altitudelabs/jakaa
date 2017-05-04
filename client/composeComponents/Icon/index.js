import './style.scss';
import React from 'react';

const Icon = ({ icon }) => {
  const svg = require(`raw-loader!./icons/${icon}.svg`);

  return <div className={'icon'} dangerouslySetInnerHTML={{ __html: svg }} />;
}

export default Icon;