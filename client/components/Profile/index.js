import './style.scss';
import React, { PropTypes, Component } from 'react';
import { whyDidYouUpdateWrapper } from '../../utils/why-did-you-update';
import action from './action';
import reducer from './reducer';
import {
  List as ReviewList,
} from '../Review';
import {
  List as ProductList,
} from '../Product';


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }
  componentDidMount() {
    console.log('getting ', this.props.params.id);
  }
  render() {
    return (
      <div className={'profile-detail'}>
        <section className={'info'}>
          <div className={'profile-pic'}>
            <img
              alt={'profile'}
              src={
                require('../../asset/image/sample-profile@2x.png') // eslint-disable-line global-require
              }
            />
          </div>
          <h1 className={'title'}>{'hello, I`m Joyce!'}</h1>
          <span className={'description'}>
            {'Hello ~ i am working as a photographer, born local, just returned to HK in 2015 after few years working in Singapore. Besides working hard, I love to spend my time hiking, drawing, reading, cooking, sleeping. Love collecting divers items. My pleasure to lend you my favorite items from different parts of the world. :)'}
          </span>
          <div className={'badges'}>
            <div className={'badge'}>
              <div className={'icon'}></div>
              <div className={'name'}>{'105 reviews'}</div>
            </div>
            <div className={'badge'}>
              <div className={'icon'}></div>
              <div className={'name'}>{'verified'}</div>
            </div>
          </div>
        </section>
        <section className={'products'}>
          <h2 className={'title'}>{'Items for rent (3)'}</h2>
          <ProductList />
        </section>
        <section className={'reviews'}>
          <h2 className={'title'}>{'Reviews (105)'}</h2>
          <ReviewList />
        </section>
      </div>
    );
  }
}
Profile.defaultProps = {

};

Profile.propTypes = {
  params: PropTypes.object,
};

export default whyDidYouUpdateWrapper(Profile);

export {
  reducer,
  action,
};
