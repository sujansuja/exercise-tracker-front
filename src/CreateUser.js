import React from 'react'
import axios from 'axios'
export default function CreateUser() {

    const [username, setUsername] = React.useState('')

    function onChangeUsername(e) {
        setUsername(e.target.value)
    }

    function onSubmit(e) {
        e.preventDefault();

        const user = { username }
        console.log(user)

        axios.post('http://localhost:5000/users/add', user)
        .then(res => console.log(res.data))

        window.location = '/'
        setUsername('')
    }

    return (
        <div>
            <h1>Create New User</h1>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label>Username: </label>
                    <input type='text'
                        required
                        className='form-control'
                        value={username}
                        onChange={onChangeUsername}
                    />
                </div>
                <div className='form-group'>
                    <input type='submit' value="Create User" className='btn btn-primary' />
                </div>
            </form>
        </div>
    )
}
