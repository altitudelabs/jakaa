import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import Header from './Header';
import Menu from './Menu';
import './style.scss';

class LeftMenu extends Component {
  renderItems() {
    return (
      this.props.items.map((item, key) =>
        <Menu
          key={key}
          item={item}
        />
      )
    );
  }

  render() {
    const { className } = this.props;

    return (
      <div className={classnames('left-menu', className)}>
        <Header />
        {this.renderItems()}
      </div>
    );
  }
}

LeftMenu.defaultProps = {
  items: [],
};

LeftMenu.propTypes = {
  items: PropTypes.array,
  className: PropTypes.string,
};

const mapStatesToProps = (store) => {
  const { items } = store.leftMenu;
  return { items };
};

export default connect(mapStatesToProps, null)(LeftMenu);
