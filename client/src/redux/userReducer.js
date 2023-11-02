import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    initialUser: null,
};

const userReducer = createReducer(initialState, {
    SET_USER: (state, action) => {
        state.initialUser = action.payload;
    },
    REMOVE_USER: (state) => {
        state.initialUser = null;
    },
});

export default userReducer;