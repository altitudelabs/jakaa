import React, { PropTypes, Component } from 'react';
import className from 'classnames';
import Touchable from '../../composeComponents/Ripple/Touch';
import Grid from '../../composeComponents/Grid';
import { Link } from 'react-router';

class Items extends Component {
// store.dispatch(push('/foo'))
  render() {
    return (
      <section className={className('items')}>
        <h2 className={'section-title'}>explore items</h2>
        <Grid
          itemData={['high', 'sports', 'bag']}
          verticalGutter={30}
          horizontalGutter={10}
          maxItemWidth={469}
          itemRenderer={(data) => {
            return (
              <Link
                to={'/product/example'}
                className={`item ${data}`}
              >
                <Touchable />
                <div className={'image'}></div>
                <div className={'desc'} />
              </Link>
            );
          }}
        />
      </section>
    );
  }
}

Items.defaultProps = {
};

Items.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  open: PropTypes.bool,
};

export default Items;
