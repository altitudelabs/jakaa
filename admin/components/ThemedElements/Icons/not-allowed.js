import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class NotAllowed extends Component {
  get getClass() {
    const { className } = this.props;
    return classNames(className);
  }

  get getStyle() {
    const { style = {}, styles } = this.props;
    const { icon } = styles || {};
    if (!style.height) style.height = 20;

    return { ...icon, ...style };
  }

  render() {
    return (
      <svg
        style={this.getStyle}
        className={this.getClass}
        viewBox="395.491 357.734 18 18.514"
      >
        <g data-name="Ellipse 1" fill="none" stroke="#95989a" strokeWidth="2px" transform="translate(398 360.07)">
          <circle stroke="none" cx="6.93" cy="6.93" r="6.93" />
          <circle fill="none" cx="6.93" cy="6.93" r="5.93" />
        </g>
        <path data-name="Path 1" stroke="#95989a" strokeWidth="2px" d="M0,13.153V0" transform="translate(409.466 362.236) rotate(45)" />
      </svg>
    );
  }
}

NotAllowed.propTypes = {
  style: PropTypes.object,
  styles: PropTypes.object,
  className: PropTypes.string,
};

export default NotAllowed;
