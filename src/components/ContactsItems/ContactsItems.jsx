import {
  useGetAllContactsQuery,
  useDeleteContactsMutation,
} from 'redux/contactSlicer';

import { useSelector } from 'react-redux';
import { getFilter } from 'redux/selectors';

import { Blocks } from 'react-loader-spinner';

import css from './ContactsItems.module.css';

export const ContactsItems = () => {
  const { data: contacts, isFetching } = useGetAllContactsQuery();
  const [deleteContact, { isLoading: isDeleting }] =
    useDeleteContactsMutation();

  const filter = useSelector(getFilter);

  let filteredContacts = [];

  if (contacts) {
    filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }

  const handleDeleteContact = id => {
    deleteContact(id);
  };

  return (
    <>
      <Blocks visible={isFetching} height="60" width="60" />

      {contacts &&
        filteredContacts.map(contact => (
          <li key={contact.id} className={css.item}>
            <span className={css.name}>{contact.name}: </span>
            {contact.phone}
            <button
              type="button"
              onClick={() => handleDeleteContact(contact.id)}
            >
              {isDeleting ? 'Deleted...' : 'Delete'}
            </button>
          </li>
        ))}
    </>
  );
};
