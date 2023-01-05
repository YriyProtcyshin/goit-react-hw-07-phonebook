import css from './Contacts.module.css';
import { ContactsItems } from 'components/ContactsItems/ContactsItems';

export const Contacts = ({children}) => {   
    return (
        <div className="container">
            <h2>Contacts</h2> 
            <p>Find contact by name</p>
            {children}
            <ul className={css.list}>
                <ContactsItems />
            </ul>            
       </div>
    )
}