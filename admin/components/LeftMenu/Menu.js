import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import _ from 'lodash';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paths: [],
    };

    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(paths, path) {
    const pathsState = this.state.paths || [];
    const index = pathsState.indexOf(path);

    if (index > -1) {
      if (_.isEqual(pathsState, paths)) {
        paths = [];
      } else {
        paths = [...pathsState.slice(0, index + 1)];
      }
    }

    this.setState({ paths });
    this.props.onSelect();
    this.props.router.push(path);
  }

  renderHeader(header) {
    if (!header) return;

    const headerClass = classNames('header');
    return <div key="header" className={headerClass}>{header}</div>;
  }

  renderName(item, paths) {
    if (!item.name) return;
    const { name, link } = item;

    return (
      <span
        onClick={() => this.onSelect([...paths], link)}
        key="name"
      >
        {name}
      </span>
    );
  }

  renderOption(item, key, paths) {
    const { active } = this.props;
    const pathsState = this.state.paths || [];
    const menuClass = classNames('menu');
    const className = classNames('option');
    const { name, link, header, items } = item;
    const atts = { key, className };
    const dropdown = [];
    const level = pathsState.length;
    const index = pathsState.lastIndexOf(link);
    let activeItem = false;

    if (index > -1) {
      activeItem = true;
      if (paths[level - 2] === link) {
        activeItem = false;
      }
    }

    if (header) {
      dropdown.push(menuClass);
    } else {
      dropdown.push(className);
      if (items && items.length > 0) {
        dropdown.push('dropdown');
      }
    }

    if (activeItem && active) dropdown.push('open');
    atts.className = dropdown.join(' ');

    const currentPaths = link === undefined ? [...paths] : [...paths, link];

    return (
      <div {...atts}>
        {
          [
            this.renderHeader(header),
            this.renderName({ name, link }, currentPaths),
            this.renderOptions(items, currentPaths),
          ]
        }
      </div>
    );
  }

  renderOptions(items, paths) {
    if (!items) return;
    return items.map((item, key) => this.renderOption(item, key, paths));
  }

  render() {
    const { item } = this.props;
    return this.renderOption(item, -1, []);
  }
}

Menu.defaultProps = {
  item: {},
  onSelect: () => {},
};

Menu.propTypes = {
  item: PropTypes.object,
  active: PropTypes.bool,
  onSelect: PropTypes.func,
  router: React.PropTypes.object.isRequired,
};

export default Menu;
