import './style.scss';
import React, { PropTypes, Component } from 'react';
import className from 'classnames';
import Touchable from '../../composeComponents/Ripple/Touch';
import { Link } from 'react-router';
import {
  action as LeftMenuAction,
} from '../LeftMenu';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.onBurgerClick = this.onBurgerClick.bind(this);
  }

  onBurgerClick() {
    LeftMenuAction.open();
  }

  render() {
    return (
      <nav>
        <div className={'burger-menu'} onClick={this.onBurgerClick}>
          <Touchable />
          <div className={'image'} />
        </div>
        <Link to={'/'} className={'logo'}>
          <img alt={'Jakaa'} src={require('../../asset/image/header-logo@2x.png')} />
        </Link>
      </nav>
    );
  }
}

Home.defaultProps = {
};

Home.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Home;
