import { useGetAllContactsQuery } from 'redux/contactSlicer';
import { useSelector } from 'react-redux';
import { getFilter } from 'redux/selectors';

import { Blocks } from 'react-loader-spinner';

import css from './ContactsItems.module.css';

export const ContactsItems = () => {
  const { data: contacts, isFetching } = useGetAllContactsQuery();
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
      <Blocks visible={isFetching} height="60" width="60" />

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
