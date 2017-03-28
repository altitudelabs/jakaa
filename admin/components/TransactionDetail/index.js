import './style.scss';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import {
  getTransactionById,
} from '../../service/transactionService';
import TransactionReviews from './Reviews';
import UserDetailHeader from '../UserDetail/Header';

class TransactionDetail extends Component {
  componentWillMount() {
    const { id } = this.props.params;
    getTransactionById(id);
  }

  get getPickup() {
    const timeSlot = (
      <div>
        <div>10/11/2017</div>
        <div>8 - 10 am</div>
      </div>
    );

    const from = (
      <div>
        <div>23A, Warrenwoods,</div>
        <div>23 Warren street, Tai Hang</div>
      </div>
    );

    const to = (
      <div>
        <div>18A, Evergreen Mansion,</div>
        <div>3 Electric road, Tin Hau.</div>
      </div>
    );

    return { timeSlot, from, to };
  }

  renderItem(title, caption, key) {
    return (
      <div key={key} className={classNames('info')}>
        {title && <div className={classNames('title')}>{title}</div>}
        {caption && <div className={classNames('caption')}>{caption}</div>}
      </div>
    );
  }

  renderHeader() {
    const { detail } = this.props;
    const { item, orderId, status, image, rentalCost, depositCost, rentalPeriod } = detail || {};

    return (
      <div className={classNames('row')}>
        <div className="subtitle">Transaction</div>
        <div className={classNames('header')}>
          <div className={classNames('image')}>
            <img src={image} alt={item} title={item} />
          </div>
          <div className={classNames('detail')}>
            <div className={classNames('info')}>
              <div className={classNames('title')}>
                {item}
              </div>
              <div className={classNames('caption-group')}>
                <div className={classNames('caption')}>
                  Order {orderId} <span>{status}</span>
                </div>
              </div>
              <div className={classNames('caption-group')}>
                {this.renderItem('Date of rent', rentalPeriod)}
                {this.renderItem('Rental', rentalCost)}
                {this.renderItem('Deposit', depositCost)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderPersonal(detail, subtitle, key) {
    if (!detail) return;
    return (
      <div key={key}>
        <div className="subtitle">{subtitle}</div>
        <UserDetailHeader detail={detail} showBan={false} />
      </div>
    );
  }

  renderPersonals() {
    const { borrower, owner } = this.props.detail || {};
    return (
      <div className="row personal">
        {this.renderPersonal(borrower, 'Borrower', 'borrower')}
        {this.renderPersonal(owner, 'Owner', 'owner')}
      </div>
    );
  }

  renderOrderDetail() {
    return (
      <div className="row order">
        <div className="subtitle"> Order </div>
        <div>
          {this.renderItem('Rental', 'HKD100  x 4 days')}
          {this.renderItem('Pickup', 'Fedex - HKD 120')}
          {this.renderItem('Return', 'Fedex - HKD 120')}
          {this.renderItem('Total', 'HKD 640')}
        </div>
      </div>
    );
  }

  renderDelivery() {
    const pickup = this.getPickup;

    return (
      <div className="row">
        <div className="subtitle"> Delivery </div>
        <div className="subtitle"> 1. Pickup </div>
        <div>
          {this.renderItem('Shipping method', 'Fedex')}
          {this.renderItem('Time slot', pickup.timeSlot)}
          {this.renderItem('From', pickup.from)}
          {this.renderItem('To', pickup.to)}
        </div>
        <div className="subtitle"> 2. Return </div>
        <div>
          {this.renderItem('Shipping method', 'Fedex')}
          {this.renderItem('Time slot', pickup.timeSlot)}
          {this.renderItem('From', pickup.from)}
          {this.renderItem('To', pickup.to)}
        </div>
      </div>
    );
  }

  renderReviews() {
    return (
      <div className="row">
        <div className="subtitle"> Reviews about this Item </div>
        <TransactionReviews />
      </div>
    );
  }

  render() {
    return (
      <div className={classNames('transaction-detail')}>
        {this.renderHeader()}
        {this.renderPersonals()}
        {this.renderOrderDetail()}
        {this.renderDelivery()}
        {this.renderReviews()}
      </div>
    );
  }
}

TransactionDetail.defaultProps = {
};

TransactionDetail.propTypes = {
  detail: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
};

const mapStatesToProps = (store) => {
  return { detail: store.transactionDetail };
};

export default connect(mapStatesToProps, null)(TransactionDetail);
