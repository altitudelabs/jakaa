// import './style.scss';
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
// import className from 'classnames';
import { whyDidYouUpdateWrapper } from '../../../utils/why-did-you-update';
// import Touchable from '../../../composeComponents/Ripple/Touch';
import ProductForm from '../Form';

class ProductCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }
  render() {
    return (
      <ProductForm />
    );
  }
}

ProductCreate.defaultProps = {
};

ProductCreate.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

const mapStateToProps = () => {
  return {
  };
};

const connectedProductCreate = connect(
  mapStateToProps
)(ProductCreate);

export default whyDidYouUpdateWrapper(connectedProductCreate);
