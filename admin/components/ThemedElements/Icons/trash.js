import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class Trash extends Component {
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
        viewBox="397 357.257 14 18.514"
      >
        <g transform="translate(397 357.257)">
          <path id="path" d="M14,2.222H10.316V1.481A1.482,1.482,0,0,0,8.842,0H5.158A1.482,1.482,0,0,0,3.684,1.481v.741H0v.741H.737l.737,14.071a1.482,1.482,0,0,0,1.474,1.481h8.105a1.482,1.482,0,0,0,1.474-1.481l.737-14.071H14ZM4.421,1.481A.7.7,0,0,1,5.158.741H8.842a.7.7,0,0,1,.737.741v.741H4.421Zm7.368,15.478h0a.76.76,0,0,1-.737.815H2.947a.7.7,0,0,1-.737-.741h0L1.474,2.962H12.526Z" />
          <rect id="rectangle" width="0.737" height="11.849" transform="translate(6.632 4.443)" />
          <path id="rectangle-2" data-name="rectangle" d="M0,0H.737l0,11.849H0Z" transform="translate(3.676 4.48) rotate(-3.667)" />
          <path id="rectangle-3" data-name="rectangle" d="M0,0,11.849,0V.733L0,.737Z" transform="translate(8.845 16.261) rotate(-86.417)" />
        </g>
      </svg>
    );
  }
}

Trash.propTypes = {
  style: PropTypes.object,
  styles: PropTypes.object,
  className: PropTypes.string,
};


export default Trash;
