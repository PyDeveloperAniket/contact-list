import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Home from './Home';

// Functional component for adding a contact
const AddContact = () => {
    // State variables for managing form input
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');

    // Accessing contacts from Redux store
    const contacts = useSelector(state => state);

    // Redux dispatch and navigation hooks
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Form submission handler
    const handleSubmit = e => {
        e.preventDefault();

        // Check if email or number already exist in the contacts list
        const checkEmail = contacts.find(contact => contact.email === email && email);
        const checkNumber = contacts.find(contact => contact.number === parseInt(number) && number);

        // Validation checks
        if (!email || !number || !name) {
            return toast.warning("Please fill in all fields!");
        }

        if (checkEmail) {
            return toast.error("This email already exists!");
        }

        if (checkNumber) {
            return toast.error("This number already exists!");
        }

        // Create a new contact object
        const data = {
            id: contacts[contacts.length - 1].id + 1,
            name,
            email,
            number
        };

        // Dispatch action to add the new contact
        dispatch({ type: 'ADD_CONTACT', payload: data });
        toast.success("Contact added successfully!!");
        
        // Navigate back to the home page
        navigate('/');
    };

    // JSX structure for the AddContact component
    return (
        <div className='container'>
            <h1 className='display-3 text-center'>Add Contact</h1>
            <div className='row'>
                <div className='col-md-6 shadow mx-auto p-5'>
                    <form className='text-center' onSubmit={handleSubmit}>
                        <div className='form-group mb-3'>
                            <input type='text' placeholder='Name' className='form-control'
                                value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <div className='form-group mb-3'>
                            <input type='email' placeholder='Email' className='form-control'
                                value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className='form-group mb-3'>
                            <input type='number' placeholder='Phone Number' className='form-control'
                                value={number} onChange={e => setNumber(e.target.value)} />
                        </div>
                        <div className='form-group mb-3'>
                            <input type='submit' value='Add Contact' className='btn btn-block btn-primary' />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddContact;
