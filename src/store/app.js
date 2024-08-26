import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './chatSlile';
const store = configureStore({
    reducer: {
        chat: chatReducer,
    },
});

export default store;
