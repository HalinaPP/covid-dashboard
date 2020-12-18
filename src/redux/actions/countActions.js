import {
	INCREMENT,
	DECREMENT
} from './types';

export function incrementCount() {
	return {
		type: INCREMENT
	};
}

export function decrementCount() {
	return {
		type: DECREMENT
	};
}

function incrementAsync() {
	return (dispatch) => {
		setTimeout(() => {
			dispatch(increment());
		}, 1000);
	};
}
