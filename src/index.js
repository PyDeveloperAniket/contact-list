import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Importing Bootstrap CSS for styling
import 'bootstrap/dist/css/bootstrap.min.css';

// Importing React Toastify styles for notifications
import 'react-toastify/dist/ReactToastify.css';

// Importing BrowserRouter for routing
import { BrowserRouter as Router } from 'react-router-dom';

// Importing Redux related modules
import { createStore } from 'redux';
import contactReducer from './redux/reducers/contactReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';

// Creating the Redux store with the contactReducer and Redux DevTools extension
const store = createStore(contactReducer, composeWithDevTools());

// Creating a root for rendering the React app
const root = createRoot(document.querySelector('#root'));

// Rendering the app within the Redux Provider and Router
root.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
);
