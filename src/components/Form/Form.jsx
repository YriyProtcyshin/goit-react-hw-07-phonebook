import { useForm } from 'react-hook-form';
import css from "./Form.module.css"
import { nanoid } from 'nanoid';
import { addContact } from 'redux/contactSlicer';
import { useDispatch, useSelector } from 'react-redux';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


export const Form = () => {

    const dispatch = useDispatch()
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    
    const {contacts} = useSelector(state => state.contacts)

    const onSubmit = ({name, number}) => {        
        const newContact = { id: nanoid(), name, number }
        const isNameInContacts = contacts.find(contact => contact.name === name)
        
        if (isNameInContacts) {            
            Notify.failure(`${name} is alredy in contacts`);
            return
        }   
        
        dispatch(addContact(newContact))
        reset()
    }
  
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
            <p className={css.inputLabel}>Name</p>
            <input type="text" placeholder="name" className={css.field}
                {...register("name", { required: "Name is required", maxLength: 80 })} />
            <p className={css.errorMessage}>{errors.name?.message}</p>
            
            <p className={css.inputLabel}>Number</p>
            <input type="tel" placeholder="Mobile number" className={css.field}
                {...register("number", { required: "Phone number is required", minLength: 6, maxLength: 12 })}
            />
            <p className={css.errorMessage}>{errors.number?.message}</p>
            <button type="submit">Add contact</button>
        </form>
    );
}