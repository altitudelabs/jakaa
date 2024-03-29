import './style.scss';
import React, { PropTypes, Component } from 'react';
import { whyDidYouUpdateWrapper } from '../../utils/why-did-you-update';
import Modal from 'react-modal';
import Touchable from '../../composeComponents/Ripple/Touch';
class ThemedModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }
  render() {
    const {
      open,
      onClose,
      children,
      showClose,
      ...others,
    } = this.props;

    return (
      <Modal
        className={'modal'}
        isOpen={open}
        {...others}
      >
        {showClose ?
          <div className={'close-button'} onClick={onClose}>
            <Touchable />
            <div className={'image'} />
          </div>
        : null}
        {children}
      </Modal>
    );
  }
}

ThemedModal.defaultProps = {
  open: false,
  showClose: true,
  onClose: () => {},
};

ThemedModal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  open: PropTypes.bool,
  showClose: PropTypes.bool,
  onClose: PropTypes.func,
};

export default whyDidYouUpdateWrapper(ThemedModal);
