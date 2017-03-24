import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Item from './Item';
import Break from './Break';
import './style.scss';

class Pagination extends Component {
  constructor(props) {
    super(props);
    const { initialPage, forcePage } = props;
    const selected = initialPage || forcePage || 0;
    this.state = { selected };

    this.handleNextPage = this.handleNextPage.bind(this);
    this.handlePreviousPage = this.handlePreviousPage.bind(this);
    this.pageSearchOnSubmit = this.pageSearchOnSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { forcePage } = nextProps;
    if (forcePage && this.props.forcePage !== forcePage) {
      this.setState({ selected: forcePage });
    }
  }

  getItemElement(index) {
    const { selected } = this.state;
    const { itemClassName, activeClassName } = this.props;
    return (
      <Item
        key={index}
        content={index + 1}
        selected={selected === index}
        itemClassName={itemClassName}
        activeClassName={activeClassName}
        onClick={(e) => this.handlePageSelected(index, e)}
      />
    );
  }

  handlePreviousPage(evt) {
    evt.preventDefault();
    const { selected } = this.state;
    if (selected > 0) {
      this.handlePageSelected(selected - 1, evt);
    }
  }

  handleNextPage(evt) {
    evt.preventDefault();
    const { selected } = this.state;
    const { pageCount } = this.props;

    if (selected < pageCount - 1) {
      this.handlePageSelected(selected + 1, evt);
    }
  }

  handlePageSelected(selected, evt) {
    evt.preventDefault();
    if (this.state.selected === selected) return;

    this.setState({ selected });
    this.callCallback(selected);
  }

  callCallback(selected) {
    const { onChange } = this.props;
    if (onChange && typeof(onChange) === 'function') {
      onChange(selected);
    }
  }

  pagination() {
    const items = [];
    const { selected } = this.state;
    const { pageCount,
      pageRange,
      marginPages,
    } = this.props;

    if (pageCount <= pageRange) {
      [...new Array(pageCount).keys()].forEach((index) => {
        items.push(this.getItemElement(index));
      });
    } else {
      let leftSide = pageRange / 2;
      let rightSide = pageRange - leftSide;

      if (selected > pageCount - leftSide) {
        rightSide = pageCount - selected;
        leftSide = pageRange - rightSide;
      } else if (selected < pageRange / 2) {
        leftSide = selected;
        rightSide = pageRange - leftSide;
      }

      [...new Array(pageCount).keys()].forEach((index) => {
        const page = index + 1;
        const ItemView = this.getItemElement(index);

        if (page <= marginPages) return items.push(ItemView);
        if (page > pageCount - marginPages) return items.push(ItemView);
        if ((index >= selected - leftSide) && (index <= selected + rightSide)) {
          return items.push(ItemView);
        }

        const last = [...items].pop() || {};
        const { breakLabel } = last.props || {};
        if (breakLabel !== this.props.breakLabel) {
          return items.push(
            <Break
              key={index}
              breakLabel={this.props.breakLabel}
              breakClassName={this.props.breakClassName}
            />
          );
        }
      });
    }

    return items;
  }

  pageSearchOnSubmit(e) {
    e.preventDefault();
    const { pageCount } = this.props;
    let selected = (this.paginationSearch || {}).value || 1;
    selected = parseInt(selected, 10) - 1 || 0;
    if (selected > pageCount - 1) selected = pageCount - 1;
    this.callCallback(selected);
    this.setState({ selected });
  }

  renderPrevious() {
    const { selected } = this.state;
    const {
      previousClassName,
    } = this.props;
    const first = selected === 0;
    const disabled = this.props.disabledClassName;
    const previousClasses = classNames(previousClassName, { [disabled]: first });

    return (
      [
        <Item
          key="first"
          disabled={first}
          onClick={(e) => this.handlePageSelected(0, e)}
          itemClassName={`item ${previousClasses}`}
          content="First"
        />,
        <Item
          key="previous"
          disabled={first}
          onClick={this.handlePreviousPage}
          content={this.props.previousLabel}
          itemClassName={`item ${previousClasses}`}
        />,
      ]
    );
  }

  renderNext() {
    const { selected } = this.state;
    const {
      pageCount,
      nextClassName,
    } = this.props;
    const last = selected === pageCount - 1;
    const disabled = this.props.disabledClassName;
    const nextClasses = classNames(nextClassName, { [disabled]: last });

    return (
      [
        <Item
          key="next"
          disabled={last}
          onClick={this.handleNextPage}
          content={this.props.nextLabel}
          itemClassName={`item ${nextClasses}`}
        />,
        <Item
          key="last"
          content="Last"
          disabled={last}
          itemClassName={`item ${nextClasses}`}
          onClick={(e) => this.handlePageSelected(pageCount - 1, e)}
        />,
      ]
    );
  }

  render() {
    const { className } = this.props;

    return (
      <div className={className}>
        <div className="group form-group">
          {'Go to page: '}
          <form onSubmit={this.pageSearchOnSubmit}>
            <input
              type="number"
              ref={(ref) => (this.paginationSearch = ref)}
            />
          </form>
        </div>
        <div className="group">
          {this.renderPrevious()}
          {this.pagination()}
          {this.renderNext()}
        </div>
      </div>
    );
  }
}

Pagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
  pageRange: PropTypes.number.isRequired,
  marginPages: PropTypes.number.isRequired,
  previousLabel: PropTypes.node,
  nextLabel: PropTypes.node,
  breakLabel: PropTypes.node,
  onChange: PropTypes.func,
  initialPage: PropTypes.number,
  forcePage: PropTypes.number,
  className: PropTypes.string,
  itemClassName: PropTypes.string,
  activeClassName: PropTypes.string,
  previousClassName: PropTypes.string,
  nextClassName: PropTypes.string,
  disabledClassName: PropTypes.string,
  breakClassName: PropTypes.string,
};

Pagination.defaultProps = {
  pageRange: 2,
  pageCount: 10,
  marginPages: 1,
  nextLabel: 'Next',
  breakLabel: '...',
  nextClassName: 'next',
  itemClassName: 'item',
  className: 'pagination',
  previousLabel: 'Previous',
  activeClassName: 'selected',
  disabledClassName: 'disabled',
  previousClassName: 'previous',
};

export default Pagination;
