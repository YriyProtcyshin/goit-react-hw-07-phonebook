import { useGetAllContactsQuery } from 'redux/contactSlicer';
import { useSelector } from 'react-redux';
import { getFilter } from 'redux/selectors';

import css from './ContactsItems.module.css';

export const ContactsItems = () => {
  const { data: contacts } = useGetAllContactsQuery();

  console.log('contacts', contacts);

  //   const { contacts } = useSelector(getContacts);
  const filter = useSelector(getFilter);

  let filteredContacts = [];

  if (contacts) {
    filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }

  const deleteContact = id => {
    console.log(id);
  };

  return (
    <>
      {contacts &&
        filteredContacts.map(contact => (
          <li key={contact.id} className={css.item}>
            <span className={css.name}>{contact.name}: </span>
            {contact.phone}
            <button type="button" onClick={() => deleteContact(contact.id)}>
              Delete
            </button>
          </li>
        ))}
    </>
  );
};
