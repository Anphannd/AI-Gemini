import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
const initData = {
    data: [],
};

const ChatSlice = createSlice({
    name: 'chat',
    initialState: initData,
    reducers: {
        addChat: (state) => {
            state.data.push({
                id: uuidv4(),
                title: 'chat',
                messages: [],
            });
        },
        addMessage: (state, action) => {
            const { idChat, userMess, botMess } = action.payload;
            const chat = state.data.find((chat) => chat.id === idChat);
            if (chat) {
                const messagesFormat = marked.parse(botMess);
                const clean = DOMPurify.sanitize(messagesFormat);
                const newMessage = [
                    ...chat.messages,
                    { id: uuidv4(), text: userMess, isBot: false },
                    { id: uuidv4(), text: clean, isBot: true },
                ];

                chat.messages = newMessage;
            }
        },
        removeChat: (state, action) => {
            state.data = state.data.filter((item) => item.id !== action.payload);
        },
        setName: (state, action) => {
            const { chatId, newTitle } = action.payload;
            const chat = state.data.find((chat) => chat.id === chatId);
            if (chat) {
                chat.title = newTitle;
            }
        },
    },
});

export const { addChat, removeChat, addMessage, setName } = ChatSlice.actions;
export default ChatSlice.reducer;
