import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class SearchRight extends Component {
  get getClass() {
    const { className } = this.props;
    return classNames(className);
  }

  get getStyle() {
    const { style, styles } = this.props;
    const { icon } = styles || {};
    if (!style.height) style.height = 17;
    if (!style.fill) style.fill = '#7b7e81';

    return { ...icon, ...style };
  }

  render() {
    return (
      <svg
        style={this.getStyle}
        className={this.getClass}
        viewBox="396.035 358 16.282 17"
      >
        <g transform="translate(-175 237)">
          <path stroke="#95989a" fill="none" d="M-305.965,1654.569h16.282" transform="translate(877 -1531)" />
          <path stroke="#95989a" fill="none" d="M-305.965,1654.569h16.282" transform="translate(877 -1525)" />
          <path stroke="#95989a" fill="none" d="M-305.965,1654.569h16.282" transform="translate(877 -1519)" />
          <g fill="#FFF" stroke="#95989a" transform="translate(573 121)">
            <circle stroke="none" cx="2.5" cy="2.5" r="2.5" />
            <circle fill="none" cx="2.5" cy="2.5" r="2" />
          </g>
          <g fill="#FFF" stroke="#95989a" transform="translate(573 133)">
            <circle stroke="none" cx="2.5" cy="2.5" r="2.5" />
            <circle fill="none" cx="2.5" cy="2.5" r="2" />
          </g>
          <g fill="#FFF" stroke="#95989a" transform="translate(580 127)">
            <circle stroke="none" cx="2.5" cy="2.5" r="2.5" />
            <circle fill="none" cx="2.5" cy="2.5" r="2" />
          </g>
        </g>
      </svg>
    );
  }
}

SearchRight.defaultProps = {
  style: {},
};

SearchRight.propTypes = {
  style: PropTypes.object,
  styles: PropTypes.object,
  className: PropTypes.string,
};

export default SearchRight;
