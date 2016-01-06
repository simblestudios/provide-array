import expect from 'expect';
import React, { PropTypes } from 'react';
import { renderTest } from 'react-redux-provide-test-utils';
import { Test, TestItem } from './components/index';
import providers from './providers/index';

const context = {
  providers,
  providedState: {
    testList: [
      {
        selected: true,
        value: 'a'
      },
      {
        value: 'b'
      },
      {
        value: 'c'
      }
    ]
  }
};

const test = renderTest(Test, { ...context });
const testItem = renderTest(TestItem, { ...context, index: 0 });

describe('react-redux-provide-list', () => {
  it('should have initialized list', () => {
    expect(test.wrappedInstance.props.testList instanceof Array).toBe(true);
    expect(typeof test.wrappedInstance.props.testList[0]).toBe('object');
    expect(test.wrappedInstance.props.testList.length).toBe(3);
    expect(test.wrappedInstance.props.testListLength).toBe(3);
    expect(test.wrappedInstance.props.testList[0].selected).toBe(true);
    expect(test.wrappedInstance.props.testList[0].value).toBe('a');
    expect(typeof test.wrappedInstance.props.testList[1]).toBe('object');
    expect(test.wrappedInstance.props.testList[1].value).toBe('b');
    expect(typeof test.wrappedInstance.props.testList[2]).toBe('object');
    expect(test.wrappedInstance.props.testList[2].value).toBe('c');
  });

  it('should provide item when index prop is present', () => {
    expect(testItem.wrappedInstance.props.index).toBe(0);
    expect(testItem.wrappedInstance.props.testItem.selected).toBe(true);
    expect(testItem.wrappedInstance.props.testItem.value).toBe('a');
  });

  it('should setList', () => {
    test.wrappedInstance.props.setTestList([
      {value: 'apple'},
      {value: 'banana'},
      {value: 'carrot'}
    ]);

    expect(test.wrappedInstance.props.testList instanceof Array).toBe(true);
    expect(test.wrappedInstance.props.testList.length).toBe(3);
    expect(test.wrappedInstance.props.testListLength).toBe(3);
    expect(typeof test.wrappedInstance.props.testList[0]).toBe('object');
    expect(test.wrappedInstance.props.testList[0].value).toBe('apple');
    expect(typeof test.wrappedInstance.props.testList[1]).toBe('object');
    expect(test.wrappedInstance.props.testList[1].value).toBe('banana');
    expect(typeof test.wrappedInstance.props.testList[2]).toBe('object');
    expect(test.wrappedInstance.props.testList[2].value).toBe('carrot');
  });

  it('should sortList', () => {
    test.wrappedInstance.props.sortTestList((a, b) => {
      if (a.value > b.value) {
        return -1;
      } else if (a.value < b.value) {
        return 1;
      } else {
        return 0;
      }
    });

    expect(test.wrappedInstance.props.testList instanceof Array).toBe(true);
    expect(test.wrappedInstance.props.testList.length).toBe(3);
    expect(test.wrappedInstance.props.testListLength).toBe(3);
    expect(typeof test.wrappedInstance.props.testList[0]).toBe('object');
    expect(test.wrappedInstance.props.testList[0].value).toBe('carrot');
    expect(typeof test.wrappedInstance.props.testList[1]).toBe('object');
    expect(test.wrappedInstance.props.testList[1].value).toBe('banana');
    expect(typeof test.wrappedInstance.props.testList[2]).toBe('object');
    expect(test.wrappedInstance.props.testList[2].value).toBe('apple');
  });

  it('should reverseList', () => {
    test.wrappedInstance.props.reverseTestList();

    expect(test.wrappedInstance.props.testList instanceof Array).toBe(true);
    expect(test.wrappedInstance.props.testList.length).toBe(3);
    expect(test.wrappedInstance.props.testListLength).toBe(3);
    expect(typeof test.wrappedInstance.props.testList[0]).toBe('object');
    expect(test.wrappedInstance.props.testList[0].value).toBe('apple');
    expect(typeof test.wrappedInstance.props.testList[1]).toBe('object');
    expect(test.wrappedInstance.props.testList[1].value).toBe('banana');
    expect(typeof test.wrappedInstance.props.testList[2]).toBe('object');
    expect(test.wrappedInstance.props.testList[2].value).toBe('carrot');
  });

  it('should updateList', () => {
    test.wrappedInstance.props.updateTestList((testItem, index) => (
      { ...testItem, value: testItem.value.slice(0, 3) }
    ));

    expect(test.wrappedInstance.props.testList instanceof Array).toBe(true);
    expect(test.wrappedInstance.props.testList.length).toBe(3);
    expect(test.wrappedInstance.props.testListLength).toBe(3);
    expect(typeof test.wrappedInstance.props.testList[0]).toBe('object');
    expect(test.wrappedInstance.props.testList[0].value).toBe('app');
    expect(typeof test.wrappedInstance.props.testList[1]).toBe('object');
    expect(test.wrappedInstance.props.testList[1].value).toBe('ban');
    expect(typeof test.wrappedInstance.props.testList[2]).toBe('object');
    expect(test.wrappedInstance.props.testList[2].value).toBe('car');
  });

  it('should filterList', () => {
    test.wrappedInstance.props.filterTestList((testItem, index) => (
      testItem.value !== 'ban' && index !== 2
    ));

    expect(test.wrappedInstance.props.testList instanceof Array).toBe(true);
    expect(test.wrappedInstance.props.testList.length).toBe(1);
    expect(test.wrappedInstance.props.testListLength).toBe(1);
    expect(typeof test.wrappedInstance.props.testList[0]).toBe('object');
    expect(test.wrappedInstance.props.testList[0].value).toBe('app');
    expect(test.wrappedInstance.props.testList[1]).toBe(undefined);
    expect(test.wrappedInstance.props.testList[2]).toBe(undefined);
  });

  it('should unshiftItem', () => {
    test.wrappedInstance.props.unshiftTestItem({
      value: 'donut'
    });

    expect(test.wrappedInstance.props.testList instanceof Array).toBe(true);
    expect(test.wrappedInstance.props.testList.length).toBe(2);
    expect(test.wrappedInstance.props.testListLength).toBe(2);
    expect(typeof test.wrappedInstance.props.testList[0]).toBe('object');
    expect(test.wrappedInstance.props.testList[0].value).toBe('donut');
    expect(typeof test.wrappedInstance.props.testList[1]).toBe('object');
    expect(test.wrappedInstance.props.testList[1].value).toBe('app');
  });

  it('should shiftList', () => {
    test.wrappedInstance.props.shiftTestList();

    expect(test.wrappedInstance.props.testList instanceof Array).toBe(true);
    expect(test.wrappedInstance.props.testList.length).toBe(1);
    expect(test.wrappedInstance.props.testListLength).toBe(1);
    expect(typeof test.wrappedInstance.props.testList[0]).toBe('object');
    expect(test.wrappedInstance.props.testList[0].value).toBe('app');
    expect(test.wrappedInstance.props.testList[1]).toBe(undefined);
    expect(test.wrappedInstance.props.testList[2]).toBe(undefined);
  });

  it('should pushItem', () => {
    test.wrappedInstance.props.pushTestItem({
      value: 'donut'
    });

    expect(test.wrappedInstance.props.testList instanceof Array).toBe(true);
    expect(test.wrappedInstance.props.testList.length).toBe(2);
    expect(test.wrappedInstance.props.testListLength).toBe(2);
    expect(typeof test.wrappedInstance.props.testList[0]).toBe('object');
    expect(test.wrappedInstance.props.testList[0].value).toBe('app');
    expect(typeof test.wrappedInstance.props.testList[1]).toBe('object');
    expect(test.wrappedInstance.props.testList[1].value).toBe('donut');
  });

  it('should popList', () => {
    test.wrappedInstance.props.popTestList();

    expect(test.wrappedInstance.props.testList instanceof Array).toBe(true);
    expect(test.wrappedInstance.props.testList.length).toBe(1);
    expect(test.wrappedInstance.props.testListLength).toBe(1);
    expect(typeof test.wrappedInstance.props.testList[0]).toBe('object');
    expect(test.wrappedInstance.props.testList[0].value).toBe('app');
    expect(test.wrappedInstance.props.testList[1]).toBe(undefined);
    expect(test.wrappedInstance.props.testList[2]).toBe(undefined);
  });

  it('should setItem', () => {
    test.wrappedInstance.props.setTestItem(1, {
      value: 'donut'
    });

    expect(test.wrappedInstance.props.testList instanceof Array).toBe(true);
    expect(test.wrappedInstance.props.testList.length).toBe(2);
    expect(test.wrappedInstance.props.testListLength).toBe(2);
    expect(typeof test.wrappedInstance.props.testList[0]).toBe('object');
    expect(test.wrappedInstance.props.testList[0].value).toBe('app');
    expect(typeof test.wrappedInstance.props.testList[1]).toBe('object');
    expect(test.wrappedInstance.props.testList[1].value).toBe('donut');
  });

  it('should updateItem', () => {
    testItem.wrappedInstance.props.updateTestItem(
      testItem.wrappedInstance.props.index, {
        selected: true,
        updated: true
      }
    );

    expect(testItem.wrappedInstance.props.index).toBe(0);
    expect(testItem.wrappedInstance.props.testItem.selected).toBe(true);
    expect(testItem.wrappedInstance.props.testItem.value).toBe('a');
    expect(testItem.wrappedInstance.props.testItem.updated).toBe(true);
  });

  it('should deleteItem', () => {
    testItem.wrappedInstance.props.deleteTestItem(
      testItem.wrappedInstance.props.index
    );

    expect(testItem.wrappedInstance.props.index).toBe(0);
    expect(testItem.wrappedInstance.props.testItem.selected).toBe(undefined);
    expect(testItem.wrappedInstance.props.testItem.value).toBe('b');
    expect(testItem.wrappedInstance.props.testItem.updated).toBe(undefined);
  });

  it('should spliceList', () => {
    const banana = { value: 'banana' };
    const carrot = { value: 'carrot' };

    test.wrappedInstance.props.spliceTestList(1, 0, banana, carrot);

    expect(test.wrappedInstance.props.testList instanceof Array).toBe(true);
    expect(test.wrappedInstance.props.testList.length).toBe(4);
    expect(test.wrappedInstance.props.testListLength).toBe(4);
    expect(typeof test.wrappedInstance.props.testList[0]).toBe('object');
    expect(test.wrappedInstance.props.testList[0].value).toBe('app');
    expect(typeof test.wrappedInstance.props.testList[1]).toBe('object');
    expect(test.wrappedInstance.props.testList[1].value).toBe('banana');
    expect(typeof test.wrappedInstance.props.testList[2]).toBe('object');
    expect(test.wrappedInstance.props.testList[2].value).toBe('carrot');
    expect(typeof test.wrappedInstance.props.testList[3]).toBe('object');
    expect(test.wrappedInstance.props.testList[3].value).toBe('donut');
  });

  it('should sliceList', () => {
    test.wrappedInstance.props.sliceTestList(1, 3);

    expect(test.wrappedInstance.props.testList instanceof Array).toBe(true);
    expect(test.wrappedInstance.props.testList.length).toBe(2);
    expect(test.wrappedInstance.props.testListLength).toBe(2);
    expect(typeof test.wrappedInstance.props.testList[0]).toBe('object');
    expect(test.wrappedInstance.props.testList[0].value).toBe('banana');
    expect(typeof test.wrappedInstance.props.testList[1]).toBe('object');
    expect(test.wrappedInstance.props.testList[1].value).toBe('carrot');
  });

  it('should clearList', () => {
    test.wrappedInstance.props.clearTestList();

    expect(test.wrappedInstance.props.testList instanceof Array).toBe(true);
    expect(test.wrappedInstance.props.testList.length).toBe(0);
    expect(test.wrappedInstance.props.testListLength).toBe(0);
    expect(test.wrappedInstance.props.testList[0]).toBe(undefined);
  });
});
