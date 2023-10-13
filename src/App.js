import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from 'react-router-dom';

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AddContact from "./components/AddContact";
import EditContact from "./components/EditContact";
import { useDispatch } from "react-redux";

const App = () => {
    // Redux dispatch hook
    const dispatch = useDispatch();

    // Fetch data from an external API when the component mounts
    useEffect(() => {
        // Initialize an empty array to store fetched data
        const data = [];

        // Asynchronous function to fetch data from the API
        const fetchData = async () => {
            await fetch('https://jsonplaceholder.typicode.com/users')
                .then((response) => response.json())
                .then((json) => {
                    // Map over the fetched data and transform it into the desired format
                    json.map((contact) => {
                        data.push({
                            id: contact.id,
                            name: contact.name,
                            number: contact.phone,
                            email: contact.email
                        });
                    })
                });

            // Dispatch an action to update the Redux store with the fetched data
            dispatch({ type: 'FETCH_CONTACTS', payload: data });
        };

        // Call the fetchData function when the component mounts
        fetchData();
    }, [dispatch]);

    // JSX structure for the App component
    return (
        <div className="App">
            {/* ToastContainer for displaying notifications */}
            <ToastContainer />

            {/* Navbar component */}
            <Navbar />

            {/* React Router's Routes component to handle navigation */}
            <Routes>
                {/* Route for the home page */}
                <Route exact path="/" element={<Home />} />

                {/* Route for adding a new contact */}
                <Route path="/add" element={<AddContact />} />

                {/* Route for editing an existing contact */}
                <Route path="/edit/:id" element={<EditContact />} />
            </Routes>
        </div>
    );
}

export default App;
