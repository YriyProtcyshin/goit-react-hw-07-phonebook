import { useForm } from 'react-hook-form';
import css from "./Form.module.css"
import { nanoid } from 'nanoid';
import { contactSlicer } from 'redux/contactSlicer';
import { useDispatch } from 'react-redux';


export const Form = () => {

    const dispatch = useDispatch()

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data, nanoid())
        const newContact = {id: nanoid(), name: data.name, number: data.number }
        dispatch(contactSlicer.actions.addContact(newContact))
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