import {
	INCREMENT,
	DECREMENT
} from "../types";

const initialState = {
	count: 0,
}

export function countReducer(state = initialState, action) {
	switch (action.type) {
		case INCREMENT:
			return {
				...state,
				num: state.num + 1
			};
		case DECREMENT:
			return {
				...state,
				num: state.num - 1
			};
		default:
			return state;
	}
}