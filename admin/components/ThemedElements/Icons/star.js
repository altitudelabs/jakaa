import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class NotAllowed extends Component {
  get getClass() {
    const { className } = this.props;
    return classNames(className);
  }

  get getStyle() {
    const { style = {}, styles, fill } = this.props;
    const { icon } = styles || {};
    if (!style.height) style.height = 16;
    if (!style.fill) {
      if (!fill) {
        style.fill = 'none';
        style.strokeWidth = 1;
        style.stroke = '#407bff';
      } else {
        style.fill = '#407bff';
      }
    }
    return { ...icon, ...style };
  }

  render() {
    return (
      <svg
        style={this.getStyle}
        className={this.getClass}
        viewBox="397 359.502 15.726 15.001"
      >
        <path data-name="Path" d="M.944.029,3.021,4.237a.456.456,0,0,0,.343.249l4.644.675a.455.455,0,0,1,.253.776L4.9,9.214a.455.455,0,0,0-.131.4l.794,4.626a.455.455,0,0,1-.66.48L.748,12.539a.453.453,0,0,0-.423,0L-3.83,14.722a.455.455,0,0,1-.66-.48L-3.7,9.616a.455.455,0,0,0-.131-.4L-7.189,5.937a.455.455,0,0,1,.253-.776l4.644-.675a.456.456,0,0,0,.343-.249L.128.029a.455.455,0,0,1,.816,0" transform="translate(404.327 359.727)" />
      </svg>
    );
  }
}

NotAllowed.propTypes = {
  fill: PropTypes.bool,
  style: PropTypes.object,
  styles: PropTypes.object,
  className: PropTypes.string,
};

export default NotAllowed;
