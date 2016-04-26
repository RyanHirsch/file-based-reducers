var redux = require('redux');

var createStore = redux.createStore;
var combineReducers = redux.combineReducers;

var simple = require('./simple');

var store = createStore(combineReducers({
  simple: simple
}));

store.dispatch({ type: 'simple/success' });
console.log(store.getState());

store.dispatch({ type: 'simple/error' });
console.log(store.getState());
