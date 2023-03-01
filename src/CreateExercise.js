import React from 'react'
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

export default function CreateExercise() {
    const [username, setUsername] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [duration, setDuration] = React.useState(0)
    const [date, setDate] = React.useState(new Date())
    const [users, setUsers] = React.useState([])

    React.useEffect(() => {
        axios.get('https://exercise-tracker-mern-app.onrender.com/users')
            .then(res => {
                if (res.data.length) {
                    setUsers(res.data.map(user => user.username))
                    setUsername(res.data[0].username)
                }
            })
    }, [])


    function onChangeUsername(e) {
        setUsername(e.target.value)
    }

    function onChangeDescription(e) {
        setDescription(e.target.value)
    }

    function onChangeDuration(e) {
        setDuration(e.target.value)
    }

    function onChangeDate(e) {
        console.log(date);
        setDate(date)
    }

    function onSubmit(e) {
        e.preventDefault();

        const exercise = {
            username,
            description,
            duration: Number(duration),
            date: date
        }
        console.log(exercise)

        axios.post('https://exercise-tracker-mern-app.onrender.com/exercises/add', exercise)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))

        window.location = '/'
    }

    return (
        <div>
            <h3>Create New Exercise Log</h3>
            <form onSubmit={onSubmit}>
                <div
                className='form-group'
                >
                    <label>Username: </label>
                    <select
                        // ref='userInput'
                        required
                        className='form-control'
                        value={username}
                        onChange={onChangeUsername}>
                        {/* <option>Heelo</option> */}
                        {users.map(user =>
                            <option key={user} value={user}>{user}</option>)
                        }
                        {/* <option>Heelo</option> */}
                    </select>
                </div>
                <div className='form-group'>
                    <label>Description</label>
                    <input type='text'
                        className='form-control'
                        value={description}
                        onChange={onChangeDescription}
                    />
                </div>
                <div className='form-group'>
                    <label>Duration (in minutes): </label>
                    <input type='text'
                        className='form-control'
                        value={duration}
                        onChange={onChangeDuration}
                    />
                </div>
                <div className='form-group'>
                    <label>Date: </label>
                    <div>
                        <DatePicker
                            selected={date}
                            onChange={onChangeDate}
                        />
                    </div>
                </div>
                <div className='form-group'>
                    <input type='submit' value="Create Exercise Log" className='btn btn-primary' />
                </div>
            </form>
        </div>
    )
}
