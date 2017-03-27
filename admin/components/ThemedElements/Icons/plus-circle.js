import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class PlusCircle extends Component {
  get getClass() {
    const { className } = this.props;
    return classNames(className);
  }

  get getStyle() {
    const { style, styles } = this.props;
    const { icon } = styles || {};
    return { ...icon, ...style };
  }

  render() {
    return (
      <svg
        style={this.getStyle}
        className={this.getClass}
        viewBox="395.491 357.734 18 18.514"
      >
        <g transform="translate(395.491 357.734)">
          <path id="path" d="M19.1,15.166a.457.457,0,0,1-.45.463H15.5v3.24a.45.45,0,1,1-.9,0v-3.24H11.45a.463.463,0,0,1,0-.926H14.6v-3.24a.45.45,0,1,1,.9,0V14.7h3.15A.457.457,0,0,1,19.1,15.166Z" transform="translate(-6.05 -5.909)" />
          <path id="path-2" data-name="path" d="M9,18.514A9.158,9.158,0,0,1,0,9.257,9.158,9.158,0,0,1,9,0a8.981,8.981,0,0,1,5.535,1.944.508.508,0,0,1,.09.648.475.475,0,0,1-.63.093A7.946,7.946,0,0,0,9,.926,8.242,8.242,0,0,0,.9,9.257,8.242,8.242,0,0,0,9,17.589a8.242,8.242,0,0,0,8.1-8.331A8.837,8.837,0,0,0,15.975,5a.507.507,0,0,1,.135-.648.476.476,0,0,1,.63.139A9.916,9.916,0,0,1,18,9.257,9.158,9.158,0,0,1,9,18.514Z" transform="translate(0 0)" />
        </g>
      </svg>
    );
  }
}

PlusCircle.propTypes = {
  style: PropTypes.object,
  styles: PropTypes.object,
  className: PropTypes.string,
};

export default PlusCircle;
