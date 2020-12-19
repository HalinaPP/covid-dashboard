import { createStore, applyMiddleware, connect } from './createStore';
import { rootReducer } from '@/redux/reducers/rootReducer';
import countryActions from '@/redux/actions/countryActions';

const thunk = (store) => (dispatch) => (action) => {
	if (typeof action === 'function') {
		return action(store.dispatch, store.getState);
	}
	return dispatch(action);
};

export const store = applyMiddleware(thunk, createStore, rootReducer)

export const connectedCountryActions = connect(countryActions, store.dispatch);