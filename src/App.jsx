import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    fetch("http://localhost:5000/users")
    .then(data => data.json())
    .then(data => setUsers(data))
  })
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = {name, email};
    fetch("http://localhost:5000/users", {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then((response) => response.json())
    .then(data => setUsers([...users, data]))
  }
  return (
    <>
      <h2>Users Managemente Client</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <input type="text" name='name' placeholder='Enter your name'/>
          <input type="email" name='email' placeholder='Enter your email'/>
          <input type="submit" value="Add User" />
        </form>
      </div>
      <p>Total Users : {users.length}</p>
      <div>
        {users.map(({id, name, email}) => <p key={id}>id:{id}, name: {name}, email: {email}</p>)}
      </div>
    </>
  )
}

export default App
