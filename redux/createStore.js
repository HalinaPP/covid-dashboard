/* eslint-disable comma-dangle,import/prefer-default-export */
import { applyMiddleware, createStoreHelpers } from "./createStoreHelpers";

const defaultValue = {
    playMode: false,
    audioArray: {
        value: [],
        wrongAnswers: 0,
        correctAnswer: true,
    },
    gameState: false,
    cards: {
        value: [],
    },
};
export function connect(rootReducer, initialState = defaultValue) {
    const thunk = (store) => (dispatch) => (action) => {
        if (typeof action === "function") {
            return action(store.dispatch, store.getState);
        }
        return dispatch(action);
    };
    const createStoreWithMiddleware = applyMiddleware(thunk)(
        createStoreHelpers
    );
    return createStoreWithMiddleware(rootReducer, initialState);
}
