import {
  useGetAllContactsQuery,
  useDeleteContactsMutation,
} from 'redux/contactSlicer';

import { useSelector } from 'react-redux';
import { getFilter } from 'redux/selectors';

import { Blocks } from 'react-loader-spinner';

import css from './ContactsItems.module.css';


let targetId = null

export const ContactsItems = () => {
  const { data: contacts, isFetching } = useGetAllContactsQuery();
  const [deleteContact, { data, isLoading: isDeleting }] =
    useDeleteContactsMutation();

  const filter = useSelector(getFilter);

  if (isDeleting) {
    console.log("ok")
  }

  let filteredContacts = [];

  if (contacts) {
    filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
  
  const handleDeleteContact = id => {
    deleteContact(id);
    targetId = id
  };

  console.log("Deleting item", data)

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
              disabled={isDeleting && contact.id === targetId}
              onClick={() => handleDeleteContact(contact.id)}
            >
              {isDeleting && contact.id === targetId ? 'Deleted...' : 'Delete'}
            </button>
          </li>
        ))}
    </>
  );
};

