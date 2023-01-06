import { useSelector, useDispatch } from 'react-redux';
import { removeContact } from 'redux/contactSlicer';
import {getContacts, getFilter} from "redux/selectors"
import css from "./ContactsItems.module.css"

export const ContactsItems = () => {
    const dispatch = useDispatch()

    const {contacts} = useSelector(getContacts)
    const filter = useSelector(getFilter)

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase()))

    const deleteContact = (id) => {
        dispatch(removeContact(id))
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