import './style.scss';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import List from '../ThemedElements/List';
import Button from '../ThemedElements/Button';
import { getUsers, shortFormat } from '../../service/userService';
import Search from '../ThemedElements/Search';
import TrashIcon from '../ThemedElements/Icons/trash';
import PlusIcon from '../ThemedElements/Icons/plus-circle';
import Pagination from '../ThemedElements/Pagination';

const styles = {
  icon: {
    height: 19,
    fill: '#FFF',
    marginRight: 8,
  },
};

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      selected: {},
    };

    this.onAddTenant = this.onAddTenant.bind(this);
    this.onDeleteUser = this.onDeleteUser.bind(this);
    this.onSelectUser = this.onSelectUser.bind(this);
    this.onPagination = this.onPagination.bind(this);
  }

  componentWillMount() {
    const { location } = this.props;
    const { query = {} } = location || {};
    let page = parseInt(query.page, 10) || 1;
    page = page - 1;
    if (page < 0) page = 0;
    getUsers({ page });
    this.setState({ page });
  }

  onDeleteUser(e) {
    e.preventDefault();
    // handle delete user in here
  }

  onAddTenant(e) {
    e.preventDefault();
    // handle add a tenant in here
  }

  onPagination(page) {
    getUsers({ page });
    const { location } = this.props;
    const { query = {}, pathname } = location || {};
    query.page = page + 1;
    this.props.router.replace({ pathname, query });
  }

  onSelectUser(items) {
    const selected = items.reduce((obj, item) => {
      obj[item.item] = true;
      return obj;
    }, {});

    this.setState({ selected });
  }

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

  renderSideTop() {
    const { selected } = this.state;
    const displayDelete = Object.keys(selected).length > 0;

    return (
      <div className={classNames('header')}>
        <div className={classNames('left')}>
          <Search
            onSearch={this.onSearch}
            ref={(ref) => (this.search = ref)}
          />
        </div>
        <div className={classNames('right')}>
          {displayDelete &&
            <Button
              text="Delete"
              onClick={this.onDeleteUser}
              icon={<TrashIcon style={styles.icon} />}
            />
          }
          <Button
            className="add"
            text="Add a Tenant"
            onClick={this.onAddTenant}
            icon={<PlusIcon style={styles.icon} />}
          />
        </div>
      </div>
    );
  }

  render() {
    const { page } = this.state;
    const { users, userCount, limit } = this.props;
    const pageCount = userCount / limit;
    return (
      <div className={classNames('users')}>
        {this.renderSideTop()}
        <List
          dataSource={shortFormat(users)}
          itemConfig={this.getItemConfig}
          onSelectChange={this.onSelectUser}
        />
        <Pagination
          forcePage={page}
          pageCount={pageCount}
          onChange={this.onPagination}
        />
      </div>
    );
  }
}

Users.defaultProps = {
  users: [],
};

Users.propTypes = {
  users: PropTypes.array,
  limit: PropTypes.number,
  userCount: PropTypes.number,
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

const mapStatesToProps = (store) => {
  return store.users;
};

export default connect(mapStatesToProps, null)(Users);
