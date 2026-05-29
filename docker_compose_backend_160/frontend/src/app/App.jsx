import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const App = () => {
  const [users, setUsers] = useState([])

  useState(() => {
    axios.get('/api/users')
      .then(res => setUsers(res.data.users))
      .catch(err => console.error(err))
  }, [])

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users?.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
