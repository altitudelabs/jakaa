import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class Search extends Component {
  get getClass() {
    const { className } = this.props;
    return classNames(className);
  }

  get getStyle() {
    const { style, styles } = this.props;
    const { icon } = styles || {};
    if (!style.height) style.height = 16;
    if (!style.fill) style.fill = '#7b7e81';
    return { ...icon, ...style };
  }

  render() {
    return (
      <svg
        style={this.getStyle}
        className={this.getClass}
        viewBox="396 359 16 16"
      >
        <path d="M16,15.186l-4.61-4.61a6.308,6.308,0,0,0,1.492-4.136A6.482,6.482,0,0,0,6.441,0,6.482,6.482,0,0,0,0,6.441,6.451,6.451,0,0,0,10.576,11.39L15.186,16ZM.678,6.441A5.763,5.763,0,1,1,6.441,12.2,5.758,5.758,0,0,1,.678,6.441Z" transform="translate(396 359)" />
      </svg>
    );
  }
}

Search.defaultProps = {
  style: {},
};

Search.propTypes = {
  style: PropTypes.object,
  styles: PropTypes.object,
  className: PropTypes.string,
};


export default Search;
