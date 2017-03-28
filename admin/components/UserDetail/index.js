import './style.scss';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { getUserById } from '../../service/userService';
import Checked from '../ThemedElements/Icons/checked';
import Header from './Header';

class UserDetail extends Component {
  componentWillMount() {
    const { id } = this.props.params;
    getUserById(id);
  }

  renderItem(title, caption, key) {
    return (
      <div key={key} className={classNames('info')}>
        {title && <div className={classNames('title')}>{title}</div>}
        {caption && <div className={classNames('caption')}>{caption}</div>}
      </div>
    );
  }

  renderPersonalDetail() {
    const { birthDate, language, email, phone } = this.props.detail || {};

    return (
      <div className="row">
        <div className="subtitle"> 1. Personal Detail </div>
        <div>
          {this.renderItem('Birth date', birthDate)}
          {this.renderItem('Language', language)}
          {this.renderItem('Email', email)}
          {this.renderItem('Phone number', phone)}
        </div>
      </div>
    );
  }

  renderVerification() {
    const { isVerfied, image } = this.props.detail || {};
    let textVefied = <span>Verfied: None</span>;
    let imgVeried;
    if (!isVerfied) {
      textVefied = <span>Verfied <Checked /></span>;
      imgVeried = <img src={image} role="presentation" />;
    }

    return (
      <div className="row verification">
        <div className="subtitle"> 2. Verification </div>
        <div>
          {this.renderItem('Government ID/ Passport', textVefied)}
        </div>
        <div className="image">
          {imgVeried}
        </div>
      </div>
    );
  }

  renderAccountSetting() {
    const { detail = {} } = this.props;
    const { language, shippingAddress } = detail;

    return (
      <div className="row">
        <div className="subtitle"> 3. Account Setting </div>
        <div>
          {this.renderItem('Language', language)}
        </div>
        <div>
          {[...(shippingAddress || [])].map((item, index) => {
            const { address, streetAddress, addressCity, addressCountry } = item;
            const caption = (
              <div>
                <div key="address">{address}</div>
                <div key="streetAddress">{streetAddress},</div>
                <div key="addressCity">{addressCity}, {addressCountry}</div>
              </div>
            );
            return this.renderItem(`Shipping address ${index + 1}`, caption, index);
          })}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className={classNames('user-detail')}>
        <Header detail={this.props.detail} />
        {this.renderPersonalDetail()}
        {this.renderVerification()}
        {this.renderAccountSetting()}
      </div>
    );
  }
}

UserDetail.defaultProps = {
};

UserDetail.propTypes = {
  detail: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
};

const mapStatesToProps = (store) => {
  return { detail: store.userDetail };
};

export default connect(mapStatesToProps, null)(UserDetail);
