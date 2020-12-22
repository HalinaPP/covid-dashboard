

export const applyMiddleware = middleware => {
	return createStore => reducer => {
		const store = createStore(reducer)
		return {
			...store,
			dispatch: function dispatch(action) {
				return middleware(store)(store.dispatch)(action)
			}
		}
	}
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