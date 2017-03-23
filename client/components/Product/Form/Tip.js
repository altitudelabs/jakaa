import React, { PropTypes } from 'react';
import { whyDidYouUpdateWrapper } from '../../../utils/why-did-you-update';
import _ from 'lodash';

const Tip = (props) => {
  const {
    className,
    tip,
    ...others,
  } = props;
  const isList = _.isArray(tip) && tip.length > 1;
  const title = isList ? 'tips' : 'tip';
  return (
    <div className={`tip-container ${className}`} {...others}>
      <span className={'title'}>
        {`${title}: `}
      </span>
      {isList ?
        <ul className={'tip-list'}>
          {tip.map((c, i) => {
            return (
              <li key={i}>
                <span className={'tip'}>
                  {c}
                </span>
              </li>
            );
          })}
        </ul>
      :
        <span className={'tip'}>{tip}</span>
      }
    </div>
  );
};

Tip.defaultProps = {
  className: '',
};

Tip.propTypes = {
  tip: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]),
  className: PropTypes.string,
};

export default whyDidYouUpdateWrapper(Tip);
