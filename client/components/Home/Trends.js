import React, { PropTypes, Component } from 'react';
import className from 'classnames';
import Touchable from '../../composeComponents/Ripple/Touch';

class Trends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }
  render() {
    return (
      <section className={className('trends')}>
        <h2 className={'section-title'}>trends</h2>
        <ul>
          <li className={'trend-container'}>
            <div className={'trend high'}>
              <Touchable />
            </div>
          </li>
          <li className={'trend-container'}>
            <div className={'trend sports'}>
              <Touchable />
            </div>
          </li>
          <li className={'trend-container'}>
            <div className={'trend bag'}>
              <Touchable />
            </div>
          </li>
        </ul>
      </section>
    );
  }
}

Trends.defaultProps = {
};

Trends.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  open: PropTypes.bool,
};

export default Trends;
