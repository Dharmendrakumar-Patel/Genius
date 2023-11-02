import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    initialMessage: null,
    loading: null,
};

const messageReducer = createReducer(initialState, {
    SET_MESSAGE: (state, action) => {
        state.initialMessage = action.payload;
    },
    REMOVE_MESSAGE: (state, action) => {
        state.initialMessage.length = state.initialMessage.length - 1;
        state.initialMessage.data.forEach((message, index) => {
            if (message._id === action.payload) {
                state.initialMessage.data.splice(index, 1);
            }
        });
    },
    LOADING_STATUS: (state, action) => {
        state.loading = action.payload;
    },DELETE_MESSAGE: (state) => {
        state.initialMessage.loading = null
        state.initialMessage = null
    },
});

export default messageReducer;