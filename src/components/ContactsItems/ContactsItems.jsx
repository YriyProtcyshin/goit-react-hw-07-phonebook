import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getFilter } from 'redux/selectors';
import { fetchAllContacts } from 'redux/operation';

import { Blocks, LineWave } from 'react-loader-spinner';

import css from './ContactsItems.module.css';

let targetId = null;

export const ContactsItems = () => {
  const dispatch = useDispatch();
  const {
    items: contacts,
    isLoading,
    error,
  } = useSelector(state => state.contacts);

  useEffect(() => {
    dispatch(fetchAllContacts());
  }, [dispatch]);

  const filter = useSelector(getFilter);

  let filteredContacts = [];

  if (contacts.lenght) {
    filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }

  const handleDeleteContact = id => {
    // deleteContact(id);
    targetId = id;
  };

  return (
    <>
      {contacts.lenght &&
        filteredContacts.map(contact => (
          <li key={contact.id} className={css.item}>
            <span className={css.name}>{contact.name}: </span>
            {contact.phone}
            <button
              type="button"
              disabled={isLoading && contact.id === targetId}
              onClick={() => handleDeleteContact(contact.id)}
            >
              {isLoading && contact.id === targetId ? (
                <LineWave
                  width="38"
                  color="#000"
                  ariaLabel="line-wave"
                  wrapperStyle={{}}
                  wrapperClass="line-wave"
                  visible={true}
                />
              ) : (
                'Delete'
              )}
            </button>
          </li>
        ))}

      <Blocks
        visible={isLoading}
        height="60"
        width="60"
        wrapperClass="spinner"
      />
    </>
  );
};
