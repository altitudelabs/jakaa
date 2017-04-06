import React, { Component, PropTypes } from 'react';
import { IndexLink, Link, withRouter } from 'react-router';
import classNames from 'classnames';

class Menu extends Component {
  renderHeader(header) {
    if (!header) return;
    const { classNameHeader } = this.props;

    return (
      <div
        key="header"
        className={classNames('header', classNameHeader)}
      >
        {header}
      </div>
    );
  }

  renderName(item, indexRoute) {
    if (!item || !item.name) return;

    const { name, link } = item;
    const { classNameActive } = this.props;
    const LinkComponent = indexRoute ? IndexLink : Link;

    return (
      <LinkComponent
        to={link}
        key="menu-name"
        activeClassName={classNames('active', classNameActive)}
      >
        {name}
      </LinkComponent>
    );
  }

  renderMenuItem(item, key) {
    const { router, className, classNameItem } = this.props;
    const { name, link, header, items, indexRoute } = item;
    const activeItem = link && router.isActive(link);

    return (
      <div
        key={key}
        className={classNames({
          menu: header,
          [className]: header,
          'menu-item': !header,
          [classNameItem]: !header,
          open: activeItem && !indexRoute,
          dropdown: !header && items && items.length > 0,
        })}
      >
        {
          [
            this.renderHeader(header),
            this.renderName({ name, link }, indexRoute),
            this.renderMenuItems(items, key),
          ]
        }
      </div>
    );
  }

  renderMenuItems(items, key) {
    if (!items) return;
    const { classNameSubMenu } = this.props;

    return (
      <div
        key={key}
        className={classNames('sub-menu', classNameSubMenu)}
      >
        {items.map((item, index) => this.renderMenuItem(item, index))}
      </div>
    );
  }

  render() {
    const { item } = this.props;
    return this.renderMenuItem(item, -1);
  }
}

Menu.defaultProps = {
  item: {},
};

Menu.propTypes = {
  item: PropTypes.object,
  className: PropTypes.string,
  classNameItem: PropTypes.string,
  classNameHeader: PropTypes.string,
  classNameActive: PropTypes.string,
  classNameSubMenu: PropTypes.string,
  router: React.PropTypes.object.isRequired,
};

export default withRouter(Menu);
