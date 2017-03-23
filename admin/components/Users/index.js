import React, { Component, PropTypes } from 'react';
import List from '../ThemedElements/List';
import { connect } from 'react-redux';
import { shortFormat } from '../../service/userService';

class Users extends Component {
  get getItemConfig() {
    return (
      [
        { key: 'id', visible: false, checkbox: true },
        { key: 'fullName', sort: true, alias: 'user name' },
        { key: 'email' },
        { key: 'phone' },
        { key: 'language', sort: true },
        { key: 'status', sort: true },
      ]
    );
  }

  render() {
    const { users } = this.props;

    return (
      <List
        dataSource={shortFormat(users)}
        itemConfig={this.getItemConfig}
      />
    );
  }
}

Users.defaultProps = {
  users: [],
};

Users.propTypes = {
  users: PropTypes.array,
};

const mapStatesToProps = (store) => {
  return store.users;
};

export default connect(mapStatesToProps, null)(Users);
