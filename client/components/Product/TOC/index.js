import './style.scss';
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import className from 'classnames';

import { whyDidYouUpdateWrapper } from '../../../utils/why-did-you-update';
import Touchable from '../../../composeComponents/Ripple/Touch';
import Divider from '../../../composeComponents/Divider';

class TOC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // show: false,
    };
  }
  render() {
    const {
      onSubmit,
      onReject,
    } = this.props;

    return (
      <div className={className('product-TOC')}>
        <h1 className={'title'}>{'Before renting'}</h1>
        <div className={'instruction'}>
          <span>
            {'Please read and agree the owner policy about this item:'}
          </span>
        </div>
        <div className={'policy'}>
          <div className={'clause'}>
            <span>
              {'1 — Security deposit: $800HKD\nBy requesting to rent this item from the owner, you authorise the pending or holding debit card charge to be made on your credit card and accept that such pending or held amount shallbe automatically deducted ifthe item is damagedin any way.'}
            </span>
          </div>
          <div className={'clause'}>
            <span>
              {'2 — Cancellation policy:\nPleasebe aware that that the owner will onlyrefund 70% of the total rental price (excluding the delivery fee and any deposit amount) should you cancel the transaction.'}
            </span>
          </div>
        </div>
        <Divider
          verticalMargin={0}
          horizontalMargin={-25}
        />
        <div className={'buttons'}>
          <div className={'button-container'}>
            <div
              className={'disagree button'}
              onClick={onSubmit}
            >
              <Touchable />
              {'Disagree'}
            </div>
          </div>
          <div className={'button-container'}>
            <div
              className={'agree button'}
              onClick={onReject}
            >
              <Touchable />
              {'Agree'}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TOC.defaultProps = {
  onSubmit: () => {},
  onReject: () => {},
};

TOC.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  onSubmit: PropTypes.func,
  onReject: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
  };
};

const connectedTOC = connect(
  mapStateToProps
)(TOC);

export default whyDidYouUpdateWrapper(connectedTOC);
