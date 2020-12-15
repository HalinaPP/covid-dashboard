import { createStore, applyMiddleware } from "./createStore"
import appReducer from "./reducers"

const thunk = (store) => (dispatch) => (action) => {
	if (typeof action === "function") {
		return action(store.dispatch, store.getState);
	}
	return dispatch(action);
};

// const logger = store => next => action => {
// 	console.log("About to dispatch", action)
// 	const nextValue = next(action)
// 	console.log("Action processed. Next state:", store.getState())
// 	return nextValue
// }

export const store = applyMiddleware(thunk, createStore, appReducer)