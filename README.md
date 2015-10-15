> *Feel free to submit any pull requests or create issues for anything you think might be useful!*

# react-redux-provide-list
Provides a handful of common actions and props specific to lists and items.

## Installation
```
npm install react-redux-provide react-redux-provide-list --save
```

## Usage
Your components can be optionally provided a `list` and/or an `item`.  Simply specify their `propTypes` within your `@provide` decorator.  For an `item` to be provided, the component must have an `index` prop.  For a list of available actions, just take a look at [the source](https://github.com/loggur/react-redux-provide-list/blob/master/src/list.js).

## Example
- For assigning the provider to components and initializing state, see [`todomvc/index.js`](https://github.com/loggur/react-redux-provide/blob/master/examples/todomvc/index.js#L6).
- For creating items, see [`todomvc/components/Header.js`](https://github.com/loggur/react-redux-provide/blob/master/examples/todomvc/components/Header.js).
- For updating items, see [`todomvc/components/TodoItem.js`](https://github.com/loggur/react-redux-provide/blob/master/examples/todomvc/components/TodoItem.js).
