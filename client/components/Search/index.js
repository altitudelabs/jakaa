import './style.scss';
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import className from 'classnames';
import { whyDidYouUpdateWrapper } from '../../utils/why-did-you-update';
import Touchable from '../../composeComponents/Ripple/Touch';
import action from './action';
import reducer from './reducer';
import Modal from 'react-modal';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }
  render() {
    const {
      open,
    } = this.props;

    return (
      <Modal
        isOpen={open}
        className={'search'}
        overlayClassName={'search-overlay'}
        contentLabel={'Example Modal'}
      >
        <div className={'container'}>
          <div className={'close-button'} onClick={action.close}>
            <div className={'image'} />
          </div>

          <h1 className={'title'}>Search</h1>

          <div className={'input-container'}>
            <section className={'keyword input'}>Item, Brand and More</section>
            <section className={'date input'}>Start Date</section>
            <section className={'location input'}>Select a location</section>
            <section className={'price'}>price range</section>
          </div>
          <div className={'submit'}>Search</div>
        </div>
      </Modal>
    );
  }
}

Search.defaultProps = {
};

Search.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  open: PropTypes.bool,
};

const mapStateToProps = (state) => {
  const SearchState = state.Search.toJS();
  return {
    open: SearchState.open,
  };
};

const connectedSearch = connect(
  mapStateToProps
)(Search);

export default whyDidYouUpdateWrapper(connectedSearch);

export {
  reducer,
  action,
};
