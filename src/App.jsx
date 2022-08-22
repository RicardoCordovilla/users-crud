import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import CardUser from './components/CardUser'
import UserForm from './components/UserForm'

function App() {

  const [users, setUsers] = useState()

  const [updateInfo, setUpdateInfo] = useState()

  const [formOpen, setFormOpen] = useState(false)


  const urlUser = 'https://users-crud1.herokuapp.com/users/'

  const getUsers = () => {
    axios.get(urlUser)
      .then(res => {
        // console.log(res.data)
        setUsers(res.data)
      })
      .catch(err => console.log(err.response.data))
  }

  useEffect(() => {
    getUsers()
  }, [])

  const openForm = () => setFormOpen(true)
  const openNewForm = () => {
    setUpdateInfo()
    setFormOpen(true)
  }
  const closeForm = () => setFormOpen(false)



  const createUser = data => {
    axios.post(urlUser, data)
      .then(res => {
        console.log(res.data)
        getUsers()
      })
      .catch(err => console.log(err.response.data))
  }

  return (
    <div className="App">
      <header>
        <h1>Users</h1>
        <button className='btnCreateuser' onClick={openNewForm}>
          <i className='bx bx-plus'></i>
          Create new user
        </button>
      </header>

      <div className={formOpen ? 'formContainer' : 'formHide'}
        // onClick={closeForm}
        >
        <UserForm
          createUser={createUser}
          updateInfo={updateInfo}
          getUsers={getUsers}
          closeForm={closeForm}
        />
      </div>
      <div className="cardContainer">

        {
          users?.map(user => (
            <CardUser
              key={user.id}
              userInfo={user}
              getUsers={getUsers}
              setUpdateInfo={setUpdateInfo}
              openForm={openForm}
            />
          ))
        }


      </div>
    </div>
  )
}

export default App
