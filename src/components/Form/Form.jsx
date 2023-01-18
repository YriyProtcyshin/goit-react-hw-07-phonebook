import { useForm } from 'react-hook-form';
import css from './Form.module.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { useSelector, useDispatch } from 'react-redux';
import { addContact } from 'redux/operation';

export const Form = () => {
  const dispatch = useDispatch();
  const { items: data } = useSelector(state => state.contacts);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ name, number }) => {
    const searchName = data.find(
      item => item.name.toLowerCase() === name.toLowerCase()
    );

    if (searchName) {
      Notify.failure('This name alredy in contacts!');
      return;
    }
    dispatch(addContact({ name, number }));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
      <p className={css.inputLabel}>Name</p>
      <input
        type="text"
        placeholder="name"
        className={css.field}
        {...register('name', { required: 'Name is required', maxLength: 80 })}
      />
      <p className={css.errorMessage}>{errors.name?.message}</p>

      <p className={css.inputLabel}>Number</p>
      <input
        type="tel"
        placeholder="Mobile number"
        className={css.field}
        {...register('number', {
          required: 'Phone number is required',
          minLength: {
            value: 8,
            message: 'Phone number must be between 8 and 10 numbers ',
          },
          maxLength: {
            value: 10,
            message: 'Phone number must be between 8 and 10 numbers ',
          },
        })}
      />

      <p className={css.errorMessage}>{errors.number?.message}</p>

      <button type="submit">Add contact</button>
    </form>
  );
};
