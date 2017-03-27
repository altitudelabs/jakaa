import './style.scss';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { getUserById } from '../../service/userService';
import Button from '../ThemedElements/Button';
import Star from '../ThemedElements/Icons/star';
import Checked from '../ThemedElements/Icons/checked';
import NotAllowed from '../ThemedElements/Icons/not-allowed';

class UserDetail extends Component {
  componentWillMount() {
    const { id } = this.props.params;
    getUserById(id);
  }

  renderBanned() {
    const { banned } = this.props.detail || {};
    let button = (
      <Button>
        Baned user
      </Button>
    );

    if (banned) {
      button = (
        <Button
          disabled
          disabledClass="disabled"
        >
          <NotAllowed className="icon" /> Baned user
        </Button>
      );
    }

    return <div>{button}</div>;
  }

  renderReview() {
    const { reviewAvg = 0, reviewCount = 0 } = this.props.detail || {};

    return (
      <div className="review">
        {
          [...new Array(5).keys()].map(index => {
            const star = { key: index };
            if (reviewAvg > index) star.fill = true;
            return <Star {...star} />;
          })
        }
        <span>
          - {reviewCount} Review{reviewCount > 1 && 's'}
        </span>
      </div>
    );
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
    const { image, firstName, lastName, email, phone, isApproved } = detail || {};
    const fullName = [firstName, lastName].join(' ');

    return (
      <div className={classNames('row header')}>
        <div className={classNames('image')}>
          <img src={image} alt={fullName} title={fullName} />
        </div>
        <div className={classNames('detail')}>
          <div className={classNames('info')}>
            <div className={classNames('title')}>
              {fullName}
              {!isApproved && <span>ID Unapproved</span>}
              {isApproved && <span><Checked /> ID Approved</span>}
            </div>
            <div className={classNames('caption-group')}>
              <div className={classNames('caption')}>
                Email: {email}
              </div>
              <div className={classNames('caption')}>
                Phone: {phone}
              </div>
            </div>
            {this.renderReview()}
          </div>
          {this.renderBanned()}
        </div>
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
        {this.renderHeader()}
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
