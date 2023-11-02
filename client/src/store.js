import { configureStore } from '@reduxjs/toolkit';
import userReducer from './redux/userReducer.js';
import messageReducer from './redux/messageReducer.js';

const store = configureStore({
    reducer: {
        user: userReducer,
        message: messageReducer,
    },
    devTools: true,
});

export default store;