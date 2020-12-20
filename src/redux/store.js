import { applyMiddleware, connect } from './createStore';
import { rootReducer } from '@/redux/reducers/rootReducer';
import countryActions from '@/redux/actions/countryActions';

export const createStore = (reducer) => {
    let state = reducer({}, { type: '__INIT__' });
    const subscribers = [];
    return {
        subscribe(callback) {
            subscribers.push(callback);
        },
        getState() {
            return state;
        },
        dispatch(action) {
            state = reducer(state, action);
            subscribers.forEach((sub) => sub());
        }
    };
};

const thunk = (store) => (dispatch) => (action) => {
    if (typeof action === 'function') {
        return action(store.dispatch, store.getState);
    }
    return dispatch(action);
};

export const store = applyMiddleware(thunk)(createStore)(rootReducer);

export const connectedCountryActions = connect(countryActions, store.dispatch);
