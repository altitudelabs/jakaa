import './style.scss';
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import { whyDidYouUpdateWrapper } from '../../../utils/why-did-you-update';
import Touchable from '../../../composeComponents/Ripple/Touch';
import InputHeader from './InputHeader';
import Divider from '../../../composeComponents/Divider';
import PhotoUpload from '../../../themedComponents/PhotoUpload';
import Grid from '../../../composeComponents/Grid';
import Tip from './Tip';

import action from './action';
import reducer from './reducer';


class ProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      photos: [],
    };
  }
  render() {
    const {
      open,
    } = this.props;

    const {
      photos,
    } = this.state;

    return (
      <div className={'product-form'}>
        <section className={'item-detail'}>
          <h2>{'1. Item Details'}</h2>
          <InputHeader required>
            Item Title
          </InputHeader>
          <span>Nikon D500 --</span>

          <InputHeader required>
            Item Specs
          </InputHeader>
          <div>Brand</div>
          <div>Model</div>
          <div>Condition</div>
          <div>Purchage date</div>

          <div className={'description-header'}>
            <InputHeader required>
              Description
            </InputHeader>
            <span className={'count'}>200/200</span>
          </div>
        </section>
        <Divider />
        <section className={'item-pictures'}>
          <h2>{'2. Item Pictures'}</h2>
          <InputHeader required>
            Photos
          </InputHeader>
          <div className={'pictures'}>
            <Grid
              itemData={['new', ...photos]}
              verticalGutter={30}
              horizontalGutter={10}
              maxItemWidth={200}
              getItemHeight={(width) => width}
              itemRenderer={(data) => {
                if (data === 'new') {
                  return (
                    <PhotoUpload
                      onUploadComplete={(newPhotos) => {
                        this.setState({
                          photos: [...newPhotos, ...photos],
                        });
                      }}
                    />
                  );
                }
                return (
                  <div
                    className={'bg cover'}
                    style={{
                      backgroundImage: `url(${data})`,
                    }}
                  />
                );
              }}
            />
          </div>
          <Tip
            tip={[
              'Make sure we can see the good stuff.',
              'Our image size is 640 x 390px',
              'Text over images can kill the vibe, leave the word for the description box.',
              '9 pictures maximum',
            ]}
          />
        </section>
        <Divider />
        <section className={'owner-policy'}>
          <h2>{'3. Owner Policy'}</h2>
        </section>
        <Divider />
        <section className={'price-deposit'}>
          <h2>{'4. Price & Deposit'}</h2>
        </section>
        <Divider />
        <section className={'transaction'}>
          <h2>{'5. transaction'}</h2>
        </section>
        <Divider />
        <section className={'reference'}>
          <h2>{'6. references'}</h2>
        </section>
      </div>
    );
  }
}

ProductForm.defaultProps = {
};

ProductForm.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  open: PropTypes.bool,
};

const mapStateToProps = (state) => {
  const ProductFormState = state.LeftMenu.toJS();
  return {
    open: ProductFormState.open,
  };
};

const connectedProductForm = connect(
  mapStateToProps
)(ProductForm);

export default whyDidYouUpdateWrapper(connectedProductForm);

export {
  reducer,
  action,
};
