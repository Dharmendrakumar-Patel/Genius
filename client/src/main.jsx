import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import store from './store.js';
import App from './App.jsx';
import Home from "./pages/home";
import Signup from './pages/auth/Signup.jsx';
import Login from './pages/auth/Login.jsx';
import Chat from './pages/chat/index.jsx';
import Profile from './pages/profile/index.jsx';
import { ErrorPage } from './components/index.js';
import './index.css'
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/signup",
        element: localStorage.getItem('token') ? <Home /> :  <Signup />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/",
        element: localStorage.getItem('token') ? <Home /> : <Login />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "/",
            element: localStorage.getItem('token') ? <Chat /> : <Login />,
            errorElement: <ErrorPage />,
          },
          {
            path: "/profile",
            element: localStorage.getItem('token') ? <Profile /> : <Login />,
            errorElement: <ErrorPage />,
          },
        ]
      },
      {
        path: "/login",
        element: <Login />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
