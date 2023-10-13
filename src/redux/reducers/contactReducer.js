// Initial state for the contacts in the Redux store
const initialState = [];

// Reducer function to manage state changes for contacts
const contactReducer = (state = initialState, action) => {
    switch (action.type) {
        // Action to fetch contacts and update the state
        case 'FETCH_CONTACTS':
            return action.payload;

        // Action to add a new contact to the state
        case 'ADD_CONTACT':
            return [...state, action.payload];

        // Action to update an existing contact in the state
        case 'UPDATE_CONTACT':
            // Mapping over the state to find and update the specific contact
            const updatedState = state.map(contact =>
                contact.id === action.payload.id ? action.payload : contact
            );
            // Returning the updated state
            return updatedState;

        // Action to delete a contact from the state
        case 'DELETE_CONTACT':
            // Filtering out the contact with the specified ID from the state
            const filteredContacts = state.filter(contact => contact.id !== action.payload);
            // Returning the updated state without the deleted contact
            return filteredContacts;

        // Default case: return the current state if the action type is not recognized
        default:
            return state;
    }
}

// Exporting the contactReducer function
export default contactReducer;
