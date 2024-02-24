// store.js
import { createStore } from 'redux';

const initialState = {
    videos: [],
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_VIDEOS':
            return { ...state, videos: action.payload };
        default:
            return state;
    }
}

const store = createStore(reducer);

export default store;
