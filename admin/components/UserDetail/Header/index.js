import './style.scss';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Button from '../../ThemedElements/Button';
import Star from '../../ThemedElements/Icons/star';
import Checked from '../../ThemedElements/Icons/checked';
import NotAllowed from '../../ThemedElements/Icons/not-allowed';

class UserDetailHeader extends Component {
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

  render() {
    const { detail } = this.props;
    const { showBan } = this.props;
    const { image, firstName, lastName, email, phone, isApproved } = detail || {};
    const fullName = [firstName, lastName].join(' ');

    return (
      <div className={classNames('row user-header')}>
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
          {showBan && this.renderBanned()}
        </div>
      </div>
    );
  }
}

UserDetailHeader.defaultProps = {
  showBan: true,
};

UserDetailHeader.propTypes = {
  showBan: PropTypes.bool,
  detail: PropTypes.object.isRequired,
};

export default UserDetailHeader;
