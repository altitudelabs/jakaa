import './style.scss';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import List from '../ThemedElements/List';
import Button from '../ThemedElements/Button';
import { getPromotions, shortFormat, searchPromotionBy } from '../../service/promotionService';
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

class Promotions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      selectedKey: {},
      searchText: '',
    };

    this.onSearch = this.onSearch.bind(this);
    this.onAddPromotion = this.onAddPromotion.bind(this);
    this.onDeletePromotion = this.onDeletePromotion.bind(this);
    this.onSelectPromotion = this.onSelectPromotion.bind(this);
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
      searchPromotionBy({ code: searchText }, { page });
    } else {
      getPromotions({ page });
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
      searchPromotionBy({ code: searchText }, { page });
    } else {
      delete query.search;
      getPromotions({ page });
    }

    this.props.router.replace({ pathname, query });
    this.setState({ searchText, page });
  }

  onDeletePromotion(e) {
    e.preventDefault();
    // handle delete Promotion in here
  }

  onAddPromotion(e) {
    e.preventDefault();
    // handle add a tenant in here
  }

  onPagination(page) {
    getPromotions({ page });
    const { location } = this.props;
    const { query = {}, pathname } = location || {};
    query.page = page + 1;
    this.setState({ selectedKey: {} });
    this.props.router.replace({ pathname, query });
  }

  onSelectPromotion(key, items) {
    const selectedKey = items.reduce((obj, item) => {
      obj[item.id] = true;
      return obj;
    }, {});

    this.setState({ selectedKey });
  }

  get getItemConfig() {
    return (
      [
        { key: 'id', visible: false, checkbox: true },
        { key: 'code', sort: true, alias: 'Promotion code' },
        { key: 'percentage', alias: 'Discount', nextfix: '%' },
        { key: 'startAt', alias: 'startDate', sort: true, date: true, format: 'DD/MM/YYYY' },
        { key: 'expiresAt', alias: 'endDate', sort: true, date: true, format: 'DD/MM/YYYY' },
        { key: 'status', sort: true },
      ]
    );
  }

  renderSideTop() {
    const { selectedKey, searchText } = this.state;
    const displayDelete = Object.keys(selectedKey).length > 0;

    return (
      <div className={classNames('header')}>
        <div className={classNames('left')}>
          <Search
            value={searchText}
            onSubmit={this.onSearch}
            ref={(ref) => (this.search = ref)}
          />
        </div>
        <div className={classNames('right')}>
          {displayDelete &&
            <Button
              text="Delete"
              onClick={this.onDeletePromotion}
              icon={<TrashIcon style={styles.icon} />}
            />
          }
          <Button
            className="add"
            text="Add Promotion"
            onClick={this.onAddPromotion}
            icon={<PlusIcon style={styles.icon} />}
          />
        </div>
      </div>
    );
  }

  render() {
    const { page, selectedKey } = this.state;
    const { promotions, promotionCount, limit } = this.props;
    const pageCount = promotionCount / limit + (promotionCount % limit > 0 ? 1 : 0);

    return (
      <div className={classNames('promotions')}>
        {this.renderSideTop()}
        <List
          selectedKey={selectedKey}
          dataSource={shortFormat(promotions)}
          itemConfig={this.getItemConfig}
          onSelectChange={this.onSelectPromotion}
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

Promotions.defaultProps = {
  promotions: [],
};

Promotions.propTypes = {
  promotions: PropTypes.array,
  limit: PropTypes.number,
  promotionCount: PropTypes.number,
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

const mapStatesToProps = (store) => {
  return store.promotions;
};

export default connect(mapStatesToProps, null)(Promotions);
