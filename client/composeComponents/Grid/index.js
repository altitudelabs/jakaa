import './style.scss';
import React, { PropTypes, Component } from 'react';
import EventListener from 'react-event-listener';
import { pure } from 'recompose';

const getItemSpec = (containerWidth, maxItemWidth, gutter) => {
  const perRowCount = Math.ceil((containerWidth + gutter) / (maxItemWidth + gutter));
  const gutterCount = perRowCount - 1;

  const itemWidth = (containerWidth - (gutter * gutterCount)) / perRowCount;

  return {
    perRowCount,
    width: itemWidth,
  };
};

// TODO can optimize by re-rendering only when perRowCount changes, and let css handle in-between layout
class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      perRowCount: 0,
      itemWidth: 0,
    };
    this.onResize = this.onResize.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }

  componentDidMount() {
    console.log(1);
    this.onResize();
  }
  onResize() {
    const {
      maxItemWidth,
      horizontalGutter,
    } = this.props;

    const { clientHeight, clientWidth } = this.container;

    const itemSpec = getItemSpec(clientWidth, maxItemWidth, horizontalGutter);
    const { perRowCount, width } = itemSpec;

    if (
      perRowCount !== this.state.perRowCount ||
      width !== this.state.itemWidth
    ) {
      this.setState({ perRowCount, itemWidth: width });
    }
  }

  renderRow(rowData) {
    const {
      horizontalGutter,
      itemRenderer,
      getItemHeight,
    } = this.props;
    const {
      itemWidth,
    } = this.state;

    return rowData.map((data, i) => {
      const heightStyle = typeof getItemHeight === 'function'
                            ? { height: getItemHeight(itemWidth) }
                            : {};
      return (
        <div
          key={i}
          className={'item'}
          style={Object.assign(
            {
              width: i === 0 ? itemWidth : itemWidth + horizontalGutter,
              paddingLeft: i === 0 ? 0 : horizontalGutter,
            },
            heightStyle
          )}
        >
          {itemRenderer(data)}
        </div>
      );
    });
  }
  render() {
    const {
      itemData,
      verticalGutter,
    } = this.props;

    const {
      perRowCount,
    } = this.state;

    const rowDataArray = _.chunk(itemData, perRowCount);

    return (
      <div
        className={'compose-grid'}
        ref={ref => this.container = ref}
      >
        <EventListener
          target={'window'}
          onResize={this.onResize}
        />
        {rowDataArray.map((rowData, i) => {
          return (
            <div
              key={i}
              className={'row'}
              style={{
                paddingTop: i === 0 ? 0 : verticalGutter,
              }}
            >
              {this.renderRow(rowData)}
            </div>
          );
        })}
      </div>
    );
  }
}


Grid.defaultProps = {
  verticalGutter: 0,
  horizontalGutter: 0,
};

Grid.propTypes = {
  itemRenderer: PropTypes.func.isRequired,
  itemData: PropTypes.array.isRequired,
  verticalGutter: PropTypes.number.isRequired,
  horizontalGutter: PropTypes.number.isRequired,
  maxItemWidth: PropTypes.number.isRequired,
  getItemHeight: PropTypes.func,
};

export default pure(Grid);
