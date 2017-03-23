import './style.scss';
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { whyDidYouUpdateWrapper } from '../../../utils/why-did-you-update';
import Request from '../Request';
import TermsAndCondition from '../TOC';
import Modal from '../../../themedComponents/Modal';
import action from './action';

class RequestSection extends Component {
  constructor(props) {
    super(props);

    this.onRequestSubmit = this.onRequestSubmit.bind(this);
    this.onTOCSubmit = this.onTOCSubmit.bind(this);
    this.onTOCReject = this.onTOCReject.bind(this);
  }

  onRequestSubmit() {
    action.closeRequest();
    action.openTOC();
  }

  onTOCSubmit() {
    action.closeTOC();
  }

  onTOCReject() {
    action.closeTOC();
  }

  render() {
    const {
      requestOpen,
      TOCOpen,
    } = this.props;

    // NOTE need to remove modal for desktop version
    return (
      <div>
        <Modal
          open={requestOpen}
          overlayClassName={'request-overlay'}
          onClose={action.closeRequest}
          contentLabel={'product request'}
        >
          <Request onSubmit={this.onRequestSubmit} />
        </Modal>
        <Modal
          open={TOCOpen}
          overlayClassName={'toc-overlay'}
          onClose={action.closeRequest}
          contentLabel={'terms and conditions'}
          showClose={false}
        >
          <TermsAndCondition
            onSubmit={this.onTOCSubmit}
            onReject={this.onTOCReject}
          />
        </Modal>
      </div>
    );
  }
}

RequestSection.defaultProps = {
};

RequestSection.propTypes = {
  requestOpen: PropTypes.bool,
  TOCOpen: PropTypes.bool,
};

const mapStateToProps = (state) => {
  const DetailState = state.ProductDetail.toJS();
  return {
    requestOpen: DetailState.requestOpen,
    TOCOpen: DetailState.TOCOpen,
  };
};

const connectedRequestSection = connect(
  mapStateToProps
)(RequestSection);

export default whyDidYouUpdateWrapper(connectedRequestSection);
