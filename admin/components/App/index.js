import React, { PropTypes } from 'react';
import LeftMenu from '../LeftMenu';
import Nav from '../Nav';
import List from '../List';
import ThemeProvider from '../../composeComponents/Theme';
import constants from '../../constants';

const App = () => {
  return (
    <ThemeProvider constants={constants}>
      <LeftMenu />
      <Nav />
      <div className={'main-container'}>
        <List
          items={[
            {
              contactName: 'A tothe B tothe C tothe D tothe E tothe F tothe G',
              name: 'Varun',
              age: 1,
            },
            {
              contactName: 'Leon',
              name: 'Kathleen',
              age: 1,
            },
          ]}
        />
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
};

export default App;
