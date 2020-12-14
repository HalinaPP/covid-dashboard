// eslint-disable-next-line import/prefer-default-export
export function applyMiddleware(middleware) {
    return function createStoreWithMiddleware(createStore1) {
        return (reducer, state) => {
            const store = createStore1(reducer, state);
            return {
                dispatch: (action) => middleware(store)(store.dispatch)(action),
                getState: store.getState,
                subscribe: store.subscribe,
            };
        };
    };
}
export function createStoreHelpers(rootReducer, initialState) {
    let state = rootReducer(initialState, { type: "__INIT__" });
    const subscribers = [];
    return {
        dispatch(action) {
            state = rootReducer(state, action);
            subscribers.forEach((sub) => sub());
        },
        subscribe(callback) {
            subscribers.push(callback);
        },
        getState() {
            return state;
        },
    };
}
