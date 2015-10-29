import React, { Component, PropTypes } from 'react';
import provide from 'react-redux-provide';
import TestItem from './TestItem';

@provide({
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  setList: PropTypes.func.isRequired,
  updateList: PropTypes.func.isRequired,
  filterList: PropTypes.func.isRequired,
  createItem: PropTypes.func.isRequired
})
export default class Test extends Component {
  render() {
    return (
      <div className="test">
        {this.renderItems()}
      </div>
    );
  }

  renderItems() {
    return this.props.list.map(
      (item, index) => <TestItem key={index} index={index} />
    );
  }
}
