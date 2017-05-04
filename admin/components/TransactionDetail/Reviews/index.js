import './style.scss';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class TransactionReviews extends Component {
  renderItem(review, key) {
    const { firstName, lastName, createdAt, content } = review || {};
    const fullName = [firstName, lastName].join(' ');

    return (
      <div className="row" key={key}>
        <div className="header">
          <div className="image">
            <img alt={fullName} title={fullName} />
          </div>
          <div className="info">
            <div className="title">{fullName}</div>
            <div className="time">{createdAt}</div>
          </div>
        </div>
        <div className="caption">
          {content}
        </div>
      </div>
    );
  }

  render() {
    const { reviews } = this.props;

    return (
      <div className={classNames('reviews-list')}>
        {reviews.map((review, index) => this.renderItem(review, index))}
      </div>
    );
  }
}

TransactionReviews.defaultProps = {
  reviews: [
    {
      firstName: 'Ivan',
      lastName: 'Chan',
      createdAt: '20 Feb',
      content: 'Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Donec sed odio dui. Donec id elit non mi porta gravida at eget metus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.',
    },
    {
      firstName: 'Ivan',
      lastName: 'Chan',
      createdAt: '20 Feb',
      content: 'Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Donec sed odio dui. Donec id elit non mi porta gravida at eget metus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.',
    },
  ],
};

TransactionReviews.propTypes = {
  reviews: PropTypes.array,
};

export default TransactionReviews;
