import { assignProviders } from 'react-redux-provide';
import * as list from '../src/index';
import Test from './components/Test';
import TestItem from './components/TestItem';

const states = {
  values: {
    list: [
      {
        value: 'test'
      }
    ]
  }
};

assignProviders(states.values, { list }, {
  Test,
  TestItem
});
