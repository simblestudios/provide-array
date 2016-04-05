> *Feel free to submit any pull requests or create issues for anything you think might be useful!*

# provide-array

[![build status](https://img.shields.io/travis/loggur/provide-array/master.svg?style=flat-square)](https://travis-ci.org/loggur/provide-array) [![npm version](https://img.shields.io/npm/v/provide-array.svg?style=flat-square)](https://www.npmjs.com/package/provide-array)
[![npm downloads](https://img.shields.io/npm/dm/provide-array.svg?style=flat-square)](https://www.npmjs.com/package/provide-array)

Provider factory for `Array` instances to be shared across multiple React components.


## Table of contents

1.  [Installation](#installation)
2.  [Usage](#usage)
3.  [Condensed example (defaults)](#condensed-example-defaults)
  - [Default actions](#default-actions)
  - [Default reducers](#default-reducers)
4.  [Condensed example (custom)](#condensed-example-custom)
  - [Custom actions](#custom-actions)
  - [Custom reducers](#custom-reducers)


## Installation

```
npm install provide-array --save
```


## Usage

Use `provide-array` to create providers with predictably named `actions` and `reducers` specific to manipulating arrays.  Create as many providers/instances as you want and share them across multiple components.

The main export `provideArray` takes 3 arguments:

### listName

defaults to `'list'`

### itemName

defaults to `'item'`

### indexName

defaults to `'index'`


## Condensed example (defaults)

```js
import { render } from 'react-dom';
import provideArray from 'provide-array';
import { GoodStuff } from './components/index';

const list = provideArray();

const defaultProps = {
  providers: {
    list: {
      ...list,
      state: {
        list: [
          { fruit: 'apple' },
          { fruit: 'banana' }
          { vegetable: 'carrot' }
        ]
      }
    }
  }
};

render(<GoodStuff { ...defaultProps } />, document.getElementById('root'));
```

Components can then use the following default `actions` and `reducers` via `propTypes`.

### Default actions

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

### Default reducers

- `list` - the list instance, of course
- `listLength` - the length of the list instance
- `item` - if the component instance contains a prop key matching the `indexName` (e.g., `index`), the `item` at that key within the list will be provided


## Condensed example (custom)

```js
import { render } from 'react-dom';
import provideArray from 'provide-array';
import { GoodStuff } from './components/index';

const goodList = provideArray('goodList', 'goodItem', 'goodIndex');

const defaultProps = {
  providers: {
    goodList: {
      ...goodList: {
      state: {
        goodList: [
          { fruit: 'apple' },
          { fruit: 'banana' }
          { vegetable: 'carrot' }
        ]
      }
    }
  }
};

render(<GoodStuff { ...defaultProps } />, document.getElementById('root'));
```

Components can then use the following custom `actions` and `reducers` via `propTypes`.

### Custom actions

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

### Custom reducers

- `list` -> `goodList`
- `listLength` -> `goodListLength`
- `item` -> `goodItem`
