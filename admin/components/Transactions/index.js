import './style.scss';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import List from '../ThemedElements/List';
import Button from '../ThemedElements/Button';
import {
  shortFormats,
  getTransactions,
  searchTransactionBy,
} from '../../service/transactionService';

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

class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      selected: {},
      searchText: '',
    };

    this.onSearch = this.onSearch.bind(this);
    this.onAddTenant = this.onAddTenant.bind(this);
    this.onDeleteTransaction = this.onDeleteTransaction.bind(this);
    this.onSelectTransaction = this.onSelectTransaction.bind(this);
    this.onPagination = this.onPagination.bind(this);
  }

  componentWillMount() {
    const { location } = this.props;
    const { query = {} } = location || {};
    let searchText;
    let page = parseInt(query.page, 10) || 1;
    page = page - 1;
    if (page < 0) page = 0;
    if (query.search && query.search !== '') {
      searchText = query.search;
      searchTransactionBy({ item: searchText }, { page });
    } else {
      getTransactions({ page });
    }
    this.setState({ page, searchText });
  }

  onSearch(e) {
    e.preventDefault();
    const page = 0;
    const { searchText } = this.search || {};
    const { location } = this.props;
    const { query = {}, pathname } = location || {};
    query.page = 1;

    if (searchText) {
      query.search = searchText;
      searchTransactionBy({ item: searchText }, { page });
    } else {
      delete query.search;
      getTransactions({ page });
    }

    this.setState({ searchText, page });
    this.props.router.replace({ pathname, query });
  }

  onDeleteTransaction(e) {
    e.preventDefault();
    // handle delete Transaction in here
  }

  onAddTenant(e) {
    e.preventDefault();
    // handle add a tenant in here
  }

  onPagination(page) {
    const { location } = this.props;
    const { query = {}, pathname } = location || {};
    query.page = page + 1;
    const searchText = query.search || '';

    if (searchText !== '') {
      searchTransactionBy({ item: searchText }, { page });
    } else {
      getTransactions({ page });
    }

    this.setState({ selected: {}, page, searchText });
    this.props.router.replace({ pathname, query });
  }

  onSelectTransaction(key, items) {
    const selected = items.reduce((obj, item) => {
      obj[item.id] = true;
      return obj;
    }, {});

    this.setState({ selected });

    if (key !== 'id' && items.length === 1) {
      this.props.router.push(`/admin/transactions/${items[0].id}`);
    }
  }

  get getItemConfig() {
    return (
      [
        { key: 'id', visible: false, checkbox: true },
        { key: 'orderId', alias: 'Transaction' },
        { key: 'item' },
        { key: 'rentalPeriod' },
        { key: 'rentalCost' },
        { key: 'status', sort: true },
      ]
    );
  }

  renderSideTop() {
    const { selected, searchText } = this.state;
    const displayDelete = Object.keys(selected).length > 0;

    return (
      <div className={classNames('header')}>
        <div className={classNames('left')}>
          <Search
            value={searchText}
            onSubmit={this.onSearch}
            ref={(ref) => (this.search = ref)}
          />
          <div className="group">
            <Button text="Current" />
            <Button text="Historial" />
          </div>
        </div>
        <div className={classNames('right')}>
          {displayDelete &&
            <Button
              text="Delete"
              onClick={this.onDeleteTransaction}
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
    const { page, selected } = this.state;
    const { transactions, transactionCount, limit } = this.props;
    const pageCount = transactionCount / limit + (transactionCount % limit > 0 ? 1 : 0);

    return (
      <div className={classNames('transactions')}>
        {this.renderSideTop()}
        <List
          selected={selected}
          dataSource={shortFormats(transactions)}
          itemConfig={this.getItemConfig}
          onSelectChange={this.onSelectTransaction}
        />
        <Pagination
          forcePage={page}
          pageCount={parseInt(pageCount, 10)}
          onChange={this.onPagination}
        />
      </div>
    );
  }
}

Transactions.defaultProps = {
  transactions: [],
};

Transactions.propTypes = {
  transactions: PropTypes.array,
  limit: PropTypes.number,
  transactionCount: PropTypes.number,
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

const mapStatesToProps = (store) => {
  return store.transactions;
};

export default connect(mapStatesToProps, null)(Transactions);
