import React from 'react';
import classNames from 'classnames';
import {
  List as ProductList,
} from '../Product';

const Items = () => {
  return (
    <section className={classNames('items')}>
      <h2 className={'section-title'}>explore items</h2>
      <ProductList
        products={[{ name: 'high' }, { name: 'sports' }, { name: 'bag' }]}
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
