import './style.scss';
import React, { PropTypes, Component } from 'react';
import Touchable from '../../composeComponents/Ripple/Touch';
import Header from './Header';
import Trends from './Trends';
import Items from './Items';
import { whyDidYouUpdateWrapper } from '../../utils/why-did-you-update';
import { action as SearchAction } from '../Search';

// import Footer from './Footer';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.onSearchBarClick = this.onSearchBarClick.bind(this);
  }

  onSearchBarClick() {
    // this.props.router.push('/product/new');
    SearchAction.open();
  }
  render() {
    return (
      <div className={'home'}>
        <Header />
        <section className={'search'}>
          <div className={'bar'} onClick={this.onSearchBarClick}>
            <Touchable />
            <div className={'logo'} />
            <span>{'Search'}</span>
          </div>
        </section>
        <Trends />
        <Items />
      </div>
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

export default whyDidYouUpdateWrapper(Home);
