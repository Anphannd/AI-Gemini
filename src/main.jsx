import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import store from './store/app.js';
import { Provider } from 'react-redux';
import './index.css';
import ChatDetail from './pages/chatDetail.jsx';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Navigate to="/chat/info" />,
            },
            {
                path: '/chat/info',
                element: <ChatDetail />,
            },
            {
                path: '/chat/:id',
                element: <ChatDetail />,
            },
        ],
    },
]);
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>,
);
