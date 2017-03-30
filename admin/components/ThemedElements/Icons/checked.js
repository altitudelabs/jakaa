import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class Checked extends Component {
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
        <circle data-name="Ellipse" fill="#52ca44" cx="8" cy="8" r="8" transform="translate(396 359)" />
        <path data-name="Path" fill="none" stroke="#fff" strokeWidth="1.5px" d="M6089.65-4109.586l2.357,2.277,4.7-4.852" transform="translate(-5689.183 4477.192)" />
      </svg>
    );
  }
}

Checked.propTypes = {
  style: PropTypes.object,
  styles: PropTypes.object,
  className: PropTypes.string,
};


export default Checked;
