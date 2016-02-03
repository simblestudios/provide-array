> *Feel free to submit any pull requests or create issues for anything you think might be useful!*

# provide-array

[![build status](https://img.shields.io/travis/loggur/provide-array/master.svg?style=flat-square)](https://travis-ci.org/loggur/provide-array) [![npm version](https://img.shields.io/npm/v/provide-array.svg?style=flat-square)](https://www.npmjs.com/package/provide-array)
[![npm downloads](https://img.shields.io/npm/dm/provide-array.svg?style=flat-square)](https://www.npmjs.com/package/provide-array)

Provides `Array` instances to React components.


## Installation

```
npm install react-redux-provide provide-array --save
```


## Usage

Use `provide-array` to create providers with predictably named `actions` and `reducers` specific to manipulating arrays.  Create as many providers/instances as you want and share them across multiple components.

The main export `provideArray` takes 3 arguments:

1. `listName` - defaults to `'list'`
2. `itemName` - defaults to `'item'`
3. `indexName` - defaults to `'index'`


## Condensed example with default `actions` and `reducers`

```js
import { render } from 'react-dom';
import provideArray from 'provide-array';
import GoodStuff from './components/GoodStuff';

const list = provideArray();

const context = {
  providers: { list },
  providedState: {
    list: [
      { fruit: 'apple' },
      { fruit: 'banana' }
      { vegetable: 'carrot' }
    ]
  }
};

// the GoodStuff component should be decorated with @provide
render(<GoodStuff { ...context } />, document.getElementById('root'));
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


## Condensed example with predictable, custom `actions` and `reducers`

```js
import { render } from 'react-dom';
import provideArray from 'provide-array';
import GoodStuff from './components/GoodStuff';

const goodList = provideArray('goodList', 'goodItem', 'goodIndex');

const context = {
  providers: { goodList },
  providedState: {
    goodList: [
      { fruit: 'apple' },
      { fruit: 'banana' }
      { vegetable: 'carrot' }
    ]
  }
};

// the GoodStuff component should be decorated with @provide
render(<GoodStuff { ...context } />, document.getElementById('root'));
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
