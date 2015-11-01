import { assignProviders } from 'react-redux-provide';
import provideList from '../src/index';
import Test from './components/Test';
import TestItem from './components/TestItem';

const testList = provideList('testList', 'testItem');

const initialState = {
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
};

assignProviders(initialState, { testList }, {
  Test,
  TestItem
});
