import './style.scss';

import React, { PropTypes } from 'react';
import Grid from '../../../composeComponents/Grid';
import ListItem from './Item';
const ProductList = (props) => {
  const {
    products,
    ...others,
  } = props;
  return (
    <div className={'product-list'}>
      <Grid
        {...others}
        itemData={products}
        itemRenderer={(data) => {
          return (
            <ListItem product={data} />
          );
        }}
      />
    </div>
  );
};

ProductList.defaultProps = {
  products: ['high', 'sports', 'bag'],
  verticalGutter: 30,
  horizontalGutter: 10,
  maxItemWidth: 469,
};

ProductList.propTypes = {
  products: PropTypes.array,
};

export default ProductList;
