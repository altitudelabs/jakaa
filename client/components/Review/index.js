import './style.scss';
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import className from 'classnames';
import { whyDidYouUpdateWrapper } from '../../utils/why-did-you-update';
import Touchable from '../../composeComponents/Ripple/Touch';

import List from './List';
import action from './action';
import reducer from './reducer';

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }
  render() {
    const {
      open,
    } = this.props;

    return (
      <div className={className('left-menu', { open })}>
        <Touchable />
      </div>
    );
  }
}

// const Review = (props) => {
//   const {
//     open,
//   } = props;
//
//   return (
//     <div className={className('left-menu', { open })}>
//       <Touchable />
//     </div>
//   );
// }

Review.defaultProps = {
};

Review.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  open: PropTypes.bool,
};

const mapStateToProps = (state) => {
  const ReviewState = state.LeftMenu.toJS();
  return {
    open: ReviewState.open,
  };
};

const connectedReview = connect(
  mapStateToProps
)(Review);

export default whyDidYouUpdateWrapper(connectedReview);

export {
  reducer,
  action,
  List,
};
