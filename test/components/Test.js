import React, { Component, PropTypes } from 'react';
import TestItem from './TestItem';

export default class Test extends Component {
  static propTypes = {
    testList: PropTypes.arrayOf(PropTypes.object).isRequired,
    testListLength: PropTypes.number.isRequired,
    setTestList: PropTypes.func.isRequired,
    sortTestList: PropTypes.func.isRequired,
    reverseTestList: PropTypes.func.isRequired,
    updateTestList: PropTypes.func.isRequired,
    filterTestList: PropTypes.func.isRequired,
    shiftTestList: PropTypes.func.isRequired,
    popTestList: PropTypes.func.isRequired,
    sliceTestList: PropTypes.func.isRequired,
    spliceTestList: PropTypes.func.isRequired,
    clearTestList: PropTypes.func.isRequired,
    unshiftTestItem: PropTypes.func.isRequired,
    pushTestItem: PropTypes.func.isRequired,
    setTestItem: PropTypes.func.isRequired
  };

  render() {
    return (
      <div className="test">
        {this.renderItems()}
      </div>
    );
  }

  renderItems() {
    return this.props.testList.map(
      (item, index) => <TestItem key={index} index={index} />
    );
  }
}
