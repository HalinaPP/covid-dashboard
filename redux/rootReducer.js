/* eslint-disable no-restricted-globals,no-case-declarations,implicit-arrow-linebreak */
import {
    CHANGE_MODE,
    CLEAR_AUDIO_ARRAY,
    END_GAME,
    IS_PLAY_MODE,
    SET_AUDIO_ARRAY,
    START_GAME,
    CHANGE_MENU_VISIBILITY,
    SET_CARDS,
    SHUFFLE_AUDIO_ARRAY,
    SET_REPEAT,
    DELETE_LAST_AUDIO,
    ADD_WRONG_ANSWER,
} from "./types";

function gameReducer(state = false, action) {
    switch (action.type) {
        case START_GAME:
            return { ...state, value: true };
        case END_GAME:
            return { ...state, value: false };
        default:
            return state;
    }
}

function cardsReducer(state = [], action) {
    switch (action.type) {
        case SET_CARDS:
            return { ...state, value: action.cards };
        default:
            return state;
    }
}

const initialAudioState = {
    value: [],
    wrongAnswers: 0,
    correctAnswer: false,
    repeat: false,
};
function audioArrayReducer(state = initialAudioState, action) {
    switch (action.type) {
        case CLEAR_AUDIO_ARRAY:
            return { ...state, initialAudioState };
        case SET_AUDIO_ARRAY:
            return {
                ...state,
                value: action.payload,
                wrongAnswers: 0,
                correctAnswer: false,
            };
        case SHUFFLE_AUDIO_ARRAY:
            return {
                ...state,
                value: state.value.sort(() => Math.random() - 0.5),
            };
        case DELETE_LAST_AUDIO:
            return {
                ...state,
                value: state.value.slice(0, state.value.length - 1),
                correctAnswer: true,
            };
        case ADD_WRONG_ANSWER:
            return {
                ...state,
                wrongAnswers: state.wrongAnswers + 1,
                correctAnswer: false,
            };
        case SET_REPEAT:
            return {
                ...state,
                repeat: action.payload,
                correctAnswer: false,
            };

        default:
            return state;
    }
}

function playModeReducer(state = false, action) {
    switch (action.type) {
        case CHANGE_MODE:
            return { ...state, value: !state.value };
        case IS_PLAY_MODE:
            return state;
        default:
            return state;
    }
}

function menuReducer(state = false, action) {
    switch (action.type) {
        case CHANGE_MENU_VISIBILITY:
            return { ...state, value: !state.value };
        default:
            return state;
    }
}

function combineReducers(reducersMap) {
    return function combinationReducer(state, action) {
        const nextState = {};
        Object.entries(reducersMap).forEach(([key, reducer]) => {
            nextState[key] = reducer(state[key], action);
        });
        return nextState;
    };
}
// eslint-disable-next-line import/prefer-default-export
export const rootReducer = combineReducers({
    playMode: playModeReducer,
    audioArray: audioArrayReducer,
    gameState: gameReducer,
    cards: cardsReducer,
    menu: menuReducer,
});
