import React, { PropTypes, Component } from 'react';
import Touchable from '../../composeComponents/Ripple/Touch';
import LeftMenu from '../LeftMenu';
import Header from '../Header';
import Search from '../Search';
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
    };
  }
  render() {
    return (
      <div>
        <Header />
        <LeftMenu />
        {this.props.children}
        <Search />
      </div>
    );
  }
}

App.defaultProps = {
};

App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default App;
