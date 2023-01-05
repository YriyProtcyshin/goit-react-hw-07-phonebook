import { useSelector, useDispatch } from 'react-redux';
import { contactSlicer } from 'redux/contactSlicer';

import css from "./ContactsItems.module.css"

export const ContactsItems = () => {
    const dispatch = useDispatch()

    const contacts = useSelector(state => state.contacts)

    const filter = useSelector(state => state.filter)

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase()))

    const deleteContact = (id) => {
        dispatch(contactSlicer.actions.removeContact(id))
    }

    return (
        <>
            { filteredContacts.map(contact => 
                <li key={contact.id} className={css.item}>
                    <span className={css.name}>{contact.name}: </span>
                    {contact.number}
                    <button type='button' onClick={()=> deleteContact(contact.id)}>Delete</button>
                </li>
            )}
        </>
    )   
}