import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getFilter, getContacts } from 'redux/selectors';
import { fetchAllContacts } from 'redux/operation';
import { deleteContact } from 'redux/operation';

import { Blocks, LineWave } from 'react-loader-spinner';

import css from './ContactsItems.module.css';

export const ContactsItems = () => {
  const dispatch = useDispatch();
  const [targetId, setTargetId] = useState(null);
  const { items: contacts, isLoading } = useSelector(getContacts);
  const filter = useSelector(getFilter);

  useEffect(() => {
    dispatch(fetchAllContacts());
  }, [dispatch, targetId]);

  let filteredContacts = [];

  if (contacts.length) {
    filteredContacts = contacts.filter(contact => {
      console.log(filter);
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });
  }

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
    dispatch(fetchAllContacts());
    setTargetId(id);
  };

  return (
    <>
      {filteredContacts.length > 0 &&
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
