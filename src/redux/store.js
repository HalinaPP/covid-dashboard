import { createStore, applyMiddleware } from './createStore'
import appReducer from './reducers'

const thunk = (store) => (dispatch) => (action) => {
	if (typeof action === 'function') {
		return action(store.dispatch, store.getState);
	}
	return dispatch(action);
};

export const store = applyMiddleware(thunk, createStore, appReducer)