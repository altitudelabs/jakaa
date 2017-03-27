import React from 'react';
import className from 'classnames';
import {
  List as ProductList,
} from '../Product';

const Items = () => {
  return (
    <section className={className('items')}>
      <h2 className={'section-title'}>explore items</h2>
      <ProductList
        products={['high', 'sports', 'bag']}
        verticalGutter={30}
        horizontalGutter={10}
        maxItemWidth={469}
      />
    </section>
  );
};

Items.defaultProps = {
};

Items.propTypes = {
};

export default Items;
