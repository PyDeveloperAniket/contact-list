import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Home = () => {
    // Accessing contacts from Redux store
    const contacts = useSelector(state => state);

    // Redux dispatch hook
    const dispatch = useDispatch();

    // Function to delete a contact
    const deleteContact = (id) => {
        dispatch({ type: 'DELETE_CONTACT', payload: id });
        toast.success('Contact deleted successfully!');
    }

    // JSX structure for the Home component
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-10 my-2 text-end'>
                    <Link to='/' className='btn btn-outline-primary m-2'>Home</Link>
                    <Link to='/add' className='btn btn-outline-dark'>Add Contact</Link>
                </div>
                <div className='col-md-8 mx-auto'>
                    <table className='table table-hover'>
                        <thead className='text-white bg-primary text-center'>
                            <tr>
                                <th scope='col'>No.</th>
                                <th scope='col'>Name</th>
                                <th scope='col'>Email</th>
                                <th scope='col'>Number</th>
                                <th scope='col'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                contacts.map((contact, id) => (
                                    <tr key={id}>
                                        <td>{id + 1}</td>
                                        <td>{contact.name}</td>
                                        <td>{contact.email}</td>
                                        <td>{contact.number}</td>
                                        <td>
                                            {/* Link to edit page */}
                                            <Link to={`/edit/${contact.id}`} className='btn btn-small btn-primary me-2'>Edit</Link>
                                            
                                            {/* Button to delete a contact */}
                                            <button type='button' onClick={() => deleteContact(contact.id)} className='btn btn-small btn-danger'>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    )
}

export default Home;
