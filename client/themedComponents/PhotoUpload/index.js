import './style.scss';
import React, { PropTypes, Component } from 'react';
import { whyDidYouUpdateWrapper } from '../../utils/why-did-you-update';
import Modal from 'react-modal';
import Touchable from '../../composeComponents/Ripple/Touch';
import Dropzone from 'react-dropzone';

class PhotoUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }
  render() {
    const {
      onUploadComplete,
      onError,
      ...others,
    } = this.props;

    return (
      <Dropzone
        className={'photo-upload'}
        accept={'image/png, image/bmp, image/jpg, image/jpeg'}
        onDrop={(images) => {
          // TODO swap out on server integration
          onUploadComplete(images.map(v => v.preview));
          // const data = new FormData();
          // images.forEach((image) => {
          //   data.append('photos', image);
          // });
          // customFetch('/api/s3', {
          //   method: 'POST',
          //   body: data,
          //   json: false,
          // })
          // .then(onUploadComplete)
          // .catch(onError);
        }}
        {...others}
      />
    );
  }
}

PhotoUpload.defaultProps = {
  onUploadComplete: () => {},
  onError: () => {},
};

PhotoUpload.propTypes = {
  onUploadComplete: PropTypes.func,
  onError: PropTypes.func,
};

export default whyDidYouUpdateWrapper(PhotoUpload);
