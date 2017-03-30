import React, { PropTypes } from 'react';
import LeftMenu from '../LeftMenu';
import Nav from '../Nav';
import ThemeProvider from '../../composeComponents/Theme';
import constants from '../../constants';

const App = ({ children, router, route }) => {
  return (
    <ThemeProvider constants={constants}>
      <LeftMenu router={router} />
      <Nav />
      <div className={'main-container'}>
        {React.cloneElement(children, { router, route })}
      </div>
    </ThemeProvider>
  );
};

App.defaultProps = {
};

App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  route: React.PropTypes.object.isRequired,
  router: React.PropTypes.object.isRequired,
};

export default App;
