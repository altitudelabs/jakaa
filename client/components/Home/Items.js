import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import className from 'classnames';
import Touchable from '../../composeComponents/Ripple/Touch';
import EventListener from 'react-event-listener';
import Grid from '../../composeComponents/Grid';
import { Link } from 'react-router';

class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      containerWidth: window.innerWidth,
    };
    this.handleResize = this.handleResize.bind(this);
  }

  handleResize(e) {
    this.setState({
      containerWidth: e.target.innerWidth,
    });
  }
// store.dispatch(push('/foo'))
  render() {
    return (
      <section className={className('items')}>
        <h2 className={'section-title'}>explore items</h2>
        {/* TODO deprecate since not well-polished library */}
        <EventListener
          target={'window'}
          onResize={this.handleResize}
        />
        <Grid
          itemData={['high', 'sports', 'bag']}
          containerWidth={this.state.containerWidth - 50}
          verticalGutter={30}
          horizontalGutter={10}
          maxItemWidth={469}
          itemRenderder={(data) => {
            return (
              <Link
                to={'/product/example'}
                className={'logo'}
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
