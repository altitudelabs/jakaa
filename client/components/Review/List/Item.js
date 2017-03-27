import React, { PropTypes } from 'react';
// import className from 'classnames';
import { whyDidYouUpdateWrapper } from '../../../utils/why-did-you-update';
// import Touchable from '../../../composeComponents/Ripple/Touch';

const ReviewListItem = () => {
  return (
    <div className={'review-list-item'}>
      <div className={'profile-photo'}>
        <img
          alt={'reviewer'}
          src={
            require('../../../asset/image/sample-profile@2x.png') // eslint-disable-line global-require
          }
        />
      </div>
      <div className={'content'}>
        <span className={'name'}>Ivan</span>
        <span className={'comment'}>
          I bought my bike for a road trip in Nulla. Pretty much new bibendum nulla sed consectetur. Donec id elit non mi porta gravida. :)
        </span>
        <span className={'date'}>Feb 2017</span>
      </div>
    </div>
  );
};

ReviewListItem.defaultProps = {
  review: {},
};

ReviewListItem.propTypes = {
  review: PropTypes.object,
};

export default whyDidYouUpdateWrapper(ReviewListItem);
