import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerMentor, setError, setSignupSuccess } from '../../store/slices/authSlice';
import { Loader, Textarea} from '@mantine/core';
import { useForm } from "react-hook-form";
import Success from '../../components/Success/Success';
import ErrorMessage from '../../components/Error/ErrorMessage';
import PhoneInput from 'react-phone-number-input/input';
import { DatePickerInput } from '@mantine/dates';


export default function SignupHR() {

    const { loading, errorState, success, error } = useSelector(
        (state) => state.auth
      )
    const dispatch = useDispatch()
    const { register, handleSubmit, reset } = useForm()

    
    useEffect(() => {
        if (success) {
          dispatch(setError(null));
          reset();
        }
      }, [dispatch, reset]);

      useEffect(() => {
          dispatch(setSignupSuccess(false)); 
      }, []);

    const handleSignup = (data) => {
        dispatch(registerMentor(data))
        }


    return(
        <main>
            <section className='login-page'>
                      <div className='login-container '>
                            <h2>Регистрация для поиска сотрудников</h2>
                            {!success && <h3 className='link'>В завершении на почту придёт пароль</h3>}
                            {success && <Success /> }
                    {!success && <form onSubmit={handleSubmit(handleSignup)} className='form-signup'>
                            <label>Email</label>
                            <input className="input" type='email' placeholder='Enter email'  {...register('email')} required/>

                            <label>First name</label>
                            <input className="input" placeholder='Enter first name'  {...register('firstname')} required/>
    
                            <label>Last name</label>
                            <input className="input" placeholder='Enter last name'  {...register('lastname')} required/>

                            <label>Phone</label>
                            <PhoneInput className="input" placeholder="Enter phone number" {...register('phone')} required />

                            <label>Birth date</label>
                            <DatePickerInput
                              placeholder="Birth date"
                              {...register('birthdate')} required
                              className='mb10'
                            />

                            <label>Description</label>
                            <Textarea
                            placeholder="Input description about yourself" {...register('Description')} required/>

                            {error && (<>{Array.isArray(error) ? (error.map((errorItem, index) => (
                                    <ErrorMessage key={index} title={errorItem.field} text={errorItem.description} />))
                                ) : (<p>{`${error.field}: ${error.description}`}</p> )}</>  )}
                            {errorState && (<>{Array.isArray(errorState) ? (errorState.map((errorItem, index) => (
                                    <ErrorMessage key={index} text={errorItem} />))
                                ) : (<p>{`${errorState}`}</p> )}</>  )}

                            <div className='login-footer'>
                                <button className='button-primary' type='submit' disabled={loading}>
                                    {loading ? <Loader color="blue"/> : 'Sign up'}
                                </button>
                            </div> 
                    </form>}
                     </div> 
            </section>
        </main>
    )
}