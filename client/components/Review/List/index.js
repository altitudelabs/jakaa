import React, { PropTypes } from 'react';
// import className from 'classnames';
import { whyDidYouUpdateWrapper } from '../../../utils/why-did-you-update';
// import Touchable from '../../composeComponents/Ripple/Touch';
import Divider from '../../../composeComponents/Divider';
import ListItem from './Item';

const ReviewList = (props) => {
  const {
    reviews,
  } = props;

  return (
    <ul className={'review-list'}>
      {reviews.map((review, i) => (
        <li key={i}>
          <ListItem />
          <Divider verticalMargin={20} />
        </li>
      ))}
    </ul>
  );
};

ReviewList.defaultProps = {
  reviews: _.times(5),
};

ReviewList.propTypes = {
  reviews: PropTypes.array,
  open: PropTypes.bool,
};

export default whyDidYouUpdateWrapper(ReviewList);
