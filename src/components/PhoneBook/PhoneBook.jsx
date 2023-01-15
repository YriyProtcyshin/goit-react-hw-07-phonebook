import css from './PhoneBook.module.css';
import { Form } from '../Form/Form';

export const PhoneBook = () => {
  return (
    <div className="container">
      <div className={css.header}>
        <Form />
        <h1 className={css.title}>Phone book</h1>
      </div>
    </div>
  );
};
