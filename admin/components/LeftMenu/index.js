import React, { Component, PropTypes } from 'react';
import calssNames from 'classnames';
import { connect } from 'react-redux';
import Header from './Header';
import Menu from './Menu';
import './style.scss';

class LeftMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      select: -1,
    };

    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(select) {
    const selectState = this.state.select || -1;
    if (selectState === select) {
      this.setState({ select: -1 });
    } else {
      this.setState({ select });
    }
  }

  renderItems() {
    const { select } = this.state;
    const { items, router } = this.props;

    return (
      items.map((item, key) =>
        <Menu
          key={key}
          index={key}
          item={item}
          router={router}
          active={select === key}
          onSelect={() => this.onSelect(key)}
        />
      )
    );
  }

  render() {
    const listClass = calssNames(
      'left-menu' // TODO better prefix
    );

    return (
      <div className={listClass}>
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
  router: React.PropTypes.object.isRequired,
};

const mapStatesToProps = (store) => {
  return store.leftMenu;
};

export default connect(mapStatesToProps, null)(LeftMenu);
