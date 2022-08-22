import React, { useState } from 'react'
import axios from 'axios'



const CardUser = ({ userInfo, getUsers, setUpdateInfo, openForm }) => {

    
    let urlUser = 'https://users-crud1.herokuapp.com/users/'

    const [alert, setAlert] = useState(false)

    const deleteUser=()=>setAlert(true)

    const closeAlert=()=>setAlert(false)

    
    const deleteById = id => {
        urlUser += `${id}/`
        axios.delete(urlUser)
            .then(res => {
                console.log(res.data)
                getUsers()
            })
            .catch(err => console.log(err))
    }

    const updateUser = () => {
        openForm()
        console.log(userInfo)
        setUpdateInfo(userInfo)
    }

    return (
        <div className='card'>
            <h2>{userInfo.first_name} {userInfo.last_name}</h2>
            <span>EMAIL</span>
            <h3>{userInfo.email}</h3>
            <span>BIRTHDAY</span>
            <h3>
                <i className='bx bx-gift'></i>
                {userInfo.birthday}
            </h3>

            <div className={"card__btns-container"}  >
                <button
                    // onClick={() => deleteById(userInfo.id)}
                    onClick={()=>deleteUser()}
                    className="btn del"><i className='bx bx-trash'></i></button>
                <button
                    onClick={updateUser}
                    className="btn edit"><i className='bx bx-edit-alt'></i></button>
            </div>

            <div className={alert?'deleteContainer':'alertHide'}>
                <div className="deleteBx">
                    <h3>Are you sure to delete this User?</h3>
                </div>

                <div className="cardBtns">
                    <button
                        onClick={() => deleteById(userInfo.id)}
                    >Yes</button>
                    <button
                    onClick={()=>closeAlert()}
                    >Close</button>
                </div>
            </div>

        </div>
    )
}

export default CardUser