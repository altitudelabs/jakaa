import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import shallowEqual from 'recompose/shallowEqual';
import { set } from '../../utils/autoPrefix';
import transitions from '../../utils/transitions';

class CircleRipple extends Component {
  shouldComponentUpdate(nextProps) {
    return !shallowEqual(this.props, nextProps);
  }
  componentWillUnmount() {
    clearTimeout(this.enterTimer);
    clearTimeout(this.leaveTimer);
  }

  componentWillAppear(callback) {
    this.initializeAnimation(callback);
  }
  componentWillEnter(callback) {
    this.initializeAnimation(callback);
  }

  componentDidAppear() {
    this.animate();
  }

  componentDidEnter() {
    this.animate();
  }

  componentWillLeave(callback) {
    const style = ReactDOM.findDOMNode(this).style;
    style.opacity = 0;
    // If the animation is aborted, remove from the DOM immediately
    const removeAfter = this.props.aborted ? 0 : 2000;
    this.enterTimer = setTimeout(callback, removeAfter);
  }

  animate() {
    const style = ReactDOM.findDOMNode(this).style;
    const transitionValue = `${transitions.easeOut('2s', 'opacity')}, ${
      transitions.easeOut('1s', 'transform')}`;
    set(style, 'transition', transitionValue);
    set(style, 'transform', 'scale(1)');
  }

  initializeAnimation(callback) {
    const style = ReactDOM.findDOMNode(this).style;
    style.opacity = this.props.opacity;
    set(style, 'transform', 'scale(0)');
    this.leaveTimer = setTimeout(callback, 0);
  }

  render() {
    const {
      aborted, // eslint-disable-line no-unused-vars
      color,
      opacity, // eslint-disable-line no-unused-vars
      style,
      touchGenerated, // eslint-disable-line no-unused-vars
      ...other,
    } = this.props;

    const mergedStyles = Object.assign({
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      borderRadius: '50%',
      backgroundColor: color,
    }, style);

    return (
      <div {...other} style={mergedStyles} />
    );
  }
}

CircleRipple.propTypes = {
  aborted: PropTypes.bool,
  color: PropTypes.string,
  opacity: PropTypes.number,
  style: PropTypes.object,
  touchGenerated: PropTypes.bool,
};

CircleRipple.defaultProps = {
  opacity: 0.1,
  aborted: false,
};

export default CircleRipple;
