import './style.scss';

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class Button extends Component {
  get getClass() {
    const { className, disabled } = this.props;
    return classNames(`button ${disabled && 'disabled'} ${className}`);
  }

  get getStyle() {
    const { style, styles } = this.props;
    const { button } = styles || {};
    return { ...button, ...style };
  }

  render() {
    const { disabled, type, text, children, icon } = this.props;
    const btnProps = { disabled, type };

    if (!this.props.disabled) {
      btnProps.onLoad = this.props.onLoad;
      btnProps.onClick = this.props.onClick;
      btnProps.onChange = this.props.onChange;
      btnProps.onKeyDown = this.props.onKeyDown;
      btnProps.onMouseOut = this.props.onMouseOut;
      btnProps.onMouseOver = this.props.onMouseOver;
    }

    return (
      <button
        {...btnProps}
        style={this.getStyle}
        className={this.getClass}
      >
        {icon}
        {text || children}
      </button>
    );
  }
}

Button.defaultProps = {
};

Button.propTypes = {
  type: PropTypes.bool,
  text: PropTypes.string,
  icon: PropTypes.element,
  style: PropTypes.object,
  styles: PropTypes.object,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onLoad: PropTypes.func,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  onMouseOut: PropTypes.func,
  onMouseOver: PropTypes.func,
  backgroundColor: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.string,
    PropTypes.element,
  ]),
};


export default Button;
