import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

const EditContact = () => {
    // State variables for managing form input
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');

    // Extracting id from URL params
    const { id } = useParams();

    // Accessing contacts from Redux store
    const contacts = useSelector(state => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Finding the current contact based on the id from URL params
    const currentContact = contacts.find(contact => contact.id === parseInt(id));

    // Set form values when the currentContact changes
    useEffect(() => {
        if (currentContact) {
            setName(currentContact.name);
            setEmail(currentContact.email);
            setNumber(currentContact.number);
        }
    }, [currentContact]);

    // Form submission handler
    const handleSubmit = e => {
        e.preventDefault();

        // Checking if email or number already exist in other contacts
        const checkEmail = contacts.find(contact => contact.id !== parseInt(id) && contact.email === email);
        const checkNumber = contacts.find(contact => contact.id !== parseInt(id) && contact.number === parseInt(number));

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

        // Creating data object for updating contact
        const data = {
            id: parseInt(id),
            name,
            email,
            number
        }

        // Dispatching action to update the contact
        dispatch({ type: 'UPDATE_CONTACT', payload: data });
        toast.success("Contact updated successfully!!");
        
        // Navigating back to the home page
        navigate('/');
    };

    // JSX structure for the EditContact component
    return (
        <div className='container'>
            {
                currentContact ? (
                    <>
                        <h1 className='display-3 text-center'>Edit Contact of {name}</h1>
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
                                        <input type='submit' value='Save' className='btn btn-primary' />
                                        <Link to='/' className='btn btn-danger ms-3 '>Cancel</Link>
                                    </div>
                                </form>
                            </div>
                        </div >
                    </>
                ) : (
                    <h1 className='display-3 my-5 text-center fw-bold'>Contact with id {id} does not exist!!</h1>
                )
            }
        </div >
    )
}

export default EditContact;
