import { countReducer } from './countReducer.js';

const combineReducers = reducers => {
	const reducerKeys = Object.keys(reducers);
	function combinedReducer(state = {}, action) {
		const nextState = {};
		reducerKeys.forEach(key => {
			nextState[key] = reducers[key](state[key], action);
		});
		return nextState;
	}
	return combinedReducer;
};

export const rootReducer = combineReducers({
	count: countReducer
});
