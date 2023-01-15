import { useGetAllContactsQuery } from 'redux/contactSlicer';

import css from './ContactsItems.module.css';

export const ContactsItems = () => {
  const { data } = useGetAllContactsQuery();

  const contacts = [];

  console.log('data', data);

  //   const { contacts } = useSelector(getContacts);
  //   const filter = useSelector(getFilter);

  // const filteredContacts = contacts.filter(contact =>
  //   contact.name.toLowerCase().includes(filter.toLowerCase())
  // );

  const deleteContact = id => {
    console.log(id);
  };

  return (
    <>
      {contacts.map(contact => (
        <li key={contact.id} className={css.item}>
          <span className={css.name}>{contact.name}: </span>
          {contact.number}
          <button type="button" onClick={() => deleteContact(contact.id)}>
            Delete
          </button>
        </li>
      ))}
    </>
  );
};
