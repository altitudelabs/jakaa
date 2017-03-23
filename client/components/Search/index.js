import './style.scss';
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { whyDidYouUpdateWrapper } from '../../utils/why-did-you-update';
import Touchable from '../../composeComponents/Ripple/Touch';
import Modal from '../../themedComponents/Modal';
import action from './action';
import reducer from './reducer';

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
        open={open}
        overlayClassName={'search-overlay'}
        contentLabel={'Example Modal'}
        onClose={action.close}
      >
        <div className={'search'}>
          <h1 className={'title'}>Search</h1>
          <div className={'input-container'}>
            <section className={'keyword input'}>Item, Brand and More</section>
            <section className={'date input'}>Start Date</section>
            <section className={'location input'}>Select a location</section>
            <section className={'price'}>price range</section>
          </div>
          <div className={'submit button'}>
            <Touchable />
            {'Search'}
          </div>
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
