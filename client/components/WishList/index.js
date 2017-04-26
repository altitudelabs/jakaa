import './style.scss';
import React, { Component } from 'react';
import classNames from 'classnames';
import { whyDidYouUpdateWrapper } from '../../utils/why-did-you-update';
import {
  List as ProductList,
} from '../Product';

class WishList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className={classNames('wish-list')}>
        <h1>Wish List</h1>
        <ProductList />
      </div>
    );
  }
}

WishList.defaultProps = {
};

WishList.propTypes = {
};

export default whyDidYouUpdateWrapper(WishList);
