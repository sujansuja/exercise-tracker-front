import React from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import { useParams } from "react-router-dom";

export default function EditExercise(props) {
    const [username, setUsername] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [duration, setDuration] = React.useState(0)
    const [date, setDate] = React.useState(new Date())
    const [users, setUsers] = React.useState([])

    const { id } = useParams()
    React.useEffect(() => {
        axios.get('https://exercise-tracker-mern-app.onrender.com/exercises/' + id)
            .then(res => {
                setUsername(res.data.username)
                setDescription(res.data.description)
                setDuration(res.data.duration)
                setDate(new Date(res.data.date))
            })
            .catch(err => console.log("exercises error" + err));

        axios.get('https://exercise-tracker-mern-app.onrender.com/users/')
            .then(res => {
                if (res.data.length) {
                    setUsers(res.data.map(user => user.username))
                }
            })
            .catch(err => console.log("user Error" + err));
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

        axios.post('https://exercise-tracker-mern-app.onrender.com/exercises/update/' + id, exercise)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))

        window.location = '/'
    }
    return (
        <div>
            <h3>Edit Exercise Log</h3>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label>Username: </label>
                    <select
                        // ref='userInput'
                        required
                        className='form-control'
                        value={username}
                        onChange={onChangeUsername}>
                        {users.map(user =>
                            <option key={user} value={user}>{user}</option>)
                        }
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
                    <input type='submit' value="Edit Exercise Log" className='btn btn-primary' />
                </div>
            </form>
        </div>
    )
}

