import './style.scss';
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import className from 'classnames';
import { whyDidYouUpdateWrapper } from '../../../utils/why-did-you-update';
import action from './action';
import reducer from './reducer';
import Divider from '../../../composeComponents/Divider';

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }
  render() {
    const {
      open,
      params,
    } = this.props;

    return (
      <div className={'product-detail'}>
        <div className={'slider'}>
        </div>
        <section className={'owner-info'}>
          <div className={'profile-pic'}>
            <img
              alt={'owner'}
              src={require('../../../asset/image/sample-profile@2x.png')}
            />
          </div>
          <div className={'description'}>
            <div className={'price'}>
              <span className={'amount'}>HK$ 100</span>
              <span className={'time'}>/ day</span>
            </div>
            <div className={'name'}>
              <span>Nike - Skatboards Duo B&W</span>
            </div>
            <div className={'reviews'}>
              <div className={'stars'}>stars</div>
              <span className={'count'}>- 34 reviews</span>
            </div>
          </div>
        </section>
        <div className={'actions'}>
          <div className={'message button'}>message</div>
          <div className={'divider'} />
          <div className={'wish-list button'}>wish list</div>
        </div>
        <section className={'info'}>
          <section className={'owner-rules '}>
            <h2>Owner Rules</h2>
            <section className={'availibility'}>
              <h3>Availibility:</h3>
              <ul className={'raw'}>
                <li>1 day minimum (1 more day for delivery)</li>
                <li>1 month maximum</li>
              </ul>
            </section>
            <section className={'calcellation'}>
              <h3>Cancellation</h3>
              <ul className={'raw'}>
                <li>72h notice to cancel</li>
                <li>70% refund on total price</li>
              </ul>
            </section>
            <section className={'security-deposit'}>
              <h3>Security deposit</h3>
              <ul className={'raw'}>
                <li>HK$ 800</li>
                <li>Charge only if damage</li>
              </ul>
            </section>
            <section className={'prices'}>
              <h3>prices</h3>
              <ul className={'raw'}>
                <li>10% of weekly discount</li>
              </ul>
            </section>
          </section>
          <Divider verticalMargin={30} />
          <section className={'item-specs'}>
            <h2>Item Specs</h2>
            <ul className={'raw'}>
              <li>Brand: Turnerbike</li>
              <li>Model: RFX v4.0</li>
              <li>Condition: Like new</li>
              <li>Purchased: 2016</li>
            </ul>
          </section>
          <Divider verticalMargin={30} />
          <section className={'description'}>
            <h2>Description</h2>
            <span>
              I bought my bike for a road trip in Nulla. Pretty much new bibendum nulla sed consectetur. Donec id elit non mi porta gravida at eget vitae elit libero, a pharetra augue.
Donec id elit non mi porta gravida at eget metus. Feel free to message me if you have any questions. :)
            </span>
          </section>
        </section>
        <Divider verticalMargin={5} />
        <section className={'reviews'}>
          <div className={'header'}>
            <h2 className={'title'}>45 Reviews</h2>
            <div className={'stars'}>stars</div>
          </div>
          <Divider verticalMargin={20} />
          <ul>
            {_.times(5).map((i) => (
              <li key={i}>
                <div className={'comment'}>
                  <div className={'profile-photo'}>
                    <img
                      alt={'reviewer'}
                      src={require('../../../asset/image/sample-profile@2x.png')}
                    />
                  </div>
                  <div className={'content'}>
                    <span className={'name'}>Ivan</span>
                    <span className={'comment'}>I bought my bike for a road trip in Nulla. Pretty much new bibendum nulla sed consectetur. Donec id elit non mi porta gravida. :)</span>
                    <span className={'date'}>Feb 2017</span>
                  </div>
                </div>
                <Divider verticalMargin={20} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    );
  }
}

Detail.defaultProps = {
};

Detail.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  open: PropTypes.bool,
  params: PropTypes.object,
};

const mapStateToProps = (state) => {
  const DetailState = state.LeftMenu.toJS();
  return {
    open: DetailState.open,
  };
};

const connectedDetail = connect(
  mapStateToProps
)(Detail);

export default whyDidYouUpdateWrapper(connectedDetail);

export {
  reducer,
  action,
};
