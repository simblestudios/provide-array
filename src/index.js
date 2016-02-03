export default function provideArray (
  listName = 'list', itemName = 'item', indexName = 'index'
) {
  const properListName = listName[0].toUpperCase()+listName.substring(1);
  const properItemName = itemName[0].toUpperCase()+itemName.substring(1);
  const capitalListName = listName.toUpperCase();
  const capitalItemName = itemName.toUpperCase();
  
  const SET_LIST = `SET_${capitalListName}`;
  const SORT_LIST = `SORT_${capitalListName}`;
  const REVERSE_LIST = `REVERSE_${capitalListName}`;
  const UPDATE_LIST = `UPDATE_${capitalListName}`;
  const FILTER_LIST = `FILTER_${capitalListName}`;
  const SHIFT_LIST = `SHIFT_${capitalListName}`;
  const POP_LIST = `POP_${capitalListName}`;
  const SLICE_LIST = `SLICE_${capitalListName}`;
  const SPLICE_LIST = `SPLICE_${capitalListName}`;
  const CLEAR_LIST = `CLEAR_${capitalListName}`;
  const UNSHIFT_ITEM = `UNSHIFT_${capitalItemName}`;
  const PUSH_ITEM = `PUSH_${capitalItemName}`;
  const SET_ITEM = `SET_${capitalItemName}`;
  const UPDATE_ITEM = `UPDATE_${capitalItemName}`;
  const DELETE_ITEM = `DELETE_${capitalItemName}`;

  const constants = {
    [SET_LIST]: SET_LIST,
    [SORT_LIST]: SORT_LIST,
    [REVERSE_LIST]: REVERSE_LIST,
    [UPDATE_LIST]: UPDATE_LIST,
    [FILTER_LIST]: FILTER_LIST,
    [SHIFT_LIST]: SHIFT_LIST,
    [POP_LIST]: POP_LIST,
    [SLICE_LIST]: SLICE_LIST,
    [SPLICE_LIST]: SPLICE_LIST,
    [CLEAR_LIST]: CLEAR_LIST,
    [UNSHIFT_ITEM]: UNSHIFT_ITEM,
    [PUSH_ITEM]: PUSH_ITEM,
    [SET_ITEM]: SET_ITEM,
    [UPDATE_ITEM]: UPDATE_ITEM,
    [DELETE_ITEM]: DELETE_ITEM
  };

  const actions = {
    [`set${properListName}`]: (list) => (
      { type: SET_LIST, [listName]: list }
    ),

    [`sort${properListName}`]: (sort) => (
      { type: SORT_LIST, sort }
    ),

    [`reverse${properListName}`]: () => (
      { type: REVERSE_LIST }
    ),

    [`update${properListName}`]: (update) => (
      { type: UPDATE_LIST, update }
    ),

    [`filter${properListName}`]: (filter) => (
      { type: FILTER_LIST, filter }
    ),

    [`shift${properListName}`]: () => (
      { type: SHIFT_LIST }
    ),

    [`pop${properListName}`]: () => (
      { type: POP_LIST }
    ),

    [`slice${properListName}`]: (begin, end) => (
      { type: SLICE_LIST, begin, end }
    ),

    [`splice${properListName}`]: (begin, deleteCount, ...items) => (
      { type: SPLICE_LIST, begin, deleteCount, [itemName]: items }
    ),

    [`clear${properListName}`]: () => (
      { type: CLEAR_LIST }
    ),

    [`unshift${properItemName}`]: (...items) => (
      { type: UNSHIFT_ITEM, [itemName]: items }
    ),

    [`push${properItemName}`]: (...items) => (
      { type: PUSH_ITEM, [itemName]: items }
    ),

    [`set${properItemName}`]: (index, item) => (
      { type: SET_ITEM, [indexName]: index, [itemName]: item }
    ),

    [`update${properItemName}`]: (index, item) => (
      { type: UPDATE_ITEM, [indexName]: index, [itemName]: item }
    ),

    [`delete${properItemName}`]: (index) => (
      { type: DELETE_ITEM, [indexName]: index }
    )
  };

  const reducers = {
    [listName]: (state = [], action) => {
      switch (action.type) {
        case SET_LIST:
          return action[listName];

        case SORT_LIST:
          return state.slice().sort(action.sort);

        case REVERSE_LIST:
          const reversedList = state.slice();
          reversedList.reverse();
          return reversedList;

        case UPDATE_LIST:
          return state.map(action.update);

        case FILTER_LIST:
          return state.filter(action.filter);

        case SHIFT_LIST:
          const shiftedList = state.slice();
          shiftedList.shift();
          return shiftedList;
        
        case POP_LIST:
          const poppedList = state.slice();
          poppedList.pop();
          return poppedList;

        case SLICE_LIST:
          return state.slice(action.begin, action.end);
        
        case SPLICE_LIST:
          const splicedList = state.slice();
          Array.prototype.splice.apply(
            splicedList,
            [action.begin, action.deleteCount].concat(action[itemName])
          );
          return splicedList;

        case CLEAR_LIST:
          return [];

        case UNSHIFT_ITEM:
          const unshiftedList = state.slice();
          Array.prototype.unshift.apply(unshiftedList, action[itemName]);
          return unshiftedList;

        case PUSH_ITEM:
          const pushedList = state.slice();
          Array.prototype.push.apply(pushedList, action[itemName]);
          return pushedList;

        case SET_ITEM:
          return [
            ...state.slice(0, action[indexName]),
            action[itemName],
            ...state.slice(action[indexName] + 1)
          ];

        case UPDATE_ITEM:
          let updatedItem = state[action[indexName]];
          if (Array.isArray(updatedItem)) {
            updatedItem = [ ...updatedItem, ...action[itemName] ];
          } else if (typeof updatedItem === 'object') {
            updatedItem = { ...updatedItem, ...action[itemName] };
          } else {
            updatedItem = action[itemName];
          }
          return [
            ...state.slice(0, action[indexName]),
            updatedItem,
            ...state.slice(action[indexName] + 1)
          ];

        case DELETE_ITEM:
          return [
            ...state.slice(0, action[indexName]),
            ...state.slice(action[indexName] + 1)
          ];

        default:
          return state;
      }
    }
  };

  function merge (stateProps, dispatchProps, parentProps) {
    const list = stateProps[listName];
    const index = parentProps[indexName];

    return {
      ...parentProps,
      [`${listName}Length`]: list.length,
      [itemName]: list[index]
    };
  }

  return { ...constants, actions, reducers, merge };
}
