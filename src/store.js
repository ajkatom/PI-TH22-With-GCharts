import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import axios from 'axios';
// const db = require('./db');
// const { Reading } = db.model;

const POST_READING = 'POST_READING';

const initState = {
  readings: []
};

const reading = () => {
  return dispatch => {
    axios
      .get('./reading')
      .then(res => res.data)
      .then(readings => {
        return dispatch({ type: POST_READING, readings });
      })
      .catch(err => console.err);
  };
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case POST_READING:
      state = Object.assign({}, state, { readings: action.readings });
      console.log(state);
      break;
  }
  return state;
};

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
export { reading };
