import React, { Component, PropTypes } from 'react';
import provide from 'react-redux-provide';

@provide({
  item: PropTypes.object.isRequired,
  updateItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired
})
export default class TestItem extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired
  };

  render() {
    return (
      <li className="test-item">
        {this.props.item.value}
      </li>
    );
  }
}
