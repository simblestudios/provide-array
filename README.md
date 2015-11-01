> *Feel free to submit any pull requests or create issues for anything you think might be useful!*

# react-redux-provide-list

[![build status](https://img.shields.io/travis/loggur/react-redux-provide-list/master.svg?style=flat-square)](https://travis-ci.org/loggur/react-redux-provide-list) [![npm version](https://img.shields.io/npm/v/react-redux-provide-list.svg?style=flat-square)](https://www.npmjs.com/package/react-redux-provide-list)
[![npm downloads](https://img.shields.io/npm/dm/react-redux-provide-list.svg?style=flat-square)](https://www.npmjs.com/package/react-redux-provide-list)

Provides `Array` instances to React components.


## Installation

```
npm install react-redux-provide react-redux-provide-list --save
```


## Usage

Use `react-redux-provide-list` to create providers with predictably named `actions` and `reducers` specific to manipulating arrays.  Create as many providers/instances as you want and share them across multiple components.

The main export `provideList` takes 3 arguments:

1. `listName` - defaults to `'list'`
2. `itemName` - defaults to `'item'`
3. `indexName` - defaults to `'index'`


## Example with default `actions` and `reducers`

```js
import { assignProviders } from 'react-redux-provide';
import provideList from 'react-redux-provide-list';
import GoodStuff from './components/GoodStuff';

const list = provideList();

const initialState = {
  list: [
    { fruit: 'apple' },
    { fruit: 'banana' }
    { vegetable: 'carrot' }
  ]
};

assignProviders(initialState, { list }, {
  GoodStuff
});
```

An instance of `GoodStuff` will then be able to access the following `actions`:

- `setList (Array list)` - sets the list
- `sortList (Function sort)` - sorts the list
- `reverseList ()` - reverses the list
- `updateList (Function update)` - updates each item in the list
- `filterList (Function filter)` - filters items in the list
- `shiftList ()` - removes the first item from the list
- `popList ()` - removes the last item from the list
- `sliceList (begin, end)` - sets the list to the result of the slice
- `spliceList (begin, deleteCount, ...items)` - sets the list to the resulting splice
- `clearList ()` - clears the list
- `unshiftItem (...items)` - puts the item(s) at the beginning of the list
- `pushItem (...items)` - puts the item(s) at the end of the list
- `setItem (index, item)` - sets the item at the `index`
- `updateItem (index, item)` - updates or sets the item at some `index`; if the existing item the update are both objects, it will merge the two as a new object
- `deleteItem (index)` - deletes the item at some `index`

And `reducers`:

- `list` - the list instance, of course
- `listLength` - the length of the list instance
- `item` - if the component instance contains a prop key matching the `indexName` (e.g., `index`), the `item` at that key within the list will be provided


## Example with predictable, custom `actions` and `reducers`

```js
import { assignProviders } from 'react-redux-provide';
import provideList from 'react-redux-provide-list';
import GoodStuff from './components/GoodStuff';

const goodList = provideList('goodList', 'goodItem', 'goodIndex');

const initialState = {
  goodList: [
    { fruit: 'apple' },
    { fruit: 'banana' }
    { vegetable: 'carrot' }
  ]
};

assignProviders(initialState, { goodList }, {
  GoodStuff
});
```

An instance of `GoodStuff` will then be able to access the same `actions` as above, but with slightly different keys:

- `setList` -> `setGoodList`
- `sortList` -> `sortGoodList`
- `reverseList` -> `reverseGoodList`
- `updateList` -> `updateGoodList`
- `filterList` -> `filterGoodList`
- `shiftList` -> `shiftGoodList`
- `popList` -> `popGoodList`
- `sliceList` -> `sliceGoodList`
- `spliceList` -> `spliceGoodList`
- `clearList` -> `clearGoodList`
- `unshiftItem` -> `unshiftGoodItem`
- `pushItem` -> `pushGoodItem`
- `setItem` -> `setGoodItem`
- `updateItem` -> `updateGoodItem`
- `deleteItem` -> `deleteGoodItem`

And `reducers`:

- `list` -> `goodList`
- `listLength` -> `goodListLength`
- `item` -> `goodItem`
