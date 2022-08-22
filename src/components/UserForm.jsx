import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'


const resetValue = {
  email: '',
  password: '',
  first_name: '',
  last_name: '',
  birthday: '',
}

const UserForm = ({ createUser, updateInfo, getUsers, closeForm }) => {

  const { register, handleSubmit, reset } = useForm()

  const submit = data => {

    if (updateInfo) {
      const urlUser = `https://users-crud1.herokuapp.com/users/${updateInfo.id}/`
      axios.patch(urlUser, data)
        .then(res => {
          getUsers()
          reset(resetValue)
        })
        .catch(err => console.log(err))
    }

    else {
      console.log(data)
      createUser(data)
      reset(resetValue)
    }
    closeForm()
  }

  useEffect(() => {
    if (updateInfo)
      reset(updateInfo)
    else
      reset(resetValue)
  }, [updateInfo])

  return (
    <div className='formContainer'>
      <form onSubmit={handleSubmit(submit)}>
        <span className='form__closeBtn'
          onClick={closeForm}
        ><i className='bx bx-x'></i></span>
        <h2>{updateInfo ? "Update user" : "New user"}</h2>

        <div className="field">
          <label htmlFor="name">First name</label>
          <input {...register('first_name')} type="text" id='name' placeholder='Input your name' minLength={1} />
        </div>

        <div className="field">
          <label htmlFor="last">Last name</label>
          <input {...register('last_name')} type="text" id='last' placeholder='Input your last name' minLength={1} />
        </div>

        <div className="field">
          <label htmlFor="mail">Email</label>
          <input {...register('email')} type="email" id='mail' placeholder='Input your email' minLength={1} />
        </div>

        <div className="field">
          <label htmlFor="pass">Password</label>
          <input {...register('password')} type="text" id='pass' placeholder='Input your password' minLength={1} />
        </div>

        <div className="field">
          <label htmlFor="bithday">Bithday</label>
          <input {...register('birthday')} type="date" id='bithday' placeholder='Input your birthday' minLength={1} />
        </div>

        <button>{updateInfo ? "Save changes" : "Add new user"}</button>

      </form>
    </div>
  )
}

export default UserForm