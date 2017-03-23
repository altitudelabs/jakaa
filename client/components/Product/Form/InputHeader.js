import React, { PropTypes } from 'react';
import { whyDidYouUpdateWrapper } from '../../../utils/why-did-you-update';

const InputHeader = (props) => {
  const {
    required,
    children,
    className,
    label,
    ...others,
  } = props;

  return (
    <h3
      className={`input-header ${className}`}
      {...others}
    >
      {required ?
        <span className={'star'}>*</span>
      : null}
      {label}
      {children}
    </h3>
  );
};

InputHeader.defaultProps = {
  className: '',
  label: '',
};

InputHeader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  required: PropTypes.bool,
  className: PropTypes.string,
  label: PropTypes.string,
};

export default whyDidYouUpdateWrapper(InputHeader);
