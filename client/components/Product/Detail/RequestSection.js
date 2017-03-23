import './style.scss';
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { whyDidYouUpdateWrapper } from '../../../utils/why-did-you-update';
import Request from '../Request';
import Modal from '../../../themedComponents/Modal';
import action from './action';

class RequestSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  render() {
    const {
      open,
    } = this.props;

    // NOTE need to remove modal for desktop version
    return (
      <Modal
        open={open}
        overlayClassName={'request-overlay'}
        onClose={action.closeRequest}
        contentLabel={'product request'}
      >
        <Request />
      </Modal>
    );
  }
}

RequestSection.defaultProps = {
};

RequestSection.propTypes = {
  open: PropTypes.bool,
};

const mapStateToProps = (state) => {
  const DetailState = state.ProductDetail.toJS();
  return {
    open: DetailState.requestOpen,
  };
};

const connectedRequestSection = connect(
  mapStateToProps
)(RequestSection);

export default whyDidYouUpdateWrapper(connectedRequestSection);
