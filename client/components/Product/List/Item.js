import React, { PropTypes } from 'react';
import { whyDidYouUpdateWrapper } from '../../../utils/why-did-you-update';
import Touchable from '../../../composeComponents/Ripple/Touch';
import { Link } from 'react-router';

const ProductListItem = (props) => {
  return (
    <Link
      to={'/product/example'}
      className={`product-list-item ${props.product}`}
    >
      <Touchable />
      <div className={'image'}></div>
      <div className={'desc'} />
    </Link>
  );
};

ProductListItem.defaultProps = {
  product: '',
};

ProductListItem.propTypes = {
  product: PropTypes.string,
};

export default whyDidYouUpdateWrapper(ProductListItem);
