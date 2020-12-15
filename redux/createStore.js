export const createStore = reducer => {
	let state = reducer(initialState, { type: "__INIT__" });
	const subscribers = [];
	return {
		dispatch(action) {
			state = reducer(state, action);
			subscribers.forEach((sub) => sub());
		},
		subscribe(callback) {
			subscribers.push(callback);
		},
		getState() {
			return state;
		},
	};
};



export const applyMiddleware = (...middlewares) => {
	return createStore => reducer => {
		const store = createStore(reducer);
		return {
			...store,
			dispatch: function dispatch(action) {
				return middlewares(store)(store.dispatch)(action);
			}
		};
	};
};


export function applyMiddleware(middleware) {
	return function createStoreWithMiddleware(createStore) {
		return (reducer) => {
			const store = createStore(reducer);
			return {
				dispatch: (action) => middleware(store)(store.dispatch)(action),
				getState: store.getState,
				subscribe: store.subscribe,
			};
		};
	};
}


export const connect = (actionCreators, dispatch) => {
	const boundedActionCreators = {};
	const actionKeys = Object.keys(actionCreators);
	actionKeys.forEach(key => {
		const actionCreator = actionCreators[key];
		boundedActionCreators[key] = function boundedActionCreator() {
			return dispatch(actionCreator.apply(this, arguments));
		};
	});
	return boundedActionCreators;
};