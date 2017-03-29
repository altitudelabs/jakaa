import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import Header from './Header';
import Menu from './Menu';
import './style.scss';

class LeftMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKey: -1,
    };

    this.onSelected = this.onSelected.bind(this);
  }

  componentWillMount() {
    let selectedKey = -1;
    const { router, items } = this.props;

    items.forEach((menu, index) => {
      const menuItems = menu.items || [];
      const filter = menuItems.filter(item => item.link && router.isActive(item.link))[0];
      if (filter) selectedKey = index;
    });

    if (selectedKey > -1) this.setState({ selectedKey });
  }

  onSelected(selectedKey) {
    const selectedKeyState = this.state.selectedKey || -1;
    if (selectedKeyState === selectedKey) {
      this.setState({ selectedKey: -1 });
    } else {
      this.setState({ selectedKey });
    }
  }

  renderItems() {
    const { selectedKey } = this.state;
    const { items, router } = this.props;

    return (
      items.map((item, key) =>
        <Menu
          key={key}
          index={key}
          item={item}
          router={router}
          active={selectedKey === key}
          onSelected={() => this.onSelected(key)}
        />
      )
    );
  }

  render() {
    const { className } = this.props;

    return (
      <div className={classnames(className)}>
        <Header />
        {this.renderItems()}
      </div>
    );
  }
}

LeftMenu.defaultProps = {
  items: [],
  className: 'left-menu',
};

LeftMenu.propTypes = {
  items: PropTypes.array,
  className: PropTypes.string,
  router: React.PropTypes.object.isRequired,
};

const mapStatesToProps = (store) => {
  const { items } = store.leftMenu;
  return { items };
};

export default connect(mapStatesToProps, null)(LeftMenu);
