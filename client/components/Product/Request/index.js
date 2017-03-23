import './style.scss';
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import action from './action';
import reducer from './reducer';

import className from 'classnames';

import { whyDidYouUpdateWrapper } from '../../../utils/why-did-you-update';
import Touchable from '../../../composeComponents/Ripple/Touch';
import Divider from '../../../composeComponents/Divider';

class Request extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // show: false,
    };
  }
  render() {
    const {
      onSubmit,
    } = this.props;

    return (
      <div className={className('product-request')}>
        <h1 className={'title'}>{'Request an item'}</h1>
        <div className={'price'}>
          <span className={'dollar'}>{'HK$ 100'}</span>
          <span className={'time'}>{'/ day'}</span>
        </div>
        <Divider verticalMargin={0} />
        <section className={'form'}>
          <h2 className={'rental'}>
            Rental
          </h2>
          <h2 className={'rental'}>
            Pick up
          </h2>
          <h2 className={'rental'}>
            Return
          </h2>
        </section>
        <section className={'fee'}>
          <div className={'section rental'}>
            <span className={'desc'}>HK$ x 4 days</span>
            <span className={'price'}>HK$ 400</span>
          </div>
          <Divider verticalMargin={10} />
          <div className={'section pickup'}>
            <span className={'desc'}>Pick up fee</span>
            <span className={'price'}></span>
          </div>
          <div className={'section return'}>
            <span className={'desc'}>Return fee</span>
            <span className={'price'}></span>
          </div>
          <Divider verticalMargin={15} />
          <div className={'section total'}>
            <span className={'desc'}>Total</span>
            <span className={'price'}></span>
          </div>
          <div className={'section deposit'}>
            <span className={'desc'}>Deposit</span>
            <span className={'price'}></span>
          </div>
        </section>
        <div
          className={'submit'}
        >
          <div
            className={'button'}
            onClick={onSubmit}
          >
            <Touchable />
            {'Request'}
          </div>
        </div>
        <div className={'info'}>
          <span>
            Total Payment won’t be charged yet. Deposit won’t be charged unless there is damage.
          </span>
        </div>
      </div>
    );
  }
}

Request.defaultProps = {
  onSubmit: () => {},
};

Request.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  onSubmit: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
  };
};

const connectedRequest = connect(
  mapStateToProps
)(Request);

export default whyDidYouUpdateWrapper(connectedRequest);

export {
  reducer,
  action,
};
