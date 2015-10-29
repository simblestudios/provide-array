import './init';
import expect from 'expect';
import React, { PropTypes } from 'react';
import { renderTest } from 'react-redux-provide-test-utils';
import Test from './components/Test';
import TestItem from './components/TestItem';

const test = renderTest(Test);
const testItem = renderTest(TestItem, { index: 0 });

describe('react-redux-provide-list', () => {
  it('should have initialized list', () => {
    expect(test.wrappedInstance.props.list.length).toBe(1);
    expect(test.wrappedInstance.props.list[0].value).toBe('test');
  });

  it('should provide item when index prop is present', () => {
    expect(testItem.wrappedInstance.props.item.value).toBe('test');
  });

  it('should setList', () => {
    test.wrappedInstance.props.setList([
      {value: 'a'},
      {value: 'b'},
      {value: 'c'}
    ]);

    expect(test.wrappedInstance.props.list.length).toBe(3);
    expect(test.wrappedInstance.props.list[0].value).toBe('a');
    expect(test.wrappedInstance.props.list[1].value).toBe('b');
    expect(test.wrappedInstance.props.list[2].value).toBe('c');

    expect(testItem.wrappedInstance.props.item.value).toBe('a');
  });

  it('should updateList', () => {
    test.wrappedInstance.props.updateList((item) => {
      return { ...item, value: item.value+item.value };
    });

    expect(test.wrappedInstance.props.list.length).toBe(3);
    expect(test.wrappedInstance.props.list[0].value).toBe('aa');
    expect(test.wrappedInstance.props.list[1].value).toBe('bb');
    expect(test.wrappedInstance.props.list[2].value).toBe('cc');

    expect(testItem.wrappedInstance.props.item.value).toBe('aa');
  });

  it('should filterList', () => {
    test.wrappedInstance.props.filterList((item, index) => {
      return item.value !== 'aa' && index !== 1;
    });

    expect(test.wrappedInstance.props.list.length).toBe(1);
    expect(test.wrappedInstance.props.list[0].value).toBe('cc');

    expect(testItem.wrappedInstance.props.item.value).toBe('cc');
  });

  it('should createItem', () => {
    test.wrappedInstance.props.createItem({
      value: 'dd'
    });

    expect(test.wrappedInstance.props.list.length).toBe(2);
    expect(test.wrappedInstance.props.list[0].value).toBe('dd');
    expect(test.wrappedInstance.props.list[1].value).toBe('cc');

    expect(testItem.wrappedInstance.props.item.value).toBe('dd');
  });

  it('should updateItem', () => {
    testItem.wrappedInstance.props.updateItem(
      testItem.wrappedInstance.props.index, {
        value: 'ee',
        updated: true
      }
    );

    expect(test.wrappedInstance.props.list.length).toBe(2);
    expect(test.wrappedInstance.props.list[0].value).toBe('ee');
    expect(test.wrappedInstance.props.list[0].updated).toBe(true);
    expect(test.wrappedInstance.props.list[1].value).toBe('cc');

    expect(testItem.wrappedInstance.props.item.value).toBe('ee');
  });

  it('should deleteItem', () => {
    testItem.wrappedInstance.props.deleteItem(
      testItem.wrappedInstance.props.index
    );

    expect(test.wrappedInstance.props.list.length).toBe(1);
    expect(test.wrappedInstance.props.list[0].value).toBe('cc');
    expect(test.wrappedInstance.props.list[0].updated).toBe(undefined);

    expect(testItem.wrappedInstance.props.item.value).toBe('cc');
  });
});
