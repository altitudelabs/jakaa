import './style.scss';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import SearchIcon from '../Icons/search';
import SearchRightIcon from '../Icons/search-right';

class SearchField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };

    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    const { value } = this.props;
    this.setState({ value });
  }

  componentWillReceiveProps(props) {
    const { value } = props;
    if (value && value !== this.state.value) this.setState({ value });
  }

  onChange(action, ...args) {
    const { onChange } = this.props;
    if (onChange) onChange(action, ...args);
    this.setState({ value: action.target.value });
  }

  get getStyle() {
    const { style, styles } = this.props;
    const { search } = styles || {};
    return { ...search, ...style };
  }

  get getClass() {
    const { className, disabled } = this.props;
    const searchbox = ['searchbox'];
    if (disabled) searchbox.push('disabled');
    if (className) searchbox.push(className);

    return classNames(searchbox.join(' '));
  }

  get searchText() {
    return this.state.value;
  }

  get addEvents() {
    const {
      onClick,
      onSelect,
      onSubmit,
      onReset,
      onKeyDown,
      onKeyPress,
      onKeyUp,
    } = this.props;
    return { onClick, onSelect, onSubmit, onReset, onKeyDown, onKeyPress, onKeyUp };
  }

  renderInput() {
    const { value } = this.state;
    const { disabled, placeholder } = this.props;
    let inputProps = { disabled, placeholder, value };
    if (!disabled) {
      const events = this.addEvents;
      inputProps.onChange = this.onChange;
      inputProps = { ...inputProps, ...events };
    }

    return <input {...inputProps} />;
  }

  renderLeft() {
    return (
      <div
        className={classNames('search-left')}
      >
        <SearchIcon />
      </div>
    );
  }

  renderRight() {
    const { onSearch } = this.props;
    return (
      <button
        className={classNames('search-right')}
        onClick={(e) => onSearch && onSearch(e)}
      >
        <SearchRightIcon />
      </button>
    );
  }

  render() {
    return (
      <div
        style={this.getStyle}
        className={this.getClass}
      >
        {this.renderLeft()}
        {this.renderInput()}
        {this.renderRight()}
      </div>
    );
  }
}

SearchField.defaultProps = {
  value: '',
  placeholder: 'Search',
};

SearchField.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  style: PropTypes.object,
  styles: PropTypes.object,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onSelect: PropTypes.func,
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyPress: PropTypes.func,
  onKeyUp: PropTypes.func,
  onSearch: PropTypes.func,
};

export default SearchField;
